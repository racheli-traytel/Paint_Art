"use client"

import { useState } from "react"
import { Container, Box, Typography, Divider, Grid } from "@mui/material"
import { ImageHandler } from "./image-handler"
import { ResultsDisplay } from "./results-display"
import { Bubble } from "./utils"

export function ColoringPageConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [coloringPage, setColoringPage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (imageData: string) => {
    setOriginalImage(imageData)
    setColoringPage(null)
  }

  const handleReset = () => {
    setOriginalImage(null)
    setColoringPage(null)
  }

  const handleColoringPageGenerated = (pageData: string) => {
    setColoringPage(pageData)
    setIsProcessing(false)
  }

  return (
    <Container maxWidth="lg" sx={{ position: "relative", overflow: "hidden", py: 4 }}>
      {/* Decorative bubbles */}
      <Bubble size={120} x={10} y={20} delay={1} />
      <Bubble size={80} x={80} y={60} delay={2} />
      <Bubble size={150} x={70} y={25} delay={0} />
      <Bubble size={60} x={20} y={70} delay={3} />

      <Box sx={{ textAlign: "center", mb: 4, position: "relative" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 1,
            background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          המרת תמונות לדפי צביעה
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          העלה תמונה והפוך אותה לדף צביעה מותאם אישית בקלות
        </Typography>
        <Divider
          sx={{
            width: "100px",
            mx: "auto",
            borderColor: "rgba(106, 17, 203, 0.2)",
            borderWidth: 2,
            borderRadius: 2,
          }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ImageHandler
            originalImage={originalImage}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            onImageUpload={handleImageUpload}
            onReset={handleReset}
            onColoringPageGenerated={handleColoringPageGenerated}
          />
        </Grid>
      </Grid>

      {coloringPage && <ResultsDisplay coloringPage={coloringPage} />}
    </Container>
  )
}
