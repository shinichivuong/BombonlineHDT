var Background = cc.Sprite.extend({
    _scale: 4,
    ctor: function () {
        this._super();
        cc.associateWithNative(this, cc.Sprite);
        this.initWithFile(res.BackGame_png);
        this.setAnchorPoint(cc.p(0, 0));
    },
    destroy: function () {
        this.setVisible(false);
        this.active = false
    }
});