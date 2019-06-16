---
layout: default
title: Do It Yourself
permalink: /diy
weight: 2
---

<script src="/js/posts.js" type="text/javascript"></script>
{% if site.tags != "" %}
  {% include tag.html %}
{% endif %}
<ul id="posts">
  {% for post in site.posts %}
    <li class="post {{ post.tags | join: '-tag ' | append: '-tag' }}">
      <a href="{{ post.url }}" onclick="return showPost(this)">
        <img src="{{ post.icon }}">
        <span>{{ post.title }}</span>
      </a>
      <div>
        <h1>{{post.title}}</h1>
        {% if post.tags.size > 0 %}
          <div id="tags"># 
              {% for tag in post.tags %}
                <a href="/diy#{{ tag }}" onclick="return filterPosts('{{ tag }}')">{{tag}}</a>
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
<div id="post"></div>
<div id="back-button"><a href="#" onclick="goBack()">&larr; Back</a></div>
