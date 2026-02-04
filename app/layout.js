export const metadata = {
  title: 'Skill DNA - AI-Powered Career Roadmap Generator',
  description: 'Decode your future with AI. Get personalized skill analysis and a strategic learning roadmap tailored to your goals.',
  keywords: 'AI career planning, skill analysis, learning roadmap, career development, personalized education',
  openGraph: {
    title: 'Skill DNA - Decode Your Future',
    description: 'AI-powered personalized career roadmap generator',
    type: 'website',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
