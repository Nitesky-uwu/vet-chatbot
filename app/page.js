'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! 🐾 I am your Vet Assistant. How can I help you today?' }
  ])
  const [options, setOptions] = useState([
    'Book Appointment',
    'Doctor Timings',
    'Emergency Help'
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState("")
  const [awaitingInput, setAwaitingInput] = useState(false) // tracks free text input

  const handleOptionClick = (option) => {
    setMessages((prev) => [...prev, { from: 'user', text: option }])
    setOptions([])
    setIsTyping(true)

    setTimeout(() => {
      let reply = ""
      if (option === 'Book Appointment') {
        reply = "Great! 🐶 Please tell me your pet’s name and preferred time."
        setAwaitingInput(true) // show input box
      } else if (option === 'Doctor Timings') {
        reply = "Our vets are available from 9 AM - 6 PM, Mon-Sat."
        setOptions(['Book Appointment', 'Emergency Help'])
      } else if (option === 'Emergency Help') {
        reply = "🚨 Please call +91-9876543210 immediately for emergencies."
        setOptions(['Book Appointment', 'Doctor Timings'])
      }
      setMessages((prev) => [...prev, { from: 'bot', text: reply }])
      setIsTyping(false)
    }, 1000)
  }

  const handleInputSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { from: 'user', text: input }])
    setInput("")
    setAwaitingInput(false)
    setIsTyping(true)

    // Bot replies
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: `Thanks! I’ve noted: "${input}". Our vet will contact you soon.` }
      ])
      setOptions(['Book Appointment', 'Doctor Timings', 'Emergency Help']) // reset options
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 rounded-t-2xl">
          🐾 Vet Chatbot
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.from === 'bot'
                  ? 'bg-gray-200 self-start'
                  : 'bg-green-500 text-white self-end'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}

          {isTyping && (
            <div className="text-sm text-gray-500">Bot is typing...</div>
          )}
        </div>

        {/* Options Buttons */}
        {!awaitingInput && options.length > 0 && (
          <div className="p-3 border-t flex space-x-2 flex-wrap">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Text Input Box */}
        {awaitingInput && (
          <form
            onSubmit={handleInputSubmit}
            className="flex items-center gap-2 p-3 border-t bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-full"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
