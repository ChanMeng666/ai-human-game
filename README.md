# AI vs Human - Guessing Game 🤖 vs 👤

A web-based quiz game where players test their ability to distinguish between AI-generated and human-created content across four categories: Text, Images, Audio, and Video.

## 🎮 Game Features

- **Single-player mode** with 10 questions per category
- **Four content categories**: Text, Images, Audio, and Videos
- **Beautiful pond-themed UI** with custom fonts and graphics
- **Score tracking** with performance feedback
- **Sequential gameplay** focusing on one content type per round

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Content files (see Content Setup below)

### Installation

1. Navigate to the project directory:
```bash
cd ai-human-game
```

2. Install dependencies:
```bash
npm install
```

3. Add your content files (see Content Setup section)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Content Setup

The game requires content files to function properly. Add your files to the following directories:

### Text Content (10 pairs required)
- `public/content/text/human_1.txt` to `human_10.txt` (Human-written text)
- `public/content/text/ai_1.txt` to `ai_10.txt` (AI-generated text)

**Sample content provided**: `human_1.txt`, `human_2.txt`, `ai_1.txt`, `ai_2.txt`

### Image Content (10 pairs required)
- `public/content/images/human_1.jpg` to `human_10.jpg` (Human-created images)
- `public/content/images/ai_1.jpg` to `ai_10.jpg` (AI-generated images)

Supported formats: JPG, PNG, WebP

### Audio Content (10 pairs required)
- `public/content/audio/human_1.mp3` to `human_10.mp3` (Human-created audio)
- `public/content/audio/ai_1.mp3` to `ai_10.mp3` (AI-generated audio)

Supported formats: MP3, WAV

### Video Content (10 pairs required)
- `public/content/videos/human_1.mp4` to `human_10.mp4` (Human-created videos)
- `public/content/videos/ai_1.mp4` to `ai_10.mp4` (AI-generated videos)

Supported formats: MP4, WebM

## 🎨 Customization

### Modify Question Descriptions

Edit `src/data/questions.json` to customize the question text for each content pair:

```json
{
  "id": 1,
  "category": "text",
  "humanContent": "/content/text/human_1.txt",
  "aiContent": "/content/text/ai_1.txt",
  "humanPosition": "left",
  "description": "Which text was written by a human?"
}
```

### Randomize Human Position

In `questions.json`, set `"humanPosition"` to either `"left"` or `"right"` to vary which side shows the human content.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom Peaberry font
- **State Management**: React Context API
- **Assets**: Reused from OOPTriviaGame (pond theme)

## 📂 Project Structure

```
ai-human-game/
├── app/
│   ├── page.tsx                 # Home page
│   ├── category/page.tsx        # Category selection
│   ├── game/page.tsx            # Main game interface
│   ├── results/page.tsx         # Results & feedback
│   ├── layout.tsx               # Root layout with GameProvider
│   └── globals.css              # Global styles
├── src/
│   ├── components/
│   │   └── ContentDisplay.tsx   # Content rendering component
│   ├── context/
│   │   └── GameContext.tsx      # Game state management
│   ├── data/
│   │   └── questions.json       # Content metadata
│   └── assets/                  # Images, fonts, UI elements
├── public/
│   ├── audio/                   # Sound effects
│   └── content/                 # Game content files
│       ├── text/
│       ├── images/
│       ├── audio/
│       └── videos/
└── README.md
```

## 🎯 How to Play

1. **Start**: Click "Play" on the home screen
2. **Choose Category**: Select Text, Images, Audio, or Videos
3. **Make Your Choice**: Compare two pieces of content side-by-side
4. **Click Left or Right**: Choose which one was created by a human
5. **Get Feedback**: See if you're correct immediately
6. **Complete 10 Questions**: Work through all questions in the category
7. **View Results**: See your final score and review your answers

## 🏆 Scoring

- Each correct answer: +1 point
- Maximum score: 10/10
- Performance levels:
  - **10/10**: Perfect! Expert level 🏆
  - **8-9**: Excellent! Great eye 🌟
  - **5-7**: Good job! Keep practicing 👍
  - **0-4**: Nice try! This is tough 💪

## 📝 Build for Production

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Content Not Loading

- Ensure content files are in the correct directories
- Check file naming matches the pattern: `human_1.txt`, `ai_1.jpg`, etc.
- Verify file extensions match supported formats

### Audio/Video Not Playing

- Check browser console for errors
- Ensure media files are in supported formats
- Try different browsers (Chrome, Firefox, Safari)

### Font Not Displaying

- Verify `PeaberryBase.woff2` exists in `src/assets/`
- Clear browser cache and reload

## 📄 License

This project is based on the OOPTriviaGame template and reuses its visual assets and UI components.

## 🙏 Credits

- UI Theme & Assets: OOPTriviaGame (Pond Ponder) by PowerPuff People
- Custom Font: PeaberryBase
- Framework: Next.js by Vercel

---

**Ready to test your AI detection skills?** 🚀

Add your content files and start playing!
