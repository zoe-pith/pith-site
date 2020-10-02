---
layout: default
title: About
permalink: "/about"

---
Anyone can host, and everyone should.
![pith]({{site.baseurl}}/images/pith_pattern_thin.jpg)

I live in New York City, where I run the Pith Supper Club out of my apartment and write a bi-monthly column at Food & Wine Magazine. Through cooking, writing, traveling, and entrepreneurship, I'm constantly excited by the magic of do-it-yourself hospitality.

### Kitchen Essentials

More than anything, people ask me what stuff they should get for their kitchen. So: [here is my list](https://jonahreider.com/?page=diy&post=2019-08-17-cooking-essentials "What should I get for my kitchen? What are the best tools for a kitchen?") of the tools I use every day to optimize my kitchen for confident, improvisational cooking and hosting.

From containers to knives, from a cutting board to the best vegetable peeler, I've selected affordable, functional, and beautiful upgrades to any home cooking workflow.

### Subscribe

Sign up below to receive sporadic notifications about supper club availability as well as essential tips for cultivating a welcoming home and an improvisational confidence in the kitchen.

<form accept-charset="UTF-8" action="https://tickets.jonahreider.com/pith/supper-club/interested_users#thanks" id="subscribe-form" method="post" target="_blank">
<input name="utf8" type="hidden" value="✓">
<input name="authenticity_token" type="hidden" value="jqNrxffRtVFMc3MQfO6akJeXISo8jfPxJNObXzKi6gY=">
<input placeholder="Name" id="name" name="interested_user[name]" type="text">
<input placeholder="Email" id="email" name="interested_user[email]" type="email">
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
<img src="{{ post.icon }}">
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

![Pith Supper Club in Brooklyn, New York]({{site.baseurl}}/images/supper_club_brooklyn.jpg)

![Fort Green Farmer's Market]({{site.baseurl}}/images/fort_green_market.jpg)

![Pith in Manhattan]({{site.baseurl}}/images/pith_manhattan.jpg)