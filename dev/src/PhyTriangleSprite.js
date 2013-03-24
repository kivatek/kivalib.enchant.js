Box2D.Collision.Shapes.b2PolygonShape.prototype.SetAsTriangle = function (hx, hy) {
	if (hx === undefined) hx = 0;
	if (hy === undefined) hy = 0;

	this.m_vertexCount = 3;
	this.Reserve(3);

	// 各頂点の座標
	this.m_vertices[0].Set(0, (-hy));
	this.m_vertices[1].Set(hx, hy);
	this.m_vertices[2].Set((-hx), hy);

	// 各辺の法線ベクトル
	var rad = (30) / 180.0 * Math.PI;
	this.m_normals[0].Set( 1.0*Math.cos(rad), -1.0*Math.sin(rad));
	this.m_normals[1].Set( 0.0, 1.0);
	this.m_normals[2].Set(-1.0*Math.cos(rad), -1.0*Math.sin(rad));

	this.m_centroid.SetZero();
};

enchant.box2d.PhySprite.prototype.createPhyTriangle = function(staticOrDynamic, density, friction, restitution, awake) {
	this.staticOrDynamic = staticOrDynamic;
	var fixDef = new b2FixtureDef;
	fixDef.density = (density != null ? density : 1.0);             // 密度
	fixDef.friction = (friction != null ? friction : 0.5);          // 摩擦
	fixDef.restitution = (restitution != null ? restitution : 0.3); // 反発
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsTriangle(this.width / 2 / this.world_scale, this.height / 2 / this.world_scale);
	var bodyDef = new b2BodyDef;
	bodyDef.type = staticOrDynamic;
	bodyDef.position.x = 0;
	bodyDef.position.y = 0;
	bodyDef.awake = (awake != null ? awake : true);
	bodyDef.userData = this;
	return this.world.CreateBody(bodyDef).CreateFixture(fixDef);
};

enchant.box2d.PhyTriangleSprite = enchant.Class.create(enchant.box2d.PhySprite, {
	/**
	 * 三角形の物理シミュレーション用Sprite
	 * @example
	 *   var bear = new PhyTriangleSprite(16, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.5, 0.3, true);
	 *   bear.image = core.assets['chara1.gif'];
	 *
	 @param {Number} [radius] Spriteの半径.
	 * @param {Boolean}   [staticOrDynamic] 静止するか動くか.
	 * @param {Number} [density] Spriteの密度.
	 * @param {Number} [friction] Spriteの摩擦.
	 * @param {Number} [restitution] Spriteの反発.
	 * @param {Boolean}   [isSleeping] Spriteが初めから物理演算を行うか.
	 * @constructs
	 * @extends enchant.box2d.PhySprite
	 */
	initialize: function(width, height, staticOrDynamic, density, friction, restitution, isSleeping) {
		enchant.box2d.PhySprite.call(this, width, height);

		//物理オブジェクトの生成
		this.body = this.createPhyTriangle(staticOrDynamic, density, friction, restitution, isSleeping);
	}
});

