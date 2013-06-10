---
layout: post
title: "Delivering emails to GMail, Yahoo! and Hotmail"
disqus_comments: true
---

Introduction: in the mid-2002, many e-mail providers like Yahoo and Hotmail (no GMail at that time) started the war against spam and they went on improving spam fighting since then.
Now domain owners are fighting with anti-spam solutions which are blocking their innocent e-mails.
This blog entry is a result of one of the fights happening everyday :)

GMail:

Google was the easiest mail vendor to deal with, it relies solely on an open standard called SPF which is simply a TXT record a domain owner can put on his domain's DNS zone to state that the domain is fully responsible for e-mails sent from it under specific circumstances.
Read more at http://www.openspf.org/Introduction
In the OpenSPF website you will find a wizard that will help you generate your SPF signature.
After adding the SPF TXT record, e-mails started to appear in the Inbox instead of junk.
I must confess that I strongly believe that GMail does *NOT* discard any e-mail coming to your account even if it recognized it's even a phishing e-mail!

Yahoo!:

Yahoo is also fond of open source solutions and the folks there started relying on DomainKeys Identified Mail, aka DKIM, which is a collaborative work between many IT big names like: Alt-N Technologies, AOL, Brandenburg Internetworking, Cisco, EarthLink, IBM, Microsoft, PGP Corporation, Sendmail, StrongMail Systems, Tumbleweed, VeriSign plus Yahoo! for sure.
PS: Microsoft was participating in DKIM and then it used its own technology instead of DKIM! These guys keep surprising me.
Anyways DKIM is a bit tough solution since it requires patching your mail server to attach your DKIM Public Key with every outgoing e-mail which is then being matched with what the mail receiver requests from the sender domain and in case they match then Yahoo, for example, will allow this e-mail to its inbox if the sender domain isn't blacklisted by Yahoo or by any public blacklist.
Read more at http://www.ietf.org/rfc/rfc4871.txt
The interesting thing was: when Yahoo doesn't find a DKIM in the message, it falls back to SPF and will behave like GMail will do with a message.

Hotmail:

Microsoft, as I mentioned above, was collaborating in the DKIM. But they use their own technology, called SenderID. Sender ID is basically SPF with Microsoft's spices. SenderID is a caching system for SPF records. Thus you will find things a bit quicker if you e-mailed senderid@microsoft.com to inform them you changed your SPF record or created one. Then they will reload your domain's cache.
Read more at http://www.microsoft.com/senderid
Once again this means that Microsoft relies on SPF. After creating SPF record for the domain under investigation, e-mails started to appear in Hotmail's junk mail which isn't expected and is an indicator that there's something else to do.

I hope this helps anyone.