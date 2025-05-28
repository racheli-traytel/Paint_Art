"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import CategoriesButtons from "./CategoriesButtons"
import SearchDrawings from "./SearchDrawing"
import { Box, Container, Typography } from "@mui/material"
import DrawingList from "./DrawingList"
import FeatureCards from "./FeatureCards"

// Motion components
const MotionBox = motion(Box)
const MotionContainer = motion(Container)
const MotionTypography = motion(Typography)

const SearchAndCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchTerm, _setSearchTerm] = useState<string>("")

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  const searchContainerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
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
        duration: 0.8,
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <>
      {/* Hero Section with Enhanced Animation */}
      <MotionBox
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 140, 105, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(144, 238, 144, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #FFD700 0%, #FF8C69 25%, #90EE90 50%, #FFB14C 75%, #FFF700 100%)
          `,
          backgroundSize: "400% 400%",
          animation: "gradient-wave 12s ease-in-out infinite",
          width: "100%",
          mt: 0,
          textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: "float 20s linear infinite",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `
              radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "sparkle 25s linear infinite",
            pointerEvents: "none",
          },
          "@keyframes gradient-wave": {
            "0%, 100%": { backgroundPosition: "0% 50%" },
            "25%": { backgroundPosition: "100% 0%" },
            "50%": { backgroundPosition: "100% 100%" },
            "75%": { backgroundPosition: "0% 100%" },
          },
          "@keyframes float": {
            "0%": { transform: "translateY(0px) rotate(0deg)" },
            "33%": { transform: "translateY(-10px) rotate(120deg)" },
            "66%": { transform: "translateY(5px) rotate(240deg)" },
            "100%": { transform: "translateY(0px) rotate(360deg)" },
          },
          "@keyframes sparkle": {
            "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
            "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
          },
        }}
        variants={heroVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        <MotionContainer maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* Decorative Elements */}
          <motion.div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            style={{
              position: "absolute",
              top: "20%",
              right: "15%",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(8px)",
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <MotionTypography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#2c3e50",
              textShadow: "2px 2px 4px rgba(255,255,255,0.7)",
              mb: 2,
              direction: "rtl",
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem", lg: "3.8rem" },
              background: "linear-gradient(45deg, #2c3e50, #34495e, #2c3e50)",
              backgroundSize: "300% 300%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
              lineHeight: 1.2,
            }}
            variants={titleVariants}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              backgroundPosition: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            🎨 ציורי צביעה מהנים לילדים 🌈
          </MotionTypography>

          <MotionTypography
            variant="h6"
            sx={{
              color: "#34495e",
              maxWidth: "900px",
              mx: "auto",
              px: 3,
              direction: "rtl",
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              fontWeight: 500,
              lineHeight: 1.6,
              textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "30px",
              py: 2,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            variants={subtitleVariants}
          >
            ✨ גלו מגוון רחב של דפי צביעה מקוריים ומהנים לילדים בכל הגילאים ✨
            <br />
            🖍️ הדפסה קלה • איכות גבוהה • בחינם לחלוטין 🖍️
          </MotionTypography>
        </MotionContainer>
      </MotionBox>

      {/* Search and Categories Section */}
      <MotionContainer maxWidth="lg">
        <MotionBox
          sx={{
            backgroundColor: "white",
            maxWidth: "100%",
            mx: "auto",
            borderRadius: "25px",
            boxShadow: `
              0 20px 40px rgba(0,0,0,0.1),
              0 0 0 1px rgba(255,255,255,0.5) inset
            `,
            mb: 6,
            mt: { xs: -3, md: -4 },
            overflow: "hidden",
            position: "relative",
            background: `
              linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)
            `,
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #FFD700, #FF8C69, #90EE90, #FFB14C)",
              backgroundSize: "300% 100%",
            },
          }}
          variants={searchContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          whileHover="hover"
        >
          {/* Animated border */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #FFD700, #FF8C69, #90EE90, #FFB14C)",
              backgroundSize: "300% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <SearchDrawings setSelectedCategory={setSelectedCategory} />
            <CategoriesButtons setSelectedCategory={setSelectedCategory} />
          </Box>
        </MotionBox>
      </MotionContainer>

      {/* Content Sections with Staggered Animation */}
      <MotionBox variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1 }}>
        <motion.div variants={contentVariants}>
          <DrawingList selectedCategory={selectedCategory} searchTerm={searchTerm} />
        </motion.div>
        <motion.div variants={contentVariants}>
          <FeatureCards />
        </motion.div>
      </MotionBox>
    </>
  )
}

export default SearchAndCategory
