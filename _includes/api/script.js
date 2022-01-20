let Api = $("#api-root")[0];
$( function () {
    Api.currentPage = "{{ page.title | downcase }}";
    Api.Data = {% include api/settings.json %};
});
