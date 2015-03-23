---
layout: post
title: "Saving Paperclip Attachemnts Encoded Base64"
disqus_comments: true
categories: ruby rails
---

### The problem:
You need to upload an image from a mobile device to a Rails application which uses Paperclip.

Your model might look similar to this:


    class User < ActiveRecord::Base
      attr_accessible :name
      has_attached_file :image,
      styles: {
        small: '90x90#',
        medium: '160x120#',
        large:  '300x200#',
      }
And you want to be able to upload user images.

### The solution

You need to add the following to your model:

    def image_data=(data_value)
      StringIO.open(Base64.strict_decode64(data_value)) do |data|
        data.class.class_eval { attr_accessor :original_filename, :content_type }
        data.original_filename = "temp#{DateTime.now.to_i}.png"
        data.content_type = "image/png" #TODO: get content type from file
        self.image = data
      end
      
Voila!
