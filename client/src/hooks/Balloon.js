import balloonImageSrc from '../assets/img/globo_artistico_1_n.png';
export default class Balloon {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
  
      this.balloonImage = new Image();
      this.balloonImage.src = balloonImageSrc;
  
      this.balloonImage.onload = () => {
        this.x = this.randomPosition(); // Posición X inicial del globo
        this.y = this.canvas.height + 100; // Posición Y inicial (fuera de la pantalla)
        this.speedY = Math.random() * 2 + 1; // Velocidad aleatoria de subida
        this.speedX = (Math.random() * 2 - 1) * 0.5; // Velocidad aleatoria en X (lateral)
        this.directionChange = Math.random() * 200 + 50; // Cambio de dirección en X cada cierta distancia
        this.distanceMoved = 0;
      };
  
      this.balloonImage.onerror = () => {
        console.error("No se pudo cargar la imagen del globo.");
      };
    }
  
    randomPosition() {
      return Math.random() * (this.canvas.width - 100); // Posición aleatoria en X
    }
  
    drawBalloon() {
      this.ctx.drawImage(this.balloonImage, this.x, this.y, 100, 100); // Dibujar globo
    }
  
    updatePosition() {
      this.y -= this.speedY; // El globo sube en Y
      this.x += this.speedX; // El globo se desplaza en X
  
      // Cambio de dirección del viento (X) después de cierta distancia
      this.distanceMoved += this.speedY;
      if (this.distanceMoved >= this.directionChange) {
        this.speedX = (Math.random() * 2 - 1) * 0.5; // Cambiar dirección aleatoriamente
        this.distanceMoved = 0; // Reiniciar contador de distancia
        this.directionChange = Math.random() * 200 + 50; // Nueva distancia para cambiar dirección
      }
  
      // Reiniciar cuando el globo sale de la pantalla
      if (this.y < -100) {
        this.y = this.canvas.height + 100; // Reinicia la posición en Y
        this.x = this.randomPosition(); // Nueva posición X
        this.speedY = Math.random() * 2 + 1; // Nueva velocidad de subida
        this.speedX = (Math.random() * 2 - 1) * 0.5; // Nueva velocidad lateral
      }
  
      // Asegurarse de que el globo no salga por los bordes en X
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x > this.canvas.width - 100) {
        this.x = this.canvas.width - 100;
      }
    }
  }
  