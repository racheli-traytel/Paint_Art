"use client"

import type React from "react"
import { Box, Typography, Button, Paper, alpha, Tooltip } from "@mui/material"
import { AutoAwesome, Close } from "@mui/icons-material"
import type { Drawing, PaintedDrawing } from "../types"

interface CanvasHeaderProps {
  drawing: Drawing | PaintedDrawing | undefined
  aiInstructionsOpen: boolean
  onToggleAiInstructions: () => void
}

export const CanvasHeader: React.FC<CanvasHeaderProps> = ({ drawing, aiInstructionsOpen, onToggleAiInstructions }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        p: 2,
        borderRadius: "12px",
        backgroundColor: alpha("#ffffff", 0.8),
        backdropFilter: "blur(10px)",
        border: `1px solid ${alpha("#FF6B35", 0.1)}`,
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight="bold" color="#FF6B35" sx={{ mb: 0.5 }}>
          {drawing ? (drawing as Drawing)?.title || "ציור" : "ציור חדש"}
        </Typography>
        <Typography variant="body2" color="#666666">
          {drawing
            ? (drawing as Drawing)?.description || "צבע את הציור בעזרת הכלים למטה"
            : "צבע את הציור בעזרת הכלים למטה"}
        </Typography>
      </Box>

      <Box>
        {drawing && (
          <Tooltip title={aiInstructionsOpen ? "סגור הנחיות AI" : "הצג הנחיות צביעה מה-AI"}>
            <Button
              variant="contained"
              onClick={onToggleAiInstructions}
              sx={{
                background: aiInstructionsOpen
                  ? `linear-gradient(45deg, #FF6B35 30%, #42A5F5 90%)`
                  : `linear-gradient(45deg, #1976D2 0%, #FF6B35 50%, #42A5F5 100%)`,
                backgroundSize: "200% 100%",
                animation: aiInstructionsOpen ? "none" : "shimmer 3s infinite linear, float 3s infinite ease-in-out",
                color: "white",
                boxShadow: aiInstructionsOpen
                  ? `0 6px 20px -5px ${alpha("#FF6B35", 0.5)}`
                  : `0 6px 20px -5px ${alpha("#1976D2", 0.5)}`,
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: aiInstructionsOpen
                    ? `0 10px 25px -3px ${alpha("#FF6B35", 0.6)}`
                    : `0 10px 25px -3px ${alpha("#1976D2", 0.6)}`,
                },
                borderRadius: "16px",
                padding: "14px 24px",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              startIcon={<AutoAwesome />}
              endIcon={aiInstructionsOpen ? <Close /> : <AutoAwesome />}
            >
              {aiInstructionsOpen ? "סגור הנחיות" : "הנחיות צביעה מה-AI"}
            </Button>
          </Tooltip>
        )}
      </Box>
    </Paper>
  )
}
