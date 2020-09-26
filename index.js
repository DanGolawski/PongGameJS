window.onload = () => {

    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext('2d');
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 1;
    let dy = -1;

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        x += dx;
        y += dy;
    }

    setInterval(draw, 10);
}

// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls