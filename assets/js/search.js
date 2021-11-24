function setJekyllSearch ( name ) {SimpleJekyllSearch({
    searchInput: document.getElementById(Templates[name].search.input),
    resultsContainer: document.getElementById(Templates[name].search.container),
    json: Templates[name].jsonfile,
    searchResultTemplate: Templates[name].results,
    noResultsText: Templates[name].no_results
    });
};

var Templates = {
    site: {
        jsonfile: '/search.json',
        search: {
            input: "js-search-input", container: "js-results-container"
        },
        results: '<li class="search-item"><a class="search-link" href="{url}">{title}</a></li>',
        no_results: '<li class="search-no-item">No results found</li>'
    },
    videos: {
        jsonfile: "https://circuitalminds.github.io/static/data/videos/videos.json",
        search: {
            input: "query", container: "jkl-results"
        },
        results: `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                      onclick="$('#video-player')[0].dataset.videoSelected = '{index}'; OnEvent('video-selected');" >
                      <img class="avatar" src="{image}">
                      <span class="label">{title}</span>
                      <span class="second-label">{duration}</span>
                  </li>`,
        no_results: '<li class="button card-content bg-darkTeal bg-dark-hover fg-light"> Video Not Found </li>',        
    }
};