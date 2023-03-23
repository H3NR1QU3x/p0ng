function startGame() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballSpeedX = 5;
  let ballSpeedY = 5;



  const ballRadius = 10;
  const paddleHeight = 100;
  const paddleWidth = 10;

  let paddle1Y = canvas.height / 2 - paddleHeight / 2;
  let paddle2Y = canvas.height / 2 - paddleHeight / 2;

  let player1Score = 0;
  let player2Score = 0;

  function aumentarVelocidade() {
    setInterval(function() {
      tempoDeJogo++;
      ballSpeedX *= 1.1; // aumenta a velocidade em 10%
      ballSpeedY *= 1.1; // aumenta a velocidade em 10%
    }, 1000);
  }

  

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
      ballSpeedY = -ballSpeedY;
    }
    


    // chamada para a função checkCollision
    checkCollision();

    aumentarVelocidade();
    
    
  }

  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // inverte a direção da bola
    ballSpeedY = -ballSpeedY; // inverte a direção da bola
    ballSpeedX = 5;
    ballSpeedY = 5;
  }



  function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  function movePaddle1() {
    if (wPressed && paddle1Y > 0) {
      paddle1Y -= 5;
    } else if (sPressed && paddle1Y < canvas.height - paddleHeight) {
      paddle1Y += 5;
    }
  }

  function movePaddle2() {
    if (upPressed && paddle2Y > 0) {
      paddle2Y -= 5;
    } else if (downPressed && paddle2Y < canvas.height - paddleHeight) {
      paddle2Y += 5;
    }
  }

  function drawScores() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);
  }


  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(event) {
    if (event.keyCode == 87) { // tecla W
      wPressed = true;
    } else if (event.keyCode == 83) { // tecla S
      sPressed = true;
    } else if (event.keyCode == 38) { // seta para cima
      upPressed = true;
    } else if (event.keyCode == 40) { // seta para baixo
      downPressed = true;
    }
  }

  function keyUpHandler(event) {
    if (event.keyCode == 87) { // tecla W
      wPressed = false;
    } else if (event.keyCode == 83) { // tecla S
      sPressed = false;
    } else if (event.keyCode == 38) { // seta para cima
      upPressed = false;
    } else if (event.keyCode == 40) { // seta para baixo
      downPressed = false;
    }
  }

  function checkCollision() {
    if (ballX + ballRadius > canvas.width - paddleWidth) {
      if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX; // inverte a direção da bola
      } else {
        player1Score++;
        resetBall();
      }
    } else if (ballX - ballRadius < paddleWidth) {
      if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX; // inverte a direção da bola
      } else {
        player2Score++;
        resetBall();
      }
    }
    
  }

  function hideStartButton() {
    var startButton = document.getElementById("start-button");
    startButton.style.display = "none";
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela a cada frame
    drawBall();
    drawPaddle1();
    drawPaddle2();
    drawScores();
    moveBall();
    movePaddle1();
    movePaddle2();
  }
  
  setInterval(draw,aumentarVelocidade, 10); // Loop principal do jogo

  hideStartButton();

}
