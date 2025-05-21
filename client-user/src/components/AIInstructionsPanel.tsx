"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Typography, Paper, CircularProgress, IconButton, Divider, useTheme, Tooltip, alpha } from "@mui/material"
import { Close, Refresh, LightbulbOutlined, AutoAwesome } from "@mui/icons-material"
import api from "./api"

interface AIInstructionsPanelProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
}

const AIInstructionsPanel: React.FC<AIInstructionsPanelProps> = ({ imageUrl, isOpen, onClose }) => {
  const theme = useTheme()
  const [instructions, setInstructions] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen && imageUrl && !instructions) {
      fetchAIInstructions()
    }
  }, [isOpen, imageUrl, instructions])

  const fetchAIInstructions = async () => {
    if (!imageUrl) return

    setLoading(true)
    try {
      const response = await api.get("/AIpaintings/aiDrawingInstructions", {
        params: { path: imageUrl },
      })
      setInstructions(response.data)
    } catch (error) {
      console.error("Error fetching AI instructions:", error)
      setInstructions("לא הצלחנו לקבל הוראות צביעה. נסה שוב מאוחר יותר.")
    } finally {
      setLoading(false)
    }
  }

  // No need to return null, the parent component will handle visibility

  return (
    <Paper
      elevation={4}
      sx={{
        width: "320px",
        height: "100%",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%)",
        overflow: "hidden",
        position: "relative",
        direction: "rtl",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        transition: "all 0.3s ease-in-out",
        boxShadow: `0 10px 30px -5px ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2.5,
          position: "sticky",
          top: 0,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: "blur(8px)",
          zIndex: 1,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <AutoAwesome
            sx={{
              color: theme.palette.primary.main,
              fontSize: "1.5rem",
              filter: "drop-shadow(0 0 2px rgba(0,0,0,0.2))",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              letterSpacing: "-0.5px",
            }}
          >
            הנחיות צביעה מה-AI
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="רענן הנחיות">
            <IconButton
              size="small"
              onClick={fetchAIInstructions}
              disabled={loading}
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>

          <Tooltip title="סגור">
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                backgroundColor: alpha(theme.palette.error.main, 0.1),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.main, 0.2),
                },
              }}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider />

      {/* Content */}
      <Box
        sx={{
          p: 3,
          height: "calc(100% - 70px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: alpha(theme.palette.background.paper, 0.1),
          },
          "&::-webkit-scrollbar-thumb": {
            background: alpha(theme.palette.primary.main, 0.2),
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: alpha(theme.palette.primary.main, 0.4),
          },
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 2,
            }}
          >
            <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.main }} />
            <Typography variant="body1" color="text.secondary">
              טוען הנחיות צביעה...
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.8,
                fontSize: "1.05rem",
                color: theme.palette.text.primary,
                mb: 4,
              }}
            >
              {instructions}
            </Typography>

            <Box
              sx={{
                display: "flex",
                mt: 3,
                p: 2.5,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                borderRadius: "12px",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                boxShadow: `0 4px 12px -2px ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <LightbulbOutlined
                sx={{
                  color: theme.palette.warning.main,
                  mr: 1.5,
                  fontSize: "1.5rem",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))",
                }}
              />
              <Typography
                variant="body2"
                fontStyle="italic"
                sx={{
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                טיפ: עקוב אחר ההנחיות של ה-AI כדי להשיג תוצאות מדהימות ולשפר את יכולות הציור שלך!
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default AIInstructionsPanel
