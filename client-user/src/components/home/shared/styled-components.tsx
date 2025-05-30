"use client"

import { motion } from "framer-motion"
import { Box, Button, Typography, Card, Accordion } from "@mui/material"
import { styled } from "@mui/material/styles"

// Motion components
export const MotionBox = motion(Box)
export const MotionCard = motion(Card)
export const MotionButton = motion(Button)
export const MotionTypography = motion(Typography)
export const MotionAccordion = motion(Accordion)

// Styled components
export const GradientButton = styled(MotionButton)(({ theme, color }) => ({
  background: color || "linear-gradient(45deg, #ff9f43 0%, #f39200 100%)",
  color: "white",
  padding: theme.spacing(1.5, 4),
  fontWeight: "bold",
  fontSize: "0.95rem",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  zIndex: 20,
  pointerEvents: "auto",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    transition: "left 0.5s",
    pointerEvents: "none",
    zIndex: -1,
  },
  "&:hover::before": {
    left: "100%",
  },
  "&:hover": {
    boxShadow: "0 8px 25px rgba(243, 146, 0, 0.4)",
  },
}))

export const IconContainer = styled(MotionBox)`
  ${({ theme, bgcolor }) => `
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: ${bgcolor || "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)"};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: ${theme.spacing(3)};
    margin-bottom: ${theme.spacing(2)};
    position: relative;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    pointer-events: none;
    &::before {
      content: "";
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border-radius: 50%;
      background: linear-gradient(45deg, #ff9f43, #f39200, #ff9f43);
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    &:hover::before {
      opacity: 1;
    }
  `}
`

export const SectionTitle = styled(MotionTypography)(({ theme }) => ({
  background: "linear-gradient(45deg, #2d3748 0%, #4a5568 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  position: "relative",
}))

export const TestimonialCard = styled(MotionCard)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  height: "100%",
  position: "relative",
  border: "1px solid rgba(255,159,67,0.1)",
  transition: "all 0.3s ease",
  overflow: "visible",
}))

export const FAQAccordion = styled(MotionAccordion)(({}) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
  border: "1px solid rgba(255,159,67,0.1)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  "&:hover": {
    borderColor: "rgba(255,159,67,0.3)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
}))
