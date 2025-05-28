export interface ArtFormData {
  title: string
  description: string
  category: number
}

export interface FileData {
  file: File | null
  fileName: string
  fileSize: string
  imagePreview: string | null
}

export interface UploadState {
  isUploading: boolean
  progress: number
  uploadComplete: boolean
}
