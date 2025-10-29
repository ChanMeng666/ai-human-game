# 🎮 AI vs Human Game - Content Specifications

## 📋 Complete Content Format Guide

This document provides detailed specifications for all game content files.

---

## 📝 1. TEXT CONTENT

### Format Requirements
- **File Format**: `.txt` (Plain text, UTF-8 encoding)
- **Naming Convention**: 
  - Human: `human_1.txt` to `human_10.txt`
  - AI: `ai_1.txt` to `ai_10.txt`
- **Character Count**: 150-500 words recommended
- **Line Breaks**: Use standard line breaks (`\n`)

### Best Practices
✅ **Human Text Ideas**:
- Personal stories and anecdotes
- Creative writing with emotions
- Informal conversational tone
- Natural flow with varied sentence structure
- Personal opinions and subjective views

✅ **AI Text Characteristics**:
- More formal or structured language
- Repetitive patterns
- Generic descriptions
- Lack of personal voice
- Perfect grammar (sometimes too perfect)

### Quality Checklist
- [ ] Similar length for fair comparison
- [ ] Same topic/theme for each pair
- [ ] Properly encoded (UTF-8)
- [ ] No special formatting required
- [ ] Readable and engaging

---

## 🖼️ 2. IMAGE CONTENT

### Format Requirements

#### **Primary Format: JPEG (.jpg)**
- **Recommended for**: Photographs, realistic art, complex images
- **Resolution**: 1200×800px to 1920×1080px
- **Quality**: 80-90% compression
- **File Size**: 200KB - 800KB per image
- **Color Space**: sRGB

#### **Secondary Format: PNG (.png)**
- **Recommended for**: Digital art, illustrations, images with text
- **Resolution**: 1200×800px to 1920×1080px
- **File Size**: < 1MB per image
- **Transparency**: Supported but not required

#### **Alternative Format: WebP (.webp)** ⭐ Best Performance
- **Recommended for**: All image types (if you can convert)
- **Resolution**: 1200×800px to 1920×1080px
- **Quality**: 80-85%
- **File Size**: 150KB - 600KB (smaller than JPG/PNG)
- **Browser Support**: Modern browsers (Chrome, Firefox, Edge, Safari 14+)

### Naming Convention
```
Human: human_1.jpg, human_2.jpg, ..., human_10.jpg
AI:    ai_1.jpg, ai_2.jpg, ..., ai_10.jpg
```

### Content Suggestions

**Human Images**:
- Real photographs taken by photographers
- Hand-drawn art, paintings, sketches
- Authentic artwork from galleries
- Stock photos from reputable sources
- Your own photos

**AI Images**:
- DALL-E 3 generated images
- Midjourney outputs
- Stable Diffusion XL creations
- Adobe Firefly generations
- Bing Image Creator results

### Technical Requirements
| Property | Specification |
|----------|---------------|
| **Min Width** | 800px |
| **Max Width** | 1920px |
| **Aspect Ratio** | 4:3, 3:2, or 16:9 |
| **Max File Size** | 1MB (recommended < 800KB) |
| **Color Depth** | 24-bit (RGB) |
| **DPI** | 72 dpi (web standard) |

### Optimization Tools
- **Online**: TinyPNG, Squoosh.app, ImageOptim
- **Desktop**: Adobe Photoshop, GIMP
- **CLI**: imagemagick, webp converter

### Example Optimization Command
```bash
# Convert to WebP with ImageMagick
magick convert input.jpg -quality 85 -define webp:method=6 output.webp

# Resize and compress JPEG
magick convert input.jpg -resize 1600x1200 -quality 85 output.jpg
```

---

## 🎵 3. AUDIO CONTENT

### Format Requirements

#### **Primary Format: MP3 (.mp3)** ⭐ Best Compatibility
- **Bit Rate**: 128-192 kbps (stereo)
- **Sample Rate**: 44.1 kHz or 48 kHz
- **Channels**: Stereo (2.0) or Mono
- **Duration**: 15-60 seconds recommended
- **File Size**: 500KB - 2MB per file
- **Codec**: MPEG-1 Audio Layer 3

#### **Secondary Format: WAV (.wav)**
- **Only if**: Higher quality needed for specific content
- **Bit Depth**: 16-bit
- **Sample Rate**: 44.1 kHz
- **File Size**: Larger (< 5MB recommended)
- **Use Case**: Studio quality, uncompressed

### Naming Convention
```
Human: human_1.mp3, human_2.mp3, ..., human_10.mp3
AI:    ai_1.mp3, ai_2.mp3, ..., ai_10.mp3
```

### Content Suggestions

