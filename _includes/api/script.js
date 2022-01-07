$( function () {
    let Api = $("#api-root")[0];
    Api.currentPage = "{{ page.title | downcase }}";

});