# KlObjectPool

オブジェクトを最初にまとめて生成しアプリケーション実行時には再利用することでインスタンス生成のコストを抑えます。  
例えばシューティングゲームのように大量の敵が登場したり消滅したりを繰り返すようなケースで利用します。

## ■ 使用事例

    enchant();

    var EnemySprite = Class.create(Sprite, {
        initialize: function() {
            Sprite.call(this, 32, 32);
            this.image = game.assets['images/enemies.png'];
        }
    });

    EnemySpritePool = enchant.Class.create(KlObjectPool, {
        initialize: function(limit) {
            KlObjectPool.call(this, limit);
        },
        builder: function() {
            return new EnemySprite();
        },
        onobtained: function(sprite) {
            // 前回の利用時に変更されているかもしれないメンバを再初期化する。
            sprite.clearEventListener();
            sprite.scaleX = 1;
            sprite.scaleY = 1;
            var pool = this;
            sprite.on('removed', function(event) {
                // リンクからの削除イベントが通知されたらオブジェクトをプールへ返す。
                pool.releaseObject(event.target);
            });
        }
    });

    var _enemySpritePool;

    function createEnemySpritePool() {
        _enemySpritePool = new EnemySpritePool(256);
    }

    function obtainEnemySprite() {
        if (_enemySpritePool != null) {
            return _enemySpritePool.obtainObject();
        }
        return null;
    }

