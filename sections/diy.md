---
layout: default
title: "Tools, Tips, and Tricks"
permalink: /diy
weight: 2
published: true
---

Tap into the joy of do-it-yourself hospitality: below are my tips, tools, and no-stress recipes to become a more creative, improvisational, and confident host.

{% if site.tags != "" %}
{% include tag.html %}
{% endif %}

<div id="loading">Loading posts&hellip;</div>
<ul id="posts">
<!-- DO WHERE PUBLISHED ONCE ON REAL SITE -->
  {% assign published_posts = site.posts | sort: "date" | reverse %} 
  {% for post in published_posts %}
    <li class="post {{ post.tags | join: '-tag ' | append: '-tag' }}">
      <a href="{{ post.url }}" onclick="return showPost(this.nextElementSibling)">
        <img src="{{ post.icon }}">
        <span>{{ post.title }}</span>
      </a>
      <div>
        <h2>{{post.title}}</h2>
        {% if post.tags.size > 0 %}
          <div id="tags"># 
              {% for tag in post.tags %}
                <a href="/#diy/{{ tag }}" onclick="return filterPosts('{{ tag }}')">{{tag}}</a>
                {% unless forloop.last %}
                 &middot; 
                {% endunless %}
              {% endfor %}
          </div>
        {% endif %}
        {{ post.content }}
      </div>
    </li>
  {% endfor %}
</ul>
<article id="post"></article>
<div id="back-button"><a href="#diy" onclick="goBack()">&larr; Back</a></div>
