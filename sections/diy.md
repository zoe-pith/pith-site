---
layout: default
title: Writing
permalink: "/diy"
published: false

---
Tap into the pleasure of do-it-yourself hospitality: here is some of my writing on cooking, hosting, travel, and more.

{% if site.tags != "" %}
{% include tag.html %}
{% endif %}

<ul id="posts">
<li id="no-posts-found">No posts found :(</li>
<!-- DO WHERE PUBLISHED ONCE ON REAL SITE -->
{% assign published_posts = site.posts | sort: "date" | reverse %}
{% for post in published_posts %}
<li class="post {{ post.tags | join: '-tag ' | append: '-tag' }}">
<a href="?page=diy&post={{ post.url | remove_first: '/'}}" onclick="return showPost(this.search)">
<img src="{{ post.icon }}" alt="">
<span>{{ post.title }}</span>
</a>
<div>
<h2>{{post.title}}</h2>
{% if post.tags.size > 0 %}
<div id="tags">#
{% for tag in post.tags %}
<a href="/?page=diy&tag={{ tag }}" onclick="return filterPosts('{{ tag }}')">{{tag}}</a>
{% unless forloop.last %}
·
{% endunless %}
{% endfor %}
</div>
{% endif %}
</div>
</li>
{% endfor %}
</ul>
<article id="post"></article>
<div id="back-button"><a href="?page=diy" onclick="return goBack()">← Back</a></div>