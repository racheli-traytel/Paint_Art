"use client"

import { useState } from "react"
import { Box, Typography, Chip, Stack, Fade } from "@mui/material"
import { keyframes } from "@mui/system"

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const bounce = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(106, 90, 205, 0.4); }
  50% { box-shadow: 0 0 30px rgba(106, 90, 205, 0.8); }
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
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#333",
          textAlign: "right",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            right: 0,
            width: 60,
            height: 3,
            background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
            borderRadius: 2,
          },
        }}
      >
        קטגוריות פופולריות:
      </Typography>

      <Box
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c7c7c7",
            borderRadius: 6,
            "&:hover": {
              backgroundColor: "#a0a0a0",
            },
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            py: 1,
            minWidth: "max-content",
            pr: 2,
          }}
        >
          {categories.map((category, index) => (
            <Fade in={true} timeout={500 + index * 100} key={category.id}>
              <Box sx={{ position: "relative" }}>
                {/* Glow effect for active category */}
                {activeCategory === category.id && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: -2,
                      background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
                      borderRadius: 6,
                      filter: "blur(8px)",
                      opacity: 0.6,
                      animation: `${glow} 2s ease-in-out infinite`,
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
                    px: 2,
                    py: 3,
                    fontSize: "0.95rem",
                    fontWeight: activeCategory === category.id ? "bold" : "medium",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background:
                      activeCategory === category.id
                        ? "linear-gradient(45deg, #6a5acd, #ff9f43)"
                        : hoveredCategory === category.id
                          ? "linear-gradient(45deg, #f0f0f0, #e0e0e0)"
                          : "#f8f9fa",
                    color: activeCategory === category.id ? "white" : "#333",
                    border: activeCategory === category.id ? "none" : "1px solid rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-4px) scale(1.05)",
                      boxShadow:
                        activeCategory === category.id
                          ? "0 8px 25px rgba(106, 90, 205, 0.4)"
                          : "0 8px 25px rgba(0,0,0,0.15)",
                      animation: activeCategory !== category.id ? `${bounce} 0.6s ease` : "none",
                    },
                    "&::before":
                      activeCategory === category.id
                        ? {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                            animation: `${shimmer} 2s infinite`,
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
