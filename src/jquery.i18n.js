/*
 * jQuery i18n plugin
 * @requires jQuery v1.1 or later
 *
 * See http://recursive-design.com/projects/jquery-i18n/
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version: @VERSION (@DATE)
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
	
  /**
   * setDictionary()
   *
   * Initialises the dictionary.
   *
   * @param  property_list i18n_dict : The dictionary to use for translation.
   */
  	setDictionary: function(i18n_dict) {
  		this.dict = i18n_dict;
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
  		var transl = str;
  		if (this.dict && this.dict[str]) {
  			transl = this.dict[str];
  		}
  		return this.printf(transl, params);
  	},
	
  /**
   * toEntity()
   *
   * Changes non-ASCII characters to entity representation.
   *
   * @param  string str    : The string to transform.
   *
   * @return string result : Original string with non-ASCII content converted to entities.
   */
  	toEntity: function (str) {
  		var result = '';
  		for (var i = 0; i < str.length; i++) {
  			if (str.charCodeAt(i) > 128) {
  				result += '&#' + str.charCodeAt(i) + ';';
  			} else {
  				result += str.charAt(i);
  			}
  		}
		
  		return result;
  	},
	
  /**
   * stripStr()
   *
   * Removes leading and trailing whitespace from a given string.
   *
   * @param  string str    : The string to strip.
   *
   * @return string result : The stripped string.
   */
   	stripStr: function(str) {
  		return str.replace(/^\s*/, '').replace(/\s*$/, '');
  	},
	
  /**
   * stripStrML()
   *
   * Strips each line of a multi-line string.
   *
   * @param  string str    : The multi-line string to strip.
   *
   * @return string result : Stripped string.
   */
  	stripStrML: function(str) {
  		// Split because m flag doesn't exist before JS1.5 and we need to
  		// strip newlines anyway
  		var parts = str.split('\n');
  		for (var i = 0; i < parts.length; i++) {
  			parts[i] = stripStr(parts[i]);
  		}
	
  		return stripStr(parts.join(' '));
  	},

  /*
   * printf()
   *
   * Substitutes %s with parameters given in list. %%s is used to escape %s.
   *
   * @param  string S      : String to perform printf on.
   * @param  string L      : Array of arguments for printf.
   *
   * @return string result : Substituted string
   */
  	printf: function(S, L) {
  		if (!L) return S;

  		var nS     = '';
  		var search = /%(\d+)\$s/g;
		
  		// Replace %n1$ where n is a number.
  		var matches = search.exec(S);
  		while (matches) {
  			var index = parseInt(matches[1], 10) - 1;
  			S         = S.replace('%' + matches[1] + '\$s', (L[index]));
  		  matches   = search.exec(S);
  		}
  		var tS = S.split('%s');

  		if (tS.length > 1) {
  			for(var i = 0; i < L.length; i++) {
  				if (tS[i].length > 0 && tS[i].lastIndexOf('%') == tS[i].length-1 && i != L.length-1) {
  					tS[i] += 's' + tS.splice(i+1,1)[0];
  				}
  				nS += tS[i] + L[i];
  			}
  		}
		
  		return nS + tS[tS.length-1];
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
