"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Box, InputBase, IconButton, Paper, Fade } from "@mui/material"
import { Search } from "@mui/icons-material"
import { keyframes } from "@mui/system"

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(106, 90, 205, 0.3); }
  50% { box-shadow: 0 0 30px rgba(106, 90, 205, 0.6); }
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
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Box sx={{ position: "relative", width: "100%", maxWidth: 800 }}>
        {/* Glow effect */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(45deg, rgba(106, 90, 205, 0.2), rgba(255, 159, 67, 0.2))",
            borderRadius: 10,
            filter: "blur(20px)",
            opacity: isFocused ? 1 : 0,
            transition: "opacity 0.3s ease",
            animation: isFocused ? `${glow} 2s ease-in-out infinite` : "none",
          }}
        />

        <Paper
          elevation={8}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            overflow: "hidden",
            background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
            border: `2px solid ${isFocused ? "#6a5acd" : "rgba(0,0,0,0.1)"}`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            },
          }}
        >
          <IconButton
            sx={{
              background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
              color: "white",
              m: 1,
              p: 2,
              "&:hover": {
                background: "linear-gradient(45deg, #5a4abf, #e67e22)",
                transform: "scale(1.05)",
                animation: `${pulse} 1s ease-in-out`,
              },
              transition: "all 0.3s ease",
            }}
          >
            <Search sx={{ fontSize: 28 }} />
          </IconButton>

          <InputBase
            placeholder="חפש ציור יצירה..."
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            sx={{
              flex: 1,
              px: 2,
              py: 1.5,
              fontSize: "1.1rem",
              direction: "rtl",
              "& input": {
                textAlign: "right",
                "&::placeholder": {
                  color: "rgba(0,0,0,0.5)",
                  opacity: 1,
                },
              },
            }}
          />

          {/* Typing indicator */}
          {isTyping && (
            <Fade in={isTyping}>
              <Box sx={{ display: "flex", gap: 0.5, px: 2 }}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
                      animation: `${pulse} 1.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
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
