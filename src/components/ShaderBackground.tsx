"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;
varying vec2  v_texCoord;

// ── Gradient noise (smoother than value noise) ──────────────
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // quintic
  return mix(
    mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
}

// ── FBM — 5 octaves, rotated to break grid alignment ────────
mat2 ROT2 = mat2(0.8660254, 0.5, -0.5, 0.8660254); // 30°
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * gnoise(p);
    p  = ROT2 * p * 2.1;
    a *= 0.48;
  }
  return v;
}

// ── Palette ──────────────────────────────────────────────────
vec3 palette(float t) {
  vec3 cream     = vec3(0.976, 0.976, 0.953); // #f9faf3
  vec3 sage      = vec3(0.827, 0.894, 0.808); // light sage
  vec3 cardamom  = vec3(0.231, 0.412, 0.224); // #3b6939
  vec3 deep      = vec3(0.133, 0.314, 0.137); // #225023
  vec3 warm      = vec3(0.871, 0.851, 0.761); // warm cream

  if (t < 0.25) return mix(cream,    sage,     t * 4.0);
  if (t < 0.50) return mix(sage,     warm,    (t - 0.25) * 4.0);
  if (t < 0.75) return mix(warm,     cardamom,(t - 0.50) * 4.0);
                return mix(cardamom, deep,    (t - 0.75) * 4.0);
}

void main() {
  vec2 uv  = v_texCoord;
  vec2 asp = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p   = uv * asp;
  float t  = u_time * 0.07;

  // Mouse parallax — subtle warp toward cursor
  vec2 m = (u_mouse / u_resolution) * asp;
  vec2 toMouse = m - p;
  p += toMouse * 0.04;

  // Domain warping — two layers (Inigo Quilez technique)
  vec2 q = vec2(fbm(p + t),
                fbm(p + vec2(5.2, 1.3)));

  vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.12 * t),
                fbm(p + 4.0 * q + vec2(8.3, 2.8) + 0.10 * t));

  float f = fbm(p + 3.5 * r + t * 0.5);

  // Remap to [0,1] and boost contrast
  f = f * 0.5 + 0.5;
  f = smoothstep(0.1, 0.9, f);

  // Vignette — darker edges ground the page content
  float vignette = 1.0 - 0.45 * dot(uv - 0.5, uv - 0.5) * 3.5;

  vec3 color = palette(f) * vignette;

  // Subtle specular shimmer on peaks
  float peak    = pow(max(0.0, f - 0.7) * 3.3, 3.0);
  color        += vec3(0.95, 1.0, 0.92) * peak * 0.12;

  gl_FragColor  = vec4(color, 1.0);
}`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf: number;
    const mouse = { x: 0, y: 0 };

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    syncSize();

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * canvas!.width;
      mouse.y = (1 - (e.clientY - rect.top) / rect.height) * canvas!.height;
    }
    window.addEventListener("mousemove", onMouseMove);

    function render(t: number) {
      if (!canvas || !gl) return;
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime)  gl.uniform1f(uTime, t * 0.001);
      if (uRes)   gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      aria-hidden="true"
    />
  );
}
