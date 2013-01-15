var Vector2 = enchant.Class.create({
	initialize: function(x, y) {
		this.x = x;
		this.y = y;
	},
	add: function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	},
	sub: function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	},
	normalize: function() {
	},
	debugPrint: function() {
		console.log('x:' + this.x + ', y:' + this.y);
	}
});
