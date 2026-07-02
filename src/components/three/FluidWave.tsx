'use client';

import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ===== CUSTOM SHADERS ===== */
const vertexShader = `
  uniform float uTime;
  uniform float uScrollY;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  // Simplex noise helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Multi-octave wave displacement
    float mouseInfluence = smoothstep(1.5, 0.0, length(uv - uMouse * 0.5 - 0.5));
    
    float wave1 = snoise(vec3(pos.x * 1.2, pos.y * 0.8, uTime * 0.3)) * 0.35;
    float wave2 = snoise(vec3(pos.x * 2.5, pos.y * 1.5, uTime * 0.2 + 10.0)) * 0.15;
    float wave3 = snoise(vec3(pos.x * 4.0, pos.y * 3.0, uTime * 0.15 + 20.0)) * 0.08;
    
    float scrollWave = sin(pos.x * 2.0 + uScrollY * 0.003) * 0.1 * (1.0 + uScrollY * 0.001);
    
    float elevation = wave1 + wave2 + wave3 + scrollWave + mouseInfluence * 0.3;
    pos.z += elevation;
    
    vElevation = elevation;
    vPosition = pos;
    vNormal = normalize(normal + vec3(
      snoise(vec3(pos.x * 3.0, pos.y * 3.0, uTime * 0.2)) * 0.3,
      snoise(vec3(pos.x * 3.0 + 5.0, pos.y * 3.0 + 5.0, uTime * 0.2)) * 0.3,
      1.0
    ));
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorDeep;
  uniform vec3 uColorMid;
  uniform vec3 uColorLight;
  uniform vec3 uColorAccent;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    // Base gradient: deep teal to mint
    vec3 baseColor = mix(uColorDeep, uColorMid, smoothstep(-0.3, 0.3, vElevation));
    baseColor = mix(baseColor, uColorLight, smoothstep(0.1, 0.5, vElevation));
    
    // Fresnel edge glow
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
    baseColor = mix(baseColor, uColorAccent, fresnel * 0.5);
    
    // Subtle iridescence
    float iri = sin(vUv.x * 20.0 + uTime * 0.5) * 0.5 + 0.5;
    baseColor += uColorAccent * iri * 0.05;
    
    // Light refraction simulation
    float specular = pow(max(dot(reflect(-normalize(vec3(1.0, 1.0, 2.0)), vNormal), viewDir), 0.0), 32.0);
    baseColor += vec3(1.0) * specular * 0.15;
    
    // Vignette-like edge darkening
    float vignette = 1.0 - smoothstep(0.3, 0.9, length(vUv - 0.5) * 1.2);
    baseColor *= 0.85 + vignette * 0.15;
    
    // Alpha with soft edges
    float alpha = smoothstep(0.0, 0.15, vUv.y) * smoothstep(0.0, 0.15, 1.0 - vUv.y);
    alpha *= smoothstep(0.0, 0.1, vUv.x) * smoothstep(0.0, 0.1, 1.0 - vUv.x);
    alpha *= 0.85;
    
    gl_FragColor = vec4(baseColor, alpha);
  }
`;

/* ===== WAVE MESH COMPONENT ===== */
function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollY: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorDeep: { value: new THREE.Color('#0A3D3D') },
      uColorMid: { value: new THREE.Color('#2AA6A6') },
      uColorLight: { value: new THREE.Color('#5CC9B5') },
      uColorAccent: { value: new THREE.Color('#7EDCCA') },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.ShaderMaterial;

    // Smooth mouse lerp (inertia tracking)
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04;

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uScrollY.value = scrollRef.current;
    material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.35, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[viewport.width * 1.6, viewport.height * 1.6, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function FluidWave() {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const checkWebGL = useCallback(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setIsWebGLSupported(false);
        return;
      }
      // Check for low-end devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      if (isMobile && window.innerWidth < 768) {
        setIsWebGLSupported(false);
      }
    } catch {
      setIsWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    checkWebGL();
  }, [checkWebGL]);

  if (!isMounted) {
    return <div className="gradient-fallback absolute inset-0" />;
  }

  if (!isWebGLSupported) {
    return (
      <div className="absolute inset-0 gradient-fallback">
        {/* Animated floating orbs as CSS fallback */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(42,166,166,0.3), transparent)',
            top: '10%',
            left: '20%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(92,201,181,0.25), transparent)',
            bottom: '10%',
            right: '10%',
            animationDelay: '2s',
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0" style={{ opacity: 0.9 }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <WaveMesh />
      </Canvas>
    </div>
  );
}
