"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Box, Snackbar, Alert } from "@mui/material"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootStore, ToolType } from "./types"
import { addPaintedDrawing, fetchPaintedDrawingsByUserId } from "../redux/PaintedDrawingsSlice"
import { fetchAllDrawings } from "../redux/DrawingSlice"
import api from "../api"
import axios from "axios"

// Components
import { CanvasHeader } from "./components/CanvasHeader"
import { CanvasToolbar } from "./components/CanvasToolbar"
import { ColorPalette } from "./components/ColorPalette"
import { CanvasContainer } from "./components/CanvasContainer"
import { CanvasActions } from "./components/CanvasActions"

// Hooks
import { useCanvasDrawing } from "./hooks/useCanvasDrawing"
import { useCanvasTools } from "./hooks/useCanvasTools"
import { useCanvasOperations } from "./hooks/useCanvasOperations"
import { useCanvasMouseHandlers } from "./components/CanvasMouseHandlers"

// Utils
import { floodFill, drawShape, drawResizeHandles } from "./utils/canvasUtils"

// Import your existing tool components
import AIInstructionsPanel from "../AIInstructionsPanel"
import ShapesTool from "../ShapesTool"
import StickersTool from "../StickersTool"
import FillBucketTool from "../fill-bucket-tool"

interface PaintCanvasProps {
  isPainted: boolean
}

