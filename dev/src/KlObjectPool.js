var KlObjectPool = enchant.Class.create({
	initialize: function(limit) {
		this.array = [];
		for (var n = 0; n < limit; n++) {
			var obj = this.builder();
			if (obj != null) {
				this.array.push(obj);
			}
		}
	},
	// オブジェクトをプールから取り出す。
	obtainObject: function() {
		if (this.array.length > 0) {
			var obj = this.array.pop();
			this.onobtained(obj);
			return obj;
		}
		return null;
	},
	// 使用済みのオブジェクトをプールに戻す。
	releaseObject: function(obj) {
		this.array.push(obj);
	},
	// 派生クラスでオーバーライドする。
	// プールするオブジェクトを生成するメソッド。
	builder: function() {
		return null;
	},
	// 必要に応じて派生クラスでオーバーライドする。
	// このメソッドはゲームコードからの利用要求があった場合にプールから取り出された後、
	// ゲームコードに送り返される前に呼び出される。
	onobtained: function(obj) {
	}
});

