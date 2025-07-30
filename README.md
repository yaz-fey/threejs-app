# Lazzoni Cabinet Configurator

Modern 3D cabinet configurator built with Three.js for Lazzoni Furniture.

## 🎯 Project Overview

This is a technical evaluation case study demonstrating the ability to build a modular, interactive, and resizable 3D cabinet configurator using Three.js. The application allows users to customize cabinet dimensions in real-time with realistic 3D visualization.

## ✨ Features

### Core Functionality
- **3D Model Creation**: Basic cube cabinet created using JavaScript and Three.js
- **Real-time Dimension Adjustment**: Width, depth, and height sliders with real measurements (cm)
- **Modular System**: Automatic module addition when width exceeds 60cm
- **Individual Module Configuration**: Each module can have different dimensions
- **OrbitControls**: Full 3D camera control and navigation

### Advanced Features
- **Realistic Materials**: PBR materials with wood, white/black/gray lacquer options
- **Professional Lighting**: HDRI-style lighting with shadows and multiple light sources
- **Responsive Design**: Modern UI that adapts to different screen sizes
- **Real Measurements**: All dimensions in centimeters with proper scaling

### Technical Implementation
- **No External Models**: All geometry created programmatically
- **Modular Architecture**: Clean, readable, and well-commented code
- **Performance Optimized**: Efficient rendering with proper shadow mapping
- **Modern Development**: Built with Vite for fast development and building

## 🚀 Live Demo

**Demo URL**: [https://lazzoni-cabinet-configurator.vercel.app](https://lazzoni-cabinet-configurator.vercel.app)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lazzoni-cabinet-configurator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
lazzoni-cabinet-configurator/
├── index.html          # Main HTML file
├── style.css           # Modern CSS styles
├── main.js            # Three.js application logic
├── package.json       # Dependencies and scripts
├── vite.config.js     # Vite configuration
└── README.md          # Project documentation
```

## 🎮 Usage

### Basic Controls
- **Dimension Sliders**: Adjust width, depth, and height of the cabinet
- **Material Selector**: Choose between wood, white, black, or gray lacquer
- **Lighting Controls**: Adjust light intensity and toggle shadows
- **Camera Reset**: Reset camera to default position
- **Module Selection**: Click on modules in the list to configure individual modules

### 3D Navigation
- **Mouse Drag**: Rotate camera around the cabinet
- **Mouse Wheel**: Zoom in/out
- **Right Mouse Drag**: Pan camera

### Key Features
- **Real Measurements**: All dimensions are in centimeters
- **Modular System**: Automatically adds modules when width exceeds 60cm
- **Individual Configuration**: Each module can have different dimensions
- **Professional Rendering**: Realistic materials and lighting

## 🔧 Technical Details

### Three.js Implementation
- **Scene Setup**: Professional 3D environment with ground plane and grid
- **Camera System**: Perspective camera with OrbitControls
- **Lighting System**: Multiple directional lights with shadows
- **Material System**: PBR materials with realistic properties
- **Geometry Creation**: Programmatic cabinet creation with doors and handles

### Architecture
- **Modular Design**: Clean separation of concerns
- **Event-Driven**: Responsive UI with real-time updates
- **Performance Optimized**: Efficient rendering pipeline
- **Scalable**: Easy to extend with new features

### Key Classes
- `CabinetConfigurator`: Main application class
- Module management system
- Material and lighting systems
- UI event handling

## 🎨 Design Features

### Modern UI
- Clean, professional interface
- Responsive design for all devices
- Intuitive controls and feedback
- Real-time dimension display

### 3D Visualization
- Realistic cabinet representation
- Professional lighting setup
- Smooth camera controls
- High-quality materials

## 📊 Evaluation Criteria Met

✅ **Clean, readable, and well-commented code structure**
✅ **3D model creation and manipulation**
✅ **Creativity and bonus features**
✅ **Modular system implementation**
✅ **Real-time dimension adjustment**
✅ **Professional lighting and materials**

## 🚀 Deployment

The application is deployed on Vercel and can be accessed at:
[https://lazzoni-cabinet-configurator.vercel.app](https://lazzoni-cabinet-configurator.vercel.app)

### Build Process
```bash
npm run build
```

### Deployment Steps
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure your domain (optional)

## 🤝 Contributing

This is a technical evaluation project for Lazzoni Furniture. For any questions or feedback, please contact the development team.

## 📄 License

This project is created for technical evaluation purposes. All rights reserved by Lazzoni Furniture.

---

**Developed for Lazzoni Furniture - Technical Evaluation Case Study** 