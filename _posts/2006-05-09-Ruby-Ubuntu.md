---
layout: post
title: "Ruby 1.8.4 on Ubuntu"
disqus_comments: true
categories: ruby rails ubuntu
---

I tried installing Ruby and Rails on Ubuntu 5.10 (Breezy), I followed exactly 
what was written in the article: 
[http://fo64.com/articles/2005/10/20/rails-on-breezy](http://fo64.com/articles/2005/10/20/rails-on-breezy)


But I ran into trouble with Rails after the installation, Rails said: "Rails 
does not work with Ruby version 1.8.3".


After some search and a friend's help, it appears that you have to do the 
following BEFORE you follow what's in the article:
download your architecture-specific packages from:

```http://packages.ubuntu.com/dapper/libs/libruby1.8
http://packages.ubuntu.com/dapper/interpreters/ruby1.8
```

Then `dpkg -i` for both packages.

Finally `apt-get install rails`

Now you have Ruby 1.8.4 on Ubuntu.

Enjoy!