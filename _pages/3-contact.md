---
layout: page
title: Contact
image: logo.png
permalink: /contact
---

<div class="item">
  <header>
    <h2 style="text-align: left;">Degree in Mathematical Sciences</h2>
  </header>
  <div class="image fit">
    <table class="table">
    <tbody id="mathematical-sciences"></tbody>
    </table>
  </div>
</div>

<div class="item">
  <header>
    <h2 style="text-align: left;">Chemical Engineering</h2>
  </header>
  <div class="image fit">
    <table class="table">
    <tbody id="chemical-engineering"></tbody>
    </table>
  </div>
</div>


<div class="item">
  <header>
    <h2 style="text-align: left;">GitHub - Repositories</h2> 
  </header>
  <p class="image fit" id="desc-git" style="text-align: left;">
  You can consult on GitHub some of my programming projects that are being developed,
  which aim to collect all the practices in the Python language and obtain as a result 
  something useful such as Python packages, and educational guides for beginners or advanced users
  in the use of this language. And an image shows more than a few words.
  </p>
</div>

<div class="item">
<a href="https://github.com/CircuitalMinds/" class="image fit"><img src="assets/images/organization.png" alt="circuitalminds" /></a>
    <header>
      <h3>Organization    <spam class="icon-b fa-github-alt"></spam></h3>
    </header>
</div>
<div class="item">
<embed class="image fit" type="text/html" src="https://circuitalminds.github.io/" width="100%" height="550px">
    <header>
      <h3>CircuitalMinds</h3>
    </header>
</div>
<div class="item">   
<embed class="image fit" type="text/html" src="{{ site.url }}/pySpectralPDE/" width="100%" height="550px">
  <header>
    <h3>Python Package | pySpectralPDE</h3>
  </header>
</div>

<form method="post" action="/api/message">
	<div class="row uniform">
		<div class="6u 12u$(xsmall)">
			<input type="text" name="name" id="name" value="" placeholder="Name" />
		</div>
		<div class="6u$ 12u$(xsmall)">
			<input type="email" name="email" id="email" value="" placeholder="Email" />
		</div>
		<!-- Break -->
		<div class="12u$">
			<div class="select-wrapper">
				<select name="category" id="category">
					<option value="">- Category -</option>
					<option value="1">Query</option>
					<option value="2">Business</option>
					<option value="3">Human Resources</option>
				</select>
			</div>
		</div>
		<!-- Break -->
		<div class="12u$">
			<textarea name="message" id="message" placeholder="Enter your message" rows="6"></textarea>
		</div>
		<!-- Break -->
		<div class="12u$">
			<div class="actions">
				<input type="submit" value="Send Message" class="special" />
			</div>
		</div>
	</div>
</form>