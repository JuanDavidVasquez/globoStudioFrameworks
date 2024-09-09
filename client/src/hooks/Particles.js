// PointerParticle.js
export default class PointerParticle {
    constructor(spread, speed, component) {
      const { ctx, pointer, hue } = component;
      this.ctx = ctx;
      this.x = pointer.x; // Posición inicial en X basada en el cursor
      this.y = pointer.y; // Posición inicial en Y basada en el cursor
      this.size = Math.random() + 1;
      this.decay = 0.01;
      this.speed = speed * 0.08;
      this.spread = spread * this.speed;
      // Reduce la influencia del movimiento del mouse sobre el desplazamiento
      this.spreadX = (Math.random() - 0.5) * this.spread;
      this.spreadY = (Math.random() - 0.5) * this.spread;
      this.color = `hsl(${hue}deg 90% 60%)`;
    }
  
    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  
    collapse() {
      this.size -= this.decay;
    }
  
    trail() {
      this.x += this.spreadX * this.size;
      this.y += this.spreadY * this.size;
    }
  
    update() {
      this.draw();
      this.trail();
      this.collapse();
    }
  }
  