const PaintCanvas: React.FC<PaintCanvasProps> = ({ isPainted }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const { drawings } = useSelector((state: RootStore) => state.drawings)
  const { paintedDrawings } = useSelector((state: RootStore) => state.paintedDrawings)
  const { user } = useSelector((state: RootStore) => state.auth)

  const drawingList = isPainted ? paintedDrawings : drawings
  const drawing = drawingList.find((x) => x.id === (id ? Number.parseInt(id, 10) : undefined))
  const userId: number = user ? user.id : 1

  // Custom hooks
  const canvasDrawing = useCanvasDrawing()
  const canvasTools = useCanvasTools()

  // Local state
  const [imageUrl, setImageUrl] = useState<string>("")
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 800, height: 600 })

  // Emoji mapping for stickers
  const emojiMap: Record<string, string> = {
    emoji1: "😊",
    emoji2: "😍",
    emoji3: "🎨",
    emoji4: "🌟",
    emoji5: "🌈",
    emoji6: "🦄",
    emoji7: "🐶",
    emoji8: "🐱",
    emoji9: "🌺",
    emoji10: "🍦",
    emoji11: "🎁",
    emoji12: "❤️",
    emoji13: "🔥",
    emoji14: "✨",
    emoji15: "🎵",
    emoji16: "🚀",
  }

  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const getIconContent = (iconId: string): { type: string; content: string } => {
    switch (iconId) {
      case "icon1":
        return { type: "emoji", content: "😀" }
      case "icon2":
        return { type: "emoji", content: "🐶" }
      case "icon3":
        return { type: "emoji", content: "🌸" }
      case "icon4":
        return { type: "emoji", content: "🎉" }
      case "icon5":
        return { type: "emoji", content: "❤️" }
      case "icon6":
        return { type: "emoji", content: "⭐" }
      case "icon7":
        return { type: "emoji", content: "🌍" }
      case "icon8":
        return { type: "emoji", content: "⚡" }
      case "icon9":
        return { type: "emoji", content: "🔥" }
      default:
        return { type: "emoji", content: "😊" }
    }
  }

  // Canvas operations with all the original functionality
  const canvasOperations = useCanvasOperations({
    canvasRef: canvasDrawing.canvasRef,
    drawing,
    user,
    isPainted,
    dispatch,
    api,
    axios,
    addPaintedDrawing,
    onShowSnackbar: showSnackbar,
    drawings,
  })

  // Mouse handlers
  const mouseHandlers = useCanvasMouseHandlers({
    canvasRef: canvasDrawing.canvasRef,
    ctxRef: canvasDrawing.ctxRef,
    currentTool: canvasTools.currentTool,
    color: canvasTools.color,
    brushSize: canvasTools.brushSize,
    currentShape: canvasTools.currentShape,
    currentSticker: canvasTools.currentSticker,
    fillOptions: canvasTools.fillOptions,
    isDrawing: canvasDrawing.isDrawing,
    setIsDrawing: canvasDrawing.setIsDrawing,
    currentStroke: canvasDrawing.currentStroke,
    setCurrentStroke: canvasDrawing.setCurrentStroke,
    shapes: canvasDrawing.shapes,
    setShapes: canvasDrawing.setShapes,
    stickers: canvasDrawing.stickers,
    setStickers: canvasDrawing.setStickers,
    strokes: canvasDrawing.strokes,
    setStrokes: canvasDrawing.setStrokes,
    fillOperations: canvasDrawing.fillOperations,
    setFillOperations: canvasDrawing.setFillOperations,
    nextId: canvasDrawing.nextId,
    setNextId: canvasDrawing.setNextId,
    saveToHistory: canvasDrawing.saveToHistory,
    emojiMap,
    getIconContent,
  })

  // Fetch image URL effect
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!drawing) return

      try {
        const downloadResponse = await api.get(`/upload/download-url/${drawing?.name}`)
        const url = downloadResponse.data
        setImageUrl(url)

        if (url && !canvasTools.aiInstructionsOpen) {
          try {
            await api.get("/AIpaintings/aiDrawingInstructions", {
              params: { path: url },
            })
          } catch (error) {
            console.error("Error pre-fetching AI instructions:", error)
          }
        }
      } catch (error) {
        console.error("Error fetching image:", error)
      }
    }

    fetchImageUrl()
  }, [drawing, canvasTools.aiInstructionsOpen])

  // Initialize canvas effect
  useEffect(() => {
    if (!canvasDrawing.canvasRef.current || !imageUrl) return

    const canvas = canvasDrawing.canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvasDrawing.ctxRef.current = ctx
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      canvasDrawing.originalImageRef.current = img

      const aspectRatio = img.width / img.height
      let newWidth = canvasSize.width
      let newHeight = canvasSize.height

      if (aspectRatio > 1) {
        newHeight = canvasSize.width / aspectRatio
      } else {
        newWidth = canvasSize.height * aspectRatio
      }

      canvas.width = newWidth
      canvas.height = newHeight
      setCanvasSize({ width: newWidth, height: newHeight })

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      canvasDrawing.saveToHistory()
    }

    img.onerror = () => {
      console.error("Failed to load image:", imageUrl)
      showSnackbar(`שגיאה בטעינת התמונה`, "error")
    }
  }, [imageUrl])

  // Update brush settings effect
  useEffect(() => {
    const ctx = canvasDrawing.ctxRef.current
    if (ctx) {
      ctx.strokeStyle = canvasTools.color
      ctx.lineWidth = canvasTools.brushSize
    }
  }, [canvasTools.color, canvasTools.brushSize])

  // Redraw canvas effect
  useEffect(() => {
    redrawCanvas()
  }, [
    canvasDrawing.shapes,
    canvasDrawing.stickers,
    canvasDrawing.selectedShapeIndex,
    canvasDrawing.selectedStickerIndex,
  ])

  // Fetch data effects
  useEffect(() => {
    if (drawings.length === 0) {
      dispatch(fetchAllDrawings())
    }
  }, [dispatch, drawings])

  useEffect(() => {
    if (paintedDrawings.length === 0) {
      dispatch(fetchPaintedDrawingsByUserId(userId))
    }
  }, [dispatch, userId, paintedDrawings])

  const redrawCanvas = () => {
    const canvas = canvasDrawing.canvasRef.current
    const ctx = canvasDrawing.ctxRef.current
    if (!canvas || !ctx) return

    if (canvasDrawing.isDragging || canvasDrawing.isResizing) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (canvasDrawing.originalImageRef.current) {
      ctx.drawImage(canvasDrawing.originalImageRef.current, 0, 0, canvas.width, canvas.height)
    }

    // Draw fill operations
    canvasDrawing.fillOperations.forEach((fillOp) => {
      floodFill(ctx, fillOp.x, fillOp.y, fillOp.color, fillOp.tolerance)
    })

    // Draw strokes
    canvasDrawing.strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return

      ctx.beginPath()
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.width
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
      }
      ctx.stroke()
    })

    // Draw shapes
    canvasDrawing.shapes.forEach((shape, index) => {
      drawShape(ctx, shape)
      if (index === canvasDrawing.selectedShapeIndex) {
        ctx.strokeStyle = "#1976D2"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
        ctx.setLineDash([])
        drawResizeHandles(ctx, shape)
      }
    })

    // Draw stickers
    canvasDrawing.stickers.forEach((sticker, index) => {
      if (sticker.type === "emoji") {
        ctx.font = `${sticker.size}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(sticker.content, sticker.x, sticker.y)
      } else if (sticker.type === "icon") {
        ctx.beginPath()
        ctx.fillStyle = sticker.content
        ctx.arc(sticker.x, sticker.y, sticker.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      if (index === canvasDrawing.selectedStickerIndex) {
        ctx.strokeStyle = "#1976D2"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(sticker.x - sticker.size / 2, sticker.y - sticker.size / 2, sticker.size, sticker.size)
        ctx.setLineDash([])
        drawResizeHandles(ctx, {
          x: sticker.x,
          y: sticker.y,
          width: sticker.size,
          height: sticker.size,
        })
      }
    })

    if (!canvasDrawing.isDragging && !canvasDrawing.isResizing) {
      setTimeout(() => {
        canvasDrawing.saveToHistory()
      }, 10)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasDrawing.canvasRef.current
    const ctx = canvasDrawing.ctxRef.current
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (canvasDrawing.originalImageRef.current) {
      ctx.drawImage(canvasDrawing.originalImageRef.current, 0, 0, canvas.width, canvas.height)
      canvasDrawing.clearAll()
      canvasDrawing.saveToHistory()
    }
  }

  const handleToolChange = (tool: ToolType) => {
    canvasTools.setCurrentTool(tool)
    canvasDrawing.setSelectedShapeIndex(-1)
    canvasDrawing.setSelectedStickerIndex(-1)
  }

  const handleShapeSelect = (shape: string, size: number, color: string, filled: boolean) => {
    canvasTools.setCurrentShape({ type: shape, size, color, filled })
    canvasTools.setCurrentTool("shape")
    canvasTools.setShapesToolOpen(false)
  }

  const handleStickerSelect = (sticker: string, size: number) => {
    canvasTools.setCurrentSticker({ id: sticker, size })
    canvasTools.setCurrentTool("sticker")
    canvasTools.setStickersToolOpen(false)
  }

  const handleFillOptionsSelect = (color: string, tolerance: number) => {
    canvasTools.setFillOptions({ color, tolerance })
    canvasTools.setCurrentTool("fill")
    canvasTools.setFillBucketToolOpen(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        p: 3,
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <CanvasHeader
        drawing={drawing}
        aiInstructionsOpen={canvasTools.aiInstructionsOpen}
        onToggleAiInstructions={() => canvasTools.setAiInstructionsOpen(!canvasTools.aiInstructionsOpen)}
      />

      <CanvasToolbar
        color={canvasTools.color}
        brushSize={canvasTools.brushSize}
        currentTool={canvasTools.currentTool}
        zoom={canvasTools.zoom}
        historyIndex={canvasDrawing.historyIndex}
        canvasHistoryLength={canvasDrawing.canvasHistory.length}
        onColorChange={canvasTools.setColor}
        onBrushSizeChange={canvasTools.setBrushSize}
        onToolChange={handleToolChange}
        onUndo={canvasDrawing.undo}
        onRedo={canvasDrawing.redo}
        onZoomIn={canvasTools.handleZoomIn}
        onZoomOut={canvasTools.handleZoomOut}
        onOpenFillTool={() => canvasTools.setFillBucketToolOpen(true)}
        onOpenShapesTool={() => canvasTools.setShapesToolOpen(true)}
        onOpenStickersTool={() => canvasTools.setStickersToolOpen(true)}
      />

      <ColorPalette selectedColor={canvasTools.color} onColorSelect={canvasTools.setColor} />

      <CanvasContainer
        canvasRef={canvasDrawing.canvasRef}
        zoom={canvasTools.zoom}
        currentTool={canvasTools.currentTool}
        onMouseDown={mouseHandlers.handleMouseDown}
        onMouseMove={mouseHandlers.handleMouseMove}
        onMouseUp={mouseHandlers.handleMouseUp}
      >
        {drawing && imageUrl && canvasTools.aiInstructionsOpen && (
          <Box sx={{ width: "320px", height: "600px" }}>
            <AIInstructionsPanel
              imageUrl={imageUrl}
              isOpen={canvasTools.aiInstructionsOpen}
              onClose={() => canvasTools.setAiInstructionsOpen(false)}
            />
          </Box>
        )}

        {canvasTools.shapesToolOpen && (
          <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
            <ShapesTool onSelectShape={handleShapeSelect} onClose={() => canvasTools.setShapesToolOpen(false)} />
          </Box>
        )}

        {canvasTools.stickersToolOpen && (
          <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
            <StickersTool
              onSelectSticker={handleStickerSelect}
              onClose={() => canvasTools.setStickersToolOpen(false)}
            />
          </Box>
        )}

        {canvasTools.fillBucketToolOpen && (
          <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
            <FillBucketTool
              onSelectFillOptions={handleFillOptionsSelect}
              onClose={() => canvasTools.setFillBucketToolOpen(false)}
              currentColor={canvasTools.color}
            />
          </Box>
        )}
      </CanvasContainer>

      <CanvasActions
        isPainted={isPainted}
        onPrint={canvasOperations.printCanvas}
        onDownload={canvasOperations.downloadCanvas}
        onClear={clearCanvas}
        onSave={canvasOperations.handleSave}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{
            width: "400px",
            fontSize: "1.2rem",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            backgroundColor: snackbarSeverity === "success" ? "#28a745" : "#dc3545",
            color: "#ffffff",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default PaintCanvas
