"use client"

import type React from "react"
import { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import { Link, Outlet, useLocation } from "react-router-dom"
import UserAvatar from "./Avatar"
import Footeri from "./Footeri"
import ChatBox from "./ChatBox"
import ChatIcon from "@mui/icons-material/Chat"
import Tooltip from "@mui/material/Tooltip"
import { styled, Box, Fab, Typography } from "@mui/material"
import { keyframes } from "@mui/system"

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 140, 0, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(255, 140, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 140, 0, 0); }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`

const fadeOut = keyframes`
  0% { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
  100% { 
    opacity: 0; 
    transform: scale(0.8) translateY(20px); 
  }
`

const fadeIn = keyframes`
  0% { 
    opacity: 0; 
    transform: scale(0.8) translateY(20px); 
  }
  100% { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
`

// Styled speech bubble container
const SpeechBubbleContainer = styled(Box)<{ isVisible: boolean }>(({  isVisible }) => ({
  position: "fixed",
  bottom: 30,
  left: 30,
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 12,
  opacity: isVisible ? 1 : 0,
  visibility: isVisible ? "visible" : "hidden",
  animation: isVisible ? `${fadeIn} 0.5s ease-out` : `${fadeOut} 0.3s ease-in`,
  transition: "all 0.3s ease",
}))

// Speech bubble for text
const SpeechBubble = styled(Box)(({  }) => ({
  background: "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)",
  color: "white",
  padding: "12px 16px",
  borderRadius: "20px 20px 20px 4px",
  position: "relative",
  maxWidth: 200,
  boxShadow: "0 8px 25px rgba(255, 140, 0, 0.3)",
  animation: `${float} 3s ease-in-out infinite`,
  border: "2px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(10px)",

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 15,
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "10px solid #FF8C00",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "20px 20px 20px 4px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
    pointerEvents: "none",
  },
}))

// Floating action button
const ChatFab = styled(Fab)(({ theme }) => ({
  width: 70,
  height: 70,
  background: "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)",
  color: "white",
  border: "3px solid rgba(255, 255, 255, 0.4)",
  boxShadow: "0 8px 25px rgba(255, 140, 0, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  animation: `${pulse} 2s infinite`,
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
    pointerEvents: "none",
  },

  "&:hover": {
    transform: "scale(1.1)",
    background: "linear-gradient(45deg, #FFA500 30%, #FF8C00 90%)",
    boxShadow: "0 12px 35px rgba(255, 140, 0, 0.6)",
    animation: `${bounce} 0.6s ease`,

    "& .chat-icon": {
      transform: "scale(1.2) rotate(10deg)",
    },
  },

  "&:active": {
    transform: "scale(0.95)",
  },

  // Responsive design
  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
    bottom: 20,
    left: 20,
  },
}))

// Chat icon with animation
const AnimatedChatIcon = styled(ChatIcon)(({  }) => ({
  fontSize: 32,
  transition: "all 0.3s ease",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
}))

// Notification dot
const NotificationDot = styled(Box)(({  }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  width: 16,
  height: 16,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ff4757, #ff3838)",
  border: "2px solid white",
  animation: `${bounce} 1s infinite`,
  boxShadow: "0 2px 8px rgba(255, 71, 87, 0.4)",
}))

const Layout: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "null")
  const location = useLocation()
  const isPersonalArea = location.pathname.includes("personal-area")

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showBubbleText, setShowBubbleText] = useState(true)
  const [hasNewMessage] = useState(true) // Mock new message indicator

  // Chat functions
  const handleOpenChat = () => {
    setIsChatOpen(true)
    setShowBubbleText(false)
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
    // Show bubble text again after a delay
    setTimeout(() => setShowBubbleText(true), 1000)
  }

  return (
    <div style={{ width: "100%" }}>
      <AppBar
        position="fixed"
        sx={{
          background: "#6a5acd",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {user && user.id ? (
              <>
                <UserAvatar />
                {isPersonalArea ? (
                  <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    ליציאה
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to="/personal-area"
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    לאזור האישי
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff8c00",
                    color: "white",
                    borderRadius: "20px",
                    marginRight: "10px",
                    "&:hover": { backgroundColor: "#e67e00" },
                  }}
                >
                  הרשמה
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  התחברות
                </Button>
              </>
            )}
          </div>
          <img src={`/pictures/LogoPaintArt.png?${Date.now()}`} style={{ width: "75px" }} alt="PaintArt Logo" />
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <div style={{ marginTop: "80px", width: "100%" }}>
        <Outlet />
        {isChatOpen && <ChatBox onClose={handleCloseChat} />}
        <Footeri />
      </div>

      {/* Floating Chat Button - Only show when chat is closed */}
      <SpeechBubbleContainer isVisible={!isChatOpen}>
        {/* Speech bubble text */}
        {showBubbleText && (
          <SpeechBubble>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "center",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              שלום! 👋
              <br />
              אני מיכל, מומחית האמנות
              <br />
              איך אוכל לעזור?
            </Typography>
          </SpeechBubble>
        )}

        {/* Floating action button */}
        <Tooltip
          title="צ'אט עם מיכל - מומחית האמנות"
          placement="right"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "rgba(0, 0, 0, 0.8)",
                color: "white",
                fontSize: "0.75rem",
                borderRadius: 2,
                backdropFilter: "blur(10px)",
              },
            },
          }}
        >
          <ChatFab onClick={handleOpenChat} aria-label="פתח צ'אט">
            {hasNewMessage && <NotificationDot />}
            <AnimatedChatIcon className="chat-icon" />
          </ChatFab>
        </Tooltip>
      </SpeechBubbleContainer>
    </div>
  )
}

export default Layout
