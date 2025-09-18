export const metadata = {
  title: 'Vet Chatbot',
  description: 'Veterinary chatbot with WhatsApp-like UI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
