"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Box, InputBase, IconButton, Paper, Fade } from "@mui/material"
import { Search } from "@mui/icons-material"
import { keyframes } from "@mui/system"

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 140, 105, 0.2);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 140, 105, 0.4);
    transform: scale(1.02);
  }
`

const shimmerEffect = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const rotateGradient = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

interface SearchDrawingsProps {
  setSelectedCategory: (category: number | null) => void
  setSearchTerm: (term: string) => void
}

export function SearchDrawings({ setSelectedCategory, setSearchTerm }: SearchDrawingsProps) {
  const [searchValue, setSearchValue] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.trim()) {
        setSearchTerm(searchValue)
        setSelectedCategory(null)
        setIsTyping(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      setIsTyping(true)
    }
  }, [searchValue, setSelectedCategory, setSearchTerm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
      <Box sx={{ position: "relative", width: "100%", maxWidth: 900 }}>
        {/* Rotating gradient border */}
        <Box
          sx={{
            position: "absolute",
            inset: -3,
            background: "conic-gradient(from 0deg, #FFD700, #FF8C69, #90EE90, #FFD700)",
            borderRadius: 12,
            animation: `${rotateGradient} 4s linear infinite`,
            opacity: isFocused ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Glow effect */}
        <Box
          sx={{
            position: "absolute",
            inset: -10,
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.2), transparent 70%)",
            borderRadius: 15,
            filter: "blur(15px)",
            opacity: isFocused ? 1 : 0,
            transition: "opacity 0.3s ease",
            animation: isFocused ? `${pulseGlow} 2s ease-in-out infinite` : "none",
          }}
        />

        <Paper
          elevation={12}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            borderRadius: 12,
            overflow: "hidden",
            background: `
              linear-gradient(145deg, 
                rgba(255, 255, 255, 0.95) 0%,
                rgba(248, 249, 250, 0.95) 100%
              )
            `,
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90, #FFD700)",
              backgroundSize: "400% 400%",
              opacity: 0.05,
              animation: `${keyframes`
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              `} 8s ease infinite`,
            },
          }}
        >
          <IconButton
            sx={{
              background: "linear-gradient(45deg, #FFD700, #FF8C69)",
              color: "white",
              m: 1.5,
              p: 2.5,
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                background: "linear-gradient(45deg, #FFC107, #FF5722)",
                transform: "scale(1.1) rotate(10deg)",
                boxShadow: "0 8px 25px rgba(255, 215, 0, 0.4)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                transition: "left 0.5s",
              },
              "&:hover::before": {
                left: "100%",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Search sx={{ fontSize: 32 }} />
          </IconButton>

          <InputBase
            placeholder="חפש ציור יצירה..."
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            sx={{
              flex: 1,
              px: 3,
              py: 2,
              fontSize: "1.2rem",
              direction: "rtl",
              fontWeight: 500,
              "& input": {
                textAlign: "right",
                "&::placeholder": {
                  color: "rgba(0,0,0,0.5)",
                  opacity: 1,
                  fontWeight: 400,
                },
              },
            }}
          />

          {/* Enhanced typing indicator */}
          {isTyping && (
            <Fade in={isTyping}>
              <Box sx={{ display: "flex", gap: 1, px: 3, alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: `linear-gradient(45deg, 
                        ${["#FFD700", "#FF8C69", "#90EE90"][i]}, 
                        ${["#FFC107", "#FF5722", "#4CAF50"][i]}
                      )`,
                      animation: `${keyframes`
                        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                        40% { transform: scale(1.2); opacity: 1; }
                      `} 1.4s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                      boxShadow: `0 0 10px ${["#FFD700", "#FF8C69", "#90EE90"][i]}`,
                    }}
                  />
                ))}
              </Box>
            </Fade>
          )}
        </Paper>
      </Box>
    </Box>
  )
}
