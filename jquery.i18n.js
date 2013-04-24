/*
 * jQuery i18n plugin
 * @requires jQuery v1.1 or later
 *
 * See http://recursive-design.com/projects/jquery-i18n/
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 1.0.0 (201210141329)
 */
 (function($) {
  /**
   * i18n provides a mechanism for translating strings using a jscript dictionary.
   *
   */

  /*
   * i18n property list
   */
  $.i18n = {

  	dict: null,

    plural: null,

    /**
     * setDictionary()
     *
     * Initialises the dictionary.
     * Add dictionary to an existing dictionary
     *
     * @param  property_list i18n_dict : The dictionary to use for translation.
     */
  	setDictionary: function(i18n_dict) {
        if (this.dict === null) {
            this.dict = i18n_dict;
        } else {
            $.extend(this.dict, i18n_dict);
        }
  	},

    /**
     * setPlural()
     *
     * Example string for russian language plural
     * In language 1 singular and 2 plural forms
     * 'plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)'
     *
     * Needed array with 3 elements
     *  "%s day": {
     *       0: "%s день",
     *       1: "%s дня",
     *       2: "%s дней"
     *   }
     *
     * String analog from gettext
     *
     * @param {string} plural_form
     */
    setPlural: function(plural_form) {
        this.plural = plural_form;
    },

    /**
     * _p()
     *
     * Example
     * _p('%s day', '%s days', 4)
     *
     * @param {string} singular_form : Singular form string
     * @param {string} plural_form   : Plural form string
     * @param {int} number           : To calculate the number of plural forms
     */
    _p: function(singular_form, plural_form, number) {
        var translate_list = this.dict[singular_form];

        //Convert number to array
        var number_arr = new Array();
        number_arr.push(number);

        if (translate_list === undefined || this.plural === null) {
            //No translated, return english string
            var en_string = number > 1 ? plural_form : singular_form;
            return this.printf(en_string, number_arr);
        } else {
            //Executed plural string and translated
            var plural_string = this.plural.replace(/n%/g, number + "%");
            eval(plural_string);
            return this.printf(translate_list[plural], number_arr);
        }
    },

    /**
     * _()
     *
     * Looks the given string up in the dictionary and returns the translation if
     * one exists. If a translation is not found, returns the original word.
     *
     * @param  string str           : The string to translate.
     * @param  property_list params : params for using printf() on the string.
     *
     * @return string               : Translated word.
     */
  	_: function (str, params) {
  		var result = str;
  		if (this.dict && this.dict[str]) {
  			result = this.dict[str];
  		}

  		// Substitute any params.
  		return this.printf(result, params);
  	},

    /*
     * printf()
     *
     * Substitutes %s with parameters given in list. %%s is used to escape %s.
     *
     * @param  string str    : String to perform printf on.
     * @param  string args   : Array of arguments for printf.
     *
     * @return string result : Substituted string
     */
  	printf: function(str, args) {
  		if (!args) return str;

  		var result = '';
  		var search = /%(\d+)\$s/g;

  		// Replace %n1$ where n is a number.
  		var matches = search.exec(str);
  		while (matches) {
  			var index = parseInt(matches[1], 10) - 1;
  			str       = str.replace('%' + matches[1] + '\$s', (args[index]));
  		  matches   = search.exec(str);
  		}
  		var parts = str.split('%s');

  		if (parts.length > 1) {
  			for(var i = 0; i < args.length; i++) {
  			  // If the part ends with a '%' chatacter, we've encountered a literal
  			  // '%%s', which we should output as a '%s'. To achieve this, add an
  			  // 's' on the end and merge it with the next part.
  				if (parts[i].length > 0 && parts[i].lastIndexOf('%') == (parts[i].length - 1)) {
  					parts[i] += 's' + parts.splice(i + 1, 1)[0];
  				}

  				// Append the part and the substitution to the result.
  				result += parts[i] + args[i];
  			}
  		}

  		return result + parts[parts.length - 1];
  	}

  };

  /*
   * _t()
   *
   * Allows you to translate a jQuery selector.
   *
   * eg $('h1')._t('some text')
   *
   * @param  string str           : The string to translate .
   * @param  property_list params : Params for using printf() on the string.
   *
   * @return element              : Chained and translated element(s).
  */
  $.fn._t = function(str, params) {
    return $(this).text($.i18n._(str, params));
  };

})(jQuery);
