{% assign colors=site.data.graph.palette.spectral %}

$( function () {

    var e = $( "#anim-particles" )[0];
    var ctx = e.getContext("2d");
    ctx.globalAlpha = 0.5;
    
    var colors = {{ colors | jsonify }};

    function generate() {
        return colors[random( 0, colors.length )];
    };

    function getsize() {
        return e.getBoundingClientRect();
    };

    var cursor = {x: 0.5 * e.width, y: 0.5 * e.height};
    var particlesArray = [];

    generateParticles(200);
    anim();

    addEventListener(
        "mousemove",
        ( v ) => {
            var size = getsize();
            cursor.x = v.clientX - size.x;
            cursor.y = v.clientY - size.y;
        }
    );

    addEventListener(
        "touchmove",
        ( v ) => {
            v.preventDefault();
            var size = getsize();
            cursor.x = v.touches[0].clientX - size.x;
            cursor.y = v.touches[0].clientY - size.y;
        },
        { passive: false }
    );

    addEventListener(
        "resize",
        () => resize()
    );

    function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
        e.width / 2,
        e.height / 2,
        2,
        generate(),
        0.1
        );
    };
    };

    function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    };
    return finalHexString;
    };

    function resize() {
    var size = getsize();
    e.height = 750;
    e.width = size.width
    };

    function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.theta = Math.random() * Math.PI * 2;
    this.rotateSpeed = rotateSpeed;
    this.t = Math.random() * 150;

    this.rotate = () => {
            const p = {
            x: this.x,
            y: this.y,
            };
            this.theta += this.rotateSpeed;
            this.x = cursor.x + Math.cos(this.theta) * this.t;
            this.y = cursor.y + Math.sin(this.theta) * this.t;
            ctx.beginPath();
            ctx.lineWidth = this.particleTrailWidth;
            ctx.strokeStyle = this.strokeColor;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        };
    };

    function anim () {
        requestAnimationFrame( anim );
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, e.width, e.height);
        particlesArray.forEach(
            (particle) => particle.rotate()
        );
    };    

    anim();

} );