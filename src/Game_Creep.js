var Creep = cc.Sprite.extend({
    mytime: 0,
    mytime2: 0,
    active: true,
    heart: 1,
    speedBoss: 0.5,
    point: null,
    ctor: function (x, y) {
        this._super();
        cc.associateWithNative(this, cc.Sprite);
        this.initWithFile(res.Creepleft_png);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setLocalZOrder(3);
        this.setPosition(new cc.p(x, y));

    },
    destroy: function () {
        this.setVisible(false);
        this.active = false;
    },
    update: function (dt) {
        if (this.active) {
            this.mytime += dt;
            if (this.mytime - this.mytime2 > this.speedBoss) {
                var huong = Creep.generateDirection();
                var pos = this.getPosition();
                var skipeX = pos.x;
                var skipeY = pos.y;
                if (huong.x == 0 && huong.y == 45) {
                    this.setTexture(res.Creepup_png);

                }
                if (huong.x == 45 && huong.y == 0) {
                    this.setTexture(res.Creepright_png);
                }
                if (huong.x == (-45) && huong.y == 0) {

                    this.setTexture(res.Creepleft_png);

                }
                if (huong.x == 0 && huong.y == (-45)) {


                    this.setTexture(res.Creepdown_png);

                }

                point = cc.pAdd(pos, huong);
                if (this.checkmap() == false) {
                    point.x = skipeX;
                    point.y = skipeY;
                }

                if (point.x > 70 && point.y > 30 && point.x < 1080) {
                    var action_move = new cc.MoveTo(this.speedBoss, point);
                    this.runAction(action_move);
                    this.mytime2 = this.mytime;
                }


            }
        }

    },
    createRect: function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x + 2 - a.width / 2, p.y + 2 - a.height / 2, a.width - 4, a.width - 4)
    },
    checkmap: function () {
        for (var i = 0; i < arrMap1s.length; i++) {
            if (arrMap1s[i].length != 0) {
                var map = arrMap1s[i].getPosition();
                var rect = arrMap1s[i].createRect(map);
                if (cc.rectIntersectsRect(this.createRect(point), rect)) {
                    return false;
                }
            }

        }
        for (var k = 0; k < arrCreeps.length; k++) {
            if (arrCreeps[k].visible == true) {
                var creep = arrCreeps[k].getPosition();
                var rect = arrCreeps[k].createRect(creep);
                if (cc.rectIntersectsRect(this.createRect(point), rect)) {
                    return false;
                }
            }
        }
        for (var j = 0; j < arrBooms.length; j++) {
            if (arrBooms[j].visible == true) {
                var bom = arrBooms[j].getPosition();
                var rect = arrBooms[j].createRect(bom);
                if (cc.rectIntersectsRect(this.createRect(point), rect)) {
                    return false;
                }
            }
        }
        return true;
    },
});
Creep.generateDirection = function () {
    /**
     * create a original Direction of creep
     */
    var v = 45;
    var i = Math.floor((Math.random() * 4));
    switch (i) {
        case 0:
            return cc.p(0, v);
            break;
        case 1:
            return cc.p(0, -v);
            break;
        case 2:
            return cc.p(v, 0);
            break;
        case 3:
            return cc.p(-v, 0);
            break;
    }
    return cc.p(0, 0);


};


