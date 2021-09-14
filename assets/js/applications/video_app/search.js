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
            '<li class="title"> Search Result </li>',
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
    result: $('#result')[0],
    query: '',
    set_data: function ( data ) {
        if ( data == '' ) {
            this.result.setAttribute("class", "bg-white");
            this.result.innerHTML = '';
            this.result.style['display'] = 'none';
        } else {
            this.result.setAttribute("class", "bg-darkTeal fg-white");
            this.result.innerHTML = data;
            this.result.style['display'] = 'block';
        }
    }
};