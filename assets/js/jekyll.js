function setJekyllSearch (
    jsonfile, search={input: "js-search-input", container: "js-results-container"}
    ) {
    SimpleJekyllSearch({
    searchInput: document.getElementById(search.input),
    resultsContainer: document.getElementById(search.container),
    json: jsonfile,
    searchResultTemplate:
      '<li class="search-item"><a class="search-link" href="{url}">{title}</a></li>',
    noResultsText: '<li class="search-no-item">No results found</li>'
    });
};