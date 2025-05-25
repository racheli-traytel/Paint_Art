"use client"

import type React from "react"
import { useCallback } from "react"
import type { ToolType, CurrentShape, CurrentSticker, FillOptions } from "../types"
import { floodFill } from "../utils/canvasUtils"

type Point = { x: number; y: number }

type Stroke = {
  points: Point[]
  color: string
  width: number
  tool: string
}

type Shape = {
  id: number
  type: string
  x: number
  y: number
  width: number
  height: number
  color: string
  filled: boolean
}

type Sticker = {
  id: number
  type: string
  x: number
  y: number
  size: number
  content: string
}

type FillOperation = {
  x: number
  y: number
  color: string
  tolerance: number
  originalImageData: ImageData
}

interface UseCanvasMouseHandlersProps {
  canvasRef: React.RefObject<HTMLCanvasElement|null>
  ctxRef: React.RefObject<CanvasRenderingContext2D | null>
  currentTool: ToolType
  color: string
  brushSize: number
  currentShape: CurrentShape
  currentSticker: CurrentSticker
  fillOptions: FillOptions
  isDrawing: boolean
  setIsDrawing: (drawing: boolean) => void
  currentStroke: Point[]
  setCurrentStroke: React.Dispatch<React.SetStateAction<Point[]>>
  shapes: Shape[]
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
  stickers: Sticker[]
  setStickers: React.Dispatch<React.SetStateAction<Sticker[]>>
  strokes: Stroke[]
  setStrokes: React.Dispatch<React.SetStateAction<Stroke[]>>
  fillOperations: FillOperation[]
  setFillOperations: React.Dispatch<React.SetStateAction<FillOperation[]>>
  nextId: number
  setNextId: (id: number) => void
  saveToHistory: () => void
  emojiMap: Record<string, string>
  getIconContent: (iconId: string) => { type: string; content: string }
}

export const useCanvasMouseHandlers = ({
  canvasRef,
  ctxRef,
  currentTool,
  color,
  brushSize,
  currentShape,
  currentSticker,
  fillOptions,
  isDrawing,
  setIsDrawing,
  currentStroke,
  setCurrentStroke,
  setShapes,
  setStickers,
  setStrokes,
  setFillOperations,
  nextId,
  setNextId,
  saveToHistory,
  emojiMap,
  getIconContent,
}: UseCanvasMouseHandlersProps) => {
  const getCanvasCoordinates = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      }
    },
    [canvasRef],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (!canvas || !ctx) return

      const { x, y } = getCanvasCoordinates(e)

      if (currentTool === "brush" || currentTool === "eraser") {
        setIsDrawing(true)
        ctx.beginPath()
        ctx.moveTo(x, y)
        setCurrentStroke([{ x, y }])
      } else if (currentTool === "shape") {
        const newShape: Shape = {
          id: nextId,
          type: currentShape.type,
          x,
          y,
          width: currentShape.size,
          height: currentShape.size,
          color: currentShape.color,
          filled: currentShape.filled,
        }
        setShapes((prev) => [...prev, newShape])
        setNextId(nextId + 1)
      } else if (currentTool === "sticker") {
        let stickerContent = ""
        let stickerType = "emoji"

        if (currentSticker.id.startsWith("emoji")) {
          stickerContent = emojiMap[currentSticker.id] || "😊"
        } else {
          const iconData = getIconContent(currentSticker.id)
          stickerContent = iconData.content
          stickerType = iconData.type
        }

        const newSticker: Sticker = {
          id: nextId,
          type: stickerType,
          x,
          y,
          size: currentSticker.size,
          content: stickerContent,
        }

        setStickers((prev) => [...prev, newSticker])
        setNextId(nextId + 1)
      } else if (currentTool === "fill") {
        const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        floodFill(ctx, Math.floor(x), Math.floor(y), fillOptions.color, fillOptions.tolerance)

        setFillOperations((prev) => [
          ...prev,
          {
            x: Math.floor(x),
            y: Math.floor(y),
            color: fillOptions.color,
            tolerance: fillOptions.tolerance,
            originalImageData,
          },
        ])

        saveToHistory()
      }
    },
    [
      canvasRef,
      ctxRef,
      currentTool,
      currentShape,
      currentSticker,
      fillOptions,
      nextId,
      setIsDrawing,
      setCurrentStroke,
      setShapes,
      setStickers,
      setFillOperations,
      setNextId,
      saveToHistory,
      emojiMap,
      getIconContent,
      getCanvasCoordinates,
    ],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || (currentTool !== "brush" && currentTool !== "eraser")) return

      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (!canvas || !ctx) return

      const { x, y } = getCanvasCoordinates(e)

      ctx.strokeStyle = currentTool === "eraser" ? "#ffffff" : color
      ctx.lineWidth = brushSize
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)

      setCurrentStroke((prev) => [...prev, { x, y }])
    },
    [isDrawing, currentTool, color, brushSize, canvasRef, ctxRef, setCurrentStroke, getCanvasCoordinates],
  )

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return

    setIsDrawing(false)
    ctxRef.current?.beginPath()

    if (currentStroke.length > 0) {
      setStrokes((prev) => [
        ...prev,
        {
          points: [...currentStroke],
          color: currentTool === "eraser" ? "#ffffff" : color,
          width: brushSize,
          tool: currentTool === "eraser" ? "eraser" : "brush",
        },
      ])
      setCurrentStroke([])
      saveToHistory()
    }
  }, [
    isDrawing,
    currentStroke,
    currentTool,
    color,
    brushSize,
    ctxRef,
    setIsDrawing,
    setCurrentStroke,
    setStrokes,
    saveToHistory,
  ])

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
