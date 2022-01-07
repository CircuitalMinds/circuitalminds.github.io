---
layout: page
title: Contact
image: contact.jpg
permalink: /contact/
---



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
<script>
let pageData = new Object();
pageData.Portfolio = {};
$(function () {
    requestObj.get(
        "{{ site.static_url }}/data/portfolio.json", 
        function ( data ) { pageData.Portfolio = data }
    );    
});    
</script>