**Human Audio**:
- Real music recordings (royalty-free)
- Human voice recordings
- Natural instrument performances
- Live recordings with ambient noise
- Voice acting, podcasts, speeches

**AI Audio**:
- Suno AI music generations
- Udio AI music
- ElevenLabs TTS (text-to-speech)
- Murf AI voices
- Google/Azure TTS outputs
- AI-composed music

### Technical Specifications
| Property | MP3 | WAV |
|----------|-----|-----|
| **Bit Rate** | 128-192 kbps | N/A |
| **Sample Rate** | 44.1/48 kHz | 44.1 kHz |
| **Bit Depth** | N/A | 16-bit |
| **Channels** | Stereo | Stereo |
| **Max Duration** | 60 seconds | 60 seconds |
| **Max File Size** | 2MB | 5MB |

### Audio Quality Guidelines
- ✅ Clear audio, no clipping or distortion
- ✅ Consistent volume levels across all files
- ✅ Normalized audio (peak around -6dB to -3dB)
- ✅ Remove silence at start/end
- ✅ Fade in/out for smooth playback

### Recommended Tools
- **Audacity** (Free, cross-platform) - Editing, conversion, normalization
- **FFmpeg** (CLI) - Batch conversion and compression
- **Online**: Online-Convert.com, CloudConvert

### Example Conversion Commands
```bash
# Convert to MP3 with FFmpeg
ffmpeg -i input.wav -codec:a libmp3lame -b:a 192k output.mp3

# Normalize audio and trim silence
ffmpeg -i input.mp3 -af "loudnorm=I=-16:TP=-1.5:LRA=11" -b:a 192k output.mp3
```

---

## 🎬 4. VIDEO CONTENT

### Format Requirements

#### **Primary Format: MP4 (.mp4)** ⭐ Best Compatibility
- **Video Codec**: H.264 (AVC)
- **Audio Codec**: AAC
- **Resolution**: 1280×720 (720p) or 1920×1080 (1080p)
- **Frame Rate**: 24, 30, or 60 fps
- **Bit Rate**: 2-5 Mbps (720p), 4-8 Mbps (1080p)
- **Duration**: 10-30 seconds recommended
- **File Size**: 2MB - 10MB per video
- **Container**: MP4 (MPEG-4 Part 14)

#### **Secondary Format: WebM (.webm)**
- **Video Codec**: VP9 or VP8
- **Audio Codec**: Opus or Vorbis
- **File Size**: Usually smaller than MP4
- **Use Case**: Modern browsers, better compression

### Naming Convention
```
Human: human_1.mp4, human_2.mp4, ..., human_10.mp4
AI:    ai_1.mp4, ai_2.mp4, ..., ai_10.mp4
```

### Content Suggestions

**Human Videos**:
- Real video footage (royalty-free)
- Movie clips (public domain)
- Documentary footage
- YouTube videos (with permission)
- Your own recordings
- Stock video from Pexels, Pixabay

**AI Videos**:
- Runway Gen-2 generations
- Pika AI videos
- Stable Video Diffusion
- Synthesia AI avatars
- D-ID talking avatars
- ModelScope text-to-video

### Technical Specifications
| Property | 720p (HD) | 1080p (Full HD) |
|----------|-----------|-----------------|
| **Resolution** | 1280×720 | 1920×1080 |
| **Video Bit Rate** | 2-3 Mbps | 4-6 Mbps |
| **Audio Bit Rate** | 128 kbps | 192 kbps |
| **Frame Rate** | 30 fps | 30 fps |
| **Max Duration** | 30 seconds | 30 seconds |
| **Target File Size** | 3-5 MB | 5-8 MB |

### Video Quality Guidelines
- ✅ Clean, stable footage (no excessive shake)
- ✅ Good lighting and exposure
- ✅ Clear audio (if present)
- ✅ Consistent resolution across all files
- ✅ No watermarks (if possible)
- ✅ First frame should be interesting (used as thumbnail)

### Recommended Tools
- **HandBrake** (Free) - Video conversion and compression
- **FFmpeg** (CLI) - Professional video processing
- **DaVinci Resolve** (Free) - Professional editing
- **VLC Media Player** - Quick conversion

### Example Conversion Commands
```bash
# Convert to web-optimized MP4 (720p)
ffmpeg -i input.mov -vcodec h264 -acodec aac \
  -vf scale=1280:720 -b:v 2500k -b:a 128k output.mp4

# Convert to web-optimized MP4 (1080p)
ffmpeg -i input.mov -vcodec h264 -acodec aac \
  -vf scale=1920:1080 -b:v 5000k -b:a 192k output.mp4

# Create WebM version
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 2000k \
  -c:a libopus -b:a 128k output.webm

# Compress existing MP4
ffmpeg -i input.mp4 -vcodec h264 -crf 23 output_compressed.mp4
```

