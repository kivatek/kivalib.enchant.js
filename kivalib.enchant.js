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


var IgniterPool = enchant.Class.create(KlObjectPool, {
	initialize: function(limit) {
		KlObjectPool.call(this, limit);
	},
	builder: function() {
		return new Entity();
	},
	onobtained: function(entity) {
		entity.clearEventListener();
		var pool = this;
		entity.on('removed', function(event) {
			pool.releaseObject(event.target);
		});
	}
});

var igniterPool_;

// Igniterのオブジェクトプールを生成する。
function createIgniterPool(size) {
	igniterPool_ = new IgniterPool(size);
}

// Igniterをオブジェクトプールから取り出す。
function obtainIgniter() {
	return igniterPool_.obtainObject();
}

// 指定したフレーム数を経過後にprocを実行する。
function regDelayedUpdater(group, queue, delay, proc, args) {
	var igniter = obtainIgniter();
	if (igniter) {
		group.addChild(igniter);
		igniter.tl
			.delay(delay)
			.then(function() {
				group.removeChild(igniter);
				regUpdater(queue, proc, args);
			});
	}
}


var KlUpdater = enchant.Class.create({
	initialize: function() {
		this.proc = null;
		this.args = [];
	}
});

var KlUpdaterPool = enchant.Class.create(KlObjectPool, {
	initialize: function(limit) {
		KlObjectPool.call(this, limit);
	},
	builder: function() {
		return new KlUpdater();
	},
	onobtained: function(updater) {
		updater.proc = null;
		updater.args = [];
	}
});

var updaterPool_;

// KlUpdaterのオブジェクトプールを生成する。
function createUpdaterPool(size) {
	updaterPool_ = new KlUpdaterPool(size);
}

// KlUpdaterをオブジェクトプールから取り出す。
function obtainUpdater() {
	return updaterPool_.obtainObject();
}

// Updaterをオブジェクトプールへ戻す。
function releaseUpdater(updater) {
	updaterPool_.releaseObject(updater);
}

// アプリのフレームメソッドで実行するprocを登録する。
function regUpdater(queue, proc, args) {
	var updater = obtainUpdater();
	if (updater) {
		updater.proc = proc;
		updater.args = args;
		queue.push(updater);
	}
}


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
