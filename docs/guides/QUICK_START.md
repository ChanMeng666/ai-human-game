# 🚀 Quick Start Guide - AI vs Human Game

## ✅ Installation Complete!

Your AI vs Human guessing game has been successfully initialized with:
- ✓ Next.js 15 + TypeScript + TailwindCSS
- ✓ All game pages (Home, Category, Game, Results)
- ✓ Pond-themed UI with custom assets
- ✓ Sample text content (3 pairs provided)

## 📋 What You Need to Do Next

### Step 1: Add Content Files (Required)

The game needs content to work. You have **3 text pairs** as samples. To play:

**Minimum requirement**: Complete **one category** (10 pairs of files)

#### Option A - Complete Text Category (Easiest)
Add 7 more text file pairs to `public/content/text/`:
- `human_4.txt` through `human_10.txt`
- `ai_4.txt` through `ai_10.txt`

#### Option B - Add Other Categories
Or prepare content for Images, Audio, or Videos:
- **Images**: 10 pairs of .jpg/.png files
- **Audio**: 10 pairs of .mp3 files  
- **Videos**: 10 pairs of .mp4 files

See `public/content/CONTENT_GUIDE.txt` for detailed instructions.

### Step 2: Run the Game

```bash
cd ai-human-game
npm run dev
```

Then open: **http://localhost:3000**

### Step 3: Play!

1. Click "Play" on home screen
2. Choose a category (only ones with complete content will work properly)
3. Compare two pieces of content
4. Guess which one is human-made
5. Complete 10 questions and see your score!

## 📁 Project Structure

```
ai-human-game/
├── app/                      # Next.js pages
│   ├── page.tsx             # Home page
│   ├── category/page.tsx    # Category selection
│   ├── game/page.tsx        # Main game
│   └── results/page.tsx     # Score screen
├── src/
│   ├── components/          # React components
│   ├── context/             # Game state
│   ├── data/
│   │   └── questions.json   # Content configuration ⚙️
│   └── assets/              # Images, fonts
└── public/
    ├── audio/               # Sound effects (provided)
    └── content/             # YOUR CONTENT GOES HERE 📥
        ├── text/
        ├── images/
        ├── audio/
        └── videos/
```

## ⚙️ Customization

### Change Question Text
Edit `src/data/questions.json`:
```json
{
  "id": 1,
  "category": "text",
  "description": "Your custom question here?"
}
```

### Randomize Answers
In `questions.json`, change `"humanPosition"` between `"left"` and `"right"` to vary the answer position.

### Add More Questions
Add new entries to `questions.json` with incremented IDs and matching content files.

## 🐛 Troubleshooting

### "Content not found" errors
- Check that filenames match exactly: `human_1.txt`, `ai_1.txt`, etc.
- Ensure files are in the correct folder
- File extensions must match what's in `questions.json`

### Game redirects to home/category page
- You need at least 10 content pairs in a category
- Check browser console (F12) for errors

### Fonts not loading
- Clear browser cache (Ctrl+Shift+R)
- Verify `src/assets/PeaberryBase.woff2` exists

### Audio not playing
- Click on the page first (browsers block auto-play)
- Check audio file formats (.wav or .mp3)

## 🎨 Design Credits

This game reuses UI assets from **OOPTriviaGame** (Pond Ponder):
- Background images
- Window frames
- Button styles
- Custom Peaberry font
- Sound effects

## 📚 Additional Resources

- **Full Documentation**: `README.md`
- **Content Guide**: `public/content/CONTENT_GUIDE.txt`
- **Next.js Docs**: https://nextjs.org/docs

## 🎯 Testing Tips

1. Start with **Text category** (easiest to create content)
2. Write your own human text (personal stories work great)
3. Use ChatGPT/Claude for AI text versions
4. Try to make them similar in length and topic
5. Test the game to see if YOU can tell the difference!

---

## Ready to Play? 🎮

```bash
npm run dev
```

Then visit **http://localhost:3000** and test your AI detection skills!

Need help? Check the full README.md or the content guide.

**Good luck!** 🚀

