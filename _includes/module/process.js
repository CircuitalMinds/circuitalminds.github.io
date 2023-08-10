function AsyncProcess ( func, data ) {

    function Resolve () {
        return new Promise( 
        result => {
            setTimeout( () => { result( func(data) ) }, 1e3 )
        } );
    };

    async function Exec () {
        const result = await Resolve();
        console.log(result);
    };

    return Exec;
  
};


function initSocket () {
    
    function message ( name ) {
        return print({
            starting: "starting to count",
            sleeping: "start sleeping...",
            terminated: "count terminated"
        }[name]);
    };

    var socket = {
        kill: function ( id ) {
            if ( this.register[id] != undefined  ) {
                delete this.register[id];
            };
        },
        register: {}
    };    

    socket.create = function ( id ) {

        var sock = {};        
        
        sock.id = id;
        sock.connected = false;
        
        sock.data = {}; 
        sock.task = null;
        sock.connect = function () {
            this.connected = true;
        };
        sock.disconnect = function () {
            this.connected = false;
        };

        counter = {};
        counter.value = 0;
        counter.next = function () {
            this.value += 1;
        };
        counter.back = function () {
            this.value -= 1;
        };
        counter.reset = function () {
            this.value = 0;
        };        
        sock.counter = counter;

        sock.do_task = function ( func, secs, delay=1 ) {                               
            sock.counter.reset();
            message( "starting" );
            sock.task = setInterval( function () {
                if ( sock.counter.value < secs ) {
                    sock.counter.next();
                    print( "i="+sock.counter.value );
                    func();
                } else {
                    clearInterval( sock.task );
                    message( "terminated" );
                };
            }, delay * 1e3 );            
        
        };

        sock.sleep = function ( t ) {
            message( "starting" );            
            setTimeout(
                function () { 
                    print( "wake up !!!" );
                },
            t * 1e3 );
        };

        socket.register[id] = sock;

    };

    return socket;

};

function Timer() {
    return {
        counter: {
            value: 0,
            next: function () { this.value += 1 },
            back: function () { this.value -= 1 },
            reset: function () { this.value = 0 }
        },
        init: function ( n, delay=1e3, new_counter=true ) {
            var log = console.log;
            var counter = this.counter;
            if ( new_counter ) {
                counter.reset();
            };
            log( "starting to count" )
            var interval = setInterval( function () {
                if ( counter.value < n ) {
                    counter.next();
                    log( "i="+counter.value );
                } else {
                    clearInterval( interval );
                    log( "count terminated" );
                };
            }, delay );
        },
        sleep: function ( t ) {
            var log = console.log;
            log( "start sleeping..." );
            this.init( t );
            setTimeout( function () { log( "wake up !!!" ) }, ( t + 1 ) * 1e3 );
        },
        clock: function () {
            var t = new Date();
            var tdata = {};
            tdata.full = t.toLocaleTimeString();
            [ ["Hours","hr"], ["Minutes", "min"], ["Seconds", "sec"] ].map(
                s => tdata[ s[1] ] = t[ "get" + s[0] ]()
            );
            return tdata;
        },
        date: function () {
            var d = new Date();
            return d.toLocaleDateString();
        }
    };
};


function createConsole () {
    var x = $( "#console" )[0];
    
    x.innerHTML = [
        '<div class="console-out" ></div>',
        '<input class="console-in" type="text" />',
        '<button class="console-run" > Run </button>'
    ].join( "\n" );

    var input = x.querySelector( ".console-in" );
    var output = x.querySelector( ".console-out" );

    x.querySelector( ".console-run" ).onclick = function () {
        output.innerHTML = eval( input.value );
    };

};
