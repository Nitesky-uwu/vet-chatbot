'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! 🐾 I am DocDog 🐶. Let’s book your pet appointment step by step!' }
  ])
  const [currentStep, setCurrentStep] = useState(0)
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

    setMessages(prev => [...prev, { from: 'user', text: inputValue }])

    let nextStep = currentStep + 1
    if (currentStep === 0) setFormData(prev => ({ ...prev, petName: inputValue }))
    if (currentStep === 1) setFormData(prev => ({ ...prev, ownerName: inputValue }))
    if (currentStep === 2) setFormData(prev => ({ ...prev, date: inputValue }))
    if (currentStep === 3) setFormData(prev => ({ ...prev, time: inputValue }))

    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      let botReply = ''
      if (nextStep === 1) botReply = `Awesome! And what is the owner's name?`
      else if (nextStep === 2) botReply = `Thanks! Please select the appointment date.`
      else if (nextStep === 3) botReply = `Great! Now choose a time slot.`
      else if (nextStep === 4) {
        botReply = `All done! 🐾 Here’s your appointment summary:\nPet: ${formData.petName}\nOwner: ${formData.ownerName}\nDate: ${formData.date}\nTime: ${formData.time}\nDocDog 🐶 will contact you soon!`
      }

      setMessages(prev => [...prev, { from: 'bot', text: botReply }])
      setCurrentStep(nextStep)
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-pink-500 text-white p-4 rounded-t-2xl font-bold text-lg flex items-center gap-2">
          🐶 DocDog
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-t from-green-50 to-blue-50">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl max-w-[75%] break-words ${
                msg.from === 'bot'
                  ? 'bg-gradient-to-r from-green-200 to-green-300 self-start'
                  : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white self-end'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <div className="text-sm text-gray-600 italic">DocDog is typing...</div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t bg-white">
          {currentStep === 2 ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="date"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                required
              />
              <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : currentStep === 3 ? (
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
              <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : currentStep < 2 ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your answer..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                required
              />
              <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
                }
