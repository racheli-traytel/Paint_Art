"use client"

import type React from "react"
import { useState } from "react"
import { Box, Paper, Typography, IconButton, Tooltip, useTheme, alpha, Divider, Slider, Button } from "@mui/material"
import { Close, ColorLens, Opacity } from "@mui/icons-material"

interface FillBucketToolProps {
  onSelectFillOptions: (color: string, tolerance: number) => void
  onClose: () => void
  currentColor: string
}

const FillBucketTool: React.FC<FillBucketToolProps> = ({ onSelectFillOptions, onClose, currentColor }) => {
  const theme = useTheme()
  const [fillColor, setFillColor] = useState<string>(currentColor)
  const [tolerance, setTolerance] = useState<number>(30)

  const colorPalette = [
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
    "#0000FF",
    "#4B0082",
    "#800080",
    "#FF00FF",
    "#FF69B4",
    "#A52A2A",
    "#000000",
    "#808080",
    "#FFFFFF",
  ]

  const handleColorSelect = (color: string) => {
    setFillColor(color)
    // Don't call onSelectFillOptions here, just update the local state
  }

  const handleToleranceChange = (_event: Event, newValue: number | number[]) => {
    const newTolerance = newValue as number
    setTolerance(newTolerance)
    // We're only updating the local state here, not calling onSelectFillOptions
    // which would close the panel
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: "300px",
        p: 2,
        borderRadius: "12px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          דלי מילוי
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <ColorLens sx={{ color: theme.palette.primary.main }} />
          <Typography variant="subtitle2">צבע מילוי:</Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: fillColor,
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              boxShadow: `inset 0 0 5px ${alpha("#000", 0.1)}`,
              mb: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              const input = document.createElement("input")
              input.type = "color"
              input.value = fillColor
              input.addEventListener("input", (e) => {
                const target = e.target as HTMLInputElement
                setFillColor(target.value)
              })
              input.click()
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {colorPalette.map((color) => (
            <Tooltip key={color} title={color}>
              <Box
                onClick={() => handleColorSelect(color)}
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: color,
                  borderRadius: "4px",
                  cursor: "pointer",
                  border:
                    fillColor === color
                      ? `2px solid ${theme.palette.primary.main}`
                      : color === "#FFFFFF"
                        ? "1px solid #ddd"
                        : "none",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Opacity sx={{ color: theme.palette.primary.main }} />
          <Typography variant="subtitle2">סבילות ({tolerance}%):</Typography>
        </Box>
        <Slider
          value={tolerance}
          min={0}
          max={100}
          onChange={handleToleranceChange}
          sx={{
            color: theme.palette.primary.main,
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.16)}`,
              },
            },
          }}
        />
        <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 1 }}>
          סבילות נמוכה = מילוי מדויק יותר, סבילות גבוהה = מילוי אזורים דומים
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" color="primary" onClick={onClose} sx={{ borderRadius: "8px" }}>
          סגור
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSelectFillOptions(fillColor, tolerance)}
          sx={{ borderRadius: "8px" }}
        >
          החל צבע
        </Button>
      </Box>
    </Paper>
  )
}

export default FillBucketTool
