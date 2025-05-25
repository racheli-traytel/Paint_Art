"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Card, CardContent, Button, Avatar, Rating, Chip, Fade, Grow } from "@mui/material"
import { Star, Upload, Palette, Image as ImageIcon, Share, FormatQuote } from "@mui/icons-material"
import { keyframes } from "@mui/system"

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(106, 90, 205, 0.3); }
  50% { box-shadow: 0 0 40px rgba(106, 90, 205, 0.6); }
`

export function FeatureCards() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Star,
      title: "דירוג ציורים",
      description: "דרגו את הציורים האהובים עליכם, שתפו עם חברים ומשפחה וגלו את הציורים הפופולריים ביותר בקהילה",
      buttonText: "לציורים הפופולריים",
      gradient: "linear-gradient(45deg, #ffc107 0%, #ff9800 100%)",
      bgGradient: "linear-gradient(145deg, #fff8e1 0%, #ffecb3 100%)",
    },
    {
      icon: Upload,
      title: "העלאת תמונה אישית",
      description: "העלו תמונה משלכם והמערכת תהפוך אותה לדף צביעה מותאם אישית באמצעות טכנולוגיה מתקדמת",
      buttonText: "העלאת תמונה",
      gradient: "linear-gradient(45deg, #2196f3 0%, #1976d2 100%)",
      bgGradient: "linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)",
    },
    {
      icon: Palette,
      title: "צביעה בהנחיית AI",
      description: "בחרו ציור וצבעו אותו עם הדרכה חכמה של בינה מלאכותית שתנחה אתכם לתוצאות מרהיבות",
      buttonText: "התחברות לצביעה עם AI",
      gradient: "linear-gradient(45deg, #e91e63 0%, #c2185b 100%)",
      bgGradient: "linear-gradient(145deg, #fce4ec 0%, #f8bbd9 100%)",
    },
    {
      icon: ImageIcon,
      title: "העלאת ציורים לגלריה",
      description: "שתפו את הציורים המקוריים שיצרתם עם הקהילה, קבלו משוב והשראה ממשתמשים אחרים",
      buttonText: "העלאת ציורים",
      gradient: "linear-gradient(45deg, #00bcd4 0%, #0097a7 100%)",
      bgGradient: "linear-gradient(145deg, #e0f2f1 0%, #b2dfdb 100%)",
    },
    {
      icon: Share,
      title: "שיתוף ציורים",
      description: "שתפו את היצירות הצבועות שלכם ברשתות החברתיות, שלחו לחברים או הדפיסו לקישוט הבית",
      buttonText: "שיתוף ציורים",
      gradient: "linear-gradient(45deg, #4caf50 0%, #388e3c 100%)",
      bgGradient: "linear-gradient(145deg, #e8f5e8 0%, #c8e6c9 100%)",
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

  if (!mounted) return null

  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f0f9ff' fillOpacity='0.3'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          animation: `${float} 20s linear infinite`,
        },
      }}
      dir="rtl"
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              background: "linear-gradient(45deg, #2d3748 0%, #4a5568 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -16,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 4,
                background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
                borderRadius: 2,
              },
            }}
          >
            מה אפשר לעשות ב-PaintArt?
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
            גלו עולם של יצירתיות ואמנות דיגיטלית עם הכלים המתקדמים שלנו
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 4,
            mb: 10,
          }}
        >
          {features.map((feature, index) => (
            <Grow key={index} in={mounted} timeout={500 + index * 200}>
              <Card
                sx={{
                  height: "100%",
                  background: feature.bgGradient,
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    "& .feature-icon": {
                      animation: `${pulse} 2s infinite`,
                    },
                    "& .feature-button": {
                      transform: "scale(1.05)",
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: feature.gradient,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::before": {
                    opacity: 0.1,
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center", position: "relative", zIndex: 1 }}>
                  {/* Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      background: feature.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      mb: 3,
                      position: "relative",
                      animation: `${float} 6s ease-in-out infinite`,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: -4,
                        borderRadius: "50%",
                        background: feature.gradient,
                        opacity: 0,
                        filter: "blur(8px)",
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover::before": {
                        opacity: 0.6,
                        animation: `${glow} 2s ease-in-out infinite`,
                      },
                    }}
                  >
                    <feature.icon sx={{ fontSize: 45, color: "white" }} />
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#2d3748",
                      mb: 2,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>

                  {feature.buttonText && (
                    <Button
                      className="feature-button"
                      variant="contained"
                      size="large"
                      sx={{
                        background: feature.gradient,
                        color: "white",
                        borderRadius: 6,
                        px: 3,
                        py: 1.5,
                        fontWeight: "bold",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
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
                        "&:hover": {
                          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                        },
                        "&:hover::before": {
                          left: "100%",
                        },
                      }}
                    >
                      {feature.buttonText}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* Testimonials */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: "bold",
              color: "#2d3748",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 4,
                background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
                borderRadius: 2,
              },
            }}
          >
            מה המשתמשים שלנו אומרים
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
              gap: 3,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Grow key={index} in={mounted} timeout={1000 + index * 200}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                      borderColor: "rgba(106, 90, 205, 0.3)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "right" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
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
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip
                            label={`גיל ${testimonial.age}`}
                            size="small"
                            sx={{
                              background: "rgba(106, 90, 205, 0.1)",
                              color: "#6a5acd",
                              fontSize: "0.75rem",
                            }}
                          />
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {testimonial.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ position: "relative", mb: 2 }}>
                      <FormatQuote
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: -5,
                          fontSize: 30,
                          color: "rgba(106, 90, 205, 0.3)",
                          transform: "rotate(180deg)",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
                          lineHeight: 1.6,
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
                  </CardContent>
                </Card>
              </Grow>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Fade in={mounted} timeout={2000}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "#2d3748" }}>
              מוכנים להתחיל ליצור?
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #6a5acd, #ff9f43)",
                color: "white",
                px: 6,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: 6,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transition: "left 0.7s",
                },
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 40px rgba(106, 90, 205, 0.4)",
                  animation: `${glow} 2s ease-in-out infinite`,
                },
                "&:hover::before": {
                  left: "100%",
                },
              }}
            >
              התחילו עכשיו בחינם
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}
