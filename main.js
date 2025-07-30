import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Cabinet Configurator Class
class CabinetConfigurator {
    constructor() {
        try {
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.controls = null;
            this.modules = [];
            this.currentModule = 0;
            this.materials = {};
            this.lights = {};
            
            // Default dimensions (in cm)
            this.dimensions = {
                width: 60,
                depth: 60,
                height: 60
            };
            
            // Scale factor (cm to Three.js units)
            this.scaleFactor = 0.01; // 1 unit = 1cm
            
            this.init();
            this.createMaterials();
            this.setupLighting();
            this.createInitialModule();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error in constructor:', error);
        }
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f172a); // Dark blue background

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            60, // Reduced FOV for better perspective
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(3, 2.5, 3); // Better viewing angle

        // Renderer setup
        const container = document.getElementById('three-container');
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        container.appendChild(this.renderer.domElement);

        // Controls setup
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 10;
        this.controls.zoomSpeed = 0.5; // Reduced zoom speed for more precise control
        this.controls.panSpeed = 0.5; // Reduced pan speed for more precise control
        this.controls.rotateSpeed = 0.5; // Reduced rotate speed for more precise control

        // Ground plane
        this.createGround();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation loop
        this.animate();
    }

    createGround() {
        // Create clean ground plane
        const groundSize = 8; // 8 meters for better coverage
        
        // Create ground plane with subtle texture
        const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5f5, // Light gray color
            transparent: false,
            opacity: 1.0
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.position.x = 0; // Center horizontally
        ground.position.z = 0; // Center depth-wise
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    createMaterials() {
        // Wood material
        this.materials.wood = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.8,
            metalness: 0.1,
            envMapIntensity: 0.5
        });


        // Black lacquer
        this.materials.black = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.3,
            metalness: 0.2,
            envMapIntensity: 0.6
        });

        // Gray lacquer
        this.materials.gray = new THREE.MeshStandardMaterial({
            color: 0x6b7280,
            roughness: 0.4,
            metalness: 0.1,
            envMapIntensity: 0.7
        });
    }

    setupLighting() {
        // Ambient light
        this.lights.ambient = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(this.lights.ambient);

        // Main directional light
        this.lights.directional = new THREE.DirectionalLight(0xffffff, 1);
        this.lights.directional.position.set(5, 5, 5);
        this.lights.directional.castShadow = true;
        this.lights.directional.shadow.mapSize.width = 2048;
        this.lights.directional.shadow.mapSize.height = 2048;
        this.lights.directional.shadow.camera.near = 0.5;
        this.lights.directional.shadow.camera.far = 50;
        this.lights.directional.shadow.camera.left = -10;
        this.lights.directional.shadow.camera.right = 10;
        this.lights.directional.shadow.camera.top = 10;
        this.lights.directional.shadow.camera.bottom = -10;
        this.scene.add(this.lights.directional);

        // Fill light
        this.lights.fill = new THREE.DirectionalLight(0xffffff, 0.3);
        this.lights.fill.position.set(-3, 3, -3);
        this.scene.add(this.lights.fill);

        // Rim light
        this.lights.rim = new THREE.DirectionalLight(0xffffff, 0.2);
        this.lights.rim.position.set(0, 2, -5);
        this.scene.add(this.lights.rim);
    }

    createCabinetModule(width, depth, height, position = { x: 0, y: 0, z: 0 }, materialType = 'wood') {
        try {
            // Validate inputs
            if (!width || !depth || !height || width <= 0 || depth <= 0 || height <= 0) {
                console.error('Invalid dimensions:', { width, depth, height });
                return null;
            }

            const module = {
                group: new THREE.Group(),
                width: width,
                depth: depth,
                height: height,
                position: position,
                materialType: materialType
            };

            // Convert cm to Three.js units
            const w = width * this.scaleFactor;
            const d = depth * this.scaleFactor;
            const h = height * this.scaleFactor;

            // Main cabinet body
            const bodyGeometry = new THREE.BoxGeometry(w, h, d);
            const bodyMaterial = this.materials[materialType] ? this.materials[materialType].clone() : this.materials.wood.clone();
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            body.position.set(w/2, h/2, d/2);
            module.group.add(body);

            // Cabinet door (front panel)
            const doorGeometry = new THREE.BoxGeometry(w * 0.95, h * 0.95, d * 0.05);
            const doorMaterial = this.materials[materialType] ? this.materials[materialType].clone() : this.materials.wood.clone();
            doorMaterial.color.setHex(0x654321); // Slightly darker for door
            const door = new THREE.Mesh(doorGeometry, doorMaterial);
            door.castShadow = true;
            door.position.set(w/2, h/2, d + d * 0.025);
            module.group.add(door);

            // Cabinet handles
            const handleGeometry = new THREE.CylinderGeometry(0.01, 0.01, w * 0.3);
            const handleMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x8B4513,
                metalness: 0.8,
                roughness: 0.2
            });
            const handle = new THREE.Mesh(handleGeometry, handleMaterial);
            handle.rotation.z = Math.PI / 2;
            handle.position.set(w/2, h/2, d + d * 0.075);
            module.group.add(handle);

            // Position the module
            module.group.position.set(position.x, position.y, position.z);
            this.scene.add(module.group);

            return module;
        } catch (error) {
            console.error('Error creating cabinet module:', error);
            return null;
        }
    }

    createInitialModule() {
        try {
            const module = this.createCabinetModule(
                this.dimensions.width,
                this.dimensions.depth,
                this.dimensions.height,
                { x: 0, y: 0, z: 0 },
                'wood'
            );
            
            if (module) {
                this.modules.push(module);
                this.updateModuleList();
                this.updateDimensionsDisplay();
            } else {
                console.error('Failed to create initial module');
            }
        } catch (error) {
            console.error('Error creating initial module:', error);
        }
    }

    updateModuleDimensions(moduleIndex, width, depth, height) {
        if (moduleIndex >= this.modules.length) return;

        const module = this.modules[moduleIndex];
        if (!module) return;
        
        // Update module dimensions
        module.width = width;
        module.depth = depth;
        module.height = height;
        
        // Convert cm to Three.js units
        const w = width * this.scaleFactor;
        const d = depth * this.scaleFactor;
        const h = height * this.scaleFactor;
        
        // Update main cabinet body
        const body = module.group.children[0];
        if (body && body.geometry) {
            body.geometry.dispose();
            body.geometry = new THREE.BoxGeometry(w, h, d);
            body.position.set(w/2, h/2, d/2);
        }
        
        // Update door
        const door = module.group.children[1];
        if (door && door.geometry) {
            door.geometry.dispose();
            door.geometry = new THREE.BoxGeometry(w * 0.95, h * 0.95, d * 0.05);
            door.position.set(w/2, h/2, d + d * 0.025);
        }
        
        // Update handle
        const handle = module.group.children[2];
        if (handle && handle.geometry) {
            handle.geometry.dispose();
            handle.geometry = new THREE.CylinderGeometry(0.01, 0.01, w * 0.3);
            handle.position.set(w/2, h/2, d + d * 0.075);
        }
        
        // Update module positions
        this.updateModulePositions();
        
        // Check if we need to add more modules (only for width changes)
        if (moduleIndex === 0) { // Only check for first module width changes
            this.checkAndAddModules();
        }
        
        // Update display
        this.updateDimensionsDisplay();
    }
    
    updateSelectedModuleDepth(depth) {
        if (this.modules && this.modules[this.currentModule]) {
            const module = this.modules[this.currentModule];
            this.updateModuleDimensions(this.currentModule, module.width, depth, module.height);
        }
    }
    
    updateSelectedModuleHeight(height) {
        if (this.modules && this.modules[this.currentModule]) {
            const module = this.modules[this.currentModule];
            this.updateModuleDimensions(this.currentModule, module.width, module.depth, height);
        }
    }

    checkAndAddModules() {
        // Get current width from slider (total width)
        const totalWidth = parseInt(document.getElementById('width-slider').value);
        
        // Calculate how many modules we need
        const neededModules = Math.ceil(totalWidth / 60);
        const currentModules = this.modules.length;
        
        // Remove excess modules if we have too many
        while (this.modules.length > neededModules) {
            const lastModule = this.modules.pop();
            if (lastModule && lastModule.group) {
                this.scene.remove(lastModule.group);
            }
        }
        
        // Add modules if needed
        if (neededModules > currentModules) {
            for (let i = currentModules; i < neededModules; i++) {
                // Calculate width for this module
                let moduleWidth = 60; // Default
                if (i === neededModules - 1) {
                    // Last module gets the remaining width
                    moduleWidth = totalWidth - (i * 60);
                }
                
                // Create new module with current depth/height values
                const currentDepth = parseInt(document.getElementById('depth-slider').value);
                const currentHeight = parseInt(document.getElementById('height-slider').value);
                
                const newModule = this.createCabinetModule(
                    moduleWidth,
                    currentDepth,
                    currentHeight,
                    { x: 0, y: 0, z: 0 }, // Position will be set by updateModulePositions
                    this.modules[0].materialType
                );
                
                if (newModule) {
                    this.modules.push(newModule);
                }
            }
        }
        
        // Update all module widths based on total width
        this.updateModuleWidths(totalWidth);
        
        // Update positions
        this.updateModulePositions();
        
        // Update display
        this.updateModuleList();
    }
    
    updateModuleWidths(totalWidth) {
        const moduleCount = this.modules.length;
        if (moduleCount === 0) return;
        
        // Calculate width for each module
        for (let i = 0; i < moduleCount; i++) {
            let moduleWidth = 60; // Default
            if (i === moduleCount - 1) {
                // Last module gets the remaining width
                moduleWidth = totalWidth - (i * 60);
            }
            
            // Update module width
            this.modules[i].width = moduleWidth;
            
            // Update geometry
            const w = moduleWidth * this.scaleFactor;
            const d = this.modules[i].depth * this.scaleFactor;
            const h = this.modules[i].height * this.scaleFactor;
            
            const body = this.modules[i].group.children[0];
            if (body && body.geometry) {
                body.geometry.dispose();
                body.geometry = new THREE.BoxGeometry(w, h, d);
                body.position.set(w/2, h/2, d/2);
            }
            
            const door = this.modules[i].group.children[1];
            if (door && door.geometry) {
                door.geometry.dispose();
                door.geometry = new THREE.BoxGeometry(w * 0.95, h * 0.95, d * 0.05);
                door.position.set(w/2, h/2, d + d * 0.025);
            }
            
            const handle = this.modules[i].group.children[2];
            if (handle && handle.geometry) {
                handle.geometry.dispose();
                handle.geometry = new THREE.CylinderGeometry(0.01, 0.01, w * 0.3);
                handle.position.set(w/2, h/2, d + d * 0.075);
            }
        }
        
        // Update sliders for current module (don't change width slider)
        this.updateSlidersForModule(this.currentModule);
    }
    
    updateModulePositions() {
        // Calculate total width to center the modules
        let totalWidth = 0;
        this.modules.forEach(module => {
            if (module && module.group) {
                totalWidth += module.width * this.scaleFactor;
            }
        });
        
        // Center the modules on the ground
        let currentX = -totalWidth / 2;
        this.modules.forEach(module => {
            if (module && module.group) {
                module.group.position.x = currentX;
                currentX += module.width * this.scaleFactor;
            }
        });
    }

    updateModuleMaterial(materialType) {
        this.modules.forEach(module => {
            module.materialType = materialType;
            // Update materials for all meshes in the module
            module.group.children.forEach(child => {
                if (child.material) {
                    child.material = this.materials[materialType].clone();
                }
            });
        });
    }

    updateLighting(intensity, shadowsEnabled) {
        this.lights.directional.intensity = intensity;
        this.lights.fill.intensity = intensity * 0.3;
        this.lights.rim.intensity = intensity * 0.2;
        
        this.renderer.shadowMap.enabled = shadowsEnabled;
        
        this.modules.forEach(module => {
            module.group.children.forEach(child => {
                child.castShadow = shadowsEnabled;
                child.receiveShadow = shadowsEnabled;
            });
        });
    }

    updateModuleList() {
        const moduleList = document.getElementById('module-list');
        const moduleCount = document.getElementById('module-count');
        
        // Update module count
        moduleCount.textContent = this.modules.length;
        
        // Clear and rebuild module list
        moduleList.innerHTML = '';
        
        this.modules.forEach((module, index) => {
            const moduleItem = document.createElement('div');
            moduleItem.className = `module-item ${index === this.currentModule ? 'active' : ''}`;
            moduleItem.innerHTML = `
                <span>${index + 1}. Modül</span>
                <span>${module.width}×${module.depth}×${module.height} cm</span>
            `;
            moduleItem.addEventListener('click', () => {
                this.currentModule = index;
                this.updateSlidersForModule(index);
                this.updateModuleList(); // Refresh active state
            });
            moduleList.appendChild(moduleItem);
        });
    }

    updateSlidersForModule(moduleIndex) {
        if (moduleIndex >= this.modules.length) return;
        
        const module = this.modules[moduleIndex];
        if (!module) return;
        
        // Update depth and height sliders only
        const depthSlider = document.getElementById('depth-slider');
        const heightSlider = document.getElementById('height-slider');
        
        depthSlider.value = module.depth;
        heightSlider.value = module.height;
        
        // Update display values
        document.getElementById('depth-value').textContent = module.depth;
        document.getElementById('height-value').textContent = module.height;
    }

    updateDimensionsDisplay() {
        // Calculate total width
        let totalWidth = 0;
        this.modules.forEach(module => {
            totalWidth += module.width;
        });
        
        const currentModule = this.modules[this.currentModule];
        if (currentModule) {
            document.getElementById('current-width').textContent = totalWidth;
            document.getElementById('current-depth').textContent = currentModule.depth;
            document.getElementById('current-height').textContent = currentModule.height;
        }
    }

    setupEventListeners() {
        // Width slider - only update display, not 3D
        const widthSlider = document.getElementById('width-slider');
        const widthValue = document.getElementById('width-value');
        
        widthSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            widthValue.textContent = value;
        });
        
        // Width slider change event - update total width
        widthSlider.addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            if (this.modules && this.modules.length > 0) {
                // Check and add modules based on total width
                this.checkAndAddModules();
            }
        });

        // Depth slider - only update display, not 3D
        const depthSlider = document.getElementById('depth-slider');
        const depthValue = document.getElementById('depth-value');
        
        depthSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            depthValue.textContent = value;
        });
        
        // Depth slider change event - update selected module
        depthSlider.addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            if (this.modules && this.modules.length > 0) {
                this.updateSelectedModuleDepth(value);
            }
        });

        // Height slider - only update display, not 3D
        const heightSlider = document.getElementById('height-slider');
        const heightValue = document.getElementById('height-value');
        
        heightSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            heightValue.textContent = value;
        });
        
        // Height slider change event - update selected module
        heightSlider.addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            if (this.modules && this.modules.length > 0) {
                this.updateSelectedModuleHeight(value);
            }
        });

        // Material selector
        document.getElementById('material-select').addEventListener('change', (e) => {
            this.updateModuleMaterial(e.target.value);
        });

        // Lighting controls
        document.getElementById('light-intensity').addEventListener('input', (e) => {
            const intensity = parseFloat(e.target.value);
            this.updateLighting(intensity, true);
        });

        // Camera reset
        document.getElementById('reset-camera').addEventListener('click', () => {
            this.camera.position.set(3, 2.5, 3);
            this.controls.reset();
        });
    }

    onWindowResize() {
        const container = document.getElementById('three-container');
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new CabinetConfigurator();
}); 