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

