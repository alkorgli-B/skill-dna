import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(request) {
  try {
    const { currentSkills, interests, experience, goals, timeframe } = await request.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are an expert career advisor and skill development coach with deep knowledge of industry trends, learning paths, and market demands.

Analyze the following user profile and provide a comprehensive, personalized skill development roadmap:

**Current Skills:** ${currentSkills}
**Interests:** ${interests}
**Experience Level:** ${experience}
**Career Goals:** ${goals}
**Available Timeframe:** ${timeframe}

Based on this information, provide your response in the following JSON format (respond ONLY with valid JSON, no additional text):

{
  "analysis": "A detailed 3-4 sentence analysis of the user's current skill set, strengths, and potential career trajectory based on their profile.",
  "nextSkill": "The single most strategic skill they should learn next (be specific, e.g., 'React Server Components' not just 'React')",
  "reason": "A compelling 2-3 sentence explanation of why this specific skill is the optimal next step for them, considering market demand, their goals, and learning curve.",
  "roadmap": [
    {
      "title": "Phase 1: Foundation (Months 1-2)",
      "description": "Brief description of this phase's focus and objectives",
      "skills": ["Specific Skill 1", "Specific Skill 2", "Specific Skill 3"]
    },
    {
      "title": "Phase 2: Intermediate (Months 3-4)",
      "description": "Brief description of this phase's focus and objectives",
      "skills": ["Specific Skill 1", "Specific Skill 2", "Specific Skill 3"]
    },
    {
      "title": "Phase 3: Advanced (Months 5-6)",
      "description": "Brief description of this phase's focus and objectives",
      "skills": ["Specific Skill 1", "Specific Skill 2", "Specific Skill 3"]
    },
    {
      "title": "Phase 4: Mastery & Specialization (Months 7+)",
      "description": "Brief description of this phase's focus and objectives",
      "skills": ["Specific Skill 1", "Specific Skill 2", "Specific Skill 3"]
    }
  ]
}

Important guidelines:
- Be specific and actionable with skill recommendations
- Consider current market trends and demands
- Ensure the roadmap is realistic for the given timeframe
- Focus on skills that complement their existing knowledge
- Prioritize high-impact, in-demand skills
- Make the roadmap progressive and logical
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean and parse the JSON response
    let cleanedText = text.trim()
    
    // Remove markdown code blocks if present
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '')
    }

    const parsedResponse = JSON.parse(cleanedText)

    return Response.json(parsedResponse)

  } catch (error) {
    console.error('Analysis error:', error)
    return Response.json(
      { 
        error: 'Failed to analyze skills',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
