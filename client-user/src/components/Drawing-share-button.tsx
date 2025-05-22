"use client"

import { useState } from "react"
import { Button, IconButton, Tooltip } from "@mui/material"
import { Share as ShareIcon } from "@mui/icons-material"
import DrawingShareDialog from "./drawing-share-dialog"

interface DrawingShareButtonProps {
  userId: number
  variant?: "button" | "icon"
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  size?: "small" | "medium" | "large"
  tooltip?: string
}

export default function DrawingShareButton({
  userId,
  variant = "button",
  color = "primary",
  size = "medium",
  tooltip = "Share your drawings",
}: DrawingShareButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const button =
    variant === "button" ? (
      <Button variant="contained" color={color} size={size} startIcon={<ShareIcon />} onClick={handleOpenDialog}>
        Share Drawings
      </Button>
    ) : (
      <IconButton color={color} size={size} onClick={handleOpenDialog} aria-label="share drawings">
        <ShareIcon />
      </IconButton>
    )

  return (
    <>
      {tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button}

      <DrawingShareDialog open={dialogOpen} onClose={handleCloseDialog} userId={userId} />
    </>
  )
}
