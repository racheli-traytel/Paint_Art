"use client"

import { Box } from "@mui/material"
import { keyframes } from "@mui/system"

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`

const bounceSlow = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export function FloatingShapes() {
  return (
    <Box sx={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {/* Large floating circles */}
      <Box
        sx={{
          position: "absolute",
          top: 80,
          left: 40,
          width: 128,
          height: 128,
          background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 105, 0.2))",
          borderRadius: "50%",
          animation: `${floatSlow} 6s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 160,
          right: 80,
          width: 96,
          height: 96,
          background: "linear-gradient(135deg, rgba(144, 238, 144, 0.2), rgba(106, 90, 205, 0.2))",
          borderRadius: "50%",
          animation: `${floatSlow} 6s ease-in-out infinite 2s`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 128,
          left: "25%",
          width: 80,
          height: 80,
          background: "linear-gradient(135deg, rgba(255, 159, 67, 0.2), rgba(255, 182, 76, 0.2))",
          borderRadius: "50%",
          animation: `${floatSlow} 6s ease-in-out infinite 4s`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 80,
          right: "33%",
          width: 112,
          height: 112,
          background: "linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(255, 20, 147, 0.2))",
          borderRadius: "50%",
          animation: `${floatSlow} 6s ease-in-out infinite 1s`,
        }}
      />

      {/* Small floating dots */}
      <Box
        sx={{
          position: "absolute",
          top: "33%",
          left: "50%",
          width: 16,
          height: 16,
          background: "rgba(255, 215, 0, 0.4)",
          borderRadius: "50%",
          animation: `${bounceSlow} 3s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "25%",
          width: 12,
          height: 12,
          background: "rgba(33, 150, 243, 0.4)",
          borderRadius: "50%",
          animation: `${bounceSlow} 3s ease-in-out infinite 1.5s`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "33%",
          left: "33%",
          width: 20,
          height: 20,
          background: "rgba(76, 175, 80, 0.4)",
          borderRadius: "50%",
          animation: `${bounceSlow} 3s ease-in-out infinite 3s`,
        }}
      />

      {/* Geometric shapes */}
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          right: "50%",
          width: 64,
          height: 64,
          background: "linear-gradient(135deg, rgba(156, 39, 176, 0.15), rgba(103, 58, 183, 0.15))",
          transform: "rotate(45deg)",
          animation: `${spinSlow} 20s linear infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          left: "50%",
          width: 48,
          height: 48,
          background: "linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(244, 67, 54, 0.15))",
          transform: "rotate(12deg)",
          animation: `${spinSlow} 20s linear infinite 2s`,
        }}
      />
    </Box>
  )
}
