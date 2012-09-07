describe("jquery.i18n plugin", function() {
	it("translates a key into the string", function() {
		$.i18n.setDictionary({ a_key:"translated string" });
		
		expect($.i18n._('a_key')).toEqual("translated string");
	});
	
	it("returns the key when there is no translation", function() {
		$.i18n.setDictionary({ a_key:"translated string" });
		
		expect($.i18n._('another_key')).toEqual("another_key");
	});
	describe("variable substitution", function() {
		describe("variable lists", function() {
			it("allows a string varialbe to be substitued into a translation", function() {
				$.i18n.setDictionary({ a_key:"translated string %s" });

				expect($.i18n._('a_key', ["variable"])).toEqual("translated string variable");
			});
		
		
			it("allows many string varialbe to be substitued into a translation", function() {
				$.i18n.setDictionary({ a_key:"translated string %s - %s - %s" });

				expect($.i18n._('a_key', ["variables", "in", "list"])).toEqual("translated string variables - in - list");
			});
		});
		
		describe("numbered variables", function() {
			
			it("put 2 numbered variables out of order", function() {
				$.i18n.setDictionary({ a_key:"translated string %2$s - %1$s" });

				expect($.i18n._('a_key', ["order", "in", ])).toEqual("translated string in - order");
			});
			
		
		});
		
		
	});
	
	
});