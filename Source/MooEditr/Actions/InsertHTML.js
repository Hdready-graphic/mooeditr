/*
---

script: Actions/InsertHTML.js

description: Extends MooEditr to allow HTML to be inserted

license: MIT-style license

authors:
- Radovan Lozej

requires:
# - MooEditr
# - MooEditr.UI
# - MooEditr.Actions

provides: [MooEditr.UI.InsertHTML, MooEditr.Actions.inserthtml]

usage: |
  Add the following tags in your html
  <link rel="stylesheet" href="MooEditr.css">
  <link rel="stylesheet" href="MooEditr.InsertHTML.css">
  <script src="mootools.js"></script>
  <script src="MooEditr.js"></script>
  <script src="MooEditr.InsertHTML.js"></script>

  <script>
  window.addEvent('domready', function(){
    var MooEditr = $('textarea-1').MooEditr({
      actions: 'bold italic underline strikethrough | inserthtml | toggleview',
      externalCSS: '../../Assets/MooEditr/Editable.css'
    });
  });
  </script>

...
*/

MooEditr.lang.set({
	embed: 'Enter HTML code',
	insertHTML: 'Insert HTML'
});

MooEditr.UI.InsertHTMLDialog = function(editor){
	var html = MooEditr.lang.get('embed') + ' <textarea class="dialog-f" value="" rows="2" cols="40"></textarea> '
		+ '<button class="dialog-button dialog-ok-button">' + MooEditr.lang.get('ok') + '</button> '
		+ '<button class="dialog-button dialog-cancel-button">' + MooEditr.lang.get('cancel') + '</button>';
	return new MooEditr.UI.Dialog(html, {
		'class': 'MooEditr-flash-dialog',
		onOpen: function(){
			var input = this.el.getElement('.dialog-f');
			(function(){
				input.focus();
				input.select();
			}).delay(10);
		},
		onClick: function(e){
			if (e.target.tagName.toLowerCase() == 'button') e.preventDefault();
			var button = document.id(e.target);
			if (button.hasClass('dialog-cancel-button')){
				this.close();
			} else if (button.hasClass('dialog-ok-button')){
				this.close();
				var div = new Element('div').set('html', this.el.getElement('.dialog-f').get('value').trim());
				editor.selection.insertContent(div.get('html'));
			}
		}
	});
};

MooEditr.Actions.extend({
	
	inserthtml: {
		title: MooEditr.lang.get('insertHTML'),
		dialogs: {
			prompt: function(editor){
				return MooEditr.UI.InsertHTMLDialog(editor);
			}
		},
		command: function(){
			this.dialogs.inserthtml.prompt.open();
		}
	}
	
});
