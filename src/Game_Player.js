var Player = cc.Sprite.extend({
    active: true,
    speed: 2,
    speedX: 0,
    speedY: 0,
    MaxBomb: 1,
    BombSize: 1,
    Kim: 5,
    pointDemo: null,
    Live: 5,
    Score: 0,
    popUp : null,
    activePopup: false,
    dataUser:null,
    ctor: function (x, y,dataUser) {
        this.dataUser=dataUser;
        this._super();
        cc.associateWithNative(this, cc.Sprite);
        this.initWithFile(this.dataUser[0]);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setPosition(cc.p(x, y));
        this.setLocalZOrder(2);
        this.popUp = this.pressZ(x - 220, y - 50);
        this.addChild(this.popUp);
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
        if (this.activePopup){
            this.popUp.setVisible(true);
        }
        if (this.activePopup==false){
            this.popUp.setVisible(false);
        }
        if (this.active) {
            if (KEYS[cc.KEY.up]) {
                this.speedY = 1
                this.speedX = 0
                this.setTexture(this.dataUser[3])
            }
            else if (KEYS[cc.KEY.down]) {
                this.speedY = -1
                this.speedX = 0
                this.setTexture(this.dataUser[0])
            }
            else this.speedY = 0;
            if (KEYS[cc.KEY.left]) {
                this.speedX = -1;
                this.speedY = 0
                this.setTexture(this.dataUser[1])
            }
            else if (KEYS[cc.KEY.right]) {
                this.speedX = 1;
                this.speedY = 0
                this.setTexture(this.dataUser[2])
            }
            else this.speedX = 0;

            if (KEYS[cc.KEY.up] || KEYS[cc.KEY.down] || KEYS[cc.KEY.left] || KEYS[cc.KEY.right]) {
                this.move();

            }

        }
        if (KEYS[cc.KEY.z]) {
            if (this.active == false) {
                this.useKim();
                KEYS[cc.KEY.z] = false;
                this.Kim -= 1;

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
        this.pointDemo = cc.p(xR, yR);
        if (this.checkMap() == false) {
            // xR = xK;
            // yR = yK;
            if (this.speedY == 1 || this.speedY == -1) {
                for (var i = 0; i < arrMap1s.length; i++) {
                    if (arrMap1s[i].visible) {
                        var rectMap = arrMap1s[i].collideRect(arrMap1s[i].getPosition());
                        if (cc.rectIntersectsRect(this.collideRect(new cc.p(xR, yR)), rectMap)) {

                            var point = arrMap1s[i].getPosition();
                            var rectleft = arrMap1s[i].collideRect(new cc.p(point.x - 45, point.y));
                            var rectright = arrMap1s[i].collideRect(new cc.p(point.x + 45, point.y));
                            if (point.x - xR > 20) {
                                if (this.checkMaptoMve(rectleft) == false) {

                                    xR = xR - 1;
                                    yR = yK;
                                }
                                else {
                                    xR = xK;
                                    yR = yK;
                                }
                            }
                            else if (point.x - xR < -20) {
                                if (this.checkMaptoMve(rectright) == false) {
                                    xR = xR + 1;
                                    yR = yK;
                                }
                                else {
                                    xR = xK;
                                    yR = yK;
                                }
                            }
                            else {
                                xR = xK;
                                yR = yK
                            }
                        }
                    }
                }
            }
            else if (this.speedX == 1 || this.speedX == -1) {
                for (var i = 0; i < arrMap1s.length; i++) {
                    if (arrMap1s[i].visible) {
                        var rectMap = arrMap1s[i].collideRect(arrMap1s[i].getPosition());
                        if (cc.rectIntersectsRect(this.collideRect(new cc.p(xR, yR)), rectMap)) {

                            var point = arrMap1s[i].getPosition();
                            var rectleft = arrMap1s[i].collideRect(new cc.p(point.x, point.y - 45));
                            var rectright = arrMap1s[i].collideRect(new cc.p(point.x, point.y + 45));
                            if (point.y - yR > 2) {
                                if (this.checkMaptoMve(rectleft) == false) {

                                    xR = xK;
                                    yR = yR - 1;
                                }
                                else {
                                    xR = xK;
                                    yR = yK;
                                }
                            }
                            else if (point.y - yR < -30) {
                                if (this.checkMaptoMve(rectright) == false) {
                                    xR = xK;
                                    yR = yR + 1;
                                }
                                else {
                                    xR = xK;
                                    yR = yK;
                                }
                            }
                            else {
                                xR = xK;
                                yR = yK
                            }
                        }
                    }
                }
            }
            else {
                xR = xK;
                yR = yK;
            }
        }
        //dang code

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
    checkMaptoMve: function (rectinput) {
        for (var i = 0; i < arrMap1s.length; i++) {
            if (arrMap1s[i].visible) {
                var map = arrMap1s[i].getPosition();
                var rect = arrMap1s[i].collideRect(map);
                if (cc.rectIntersectsRect(rectinput, rect)) {
                    return false;
                }
            }

        }
        return true;
    },
    saxNuoc: function () {
        this.setTexture(res.SaxNuoc_png);
        this.active = false;
        this.activePopup = true;
    },
    useKim: function () {
        this.active = true;
        this.setOpacity(0);
        this.setTexture(res.BebongDown_png);
        var BossDie = cc.FadeIn.create(0.3);
        this.runAction(BossDie);
        this.activePopup=false;
    },
    pressZ: function (x, y) {
        var popUpSax = new cc.LabelTTF("Press Z");
        popUpSax.setFontSize(15);
        popUpSax.setPosition(cc.p(x, y));
        popUpSax.setVisible(false);
        return popUpSax;


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

