---
layout: page
title: Python Topics
image: topics.png
permalink: /python-topics/
---
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
