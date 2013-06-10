---
layout: post
title: "PHP on Cake vs Ruby on Rails"
disqus_comments: true
---

Recently I had the opportunity to attend a seminar about Ruby on Rails, things were nice with Ruby and Rails, I liked scaffolding, I also liked the various features of Rails and I think it's the real power of RoR.

Afterwards I deceided to put Rails versus Cake PHP, a PHP framework that works on all recent PHP versions from 4.3.2 till 5.0 (I haven't tested it on PHP 5.1 but I think it will need some hands-on work to have it error-proof).

I started by creating a simple e-commerce database-driven site with them both and overall result I get is: I really see that Cake PHP is a PHP version of Rails.
But here's what I found in details:
1. MVC: both follow the MVC pattern (Model, View and Controller) and both are OOP.
2. Naming convention: the smart English recognition provided is cool (simply you have to call all your DB tables in plural, but both are smart enough to understand that people is the plural of person!).
3. Directory structure: Cake PHP has the same directory hirarchy of a typical Rails application.
4. Web 2.0: Both support AJAX, maybe in a little bit different ways but still both can create AJAX stuff with ease.
5. Testing: Both were built with testing in mind, you simply provide your application with three databases: testing, developing and production. This way you can always guarantee your testing team leader will be satisfied or you can guarantee a no-white-screen-of-death pages in your application.
6. Plugins: are great addons to Rails while Cake is still laking community, but I think it will sooner attract more developer and I think the white page in Cake PHP's site will one day have some text!
7. Caching: caching is supported in both of them, I haven't yet tested this myself on them both.
8. IDE: Ruby on Rails has now many some nice IDE's, they're already MVC ready, while PHP is still laking a good IDE (forget about it's free or not), I still see only Zend Studio offering some real power of an IDE (though it's very expensive for the punch of features it offers.

Conclusion:
I liked how creating blogs, forums and other famous applications is some lines of code, things can go easy with your combo-sized applications, I also liked the idea of structuring your applications the same way, this has two sides: it will allow everyone to understand your data flow, we will all enjoy ease of coding and refactoring other's code, and this is the good part of it, the bad part is simply it will allow everyone to fool your application because everyone knows your directory structure, this is a big security risk --IMHO. And unless your choice of the framework is right, you may find yourself having many security halls not because what you types, it's because the framework has these bugs already installed! I do not think I can afford the time to debug a framework, thus it's better off using a framework of a reasonable community to have my bugs solved quickly.

I think if you're in a hurry to start an application, or have a very near deadline for an application, you should take a look at your flavor of MVC framework (Rails or Cake), you will be astonished. But I, for many reasons, don't like having everything going that rapid, I still won't go the MVC framework way without getting things more obvious and more stable.