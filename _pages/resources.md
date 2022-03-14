---
layout: page
title: Resources
image: resources.jpg
permalink: /resources/
---

***

![](/{{site.img}}/posts/hidokei/clock.jpg)

***

{% highlight ruby %}
def print_friend(someone)
  puts "Yeii!!, #{some better}"
end
print_friend('friendship')
#=> prints 'Yeii!!, Coffee + Little Pigs' to STDOUT.
{% endhighlight %}

***

{% include snippet/iframe.html url_page="/vahngraff/" cls="reveal-in" w="100%" h="512" %}

***

{% include snippet/image.html src="posts/birthdays/friends.jpg" cls="reveal-in" w="910" h="512" %}

***

{% include snippet/image.html src="posts/birthdays/coffee.jpg" cls="reveal-in" w="910" h="512" %}

***

{% include snippet/slide.html value="0" min="-10" max="10" step="1" %}

***


<div class="bg-cover w-100" style="background-image: url('/{{ site.img }}/posts/circuital/cantor.jpeg');">
{% include snippet/image.html src="posts/circuital/cantor.jpeg" cls="bg-cover" w="33%" h="250px" %}
{% include snippet/image.html src="posts/circuital/cantor.jpeg" cls="bg-cover" w="33%" h="250px" %}
{% include snippet/image.html src="posts/circuital/cantor.jpeg" cls="bg-cover" w="33%" h="250px" %}
</div>

***

<div id="console-out"></div>
<input type="text" id="console-in"/>
<button id="console-run">Run</button>
<script>
$(  function () {
    var Out = $("#console-out")[0];
    var In = $("#console-in")[0];
    $("#console-run")[0].onclick = function () {
        Out.innerHTML =  eval( In.value );
    };
});
</script>