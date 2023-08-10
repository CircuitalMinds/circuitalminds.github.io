var appData = {

    urldata: '{{ site.static_url }}/data',    
    videoposter: '/{{ site.img }}/app/poster.gif',
    search_template: {
        result: `
        <li id='{index}' class='button card-content bg-darkTeal bg-dark-hover fg-light'>
            <img id='{index}-image' class='avatar' src='{image}'>
            <span id='{index}-title' class='label'>{title}</span>
            <span id='{index}-duration' class='second-label'>{duration}</span>
        </li>
        `,
        not_found: `
        <li class='button card-content bg-darkTeal bg-dark-hover fg-light'>Video Not Found</li>
        `
    }

};
