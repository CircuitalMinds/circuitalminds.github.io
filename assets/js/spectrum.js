function Constant ( name ) {
    return {'pi': Math.PI, 'e': Math.E}[name];
};
function create_function ( name ) {
    function func ( array_data ) {
        if ( array_data.length != undefined ) {
            return array_data.map( i => Math[name](i) );
        } else if ( typeof(array_data) == 'number' ) {
            return Math[name](array_data);
        };
    };
    return func;
};
var [
        Sqrt, Round, Random, Pow,
        Log, Log10, Exp,
        Cos, Acos, Acosh,
        Sin, Asin, Asinh, 
        Tan, Tanh, Atan, Atanh,
        Min, Max, Floor, Ceil
    ] = [
        'sqrt', 'round', 'random', 'pow',
        'log', 'log10', 'exp',
        'cos', 'acos', 'acosh',
        'sin', 'asin', 'asinh', 
        'tan', 'tanh', 'atan', 'atanh',
        'min', 'max', 'floor', 'ceil'
    ].map( fi => create_function(fi) );


function Zeros ( size ) {
    array_data = Array(size);
    array_data.fill(0);
    return array_data;
};

function Range ( a, b, step=1 ) {
    new_array = [];
    while ( a < b + 1 ) {
        new_array.push(a);
        a += step;
    };
    return new_array
};    

function Sum ( array_data ) {
    result = 0;
    array_data.map( i => result += i );
    return result;
};


function Prod ( array_data ) {
    result = 1.0;
    array_data.map( i => result *= i );
    return result;
};

function Dot ( A, B ) {        
    if ( A.length == undefined && B.length == undefined ) {
        return A * B;
    } else if ( A.length != undefined && B.length == undefined ) {
        return A.map( i => i * B );
    } else if ( A.length == undefined && B.length != undefined ) {
        return B.map( i => i * A );    
    } else {
        result = 0.0;
        for ( var i = 0; i < A.length; i++ ) { result += A[i] * B[i] };
        return result;
    };
};

function Factorial ( n ) {
    return Prod(Range(1 , n));
};
