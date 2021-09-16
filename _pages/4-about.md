---
layout: page
title: About
image: about.jpg
permalink: /about
---
Cabe la posibilidad de encontrar formas que no puedan ser del todo tangibles, pero todo depende de sus atributos.

<img class="container reveal-in" style="width : 100%; border: 1px solid #1abc9c;" src="{{site.baseurl}}/img/pineapples.jpg">

<div class="container" style="border: 1px solid #1abc9c;">
<iframe allowfullscreen="" frameborder="0" height="300"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27895.489657428087!2d-110.964439!3d29.078030000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcf527709b7555a3!2sUniversidad%20de%20Sonora%20-%20UNISON!5e0!3m2!1ses-419!2smx!4v1630257214462!5m2!1ses-419!2smx"
        style="border:0" width="100%">
</iframe>
<iframe width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://virtualsky.lco.global/embed/index.html?longitude=-111.02386000000001&latitude=29.0878&projection=lambert&showstarlabels=true&showorbits=true&ecliptic=true&meridian=true&gridlines_az=true&gridlines_eq=true&gridlines_gal=true&live=true" allowTransparency="true"></iframe>
</div>

<h3 align="center">Interesting Topics in Python</h3>

***

<h3 align="center">Fourier Analysis</h3>
<div id="fourier_analysis"></div>

***

<h3 align="center">Fractal Simulations</h3>
<div id="fractal_simulations"></div>

***

<h3 align="center">Special Functions</h3>
<div id="special_functions"></div>

***

<script>
var python_static = 'https://raw.githubusercontent.com/CircuitalMinds/static/main/python/';

var scripts = {
    fourier_analysis: {url: python_static + 'fourier_analysis/main.py', data: ''},
    fractal_simulations: {url: python_static + 'fractal_simulations/main.py', data: ''},
    special_functions: {url: python_static + 'special_functions/main.py', data: ''}    
};

function color_marker ( code ) {
	new_code = code.replaceAll("self", '<span class="s">self</span>');
	new_code = new_code.replaceAll("import ", '<span class="nb" >import</span> ');
	new_code = new_code.replaceAll("from ", '<span class="nb" >from</span> ');
	new_code = new_code.replaceAll("as ", '<span class="nb" >as</span> ');
	new_code = new_code.replaceAll("class ", '<span class="mi" >class</span> ');
	new_code = new_code.replaceAll("def ", '<span class="mi" >def</span> ');
	new_code = new_code.replaceAll("if", '<span class="mi" >if</span> ');
	new_code = new_code.replaceAll("elif", '<span class="mi" >elif</span> ');	
	new_code = new_code.replaceAll("else", '<span class="mi" >else</span> ');
	new_code = new_code.replaceAll("@staticmethod", '<span class="s" >@staticmethod</span>');
	return new_code;
};

function make_script ( code ) {
	return '<figure class="highlight"><pre>'
		   + '<code class="language-python" data-lang="python">' + color_marker(code) + '</code>'
		   + '</pre></figure>';
};

function getPythonScript ( name ) {
    var getScript = $.get( scripts[name].url );
    getScript.done( function( data ) {  	
    	scripts[name].data = data;
    	document.getElementById(name).innerHTML = make_script(data);
   	});
};


for ( name in scripts ) {	
	getPythonScript(name);
};
</script>
