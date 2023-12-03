
//Still not finished. Tomorrow will be finished!
//Verlet Integration!
class Particle {
    constructor(x, y, mass) {
        this.x = x;
        this.y = y;
        this.prevx = x;
        this.prevy = y;
        this.mass = mass;
    }
}

class Stick {
    constructor(p1, p2, length) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = length;
    }
}

let particles = [];
let sticks = [];

function getDistance(p1, p2) {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function getLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

function getDifference(p1, p2) {
    return {
        x: p1.x - p2.x,
        y: p1.y - p2.y
    };
}

function keepInsideView(particle) {
    if (particle.y >= height)
        particle.y = height;
    if (particle.x >= width)
        particle.x = width;
    if (particle.y < 0)
        particle.y = 0;
    if (particle.x < 0)
        particle.x = 0;
}

function setup() {
    createCanvas(500, 400);

    // Add four particles
    let pA = new Particle(220, 20, 10000);
    let pB = new Particle(280, 20, 10000);
    let pC = new Particle(280, 60, 10000);
    let pD = new Particle(220, 60, 10000);
    particles.push(pA, pB, pC, pD);

    // Add four stick constraints between particles
    let stickAB = new Stick(pA, pB, getDistance(pA, pB));
    let stickBC = new Stick(pB, pC, getDistance(pB, pC));
    let stickCD = new Stick(pC, pD, getDistance(pC, pD));
    let stickDA = new Stick(pD, pA, getDistance(pD, pA));
    let stickAC = new Stick(pA, pC, getDistance(pA, pC));
    let stickBD = new Stick(pB, pD, getDistance(pB, pD));
    sticks.push(stickAB, stickBC, stickCD, stickDA, stickAC, stickBD);
}

function update() {
    // Update particle position using Verlet integration
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i]

        let force = { x: 0.0, y: 0.5 };

        let acceleration = { x: force.x / particle.mass, y: force.y / particle.mass };

        let prevPosition = { x: particle.x, y: particle.y };

        particle.x = 2 * particle.x - particle.prevx + acceleration.x * (deltaTime * deltaTime);
        particle.y = 2 * particle.y - particle.prevy + acceleration.y * (deltaTime * deltaTime);

        particle.prevx = prevPosition.x;
        particle.prevy = prevPosition.y;

        keepInsideView(particle);
    }

    // Apply stick constraint to particles
    for (let i = 0; i < sticks.length; i++) {
        let stick = sticks[i];

        let diff = getDifference(stick.p1, stick.p2);
        let diffFactor = (stick.length - getLength(diff)) / getLength(diff) * 0.5;
        let offset = { x: diff.x * diffFactor, y: diff.y * diffFactor };

        stick.p1.x += offset.x;
        stick.p1.y += offset.y;
        stick.p2.x -= offset.x;
        stick.p2.y -= offset.y;
    }
}

function draw() {
    background(0);

    update();

    for (let i = 0; i < particles.length; i++) {
        circle(particles[i].x, particles[i].y, 10);
    }

    for (let i = 0; i < sticks.length; i++) {
        stroke("white");
        line(sticks[i].p1.x, sticks[i].p1.y, sticks[i].p2.x, sticks[i].p2.y);
    }
}