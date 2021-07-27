---
layout: default
title: About
permalink: "/about"

---
![Line drawn pattern of wine glasses, fish and other culinary objects.]({{site.baseurl}}/images/9827b5de-d73f-41e3-959d-e674c1effbe5.jpeg)

Let's make the world a more delicious place.


# Pith Supper Club and Home Goods
![](/images/43dd4362-f67a-45d7-ac5e-f859569c7298.jpeg)

I started the Pith Supper Club while I was an economics student at Columbia University. I still sporadically host strangers at my home for seasonal and social meals, but mostly, I oversee the development of a small line of home goods that let anyone tap into the joy of do-it-yourself hospitality. Visit the [Pith Store](www.pith.store) to see what we make, where we’re stocked, access our monthly drops of goods for online ordering, and try your luck booking a seat at the supper club.

## Pzaz® Caffeine Mist
# Pzaz® Caffeine Mist

![](/images/18e0207b-a0af-4091-a6d0-e4d0379fb843.jpeg)I wanted to apply my experience with flavor, brand, and product development to the worst thing I could find on the checkout counter of a convenience stores.  5 Hour Energy used to sell $1B of product a year, but . Pzaz Caffeine Mist is a tube . Visit [pzaz.com](Www.Pzaz.com) to learn more.

Pzaz is a pocketable mist that delivers ultra-fast-acting bursts of positive energy. I designed it to be cheaper, faster-acting, more shareable, tastier, and more environmentally friendly than any energy drink or shot. I developed it with a team of experts and founders who share my obsession with redefining what it means to be energized. It’s better in every way compared to energy drinks. Pzaz is manufactured in New York and currently sold exclusively at bodegas. 

## _Food & Wine_ Magazine

In my bimonthly column _Supper Club_ at _Food & Wine Magazine_, I share dinner party menus along with tools & tricks that help anyone become a good cook and a great host. [Click here](https://www.foodandwine.com/author/jonah-reider) to read my contributions for the magazine.

#### Upgrade Your Kitchen

More than anything, people ask me what stuff they should get for their kitchen. So: [here is my list](https://jonahreider.com/?page=diy&post=2019-08-17-cooking-essentials "What should I get for my kitchen? What are the best tools for a kitchen?") of the tools I use every day to optimize my kitchen for confident, improvisational cooking and hosting. It’s probably slightly out of date but still.

From containers to knives, from a cutting board to the best vegetable peeler, I've selected affordable, functional, and beautiful upgrades to any home cooking workflow.

### Contact

[Email me](Mailto:jonah@jonahreider.com) if you have something cool to collaborate on.

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