SimpleObjectPool = enchant.Class.create({
	initialize: function(limit) {
		this.array = [];
		for (var n = 0; n < limit; n++) {
			var obj = this.builder();
			if (obj != null) {
				this.array.push(obj);
			}
		}
	},
	obtainObject: function() {
		if (this.array.length > 0) {
			var obj = this.array.pop();
			this.onobtained(obj);
			return obj;
		}
		return null;
	},
	releaseObject: function(obj) {
		this.array.push(obj);
	},
	builder: function() {
		return null;
	},
	onobtained: function(obj) {
	}
});

