"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, AccordionSummary, AccordionDetails } from "@mui/material"
import { Help, ExpandMore } from "@mui/icons-material"
import { MotionBox, MotionTypography, SectionTitle, FAQAccordion } from "../shared/styled-components"
import { containerVariants, titleVariants, fadeInUp, faqVariants } from "../shared/animations"
import type { FAQ } from "../types"

const faqData: FAQ[] = [
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

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | false>(false)

  const handleFAQChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFAQ(isExpanded ? panel : false)
  }

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      variants={containerVariants}
      sx={{ maxWidth: 800, mx: "auto" }}
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Help sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        <SectionTitle
          variant="h3"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
        >
          שאלות נפוצות
        </SectionTitle>
        <MotionTypography
          variant="h6"
          color="text.secondary"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
        >
          מצאו תשובות לשאלות הנפוצות ביותר על PaintArt
        </MotionTypography>
      </Box>

      {faqData.map((faq, index) => (
        <FAQAccordion
          key={faq.id}
          expanded={expandedFAQ === faq.id}
          onChange={handleFAQChange(faq.id)}
          variants={faqVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          custom={index}
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              "& .MuiAccordionSummary-content": {
                justifyContent: "flex-start",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "left" }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ lineHeight: 1.8, textAlign: "left" }}>{faq.answer}</Typography>
          </AccordionDetails>
        </FAQAccordion>
      ))}
    </MotionBox>
  )
}
