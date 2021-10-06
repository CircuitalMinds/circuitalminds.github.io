function set_modal ( button_id, modal_id, content ) {
    modal = $(`#${modal_id}`)[0];  
    modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
        <span class="close">&times;</span>
            ${content.header}
        </div>
        <div class="modal-body">${content.body}</div>
        <div class="modal-footer">${content.footer}</div>
    </div>`;
    close = modal.querySelector('span');
    modal_button =  $(`#${button_id}`)[0];;
    modal_button.onclick = function() {
        modal.style.display = "block";
    };
    close.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
};    
function set_accordion ( id, content ) {
    accordion = $(`#${id}`)[0];
    accordion.innerHTML = `
    <div class="accordion accordion-flush" id="${id}">
    <div class="accordion-item">
        <h2 class="accordion-header" id="flush-heading-${id}">
        <button class="accordion-button collapsed bg-darklight fg-teal ontouch"
                type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${id}"
                aria-expanded="false" aria-controls="flush-collapse-${id}">
            ${content.header}
        </button>
        </h2>
        <div id="flush-collapse-${id}" class="accordion-collapse collapse bg-darklight"
             aria-labelledby="flush-heading-${id}" data-bs-parent="#${id}">
        <div class="accordion-body">
            ${content.body} 
        </div>
        </div>
    </div>
    </div>`;
};

function set_iframe ( id, url, w='100%', h='300px' ) {    
    $(`#${id}`)[0].innerHTML = `<iframe src="${url}" class="image fit" width="${w}" height="${h}"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture" allowfullscreen="true" frameborder="0">
    </iframe>`;
};