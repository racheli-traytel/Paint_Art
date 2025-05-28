"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { searchDrawings } from "./redux/DrawingSlice"
import type { AppDispatch } from "./redux/Store"
import { Box, InputBase, Paper, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

// Motion components
const MotionBox = motion(Box)
const MotionPaper = motion(Paper)
const MotionIconButton = motion(IconButton)

const SearchDrawings: React.FC<{ setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>> }> = ({
  setSelectedCategory,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [_isTyping, setIsTyping] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        dispatch(searchDrawings(searchTerm))
        setSelectedCategory(null)
        setIsTyping(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      setIsTyping(true)
    }
  }, [dispatch, searchTerm, setSelectedCategory])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const searchVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <MotionBox
      sx={{ display: "flex", justifyContent: "center", marginBottom: "20px", marginTop: "20px" }}
      variants={searchVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
    >
      <MotionPaper
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "800px",
          borderRadius: "30px",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          pl: 1,
          boxShadow: "none",
          position: "relative",
        }}
        whileHover={{
          boxShadow: "0 8px 25px rgba(106, 90, 205, 0.15)",
          transform: "translateY(-2px)",
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <MotionIconButton
          type="button"
          sx={{
            backgroundColor: "#6a5acd",
            borderRadius: "12px",
            mr: 1,
            p: "10px",
            "&:hover": { backgroundColor: "#5a4abf" },
          }}
          variants={iconVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <SearchIcon sx={{ color: "white" }} />
        </MotionIconButton>

        <motion.div
          style={{ flex: 1, marginLeft: 8 }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <InputBase
            placeholder="חפש ציור יצירה..."
            sx={{
              flex: 1,
              "& input": {
                textAlign: "left",
                direction: "ltr",
              },
            }}
            value={searchTerm}
            onChange={handleChange}
          />
        </motion.div>

        {/* Animated border effect */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #6a5acd, #5a4abf, #6a5acd)",
            backgroundSize: "200% 100%",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ amount: 0.5 }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            scaleX: { delay: 0.4, duration: 0.8 },
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      </MotionPaper>
    </MotionBox>
  )
}

export default SearchDrawings
