let Drive = $( "#drive" )[0];
Drive.Content = {
    data: {},
    get: function ( name ) {
        return this.data[name];
    },
    set: function () {
         Http.Get(
            Static.Data.storage,
            function ( x ) {
                var s = "";
                x.content.folders.map(
                    function ( y ) {
                        Drive.Content.data[y.name] = y.files;
                        s += Drive.Folder.set( y.name, y.files );
                    }
                );
                $("#folders")[0].innerHTML = s;
            }
        );
    }
};
Drive.File = {
    icon: "icon mif-file-empty fg-teal",
    getUrl: function ( folder, filename ) {
        return  Http.Url( ["static", "storage", folder, filename] );
    },
    set: function ( folder, data ) {
        return [
            `<li><a onclick="Drive.View.open( '${folder}', '${data.filename}' );">`,
            [
                data.filename,
                data.date,
                data.size,
                '<span class="' + this.icon + '"></span>'
            ].join(" "),
            '</a></li>'
        ].join("\n");
    }
};
Drive.Folder = {
    icon: "icon mif-folder fg-teal",
    set: function ( name, files ) {
        return [
            '<li><a class="dropdown-toggle" href="#">', name,
            '<span class="' + this.icon + '"></span></a>',
            '<ul class="v-menu" data-role="dropdown">',
            files.map( y => Drive.File.set( name, y ) ).join("\n"),
            '</ul>',
            '</li>'
        ].join("\n");
    }
};
Drive.View = {
    data: {
        "default": '<img class="view-content" src="{{ site.logo }}">',
        "jsonfile": '<embed class="view-content image fit" width="100%" height="550px" type="application/json">',
        "textfile": '<embed class="view-content image fit" width="100%" height="550px" type="text/plain">',
        "pdf": '<embed class="view-content image fit" width="100%" height="550px" type="application/pdf">',
        "html": '<embed class="view-content image fit" width="100%" height="550px" type="text/html">',
        "image": '<img class="view-content image-fit">',
        "video": '<video class="view-content" controls></video>'
    },
    open: function ( folder, filename ) {
        var view = El.Query( "Id", "file-view" );
        if ( folder == "pictures" ) {
            view.innerHTML = this.data.image;
        } else if ( folder == "videos" ) {
            view.innerHTML = this.data.video;
        } else if ( filename.endsWith("pdf") ) {
            view.innerHTML = this.data.pdf;
        } else if ( filename.endsWith("html") ) {
            view.innerHTML = this.data.html;
        } else if ( filename.endsWith("json") ) {
            view.innerHTML = this.data.jsonfile;
        } else {
            view.innerHTML = this.data.textfile;
        };
        view.querySelector(".view-content").src = Drive.File.getUrl( folder, filename );
    },
    close: function () {
        El.Query( "Id", "file-view" ).innerHTML = this.data["default"];
    }
};
$( function () {
   Drive.Content.set();
});