---

## 📊 CONTENT MATRIX SUMMARY

| Type | Best Format | Alt Format | Size Limit | Duration/Size |
|------|-------------|------------|------------|---------------|
| **Text** | .txt | - | - | 150-500 words |
| **Images** | .webp | .jpg, .png | 800KB | 1200×800 min |
| **Audio** | .mp3 | .wav | 2MB | 15-60 sec |
| **Video** | .mp4 | .webm | 8MB | 10-30 sec |

---

## 🎯 CONTENT PAIRING STRATEGY

### Make It Challenging But Fair

**Good Pairs**:
- Similar subject matter
- Comparable quality
- Same length/duration
- Equivalent style/genre

**Avoid**:
- Obvious quality differences
- Drastically different topics
- Watermarked AI content vs clean human content
- Different time periods (old vs new tech)

---

## 🔧 BATCH PROCESSING TIPS

### For Images
```bash
# Batch resize all JPG files to max 1600px width
for file in *.jpg; do
  magick convert "$file" -resize 1600x\> -quality 85 "optimized_$file"
done
```

### For Audio
```bash
# Batch convert WAV to MP3
for file in *.wav; do
  ffmpeg -i "$file" -codec:a libmp3lame -b:a 192k "${file%.wav}.mp3"
done
```

### For Video
```bash
# Batch compress all MP4 files
for file in *.mp4; do
  ffmpeg -i "$file" -vcodec h264 -crf 23 "compressed_$file"
done
```

---

## ✅ FINAL CHECKLIST

Before adding content to the game:

### Text Files (10 pairs = 20 files)
- [ ] All files are UTF-8 encoded .txt
- [ ] Human and AI texts are similar length
- [ ] Files named correctly (human_1.txt, ai_1.txt, etc.)
- [ ] All files are readable and engaging

### Images (10 pairs = 20 files)
- [ ] Resolution: 800px minimum width
- [ ] File size: < 800KB each
- [ ] Format: .jpg, .png, or .webp
- [ ] Files named correctly (human_1.jpg, ai_1.jpg, etc.)
- [ ] All images load correctly

### Audio (10 pairs = 20 files)
- [ ] Format: .mp3 (128-192 kbps)
- [ ] Duration: 15-60 seconds
- [ ] File size: < 2MB each
- [ ] Files named correctly (human_1.mp3, ai_1.mp3, etc.)
- [ ] Volume normalized

### Videos (10 pairs = 20 files)
- [ ] Format: .mp4 (H.264 + AAC)
- [ ] Resolution: 720p or 1080p
- [ ] Duration: 10-30 seconds
- [ ] File size: < 8MB each
- [ ] Files named correctly (human_1.mp4, ai_1.mp4, etc.)
- [ ] First frame is interesting

---

## 🌐 BROWSER COMPATIBILITY

| Format | Chrome | Firefox | Safari | Edge |
|--------|--------|---------|--------|------|
| .txt | ✅ | ✅ | ✅ | ✅ |
| .jpg/.png | ✅ | ✅ | ✅ | ✅ |
| .webp | ✅ | ✅ | ✅ (14+) | ✅ |
| .mp3 | ✅ | ✅ | ✅ | ✅ |
| .wav | ✅ | ✅ | ✅ | ✅ |
| .mp4 | ✅ | ✅ | ✅ | ✅ |
| .webm | ✅ | ✅ | ❌ | ✅ |

---

## 📚 RECOMMENDED CONTENT SOURCES

### Free Resources

**Images**:
- Unsplash.com (real photos)
- Pexels.com (stock photos)
- Pixabay.com (free images)

**Audio**:
- Freesound.org (sound effects)
- Incompetech.com (music)
- Bensound.com (royalty-free music)

**Videos**:
- Pexels.com/videos
- Pixabay.com/videos
- Coverr.co (free stock footage)

### AI Generation Tools

**Images**: DALL-E 3, Midjourney, Stable Diffusion, Adobe Firefly  
**Audio**: Suno, Udio, ElevenLabs  
**Videos**: Runway, Pika, Stable Video Diffusion

---

## 💡 QUICK START

1. **Start with Text** (easiest to create)
2. **Add Images** (visual impact)
3. **Include Audio** (variety)
4. **Add Videos** (complete experience)

You only need **10 pairs for ONE category** to start playing!

Good luck creating your content! 🎮

