"use client"

import type React from "react"
import { Box, IconButton, Tooltip, Slider, Typography, Paper, alpha, Divider, Chip } from "@mui/material"
import {
  ColorLens,
  Brush,
  Delete,
  FormatColorFill,
  Category,
  EmojiEmotions,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material"
import type { ToolType } from "../types"

interface CanvasToolbarProps {
  color: string
  brushSize: number
  currentTool: ToolType
  zoom: number
  historyIndex: number
  canvasHistoryLength: number
  onColorChange: (color: string) => void
  onBrushSizeChange: (size: number) => void
  onToolChange: (tool: ToolType) => void
  onUndo: () => void
  onRedo: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onOpenFillTool: () => void
  onOpenShapesTool: () => void
  onOpenStickersTool: () => void
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  color,
  brushSize,
  currentTool,
  zoom,
  historyIndex,
  canvasHistoryLength,
  onColorChange,
  onBrushSizeChange,
  onToolChange,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onOpenFillTool,
  onOpenShapesTool,
  onOpenStickersTool,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        p: 2,
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: `0 4px 20px ${alpha("#FF6B35", 0.1)}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title="בחר צבע">
          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{
                backgroundColor: alpha("#FF6B35", 0.1),
                "&:hover": {
                  backgroundColor: alpha("#FF6B35", 0.2),
                },
                border: `2px solid ${color}`,
                transition: "all 0.2s ease",
              }}
            >
              <ColorLens sx={{ color: color }} />
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
        </Tooltip>

        <Tooltip title="מכחול">
          <IconButton
            onClick={() => onToolChange("brush")}
            sx={{
              backgroundColor: currentTool === "brush" ? alpha("#FF6B35", 0.2) : alpha("#FF6B35", 0.1),
              border: currentTool === "brush" ? `2px solid #FF6B35` : "none",
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
            }}
          >
            <Brush />
          </IconButton>
        </Tooltip>

        <Tooltip title="מחק">
          <IconButton
            onClick={() => onToolChange("eraser")}
            sx={{
              backgroundColor: currentTool === "eraser" ? alpha("#FF6B35", 0.2) : alpha("#FF6B35", 0.1),
              border: currentTool === "eraser" ? `2px solid #FF6B35` : "none",
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>

        <Tooltip title="דלי מילוי">
          <IconButton
            onClick={onOpenFillTool}
            sx={{
              backgroundColor: currentTool === "fill" ? alpha("#FF6B35", 0.2) : alpha("#FF6B35", 0.1),
              border: currentTool === "fill" ? `2px solid #FF6B35` : "none",
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
            }}
          >
            <FormatColorFill />
          </IconButton>
        </Tooltip>

        <Tooltip title="צורות">
          <IconButton
            onClick={onOpenShapesTool}
            sx={{
              backgroundColor: currentTool === "shape" ? alpha("#FF6B35", 0.2) : alpha("#FF6B35", 0.1),
              border: currentTool === "shape" ? `2px solid #FF6B35` : "none",
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
            }}
          >
            <Category />
          </IconButton>
        </Tooltip>

        <Tooltip title="מדבקות">
          <IconButton
            onClick={onOpenStickersTool}
            sx={{
              backgroundColor: currentTool === "sticker" ? alpha("#FF6B35", 0.2) : alpha("#FF6B35", 0.1),
              border: currentTool === "sticker" ? `2px solid #FF6B35` : "none",
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
            }}
          >
            <EmojiEmotions />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <Box sx={{ width: 150 }}>
          <Slider
            value={brushSize}
            min={1}
            max={50}
            onChange={(_e, newValue) => onBrushSizeChange(newValue as number)}
            sx={{
              color: "#FF6B35",
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0 0 0 8px ${alpha("#FF6B35", 0.16)}`,
                },
              },
            }}
          />
          <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>
            גודל מכחול: {brushSize}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="בטל">
          <IconButton
            onClick={onUndo}
            disabled={historyIndex <= 0}
            sx={{
              backgroundColor: alpha("#FF6B35", 0.1),
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
              "&.Mui-disabled": {
                backgroundColor: alpha("#999999", 0.1),
              },
            }}
          >
            <Undo />
          </IconButton>
        </Tooltip>

        <Tooltip title="בצע שוב">
          <IconButton
            onClick={onRedo}
            disabled={historyIndex >= canvasHistoryLength - 1}
            sx={{
              backgroundColor: alpha("#FF6B35", 0.1),
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
              "&.Mui-disabled": {
                backgroundColor: alpha("#999999", 0.1),
              },
            }}
          >
            <Redo />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <Tooltip title="הגדל">
          <IconButton
            onClick={onZoomIn}
            disabled={zoom >= 2}
            sx={{
              backgroundColor: alpha("#FF6B35", 0.1),
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
              "&.Mui-disabled": {
                backgroundColor: alpha("#999999", 0.1),
              },
            }}
          >
            <ZoomIn />
          </IconButton>
        </Tooltip>

        <Tooltip title="הקטן">
          <IconButton
            onClick={onZoomOut}
            disabled={zoom <= 0.5}
            sx={{
              backgroundColor: alpha("#FF6B35", 0.1),
              "&:hover": {
                backgroundColor: alpha("#FF6B35", 0.2),
              },
              "&.Mui-disabled": {
                backgroundColor: alpha("#999999", 0.1),
              },
            }}
          >
            <ZoomOut />
          </IconButton>
        </Tooltip>

        <Chip
          label={`זום: ${Math.round(zoom * 100)}%`}
          size="small"
          sx={{
            ml: 1,
            backgroundColor: alpha("#FF6B35", 0.1),
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        />
      </Box>
    </Paper>
  )
}
