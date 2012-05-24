/**
 *	Limit a textarea input to the allowed number of charaters (limit)
 *	displays the information of the remaining characters allowed, counting
 *	down as the user types; text turns red when the limit is about to be
 *	reached, text input beyond the limit is automatically removed
 *	Author: 	Miguel Guerreiro
 *	Updated:	2011-10-03
 */

;(function($) {
	var clCount = 0;
	$.fn.charLimit = function(limit,text) {
		var me		= this;
		if (me.length < 1) return me; // nothing to do here, but maintain chainability anyway
		var myId	= me.attr('id') || ('autogen-cl'+clCount++),
			// feedback HTML
			info	= $('<span/>',{
				id: myId+'-charsleft',
				css: {
					width: (me.width() - 10),
					fontSize: '10px',
					textAlign: 'right',
					color: '#9f9'
				}
			}),
			// check the input for existing content's length
			chars	= (typeof me.val === "function") ? me.val().length : 0,
			// text to append after the countdown number
			text	= text || ' remaining',
			// maximum number of characters allowed
			limit	= limit || 500;
		// onFocus event
		me.focus(function() {
			// position the feedback HTML
			info.css({
				position:	'absolute',
				top:		me.position().top + me.height() - 15,
				left:		me.position().left + 5,
				width:		me.width() - 10
			}).html((limit - chars) + text);
			// display the feedback HTML
			me.after(info);
		})
		// onBlur event
		.blur(function() {
			// hide the feedback HTML
			info.remove();
		})
		// onKeyUp event
		.keyup(function() {
			// get the current content of the textarea
			var content = me.val();
			// update the content's length
			chars = content.length;
			// don't allow more characters than the limit
			if (chars > limit) {
				chars = limit;
				// cap the content to the specified limit
				me.val(content.substr(0,limit));
			}
			// show feedback text in red if reaching the limit, otherwise, text is green
			if (limit - chars < 10) {
				info.css({color:'#f99'});
			} else {
				info.css({color:'#9f9'});
			}
			// update the feedback HTML
			info.html((limit-chars) + text);
		});
		return me;
	};
}(jQuery));