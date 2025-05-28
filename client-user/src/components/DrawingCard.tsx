"use client"

import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography, IconButton, Tooltip } from "@mui/material"
import { ColorLens, Download, Star } from "@mui/icons-material"
import { motion } from "framer-motion"
import type Drawing from "../types/drawing"
import RatingStars from "./RatingStars"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootStore } from "./redux/Store"
import { useNavigate } from "react-router-dom"
import ErrorModal from "./ErrorModal"
import RatingModal from "./RatingModal"
import axios from "axios"
import { fetchTopRatedDrawings } from "./redux/DrawingSlice"

// Motion components
const MotionCard = motion(Card)
const MotionBox = motion(Box)
const MotionIconButton = motion(IconButton)
const MotionTypography = motion(Typography)

const baseURL = import.meta.env.VITE_API_URL

const DrawingCard = ({ drawing }: { drawing: Drawing }) => {
  const { user } = useSelector((state: RootStore) => state.auth)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [_currentDrawingId, setCurrentDrawingId] = useState<number | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false)
  const [ratingDrawingId, setRatingDrawingId] = useState<number | null>(null)
  const [ratingDrawingTitle, setRatingDrawingTitle] = useState<string>("")

  const handleColoringClick = (id: number) => {
    if (user) {
      navigate(`/${id}`)
    } else {
      setCurrentDrawingId(id)
      setIsModalOpen(true)
    }
  }

  const handleRatingClick = (id: number, title: string) => {
    setRatingDrawingId(id)
    setRatingDrawingTitle(title)
    setIsRatingModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCloseRatingModal = () => {
    dispatch(fetchTopRatedDrawings(10))
    setIsRatingModalOpen(false)
  }

  const handleDownloadClick = async () => {
    const fileName = drawing.name
    const downloadResponse = await axios.get(`${baseURL}/upload/download-url/${fileName}`)
    const fileUrl = downloadResponse.data

    try {
      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error("Failed to fetch file")
      }
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      link.click()
    } catch (error) {
      console.error("Error downloading the file:", error)
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
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
        duration: 0.6,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const actionButtonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={drawing.id}>
      <MotionCard
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
        }}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        whileHover="hover"
      >
        {/* Animated border effect */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #6a5acd, #5a4abf, #6a5acd)",
            backgroundSize: "200% 100%",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ amount: 0.3 }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            delay: 0.4, duration: 0.8,
            backgroundPosition: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
        />

        <MotionBox sx={{ position: "relative", paddingTop: "75%" }}>
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
          >
            <CardMedia
              component="img"
              image={drawing.imageUrl}
              alt={drawing.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "#f8f8f8",
              }}
            />
          </motion.div>
        </MotionBox>

        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.3 }}>
          <CardContent sx={{ flexGrow: 1, direction: "rtl" }}>
            <MotionTypography
              gutterBottom
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#3d2c8d",
              }}
              variants={contentVariants}
            >
              {drawing.title}
            </MotionTypography>

            <MotionTypography variant="body2" color="text.secondary" sx={{ mb: 2 }} variants={contentVariants}>
              {drawing.description}
            </MotionTypography>

            <Divider sx={{ my: 1 }} />

            <MotionBox sx={{ display: "flex", alignItems: "center", mb: 2 }} variants={contentVariants}>
              <RatingStars rating={drawing.avgRating} count={drawing.countRating} />
              <Typography variant="body2" sx={{ ml: 1, fontWeight: "medium" }}>
                {drawing.avgRating.toFixed(1)}
              </Typography>
            </MotionBox>

            <MotionBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                direction: "rtl",
              }}
              variants={contentVariants}
            >
              <MotionBox sx={{ display: "flex", alignItems: "center", gap: 1 }} variants={actionButtonVariants}>
                <Tooltip title="צביעה" arrow placement="top">
                  <MotionIconButton
                    onClick={() => handleColoringClick(drawing.id)}
                    sx={{
                      bgcolor: "#f0e6ff",
                      "&:hover": { bgcolor: "#d9c2ff" },
                      padding: "12px",
                    }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <ColorLens sx={{ fontSize: 28, color: "#3d2c8d" }} />
                  </MotionIconButton>
                </Tooltip>
                <MotionTypography
                  variant="body2"
                  sx={{
                    fontWeight: "medium",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColoringClick(drawing.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  צביעה
                </MotionTypography>
              </MotionBox>

              <MotionBox sx={{ display: "flex", alignItems: "center", gap: 1 }} variants={actionButtonVariants}>
                <Tooltip title="הורדה" arrow placement="top">
                  <MotionIconButton
                    onClick={handleDownloadClick}
                    sx={{
                      bgcolor: "#e6f7ff",
                      "&:hover": { bgcolor: "#bfe6ff" },
                      padding: "12px",
                    }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Download sx={{ fontSize: 28, color: "#0277bd" }} />
                  </MotionIconButton>
                </Tooltip>
                <MotionTypography
                  variant="body2"
                  sx={{
                    fontWeight: "medium",
                    cursor: "pointer",
                  }}
                  onClick={handleDownloadClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  הורדה
                </MotionTypography>
              </MotionBox>

              <MotionBox sx={{ display: "flex", alignItems: "center", gap: 1 }} variants={actionButtonVariants}>
                <Tooltip title="דרוג" arrow placement="top">
                  <MotionIconButton
                    onClick={() => handleRatingClick(drawing.id, drawing.title)}
                    sx={{
                      bgcolor: "#fff8e1",
                      "&:hover": { bgcolor: "#ffecb3" },
                      padding: "12px",
                    }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Star sx={{ fontSize: 28, color: "#ff9800" }} />
                  </MotionIconButton>
                </Tooltip>
                <MotionTypography
                  variant="body2"
                  sx={{
                    fontWeight: "medium",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRatingClick(drawing.id, drawing.title)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  דרוג
                </MotionTypography>
              </MotionBox>
            </MotionBox>
          </CardContent>
        </motion.div>

        {/* Hover overlay effect */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(45deg, rgba(106, 90, 205, 0.1), transparent)",
            opacity: 0,
            pointerEvents: "none",
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </MotionCard>

      <ErrorModal open={isModalOpen} onClose={handleCloseModal} />

      {ratingDrawingId && (
        <RatingModal
          open={isRatingModalOpen}
          onClose={handleCloseRatingModal}
          drawingId={ratingDrawingId}
          drawingTitle={ratingDrawingTitle}
        />
      )}
    </Grid>
  )
}
export default DrawingCard
