"use client"

import { useRef, useState, useCallback } from "react"
import type { Shape, Sticker, Stroke, FillOperation, CanvasHistoryState } from "../types"

export const useCanvasDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const originalImageRef = useRef<HTMLImageElement | null>(null)

  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([])
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [shapes, setShapes] = useState<Shape[]>([])
  const [stickers, setStickers] = useState<Sticker[]>([])
  const [fillOperations, setFillOperations] = useState<FillOperation[]>([])
  const [canvasHistory, setCanvasHistory] = useState<CanvasHistoryState[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number>(-1)
  const [selectedStickerIndex, setSelectedStickerIndex] = useState<number>(-1)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [resizeHandleIndex, setResizeHandleIndex] = useState<number>(-1)
  const [dragStartX, setDragStartX] = useState<number>(0)
  const [dragStartY, setDragStartY] = useState<number>(0)
  const [nextId, setNextId] = useState<number>(1)

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newHistory = canvasHistory.slice(0, historyIndex + 1)

    newHistory.push({
      imageData,
      shapes: [...shapes],
      stickers: [...stickers],
    })

    setCanvasHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [canvasHistory, historyIndex, shapes, stickers])

  const undo = useCallback(() => {
    if (historyIndex <= 0) return

    if (fillOperations.length > 0) {
      const newFillOps = [...fillOperations]
      const lastFillOp = newFillOps.pop()
      setFillOperations(newFillOps)

      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (canvas && ctx && lastFillOp) {
        ctx.putImageData(lastFillOp.originalImageData, 0, 0)
      }
      return
    }

    if (strokes.length > 0) {
      const newStrokes = [...strokes]
      newStrokes.pop()
      setStrokes(newStrokes)
      return
    }

    const newIndex = historyIndex - 1
    const historyState = canvasHistory[newIndex]

    if (historyState) {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (canvas && ctx && historyState.imageData) {
        ctx.putImageData(historyState.imageData, 0, 0)
      }

      setShapes(historyState.shapes)
      setStickers(historyState.stickers)
      setHistoryIndex(newIndex)
    }
  }, [historyIndex, canvasHistory, fillOperations, strokes])

  const redo = useCallback(() => {
    if (historyIndex >= canvasHistory.length - 1) return

    const newIndex = historyIndex + 1
    const historyState = canvasHistory[newIndex]

    if (historyState) {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (canvas && ctx && historyState.imageData) {
        ctx.putImageData(historyState.imageData, 0, 0)
      }

      setShapes(historyState.shapes)
      setStickers(historyState.stickers)
      setHistoryIndex(newIndex)
    }
  }, [historyIndex, canvasHistory])

  const clearAll = useCallback(() => {
    setShapes([])
    setStickers([])
    setStrokes([])
    setFillOperations([])
    setSelectedShapeIndex(-1)
    setSelectedStickerIndex(-1)
  }, [])

  return {
    canvasRef,
    ctxRef,
    originalImageRef,
    isDrawing,
    setIsDrawing,
    currentStroke,
    setCurrentStroke,
    strokes,
    setStrokes,
    shapes,
    setShapes,
    stickers,
    setStickers,
    fillOperations,
    setFillOperations,
    canvasHistory,
    historyIndex,
    selectedShapeIndex,
    setSelectedShapeIndex,
    selectedStickerIndex,
    setSelectedStickerIndex,
    isDragging,
    setIsDragging,
    isResizing,
    setIsResizing,
    resizeHandleIndex,
    setResizeHandleIndex,
    dragStartX,
    setDragStartX,
    dragStartY,
    setDragStartY,
    nextId,
    setNextId,
    saveToHistory,
    undo,
    redo,
    clearAll,
  }
}
