/**
 *	Limit text input
 *	Author: 	Miguel Guerreiro
 *	Updated:	2011-10-03
 */

;(function() {
	$.fn.charLimit = function(limit) {
		var me = this,
			myId = me.attr('id'),
			info = $('<span/>',{id:myId+'-charsleft',css:{fontSize:'10px',color:'#9f9'}}),
			// get the character limit
			chars = me.val().length,
			limit = limit || 500;
		me.focus(function() {
			info.css({
				position:	'absolute',
				top:		me.position().top + me.height() - 15,
				left:		me.position().left + 5
			}).html((limit - chars) + ' remaining');
			me.after(info);
		})
		.blur(function() {
			info.remove();
		})
		.keyup(function() {
			var text = me.val();
			chars = text.length;
			// don't allow more characters than the limit
			if (chars > limit) {
				chars = limit;
				me.val(text.substr(0,limit));
			}
			if (limit - chars < 10) {
				info.css({color:'#f99'});
			} else {
				info.css({color:'#9f9'});
			}
			info.html((limit-chars) + ' remaining');
		});
	};
})(jQuery);