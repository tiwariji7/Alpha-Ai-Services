import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ProcessTimelineCanvasProps {
  stepCount: number;
  scrollProgress: number; // 0.0 to 1.0
  isMobile?: boolean;
  className?: string;
  prefersReducedMotion?: boolean;
}

export const ProcessTimelineCanvas: React.FC<ProcessTimelineCanvasProps> = ({
  stepCount,
  scrollProgress,
  isMobile = false,
  className = '',
  prefersReducedMotion = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(scrollProgress);
  progressRef.current = scrollProgress;

  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 1200;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const aspect = width / height;

    // Use orthographic camera for exact alignment with HTML elements
    const viewSize = 100;
    const camera = new THREE.OrthographicCamera(
      (-viewSize * aspect) / 2,
      (viewSize * aspect) / 2,
      viewSize / 2,
      -viewSize / 2,
      0.1,
      1000
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Generate S-Curve Spline Points connecting step nodes
    const curvePoints: THREE.Vector3[] = [];
    const topY = viewSize * 0.44;
    const bottomY = -viewSize * 0.44;
    const yStep = (topY - bottomY) / Math.max(stepCount - 1, 1);

    const xAmplitude = isMobile ? viewSize * 0.28 : viewSize * 0.22;

    for (let i = 0; i < stepCount; i++) {
      const y = topY - i * yStep;
      // In desktop, alternate left (-x) and right (+x)
      // In mobile, single column with gentle rhythmic curve
      let x = 0;
      if (isMobile) {
        x = -xAmplitude; // Aligned with the left icon column
      } else {
        const isLeft = i % 2 === 0;
        x = isLeft ? -xAmplitude : xAmplitude;
      }

      // Add start lead-in
      if (i === 0) {
        curvePoints.push(new THREE.Vector3(x, y + 4, 0));
      }

      curvePoints.push(new THREE.Vector3(x, y, 0));

      // Add intermediate bend point to make S-curve smooth between alternating steps
      if (i < stepCount - 1) {
        const nextY = topY - (i + 1) * yStep;
        const midY = (y + nextY) / 2;
        if (!isMobile) {
          // Cross through center with gentle S curvature
          curvePoints.push(new THREE.Vector3(0, midY, 1.5));
        } else {
          curvePoints.push(new THREE.Vector3(x + 1.5, midY, 0.5));
        }
      }

      // Add end lead-out
      if (i === stepCount - 1) {
        curvePoints.push(new THREE.Vector3(x, y - 4, 0));
      }
    }

    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);

    // 3. Tube Geometry
    const tubularSegments = Math.max(stepCount * 28, 90);
    const radius = isMobile ? 0.75 : 0.95;
    const radialSegments = 12;
    const tubeGeometry = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false);

    // 4. Custom Glow Shader Material
    const tubeShader = {
      uniforms: {
        uProgress: { value: prefersReducedMotion ? 1.0 : progressRef.current },
        uColorStart: { value: new THREE.Color('#3B4FD9') }, // Royal Blue
        uColorEnd: { value: new THREE.Color('#7B5CE8') },   // Violet
        uPulsePos: { value: 0.0 },
        uPulseColor: { value: new THREE.Color('#7DE8FF') }, // Cyan Accent
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uProgress;
        uniform vec3 uColorStart;
        uniform vec3 uColorEnd;
        uniform float uPulsePos;
        uniform vec3 uPulseColor;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          // Progress reveal check
          if (vUv.x > uProgress) {
            discard;
          }

          vec3 viewDir = normalize(vViewPosition);
          float fresnel = 1.0 - max(dot(vNormal, viewDir), 0.0);
          fresnel = pow(fresnel, 2.0);

          // Gradient interpolation from Start to End
          vec3 baseColor = mix(uColorStart, uColorEnd, vUv.x);

          // Subtle dimensional tube shading
          float light = dot(vNormal, normalize(vec3(0.3, 0.5, 1.0))) * 0.35 + 0.65;
          vec3 finalColor = baseColor * light + (uColorEnd * fresnel * 0.4);

          // Traveling glowing pulse wave along tube
          float distToPulse = abs(vUv.x - uPulsePos);
          if (distToPulse < 0.05 && uPulsePos <= uProgress) {
            float pulseGlow = (1.0 - distToPulse / 0.05);
            finalColor = mix(finalColor, uPulseColor, pulseGlow * 0.85);
            finalColor += uPulseColor * pulseGlow * 0.4;
          }

          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
    };

    const tubeMaterial = new THREE.ShaderMaterial({
      uniforms: tubeShader.uniforms,
      vertexShader: tubeShader.vertexShader,
      fragmentShader: tubeShader.fragmentShader,
      transparent: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    });

    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    // 5. Traveling Pulse 3D Glowing Particle
    const pulseGeometry = new THREE.SphereGeometry(radius * 1.5, 16, 16);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0x7de8ff,
      transparent: true,
      opacity: 0.9,
    });
    const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulseMesh.visible = false;
    scene.add(pulseMesh);

    // Outer subtle halo around pulse
    const haloGeometry = new THREE.SphereGeometry(radius * 2.6, 16, 16);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b4fd9,
      transparent: true,
      opacity: 0.35,
    });
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
    haloMesh.visible = false;
    scene.add(haloMesh);

    // 6. Animation Loop & Resize
    let animationFrameId: number;
    let pulseT = 0;

    const animate = () => {
      if (isVisibleRef.current && renderer) {
        const currentProgress = prefersReducedMotion ? 1.0 : progressRef.current;
        tubeMaterial.uniforms.uProgress.value = Math.max(0.01, Math.min(1.0, currentProgress));

        if (!prefersReducedMotion && currentProgress > 0.05) {
          pulseT = (pulseT + 0.006) % currentProgress;
          tubeMaterial.uniforms.uPulsePos.value = pulseT;

          // Position glowing 3D sphere at pulse position
          try {
            const point = curve.getPointAt(pulseT);
            pulseMesh.position.copy(point);
            pulseMesh.position.z += 0.5;
            haloMesh.position.copy(point);
            haloMesh.position.z += 0.5;
            pulseMesh.visible = true;
            haloMesh.visible = true;
          } catch {
            pulseMesh.visible = false;
            haloMesh.visible = false;
          }
        } else {
          pulseMesh.visible = false;
          haloMesh.visible = false;
        }

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || 800;
      const newHeight = container.clientHeight || 1200;
      const newAspect = newWidth / newHeight;

      camera.left = (-viewSize * newAspect) / 2;
      camera.right = (viewSize * newAspect) / 2;
      camera.top = viewSize / 2;
      camera.bottom = -viewSize / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Intersection Observer for pausing animation when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { rootMargin: '150px' }
    );
    intersectionObserver.observe(container);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      tubeGeometry.dispose();
      tubeMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [stepCount, isMobile, prefersReducedMotion]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none -z-0 overflow-hidden ${className}`}
    />
  );
};
