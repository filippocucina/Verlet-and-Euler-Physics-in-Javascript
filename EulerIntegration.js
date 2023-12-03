//Euler Integration
//The bigger the time step is, the bigger error we get. 
//Remember those wide slices in the previous discussion 
//about integration, when we were talking about calculating 
//the area under the function.

class Particle {
    constructor() { 
        this.position = 0.0;
        this.velocity = 0.0;
        this.mass = 1.0;
    }
}

function main() {
    let particle = new Particle();

    let force = 10.0;
    let acceleration = force / particle.mass;

    let time = 0.0;
    let deltaTime = 1.0

    while (time <= 10.0) {
        console.log(particle.velocity += acceleration * deltaTime)
        console.log(particle.position += particle.velocity * deltaTime)

        time += deltaTime
    }
}