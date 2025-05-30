"use client"

import { Grid, CardContent, CardActions, Typography } from "@mui/material"
import { Star, Upload, Palette, Image, Share } from "@mui/icons-material"
import { MotionBox, MotionCard, GradientButton, IconContainer } from "../shared/styled-components"
import {
  containerVariants,
  itemVariants,
  iconContainerVariants,
  floatingAnimation,
  buttonVariants,
} from "../shared/animations"
import type { Feature } from "../types"

const features: Feature[] = [
  {
    icon: Star,
    title: "דירוג ציורים",
    description: "דרגו את הציורים האהובים עליכם, שתפו עם חברים ומשפחה וגלו את הציורים הפופולריים ביותר בקהילה",
    buttonText: "לציורים הפופולריים",
    color: "#ffc107",
    gradient: "linear-gradient(45deg, #ffc107 0%, #ff9800 100%)",
    bgcolor: "linear-gradient(45deg, #ffc107 0%, #ff9800 100%)",
    link: "/popular",
    showButton: true,
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
    showButton: true,
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
    showButton: true,
  },
  {
    icon: Image,
    title: "העלאת ציורים לגלריה",
    description: "שתפו את הציורים המקוריים שיצרתם עם הקהילה, קבלו משוב והשראה ממשתמשים אחרים",
    buttonText: "עבור לכלי",
    color: "#00bcd4",
    gradient: "linear-gradient(45deg, #00bcd4 0%, #0097a7 100%)",
    bgcolor: "linear-gradient(45deg, #00bcd4 0%, #0097a7 100%)",
    link: "/gallery",
    showButton: false,
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
    showButton: false,
  },
]

interface FeatureCardsProps {
  onNavigate: (link: string) => void
}

export default function FeatureCards({ onNavigate }: FeatureCardsProps) {
  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      variants={containerVariants}
      sx={{ mb: 8 }}
    >
      <Grid container spacing={4}>
        {features.map((feature, index) => (
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
                  overflow: "visible",
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
                    pointerEvents: "none",
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

                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#2d3748", textAlign: "left" }}>
                    {feature.title}
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, textAlign: "left" }}>
                    {feature.description}
                  </Typography>
                </CardContent>

                {feature.showButton && (
                  <CardActions sx={{ p: 3, justifyContent: "center", position: "relative", zIndex: 10 }}>
                    <GradientButton
                      sx={{
                        background: feature.gradient,
                        position: "relative",
                        zIndex: 20,
                        pointerEvents: "auto",
                      }}
                      size="large"
                      onClick={() => onNavigate(feature.link)}
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
                )}
              </MotionCard>
            </MotionBox>
          </Grid>
        ))}
      </Grid>
    </MotionBox>
  )
}
