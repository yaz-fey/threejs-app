# Lazzoni Cabinet Configurator

3D Cabinet Design Application - Interactive cabinet configurator built with Three.js.

## 🚀 Live Demo

**Demo Link**: [https://fey-threejs-app.netlify.app](https://fey-threejs-app.netlify.app)

## ✨ Features

- 🎨 3D cabinet design and visualization
- 📏 Real-time dimension adjustment (width, depth, height)
- 🎨 Different color options (brown, black, gray)
- 💡 Dynamic lighting settings
- 🖱️ Mouse 3D controls (zoom, pan, rotate)
- 📱 Responsive design

## 🛠️ Technologies

- **Three.js** - 3D graphics library
- **Vite** - Build tool and development server
- **Vanilla JavaScript** - Modern ES6+ syntax
- **CSS3** - Modern styling

## 📦 Installation

### Requirements
- Node.js 18+
- npm

### Steps

1. Clone the project:
```bash
git clone <repository-url>
cd threejs
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser

## 🚀 Deploy

### Production Build
```bash
npm run build
```

### Netlify Deployment
This project is deployed on Netlify. For automatic deployment:
- Build Command: `npm run build`
- Publish Directory: `dist`

## 🎮 Usage

1. **Dimension Adjustment**: Use sliders to change cabinet dimensions
2. **Color Change**: Select different colors from dropdown menu
3. **3D Controls**:
- Mouse wheel: Zoom in/out
- Mouse drag: Rotate
- Right click + drag: Pan
4. **Lighting Settings**: Use light intensity slider

## 📁 Project Structure

```
threejs/
├── index.html # Main HTML file
├── main.js # Three.js application code
├── style.css # Style file
├── vite.config.js # Vite configuration
├── netlify.toml # Netlify deployment settings
├── public/
│ └── _redirects # SPA routing redirects
└── dist/ # Build output
```

## 🔧 Troubleshooting

### Common Issues

- **WebGL support**: Make sure your browser supports WebGL
- **JavaScript error**: Check error messages in console (F12)
- **Asset loading**: Ensure CSS and JS files are loaded correctly

## 📄 License

MIT License

---

**Developer**: yaz-fey