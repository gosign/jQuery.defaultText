/*
DefaultText v1.0
Copyright (C) 2010 by Lucas Jenss - Gosign media. GmbH
Tested with jQuery 1.4.2

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

;(function($) {
	$.fn.defaultText = function(settings) {
		var config = {text: 'Default Text', dataField: 'data-desc', clearOnSubmit: true};
		
		if(typeof settings == "string") {
			config.text = settings;
		}
		else if(settings instanceof Object) {
			$.extend(config, settings);
		}
		
		this.filter('input, textarea').each(function() {
			var obj = $(this);
			
			if(obj.val().length == 0) {
				obj.val(config.text);
			}
			
			obj.attr(config.dataField, config.text);
			obj.addClass('jquery-inputdesc');
			
			obj.focus(onfocus);
			obj.blur(onblur);

			// Reset the default text if the AJAX request for the
			// form is complete. This is needed because the AJAX
			// form may not disappear after submitting.
			obj.closest('form').bind('ajaxComplete', function() {
				obj.blur();
			});

			if(config.clearOnSubmit) {
				obj.closest('form').submit(function() { onsubmit(obj); });
			}
		});
		
		function onfocus(e) {
			var obj = $(e.currentTarget);
			if(obj.val() == obj.attr(config.dataField)) {
				obj.val('');
			}
		}
		
		function onblur(e) {
			var obj = $(e.currentTarget);
			if(obj.val().length == 0) {
				obj.val(obj.attr(config.dataField));
			}
		}
		
		function onsubmit(field) {
			if(field.val() == field.attr(config.dataField)) {
				field.val('');
			}
		}
		
		return this;
	};
})(jQuery);
