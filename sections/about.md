---
layout: default
title: About
permalink: "/about"

---
Anyone can host, and everyone should.
![Line drawn pattern of wine glasses, fish and other culinary objects.]({{site.baseurl}}/images/9827b5de-d73f-41e3-959d-e674c1effbe5.jpeg)

({{site.baseurl}}/images/pith_pattern_thin.jpg)

I live in New York City, where I run the Pith Supper Club out of my apartment and write a bi-monthly column at Food & Wine Magazine. Through cooking, writing, traveling, and entrepreneurship, I'm constantly excited by the magic of do-it-yourself hospitality.

### Shop Pith

Visit the [Pith Store](www.pith.store) to shop for delicious goods, classes, and supper club dates. Make sure to sign up for email alerts to be the first to know about new drops, and consider a monthly membership that guarantees access to everything before they sell out.

### Kitchen Essentials

More than anything, people ask me what stuff they should get for their kitchen. So: [here is my list](https://jonahreider.com/?page=diy&post=2019-08-17-cooking-essentials "What should I get for my kitchen? What are the best tools for a kitchen?") of the tools I use every day to optimize my kitchen for confident, improvisational cooking and hosting.

From containers to knives, from a cutting board to the best vegetable peeler, I've selected affordable, functional, and beautiful upgrades to any home cooking workflow.

### Subscribe

Sign up below to receive sporadic notifications about supper club availability as well as essential tips for cultivating a welcoming home and an improvisational confidence in the kitchen.

<form method="post" action="https://pith.store/contact#contact_form" id="contact_form" accept-charset="UTF-8" id="subscribe-form" target="_blank">
<input type="hidden" name="form_type" value="customer">
<input type="hidden" name="utf8" value="✓">
<input type="hidden" name="contact\[tags\]" value="newsletter">
<input type="email" value="" placeholder="Your email" name="contact\[email\]" id="email" autocorrect="off" autocapitalize="off">
<input type="submit" name="commit" value="Subscribe" />
</form>
<p class="bottom_space"> </p>

{% assign important_posts = site.posts | where: "important", true | sort: "date" | reverse %}
{% assign num_posts = important_posts | size %}
{% if num_posts > 0 %}

### Recent Posts

{% assign i = 0 %}

<div id="featured-posts">
{% for post in important_posts %}
{% if i >= 3 %}
{% break %}
{% endif %}
{% assign i = i | plus: 1 %}
<div>
<a href="" onclick="jumpToPost('{{ post.url | remove_first: '/'}}'); return false;">
<img src="{{ post.icon }}" alt="">
<span>{{ post.title }}</span>
</a>
</div>
{% endfor %}
</div>
<a href="#diy" onclick="jumpToPost()">See more…</a>
{% endif %}

### Select Press

★★★ — [Chicago Tribune](http://www.chicagotribune.com/dining/restaurants/ct-review-intro-jonah-reider-food-0928-20160924-column.html)  
Delicious — [The New Yorker](http://www.newyorker.com/magazine/2017/05/22/pith-graduates-from-the-dorm)  
Yes, chef! — [The New York Times](https://www.nytimes.com/2017/04/20/style/jonah-reider-pith-supper-club.html)  
An Innovative Cook — [AP](https://www.apnews.com/52519470af634cb6afc1c0a2e6c7d731)  
A coveted reservation — [WSJ](http://www.wsj.com/articles/for-columbia-student-entrepreneur-dorm-restaurant-is-just-the-first-course-1454113319)  
A Dining Experience — [Forbes](https://www.forbes.com/video/5734702032001/#40eac57de450)

![Jonah pouring wine as nine dinner guests sit at a large table.]({{site.baseurl}}/images/supper_club_brooklyn.jpg)

![Jonah, wearing bright, patterned clothing, tasting cherries at a farmers' market. Shopper next to him inspects a cherry.]({{site.baseurl}}/images/fort_green_market.jpg)

![Jonah setting the table, which is decorated with flowers. Sun streams through the windows and the shelves behind the table are filled with tableware and wine bottles.]({{site.baseurl}}/images/pith_manhattan.jpg)