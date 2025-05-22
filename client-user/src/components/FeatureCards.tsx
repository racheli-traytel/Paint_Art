import React from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  styled,
  SvgIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Styled components
const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  backgroundColor: 'white',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: '#f5f6fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const FeatureCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  textAlign: 'right',
  direction: 'rtl',
}));

const FeatureCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3),
  justifyContent: 'center',
}));

const FeatureButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff9f43',
  color: 'white',
  borderRadius: theme.spacing(5),
  padding: theme.spacing(1, 3),
  '&:hover': {
    backgroundColor: '#f39200',
  },
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1.5),
}));

// Star Icon Component
const StarIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </SvgIcon>
);

// Upload Icon Component
const UploadIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
  </SvgIcon>
);

// AI Coloring Guide Icon Component
const AiColoringIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </SvgIcon>
);

// Gallery Upload Icon Component
const GalleryUploadIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5zM12 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm5-3H7v1h10V4z" />
  </SvgIcon>
);

// Share Icon Component
const ShareIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z" />
  </SvgIcon>
);

// Feature Cards Component
const FeatureCards: React.FC = () => {
    const navigate = useNavigate();

    const handlePopularDrawingsClick = () => {
      navigate('/popular');
    };
    
    const handleUploadImageClick = () => {
      navigate('/coloring-page-converter');
    };
    
    const handleAiColoringClick = () => {
      navigate('/login');
    };
    
  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f7fa' }}>
      <Container maxWidth="xl">
        <Typography variant="h1" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}>
          מה אפשר לעשות ב-PaintArt?
        </Typography>
        
        {/* First row - 3 cards */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Rating Pictures Card */}
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <StarIcon sx={{ color: '#ffc107', fontSize: 40 }} />
              </IconContainer>
              <FeatureCardContent>
                <FeatureTitle variant="h5" sx={{ textAlign: 'left' }}>
                  דירוג ציורים
                </FeatureTitle>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  דרגו את הציורים האהובים עליכם, שתפו עם חברים ומשפחה וגלו את הציורים הפופולריים ביותר בקהילה
                </Typography>
              </FeatureCardContent>
              <FeatureCardActions>
                <FeatureButton onClick={handlePopularDrawingsClick}>
                  לציורים הפופולריים
                </FeatureButton>
              </FeatureCardActions>
            </FeatureCard>
          </Grid>

          {/* Upload Your Own Image Card */}
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <UploadIcon sx={{ color: '#3f51b5', fontSize: 40 }} />
              </IconContainer>
              <FeatureCardContent>
                <FeatureTitle variant="h5" sx={{ textAlign: 'left' }}>
                  העלאת תמונה אישית
                </FeatureTitle>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  העלו תמונה משלכם והמערכת תהפוך אותה לדף צביעה מותאם אישית באמצעות טכנולוגיה מתקדמת
                </Typography>
              </FeatureCardContent>
              <FeatureCardActions>
                <FeatureButton onClick={handleUploadImageClick}>
                  העלאת תמונה
                </FeatureButton>
              </FeatureCardActions>
            </FeatureCard>
          </Grid>

          {/* AI Coloring Guide Card */}
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <AiColoringIcon sx={{ color: '#e91e63', fontSize: 40 }} />
              </IconContainer>
              <FeatureCardContent>
                <FeatureTitle variant="h5" sx={{ textAlign: 'left' }}>
                  צביעה בהנחיית AI
                </FeatureTitle>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  בחרו ציור וצבעו אותו עם הדרכה חכמה של בינה מלאכותית שתנחה אתכם לתוצאות מרהיבות
                </Typography>
              </FeatureCardContent>
              <FeatureCardActions>
                <FeatureButton onClick={handleAiColoringClick}>
                  לצביעה עם AI יש להתחבר
                </FeatureButton>
              </FeatureCardActions>
            </FeatureCard>
          </Grid>
        </Grid>

        {/* Second row - 2 cards centered */}
        <Grid container spacing={4} justifyContent="center">
          {/* Upload Drawings to Gallery Card */}
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <GalleryUploadIcon sx={{ color: '#00bcd4', fontSize: 40 }} />
              </IconContainer>
              <FeatureCardContent>
                <FeatureTitle variant="h5" sx={{ textAlign: 'left' }}>
                  העלאת ציורים לגלריה
                </FeatureTitle>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  שתפו את הציורים המקוריים שיצרתם עם הקהילה, קבלו משוב והשראה ממשתמשים אחרים
                </Typography>
              </FeatureCardContent>
            </FeatureCard>
          </Grid>

          {/* Share Drawings Card */}
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <ShareIcon sx={{ color: '#4caf50', fontSize: 40 }} />
              </IconContainer>
              <FeatureCardContent>
                <FeatureTitle variant="h5" sx={{ textAlign: 'left' }}>
                  שיתוף ציורים
                </FeatureTitle>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  שתפו את היצירות הצבועות שלכם ברשתות החברתיות, שלחו לחברים או הדפיסו לקישוט הבית
                </Typography>
              </FeatureCardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureCards;