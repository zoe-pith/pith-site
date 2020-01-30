---
layout: default
title: "Tools, Tips, and Tricks"
permalink: /diy
published: true
---

Tap into the joy of do-it-yourself hospitality: below are my tips, tools, and no-stress recipes to become a more creative, improvisational, and confident host.

{% if site.tags != "" %}
{% include tag.html %}
{% endif %}

<ul id="posts">
<!-- DO WHERE PUBLISHED ONCE ON REAL SITE -->
  {% assign published_posts = site.posts | sort: "date" | reverse %} 
  {% for post in published_posts %}
    <li class="post {{ post.tags | join: '-tag ' | append: '-tag' }}">
      <a href="?page=diy&post={{ post.url | remove_first: '/'}}" onclick="return showPost(this.search)">
        <img src="{{ post.icon }}">
        <span>{{ post.title }}</span>
      </a>
      <div>
        <h2>{{post.title}}</h2>
        {% if post.tags.size > 0 %}
          <div id="tags"># 
              {% for tag in post.tags %}
                <a href="/?page=diy&tag={{ tag }}" onclick="return filterPosts('{{ tag }}')">{{tag}}</a>
                {% unless forloop.last %}
                 &middot; 
                {% endunless %}
              {% endfor %}
          </div>
        {% endif %}
      </div>
    </li>
  {% endfor %}
</ul>
<article id="post"></article>
<div id="back-button"><a href="?page=diy" onclick="return goBack()">&larr; Back</a></div>
