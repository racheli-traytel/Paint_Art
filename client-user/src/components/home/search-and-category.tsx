"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Fade, Grow } from "@mui/material"
import { SearchDrawings } from "./search-drawings"
import { CategoriesButtons } from "./categories-buttons"
import { DrawingList } from "./drawing-list"
import { FeatureCards } from "./feature-cards"
import { AnimatedBackground } from "./animated-background"
import { FloatingElements } from "./floating-elements"
import { WaveAnimation } from "./wave-animation"
import { StarField } from "./star-field"
import { keyframes } from "@mui/system"

// Advanced animations
const morphingGradient = keyframes`
  0% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  25% { 
    background-position: 100% 0%;
    filter: hue-rotate(90deg);
  }
  50% { 
    background-position: 100% 100%;
    filter: hue-rotate(180deg);
  }
  75% { 
    background-position: 0% 100%;
    filter: hue-rotate(270deg);
  }
  100% { 
    background-position: 0% 50%;
    filter: hue-rotate(360deg);
  }
`

const textGlow = keyframes`
  0%, 100% { 
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 140, 105, 0.6), 0 0 60px rgba(144, 238, 144, 0.4);
  }
  33% { 
    text-shadow: 0 0 25px rgba(255, 140, 105, 0.8), 0 0 45px rgba(144, 238, 144, 0.6), 0 0 65px rgba(255, 215, 0, 0.4);
  }
  66% { 
    text-shadow: 0 0 30px rgba(144, 238, 144, 0.8), 0 0 50px rgba(255, 215, 0, 0.6), 0 0 70px rgba(255, 140, 105, 0.4);
  }
`

const floatingBubbles = keyframes`
  0% { 
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  90% { 
    opacity: 1;
  }
  100% { 
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
`

const liquidMorph = keyframes`
  0%, 100% { 
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: rotate(0deg) scale(1);
  }
  25% { 
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: rotate(90deg) scale(1.1);
  }
  50% { 
    border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
    transform: rotate(180deg) scale(0.9);
  }
  75% { 
    border-radius: 60% 40% 60% 30% / 70% 30% 60% 70%;
    transform: rotate(270deg) scale(1.05);
  }
`

