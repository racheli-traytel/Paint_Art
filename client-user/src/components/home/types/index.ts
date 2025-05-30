export interface Feature {
  icon: any
  title: string
  description: string
  buttonText: string
  color: string
  gradient: string
  bgcolor: string
  link: string
  showButton: boolean
}

export interface Testimonial {
  name: string
  age: number
  text: string
  rating: number
  avatar: string
  location: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}
