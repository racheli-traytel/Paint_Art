"use client"
import { MotionBox, MotionTypography, SectionTitle } from "../shared/styled-components"
import { containerVariants, titleVariants, fadeInUp } from "../shared/animations"

export default function HeaderSection() {
  return (
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
            pointerEvents: "none",
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
  )
}
