---
layout: default
title: Pith Supper Club
permalink: "/pith"

---
{comment

{% assign important_posts = site.posts | where: "important", true | sort: "date" | reverse %}

{% assign num_posts = important_posts | size %}

{% if num_posts > 0 %}

\### Recent Posts

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

\### Select Press

★★★ — \[Chicago Tribune\]([http://www.chicagotribune.com/dining/restaurants/ct-review-intro-jonah-reider-food-0928-20160924-column.html](http://www.chicagotribune.com/dining/restaurants/ct-review-intro-jonah-reider-food-0928-20160924-column.html "http://www.chicagotribune.com/dining/restaurants/ct-review-intro-jonah-reider-food-0928-20160924-column.html"))

Delicious — \[The New Yorker\]([http://www.newyorker.com/magazine/2017/05/22/pith-graduates-from-the-dorm](http://www.newyorker.com/magazine/2017/05/22/pith-graduates-from-the-dorm "http://www.newyorker.com/magazine/2017/05/22/pith-graduates-from-the-dorm"))

Yes, chef! — \[The New York Times\]([https://www.nytimes.com/2017/04/20/style/jonah-reider-pith-supper-club.html](https://www.nytimes.com/2017/04/20/style/jonah-reider-pith-supper-club.html "https://www.nytimes.com/2017/04/20/style/jonah-reider-pith-supper-club.html"))

An Innovative Cook — \[AP\]([https://www.apnews.com/52519470af634cb6afc1c0a2e6c7d731](https://www.apnews.com/52519470af634cb6afc1c0a2e6c7d731 "https://www.apnews.com/52519470af634cb6afc1c0a2e6c7d731"))

A coveted reservation — \[WSJ\]([http://www.wsj.com/articles/for-columbia-student-entrepreneur-dorm-restaurant-is-just-the-first-course-1454113319](http://www.wsj.com/articles/for-columbia-student-entrepreneur-dorm-restaurant-is-just-the-first-course-1454113319 "http://www.wsj.com/articles/for-columbia-student-entrepreneur-dorm-restaurant-is-just-the-first-course-1454113319"))

A Dining Experience — \[Forbes\]([https://www.forbes.com/video/5734702032001/#40eac57de450](https://www.forbes.com/video/5734702032001/#40eac57de450 "https://www.forbes.com/video/5734702032001/#40eac57de450"))

Pith is an exercise in do-it-yourself hospitality: I sporadically serve dinner for six guests out of my apartment in New York City.

_Currently on hold due to the COVID19 public health crisis. Stay healthy, and cook at home to stay sane!_

![Line drawing of wine, fish, cherries, rosemary and basil](/images/pith-illustrations.png)

### Current Menu

Sesame sourdough bread; soft salted butter; plenty of radishes; green olives.

Smashed peas and mint on toast; raw fluke with cucumber and shiso; raw beef with pickled coriander berries.

Little lettuces with lots of dill and shallots; charred spring onions with vinegar and walnuts; steamed asparagus with golden butter and bay leaf.

Tilefish and fava beans cooked gently in a smoky rhubarb vinaigrette; crispy potatoes with thick cream; lemony garlicky greens.

Rhubarb crumble; brown butter ice cream.

### Reservations

Tickets are all inclusive of food, wine, and hospitality. BYOB encouraged if shared communally. Tickets are non-refundable but fully transferable, and limited to a maximum of two per order. Menu is entirely subject to change and no dietary restrictions can be accommodated. [Inquiries](mailto:inquiries@pith.space) are welcome regarding special events or partnerships.

<tito-widget event="pith/supper-club"></tito-widget>