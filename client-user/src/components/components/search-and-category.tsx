"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Fade, Grow } from "@mui/material"
import { SearchDrawings } from "./search-drawings"
import { CategoriesButtons } from "./categories-buttons"
import { DrawingList } from "./drawing-list"
import { FeatureCards } from "./feature-cards"
import { ParticleBackground } from "./particle-background"
import { FloatingShapes } from "./floating-shapes"
import { keyframes } from "@mui/system"

// Define animations
const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
`

const textShimmer = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`

const borderFlow = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(120deg); }
  66% { transform: translateY(5px) rotate(240deg); }
`

const bounceCustom = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`

export default function SearchAndCategory() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }} dir="rtl">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Floating Shapes */}
      <FloatingShapes />

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          position: "relative",
          pt: { xs: 10, md: 15 },
          pb: { xs: 8, md: 12 },
          px: 2,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 140, 105, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(144, 238, 144, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #FFD700 0%, #FF8C69 25%, #90EE90 50%, #FFB14C 75%, #FFF700 100%)
          `,
          backgroundSize: "400% 400%",
          animation: `${gradientShift} 12s ease-in-out infinite`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: `${float} 20s linear infinite`,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: `${float} 25s linear infinite reverse`,
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          {/* Decorative Elements */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              animation: `${bounceCustom} 3s ease-in-out infinite`,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "20%",
              right: "15%",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(8px)",
              animation: `${bounceCustom} 4s ease-in-out infinite 1s`,
            }}
          />

          <Fade in={mounted} timeout={1000}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: "#2c3e50",
                textShadow: "2px 2px 4px rgba(255,255,255,0.7)",
                mb: 3,
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem", lg: "3.8rem" },
                background: "linear-gradient(45deg, #2c3e50, #34495e, #2c3e50)",
                backgroundSize: "300% 300%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${textShimmer} 3s ease-in-out infinite`,
                letterSpacing: "1px",
                lineHeight: 1.2,
              }}
            >
              🎨 ציורי צביעה מהנים לילדים 🌈
            </Typography>
          </Fade>

          <Grow in={mounted} timeout={1500}>
            <Box
              sx={{
                maxWidth: 900,
                mx: "auto",
                px: 3,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: 8,
                py: 3,
                border: "1px solid rgba(255, 255, 255, 0.2)",
                animation: `${fadeInUp} 1s ease-out 0.5s both`,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#34495e",
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  fontWeight: 500,
                  lineHeight: 1.6,
                  textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
                }}
              >
                ✨ גלו מגוון רחב של דפי צביעה מקוריים ומהנים לילדים בכל הגילאים ✨
                <br />
                🖍️ הדפסה קלה • איכות גבוהה • בחינם לחלוטין 🖍️
              </Typography>
            </Box>
          </Grow>
        </Container>
      </Box>

      {/* Search and Categories Container */}
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Grow in={mounted} timeout={2000}>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: 6,
              boxShadow: `
                0 20px 40px rgba(0,0,0,0.1),
                0 0 0 1px rgba(255,255,255,0.5) inset
              `,
              mb: 8,
              mt: { xs: -4, md: -6 },
              overflow: "hidden",
              position: "relative",
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: `
                  0 25px 50px rgba(0,0,0,0.15),
                  0 0 0 1px rgba(255,255,255,0.6) inset
                `,
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(90deg, #FFD700, #FF8C69, #90EE90, #FFB14C)",
                backgroundSize: "300% 100%",
                animation: `${borderFlow} 3s ease infinite`,
              },
            }}
          >
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <SearchDrawings setSelectedCategory={setSelectedCategory} setSearchTerm={setSearchTerm} />
              <CategoriesButtons setSelectedCategory={setSelectedCategory} />
            </Box>
          </Box>
        </Grow>
      </Container>

      {/* Content Sections */}
      <Box sx={{ position: "relative", zIndex: 10 }}>
        <DrawingList selectedCategory={selectedCategory} searchTerm={searchTerm} />
        <FeatureCards />
      </Box>
    </Box>
  )
}
