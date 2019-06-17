var Player = cc.Sprite.extend({
    active: true,
    speed: 2,
    speedX: 0,
    speedY: 0,
    MaxBomb: 1,
    BombSize: 1,
    Kim:5,
    pointDemo: null,
    Live: 5,
    Score: 0,
    ctor: function (x, y) {
        this._super();
        cc.associateWithNative(this, cc.Sprite);
        this.initWithFile(res.BebongDown_png);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setPosition(cc.p(x, y));
        this.setLocalZOrder(2);
        this.scheduleUpdate();
    },
    die: function () {
        this.setVisible(false);
        this.active = false;
    },
    collideRect: function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x + 5 - a.width / 2, p.y - a.height / 2, a.width - 10, a.width - 15);
    },
    update: function (dt) {
        if (this.active){
            if (KEYS[cc.KEY.up]) {
                this.speedY = 1
                this.speedX = 0
                this.setTexture(res.BeBongUp_png)
            }
            else if (KEYS[cc.KEY.down]) {
                this.speedY = -1
                this.speedX = 0
                this.setTexture(res.BebongDown_png)
            }
            else this.speedY = 0;
            if (KEYS[cc.KEY.left]) {
                this.speedX = -1;
                this.speedY = 0
                this.setTexture(res.BeBongLeft_png)
            }
            else if (KEYS[cc.KEY.right]) {
                this.speedX = 1;
                this.speedY = 0
                this.setTexture(res.BebongRight_png)
            }
            else this.speedX = 0;

            if (KEYS[cc.KEY.up] || KEYS[cc.KEY.down] || KEYS[cc.KEY.left] || KEYS[cc.KEY.right]) {
                this.move();

            }

        }
        if (KEYS[cc.KEY.z]) {
            if (this.active==false){
                this.useKim();
                KEYS[cc.KEY.z]=false;
                this.Kim-=1;

            }

        }

    },
    move: function () {
        var x_sprite = this.getPosition().x;
        var y_sprite = this.getPosition().y;
        var xK = x_sprite;
        var yK = y_sprite;
        var xR = x_sprite + this.speedX * this.speed;
        var yR = y_sprite + this.speedY * this.speed;
        this.pointDemo = cc.p(xR, yR)
        if (this.checkMap() == false) {
            xR = xK;
            yR = yK;
        }
        //dang code
        this.setPosition(cc.p(xR, yR));
    },
    checkMap: function () {
        for (var i = 0; i < arrMap1s.length; i++) {
            if (arrMap1s[i].visible) {
                var map = arrMap1s[i].getPosition();
                var rect = arrMap1s[i].collideRect(map);
                if (cc.rectIntersectsRect(this.collideRect(this.pointDemo), rect)) {
                    return false;
                }
            }

        }
        return true;
    },
    saxNuoc: function () {
        this.setTexture(res.SaxNuoc_png);
        this.active=false;
    },
    useKim:function () {
        this.active=true;
        this.setOpacity(0);
        this.setTexture(res.BebongDown_png);
        var BossDie = cc.FadeIn.create(0.3);
        this.runAction(BossDie);
    },
    changePointX: function (x) {
        var n = (x - 70) % 45;
        var result = 0;
        if (n > 0 && n < 22.5) {
            result = x - n;
        }
        else if (n > 0 && n > 22.5) {
            result = x - n + 45;
        }
        else {
            result = x;
        }
        return result;
    },
    changePointY: function (y) {
        var n = (y - 30) % 45;
        var result = 0;
        if (n > 0 && n < 22.5) {
            result = y - n;
        }
        else if (n > 0 && n > 22.5) {
            result = y - n + 45;
        }
        else {
            result = y;
        }
        return result;
    }
});

