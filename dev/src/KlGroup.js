KlGroup = enchant.Class.create(enchant.Group, {
	initialize: function(type) {
		Group.call(this);
	},
	removeAllChildren: function() {
		while (this.childNodes.length) {
			this.removeChild(this.lastChild);
		}
	}
});
