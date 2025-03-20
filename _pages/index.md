---
layout: home
title: "Xing's CMB SBI Progress"
permalink: /
---

# CMB SBI Progress Tracking

<section class="recent-updates">
  <h2>Recent Updates</h2>
  
  {% assign recent_notes = site.notes | sort: "last_modified_at" | reverse %}
  <ul class="note-list">
    {% for note in recent_notes limit:5 %}
    <li class="note-item">
      <a href="{{ note.url | relative_url }}" class="internal-link">
        {{ note.title }}
      </a>
      <time class="update-time">
        {{ note.last_modified_at | date: "%Y-%m-%d" }}
      </time>
    </li>
    {% endfor %}
  </ul>
</section>