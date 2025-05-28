import type React from "react"
export interface Drawing {
  id: number
  name: string
  imageUrl: string
}

export interface ShareDialogProps {
  open: boolean
  onClose: () => void
  userId: number
}

export interface EmailData {
  to: string
  subject: string
  body: string
  senderName: string
  imageUrl: string
  templateType: string
}

export interface SharePlatform {
  name: string
  icon: React.ReactNode
  color: string
  hoverColor: string
  tooltip: string
}
