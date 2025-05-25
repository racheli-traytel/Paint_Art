"use client"

import { Box } from "@mui/material"
import { keyframes } from "@mui/system"

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`

const shooting = keyframes`
  0% { 
    transform: translateX(-100px) translateY(100px);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { 
    transform: translateX(100vw) translateY(-100px);
    opacity: 0;
  }
`

export function StarField() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      {/* Twinkling stars */}
      {[...Array(50)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: ["#FFD700", "#FF8C69", "#90EE90"][Math.floor(Math.random() * 3)],
            borderRadius: "50%",
            animation: `${twinkle} ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 10px currentColor`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`shooting-${i}`}
          sx={{
            position: "absolute",
            top: `${20 + Math.random() * 60}%`,
            left: "-100px",
            width: "2px",
            height: "2px",
            background: "#FFD700",
            borderRadius: "50%",
            animation: `${shooting} ${8 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "50px",
              height: "1px",
              background: "linear-gradient(90deg, #FFD700, transparent)",
              transform: "translateX(-50px)",
            },
          }}
        />
      ))}
    </Box>
  )
}
