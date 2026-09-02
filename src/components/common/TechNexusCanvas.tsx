import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'motion/react';

export interface TechNexusCanvasProps {
  className?: string;
  density?: 'hero' | 'dense' | 'medium' | 'subtle';
  interactive?: boolean;
  speed?: number;
  opacity?: number;
}

interface NexusNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  basePosition: THREE.Vector3;
  color: THREE.Color;
  baseSize: number;
  currentSize: number;
  isHub: boolean;
  pulseEnergy: number; // For excitation when receiving a data packet
  orbitCenter?: THREE.Vector3;
  orbitRadius?: number;
  orbitAngle?: number;
  orbitSpeed?: number;
}

interface DataPulse {
  startNode: number;
  targetNode: number;
  progress: number;
  speed: number;
  active: boolean;
  color: THREE.Color;
}

export const TechNexusCanvas: React.FC<TechNexusCanvasProps> = ({
  className = 'w-full h-full',
  density = 'hero',
  interactive = true,
  speed = 1.0,
  opacity = 0.85,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

    // Dynamic counts based on density and device
    let nodeCount = 68;
    let hubCount = 5;
    let maxConnections = 130;
    let pulseCount = 14;
    let connectionDistance = 24;

    if (density === 'subtle') {
      nodeCount = isMobile ? 18 : 36;
      hubCount = 2;
      maxConnections = isMobile ? 25 : 55;
      pulseCount = isMobile ? 4 : 7;
      connectionDistance = 19;
    } else if (density === 'medium') {
      nodeCount = isMobile ? 22 : 48;
      hubCount = 3;
      maxConnections = isMobile ? 32 : 80;
      pulseCount = isMobile ? 6 : 10;
      connectionDistance = 21;
    } else if (density === 'dense' || density === 'hero') {
      nodeCount = isMobile ? 28 : 72;
      hubCount = isMobile ? 3 : 5;
      maxConnections = isMobile ? 40 : 135;
      pulseCount = isMobile ? 6 : 16;
      connectionDistance = isMobile ? 20 : 25;
    }

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.z = 82;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Brand Color Tokens
    const COLOR_BLUE_500 = new THREE.Color(0x4d6bff); // #4D6BFF
    const COLOR_BLUE_600 = new THREE.Color(0x3b4fd9); // #3B4FD9
    const COLOR_VIOLET_500 = new THREE.Color(0x7b5ce8); // #7B5CE8
    const COLOR_VIOLET_400 = new THREE.Color(0x9c7df0); // #9C7DF0
    const COLOR_CYAN_400 = new THREE.Color(0x7de8ff); // #7DE8FF (data pulses & excitation)
    const COLOR_CYAN_300 = new THREE.Color(0x5eead4); // #5EEAD4

    const nodeColorPalette = [
      COLOR_BLUE_500,
      COLOR_VIOLET_500,
      COLOR_BLUE_600,
      COLOR_VIOLET_400,
      COLOR_BLUE_500,
      COLOR_VIOLET_500,
    ];

    // 3. Node Generation
    const nodes: NexusNode[] = [];
    const spreadX = isMobile ? 65 : 105;
    const spreadY = isMobile ? 48 : 62;
    const spreadZ = 45;

    // Hub node anchor positions
    const hubAnchors: [number, number, number][] = [
      [-28, 14, 5],
      [28, 12, -8],
      [-22, -15, -10],
      [26, -14, 8],
      [0, 18, -4],
    ];

    for (let i = 0; i < nodeCount; i++) {
      const isHub = i < hubCount;
      let pos: THREE.Vector3;
      let size: number;
      let color: THREE.Color;

      if (isHub) {
        const anchor = hubAnchors[i % hubAnchors.length];
        pos = new THREE.Vector3(
          anchor[0] + (Math.random() - 0.5) * 6,
          anchor[1] + (Math.random() - 0.5) * 6,
          anchor[2] + (Math.random() - 0.5) * 4
        );
        size = 2.4 + Math.random() * 0.8;
        color = i % 2 === 0 ? COLOR_VIOLET_500 : COLOR_BLUE_500;
      } else {
        // Distribute satellites, biased slightly towards peripheral depth for great framing
        const angle = Math.random() * Math.PI * 2;
        const radiusX = (0.2 + Math.random() * 0.8) * (spreadX / 2);
        const radiusY = (0.2 + Math.random() * 0.8) * (spreadY / 2);

        pos = new THREE.Vector3(
          Math.cos(angle) * radiusX,
          Math.sin(angle) * radiusY,
          (Math.random() - 0.5) * spreadZ
        );
        size = 0.75 + Math.random() * 0.85;
        color = nodeColorPalette[i % nodeColorPalette.length];
      }

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * (isHub ? 0.025 : 0.065) * speed,
        (Math.random() - 0.5) * (isHub ? 0.025 : 0.065) * speed,
        (Math.random() - 0.5) * 0.03 * speed
      );

      nodes.push({
        position: pos.clone(),
        velocity: vel,
        basePosition: pos.clone(),
        color,
        baseSize: size,
        currentSize: size,
        isHub,
        pulseEnergy: 0,
      });
    }

    // 4. InstancedMesh for Node Cores
    const nodeGeo = new THREE.IcosahedronGeometry(1.0, 2);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: Math.min(1.0, opacity * 0.95),
    });
    const nodeInstancedMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    const dummy = new THREE.Object3D();

    // InstancedMesh for Node Corona Halos (Soft tech glow around nodes)
    const haloGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: Math.min(0.35, opacity * 0.4),
      blending: THREE.AdditiveBlending,
      wireframe: true,
    });
    const haloInstancedMesh = new THREE.InstancedMesh(haloGeo, haloMat, nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      dummy.position.copy(nodes[i].position);
      dummy.scale.setScalar(nodes[i].baseSize);
      dummy.updateMatrix();

      nodeInstancedMesh.setMatrixAt(i, dummy.matrix);
      nodeInstancedMesh.setColorAt(i, nodes[i].color);

      dummy.scale.setScalar(nodes[i].baseSize * 1.55);
      dummy.updateMatrix();
      haloInstancedMesh.setMatrixAt(i, dummy.matrix);
      haloInstancedMesh.setColorAt(i, nodes[i].color);
    }
    nodeInstancedMesh.instanceMatrix.needsUpdate = true;
    if (nodeInstancedMesh.instanceColor) nodeInstancedMesh.instanceColor.needsUpdate = true;
    haloInstancedMesh.instanceMatrix.needsUpdate = true;
    if (haloInstancedMesh.instanceColor) haloInstancedMesh.instanceColor.needsUpdate = true;

    scene.add(nodeInstancedMesh);
    scene.add(haloInstancedMesh);

    // 5. Hub Orbital Wireframe Rings (Futuristic Nexus Hub Accent)
    const hubRings: THREE.LineLoop[] = [];
    const ringGeo = new THREE.BufferGeometry();
    const ringPoints: THREE.Vector3[] = [];
    const segments = 32;
    for (let s = 0; s <= segments; s++) {
      const theta = (s / segments) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(theta) * 4.2, Math.sin(theta) * 4.2, 0));
    }
    ringGeo.setFromPoints(ringPoints);

    const ringMat = new THREE.LineBasicMaterial({
      color: 0x7de8ff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    for (let h = 0; h < hubCount; h++) {
      const ring = new THREE.LineLoop(ringGeo, ringMat);
      ring.position.copy(nodes[h].position);
      ring.rotation.x = Math.PI / 3 + h * 0.4;
      ring.rotation.y = h * 0.5;
      scene.add(ring);
      hubRings.push(ring);
    }

    // 6. Dynamic Synapse Connection Lines
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: Math.min(0.75, opacity * 0.8),
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    // Active connection pairs cache for data packet dispatch
    interface ConnectionPair {
      nodeA: number;
      nodeB: number;
      dist: number;
    }
    let activeConnections: ConnectionPair[] = [];

    // 7. Live Data Packet Pulses
    const dataPulses: DataPulse[] = [];
    for (let p = 0; p < pulseCount; p++) {
      dataPulses.push({
        startNode: 0,
        targetNode: 1,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.015 * speed,
        active: false,
        color: Math.random() > 0.3 ? COLOR_CYAN_400 : COLOR_CYAN_300,
      });
    }

    // InstancedMesh for Data Pulses (Glowing energy packets)
    const pulseGeo = new THREE.SphereGeometry(0.75, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const pulseInstancedMesh = new THREE.InstancedMesh(pulseGeo, pulseMat, pulseCount);
    for (let p = 0; p < pulseCount; p++) {
      dummy.position.set(0, -9999, 0); // Hide initially
      dummy.scale.setScalar(0.001);
      dummy.updateMatrix();
      pulseInstancedMesh.setMatrixAt(p, dummy.matrix);
      pulseInstancedMesh.setColorAt(p, dataPulses[p].color);
    }
    pulseInstancedMesh.instanceMatrix.needsUpdate = true;
    if (pulseInstancedMesh.instanceColor) pulseInstancedMesh.instanceColor.needsUpdate = true;
    scene.add(pulseInstancedMesh);

    // 8. Desktop Mouse Parallax & Cursor Proximity
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
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Intersection Observer (Pause when offscreen)
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

    // 10. Animation & Render Loop
    let animationFrameId: number;
    let clock = 0;
    const tempPulsePos = new THREE.Vector3();

    const renderLoop = () => {
      if (!renderer) return;

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      clock += prefersReducedMotion ? 0 : 0.016;

      // Smooth camera parallax
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;

      camera.position.x = mouseX * 14;
      camera.position.y = -mouseY * 9;
      camera.lookAt(0, 0, 0);

      // Rotate Hub Rings
      if (!prefersReducedMotion) {
        for (let h = 0; h < hubRings.length; h++) {
          const ring = hubRings[h];
          ring.position.copy(nodes[h].position);
          ring.rotation.z = clock * (0.35 + h * 0.1);
          ring.rotation.x = Math.PI / 3 + Math.sin(clock * 0.5 + h) * 0.2;
        }
      }

      // Update Nodes (Drift, pulse decay, scale breathing)
      if (!prefersReducedMotion) {
        for (let i = 0; i < nodeCount; i++) {
          const node = nodes[i];

          // Harmonic float motion
          node.position.add(node.velocity);

          // Bounce within bounding volume
          const boundX = spreadX / 2;
          const boundY = spreadY / 2;
          const boundZ = spreadZ / 2;

          if (Math.abs(node.position.x) > boundX) {
            node.velocity.x *= -1;
            node.position.x = Math.sign(node.position.x) * boundX;
          }
          if (Math.abs(node.position.y) > boundY) {
            node.velocity.y *= -1;
            node.position.y = Math.sign(node.position.y) * boundY;
          }
          if (Math.abs(node.position.z) > boundZ) {
            node.velocity.z *= -1;
            node.position.z = Math.sign(node.position.z) * boundZ;
          }

          // Pulse excitation decay
          if (node.pulseEnergy > 0.01) {
            node.pulseEnergy *= 0.92;
          } else {
            node.pulseEnergy = 0;
          }

          // Depth-based scaling: nodes closer to camera are crisply larger
          const depthFactor = THREE.MathUtils.mapLinear(node.position.z, -boundZ, boundZ, 0.75, 1.25);
          const breathing = 0.92 + 0.08 * Math.sin(clock * 1.8 + i * 1.3);
          const excitation = 1 + node.pulseEnergy * 0.7;

          node.currentSize = node.baseSize * depthFactor * breathing * excitation;

          dummy.position.copy(node.position);
          dummy.scale.setScalar(node.currentSize);
          dummy.updateMatrix();
          nodeInstancedMesh.setMatrixAt(i, dummy.matrix);

          // Outer halo follows with scaled corona
          dummy.scale.setScalar(node.currentSize * (node.isHub ? 1.8 : 1.5));
          dummy.updateMatrix();
          haloInstancedMesh.setMatrixAt(i, dummy.matrix);
        }

        nodeInstancedMesh.instanceMatrix.needsUpdate = true;
        haloInstancedMesh.instanceMatrix.needsUpdate = true;
      }

      // Compute Synapses (Connections)
      activeConnections = [];
      let lineIndex = 0;
      const posAttr = lineGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = lineGeo.attributes.color as THREE.BufferAttribute;

      // Always connect Hubs to nearest neighbors
      for (let i = 0; i < nodeCount && lineIndex < maxConnections; i++) {
        for (let j = i + 1; j < nodeCount && lineIndex < maxConnections; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          const maxDist = nodes[i].isHub || nodes[j].isHub ? connectionDistance * 1.25 : connectionDistance;

          if (dist < maxDist) {
            const idx = lineIndex * 6;

            posAttr.setXYZ(idx, nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
            posAttr.setXYZ(idx + 1, nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);

            const strength = 1 - dist / maxDist;
            const boost = nodes[i].pulseEnergy + nodes[j].pulseEnergy;
            const alpha = Math.min(1.0, (0.25 + strength * 0.55 + boost * 0.4) * (opacity * 0.9));

            // Vertex colors with brand blue-600 / cyan highlights
            colAttr.setXYZ(
              idx,
              (nodes[i].color.r * 0.6 + COLOR_CYAN_400.r * 0.4 * boost) * alpha,
              (nodes[i].color.g * 0.6 + COLOR_CYAN_400.g * 0.4 * boost) * alpha,
              (nodes[i].color.b * 0.6 + COLOR_CYAN_400.b * 0.4 * boost) * alpha
            );
            colAttr.setXYZ(
              idx + 1,
              (nodes[j].color.r * 0.6 + COLOR_CYAN_400.r * 0.4 * boost) * alpha,
              (nodes[j].color.g * 0.6 + COLOR_CYAN_400.g * 0.4 * boost) * alpha,
              (nodes[j].color.b * 0.6 + COLOR_CYAN_400.b * 0.4 * boost) * alpha
            );

            activeConnections.push({ nodeA: i, nodeB: j, dist });
            lineIndex++;
          }
        }
      }

      // Blank unused line slots
      for (let k = lineIndex; k < maxConnections; k++) {
        const idx = k * 6;
        posAttr.setXYZ(idx, 0, 0, 0);
        posAttr.setXYZ(idx + 1, 0, 0, 0);
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Update Live Data Packet Pulses
      if (!prefersReducedMotion && activeConnections.length > 0) {
        for (let p = 0; p < pulseCount; p++) {
          const pulse = dataPulses[p];

          if (!pulse.active) {
            // Assign a random active connection to this pulse
            const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
            pulse.startNode = Math.random() > 0.5 ? conn.nodeA : conn.nodeB;
            pulse.targetNode = pulse.startNode === conn.nodeA ? conn.nodeB : conn.nodeA;
            pulse.progress = 0;
            pulse.speed = (0.012 + Math.random() * 0.02) * speed;
            pulse.active = true;
          }

          pulse.progress += pulse.speed;

          if (pulse.progress >= 1.0) {
            // Reached destination node -> excite it!
            if (nodes[pulse.targetNode]) {
              nodes[pulse.targetNode].pulseEnergy = 1.0;
            }

            // Recycle pulse
            pulse.active = false;
            dummy.position.set(0, -9999, 0);
            dummy.scale.setScalar(0.001);
            dummy.updateMatrix();
            pulseInstancedMesh.setMatrixAt(p, dummy.matrix);
          } else {
            // Interpolate position along synapse connection
            const startPos = nodes[pulse.startNode]?.position || nodes[0].position;
            const targetPos = nodes[pulse.targetNode]?.position || nodes[1].position;
            tempPulsePos.lerpVectors(startPos, targetPos, pulse.progress);

            const pulseScale = (0.85 + Math.sin(pulse.progress * Math.PI) * 0.6) * 1.35;
            dummy.position.copy(tempPulsePos);
            dummy.scale.setScalar(pulseScale);
            dummy.updateMatrix();
            pulseInstancedMesh.setMatrixAt(p, dummy.matrix);
          }
        }
        pulseInstancedMesh.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    // Execute first frame
    renderLoop();

    // 11. Cleanup Resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
      if (interactive && !isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);

      nodeGeo.dispose();
      nodeMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();

      hubRings.forEach((r) => scene.remove(r));

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [density, interactive, speed, opacity, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    />
  );
};
