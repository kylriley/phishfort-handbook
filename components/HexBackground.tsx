'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Hexagon {
  x: number;
  y: number;
  baseOpacity: number;
  opacity: number;
  targetOpacity: number;
}

export function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexagonsRef = useRef<Hexagon[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Hexagon dimensions - pointy-top hexagon
  const hexRadius = 30;
  const hexWidth = hexRadius * Math.sqrt(3); // Width of pointy-top hexagon
  const verticalSpacing = hexRadius * 1.5;   // Vertical spacing for honeycomb
  const hoverRadius = 100;

  const drawHexagon = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    opacity: number
  ) => {
    ctx.beginPath();
    // Pointy-top hexagon (starts at top)
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const hx = x + radius * Math.cos(angle);
      const hy = y + radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(hx, hy);
      } else {
        ctx.lineTo(hx, hy);
      }
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);

  const initHexagons = useCallback((width: number, height: number) => {
    const hexagons: Hexagon[] = [];
    const cols = Math.ceil(width / hexWidth) + 2;
    const rows = Math.ceil(height / verticalSpacing) + 2;
    const centerX = width / 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        // Offset odd rows by half hexWidth for honeycomb pattern
        const x = col * hexWidth + (row % 2 === 1 ? hexWidth / 2 : 0);
        const y = row * verticalSpacing;

        // Calculate base opacity based on distance from center (edges are white, center is transparent)
        const distFromCenter = Math.abs(x - centerX);
        const maxDist = width / 2;
        const edgeFade = Math.min(1, distFromCenter / maxDist);
        // Edges: fully white (1.0), Center: fully transparent (0)
        const baseOpacity = edgeFade;

        hexagons.push({
          x,
          y,
          baseOpacity,
          opacity: baseOpacity,
          targetOpacity: baseOpacity,
        });
      }
    }
    return hexagons;
  }, [hexWidth, verticalSpacing]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    hexagonsRef.current.forEach((hex) => {
      // Calculate distance from mouse
      const dx = hex.x - mouseX;
      const dy = hex.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Set target opacity based on distance from mouse, starting from base opacity
      if (distance < hoverRadius) {
        const intensity = 1 - distance / hoverRadius;
        hex.targetOpacity = hex.baseOpacity + intensity * 0.6;
      } else {
        hex.targetOpacity = hex.baseOpacity;
      }

      // Smoothly interpolate opacity
      hex.opacity += (hex.targetOpacity - hex.opacity) * 0.15;

      drawHexagon(ctx, hex.x, hex.y, hexRadius, hex.opacity);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [drawHexagon, hexRadius, hoverRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const updateSize = () => {
      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
      hexagonsRef.current = initHexagons(width, height);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
  }, [initHexagons]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, animate]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 0 }}
    />
  );
}
