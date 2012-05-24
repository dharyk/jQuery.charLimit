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
		// initialize function
		function __init(index, elem) {
			var $elem	= $(elem),
				myId	= $elem.attr('id') || ('autogen-cl'+clCount++),
				// feedback HTML
				info	= $('<span/>',{
					id: myId+'-charsleft',
					css: {
						width: ($elem.width() - 10),
						fontSize: '10px',
						textAlign: 'right',
						color: '#9f9'
					}
				}),
				// check the input for existing content's length
				chars	= (typeof $elem.val === "function") ? $elem.val().length : 0,
				// text to append after the countdown number
				text	= text || ' remaining',
				// maximum number of characters allowed
				max	= limit || 500;
			console.log(max);
			// onFocus event
			$elem
				.focus(function() {
					// position the feedback HTML
					info.css({
						position:	'absolute',
						top:		$elem.position().top + me.height() - 15,
						left:		$elem.position().left + 5,
						width:		$elem.width() - 10
					}).html((max - chars) + text).show();
				})
				// onBlur event
				.blur(function() {
					// hide the feedback HTML
					info.hide();
				})
				// onKeyUp event
				.keyup(function() {
					// get the current content of the textarea
					var content = me.val();
					// update the content's length
					chars = content.length;
					// don't allow more characters than the limit
					if (chars > max) {
						chars = max;
						// cap the content to the specified limit
						me.val(content.substr(0,max));
					}
					// show feedback text in red if reaching the limit, otherwise, text is green
					if (max - chars < 10) {
						info.css({color:'#f99'});
					} else {
						info.css({color:'#9f9'});
					}
					// update the feedback HTML
					info.html((max-chars) + text);
				});
			// add the feedback HTML to the DOM
			$elem.after(info);
		}
		// initialize each element selected
		me.each(__init);
		// maintain chainability
		return me;
	};
}(jQuery));