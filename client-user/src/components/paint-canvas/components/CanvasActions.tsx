"use client"

import type React from "react"
import { Paper, Button, Tooltip, alpha } from "@mui/material"
import { Print, Download, Clear, Save } from "@mui/icons-material"

interface CanvasActionsProps {
  isPainted: boolean
  onPrint: () => void
  onDownload: () => void
  onClear: () => void
  onSave: () => void
}

export const CanvasActions: React.FC<CanvasActionsProps> = ({ isPainted, onPrint, onDownload, onClear, onSave }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        gap: 2,
        p: 2.5,
        borderRadius: "12px",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#ffffff",
        boxShadow: `0 4px 20px ${alpha("#FF6B35", 0.1)}`,
      }}
    >
      <Tooltip title="הדפס">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Print />}
          onClick={onPrint}
          sx={{
            borderRadius: "10px",
            background: "linear-gradient(135deg, #FF6B35 0%, #1976D2 100%)",
            boxShadow: `0 4px 14px ${alpha("#FF6B35", 0.3)}`,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 6px 20px ${alpha("#FF6B35", 0.4)}`,
            },
          }}
        >
          הדפס
        </Button>
      </Tooltip>

      <Tooltip title="הורד">
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={onDownload}
          sx={{
            borderRadius: "10px",
            background: "linear-gradient(135deg, #333333 0%, #666666 100%)",
            boxShadow: `0 4px 14px ${alpha("#333333", 0.3)}`,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 6px 20px ${alpha("#333333", 0.4)}`,
            },
          }}
        >
          הורד
        </Button>
      </Tooltip>

      <Tooltip title="נקה">
        <Button
          variant="contained"
          color="error"
          startIcon={<Clear />}
          onClick={onClear}
          sx={{
            borderRadius: "10px",
            background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
            boxShadow: `0 4px 14px ${alpha("#dc3545", 0.3)}`,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 6px 20px ${alpha("#dc3545", 0.4)}`,
            },
          }}
        >
          נקה
        </Button>
      </Tooltip>

      <Tooltip title="שמור באזור האישי">
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={onSave}
          sx={{
            borderRadius: "10px",
            background: "linear-gradient(135deg, #42A5F5 0%, #FF6B35 100%)",
            boxShadow: `0 4px 14px ${alpha("#42A5F5", 0.3)}`,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 6px 20px ${alpha("#42A5F5", 0.4)}`,
            },
          }}
        >
          שמור באזור האישי
        </Button>
      </Tooltip>
    </Paper>
  )
}
