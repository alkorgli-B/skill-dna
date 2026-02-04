'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function Home() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    currentSkills: '',
    interests: '',
    experience: '',
    goals: '',
    timeframe: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [progress, setProgress] = useState(0)

  // Sound Effects
  const playSound = (type) => {
    const audio = new Audio()
    switch(type) {
      case 'click':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKvi7q1aFgdGn+Dyu2wdAy+J0fTTfjQGG23A8OOYSg0OUKvj765cFgZEnt/yu20eAzCJ0PTSfTQGHm7A7+OYSw0OUKrj77hdFgdFnt7yu20eBC+I0PPTfjMFHW/B8OOYSgwPUqrj765cFQVFnuDyumwdAy+I0fTTfjMGHW/B8OOZSw0PUqnj77hdFgdFnt/yuW4dAzCI0PTSfTMGHm7A8OKZSw0OUanj765dFQZGnuDyvGwdBC+H0PPTfjQFHW/B8OOYSgwPUqrk77pcFgVGnt/yuW4dAzCI0PTSfTQGHm/A8OKZSw0OUqnj77pdFgVFnt/yuG0dBC+I0PPTfTQFHXDA8OOZSgwPU6rk765dFQVGnuDyvG4eBC+H0PTSfTQGHm/B8OKZSw0OU6nj77pdFgVGnt/yuG4dBC+H0PPTfTQGHXDB8OOYSgwPU6rk77pcFgVGnuDyu20dBC+I0PPTfTQGH3DB8OKZSw0OU6nk77pdFgRFnuDyu20eAy+I0PPTfTMGH3DB8OKZSgwPVKrk765dFQVGnuDyu24dBC+I0PPTfTQGH3DB8OKZSgwPVKrk765dFQVGnuDyu24dBC+I0PPTfTQGH3DB8OKZSgwPVKrk765dFQVGnuDyu24dBC+I0PPTfTQGH3DB8OKZSgwPVKrk765dFQVGnuDyu24dBC+I0PPTfTQGH3DB8OKZSgwPVKrk765dFQVGnuDyu24d'
        break
      case 'success':
        audio.src = 'data:audio/wav;base64,UklGRhIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0Yf8AAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKvi7q1aFgdGn+Dyu2wdAy+J0fTTfjQGG23A8OOYSg0OUKvj765cFgZEnt/yu20eAzCJ0PTSfTQGHm7A7+OYSw0OUKrj77hdFgdFnt7yu20eBC+I0PPTfjMFHW/B8OOYSgwPUqrj765cFQVFnuDyumwdAy+I0fTTfjMGHW/B8OOZSw0PUqnj77hdFgdFnt/yuW4dAzCI0PTSfTMGHm7A8OKZSw0OUanj765dFQZGnuDyvGwdBC+H0PPTfjQFHW/B8OOYSgwPUqrk77pcFgVGnt/yuW4dAzCI0PTSfTQGHm/A8OKZSw0OUqnj77pdFgVFnt/yuG0dBC+I0PPTfTQFHXDA8OOZSgwPU6rk765dFQVGnuDyvG4eBC+H0PTSfTQGHm/B8OKZSw0OU6nj77pdFgVGnt/yuG4dBC+H0PPTfTQGHXDB8OOYSgwPU6rk77pcFgVGnuDyu20dBC+I0PPTfTQGH3DB8OKZSw0OU6nk77pdFgRFnuDyu20eAy+I0PPTfTMGH3DB8OKZSgwPVKrk765dFQVGnuDyu24dBC+I0PPTfTQGH3DB8OKZSgwPVKrk765dFQVGnuDyu24dBC+I0PPTfTQGH3DB8OKZSgwPVKrk765dFQVGnuDyu24d'
        break
      case 'transition':
        audio.src = 'data:audio/wav;base64,UklGRhIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0Yf8AAACAgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+'
        break
    }
    audio.volume = 0.3
    audio.play().catch(() => {})
  }

  // Confetti Effect
  const triggerConfetti = () => {
    const count = 200
    const defaults = {
      origin: { y: 0.7 }
    }

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    fire(0.2, {
      spread: 60,
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  // Floating Particles Background
  useEffect(() => {
    const particlesContainer = document.createElement('div')
    particlesContainer.className = 'particles-bg'
    document.body.appendChild(particlesContainer)

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.width = `${Math.random() * 5 + 2}px`
      particle.style.height = particle.style.width
      particle.style.animationDelay = `${Math.random() * 20}s`
      particle.style.animationDuration = `${Math.random() * 10 + 15}s`
      particlesContainer.appendChild(particle)
    }

    return () => {
      document.body.removeChild(particlesContainer)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setProgress(0)
    playSound('click')

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      clearInterval(progressInterval)
      setProgress(100)
      
      setTimeout(() => {
        setResult(data)
        setStep(3)
        playSound('success')
        triggerConfetti()
      }, 500)

    } catch (error) {
      console.error('Error:', error)
      clearInterval(progressInterval)
      alert('Oops! Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const goToStep = (newStep) => {
    playSound('transition')
    setStep(newStep)
  }

  return (
    <main className="min-h-screen animated-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-8xl mb-6 emoji-bounce"
          >
            🧬
          </motion.div>
          <h1 className="text-7xl font-black text-white mb-4 glow-text">
            Skill DNA
          </h1>
          <p className="text-2xl text-white/90 font-medium">
            Decode Your Future. Build Your Path.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="glass-card text-center max-w-2xl mx-auto"
            >
              <motion.div 
                className="text-7xl mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🎯
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Welcome to Your Future
              </h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                In just a few minutes, we'll analyze your skills, understand your goals,
                and create a personalized roadmap to your dream career.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToStep(2)}
                className="neon-button"
              >
                Start Your Journey 🚀
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Form */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-card max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-8 text-center">
                Tell Us About Yourself
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-lg font-bold text-white mb-3">
                    🎯 What are your current skills?
                  </label>
                  <textarea
                    name="currentSkills"
                    value={formData.currentSkills}
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, React, UI/UX Design, Project Management..."
                    rows="3"
                    className="modern-input"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-lg font-bold text-white mb-3">
                    ❤️ What interests you most?
                  </label>
                  <textarea
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="e.g., Artificial Intelligence, Game Development, Entrepreneurship..."
                    rows="3"
                    className="modern-input"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-lg font-bold text-white mb-3">
                    💼 What's your experience level?
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., Web Developer for 2 years, University Student, Complete Beginner..."
                    className="modern-input"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-lg font-bold text-white mb-3">
                    🎓 What are your career goals?
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    placeholder="e.g., Become an AI Engineer, Start my own company, Work at a top tech company..."
                    rows="3"
                    className="modern-input"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-lg font-bold text-white mb-3">
                    ⏰ What's your learning timeframe?
                  </label>
                  <select
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    className="modern-input cursor-pointer"
                    required
                  >
                    <option value="">Select timeframe...</option>
                    <option value="3months">3 Months - Quick Sprint</option>
                    <option value="6months">6 Months - Balanced Pace</option>
                    <option value="1year">1 Year - Deep Mastery</option>
                    <option value="2years">2 Years - Complete Transformation</option>
                  </select>
                </motion.div>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6"
                  >
                    <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className="progress-bar h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-white text-center mt-3 font-semibold">
                      Analyzing your profile... {progress}%
                    </p>
                  </motion.div>
                )}

                <motion.button 
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="neon-button w-full mt-8"
                >
                  {loading ? (
                    <>
                      <span className="spinner mr-3"></span>
                      Crafting Your Roadmap...
                    </>
                  ) : (
                    'Generate My DNA Map 🗺️'
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 3 && result && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div 
                className="glass-card"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-4 inline-block"
                  >
                    🧬
                  </motion.div>
                  <h2 className="text-5xl font-black gradient-text mb-2">
                    Your Skill DNA Map
                  </h2>
                  <p className="text-white/70 text-lg">Personalized for your success</p>
                </div>
                
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-3">📊</span> Your Profile Analysis
                  </h3>
                  <div className="bg-white/90 backdrop-blur p-6 rounded-2xl border-2 border-purple-200">
                    <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                      {result.analysis}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-3">🎯</span> Your Next Strategic Move
                  </h3>
                  <motion.div 
                    className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl border-4 border-white/30 shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-4xl font-black text-white mb-4">
                      {result.nextSkill}
                    </h4>
                    <p className="text-white/95 text-lg leading-relaxed">
                      {result.reason}
                    </p>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="mr-3">🗺️</span> Your Learning Roadmap
                  </h3>
                  <div className="space-y-6">
                    {result.roadmap && result.roadmap.map((phase, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + (index * 0.2) }}
                        className="phase-card"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl font-black text-purple-600 min-w-[50px]">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold text-gray-800 mb-3">
                              {phase.title}
                            </h4>
                            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                              {phase.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {phase.skills && phase.skills.map((skill, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 1.2 + (index * 0.2) + (i * 0.1) }}
                                  className="skill-badge"
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.button 
                  onClick={() => {
                    goToStep(1)
                    setResult(null)
                    setFormData({
                      currentSkills: '',
                      interests: '',
                      experience: '',
                      goals: '',
                      timeframe: ''
                    })
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="neon-button w-full mt-10"
                >
                  Create New Analysis 🔄
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
