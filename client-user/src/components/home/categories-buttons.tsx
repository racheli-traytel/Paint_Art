"use client"

import { useState } from "react"
import { Box, Typography, Chip, Stack, Fade } from "@mui/material"
import { keyframes } from "@mui/system"

const morphChip = keyframes`
  0%, 100% { 
    border-radius: 25px;
    transform: scale(1) rotate(0deg);
  }
  25% { 
    border-radius: 15px 35px 15px 35px;
    transform: scale(1.05) rotate(2deg);
  }
  50% { 
    border-radius: 35px 15px 35px 15px;
    transform: scale(0.98) rotate(-1deg);
  }
  75% { 
    border-radius: 20px 30px 20px 30px;
    transform: scale(1.02) rotate(1deg);
  }
`

const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
    filter: brightness(1);
  }
  50% { 
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 140, 105, 0.3);
    filter: brightness(1.1);
  }
`

const floatBounce = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(1deg); }
  50% { transform: translateY(-4px) rotate(-0.5deg); }
  75% { transform: translateY(-12px) rotate(0.5deg); }
`

interface Category {
  id: number
  name: string
}

interface CategoriesButtonsProps {
  setSelectedCategory: (category: number | null) => void
}

export function CategoriesButtons({ setSelectedCategory }: CategoriesButtonsProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  const categories: Category[] = [
    { id: 1, name: "חיות" },
    { id: 2, name: "דמויות מצוירות" },
    { id: 3, name: "טבע" },
    { id: 4, name: "רכבים" },
    { id: 5, name: "פנטזיה" },
    { id: 6, name: "ספורט" },
    { id: 7, name: "דינוזאורים" },
    { id: 8, name: "חגים" },
    { id: 9, name: "מזון" },
    { id: 10, name: "נופים" },
    { id: 11, name: "כלי תחבורה" },
    { id: 12, name: "גיבורי על" },
  ]

  const handleCategoryClick = (categoryId: number) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null)
      setSelectedCategory(null)
    } else {
      setActiveCategory(categoryId)
      setSelectedCategory(categoryId)
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#333",
          textAlign: "right",
          position: "relative",
          background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 200%",
          animation: `${keyframes`
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          `} 4s ease infinite`,
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -12,
            right: 0,
            width: 80,
            height: 4,
            background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
            borderRadius: 2,
            animation: `${keyframes`
              0% { width: 80px; }
              50% { width: 120px; }
              100% { width: 80px; }
            `} 3s ease infinite`,
          },
        }}
      >
        קטגוריות פופולריות:
      </Typography>

      <Box
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: 8,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(255, 215, 0, 0.1)",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(45deg, #FFD700, #FF8C69)",
            borderRadius: 8,
            "&:hover": {
              background: "linear-gradient(45deg, #FFC107, #FF5722)",
            },
          },
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            py: 2,
            minWidth: "max-content",
            pr: 2,
          }}
        >
          {categories.map((category, index) => (
            <Fade in={true} timeout={600 + index * 150} key={category.id}>
              <Box sx={{ position: "relative" }}>
                {/* Animated background for active category */}
                {activeCategory === category.id && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: -4,
                      background: "conic-gradient(from 0deg, #FFD700, #FF8C69, #90EE90, #FFD700)",
                      borderRadius: 8,
                      filter: "blur(8px)",
                      opacity: 0.7,
                      animation: `${keyframes`
                        0% { transform: rotate(0deg) scale(1); }
                        100% { transform: rotate(360deg) scale(1.1); }
                      `} 3s linear infinite, ${glowPulse} 2s ease-in-out infinite`,
                    }}
                  />
                )}

                <Chip
                  label={category.name}
                  onClick={() => handleCategoryClick(category.id)}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  sx={{
                    position: "relative",
                    borderRadius: 6,
                    px: 3,
                    py: 4,
                    fontSize: "1rem",
                    fontWeight: activeCategory === category.id ? "bold" : "medium",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    background:
                      activeCategory === category.id
                        ? "linear-gradient(135deg, #FFD700, #FF8C69, #90EE90)"
                        : hoveredCategory === category.id
                          ? "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 105, 0.2))"
                          : "rgba(255, 255, 255, 0.8)",
                    color: activeCategory === category.id ? "white" : "#333",
                    border: activeCategory === category.id ? "none" : "2px solid rgba(255, 215, 0, 0.3)",
                    backdropFilter: "blur(10px)",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.08)",
                      boxShadow:
                        activeCategory === category.id
                          ? "0 15px 40px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 140, 105, 0.3)"
                          : "0 12px 35px rgba(0,0,0,0.15), 0 0 25px rgba(255, 215, 0, 0.2)",
                      animation:
                        activeCategory !== category.id ? `${floatBounce} 0.8s ease` : `${morphChip} 2s ease infinite`,
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      transition: "left 0.6s",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                    "&::after":
                      activeCategory === category.id
                        ? {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                            backgroundSize: "200% 200%",
                            animation: `${keyframes`
                              0% { background-position: -200% 0; }
                              100% { background-position: 200% 0; }
                            `} 3s ease infinite`,
                          }
                        : {},
                  }}
                />
              </Box>
            </Fade>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
