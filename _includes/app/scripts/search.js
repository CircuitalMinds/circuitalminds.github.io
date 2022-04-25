$( function () {
	function searchModal () {
		var M = El.queryCls( "search-modal" );
		El.queryID( "jkl-results" ).addEventListener(
			"click", function ( e ) {
				var target = ( e.target.tagName == "LI" ) ? e.target : e.target.parentNode;
				VahnGraff.Player.setVideo( target.querySelector( "img" ).src );
			}
		);
		El.queryID( "query" ).onclick = function() {
			M.style.display = "block";
			var h = bodySize( 0.4 ).h;
			M.iterNodes( ".search-modal-body", function( e ) { e.style.height = h } );
		};
		M.iterAll(
			"span.search-close", function( e ) {
				e.onclick = function() { M.style.display = "none" };
			}
		);
		window.onclick = function( event ) {
			if ( event.target == M ) {
				M.style.display = "none";
			};
		};
	};
	jklSearch({
        "searchInput": "query",
        "resultsContainer": "jkl-results",
        "json": '{{ site.static_url }}/data/videos/query.json',
        "searchResultTemplate": `<li class='button card-content bg-darkTeal bg-dark-hover fg-light'>
            <img class='avatar' src='{image}'>
            <span class='label'>{title}</span>
            <span class='second-label'>{duration}</span>
        </li>`,
        "noResultsText": "<li class='button card-content bg-darkTeal bg-dark-hover fg-light'>Video Not Found</li>"
    });
	searchModal();
});