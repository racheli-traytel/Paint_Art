import React from "react";
import { Avatar, Stack, Typography, Box } from "@mui/material";
import { orange, deepOrange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

// Styled components for enhanced visual appeal
const StyledAvatar = styled(Avatar)(({  }) => ({
  background: `linear-gradient(135deg, ${orange[500]} 0%, ${deepOrange[600]} 100%)`,
  width: 48,
  height: 48,
  fontSize: '1.2rem',
  fontWeight: 700,
  letterSpacing: '0.5px',
  boxShadow: `
    0 4px 12px rgba(255, 152, 0, 0.25),
    0 2px 4px rgba(255, 152, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  border: '2px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  
  '&:hover': {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: `
      0 8px 25px rgba(255, 152, 0, 0.35),
      0 4px 8px rgba(255, 152, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.3)
    `,
  }
}));

const UserContainer = styled(Stack)(({  }) => ({
  position: 'relative',
  padding: '8px 16px 8px 8px',
  borderRadius: '24px',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 87, 34, 0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  
  '&:hover': {
    transform: 'translateY(-1px)',
    border: '1px solid rgba(255, 152, 0, 0.2)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    
    '&::before': {
      opacity: 1,
    }
  }
}));

const UserName = styled(Typography)(({  }) => ({
  fontWeight: 600,
  color: '#ffffff',
  fontSize: '1rem',
  lineHeight: 1.4,
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    color: '#fff8f0',
  }
}));

const OnlineIndicator = styled(Box)(({  }) => ({
  position: 'absolute',
  bottom: 2,
  right: 2,
  width: 14,
  height: 14,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
  border: '2px solid #ffffff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#ffffff',
    animation: 'pulse 2s infinite',
  },
  
  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  }
}));

const UserAvatar: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  
  const getInitials = (firstName?: string, lastName?: string): string => {
    const first = (firstName || "").trim();
    const last = (lastName || "").trim();
    
    if (!first && !last) return "??";
    if (!last) return first[0]?.toUpperCase() || "?";
    
    return `${first[0]?.toUpperCase() || ""}${last[0]?.toUpperCase() || ""}`;
  };

  const getFullName = (firstName?: string, lastName?: string): string => {
    const first = (firstName || "").trim();
    const last = (lastName || "").trim();
    
    if (!first && !last) return "Guest User";
    if (!last) return first;
    
    return `${first} ${last}`;
  };

  return (
    <UserContainer direction="row" spacing={1.5} alignItems="center">
      <Box position="relative">
        <StyledAvatar>
          {getInitials(user?.firstName, user?.lastName)}
        </StyledAvatar>
        <OnlineIndicator />
      </Box>
      <Box>
        <UserName variant="body1">
          {getFullName(user?.firstName, user?.lastName)}
        </UserName>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: '0.75rem',
            fontWeight: 400,
            display: 'block',
            lineHeight: 1.2
          }}
        >
          Online
        </Typography>
      </Box>
    </UserContainer>
  );
};

export default UserAvatar;