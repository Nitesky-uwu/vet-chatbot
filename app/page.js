'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! 🐶 I am DocDog. I will help you book a vet appointment.' }
  ])
  const [currentStep, setCurrentStep] = useState(0) // 0 = initial welcome
  const [inputValue, setInputValue] = useState('')
  const [formData, setFormData] = useState({
    petName: '',
    ownerName: '',
    date: '',
    time: ''
  })
  const [isTyping, setIsTyping] = useState(false)

  const timeOptions = [
    '09:00 AM','10:00 AM','11:00 AM','12:00 PM',
    '01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'
  ]

  // Automatically ask the first question after welcome
  useEffect(() => {
    if (currentStep === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { from: 'bot', text: "First, what is your pet's name?" }
        ])
        setCurrentStep(1) // Step 1 = pet name input
        setIsTyping(false)
      }, 1000)
    }
  }, [currentStep])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue) return

    setMessages(prev => [...prev, { from: 'user', text: inputValue }])

    let nextStep = currentStep + 1

    if (currentStep === 1) setFormData(prev => ({ ...prev, petName: inputValue }))
    if (currentStep === 2) setFormData(prev => ({ ...prev, ownerName: inputValue }))
    if (currentStep === 3) setFormData(prev => ({ ...prev, date: inputValue }))
    if (currentStep === 4) setFormData(prev => ({ ...prev, time: inputValue }))

    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      let botReply = ''
      if (nextStep === 2) botReply = "Great! And what is the owner's name?"
      else if (nextStep === 3) botReply = "Thanks! Please select the appointment date."
      else if (nextStep === 4) botReply = "Perfect! Now choose a time slot."
      else if (nextStep === 5) {
        botReply = `All done! 🐾 Here’s your appointment summary:\nPet: ${formData.petName}\nOwner: ${formData.ownerName}\nDate: ${formData.date}\nTime: ${formData.time}\nDocDog 🐶 will contact you soon!`
      }

      setMessages(prev => [...prev, { from: 'bot', text: botReply }])
      setCurrentStep(nextStep)
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-yellow-500 text-black p-4 rounded-t-2xl font-bold text-lg flex items-center gap-2">
          🐶 DocDog
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl max-w-[75%] break-words ${
                msg.from === 'bot'
                  ? 'bg-gray-700 text-yellow-200 self-start'
                  : 'bg-yellow-500 text-black self-end'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <div className="text-sm text-gray-400 italic">DocDog is typing...</div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-700 bg-gray-800">
          {currentStep === 3 ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="date"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border border-gray-600 rounded-full px-4 py-2 bg-gray-900 text-yellow-200 focus:outline-none"
                required
              />
              <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : currentStep === 4 ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border border-gray-600 rounded-full px-4 py-2 bg-gray-900 text-yellow-200 focus:outline-none"
                required
              >
                <option value="">Select time</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : currentStep >= 1 && currentStep <= 2 ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your answer..."
                className="flex-1 border border-gray-600 rounded-full px-4 py-2 bg-gray-900 text-yellow-200 focus:outline-none"
                required
              />
              <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-full">
                Send
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
}
