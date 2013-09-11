CSSVacuum
======
_optimize your critical rendering path_

__created at tech crunch disrupt sf 2013__

![CSSVacuum](https://raw.github.com/ndreckshage/CSSVacuum/master/lib/cssvacuum.jpg)

Critical Rendering Path
=======================
Ilya Grigorik gave a great talk at Velocity on the [Critical Rendering Path](http://bit.ly/mobilecrp). Please check out his full presentation, but essentially, above the fold CSS should be inlined, and external CSS should by loaded asynchronously.

Eventually, this could work with the [mod_pagespeed filter](https://developers.google.com/speed/pagespeed/module/filter-prioritize-critical-css), so you don't have to determine the relevant styles manually.

CSSVacuum is...
===============
a tool to help determine what css if 'critical'. It is a Chrome content script (extension) that will

+ determine all styles that are called **above the fold**
+ provide css to copy and paste into the new inlined header
+ provide a nice animation while it works

CSSVacuum isnt...
=================
+ an out of the box solution to automatically inline css
+ ready for production

Example use in production...
============================
+ setup a PhantomJS script, that utilizes portions of Chrome extension.
+ job that triggers Phantom to hit all relative pages on deploy (and clear existing cache keys)
+ cache the resulting CSS
+ if cache key exists, serve critical CSS inline, and full CSS async in footer

Install (source)
================
+ clone the repo
+ open Chrome and go to [extensions](chrome://extensions)
+ click developer mode, load unpacked extensions, and select repo
+ enable CSSVacuum

Use
===
+ with CSSVacuum installed, go to any url with ?CSSVacuum in query string. "http://amazon.com?CSSVacuum", for example.
+ click the CSSVacuum button
+ copy and paste the resulting css

Todo
====
+ Lots of room for improvement
+ Eliminate unecessary selectors (right now any selector, regardless of specificity, is included if it matches a class name)
+ Do guess work to limit resulting CSS filesize down to 14k.
+ PhantomJS script for production use.
