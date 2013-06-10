---
layout: post
title: "Organize your downloads, the OS X way"
disqus_comments: true
---

If you are one of these guys who move files and organize them manually under the correct directory, this blog post isn't for you.

I usually download lots of files and I keep trying to cleanup my Downloads folder in so many ways. First, I configured every application to download in its own folder so I had Firefox, iChat, Mail, etc...

This didn't really help. When the time comes to cleanup the Downloads folder, I usually need to delete very old downloads because I no longer need a software update from mid-2009.

So next I tried one of Firefox's extensions to organize my downloads and used Glims for Safari. The idea was to organize downloaded files in a directory hierarchy where I can identify older files and remove them.

The problem with that solution is that it didn't work for all the applications I use so I decided to write a script to do that for me.

Writing that script in Bash, PHP or Python is an easy job but I wanted to do it the Mac way so I created this AppleScript and attached it to the Downloads folder using Folder Actions in OS X.

Try it out:

http://gist.github.com/445641