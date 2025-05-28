
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Rating,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
} from "@mui/material"
import {
  Star,
  Upload,
  Palette,
  Image as ImageIcon,
  Share,
  FormatQuote,
  ExpandMore,
  Help,
  QuestionAnswer,
} from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"

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
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
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

// Motion components
const MotionBox = motion(Box)
const MotionCard = motion(Card)
const MotionButton = motion(Button)
const MotionTypography = motion(Typography)
const MotionAvatar = motion(Avatar)
const MotionChip = motion(Chip)
const MotionAccordion = motion(Accordion)

// Styled components
const GradientButton = styled(MotionButton)(({ theme, color }) => ({
  background: color || "linear-gradient(45deg, #ff9f43 0%, #f39200 100%)",
  color: "white",
  padding: theme.spacing(1.5, 4),
  fontWeight: "bold",
  fontSize: "0.95rem",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    transition: "left 0.5s",
  },
  "&:hover::before": {
    left: "100%",
  },
  "&:hover": {
    boxShadow: "0 8px 25px rgba(243, 146, 0, 0.4)",
  },
}))

const IconContainer = styled(MotionBox)`
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
    }
    &:hover::before {
      opacity: 1;
    }
  `}
`

const SectionTitle = styled(MotionTypography)(({ theme }) => ({
  background: "linear-gradient(45deg, #2d3748 0%, #4a5568 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  position: "relative",
}))

const TestimonialCard = styled(MotionCard)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  height: "100%",
  position: "relative",
  border: "1px solid rgba(255,159,67,0.1)",
  transition: "all 0.3s ease",
}))

const FAQAccordion = styled(MotionAccordion)(({ }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
  border: "1px solid rgba(255,159,67,0.1)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  "&:hover": {
    borderColor: "rgba(255,159,67,0.3)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
}))

export default function FeatureCardsWithTestimonials() {
  const [mounted, setMounted] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<string | false>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Star,
      title: "דירוג ציורים",
      description: "דרגו את הציורים האהובים עליכם, שתפו עם חברים ומשפחה וגלו את הציורים הפופולריים ביותר בקהילה",
      buttonText: "לציורים הפופולריים",
      color: "#ffc107",
      gradient: "linear-gradient(45deg, #ffc107 0%, #ff9800 100%)",
      bgcolor: "linear-gradient(45deg, #ffc107 0%, #ff9800 100%)",
      link: "/popular",
    },
    {
      icon: Upload,
      title: "העלאת תמונה אישית",
      description: "העלו תמונה משלכם והמערכת תהפוך אותה לדף צביעה מותאם אישית באמצעות טכנולוגיה מתקדמת",
      buttonText: "העלאת תמונה",
      color: "#2196f3",
      gradient: "linear-gradient(45deg, #2196f3 0%, #1976d2 100%)",
      bgcolor: "linear-gradient(45deg, #2196f3 0%, #1976d2 100%)",
      link: "/coloring-page-converter",
    },
    {
      icon: Palette,
      title: "צביעה בהנחיית AI",
      description: "בחרו ציור וצבעו אותו עם הדרכה חכמה של בינה מלאכותית שתנחה אתכם לתוצאות מרהיבות",
      buttonText: "התחברות לצביעה עם AI",
      color: "#e91e63",
      gradient: "linear-gradient(45deg, #e91e63 0%, #c2185b 100%)",
      bgcolor: "linear-gradient(45deg, #e91e63 0%, #c2185b 100%)",
      link: "/login",
    },
    {
      icon: ImageIcon,
      title: "העלאת ציורים לגלריה",
      description: "שתפו את הציורים המקוריים שיצרתם עם הקהילה, קבלו משוב והשראה ממשתמשים אחרים",
      buttonText: "עבור לכלי",
      color: "#00bcd4",
      gradient: "linear-gradient(45deg, #00bcd4 0%, #0097a7 100%)",
      bgcolor: "linear-gradient(45deg, #00bcd4 0%, #0097a7 100%)",
      link: "/gallery",
    },
    {
      icon: Share,
      title: "שיתוף ציורים",
      description: "שתפו את היצירות הצבועות שלכם ברשתות החברתיות, שלחו לחברים או הדפיסו לקישוט הבית",
      buttonText: "עבור לכלי",
      color: "#4caf50",
      gradient: "linear-gradient(45deg, #4caf50 0%, #388e3c 100%)",
      bgcolor: "linear-gradient(45deg, #4caf50 0%, #388e3c 100%)",
      link: "/share",
    },
  ]

  const testimonials = [
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

  const faqData = [
    {
      id: "faq1",
      question: "האם השירות בחינם?",
      answer:
        "כן! השירותים הבסיסיים של PaintArt הם בחינם לחלוטין. אתם יכולים לצבוע ציורים, לדרג אותם ולשתף עם חברים ללא תשלום. יש לנו גם תוכניות פרימיום עם תכונות מתקדמות נוספות.",
    },
    {
      id: "faq2",
      question: "איך עובדת הצביעה עם בינה מלאכותית?",
      answer:
        "הבינה המלאכותית שלנו מנתחת את הציור ומציעה לכם צבעים מתאימים, מנחה אתכם איפה לצבוע ונותנת טיפים לשיפור הטכניקה. זה כמו מורה אישי לאמנות!",
    },
    {
      id: "faq3",
      question: "אילו סוגי תמונות אפשר להעלות?",
      answer:
        "אתם יכולים להעלות כמעט כל סוג תמונה - תמונות אישיות, חיות מחמד, נופים, דמויות ועוד. המערכת שלנו תהפוך אותן לדפי צביעה איכותיים. התמונות צריכות להיות ברזולוציה טובה ובפורמטים נפוצים כמו JPG או PNG.",
    },
    {
      id: "faq4",
      question: "האם אפשר להדפיס את הציורים?",
      answer:
        "בהחלט! כל הציורים זמינים להדפסה באיכות גבוהה. אתם יכולים להדפיס אותם בבית או בבית דפוס מקצועי. אנחנו מספקים קבצים באיכות מתאימה להדפסה.",
    },
    {
      id: "faq5",
      question: "מה הגיל המומלץ לשימוש באתר?",
      answer:
        "האתר מתאים לכל הגילאים! יש לנו ציורים פשוטים לילדים קטנים וציורים מורכבים יותר למבוגרים. הממשק ידידותי ונוח לשימוש לכל המשפחה.",
    },
    {
      id: "faq6",
      question: "איך אפשר לשתף ציורים עם חברים?",
      answer:
        "אתם יכולים לשתף ציורים ישירות מהאתר לרשתות החברתיות, לשלוח בווטסאפ או במייל, או ליצור קישור לשיתוף. יש גם אפשרות ליצור גלריה אישית שחברים יכולים לראות.",
    },
    {
      id: "faq7",
      question: "האם יש אפליקציה לטלפון?",
      answer:
        "כרגע האתר מותאם לשימוש בדפדפן בטלפון ובמחשב. אנחנו עובדים על אפליקציה ייעודית שתושק בקרוב עם תכונות נוספות ושיפורים.",
    },
    {
      id: "faq8",
      question: "איך פועל מערכת הדירוגים?",
      answer:
        "משתמשים יכולים לדרג ציורים בכוכבים (1-5), להוסיף תגובות ולשתף. הציורים הפופולריים ביותר מופיעים בעמוד הראשי ובגלריית הפופולריים. זה עוזר למשתמשים אחרים למצוא ציורים איכותיים.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  }

  const iconContainerVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const buttonVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
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

  const testimonialVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
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

  const slideInFromRight = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  const fadeInUp = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  const faqVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (i:number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop" as "loop",
      ease: "easeInOut",
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop" as "loop", 
      ease: "easeInOut",
    },
  }

  const quoteVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const handleNavigation = (link: string) => {
    if (link) {
      window.location.href = link
    }
  }

  const handleFAQChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFAQ(isExpanded ? panel : false)
  }

  if (!mounted) {
    return null
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box sx={{ py: 8, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
          <Container maxWidth="xl">
            {/* Header Section */}
            <MotionBox
              textAlign="center"
              mb={8}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              variants={containerVariants}
            >
              <SectionTitle
                variant="h2"
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
              >
                מה אפשר לעשות ב-PaintArt?
                <MotionBox
                  sx={{
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: 4,
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #ff9f43, #f39200)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </SectionTitle>
              <MotionTypography
                variant="h6"
                color="text.secondary"
                sx={{ mt: 2, maxWidth: 600, mx: "auto" }}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
              >
                גלו עולם של יצירתיות ואמנות דיגיטלית עם הכלים המתקדמים שלנו
              </MotionTypography>
            </MotionBox>

            {/* Feature Cards - First Row */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={containerVariants}
              sx={{ mb: 8 }}
            >
              <Grid container spacing={4}>
                {features.slice(0, 3).map((feature, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <MotionBox
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.3 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <MotionCard
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                        whileHover={{
                          y: -12,
                          boxShadow: "0px 20px 60px rgba(0,0,0,0.15)",
                          transition: { type: "spring", stiffness: 300, damping: 15 },
                        }}
                      >
                        <MotionBox
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: feature.gradient,
                          }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{}}
                          transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                        />

                        <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
                          <IconContainer
                            bgcolor={feature.bgcolor}
                            variants={iconContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            whileHover="hover"
                            animate={floatingAnimation}
                          >
                            <feature.icon
                              sx={{
                                fontSize: 45,
                                color: "white",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                              }}
                            />
                          </IconContainer>

                          <MotionTypography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 2, color: "#2d3748", textAlign: "right" }}
                            variants={slideInFromRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            {feature.title}
                          </MotionTypography>

                          <MotionTypography
                            variant="body1"
                            color="text.secondary"
                            sx={{ lineHeight: 1.6, textAlign: "right" }}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            {feature.description}
                          </MotionTypography>
                        </CardContent>

                        <CardActions sx={{ p: 3, justifyContent: "center" }}>
                          <GradientButton
                            sx={{ background: feature.gradient }}
                            size="large"
                            onClick={() => handleNavigation(feature.link)}
                            variants={buttonVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            {feature.buttonText}
                          </GradientButton>
                        </CardActions>

                        <MotionBox
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(45deg, ${feature.color}33, transparent)`,
                            opacity: 0,
                          }}
                          whileHover={{ opacity: 1 }}
                        />
                      </MotionCard>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
            </MotionBox>

            {/* Feature Cards - Second Row */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={containerVariants}
              sx={{ mb: 10 }}
            >
              <Grid container spacing={4} justifyContent="center">
                {features.slice(3).map((feature, index) => (
                  <Grid item xs={12} md={4} key={index + 3}>
                    <MotionBox
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.3 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <MotionCard
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                        whileHover={{
                          y: -12,
                          boxShadow: "0px 20px 60px rgba(0,0,0,0.15)",
                          transition: { type: "spring", stiffness: 300, damping: 15 },
                        }}
                      >
                        <MotionBox
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: feature.gradient,
                          }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{}}
                          transition={{ delay: 0.5 + (index + 3) * 0.2, duration: 0.8 }}
                        />

                        <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
                          <IconContainer
                            bgcolor={feature.bgcolor}
                            variants={iconContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            whileHover="hover"
                            animate={floatingAnimation}
                          >
                            <feature.icon
                              sx={{
                                fontSize: 45,
                                color: "white",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                              }}
                            />
                          </IconContainer>

                          <MotionTypography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 2, color: "#2d3748", textAlign: "right" }}
                            variants={slideInFromRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            transition={{ delay: 0.3 + (index + 3) * 0.1 }}
                          >
                            {feature.title}
                          </MotionTypography>

                          <MotionTypography
                            variant="body1"
                            color="text.secondary"
                            sx={{ lineHeight: 1.6, textAlign: "right" }}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            transition={{ delay: 0.4 + (index + 3) * 0.1 }}
                          >
                            {feature.description}
                          </MotionTypography>
                        </CardContent>

                        <CardActions sx={{ p: 3, justifyContent: "center" }}>
                          <GradientButton
                            sx={{ background: feature.gradient }}
                            size="large"
                            onClick={() => handleNavigation(feature.link)}
                            variants={buttonVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            {feature.buttonText}
                          </GradientButton>
                        </CardActions>

                        <MotionBox
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(45deg, ${feature.color}33, transparent)`,
                            opacity: 0,
                          }}
                          whileHover={{ opacity: 1 }}
                        />
                      </MotionCard>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
            </MotionBox>

            {/* Testimonials Section */}
            <Box sx={{ mb: 10 }}>
              <SectionTitle
                variant="h3"
                textAlign="center"
                sx={{ mb: 6 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                variants={titleVariants}
              >
                מה המשתמשים שלנו אומרים
                <MotionBox
                  sx={{
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: 4,
                    width: 60,
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #ff9f43, #f39200)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{}}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </SectionTitle>

              <Grid container spacing={4}>
                <AnimatePresence>
                  {testimonials.map((testimonial, index) => (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                      <TestimonialCard
                        custom={index}
                        variants={testimonialVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        whileHover="hover"
                      >
                        <Box display="flex" alignItems="center" mb={2}>
                          <MotionAvatar
                            sx={{
                              bgcolor: "#ff9f43",
                              width: 50,
                              height: 50,
                              mr: 2,
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                          >
                            {testimonial.avatar}
                          </MotionAvatar>
                          <Box>
                            <MotionTypography
                              variant="h6"
                              sx={{ fontWeight: "bold", color: "#2d3748" }}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.1 + index * 0.1 }}
                            >
                              {testimonial.name}
                            </MotionTypography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <MotionChip
                                label={`גיל ${testimonial.age}`}
                                size="small"
                                sx={{
                                  bgcolor: "rgba(255,159,67,0.1)",
                                  color: "#f39200",
                                  fontSize: "0.75rem",
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                              />
                              <MotionTypography
                                variant="caption"
                                color="text.secondary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 + index * 0.1 }}
                              >
                                {testimonial.location}
                              </MotionTypography>
                            </Box>
                          </Box>
                        </Box>

                        <Box position="relative" mb={2}>
                          <MotionBox
                            sx={{
                              position: "absolute",
                              top: -10,
                              right: -5,
                              color: "rgba(255,159,67,0.3)",
                              transform: "rotate(180deg)",
                            }}
                            variants={quoteVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <FormatQuote sx={{ fontSize: 30 }} />
                          </MotionBox>
                          <MotionTypography
                            variant="body2"
                            sx={{
                              fontStyle: "italic",
                              lineHeight: 1.6,
                              textAlign: "right",
                              pr: 2,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 + index * 0.1 }}
                          >
                            "{testimonial.text}"
                          </MotionTypography>
                        </Box>

                        <MotionBox
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 + index * 0.1 }}
                        >
                          <Rating
                            value={testimonial.rating}
                            readOnly
                            sx={{
                              "& .MuiRating-iconFilled": {
                                color: "#ffc107",
                              },
                            }}
                          />
                        </MotionBox>

                        <MotionBox
                          sx={{
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                          }}
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <MotionBox
                            sx={{
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)",
                              opacity: 0.3,
                            }}
                            animate={{
                              x: [-100, 100],
                              transition: {
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                ease: "easeInOut",
                              },
                            }}
                          />
                        </MotionBox>
                      </TestimonialCard>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>
            </Box>

            {/* FAQ Section */}
            <Box sx={{ mb: 10 }}>
              <MotionBox
                textAlign="center"
                mb={6}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                variants={titleVariants}
              >
                <SectionTitle variant="h3">
                  שאלות נפוצות
                  <MotionBox
                    sx={{
                      position: "absolute",
                      bottom: -10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: 4,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #ff9f43, #f39200)",
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: 60 }}
                    viewport={{}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </SectionTitle>
                <MotionBox
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    mt: 3,
                  }}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.5 }}
                >
                  <QuestionAnswer sx={{ color: "#ff9f43", fontSize: 30 }} />
                  <Typography variant="h6" color="text.secondary">
                    כל מה שרציתם לדעת על PaintArt
                  </Typography>
                </MotionBox>
              </MotionBox>

              <Grid container spacing={3}>
                {faqData.map((faq, index) => (
                  <Grid item xs={12} md={6} key={faq.id}>
                    <MotionBox
                      custom={index}
                      variants={faqVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.3 }}
                    >
                      <FAQAccordion
                        expanded={expandedFAQ === faq.id}
                        onChange={handleFAQChange(faq.id)}
                        whileHover={{
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 300, damping: 15 },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <MotionBox
                              animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ExpandMore sx={{ color: "#ff9f43" }} />
                            </MotionBox>
                          }
                          sx={{
                            "& .MuiAccordionSummary-content": {
                              alignItems: "center",
                              gap: 2,
                            },
                          }}
                        >
                          <Help sx={{ color: "#ff9f43", fontSize: 24 }} />
                          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2d3748" }}>
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <MotionBox
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{ lineHeight: 1.7, textAlign: "right" }}
                            >
                              {faq.answer}
                            </Typography>
                          </MotionBox>
                        </AccordionDetails>
                      </FAQAccordion>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Call to Action */}
            <MotionBox
              textAlign="center"
              mt={8}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              variants={fadeInUp}
            >
              <MotionTypography
                variant="h4"
                sx={{ fontWeight: "bold", mb: 3, color: "#2d3748" }}
                animate={pulseAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
                variants={titleVariants}
              >
                מוכנים להתחיל ליצור?
              </MotionTypography>

              <MotionBox initial="hidden" whileInView="visible" viewport={{ amount: 0.5 }} variants={buttonVariants}>
                <GradientButton
                  size="large"
                  sx={{ px: 6, py: 2, fontSize: "1.1rem" }}
                  onClick={() => handleNavigation("/login")}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 15px 30px rgba(255, 159, 67, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  התחילו עכשיו בחינם
                </GradientButton>
              </MotionBox>
            </MotionBox>
          </Container>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  )
}
