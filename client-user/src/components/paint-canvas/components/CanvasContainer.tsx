"use client"

import type React from "react"
import { Box, alpha } from "@mui/material"
import type { ToolType } from "../types"

interface CanvasContainerProps {
  canvasRef: React.RefObject<HTMLCanvasElement|null>
  zoom: number
  currentTool: ToolType
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseUp: () => void
  children?: React.ReactNode
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  canvasRef,
  zoom,
  currentTool,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  children,
}) => {
  const getCursor = () => {
    switch (currentTool) {
      case "eraser":
        return "url(/eraser-cursor.png), auto"
      case "shape":
        return "crosshair"
      case "sticker":
      case "fill":
        return "cell"
      default:
        return "crosshair"
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        gap: 3,
        position: "relative",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: `0 10px 30px ${alpha("#333333", 0.1)}`,
          border: `1px solid ${alpha("#FF6B35", 0.1)}`,
          backgroundColor: "#ffffff",
          p: 2,
        }}
      >
        <Box
          sx={{
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              cursor: getCursor(),
              backgroundColor: "#ffffff",
              maxWidth: "100%",
              height: "auto",
              display: "block",
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
          />
        </Box>
      </Box>
      {children}
    </Box>
  )
}
