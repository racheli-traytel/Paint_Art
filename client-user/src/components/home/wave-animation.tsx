"use client"

import { Box } from "@mui/material"
import { keyframes } from "@mui/system"

const wave1 = keyframes`
  0% { transform: translateX(-100%) rotate(0deg); }
  100% { transform: translateX(100vw) rotate(360deg); }
`

const wave2 = keyframes`
  0% { transform: translateX(-100%) rotate(0deg) scaleY(1); }
  50% { transform: translateX(50vw) rotate(180deg) scaleY(1.5); }
  100% { transform: translateX(100vw) rotate(360deg) scaleY(1); }
`

const wave3 = keyframes`
  0% { transform: translateX(100vw) rotate(360deg); }
  100% { transform: translateX(-100%) rotate(0deg); }
`

export function WaveAnimation() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Wave 1 */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          height: "200px",
          background: `
            linear-gradient(45deg, 
              rgba(255, 215, 0, 0.1) 0%,
              rgba(255, 140, 105, 0.05) 50%,
              rgba(144, 238, 144, 0.1) 100%
            )
          `,
          clipPath: "polygon(0 50%, 100% 80%, 100% 100%, 0 100%)",
          animation: `${wave1} 20s linear infinite`,
        }}
      />

      {/* Wave 2 */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          height: "150px",
          background: `
            linear-gradient(-45deg, 
              rgba(144, 238, 144, 0.08) 0%,
              rgba(255, 215, 0, 0.04) 50%,
              rgba(255, 140, 105, 0.08) 100%
            )
          `,
          clipPath: "polygon(0 70%, 100% 40%, 100% 100%, 0 100%)",
          animation: `${wave2} 25s linear infinite`,
          animationDelay: "-5s",
        }}
      />

      {/* Wave 3 */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          height: "100px",
          background: `
            linear-gradient(90deg, 
              rgba(255, 140, 105, 0.06) 0%,
              rgba(144, 238, 144, 0.03) 50%,
              rgba(255, 215, 0, 0.06) 100%
            )
          `,
          clipPath: "polygon(0 60%, 100% 90%, 100% 100%, 0 100%)",
          animation: `${wave3} 30s linear infinite`,
          animationDelay: "-10s",
        }}
      />

      {/* Top waves */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "150px",
          background: `
            linear-gradient(135deg, 
              rgba(255, 215, 0, 0.05) 0%,
              rgba(255, 140, 105, 0.03) 50%,
              rgba(144, 238, 144, 0.05) 100%
            )
          `,
          clipPath: "polygon(0 0%, 100% 0%, 100% 60%, 0 30%)",
          animation: `${wave1} 35s linear infinite reverse`,
        }}
      />
    </Box>
  )
}
