import { useEffect, useRef } from "react";

// PURE, HIGH-CONTRAST COLORS
const COLORS = ["#ff0000", "#ff8c00", "#ff00c8"]; 
// red, orange, pink

export default function NeuronBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initParticles();
    });

    // INCREASED PARTICLE COUNTS
    const layers = [
      { count: 150, speed: 0.15, blur: 10 }, // back
      { count: 110, speed: 0.35, blur: 5 },  // mid
      { count: 75, speed: 0.75, blur: 0 }    // front
    ];

    let particles = [];

    class Particle {
      constructor(speed, blur) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;

        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;

        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

        this.size = 3.2; // increased size
        this.blur = blur;
      }

      draw() {
        ctx.beginPath();

        // STRONGER GLOW
        ctx.shadowBlur = 22 + this.blur;
        ctx.shadowColor = this.color;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          this.x -= dx / 18;
          this.y -= dy / 18;
        }

        this.draw();
      }
    }

    function initParticles() {
      particles = [];

      layers.forEach((layer) => {
        for (let i = 0; i < layer.count; i++) {
          particles.push(new Particle(layer.speed, layer.blur));
        }
      });
    }

    function connectLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.lineWidth = 1;

            // SOFTER LINES SO DOT COLORS STAND OUT MORE
            ctx.strokeStyle = "rgba(255, 80, 120, 0.20)";

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      // LIGHT BLUE BACKGROUND
      ctx.fillStyle = "#dff1ff"; 
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => p.update());
      connectLines();

      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    ></canvas>
  );
}
