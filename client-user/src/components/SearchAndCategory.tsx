// import React, { useState } from 'react';
// import CategoriesButtons from './CategoriesButtons';
// import SearchDrawings from './SearchDrawing';
// import { Box, Container, Typography } from '@mui/material';
// import FeatureCards from './FeatureCards';
// import DrawingList from './DrawingList';

// const SearchAndCategory: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [searchTerm, _setSearchTerm] = useState<string>('');
  
//   return (
//     <>
//       <Box sx={{ 
//         pt: 10, 
//         pb: 5, 
//         background: 'linear-gradient(135deg, #FFD700, #FF8C69, #90EE90, #FFB14C, #FFF700)',
//         backgroundSize: '200% 200%',
//         animation: 'gradient-shift 8s ease infinite',
//         width: '100%',
//         mt: 0,
//         textAlign: 'center',
//         '@keyframes gradient-shift': {
//           '0%': { backgroundPosition: '0% 50%' },
//           '50%': { backgroundPosition: '100% 50%' },
//           '100%': { backgroundPosition: '0% 50%' }
//         }
//       }}>
//         <Container maxWidth="lg">
//           <Typography variant="h3" sx={{ 
//             fontWeight: 'bold', 
//             color: '#333',
//             textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
//             mb: 1,
//             direction: 'rtl',
//             fontSize: { xs: '1.8rem', sm: '2.3rem', md: '2.5rem' }
//           }}>
//             ציורי צביעה מהנים לילדים
//           </Typography>
//           <Typography variant="body1" sx={{ 
//             color: '#333',
//             maxWidth: '800px',
//             mx: 'auto',
//             px: 2,
//             direction: 'rtl',
//             fontSize: { xs: '0.9rem', sm: '1rem' }
//           }}>
//             גלו מגוון רחב של דפי צביעה מקוריים, מודפסים ומהנים לילדים בכל הגילאים
//           </Typography>
//         </Container>
//       </Box>
      
//       <Container maxWidth="lg">
//         <Box sx={{ 
//           backgroundColor: 'white', 
//           maxWidth: '100%', 
//           mx: 'auto', 
//           borderRadius: '20px',
//           boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
//           mb: 5,
//           mt: -2,
//           overflow: 'hidden'
//         }}>
//           <SearchDrawings setSelectedCategory={setSelectedCategory} />
//           <CategoriesButtons setSelectedCategory={setSelectedCategory} />
//         </Box>
//       </Container>
//       <DrawingList selectedCategory={selectedCategory} searchTerm={searchTerm} />
//       <FeatureCards/> 
//     </>
//   );
// };

// export default SearchAndCategory;

import React, { useState } from 'react';
import CategoriesButtons from './CategoriesButtons';
import SearchDrawings from './SearchDrawing';
import { Box, Container, Typography } from '@mui/material';
import FeatureCards from './FeatureCards';
import DrawingList from './DrawingList';

const SearchAndCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, _setSearchTerm] = useState<string>('');
  
  return (
    <>
      {/* Hero Section with Enhanced Animation */}
      <Box sx={{ 
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 12 }, 
        pb: { xs: 6, md: 8 }, 
        background: `
          radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255, 140, 105, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(144, 238, 144, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #FFD700 0%, #FF8C69 25%, #90EE90 50%, #FFB14C 75%, #FFF700 100%)
        `,
        backgroundSize: '400% 400%',
        animation: 'gradient-wave 12s ease-in-out infinite',
        width: '100%',
        mt: 0,
        textAlign: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 20s linear infinite'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `
            radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'sparkle 25s linear infinite',
          pointerEvents: 'none'
        },
        '@keyframes gradient-wave': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' }
        },
        '@keyframes float': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(120deg)' },
          '66%': { transform: 'translateY(5px) rotate(240deg)' },
          '100%': { transform: 'translateY(0px) rotate(360deg)' }
        },
        '@keyframes sparkle': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Decorative Elements */}
          <Box sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            animation: 'bounce 3s ease-in-out infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' }
            }
          }} />
          
          <Box sx={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            animation: 'bounce 4s ease-in-out infinite 1s',
          }} />

          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              color: '#2c3e50',
              textShadow: '2px 2px 4px rgba(255,255,255,0.7)',
              mb: 2,
              direction: 'rtl',
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem', lg: '3.8rem' },
              background: 'linear-gradient(45deg, #2c3e50, #34495e, #2c3e50)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'text-shimmer 3s ease-in-out infinite',
              letterSpacing: '1px',
              lineHeight: 1.2,
              '@keyframes text-shimmer': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' }
              }
            }}
          >
            🎨 ציורי צביעה מהנים לילדים 🌈
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#34495e',
              maxWidth: '900px',
              mx: 'auto',
              px: 3,
              direction: 'rtl',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              fontWeight: 500,
              lineHeight: 1.6,
              textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '30px',
              py: 2,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              animation: 'fade-in 1s ease-out 0.5s both',
              '@keyframes fade-in': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            ✨ גלו מגוון רחב של דפי צביעה מקוריים ומהנים לילדים בכל הגילאים ✨
            <br />
            🖍️ הדפסה קלה • איכות גבוהה • בחינם לחלוטין 🖍️
          </Typography>
        </Container>
      </Box>
      
      {/* Search and Categories Section */}
      <Container maxWidth="lg">
        <Box sx={{ 
          backgroundColor: 'white', 
          maxWidth: '100%', 
          mx: 'auto', 
          borderRadius: '25px',
          boxShadow: `
            0 20px 40px rgba(0,0,0,0.1),
            0 0 0 1px rgba(255,255,255,0.5) inset
          `,
          mb: 6,
          mt: { xs: -3, md: -4 },
          overflow: 'hidden',
          position: 'relative',
          background: `
            linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)
          `,
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `
              0 25px 50px rgba(0,0,0,0.15),
              0 0 0 1px rgba(255,255,255,0.6) inset
            `
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #FFD700, #FF8C69, #90EE90, #FFB14C)',
            backgroundSize: '300% 100%',
            animation: 'border-flow 3s ease infinite'
          },
          '@keyframes border-flow': {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' }
          }
        }}>
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <SearchDrawings setSelectedCategory={setSelectedCategory} />
            <CategoriesButtons setSelectedCategory={setSelectedCategory} />
          </Box>
        </Box>
      </Container>

      {/* Content Sections with Staggered Animation */}
      <Box sx={{
        '& > *': {
          animation: 'slide-up 0.6s ease-out forwards',
          opacity: 0,
          transform: 'translateY(30px)'
        },
        '& > *:nth-of-type(1)': {
          animationDelay: '0.1s'
        },
        '& > *:nth-of-type(2)': {
          animationDelay: '0.2s'
        },
        '@keyframes slide-up': {
          'to': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}>
        <DrawingList selectedCategory={selectedCategory} searchTerm={searchTerm} />
        <FeatureCards/> 
      </Box>
    </>
  );
};

export default SearchAndCategory;