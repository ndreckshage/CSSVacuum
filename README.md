CSSVacuum
======
optimize your critical rendering path. this will let you remove external css from header, and load async in foot, without a flash of content

__created at tech crunch disrupt sf 2013__

![CSSVacuum](https://raw.github.com/ndreckshage/CSSVacuum/master/cssvacuum.jpg)

what?
=====
ilya grigorik gave a great talk at velocity about the [critical rendering path](http://bit.ly/mobilecrp). Essentially, above the fold CSS should be inlined, and external CSS should by loaded asynchronously.

figuring out these critical styles + keeping them maintained could be difficult.

what CSSVacuum is
==============
CSSVacuum is a chrome content script (extension) that will

+ determine all styles that are called **above the fold**
+ handle cross domain issues
+ match all css styles with classes that are used
+ provide css to copy and paste into the new inlined header
+ provide a nice animation while it works

__so -- if you delete all styles from a page, then paste in CSSVacuum styles, you will see that the top 600px of the page is styled correctly, while the bottom portion of the page will not have all styles. The remaining styles would be laoded async__

install
=======
+ clone the repo
+ open chrome and go to [extensions](chrome://extensions)
+ click developer mode, load unpacked extensions, and select repo
+ enable CSSVacuum

use
===
+ with CSSVacuum installed, go to any url with ?CSSVacuum in query string. (http://amazon.com?CSSVacuum,for example).
+ click the CSSVacuum button
+ copy and paste the resulting css
+ paste the css into your header, and load stylesheet async
+ contribute back to this project so it can be good enough to release to chrome store

todo
====
+ lots of room for improvement
+ chrome web store
+ eliminate unecessary selectors (right now any selector, regardless of specificity, is included if it matches a class name)
+ figure out way to get the filesize down as small as possible
