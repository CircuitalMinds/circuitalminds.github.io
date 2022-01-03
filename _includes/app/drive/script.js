var selected_files = $('#selected-files');
let Drive = new Object();

function setConfig ( settings ) {
    if ( Object.keys(Drive).length == 0 ) {
        Drive = settings;
        Drive.root = '{{ site.static_url }}';
        Drive.setURL = function ( paths ) {
            if ( typeof(paths) == "object" ) {
                return this.root.concat("/", paths.join("/"));
            } else if ( typeof(paths) == "string" ) {
                return this.root.concat("/", paths);
            };
        };
    };
};
function setDrive ( data ) {
    Drive.content = data.content.folders;
    Drive.total_size = data.total_size;
    Drive.content.map(
         y => Drive.views[y.name] = {obj: $("#" + y.name)[0]}
    );
    Drive.views.documents.open = function ( path ) {
        view = Drive.views.documents.obj;
        if ( path.endsWith("pdf") ) {
            view.querySelector(
                'embed[type="application/pdf"]'
            ).setAttribute( "src", path );
        } else {
            view.querySelector(
                'embed[type="text/html"]'
            ).setAttribute( "src", path );
        };
        view.style.display = "block";
        return;
    };
    Drive.views.scripts.open = function ( path ) {
        view = Drive.views.scripts.obj;
        view.querySelector(
            'embed[type="text/plain"]'
        ).setAttribute( "src", path );
        view.style.display = "block";
        return;
    };
    Drive.views.data.open = function ( path ) {
        view = Drive.views.data.obj;
        if ( path.endsWith("json") ) {
            view.querySelector(
                'embed[type="application/json"]'
            ).setAttribute( "src", path );
        } else {
            view.querySelector(
                'embed[type="text/plain"]'
            ).setAttribute( "src", path );
        };
        view.style.display = "block";
        return;
    };
    Drive.views.pictures.open = function ( path ) {
        view = Drive.views.pictures.obj;
        view.setAttribute( "src", path );
        view.style.display = "block";
        return;
    };
    Drive.views.videos.open = function ( path ) {
        view = Drive.views.videos.obj;
        view.setAttribute( "src", path );
        view.style.display = "block";
        return;
    };
    function setFolder ( Data ) {
        return [
            '<li><a class="dropdown-toggle" href="#">',
            Data.name,
            `<span class="${Drive.icon_folder}"></span></a>`,
            '<ul class="v-menu" data-role="dropdown">',
            Data.files.map(
                x => `<li>
                      <a onclick="Open( '${Data.name}', '${x.filename}' );">
                      ${x.filename} ${x.date} ${x.size} <span class="${Drive.icon_file}"></span>
                      </a>
                      </li>`
            ).join("\n"),
            '</ul>',
            '</li>'
        ].join("\n");
    };
    $("#folders")[0].innerHTML = Drive.content.map(
        x => setFolder(x)
    ).join("\n");
};

function Close () {
    Object.values(Drive.views).map( x => x.obj.style.display = "none" );
    $("#default")[0].style.display = "block";
};
function Open ( folder, filename ) {
    Close();
    $("#default")[0].style.display = "none";
    View = Drive.views[folder];
    if ( View ) {
        View.open( Drive.setURL(["storage", folder, filename]) );
    };
};

