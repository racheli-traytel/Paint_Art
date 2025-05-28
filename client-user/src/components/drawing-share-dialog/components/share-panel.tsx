"use client"

import type React from "react"
import { Box, Typography, TextField, InputAdornment, IconButton, Button, Tooltip, Paper } from "@mui/material"
import {
  Share as ShareIcon,
  ContentCopy as ContentCopyIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
} from "@mui/icons-material"
import { SHARE_PLATFORMS, DIALOG_STYLES } from "../constants"
import type { Drawing } from "../types"

interface SharePanelProps {
  selectedDrawing: Drawing | null
  onCopyLink: () => void
  onShare: (platform: string) => void
}

const SharePanel: React.FC<SharePanelProps> = ({ selectedDrawing, onCopyLink, onShare }) => {
  if (!selectedDrawing) {
    return (
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "white",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: "#333" }}>
          שיתוף הציור
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            py: 4,
            color: "text.secondary",
          }}
        >
          <ShareIcon sx={{ fontSize: 60, color: "#ddd", mb: 2 }} />
          <Typography variant="body1" align="center">
            בחר ציור לשיתוף
          </Typography>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: "#333" }}>
        שיתוף הציור
      </Typography>

      <Box
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={selectedDrawing.imageUrl || "/placeholder.svg"}
          alt={selectedDrawing.name}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {selectedDrawing.name}
      </Typography>

      <Box sx={{ mt: 1, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          value={selectedDrawing.imageUrl}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="העתק קישור">
                  <IconButton edge="end" onClick={onCopyLink} size="small">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
        />
      </Box>

      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
        שתף באמצעות:
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
        <Tooltip title="שתף בוואטסאפ">
          <IconButton
            onClick={() => onShare(SHARE_PLATFORMS.WHATSAPP)}
            sx={{
              background: "linear-gradient(135deg, #00b09b, #96c93d)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #009688, #8BC34A)",
              },
            }}
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="שתף בפייסבוק">
          <IconButton
            onClick={() => onShare(SHARE_PLATFORMS.FACEBOOK)}
            sx={{
              background: DIALOG_STYLES.gradient,
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #5c0fb3, #1e68e0)",
              },
            }}
          >
            <FacebookIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="שתף בטוויטר">
          <IconButton
            onClick={() => onShare(SHARE_PLATFORMS.TWITTER)}
            sx={{
              background: "linear-gradient(135deg, #b6d0ff 0%, #cce5fc 100%)",
              color: "#1976d2",
              "&:hover": {
                background: "linear-gradient(135deg, #a1c4ff, #b8dbfc)",
              },
            }}
          >
            <TwitterIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="שלח במייל">
          <IconButton
            onClick={() => onShare(SHARE_PLATFORMS.EMAIL)}
            sx={{
              background: DIALOG_STYLES.emailGradient,
              color: "white",
              "&:hover": {
                background: "linear-gradient(to right, #e67207, #e6b832)",
              },
            }}
          >
            <EmailIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mt: "auto", pt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShareIcon />}
          sx={{
            borderRadius: 2,
            background: DIALOG_STYLES.shareGradient,
            boxShadow: "0 3px 5px 2px rgba(150, 201, 61, .3)",
            height: 48,
          }}
          onClick={onCopyLink}
        >
          העתק קישור לשיתוף
        </Button>
      </Box>
    </Paper>
  )
}

export default SharePanel
