"use client"

import { useState, useEffect } from "react"
import { Box, Container } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import rtlPlugin from "stylis-plugin-rtl"
import { prefixer } from "stylis"

import HeaderSection from "./sections/header-section"
import FeatureCards from "./sections/feature-cards"
import TestimonialsSection from "./sections/testimonials-section"
import FAQSection from "./sections/faq-section"

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
})

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontWeight: 700,
          position: "relative",
          zIndex: 10,
          pointerEvents: "auto",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: "visible",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          marginBottom: 16,
          "&:before": {
            display: "none",
          },
        },
      },
    },
  },
})

export default function FeatureCardsWithTestimonials() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigation = (link: string) => {
    console.log(`מנווט ל: ${link}`)
    window.location.href = link
  }

  if (!mounted) {
    return null
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box sx={{ py: 8, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
          <Container maxWidth="xl">
            <HeaderSection />
            <FeatureCards onNavigate={handleNavigation} />
            <TestimonialsSection />
            <FAQSection />
          </Container>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  )
}
