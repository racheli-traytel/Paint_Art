"use client"

import { Grid, Box, Typography, Avatar, Chip } from "@mui/material"
import { Star, FormatQuote } from "@mui/icons-material"
import { motion } from "framer-motion"
import { MotionBox, SectionTitle, TestimonialCard } from "../shared/styled-components"
import {
  containerVariants,
  titleVariants,
  testimonialVariants,
  iconContainerVariants,
  quoteVariants,
  fadeInUp,
} from "../shared/animations"
import type { Testimonial } from "../types"

const MotionAvatar = motion(Avatar)
const MotionChip = motion(Chip)

const testimonials: Testimonial[] = [
  {
    name: "שרה כהן",
    age: 8,
    text: "אני אוהבת לצבוע עם ה-AI! זה עוזר לי לעשות ציורים יפים מאוד",
    rating: 5,
    avatar: "ש",
    location: "תל אביב",
  },
  {
    name: "דוד לוי",
    age: 35,
    text: "האתר הזה מושלם לבילוי עם הילדים. הם נהנים והאיכות מעולה",
    rating: 5,
    avatar: "ד",
    location: "חיפה",
  },
  {
    name: "מיכל אברהם",
    age: 28,
    text: "העלאת התמונות האישיות זה גאוני! הפכתי תמונה של הכלב שלי לדף צביעה",
    rating: 5,
    avatar: "מ",
    location: "ירושלים",
  },
  {
    name: "יוסי רוזן",
    age: 42,
    text: "הגלריה מלאה ברעיונות מדהימים. הילדים שלי מתים על האתר הזה",
    rating: 4,
    avatar: "י",
    location: "באר שבע",
  },
]

export default function TestimonialsSection() {
  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      variants={containerVariants}
      sx={{ mb: 10 }}
    >
      <SectionTitle
        variant="h3"
        textAlign="center"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        sx={{ mb: 6 }}
      >
        מה אומרים המשתמשים שלנו
      </SectionTitle>

      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <TestimonialCard
              variants={testimonialVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              whileHover="hover"
              custom={index}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <MotionAvatar
                  sx={{
                    bgcolor: "primary.main",
                    mr: 2,
                    background: "linear-gradient(45deg, #ff9f43, #f39200)",
                  }}
                  variants={iconContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.5 }}
                >
                  {testimonial.avatar}
                </MotionAvatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "left" }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>
                    {testimonial.location}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", mb: 2, justifyContent: "flex-start" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    sx={{
                      color: i < testimonial.rating ? "#ffc107" : "#e0e0e0",
                      fontSize: 20,
                    }}
                  />
                ))}
              </Box>

              <MotionBox
                variants={quoteVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                sx={{ position: "relative" }}
              >
                <FormatQuote
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -5,
                    fontSize: 40,
                    color: "rgba(255,159,67,0.3)",
                    transform: "rotate(180deg)",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    textAlign: "left",
                    pr: 3,
                  }}
                >
                  {testimonial.text}
                </Typography>
              </MotionBox>

              <MotionChip
                label={`גיל ${testimonial.age}`}
                size="small"
                sx={{
                  mt: 2,
                  background: "linear-gradient(45deg, #ff9f43, #f39200)",
                  color: "white",
                  fontWeight: "bold",
                }}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                transition={{ delay: 0.3 }}
              />
            </TestimonialCard>
          </Grid>
        ))}
      </Grid>
    </MotionBox>
  )
}
