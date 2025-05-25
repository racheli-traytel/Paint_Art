"use client"

import { Box } from "@mui/material"
import { keyframes } from "@mui/system"

const waveAnimation = keyframes`
  0% { transform: translateX(0) translateY(0) rotate(0deg); }
  33% { transform: translateX(30px) translateY(-30px) rotate(120deg); }
  66% { transform: translateX(-20px) translateY(20px) rotate(240deg); }
  100% { transform: translateX(0) translateY(0) rotate(360deg); }
`

const morphBackground = keyframes`
  0%, 100% { 
    background-position: 0% 50%;
    transform: scale(1) rotate(0deg);
  }
  25% { 
    background-position: 100% 0%;
    transform: scale(1.05) rotate(90deg);
  }
  50% { 
    background-position: 100% 100%;
    transform: scale(0.95) rotate(180deg);
  }
  75% { 
    background-position: 0% 100%;
    transform: scale(1.02) rotate(270deg);
  }
`

export function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Primary animated background */}
      <Box
        sx={{
          position: "absolute",
          inset: "-50%",
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 140, 105, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(144, 238, 144, 0.15) 0%, transparent 50%),
            linear-gradient(45deg, 
              rgba(255, 215, 0, 0.1), 
              rgba(255, 140, 105, 0.1), 
              rgba(144, 238, 144, 0.1),
              rgba(255, 215, 0, 0.1)
            )
          `,
          backgroundSize: "400% 400%",
          animation: `${morphBackground} 20s ease-in-out infinite`,
        }}
      />

      {/* Secondary wave layer */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            repeating-linear-gradient(
              45deg,
              rgba(255, 215, 0, 0.02) 0px,
              rgba(255, 215, 0, 0.02) 2px,
              transparent 2px,
              transparent 20px,
              rgba(255, 140, 105, 0.02) 20px,
              rgba(255, 140, 105, 0.02) 22px,
              transparent 22px,
              transparent 40px,
              rgba(144, 238, 144, 0.02) 40px,
              rgba(144, 238, 144, 0.02) 42px,
              transparent 42px,
              transparent 60px
            )
          `,
          animation: `${waveAnimation} 25s linear infinite`,
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
            background: `linear-gradient(45deg, 
              rgba(255, 215, 0, 0.1), 
              rgba(255, 140, 105, 0.1), 
              rgba(144, 238, 144, 0.1)
            )`,
            borderRadius: Math.random() > 0.5 ? "50%" : "20%",
            animation: `${waveAnimation} ${15 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 15}s`,
            backdropFilter: "blur(1px)",
          }}
        />
      ))}
    </Box>
  )
}
