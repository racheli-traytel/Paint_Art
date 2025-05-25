"use client"

import { Box } from "@mui/material"
import { keyframes } from "@mui/system"

const float3D = keyframes`
  0% { 
    transform: translateY(0px) translateX(0px) rotateX(0deg) rotateY(0deg);
  }
  25% { 
    transform: translateY(-20px) translateX(10px) rotateX(90deg) rotateY(90deg);
  }
  50% { 
    transform: translateY(-10px) translateX(-10px) rotateX(180deg) rotateY(180deg);
  }
  75% { 
    transform: translateY(-30px) translateX(5px) rotateX(270deg) rotateY(270deg);
  }
  100% { 
    transform: translateY(0px) translateX(0px) rotateX(360deg) rotateY(360deg);
  }
`

const liquidFloat = keyframes`
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

export function FloatingElements() {
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
      {/* 3D floating cubes */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={`cube-${i}`}
          sx={{
            position: "absolute",
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            background: `linear-gradient(45deg, 
              rgba(255, 215, 0, 0.3), 
              rgba(255, 140, 105, 0.3)
            )`,
            borderRadius: "8px",
            animation: `${float3D} ${8 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        />
      ))}

      {/* Liquid morphing shapes */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={`liquid-${i}`}
          sx={{
            position: "absolute",
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            width: `${40 + Math.random() * 80}px`,
            height: `${40 + Math.random() * 80}px`,
            background: `radial-gradient(circle, 
              rgba(144, 238, 144, 0.2) 0%, 
              rgba(255, 215, 0, 0.1) 100%
            )`,
            animation: `${liquidFloat} ${10 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
            backdropFilter: "blur(3px)",
          }}
        />
      ))}

      {/* Floating rings */}
      {[...Array(10)].map((_, i) => (
        <Box
          key={`ring-${i}`}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${30 + Math.random() * 60}px`,
            height: `${30 + Math.random() * 60}px`,
            border: `2px solid rgba(255, 140, 105, 0.3)`,
            borderRadius: "50%",
            animation: `${keyframes`
              0% { 
                transform: rotate(0deg) scale(1);
                opacity: 0.3;
              }
              50% { 
                transform: rotate(180deg) scale(1.2);
                opacity: 0.7;
              }
              100% { 
                transform: rotate(360deg) scale(1);
                opacity: 0.3;
              }
            `} ${12 + Math.random() * 8}s linear infinite`,
            animationDelay: `${Math.random() * 12}s`,
          }}
        />
      ))}
    </Box>
  )
}
