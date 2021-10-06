var video_object = {
    url: 'https://circuitalminds.github.io/static/data/videos.json',
    list: [],
    data: {},
    get_random_title: function () {
        n = Math.round(Math.random() * this.list.length  - 1);
        return this.list[n];
    },
    get_video: function ( x ) {
        if ( typeof(x) == 'number' ) {
            t = this.list[x];
            return {"title": t, "index": x, "data": this.data[t]};
        } else {
            n = this.list.indexOf(x);
            return {"title": x, "index": n, "data": this.data[x]};
        }
    },
    get_matches: function ( q ) {
        r = [];
        vocals = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'};
        function check ( word ) {
                txt = word.toLowerCase();
                Object.keys(vocals).map( l => txt = txt.replace(l, vocals[l]) );
                return txt.match(q.toLowerCase());
            };
        for ( x of this.list ) {
            y = check(x);
            if ( y != null ) {
                r.push(x);
            } else {
                for ( z of Object.values(this.data[x]) ) {
                    if ( check(z) != null ) {
                        r.push(x);
                        break;
                    };
                };
            };
        };
        return r;
    }
};