"use client"

import { useState } from "react"
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Rating, Fade, Tooltip } from "@mui/material"
import { Palette, Download, Star, Favorite, FavoriteBorder } from "@mui/icons-material"
import { keyframes } from "@mui/system"

const cardFloat = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(1deg); }
  50% { transform: translateY(-4px) rotate(-0.5deg); }
  75% { transform: translateY(-12px) rotate(0.5deg); }
`

const heartBeat = keyframes`
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
`

const shimmerCard = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const glowBorder = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }
  50% { 
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 140, 105, 0.3);
  }
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
    // Keep original Redux functionality
    console.log("Navigate to coloring page:", drawing.id)
  }

  const handleDownloadClick = () => {
    // Keep original Redux functionality
    console.log("Download drawing:", drawing.name)
  }

  const handleRatingClick = () => {
    // Keep original Redux functionality
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
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
        background: `
          linear-gradient(145deg, 
            rgba(255, 255, 255, 0.95) 0%,
            rgba(248, 249, 250, 0.95) 100%
          )
        `,
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255, 215, 0, 0.2)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-15px) scale(1.03) rotate(1deg)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
          animation: `${glowBorder} 2s ease-in-out infinite`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "conic-gradient(from 0deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 105, 0.1), rgba(144, 238, 144, 0.1), rgba(255, 215, 0, 0.1))",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          borderRadius: 6,
          zIndex: 0,
          animation: isHovered
            ? `${keyframes`
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          `} 4s linear infinite`
            : "none",
        },
      }}
    >
      {/* Image Container with advanced effects */}
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
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHovered ? "scale(1.15) rotate(2deg)" : "scale(1)",
            filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1)",
          }}
        />

        {/* Animated overlay */}
        <Fade in={isHovered}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(circle at 50% 50%, 
                  rgba(0,0,0,0.4) 0%, 
                  rgba(0,0,0,0.6) 100%
                )
              `,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Tooltip title="צביעה" arrow>
              <IconButton
                onClick={handleColoringClick}
                sx={{
                  background: "linear-gradient(45deg, #FFD700, #FF8C69)",
                  color: "white",
                  p: 2,
                  "&:hover": {
                    background: "linear-gradient(45deg, #FFC107, #FF5722)",
                    transform: "scale(1.2) rotate(10deg)",
                    animation: `${cardFloat} 1s ease`,
                  },
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 25px rgba(255, 215, 0, 0.4)",
                }}
              >
                <Palette sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="הורדה" arrow>
              <IconButton
                onClick={handleDownloadClick}
                sx={{
                  background: "linear-gradient(45deg, #90EE90, #4CAF50)",
                  color: "white",
                  p: 2,
                  "&:hover": {
                    background: "linear-gradient(45deg, #4CAF50, #2E7D32)",
                    transform: "scale(1.2) rotate(-10deg)",
                    animation: `${cardFloat} 1s ease`,
                  },
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 25px rgba(144, 238, 144, 0.4)",
                }}
              >
                <Download sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>

        {/* Enhanced like button */}
        <IconButton
          onClick={() => setIsLiked(!isLiked)}
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255, 215, 0, 0.3)",
            "&:hover": {
              background: "white",
              transform: "scale(1.15)",
              animation: isLiked ? `${heartBeat} 1s ease` : "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          {isLiked ? (
            <Favorite sx={{ color: "#e91e63", fontSize: 24 }} />
          ) : (
            <FavoriteBorder sx={{ color: "#666", fontSize: 24 }} />
          )}
        </IconButton>

        {/* Enhanced rating badge */}
        <Chip
          icon={<Star sx={{ color: "#FFD700", fontSize: 20 }} />}
          label={drawing.avgRating.toFixed(1)}
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            fontWeight: "bold",
            color: "#333",
            border: "2px solid rgba(255, 215, 0, 0.3)",
            fontSize: "0.9rem",
            "& .MuiChip-icon": {
              color: "#FFD700",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: "linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
              animation: `${shimmerCard} 3s ease infinite`,
              borderRadius: "inherit",
            },
          }}
        />
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          p: 4,
          textAlign: "right",
          position: "relative",
          zIndex: 1,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
        }}
        dir="rtl"
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 2,
            transition: "all 0.3s ease",
            background: isHovered ? "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)" : "transparent",
            backgroundClip: isHovered ? "text" : "unset",
            WebkitBackgroundClip: isHovered ? "text" : "unset",
            WebkitTextFillColor: isHovered ? "transparent" : "#333",
            fontSize: "1.1rem",
          }}
        >
          {drawing.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 3,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {drawing.description}
        </Typography>

        {/* Enhanced rating and actions */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating
              value={Math.floor(drawing.avgRating)}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#FFD700",
                  filter: "drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))",
                },
                "& .MuiRating-iconEmpty": {
                  color: "rgba(255, 215, 0, 0.3)",
                },
              }}
            />
            <Typography variant="caption" sx={{ color: "#666", fontWeight: 500 }}>
              ({drawing.countRating})
            </Typography>
          </Box>

          <IconButton
            onClick={handleRatingClick}
            sx={{
              background: "linear-gradient(45deg, #FFD700, #FF8C69)",
              color: "white",
              p: 1.5,
              "&:hover": {
                background: "linear-gradient(45deg, #FFC107, #FF5722)",
                transform: "scale(1.15) rotate(15deg)",
                animation: `${cardFloat} 1s ease`,
              },
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
            }}
          >
            <Star sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}
