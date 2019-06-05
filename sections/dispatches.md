---
layout: default
title: Dispatches
permalink: /dispatches
weight: 2
---

<script src="/js/filter.js" type="text/javascript"></script>
{% if site.tags != "" %}
  {% include tag.html %}
{% endif %}

<ul id="posts">
  {% for post in site.posts %}
    <li class="{{ post.tags | join: '-tag ' | append: '-tag' }}">
      <a href="{{ post.url }}">
        <img src="{{ post.icon }}">
        <span>{{ post.title }}</span>
      </a>
    </li>
  {% endfor %}
</ul>
