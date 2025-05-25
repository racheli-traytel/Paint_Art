export interface Shape {
  id: number
  type: string
  x: number
  y: number
  width: number
  height: number
  color: string
  filled: boolean
  points?: { x: number; y: number }[]
}

export interface Sticker {
  id: number
  type: string
  x: number
  y: number
  size: number
  content: string
}

export interface Stroke {
  points: { x: number; y: number }[]
  color: string
  width: number
  tool: string
}

export interface FillOperation {
  x: number
  y: number
  color: string
  tolerance: number
  originalImageData: ImageData
}

export interface CanvasHistoryState {
  imageData: ImageData | null
  shapes: Shape[]
  stickers: Sticker[]
}

export type ToolType = "brush" | "eraser" | "shape" | "sticker" | "fill" | "select"

export interface CurrentShape {
  type: string
  size: number
  color: string
  filled: boolean
}

export interface CurrentSticker {
  id: string
  size: number
}

export interface FillOptions {
  color: string
  tolerance: number
}

export interface Drawing {
  id: number
  title: string
  description: string
  category: string
  name: string
}

export interface PaintedDrawing {
  id: number
  drawingId: number
  userId: number
  imageUrl: string
  name: string
}

export interface User {
  id: number
  name: string
}

// Redux Store Types
export interface RootStore {
  drawings: {
    drawings: Drawing[]
  }
  paintedDrawings: {
    paintedDrawings: PaintedDrawing[]
  }
  auth: {
    user: User | null
  }
}

export type AppDispatch = (action: any) => any
