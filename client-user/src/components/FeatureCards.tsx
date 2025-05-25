"use client"

import { useState, useEffect } from "react"
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
  Grow,
} from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { Star, Upload, Palette, Image as ImageIcon, Share, FormatQuote } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

// Styled Components
const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  borderRadius: theme.spacing(3),
  background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  overflow: "hidden",
  position: "relative",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "1px solid rgba(255,255,255,0.2)",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    "& .feature-icon": {
      animation: `${pulse} 2s infinite`,
    },
    "& .feature-button": {
      background: "linear-gradient(45deg, #ff9f43 0%, #f39200 100%)",
      transform: "scale(1.05)",
    },
  },
}))

const IconContainer = styled(Box)(({ theme }) => ({
  width: 90,
  height: 90,
  borderRadius: "50%",
  background: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  position: "relative",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: "50%",
    background: "linear-gradient(45deg, #ff9f43, #f39200, #ff9f43)",
    zIndex: -1,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover::before": {
    opacity: 1,
  },
}))

const FeatureButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff9f43 0%, #f39200 100%)",
  color: "white",
  borderRadius: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  fontWeight: "bold",
  fontSize: "0.95rem",
  textTransform: "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
    background: "linear-gradient(45deg, #f39200 0%, #e67e22 100%)",
    boxShadow: "0 8px 25px rgba(243, 146, 0, 0.4)",
  },
}))

const TestimonialCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  height: "100%",
  position: "relative",
  border: "1px solid rgba(255,159,67,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
    borderColor: "rgba(255,159,67,0.3)",
  },
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #2d3748 0%, #4a5568 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: "translateX(-50%)",
    width: 60,
    height: 4,
    background: "linear-gradient(45deg, #ff9f43, #f39200)",
    borderRadius: 2,
  },
}))

const FloatingElement = styled(Box)({
  animation: `${float} 6s ease-in-out infinite`,
})

// Component
export default function FeatureCardsWithTestimonials() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    if (link) {
      navigate(link);
    }
  };
  const features = [
    {
      icon: Star,
      title: "דירוג ציורים",
      description: "דרגו את הציורים האהובים עליכם, שתפו עם חברים ומשפחה וגלו את הציורים הפופולריים ביותר בקהילה",
      buttonText: "לציורים הפופולריים",
      color: "#ffc107",
      gradient: "linear-gradient(45deg, #ffc107 0%, #ff9800 100%)",
      link: "/popular",
    },
    {
      icon: Upload,
      title: "העלאת תמונה אישית",
      description: "העלו תמונה משלכם והמערכת תהפוך אותה לדף צביעה מותאם אישית באמצעות טכנולוגיה מתקדמת",
      buttonText: "העלאת תמונה",
      color: "#2196f3",
      gradient: "linear-gradient(45deg, #2196f3 0%, #1976d2 100%)",
      link: "/coloring-page-converter",
    },
    {
      icon: Palette,
      title: "צביעה בהנחיית AI",
      description: "בחרו ציור וצבעו אותו עם הדרכה חכמה של בינה מלאכותית שתנחה אתכם לתוצאות מרהיבות",
      buttonText: "התחברות לצביעה עם AI",
      color: "#e91e63",
      gradient: "linear-gradient(45deg, #e91e63 0%, #c2185b 100%)",
      link: "/login",
    },
    {
      icon: ImageIcon,
      title: "העלאת ציורים לגלריה",
      description: "שתפו את הציורים המקוריים שיצרתם עם הקהילה, קבלו משוב והשראה ממשתמשים אחרים",
      color: "#00bcd4",
      gradient: "linear-gradient(45deg, #00bcd4 0%, #0097a7 100%)",
    },
    {
      icon: Share,
      title: "שיתוף ציורים",
      description: "שתפו את היצירות הצבועות שלכם ברשתות החברתיות, שלחו לחברים או הדפיסו לקישוט הבית",
      color: "#4caf50",
      gradient: "linear-gradient(45deg, #4caf50 0%, #388e3c 100%)",
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

  if (!mounted) {
    return null
  }

  return (
    <Box sx={{ py: 8, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }} dir="rtl">
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <SectionTitle variant="h2" as="h1">
            מה אפשר לעשות ב-PaintArt?
          </SectionTitle>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2, maxWidth: 600, mx: "auto" }}>
            גלו עולם של יצירתיות ואמנות דיגיטלית עם הכלים המתקדמים שלנו
          </Typography>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* First row - 3 cards */}
          {features.slice(0, 3).map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grow in={mounted} timeout={500 + index * 200}>
                <FeatureCard>
                  <FloatingElement>
                    <IconContainer>
                      <feature.icon
                        className="feature-icon"
                        sx={{
                          fontSize: 45,
                          color: feature.color,
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                        }}
                      />
                    </IconContainer>
                  </FloatingElement>

                  <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "right" }}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: "bold", mb: 2, color: "#2d3748" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>

                  {feature.buttonText && (
                    <CardActions sx={{ p: 3, justifyContent: "center" }}>
                      <FeatureButton 
                        className="feature-button" 
                        size="large"
                        onClick={() => handleNavigation(feature.link)}
                      >
                        {feature.buttonText}
                      </FeatureButton>
                    </CardActions>
                  )}
                </FeatureCard>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Second row - 2 cards centered */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 10 }}>
          {features.slice(3).map((feature, index) => (
            <Grid item xs={12} md={4} key={index + 3}>
              <Grow in={mounted} timeout={500 + (index + 3) * 200}>
                <FeatureCard>
                  <FloatingElement>
                    <IconContainer>
                      <feature.icon
                        className="feature-icon"
                        sx={{
                          fontSize: 45,
                          color: feature.color,
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                        }}
                      />
                    </IconContainer>
                  </FloatingElement>

                  <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "right" }}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: "bold", mb: 2, color: "#2d3748" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>

                  {feature.link && (
                    <CardActions sx={{ p: 3, justifyContent: "center" }}>
                      <FeatureButton 
                        className="feature-button" 
                        size="large"
                        onClick={() => handleNavigation(feature.link)}
                      >
                        עבור לכלי
                      </FeatureButton>
                    </CardActions>
                  )}
                </FeatureCard>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials Section */}
        <Box>
          <SectionTitle variant="h3" textAlign="center" sx={{ mb: 6 }}>
            מה המשתמשים שלנו אומרים
          </SectionTitle>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <Grow in={mounted} timeout={1000 + index * 200}>
                  <TestimonialCard>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        sx={{
                          bgcolor: "#ff9f43",
                          width: 50,
                          height: 50,
                          mr: 2,
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2d3748" }}>
                          {testimonial.name}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip
                            label={`גיל ${testimonial.age}`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,159,67,0.1)",
                              color: "#f39200",
                              fontSize: "0.75rem",
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {testimonial.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box position="relative" mb={2}>
                      <FormatQuote
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: -5,
                          fontSize: 30,
                          color: "rgba(255,159,67,0.3)",
                          transform: "rotate(180deg)",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
                          lineHeight: 1.6,
                          textAlign: "right",
                          pr: 2,
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>
                    </Box>

                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: "#ffc107",
                        },
                      }}
                    />
                  </TestimonialCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box textAlign="center" mt={8}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#2d3748" }}>
            מוכנים להתחיל ליצור?
          </Typography>
          <FeatureButton 
            size="large" 
            sx={{ px: 6, py: 2, fontSize: "1.1rem" }}
            onClick={() => handleNavigation("/login")}
          >
            התחילו עכשיו בחינם
          </FeatureButton>
        </Box>
      </Container>
    </Box>
  )
}