const pulseRing = keyframes`
  0% {
    transform: scale(0.33);
    opacity: 1;
  }
  80%, 100% {
    transform: scale(2.33);
    opacity: 0;
  }
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
      {/* Multi-layer animated backgrounds */}
      <AnimatedBackground />
      <StarField />
      <FloatingElements />
      <WaveAnimation />

      {/* Floating bubbles */}
      {[...Array(15)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "fixed",
            left: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            background: `linear-gradient(45deg, 
              rgba(255, 215, 0, 0.3), 
              rgba(255, 140, 105, 0.3), 
              rgba(144, 238, 144, 0.3)
            )`,
            borderRadius: "50%",
            animation: `${floatingBubbles} ${8 + Math.random() * 6}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            backdropFilter: "blur(2px)",
            zIndex: 1,
          }}
        />
      ))}

      {/* Hero Section with advanced animations */}
      <Box
        component="section"
        sx={{
          position: "relative",
          pt: { xs: 12, md: 20 },
          pb: { xs: 10, md: 16 },
          px: 2,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 140, 105, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(144, 238, 144, 0.4) 0%, transparent 50%),
            conic-gradient(from 0deg, #FFD700, #FF8C69, #90EE90, #FFD700)
          `,
          backgroundSize: "400% 400%",
          animation: `${morphingGradient} 15s ease-in-out infinite`,
          zIndex: 2,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              )
            `,
            animation: `${keyframes`
              0% { transform: translateX(-100px) translateY(-100px); }
              100% { transform: translateX(100px) translateY(100px); }
            `} 20s linear infinite`,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(255, 255, 255, 0.1) 1px, 
                transparent 1px
              )
            `,
            backgroundSize: "30px 30px",
            animation: `${keyframes`
              0% { transform: rotate(0deg) scale(1); }
              50% { transform: rotate(180deg) scale(1.1); }
              100% { transform: rotate(360deg) scale(1); }
            `} 30s linear infinite`,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3, textAlign: "center" }}>
          {/* Liquid morphing decorations */}
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                width: `${40 + Math.random() * 60}px`,
                height: `${40 + Math.random() * 60}px`,
                background: `linear-gradient(45deg, 
                  rgba(255, 215, 0, 0.2), 
                  rgba(255, 140, 105, 0.2), 
                  rgba(144, 238, 144, 0.2)
                )`,
                animation: `${liquidMorph} ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`,
                backdropFilter: "blur(5px)",
                zIndex: 1,
              }}
            />
          ))}

          {/* Pulsing rings around title */}
          <Box sx={{ position: "relative", display: "inline-block" }}>
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "200%",
                  height: "200%",
                  border: "2px solid rgba(255, 215, 0, 0.3)",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: `${pulseRing} 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite`,
                  animationDelay: `${i * 1}s`,
                }}
              />
            ))}

            <Fade in={mounted} timeout={1500}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  color: "#2c3e50",
                  mb: 4,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5.5rem" },
                  background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90, #FFD700)",
                  backgroundSize: "400% 400%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: `${morphingGradient} 8s ease-in-out infinite, ${textGlow} 4s ease-in-out infinite`,
                  letterSpacing: "2px",
                  lineHeight: 1.1,
                  position: "relative",
                  zIndex: 2,
                  textShadow: "none",
                  filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))",
                }}
              >
                🎨 ציורי צביעה מהנים לילדים 🌈
              </Typography>
            </Fade>
          </Box>

          <Grow in={mounted} timeout={2000}>
            <Box
              sx={{
                maxWidth: 1000,
                mx: "auto",
                px: 4,
                py: 4,
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.25) 0%,
                    rgba(255, 255, 255, 0.1) 50%,
                    rgba(255, 255, 255, 0.25) 100%
                  )
                `,
                backdropFilter: "blur(20px)",
                borderRadius: 8,
                border: "2px solid rgba(255, 255, 255, 0.3)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                  animation: `${keyframes`
                    0% { left: -100%; }
                    100% { left: 100%; }
                  `} 3s ease-in-out infinite`,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90, #FFD700)",
                  backgroundSize: "400% 400%",
                  animation: `${morphingGradient} 12s ease-in-out infinite`,
                  opacity: 0.1,
                  borderRadius: 8,
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#2c3e50",
                  fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                  fontWeight: 600,
                  lineHeight: 1.6,
                  textShadow: "1px 1px 3px rgba(255,255,255,0.8)",
                  position: "relative",
                  zIndex: 1,
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

      {/* Search and Categories Container with advanced effects */}
      <Container maxWidth="lg" sx={{ px: 2, position: "relative", zIndex: 10 }}>
        <Grow in={mounted} timeout={2500}>
          <Box
            sx={{
              background: `
                linear-gradient(145deg, 
                  rgba(255, 255, 255, 0.95) 0%,
                  rgba(248, 249, 250, 0.95) 100%
                )
              `,
              backdropFilter: "blur(30px)",
              borderRadius: 8,
              boxShadow: `
                0 30px 60px rgba(0,0,0,0.12),
                0 0 0 1px rgba(255,255,255,0.6) inset,
                0 0 100px rgba(255, 215, 0, 0.1)
              `,
              mb: 10,
              mt: { xs: -6, md: -8 },
              overflow: "hidden",
              position: "relative",
              border: "2px solid rgba(255, 255, 255, 0.4)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-8px) scale(1.01)",
                boxShadow: `
                  0 40px 80px rgba(0,0,0,0.15),
                  0 0 0 1px rgba(255,255,255,0.7) inset,
                  0 0 120px rgba(255, 215, 0, 0.2)
                `,
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, #FFD700, #FF8C69, #90EE90, #FFD700)",
                backgroundSize: "400% 100%",
                animation: `${keyframes`
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                `} 4s ease infinite`,
              },
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: `
                  radial-gradient(circle at 30% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(255, 140, 105, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 20% 80%, rgba(144, 238, 144, 0.05) 0%, transparent 50%)
                `,
                animation: `${keyframes`
                  0% { transform: rotate(0deg) scale(1); }
                  50% { transform: rotate(180deg) scale(1.1); }
                  100% { transform: rotate(360deg) scale(1); }
                `} 20s linear infinite`,
                borderRadius: 8,
              },
            }}
          >
            <Box sx={{ p: { xs: 4, md: 6 }, position: "relative", zIndex: 1 }}>
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
