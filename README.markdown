
About
-----

_jQuery-i18n_ is a jQuery plugin for doing client-side translations in javascript. It is based heavily on [javascript i18n that almost doesn't suck](http://markos.gaivo.net/blog/?p=100) by Marko Samastur, and is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

Installation
------------

You'll need to download the [jQuery library](http://docs.jquery.com/Downloading_jQuery#Current_Release), and include it before _jquery.i18n.js_ in your HTML source. See the _examples_ folder for examples.

Usage
-----

Before you can do any translation you have to initialise the plugin with a 'dictionary' (basically a property list mapping keys to their translations).

```javascript
var my_dictionary = {
    'some text':      'a translation',
    'some more text': 'another translation'
}
$.i18n.setDictionary(my_dictionary);
```

Once you've initialised it with a dictionary, you can translate strings using the $.i18n._() function, for example:

```javascript
$('div#example').text($.i18n._('some text'));
```

or using $('selector')._t() function

```javascript
$('div#example')._t('some text');
```

Wildcards
---------

It's straightforward to pass dynamic data into your translations. First, add _%s_ in the translation for each variable you want to swap in :

```javascript
var my_dictionary = {
    "wildcard example"  : "We have been passed two values : %s and %s."
}
$.i18n.setDictionary(my_dictionary);
```

Next, pass an array of values in as the second argument when you perform the translation :

```javascript
$('div#example').text($.i18n._('wildcard example', [100, 200]));
```

or

```javascript
$('div#example')._t('wildcard example', [100, 200]);
```

This will output _We have been passed two values : 100 and 200._

Because some languages will need to order arguments differently to english, you can also specify the order in which the variables appear :

```javascript
var my_dictionary = {
    "wildcard example"  : "We have been passed two values : %2$s and %1$s."
}
$.i18n.setDictionary(my_dictionary);

$('div#example').text($.i18n._('wildcard example', [100, 200]));
```

This will output: _We have been passed two values: 200 and 100._

If you need to explicitly output the string _%s_ in your translation, use _%%s_ :

```javascript
var my_dictionary = {
    "wildcard example"  : "I have %s literal %%s character."
}
$.i18n.setDictionary(my_dictionary);

$('div#example').text($.i18n._('wildcard example', [1]));
```

This will output: _I have 1 literal %%s character._

Plural Forms
------------

This plugin uses plural forms such as in Gettext.
[List of plural forms expressions for many languages](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms)
For example:

```text
plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)
```

For the addition plural form is used next function

```javascript
$.i18n.setPlural('plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)');
```

For translate string used function _p(), for example:

```javascript
$.i18n._p('%s day', '%s days', 3);
```
First parameter - singular form, second parameter - plural form and last parameter - number of plural forms.

An array with the translations should be the

```javascript
$.i18n.setDictionary(
    "%s day": {
        0: "%s день",
        1: "%s дня",
        2: "%s дней"
    }
);
```

Building From Scratch
---------------------

You can build the regular, un-minified version simply by running _ant_:

```bash
$ ant
Buildfile: build.xml

jquery.i18n:
     [echo] Building ./jquery.i18n.js
     [echo] ./jquery.i18n.js built.

BUILD SUCCESSFUL
Total time: 0 seconds
```

Before you can build the minified version yourself, you'll need to download the [Google Closure Compiler](http://closure-compiler.googlecode.com/files/compiler-latest.zip) and put it in a folder called _build_:

```bash
$ mkdir build
$ cd build
$ wget http://closure-compiler.googlecode.com/files/compiler-latest.zip
$ unzip compiler-latest.zip
```

Once you have the compiler, you can build the minified version by running _ant min_:

```bash
$ ant min
Buildfile: build.xml

jquery.i18n:
     [echo] Building ./jquery.i18n.js
     [echo] ./jquery.i18n.js built.

min:
     [echo] Building ./jquery.i18n.min.js
    [apply] Applied java to 1 file and 0 directories.
   [delete] Deleting: /Users/dave/Documents/Code/jquery/jquery-i18n/tmpmin
     [echo] ./jquery.i18n.min.js built.

BUILD SUCCESSFUL
Total time: 1 second
```


Change history
-----------

* **Version 1.0.0 (2012-10-14)** : 1.0 release - addition of a test suite (huge thanks to [alexaitken](https://github.com/alexaitken)), plus a major cleanup.

Bug Reports
-----------

If you come across any problems, please [create a ticket](https://github.com/recurser/jquery-i18n/issues) and we'll try to get it fixed as soon as possible.


Contributing
------------

Once you've made your commits:

1. [Fork](http://help.github.com/fork-a-repo/) jquery-i18n
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. Create a [Pull Request](http://help.github.com/pull-requests/) from your branch
5. That's it!


Author
------

Dave Perrett :: mail@recursive-design.com :: [@recurser](http://twitter.com/recurser)


Copyright
---------

Copyright (c) 2010 Dave Perrett. See [License](https://github.com/recurser/jquery-i18n/blob/master/LICENSE) for details.



