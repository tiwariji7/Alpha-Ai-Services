import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'motion/react';

interface ThreeAmbientCanvasProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
  speed?: number;
  theme?: 'hero' | 'page' | 'subtle';
}

export const ThreeAmbientCanvas: React.FC<ThreeAmbientCanvasProps> = ({
  className = 'w-full h-full',
  particleCount,
  interactive = true,
  speed = 1.0,
  theme = 'hero',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

    // Dynamic count based on device & theme
    const count =
      particleCount ||
      (theme === 'hero' ? (isMobile ? 26 : 60) : isMobile ? 16 : 35);

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 85;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // Disable MSAA on mobile for max fps
        powerPreference: 'high-performance',
      });
    } catch {
      // Gracefully exit if WebGL is unavailable
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Color Palette
    const palette = [
      new THREE.Color(0x3b4fd9), // Royal Blue
      new THREE.Color(0x7b5ce8), // Violet
      new THREE.Color(0x7de8ff), // Electric Cyan
      new THREE.Color(0x5eead4), // Cyan 300
      new THREE.Color(0x9c7df0), // Lavender Violet
    ];

    // 3. Node geometry & Instanced mesh for 60fps single draw call
    const nodes: {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      originalPosition: THREE.Vector3;
      color: THREE.Color;
      size: number;
    }[] = [];

    const spreadX = 90;
    const spreadY = 55;
    const spreadZ = 45;

    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY,
        (Math.random() - 0.5) * spreadZ
      );

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.08 * speed,
        (Math.random() - 0.5) * 0.08 * speed,
        (Math.random() - 0.5) * 0.04 * speed
      );

      const col = palette[i % palette.length];

      nodes.push({
        position: pos,
        velocity: vel,
        originalPosition: pos.clone(),
        color: col,
        size: 0.8 + Math.random() * 1.4,
      });
    }

    // Instanced Mesh for Nodes
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const instancedMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      dummy.position.copy(nodes[i].position);
      dummy.scale.setScalar(nodes[i].size);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      instancedMesh.setColorAt(i, nodes[i].color);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
    scene.add(instancedMesh);

    // Floating Polyhedral Crystal Gem in center (Hero accent)
    let crystalMesh: THREE.Mesh | null = null;
    if (theme === 'hero') {
      const crystalGeo = new THREE.OctahedronGeometry(6.5, 0);
      const crystalMat = new THREE.MeshBasicMaterial({
        color: 0x7de8ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      crystalMesh.position.set(0, 0, -10);
      scene.add(crystalMesh);
    }

    // Constellation Lines using Dynamic LineSegments
    const maxConnections = isMobile ? 30 : 90;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    // Mouse & Parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || isMobile) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width || 1);
      const y = (e.clientY - rect.top) / (rect.height || 1);
      targetMouseX = (x - 0.5) * 2;
      targetMouseY = (y - 0.5) * 2;
    };

    if (interactive && !isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 4. Performance: Pause animation when offscreen
    let isVisible = true;
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = 0;

    const renderLoop = () => {
      if (!renderer) return;

      if (!isVisible) {
        // Paused while user is scrolled elsewhere
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      clock += prefersReducedMotion ? 0 : 0.015;

      // Parallax damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 12;
      camera.position.y = -mouseY * 8;
      camera.lookAt(0, 0, 0);

      // Rotate crystal
      if (crystalMesh && !prefersReducedMotion) {
        crystalMesh.rotation.x = clock * 0.4;
        crystalMesh.rotation.y = clock * 0.55;
        crystalMesh.position.y = Math.sin(clock * 0.8) * 2;
      }

      // Update particle positions
      if (!prefersReducedMotion) {
        for (let i = 0; i < count; i++) {
          const node = nodes[i];
          node.position.add(node.velocity);

          // Bounce within bounds
          if (Math.abs(node.position.x) > spreadX / 2) node.velocity.x *= -1;
          if (Math.abs(node.position.y) > spreadY / 2) node.velocity.y *= -1;
          if (Math.abs(node.position.z) > spreadZ / 2) node.velocity.z *= -1;

          dummy.position.copy(node.position);
          dummy.scale.setScalar(
            node.size * (0.85 + 0.15 * Math.sin(clock * 2 + i))
          );
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(i, dummy.matrix);
        }
        instancedMesh.instanceMatrix.needsUpdate = true;
      }

      // Update dynamic constellation connections
      let lineIndex = 0;
      const connectionDist = isMobile ? 18 : 22;
      const posAttr = lineGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = lineGeo.attributes.color as THREE.BufferAttribute;

      for (let i = 0; i < count && lineIndex < maxConnections; i++) {
        for (let j = i + 1; j < count && lineIndex < maxConnections; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < connectionDist) {
            const idx = lineIndex * 6;

            posAttr.setXYZ(idx, nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
            posAttr.setXYZ(
              idx + 1,
              nodes[j].position.x,
              nodes[j].position.y,
              nodes[j].position.z
            );

            const alpha = 1 - dist / connectionDist;
            colAttr.setXYZ(
              idx,
              nodes[i].color.r * alpha,
              nodes[i].color.g * alpha,
              nodes[i].color.b * alpha
            );
            colAttr.setXYZ(
              idx + 1,
              nodes[j].color.r * alpha,
              nodes[j].color.g * alpha,
              nodes[j].color.b * alpha
            );

            lineIndex++;
          }
        }
      }

      // Zero out unused lines
      for (let k = lineIndex; k < maxConnections; k++) {
        const idx = k * 6;
        posAttr.setXYZ(idx, 0, 0, 0);
        posAttr.setXYZ(idx + 1, 0, 0, 0);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    // Initial render
    renderLoop();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
      if (interactive && !isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (crystalMesh) {
        crystalMesh.geometry.dispose();
        (crystalMesh.material as THREE.Material).dispose();
      }

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [particleCount, interactive, speed, theme, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    />
  );
};
