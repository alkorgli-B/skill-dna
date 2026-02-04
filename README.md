# 🧬 Skill DNA

**AI-Powered Career Roadmap Generator**

Decode your future with personalized skill analysis and strategic learning paths.

🔗 **Live Demo**: <https://skill-dna.onrender.com>

-----

## ✨ Features

- 🎯 Smart AI-powered skill analysis using Google Gemini Pro
- 🗺️ Personalized learning roadmap tailored to your goals
- 🎨 Beautiful animated UI with glass morphism design
- 📊 Strategic phase-by-phase career planning
- 🚀 Built with Next.js 14 and Tailwind CSS

-----

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/alkorgli-B/skill-dna.git
cd skill-dna
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: [Google AI Studio](https://makersuite.google.com/app/apikey)

### 4. Run the development server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

-----

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI Model**: Google Gemini Pro
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel / Render

-----

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
1. Import to [Vercel](https://vercel.com)
1. Add `GEMINI_API_KEY` to Environment Variables
1. Deploy!

### Render

1. Connect GitHub repository
1. Build: `npm run build`
1. Start: `npm start`
1. Add `GEMINI_API_KEY` to Environment Variables
1. Deploy!

-----

## 📁 Project Structure

```
skill-dna/
├── app/
│   ├── api/analyze/route.js    # AI analysis endpoint
│   ├── layout.js                # Root layout
│   ├── page.js                  # Main page
│   └── globals.css              # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

-----

## 🎯 How It Works

1. User inputs their skills, interests, experience, and goals
1. Google Gemini Pro analyzes the profile
1. AI generates a personalized, phased learning roadmap
1. Results displayed with beautiful animations and confetti

-----

## 📄 License

MIT License - Free to use for personal and commercial projects.

-----

## 🌟 Acknowledgments

Built with [Next.js](https://nextjs.org/) • Powered by [Google Gemini](https://deepmind.google/technologies/gemini/) • Styled with [Tailwind CSS](https://tailwindcss.com/)

-----

**Made with alkorgli and AI**

⭐ Star this repo if you find it helpful!