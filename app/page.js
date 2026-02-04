'use client'
import { useState } from 'react'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setResult(data)
      setStep(3)
    } catch (error) {
      console.error('Error:', error)
      alert('حدث خطأ! حاول مرة أخرى')
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

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold gradient-text mb-4">
          🧬 Skill DNA
        </h1>
        <p className="text-xl text-gray-600">
          اكتشف خريطة مهاراتك واحصل على مسار تعليمي مخصص لك
        </p>
      </div>

      {/* Step 1: Welcome */}
      {step === 1 && (
        <div className="card text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h2 className="text-3xl font-bold mb-4">مرحباً بك!</h2>
          <p className="text-lg text-gray-600 mb-8">
            في دقائق قليلة، سنحلل مهاراتك الحالية ونعطيك خريطة طريق مخصصة لمستقبلك المهني
          </p>
          <button 
            className="btn-primary"
            onClick={() => setStep(2)}
          >
            ابدأ التحليل 🚀
          </button>
        </div>
      )}

      {/* Step 2: Form */}
      {step === 2 && (
        <div className="card">
          <h2 className="text-3xl font-bold mb-6 text-center">حلل مهاراتك</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-lg font-semibold mb-2">
                🎯 ما هي مهاراتك الحالية؟
              </label>
              <textarea
                name="currentSkills"
                value={formData.currentSkills}
                onChange={handleChange}
                placeholder="مثال: JavaScript, React, تصميم UI/UX, إدارة مشاريع..."
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                ❤️ ما الذي يثير اهتمامك؟
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="مثال: الذكاء الاصطناعي، تطوير الألعاب، ريادة الأعمال..."
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                💼 ما هي خبرتك المهنية؟
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="مثال: مطور ويب منذ سنتين، طالب جامعي، مبتدئ..."
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                🎓 ما هي أهدافك المستقبلية؟
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                placeholder="مثال: أن أصبح مهندس AI، بناء شركتي الخاصة، العمل في شركة عالمية..."
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                ⏰ ما هو الإطار الزمني المتاح لديك؟
              </label>
              <select
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl"
                required
              >
                <option value="">اختر...</option>
                <option value="3months">3 أشهر</option>
                <option value="6months">6 أشهر</option>
                <option value="1year">سنة</option>
                <option value="2years">سنتين</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading"></span> جاري التحليل...
                </>
