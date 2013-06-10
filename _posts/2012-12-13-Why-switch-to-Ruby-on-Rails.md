---
layout: post
title: "Why switch to Ruby on Rails?"
---

I kind of have been asked this question over and over so this is a reference if 
you were ever asked the same question.

**Preamble:**

Rails is an extremely mature RAD Framework to the extent that it's currently 
driving the MVC bandwagon. A lot of effort has been put by Java, PHP, Python and a lot more languages' communities to port or clone what Rails has offered. CakePHP, Symfony (PHP), PHP on Trax, Code Igniter (PHP), Grails (Java) and Django (Python) to name a few.

**The major pillars of Rails strength are:**

Reusing open source components
==============================
With a central repository of reusable modules, numbers can easily speak for 
themselves. There has been 56,022 gems (Ruby and Rails modules/plugins) created 
since July 2009. The second best after Rails is Drupal (LAMP CMS) with a shy 
19,358. References: rubygems.org and drupal.org.

Creating reusable components
=============================
Rails has a very unique advantages over many web application frameworks 
(including but not limited to PHP ZendFramework, Drupal and Django) which is 
being very strict MVC model, great attention to core backward-compatibility, 
being an integrated framework and the Ruby gems architecture (dependency 
management, package management, etc) has helped making gem creating a very easy 
job. Reference: being a Drupal module maintainer for years 
(http://drupal.org/user/75702) and a Ruby gems maintainer for couple years.

Productivity
=============
With Rails' scaffolding, easy Form APIs, strong ORM, Ruby's simple syntax, huge 
resources (documentation, tutorials, podcasts, video casts, code samples, etc) 
and being open source, starting a new project from scratch can not be quicker.
Learning curve has always been the greatest challenge when starting with a new 
technology. With Ruby on Rails, teams I worked with started producing working 
code since day 1 and while still knowing very less about both the language and 
the framework.
The great thing about Ruby is that it's a mixture between Java, PHP, Perl and 
Lisp which makes it a lot easier to learn for our team where everyone is coming 
from Java and PHP background.

Deployment
===========
Ruby on Rails currently offers a plenty of possibilities to run it on production
, it can even run under Apache, the way PHP does. Which makes it very easy to 
install on development and production.
With a lot of mature deployment tools like Capistrano, updating code and 
database on production is an easy job.
Rails also leverages a great deal of support from cloud providers: Heroku, 
Amazon AWS, and EngineYard to name a few.

Testing
========
With Rails, Unit Testing is integrated in the framework, Behavior testing tools 
like Cucumber are very mature, UI testing tools are already used in other 
technologies (like Watir).
While we won't start with all these types of testing, we will definitely 
increase our quality by automating testing on many levels which is something we,
 as a small team, need to do.
