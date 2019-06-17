var Map = cc.Sprite.extend({
    active: true,
    ctor: function (x, y,bit) {
        this._super();
        var a=0;
        if (bit == 0) {
            a = res.BoxSatMain_png;
            this.setTag(0)
        }
         if (bit == 1) {
            a = res.BoxSat_png;
            this.setTag(1)
        }
        if (bit == 2) {
            a = res.BoxGo2_png;
            this.setTag(2)
        }
        if (bit==3){
            a = res.BoxSatMain_png;
            this.setTag(3)
        }
        if (bit==4){
            a=res.BoxGo_png;
            this.setTag(4)
        }
        if(bit!=0) {
            cc.associateWithNative(this, cc.Sprite);
            this.initWithFile(a);
            this.setLocalZOrder(1);
            this.setAnchorPoint(cc.p(0.5, 0.5));
            this.setPosition(new cc.p(x, y));
        }

    },
    destroy: function () {
        this.setVisible(false);
        this.active = false
    },
    collideRect: function () {
        var a = this.getContentSize();
        var p=this.getPosition();
        return cc.rect(p.x - a.width / 2, p.y - a.width / 2, a.width, a.width);
    },
});
Map.create = function (arg) {
    var map = new Map;
};
