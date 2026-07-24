import React, { useRef, useEffect } from 'react';

export default function ARFilterCanvas({ filter = 'none', videoRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (filter === 'cyber') {
        // Draw Cyber Grid Mesh overlay
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1;
        const step = 20;
        for (let x = 0; x < canvas.width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Draw AR HUD Face Target Ring
        const cx = canvas.width / 2;
        const cy = canvas.height / 2 - 10;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 70, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#06b6d4';
        ctx.font = '10px monospace';
        ctx.fillText('TARGET LOCK: ELENA ROSTOVA', cx - 70, cy + 90);

      } else if (filter === 'studio') {
        // Studio Halo Glow Overlay
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 40,
          canvas.width / 2, canvas.height / 2, 160
        );
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

      } else if (filter === 'blur') {
        // Background Blur Ring
        ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(canvas.width / 4, canvas.height / 6, canvas.width / 2, canvas.height / 1.4);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [filter]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
    />
  );
}
