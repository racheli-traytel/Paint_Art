"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Card, CardContent, Button, Avatar, Rating, Chip, Fade, Grow } from "@mui/material"
import { Star, Upload, Palette, Image as ImageIcon, Share, FormatQuote } from "@mui/icons-material"
import { keyframes } from "@mui/system"

const morphCard = keyframes`
  0%, 100% { 
    border-radius: 25px;
    transform: scale(1) rotate(0deg);
  }
  25% { 
    border-radius: 15px 35px 15px 35px;
    transform: scale(1.02) rotate(1deg);
  }
  50% { 
    border-radius: 35px 15px 35px 15px;
    transform: scale(0.98) rotate(-0.5deg);
  }
  75% { 
    border-radius: 20px 30px 20px 30px;
    transform: scale(1.01) rotate(0.5deg);
  }
`

const floatIcon = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  25% { 
    transform: translateY(-10px) rotate(90deg) scale(1.1);
  }
  50% { 
    transform: translateY(-5px) rotate(180deg) scale(0.95);
  }
  75% { 
    transform: translateY(-15px) rotate(270deg) scale(1.05);
  }
`

const liquidBackground = keyframes`
  0%, 100% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  25% { 
    background-position: 100% 0%;
    filter: hue-rotate(90deg);
  }
  50% { 
    background-position: 100% 100%;
    filter: hue-rotate(180deg);
  }
  75% { 
    background-position: 0% 100%;
    filter: hue-rotate(270deg);
  }
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
      gradient: "linear-gradient(135deg, #FFD700 0%, #FF8C69 100%)",
      bgGradient: "linear-gradient(145deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 140, 105, 0.1) 100%)",
    },
    {
      icon: Upload,
      title: "העלאת תמונה אישית",
      description: "העלו תמונה משלכם והמערכת תהפוך אותה לדף צביעה מותאם אישית באמצעות טכנולוגיה מתקדמת",
      buttonText: "העלאת תמונה",
      gradient: "linear-gradient(135deg, #90EE90 0%, #FFD700 100%)",
      bgGradient: "linear-gradient(145deg, rgba(144, 238, 144, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)",
    },
    {
      icon: Palette,
      title: "צביעה בהנחיית AI",
      description: "בחרו ציור וצבעו אותו עם הדרכה חכמה של בינה מלאכותית שתנחה אתכם לתוצאות מרהיבות",
      buttonText: "התחברות לצביעה עם AI",
      gradient: "linear-gradient(135deg, #FF8C69 0%, #90EE90 100%)",
      bgGradient: "linear-gradient(145deg, rgba(255, 140, 105, 0.1) 0%, rgba(144, 238, 144, 0.1) 100%)",
    },
    {
      icon: ImageIcon,
      title: "העלאת ציורים לגלריה",
      description: "שתפו את הציורים המקוריים שיצרתם עם הקהילה, קבלו משוב והשראה ממשתמשים אחרים",
      buttonText: "העלאת ציורים",
      gradient: "linear-gradient(135deg, #FFD700 0%, #90EE90 100%)",
      bgGradient: "linear-gradient(145deg, rgba(255, 215, 0, 0.1) 0%, rgba(144, 238, 144, 0.1) 100%)",
    },
    {
      icon: Share,
      title: "שיתוף ציורים",
      description: "שתפו את היצירות הצבועות שלכם ברשתות החברתיות, שלחו לחברים או הדפיסו לקישוט הבית",
      buttonText: "שיתוף ציורים",
      gradient: "linear-gradient(135deg, #90EE90 0%, #FF8C69 100%)",
      bgGradient: "linear-gradient(145deg, rgba(144, 238, 144, 0.1) 0%, rgba(255, 140, 105, 0.1) 100%)",
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
        py: 15,
        background: `
          linear-gradient(135deg, 
            rgba(255, 215, 0, 0.05) 0%, 
            rgba(255, 140, 105, 0.05) 25%,
            rgba(144, 238, 144, 0.05) 50%,
            rgba(255, 215, 0, 0.05) 75%,
            rgba(255, 140, 105, 0.05) 100%
          )
        `,
        backgroundSize: "400% 400%",
        animation: `${liquidBackground} 20s ease-in-out infinite`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 140, 105, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(144, 238, 144, 0.1) 0%, transparent 50%)
          `,
          animation: `${keyframes`
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          `} 30s linear infinite`,
        },
      }}
      dir="rtl"
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Enhanced Header */}
        <Box sx={{ textAlign: "center", mb: 12 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 4,
              background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90, #FFD700)",
              backgroundSize: "400% 400%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: `${liquidBackground} 8s ease-in-out infinite`,
              position: "relative",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 6,
                background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
                borderRadius: 3,
                animation: `${keyframes`
                  0% { width: 120px; }
                  50% { width: 200px; }
                  100% { width: 120px; }
                `} 4s ease infinite`,
              },
            }}
          >
            מה אפשר לעשות ב-PaintArt?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
              fontWeight: 500,
            }}
          >
            גלו עולם של יצירתיות ואמנות דיגיטלית עם הכלים המתקדמים שלנו
          </Typography>
        </Box>

        {/* Enhanced Features Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 5,
            mb: 15,
          }}
        >
          {features.map((feature, index) => (
            <Grow key={index} in={mounted} timeout={800 + index * 300}>
              <Card
                sx={{
                  height: "100%",
                  background: feature.bgGradient,
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: 6,
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-20px) scale(1.05) rotate(2deg)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
                    animation: `${morphCard} 3s ease infinite`,
                    "& .feature-icon": {
                      animation: `${floatIcon} 2s ease infinite`,
                    },
                    "& .feature-button": {
                      transform: "scale(1.1) rotate(-2deg)",
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
                    opacity: 0.15,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: `
                      repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(255, 255, 255, 0.03) 10px,
                        rgba(255, 255, 255, 0.03) 20px
                      )
                    `,
                    animation: `${keyframes`
                      0% { transform: translateX(-100px) translateY(-100px); }
                      100% { transform: translateX(100px) translateY(100px); }
                    `} 15s linear infinite`,
                  },
                }}
              >
                <CardContent sx={{ p: 5, textAlign: "center", position: "relative", zIndex: 1 }}>
                  {/* Enhanced Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: feature.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      mb: 4,
                      position: "relative",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: -8,
                        borderRadius: "50%",
                        background: feature.gradient,
                        opacity: 0,
                        filter: "blur(15px)",
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover::before": {
                        opacity: 0.8,
                        animation: `${keyframes`
                          0%, 100% { transform: scale(1); }
                          50% { transform: scale(1.2); }
                        `} 2s ease-in-out infinite`,
                      },
                    }}
                  >
                    <feature.icon sx={{ fontSize: 60, color: "white" }} />
                  </Box>

                  {/* Enhanced Content */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "#2d3748",
                      mb: 3,
                      transition: "all 0.3s ease",
                      fontSize: "1.5rem",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mb: 4,
                      lineHeight: 1.7,
                      fontSize: "1rem",
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
                        borderRadius: 8,
                        px: 4,
                        py: 2,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.4s ease",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                          transition: "left 0.6s",
                        },
                        "&:hover": {
                          boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
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

        {/* Enhanced Testimonials */}
        <Box sx={{ mb: 12 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 8,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              fontSize: { xs: "2rem", md: "2.5rem" },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -16,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 4,
                background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
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
              gap: 4,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Grow key={index} in={mounted} timeout={1200 + index * 250}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(15px)",
                    border: "2px solid rgba(255, 215, 0, 0.2)",
                    borderRadius: 4,
                    transition: "all 0.4s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-12px) rotate(1deg)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                      borderColor: "rgba(255, 215, 0, 0.4)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: "linear-gradient(90deg, #FFD700, #FF8C69, #90EE90)",
                      backgroundSize: "200% 100%",
                      animation: `${keyframes`
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                      `} 3s ease infinite`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "right" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar
                        sx={{
                          background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
                          width: 60,
                          height: 60,
                          mr: 2,
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          boxShadow: "0 8px 25px rgba(255, 215, 0, 0.3)",
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
                              background: "linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 105, 0.2))",
                              color: "#333",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          />
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                            {testimonial.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ position: "relative", mb: 3 }}>
                      <FormatQuote
                        sx={{
                          position: "absolute",
                          top: -15,
                          right: -10,
                          fontSize: 40,
                          color: "rgba(255, 215, 0, 0.3)",
                          transform: "rotate(180deg)",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
                          lineHeight: 1.7,
                          pr: 3,
                          fontSize: "0.95rem",
                          color: "#555",
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
                          color: "#FFD700",
                          filter: "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))",
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grow>
            ))}
          </Box>
        </Box>

        {/* Enhanced Call to Action */}
        <Fade in={mounted} timeout={2500}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 6,
                background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              מוכנים להתחיל ליצור?
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #FFD700, #FF8C69, #90EE90)",
                color: "white",
                px: 8,
                py: 3,
                fontSize: "1.3rem",
                fontWeight: "bold",
                borderRadius: 8,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s ease",
                boxShadow: "0 15px 40px rgba(255, 215, 0, 0.3)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transition: "left 0.8s",
                },
                "&:hover": {
                  transform: "scale(1.08) rotate(2deg)",
                  boxShadow: "0 20px 60px rgba(255, 215, 0, 0.5)",
                  animation: `${keyframes`
                    0%, 100% { filter: brightness(1); }
                    50% { filter: brightness(1.2); }
                  `} 2s ease-in-out infinite`,
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
