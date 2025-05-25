"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Button, CircularProgress, Fade, Grow } from "@mui/material"
import { DrawingCard } from "./drawing-card"
import { keyframes } from "@mui/system"

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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

interface DrawingListProps {
  searchTerm: string
  selectedCategory?: number | null
}

export function DrawingList({ searchTerm, selectedCategory }: DrawingListProps) {
  const [drawings, setDrawings] = useState<Drawing[]>([])
  const [loading, setLoading] = useState(true)
  const [isDefaultView, setIsDefaultView] = useState(true)

  // Mock data for demonstration
  const mockDrawings: Drawing[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `ציור מספר ${i + 1}`,
    description: `תיאור מפורט של הציור המהמם הזה שיעניק שעות של הנאה וצביעה`,
    imageUrl: `/placeholder.svg?height=300&width=300`,
    avgRating: 4 + Math.random(),
    countRating: Math.floor(Math.random() * 100) + 10,
    name: `drawing-${i + 1}.jpg`,
  }))

  useEffect(() => {
    const loadDrawings = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDrawings(mockDrawings)
      setLoading(false)
    }

    loadDrawings()
  }, [searchTerm, selectedCategory])

  const visibleDrawings = isDefaultView ? drawings.slice(0, 12) : drawings

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
            gap: 3,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: "#6a5acd",
                animation: `${spin} 1s linear infinite`,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                border: "4px solid rgba(106, 90, 205, 0.2)",
                borderRadius: "50%",
                animation: `${pulse} 2s ease-in-out infinite`,
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "#6a5acd",
              fontWeight: "bold",
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          >
            טוען ציורים מדהימים...
          </Typography>
        </Box>
      </Container>
    )
  }

  if (visibleDrawings.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              background: "linear-gradient(135deg, rgba(106, 90, 205, 0.1), rgba(255, 159, 67, 0.1))",
              borderRadius: 6,
              p: 8,
              textAlign: "center",
              border: "2px solid rgba(106, 90, 205, 0.2)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                animation: `${keyframes`0% { left: -100%; } 100% { left: 100%; }`} 3s infinite`,
              },
            }}
          >
            <Typography variant="h1" sx={{ fontSize: "4rem", mb: 3 }}>
              🎨
            </Typography>
            <Typography variant="h3" sx={{ color: "#6a5acd", mb: 2, fontWeight: "bold" }}>
              אין ציורים להצגה
            </Typography>
            <Typography variant="h6" sx={{ color: "#666", mb: 4, maxWidth: 500, mx: "auto" }}>
              {searchTerm ? `לא מצאנו ציורים התואמים לחיפוש "${searchTerm}"` : "לא נמצאו ציורים בקטגוריה זו"}
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
                color: "white",
                px: 4,
                py: 2,
                borderRadius: 6,
                fontSize: "1.1rem",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(45deg, #5a4abf, #e67e22)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              טען ציורים מחדש
            </Button>
          </Box>
        </Fade>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {visibleDrawings.map((drawing, index) => (
          <Grow key={drawing.id} in={true} timeout={500 + index * 100} style={{ transformOrigin: "center" }}>
            <Box>
              <DrawingCard drawing={drawing} />
            </Box>
          </Grow>
        ))}
      </Box>
    </Container>
  )
}
