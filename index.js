window.onload = () => {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let score = 0;

    let bricks = [];
    for (let column = 0; column < brickColumnCount; column++) {
        bricks[column] = [];
        for (let row = 0; row < brickRowCount; row++) {
            bricks[column][row] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener('mousemove', mouseMoveHandler, false);

    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }
    function collisionDetection() {
        for (var column = 0; column < brickColumnCount; column++) {
            for (var row = 0; row < brickRowCount; row++) {
                var b = bricks[column][row];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            alert('YOU WIN, CONGRATULATIONS!');
                            document.location.reload();
                            clearInterval(interval);
                        }
                    }
                }
            }
        }
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for (var column = 0; column < brickColumnCount; column++) {
            for (var row = 0; row < brickRowCount; row++) {
                if (bricks[column][row].status == 1) {
                    var brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[column][row].x = brickX;
                    bricks[column][row].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawScore() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '0095DD';
        ctx.fillText('Score: ' + score, 8, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();
        drawScore();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                if (y = y - paddleHeight) {
                    dy = -dy;
                }
            }
            else {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
    }

    var interval = setInterval(draw, 10);
}