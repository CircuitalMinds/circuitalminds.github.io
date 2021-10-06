---
layout: page
title: Projects
permalink: /resources
image: zeta_function.gif
---

### Video App

***

<button id="open-modal">Open</button>
<div id="app-modal" class="modal"></div>

<script>
set_modal(
    'open-modal', 'app-modal', 
    {
        header: "Don't Stop The Classics",
        body: `'<iframe src="{{ site.url }}/videos" width="100%" height="300px"
                class="image fit" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true" frameborder="0">
                </iframe>`,
        footer: `<div class="copyright">
                <p>&copy; {{site.time | date: '%Y'}} Crafted & Designed by <a href="{{ site.url }}">{{ site.title_page }}</a></p>
                </div>`
    }
);
</script>

***