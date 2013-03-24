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

