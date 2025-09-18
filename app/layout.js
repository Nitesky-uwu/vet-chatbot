import './globals.css'

export const metadata = {
  title: 'DocDog Chatbot',
  description: 'Vet Appointment Chatbot',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}
