'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! 🐾 I am your Vet Assistant. Let’s book an appointment step by step.' }
  ])
  const [currentStep, setCurrentStep] = useState(0) // 0: pet name, 1: owner name, 2: date, 3: time, 4: confirm
  const [inputValue, setInputValue] = useState('')
  const [formData, setFormData] = useState({
    petName: '',
    ownerName: '',
    date: '',
    time: ''
  })
  const [isTyping, setIsTyping] = useState(false)

  const timeOptions = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue) return

    // Add user message
    setMessages(prev => [...prev, { from: 'user', text: inputValue }])

    // Save data based on step
    let nextStep = currentStep + 1
    if (currentStep === 0) setFormData(prev => ({ ...prev, petName: inputValue }))
    if (currentStep === 1) setFormData(prev => ({ ...prev, ownerName: inputValue }))
    if (currentStep === 2) setFormData(prev => ({ ...prev, date: inputValue }))
    if (currentStep === 3) setFormData(prev => ({ ...prev, time: inputValue }))

    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      let botReply = ''
      if (nextStep === 1) botReply = `Great! And what is the owner's name?`
      else if (nextStep === 2) botReply = `Got it. Please select the appointment date.`
      else if (nextStep === 3) botReply = `Perfect. Now choose a time slot.`
      else if (nextStep === 4) {
        botReply = `All set! 🐾 Here’s the summary:\nPet: ${formData.petName}\nOwner: ${formData.ownerName}\nDate: ${formData.date}\nTime: ${formData.time}\nWe will contact you shortly.`
      }

      setMessages(prev => [...prev, { from: 'bot', text: botReply }])
      setCurrentStep(nextStep)
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t-2xl font-semibold text-lg">
          Vet ChatGPT
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg max-w-[80%] break-words ${
                msg.from === 'bot'
                  ? 'bg-gray-200 self-start'
                  : 'bg-gray-800 text-white self-end'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && <div className="text-sm text-gray-500">Bot is typing...</div>}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t bg-white">
          {currentStep === 2 ? (
            // Calendar input for date
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="date"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                required
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : currentStep === 3 ? (
            // Dropdown for time
            <form onSubmit={handleSubmit} className="flex gap-2">
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                required
              >
                <option value="">Select time</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : currentStep < 2 ? (
            // Text input for pet/owner name
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your answer..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                required
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
}
