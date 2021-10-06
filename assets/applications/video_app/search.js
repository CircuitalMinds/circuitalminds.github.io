var search_template = {
    get_list: function ( contents ) {
        if ( contents == '' ) {
            contents = [
                '<li class="button card-content bg-darkTeal bg-dark-hover fg-light">',
                ' Video Not Found ',
                '</li>'
            ].join('');
        };
        return [
            '<ul class="feed-list bg-darkTeal fg-light">',            
            contents,
            '</ul>'
        ].join('\n');
    },
    get_row: function ( index, title, data ) {
        attrs = [
            'class="button card-content bg-darkTeal bg-dark-hover fg-light" ',
            'onclick="App.set(', index, '); App.play();"'
        ].join('');
        image = ['<img class="avatar" src="', data.image, '" >'].join('');
        title = ['<span id="title" class="label" >', title, '</span>'].join('');
        duration = ['<span class="second-label" >', data.duration, '</span>'].join('');
        return [
            '<li ' + attrs + ' >',
            image, title, duration,
            '</li>'
        ].join('\n');
    },
    pages: [],    
    query: '',
    reset: function () {
        $('div.modal-body')[0].innerHTML = '';
        [['value', 0], ['disabled', true]].map( x => $('#left')[0][x[0]] = x[1] );
        [['value', 2], ['disabled', true]].map( x => $('#right')[0][x[0]] = x[1] );
    },
    set_data: function () {        
        function set_page ( c ) {
            y = search_template.pages.length - 1;
            lt = $('#left')[0];
            rt = $('#right')[0];           
            lv = parseFloat(lt.value) + c;
            rv = parseFloat(rt.value) + c;
            lt.value = lv;
            rt.value = rv;
            lt.disabled = false;
            rt.disabled = false;  
            z = parseFloat(rv - 1);  
            if ( lv <= 0 ) {
                lt.value = 0;
                lt.disabled = true;                
                z = 0;            
            }
            if ( rv >= y ) {
                rt.value = y;
                rt.disabled = true;                
                z = y;            
            };
            $('div.modal-body')[0].innerHTML = search_template.pages[z];                        
        };        
        $('div.modal-body')[0].innerHTML = this.pages[0];
        $('#left')[0].value = 0;
        $('#left')[0].disabled = true;
        $('#left')[0].onclick = function () { set_page(-1) };
        $('#right')[0].value = 2;
        $('#right')[0].disabled = false;
        $('#right')[0].onclick = function () { set_page(1) };
    }
};

window.onload = function () {  
    set_modal(
        'query', 'result',
        {
            header: '<h2>Search Results</h2>', 
            body: '', 
            footer: [
                '<div class="row">', 
                ['left', 'right'].map(
                    s => '<button id="' + s + '" class="cell-md-6 mif-chevron-' + s + ' mif-3x"></button>'
                ).join('\n'),
                '</div>'
            ].join('\n')
        }
    );
    search_template.reset();
};