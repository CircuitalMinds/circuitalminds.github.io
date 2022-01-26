let VahnGraff = $("#vahngraff")[0];
VahnGraff.Videos = {};
VahnGraff.Metadata = {};

VahnGraff.urlData = function ( x ) {
    return [
        "{{ site.static_url }}/data/videos", x
    ].join("/");
};
VahnGraff.urlVideo = function ( x ) {
    V = this.Videos[x];
    return [
        "https://raw.githubusercontent.com/circuitalmynds",
        "music_" + V.id.split("-")[0], "main/videos", V.name
    ].join("/");
};
VahnGraff.getMeta = function ( n ) {
    V = this.Videos[n];
    console.log(V.id.replace(V.id.split("-")[0] + '-', ''));
    Meta = this.Metadata[V.id];
    Meta.url = this.urlVideo(n);
    return Meta;
};
VahnGraff.setData = function ( data, x ) {
    Ks = Object.keys(data);
    for ( k of Ks ) {
        x[k] = data[k];
    };
    return;
};

$( function () {
    requestObj.get(
        VahnGraff.urlData("all.json"),
        function ( data ) {
            VahnGraff.setData(data, VahnGraff.Videos);
        }
    );
    requestObj.get(
        VahnGraff.urlData("metadata.json"),
        function ( data ) {
            VahnGraff.setData(data, VahnGraff.Metadata);
        }
    );
});

let vObj = Dict();

vObj.getURL = function ( n ) {
    V = this.get(n);
    return [
        "https://raw.githubusercontent.com/circuitalmynds",
        "music_" + V.id.split("-")[0], "main/videos", V.name
    ].join("/");
};



let Player = new Object();

Player.ID = "video-player";
Player.Poster = "/{{ site.img }}/apps/poster.gif";
Player.Data = {};
Player.randomMode = false;

Player.setMode = function () {
    this.randomMode = $("#random")[0].checked;
};
Player.Title = {
    get: function () {
        return $("#video-title")[0];
    },
    set: function ( title ) {
        this.get().innerHTML = title;
    }
};
Player.Vol = {
    setPlus: function () {
        vol = $("#" + Player.ID)[0].volume * 100;
        if ( vol < 100 ) {
            vol += 10;
        } else {
            vol = 100;
        };
        $("#" + Player.ID)[0].volume = vol / 100;
    },
    setMinus: function () {
        vol = $("#" + Player.ID)[0].volume * 100;
        if ( vol > 0 ) {
            vol -= 10;
        } else {
            vol = 0;
        };
        $("#" + Player.ID)[0].volume = vol / 100;
    }
};

Player.getVideo = function ( Index ) {
    title = Object.keys(this.Data)[Index];
    video = this.Data[title];
    this.getMetadata( video );
    if ( video.title == undefined ) {
        video.title = title;
    };
    video.title = video.title.replace(".mp4", "").replace(".wmv", "");
    return video;
};
Player.getRandomVideo = function () {
    videoIndex = Math.round( Math.random() * ( Object.keys(this.Data).length - 1 ) );
    video = this.getVideo(videoIndex);
    video.index = videoIndex;
    return video;
};
Player.getMetadata = function ( video ) {
    Attrs = ["name", "property", "itemprop"];
    Contents = ["title", "og:title", "og:image", "duration", "keywords"];
    function setData ( x, y ) {
        attrName = ( x[y] ) ? Contents[Contents.indexOf(x[y])] : undefined;
        if ( attrName != undefined ) {
            keyName = ( attrName.indexOf(":") != -1 ) ? attrName.split(":")[1] : attrName;
            if ( video[keyName] == undefined ) {
                video[keyName] = x.content;
            };
        };
    };
    for ( x of video.metadata ) {
        Attrs.map( y => setData(x, y) );
    };
    if ( video.duration != undefined ) {
        video.duration = video.duration.replace("PT", "").replace("M", ":").replace("S", ":0");
    };
    if ( video.image == undefined ) {
        video["image"] = this.Poster;
    };
};

Player.Start = function () {
    obj = $("#" + this.ID)[0];
    setTimeout(function() {
        obj.play();
        $("#results")[0].style.display = "none";
    }, 500);
};
Player.Next = function () {
    obj = $("#" + this.ID)[0];
    this.setMode();
    Index = parseFloat(obj.dataset.videoSelected) + 1;
    Video = ( this.randomMode ) ? this.getRandomVideo() : this.getVideo( Index );
    obj.setAttribute("src", Video.url);
    obj.dataset.videoSelected = Index;
    this.Title.set(Video.title);
    this.Start();
};
Player.Previous = function () {
    obj = $("#" + this.ID)[0];
    this.setMode();
    Index = parseFloat(obj.dataset.videoSelected) - 1;
    Video = ( this.randomMode ) ? this.getRandomVideo() : this.getVideo( Index );
    obj.setAttribute("src", Video.url);
    obj.dataset.videoSelected = Index;
    this.Title.set(Video.title);
    this.Start();
};
Player.Select = function ( Index ) {
    obj = $("#" + this.ID)[0];
    this.setMode();
    Video = this.getVideo( Index );
    obj.setAttribute("src", Video.url);
    obj.dataset.videoSelected = Index;
    this.Title.set(Video.title);
    this.Start();
};

Player.Feeds = {
    "id": "feeds",
    "delay": 10e3,
    "getFeed": function () {
        v = Player.getRandomVideo();
        return `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                    onclick="Player.Select( ${v.index} );">
            <img class="avatar" src="${v.image}">
            <span class="label">${v.title}</span>
            <span class="second-label">${v.duration}</span>
        </li>`;
    },
    "setFeed": function ( Id, getFeed ) {
        $("#" + Id)[0].innerHTML = Range(0, 4).map(
            i => getFeed()
        ).join("\n");
    },
    "display": function () {
        setInterval(
            this.setFeed,
            this.delay,
            this.id,
            this.getFeed
        );
    }
};

$( function () {
    requestObj.get(
        "{{ site.static_url }}/data/videos/metadata.json",
        function ( data ) { Player.Data = data }
    );
    $("#" + Player.ID)[0].poster = Player.Poster;
    jklSearch.Render();
    Player.Feeds.display();
});