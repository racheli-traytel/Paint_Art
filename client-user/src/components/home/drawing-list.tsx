"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Button, CircularProgress, Fade, Grow } from "@mui/material"
import { DrawingCard } from "./drawing-card"
import { keyframes } from "@mui/system"

const spinGlow = keyframes`
  0% { 
    transform: rotate(0deg);
    filter: drop-shadow(0 0 10px #FFD700);
  }
  25% { 
    filter: drop-shadow(0 0 20px #FF8C69);
  }
  50% { 
    filter: drop-shadow(0 0 15px #90EE90);
  }
  75% { 
    filter: drop-shadow(0 0 25px #FFD700);
  }
  100% { 
    transform: rotate(360deg);
    filter: drop-shadow(0 0 10px #FFD700);
  }
`

const textPulse = keyframes`
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.7;
    transform: scale(1.05);
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

interface DrawingListProps {
  searchTerm: string
  selectedCategory?: number | null
}

export function DrawingList({ searchTerm, selectedCategory }: DrawingListProps) {
  const [drawings, setDrawings] = useState<Drawing[]>([])
  const [loading, setLoading] = useState(true)
  const [isDefaultView, setIsDefaultView] = useState(true)

  // Mock data for demonstration - keeping original Redux functionality structure
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
      // Simulate API call - here you would dispatch Redux actions
      // dispatch(fetchDrawings({ searchTerm, selectedCategory }))
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDrawings(mockDrawings)
      setLoading(false)
    }

    loadDrawings()
  }, [searchTerm, selectedCategory])

  const visibleDrawings = isDefaultView ? drawings.slice(0, 12) : drawings

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            gap: 4,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CircularProgress
              size={80}
              thickness={4}
              sx={{
                color: "#FFD700",
                animation: `${spinGlow} 2s linear infinite`,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                border: "4px solid rgba(255, 215, 0, 0.2)",
                borderRadius: "50%",
                animation: `${keyframes`
                  0% { transform: scale(1); opacity: 1; }
                  100% { transform: scale(1.5); opacity: 0; }
                `} 2s ease-out infinite`,
              }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{
              background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              animation: `${textPulse} 2s ease-in-out infinite`,
              textAlign: "center",
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
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 215, 0, 0.1), 
                  rgba(255, 140, 105, 0.1), 
                  rgba(144, 238, 144, 0.1)
                )
              `,
              borderRadius: 8,
              p: 10,
              textAlign: "center",
              border: "3px solid rgba(255, 215, 0, 0.3)",
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
                animation: `${keyframes`
                  0% { left: -100%; }
                  100% { left: 100%; }
                `} 4s infinite`,
              },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "5rem",
                mb: 4,
                animation: `${keyframes`
              0%, 100% { transform: rotate(0deg) scale(1); }
              25% { transform: rotate(-5deg) scale(1.1); }
              75% { transform: rotate(5deg) scale(0.9); }
            `} 3s ease-in-out infinite`,
              }}
            >
              🎨
            </Typography>
            <Typography
              variant="h3"
              sx={{
                background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
                fontWeight: "bold",
              }}
            >
              אין ציורים להצגה
            </Typography>
            <Typography variant="h6" sx={{ color: "#666", mb: 5, maxWidth: 600, mx: "auto" }}>
              {searchTerm ? `לא מצאנו ציורים התואמים לחיפוש "${searchTerm}"` : "לא נמצאו ציורים בקטגוריה זו"}
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
                color: "white",
                px: 6,
                py: 3,
                borderRadius: 8,
                fontSize: "1.2rem",
                fontWeight: "bold",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "scale(1.05) rotate(2deg)",
                  boxShadow: "0 15px 40px rgba(255, 215, 0, 0.4)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transition: "left 0.7s",
                },
                "&:hover::before": {
                  left: "100%",
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
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 4,
        }}
      >
        {visibleDrawings.map((drawing, index) => (
          <Grow key={drawing.id} in={true} timeout={600 + index * 120} style={{ transformOrigin: "center" }}>
            <Box>
              <DrawingCard drawing={drawing} />
            </Box>
          </Grow>
        ))}
      </Box>
    </Container>
  )
}
