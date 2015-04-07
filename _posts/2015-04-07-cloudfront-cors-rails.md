---
layout: post
title: "Rails with AWS CloudFront"
disqus_comments: true
categories: rails aws cloudfront cors
---
Let's confess, Rails isn't very good at serving static assets.
Ideally, you'd have Nginx taking care of this job which it does pretty well.

However, in some cases, you can't have Nginx running in front of your
application server. For example, when you're running on Heroku.

To serve your assets more efficiently, a good way to do it is to serve those
assets from a CDN. For this, my favorite pick is Amazon AWS CloudFront.

### Create a new distribution

You need an Amazon AWS account to get this done.
Log in to the CloudFront control panel and select 'Create distribution'.
When prompted for the delivery method, select ‘Web’.

You should type the domain name for your application as the
'Origin Domain Name' field. Just make sure to include www if you serve
from www because CloudFront won't play nice with redirections. You will
see 302 Moved Permanently and CloudFront will redirect back to your domain
every time you request an asset.

Also make sure you choose 'Whitelist' from the 'Forward Headers' dropdown then
pick 'Origin' from the 'Whitelist Headers' and hit 'Add >>'.

Once the distribution is created (takes less than 10 mins), test it by
requesting an asset from your newly created CloudFront distribution.

http://www.example.com/assets/application-<HASH>.css

becomes:

http://<YOUR DISTRIBUTION SUBDOMAIN>.cloudfront.net/assets/application-<HASH>.css

### Configure Rails to Serve Static Assets

Now we need to configure Rails to serve assets from CloudFront. In order to do 
so, you need to uncomment and modify the following line:

    # config/environments/production.rb
    config.action_controller.asset_host = "<YOUR DISTRIBUTION SUBDOMAIN>.cloudfront.net"

When you deploy this, your application should start serving assets from 
CloudFront. Yay!

### CORS

So far, your JavaScript, Stylesheets and images would work fine. However, some
other asset types like fonts won't work due to CORS (Cross-Origin Resource
Sharing).

In this case, you will see the following error in Chrome Console:
    
    Font from origin 'http://xyz123.cloudfront.net' has been blocked 
    from loading by Cross-Origin Resource Sharing policy: No 
    'Access-Control-Allow-Origin' header is present on the requested resource.
    Origin 'http://example.com' is therefore not allowed access.

This basically means that your Rails application should grant CloudFront 
access to its by-default-private assets like fonts because only then CloudFront
will pass the CORS headers back in its response, browsers will know that 
CloudFront (which is the owner of the asset from the browsers' point of view) 
is granting your domain access to CloudFront's assets.

One easy way to do this is by adding `rack-cors` to your `Gemfile`:
    
    gem 'rack-cors', :require => 'rack/cors'
    
After running `bundle`, you need to configure your application to insert the 
headers in the Rack Middleware. The following sample is quite permissive but it
will suffice for the purpose of this blog post:

    config.middleware.insert_before 0, "Rack::Cors" do
      allow do
        origins '*'
        resource '*', :headers => :any, :methods => [:get, :head, :options]
      end
    end

This, combined with the 'Whitelist' option we chose in the first step, would
allow CloudFront to serve your fonts correctly.

References:
  
  * https://devcenter.heroku.com/articles/using-amazon-cloudfront-cdn#amazon-cloudfront