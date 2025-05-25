"use client"

import { useState } from "react"
import type { ToolType, CurrentShape, CurrentSticker, FillOptions } from "../types"

export const useCanvasTools = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>("brush")
  const [color, setColor] = useState<string>("#000000")
  const [brushSize, setBrushSize] = useState<number>(5)
  const [zoom, setZoom] = useState<number>(1)

  const [currentShape, setCurrentShape] = useState<CurrentShape>({
    type: "circle",
    size: 50,
    color: "#000000",
    filled: false,
  })

  const [currentSticker, setCurrentSticker] = useState<CurrentSticker>({
    id: "emoji1",
    size: 50,
  })

  const [fillOptions, setFillOptions] = useState<FillOptions>({
    color: "#000000",
    tolerance: 30,
  })

  const [aiInstructionsOpen, setAiInstructionsOpen] = useState<boolean>(false)
  const [shapesToolOpen, setShapesToolOpen] = useState<boolean>(false)
  const [stickersToolOpen, setStickersToolOpen] = useState<boolean>(false)
  const [fillBucketToolOpen, setFillBucketToolOpen] = useState<boolean>(false)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  return {
    currentTool,
    setCurrentTool,
    color,
    setColor,
    brushSize,
    setBrushSize,
    zoom,
    setZoom,
    currentShape,
    setCurrentShape,
    currentSticker,
    setCurrentSticker,
    fillOptions,
    setFillOptions,
    aiInstructionsOpen,
    setAiInstructionsOpen,
    shapesToolOpen,
    setShapesToolOpen,
    stickersToolOpen,
    setStickersToolOpen,
    fillBucketToolOpen,
    setFillBucketToolOpen,
    handleZoomIn,
    handleZoomOut,
  }
}
