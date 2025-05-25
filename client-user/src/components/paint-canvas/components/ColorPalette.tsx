"use client"

import type React from "react"
import { Paper, IconButton, Tooltip, alpha } from "@mui/material"

interface ColorPaletteProps {
  selectedColor: string
  onColorSelect: (color: string) => void
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onColorSelect }) => {
  const colorPalette = [
    "#FF6B35",
    "#FF8C42",
    "#E55100",
    "#1976D2",
    "#1565C0",
    "#42A5F5",
    "#333333",
    "#666666",
    "#999999",
    "#28a745",
    "#dc3545",
    "#ffc107",
    "#FF0000",
    "#FF4500",
    "#FFA500",
    "#FFD700",
    "#FFFF00",
    "#9ACD32",
    "#00FF00",
    "#008000",
    "#00FFFF",
    "#1E90FF",
    "#FFFFFF",
  ]

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 1,
        p: 2,
        borderRadius: "12px",
        width: "100%",
        backgroundColor: "#ffffff",
        boxShadow: `0 4px 20px ${alpha("#FF6B35", 0.1)}`,
      }}
    >
      {colorPalette.map((colorOption) => (
        <Tooltip key={colorOption} title={`בחר צבע ${colorOption}`}>
          <IconButton
            onClick={() => onColorSelect(colorOption)}
            sx={{
              backgroundColor: colorOption,
              width: 36,
              height: 36,
              transition: "all 0.2s ease",
              "&:hover": {
                opacity: 0.8,
                transform: "scale(1.1)",
              },
              border:
                colorOption === selectedColor
                  ? `3px solid #FF6B35`
                  : colorOption === "#FFFFFF"
                    ? "1px solid #ddd"
                    : "none",
              boxShadow:
                colorOption === selectedColor
                  ? `0 0 0 2px ${alpha("#ffffff", 0.8)}, 0 0 0 4px ${alpha("#FF6B35", 0.3)}`
                  : "none",
            }}
          />
        </Tooltip>
      ))}
    </Paper>
  )
}
