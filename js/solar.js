var canvas = document.getElementById('canvas');
canvas.width = $( window ).width();
canvas.height = $( window ).height();

var ctx = canvas.getContext('2d');
var amp = 0;
var canBackward = 0;
var sinCount = 6;
var rotate = 0;

var planet = function (borderColor, fillColor, radius, x, y, amp, sinCount, rotate) {
    ctx.lineWidth = 7;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = fillColor;

    for (var i = 0; i < 361; i++) {
        var angle = i * Math.PI / 180;
        var cx = x + (radius + amp * Math.sin(sinCount * angle)) * Math.cos(angle + rotate);
        var cy = y + (radius + amp * Math.sin(sinCount * angle)) * Math.sin(angle + rotate);

        ctx.lineTo(cx, cy, 1, 1);
    }


    ctx.fill();
    ctx.stroke();
}

var getPlanetRadius = function (index) {
    return 120 + (70 * index);
}

var stars = [];

for (var i = 0; i < 500; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;

    stars.push({
        x: x,
        y: y,
        size: Math.max(Math.random(), .2),
        radius: Math.PI * 180,
        color: 'rgba(255, 255, 255, ' + Math.random().toFixed("1") + ')'
    });
}

var drawStars = function () {
    for (var i = 0; i < stars.length; i++) {
        var star = stars[i];

        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.arc(star.x, star.y, star.size, star.size, star.radius);
        ctx.fill();
        ctx.closePath();
    }
}

var sun = function () {
    if (amp > 1 && !canBackward) {
        canBackward = true;
    }

    if (amp < -1 && canBackward) {
        canBackward = false;
    }

    if (canBackward) {
        amp -= .01;
    } else {
        amp += .01;
    }
    rotate += .005;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();

    // Arcs
    // Mercury
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, .4)';
    ctx.arc(canvas.width / 2, canvas.height / 2, (getPlanetRadius(0)), (getPlanetRadius(0)), (Math.PI * 180));
    ctx.stroke();
    ctx.closePath();

    // Venus
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
    ctx.arc(canvas.width / 2, canvas.height / 2, (getPlanetRadius(1)), (getPlanetRadius(1)), (Math.PI * 180));
    ctx.stroke();
    ctx.closePath();

    // Earth
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
    ctx.arc(canvas.width / 2, canvas.height / 2, (getPlanetRadius(2)), (getPlanetRadius(2)), (Math.PI * 180));
    ctx.stroke();
    ctx.closePath();

    // Mars
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
    ctx.arc(canvas.width / 2, canvas.height / 2, (getPlanetRadius(3.5)), (getPlanetRadius(3.5)), (Math.PI * 180));
    ctx.stroke();
    ctx.closePath();

    // Jupiter
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, .07)';
    ctx.arc(canvas.width / 2, canvas.height / 2, (getPlanetRadius(6)), (getPlanetRadius(6)), (Math.PI * 180));
    ctx.stroke();
    ctx.closePath();
    // End Arc

    // Sun
    ctx.beginPath();
    planet('#FFB833', '#FFE033', 80, canvas.width / 2, canvas.height / 2, amp, sinCount, rotate);
    ctx.closePath();

    // Mercury
    ctx.beginPath();
    planet('#F29021', '#F2A921', 15, canvas.width / 2 + Math.cos(rotate * 5) * (getPlanetRadius(0)), canvas.height / 2 + Math.sin(rotate * 5) * (getPlanetRadius(0)), amp, sinCount, rotate);
    ctx.closePath();

    // Venus
    ctx.beginPath();
    planet('#FFC079', '#FFCA8F', 18, canvas.width / 2 + Math.cos(rotate * 4) * (getPlanetRadius(1)), canvas.height / 2 + Math.sin(rotate * 4) * (getPlanetRadius(1)), amp, sinCount, rotate);
    ctx.closePath();

    var earthX = canvas.width / 2 + Math.cos(rotate * 2) * (getPlanetRadius(2));
    var earthY = canvas.height / 2 + Math.sin(rotate * 2) * (getPlanetRadius(2));

    // Earth
    ctx.beginPath();
    planet('#0E74FF', '#378CFF', 25, earthX, earthY, amp, sinCount, rotate);
    ctx.closePath();

    // Earth moon
    ctx.beginPath();
    planet('#EEEEEE', 'white', 5, earthX + (50 * Math.cos(rotate * 4)), earthY + (50 * Math.sin(rotate * 4)), amp, sinCount, rotate);
    ctx.closePath();

    // Mars
    ctx.beginPath();
    planet('#F74343', '#F56868', 25, canvas.width / 2 + Math.cos(rotate * 1.5) * (getPlanetRadius(3.5)), canvas.height / 2 + Math.sin(rotate * 1.5) * (getPlanetRadius(3.5)), amp, sinCount, rotate);
    ctx.closePath();

    // Jupiter
    ctx.beginPath();
    planet('#9D5708', '#BD7019', 60, canvas.width / 2 + Math.cos(rotate * 1.5) * (getPlanetRadius(6)), canvas.height / 2 + Math.sin(rotate * 1.5) * (getPlanetRadius(6)), amp, sinCount, rotate);
    ctx.closePath();

    requestAnimationFrame(sun);
};

requestAnimationFrame(sun);