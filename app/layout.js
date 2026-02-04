export const metadata = {
  title: 'Skill DNA - AI-Powered Career Roadmap',
  description: 'Discover your skill DNA and get a personalized learning roadmap powered by AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
          {children}
        </div>
      </body>
    </html>
  )
}
