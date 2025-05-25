"use client"

import { useState } from "react"
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Rating, Fade, Tooltip } from "@mui/material"
import { Palette, Download, Star, Favorite, FavoriteBorder } from "@mui/icons-material"
import { keyframes } from "@mui/system"

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

interface Drawing {
  id: number
  title: string
  description: string
  imageUrl: string
  avgRating: number
  countRating: number
  name: string
}

interface DrawingCardProps {
  drawing: Drawing
}

export function DrawingCard({ drawing }: DrawingCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleColoringClick = () => {
    console.log("Navigate to coloring page:", drawing.id)
  }

  const handleDownloadClick = () => {
    console.log("Download drawing:", drawing.name)
  }

  const handleRatingClick = () => {
    console.log("Rate drawing:", drawing.id)
  }

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
        border: "1px solid rgba(0,0,0,0.05)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-12px) scale(1.02)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(45deg, rgba(106, 90, 205, 0.1), rgba(255, 159, 67, 0.1))",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          borderRadius: 4,
          zIndex: 0,
        },
      }}
    >
      {/* Image Container */}
      <Box sx={{ position: "relative", paddingTop: "75%", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={drawing.imageUrl || "/placeholder.svg"}
          alt={drawing.title}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />

        {/* Overlay with actions */}
        <Fade in={isHovered}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Tooltip title="צביעה" arrow>
              <IconButton
                onClick={handleColoringClick}
                sx={{
                  background: "rgba(255,255,255,0.9)",
                  color: "#6a5acd",
                  "&:hover": {
                    background: "white",
                    transform: "scale(1.1)",
                    animation: `${pulse} 0.6s ease`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Palette />
              </IconButton>
            </Tooltip>

            <Tooltip title="הורדה" arrow>
              <IconButton
                onClick={handleDownloadClick}
                sx={{
                  background: "rgba(255,255,255,0.9)",
                  color: "#2196f3",
                  "&:hover": {
                    background: "white",
                    transform: "scale(1.1)",
                    animation: `${pulse} 0.6s ease`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>

        {/* Like button */}
        <IconButton
          onClick={() => setIsLiked(!isLiked)}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              background: "white",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {isLiked ? <Favorite sx={{ color: "#e91e63" }} /> : <FavoriteBorder sx={{ color: "#666" }} />}
        </IconButton>

        {/* Rating badge */}
        <Chip
          icon={<Star sx={{ color: "#ffc107" }} />}
          label={drawing.avgRating.toFixed(1)}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            fontWeight: "bold",
            color: "#333",
            "& .MuiChip-icon": {
              color: "#ffc107",
            },
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "right", position: "relative", zIndex: 1 }} dir="rtl">
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 1,
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#6a5acd",
            },
          }}
        >
          {drawing.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 2,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {drawing.description}
        </Typography>

        {/* Rating and actions */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating
              value={Math.floor(drawing.avgRating)}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#ffc107",
                },
              }}
            />
            <Typography variant="caption" sx={{ color: "#666" }}>
              ({drawing.countRating})
            </Typography>
          </Box>

          <IconButton
            onClick={handleRatingClick}
            sx={{
              background: "linear-gradient(45deg, #ffc107, #ff9800)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #ffb300, #f57c00)",
                transform: "scale(1.1)",
                animation: `${float} 1s ease`,
              },
              transition: "all 0.3s ease",
            }}
          >
            <Star />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}
