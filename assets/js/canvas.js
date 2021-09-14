function init_canvas () {
    var obj = document.createElement('canvas');
    obj.width = 505;
    obj.height = 660;
    obj.context = obj.getContext("2d");
    return obj;
};

function linear_gradient ( context ) {
    var gradient = context.createLinearGradient(300, 0, 0, 100);
    gradient.addColorStop(0.1, "sienna");
    gradient.addColorStop(0.5, "crimson");
    gradient.addColorStop(0.7, "indianred");
    gradient.addColorStop(1, "royalblue");
    return gradient;
};

function set_cantor ( m ) {
    cantor = document.getElementById("cantor");
    document.getElementById("cantor-partitions").innerHTML = m;        
    cantor.innerHTML = "";
    cantor_object = init_canvas();    
    cantor.appendChild(cantor_object);
    context = cantor_object.context;
    gradient = linear_gradient(context);
    x = 10;
    y = 10;
    l = cantor_object.width - 20;
    n = l * (1 / 3) ** m;
    animate(x, y, l, n);
    function animate (x, y, l, n) {
        if ( l >= n ) {
            context.strokeStyle = gradient;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + l, y);
            context.lineWidth = 5;
            context.stroke();
            y += 20;
            animate(x, y, l / 3, n);
            animate(x + l * 2 / 3, y, l / 3, n);
        };
    };
};


function set_sieve_eratos ( n ) {
    sieve = document.getElementById("sieve");
    sieve.innerHTML = '';    
    sieve_object = init_canvas();
    sieve.appendChild(sieve_object);
    context = sieve_object.context;
    gradient = linear_gradient(context);
    primes = [];
    wi = sieve_object.width / 10;
    sieve_object.height = wi * n;
    context.beginPath();
    context.strokeStyle = gradient;
    context.stroke();
    context.font = "15px Arial";
    function condition_1 ( x ) {return [2, 3, 5, 7].indexOf(x) != -1};
    function condition_2 ( x ) {return [2, 3, 5, 7].map( y => x % y != 0 ).indexOf(false) == -1};
    counter = 1;
    for (var i = 0; i < n; i += 1) {
        for (var j = 0; j < 10; j += 1) {
            context.rect(j * n, i * n, n, n);
            if ( condition_1(counter) || condition_2(counter) ) {
                primes.push(counter);
                context.strokeText(counter, j * wn + wn / 4, i * wn + 3 * wn / 4);
            };            
            counter += 1;
        };
    };
    context.strokeStyle = gradient;
    context.stroke();
};