var Items= cc.Sprite.extend({
    active:true,
    ctor:function (x,y) {
        this._super();
        cc.associateWithNative(this, cc.Sprite);
        this.setLocalZOrder(0);
        this.initWithFile(this.creatItem());
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setPosition(new cc.p(x,y));
    },
    creatItem:function () {
        var a=0;
        var i = Math.floor((Math.random() * 4));
        if(i==0){
            a=res.ItemBoom_png;
            this.setTag(1);
        }
        if (i==1){
            a=res.ItemSpeed_png;
            this.setTag(2);
        }
        if (i==2){
            a=res.ItemBoomSize_png;
            this.setTag(3);
        }
        if (i==3){
            a=res.ItemShoe_png;
            this.setTag(4);
        }
        return a;
    },
    createRect: function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x + 2 - a.width / 2, p.y + 2 - a.height / 2, a.width - 4, a.width - 4)
    },
    destroy:function () {
        this.active=false;
        this.setVisible(false);
    }
});