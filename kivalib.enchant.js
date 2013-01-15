var KlGroup = enchant.Class.create(enchant.Group, {
	initialize: function() {
		Group.call(this);
	},
	removeAllChildren: function() {
		while (this.childNodes.length) {
			this.removeChild(this.lastChild);
		}
	}
});

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


var ABS = Math.abs;
var CEIL = Math.ceil;
var COS = Math.cos;
var FLOOR = Math.floor;
var MAX = Math.max;
var MIN = Math.min;
var RANDOM = Math.random;
var SQRT = Math.sqrt;
var M_PI = Math.PI;

function degToRad(val)
{
    return ((val) / 180.0 * M_PI);
}

function radToDeg(val)
{
    return ((val) * (180.0 / M_PI));
}

function dotProduct(ax, ay, bx, by)
{
    return (ax * bx) - (ay * by);
}

function crossProduct(ax, ay, bx, by)
{
    return (ax * by) - (ay * bx);
}


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
