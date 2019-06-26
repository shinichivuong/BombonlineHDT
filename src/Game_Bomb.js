var Bomb = cc.Sprite.extend({
    BomLeft: null,
    BomRight: null,
    BomUp: null,
    BomDown: null,
    timeBombang: 0,
    sizebom: 0,
    hitBoss: true,
    active: true,
    sizeleft: 0,
    sizeright: 0,
    sizeup: 0,
    sizedown: 0,

    ctor: function (x, y, game, sizebomb) {
        /**
         * x,y: get position of Bomb
         * game: its gamemain
         * sizeBomb: size of Player's bomb
         */
        this._super();
        if (this.active) {
            x = this.changePointX(x);
            y = this.changePointY(y);
            cc.associateWithNative(this, cc.Sprite);
            this.initWithFile(res.Boom_png);
            this.setLocalZOrder(0);
            this.setPosition(cc.p(x, y));
            this.setAnchorPoint(cc.p(0.5, 0.5));
            game.addChild(this);
            //bomleft
            this.BomLeft = cc.Sprite.create("res/Bomb/bombbang_left" + sizebomb + ".png");
            this.BomLeft.setAnchorPoint(cc.p(1, 0.5));
            this.BomLeft.setPosition(x + 22, y);
            this.BomLeft.setVisible(false);
            game.addChild(this.BomLeft);
            //bỏmight
            this.BomRight = cc.Sprite.create("res/Bomb/bombbang_right" + sizebomb + ".png");
            this.BomRight.setAnchorPoint(cc.p(0, 0.5));
            this.BomRight.setPosition(x - 22, y);
            this.BomRight.setVisible(false);
            game.addChild(this.BomRight);
            //Bomup
            this.BomUp = cc.Sprite.create("res/Bomb/bombbang_up" + sizebomb + ".png");
            this.BomUp.setAnchorPoint(cc.p(0.5, 0));
            this.BomUp.setPosition(x, y - 22);
            this.BomUp.setVisible(false);
            game.addChild(this.BomUp);
            //BomDown
            this.BomDown = cc.Sprite.create("res/Bomb/bombbang_down" + sizebomb + ".png");
            this.BomDown.setAnchorPoint(cc.p(0.5, 1));
            this.BomDown.setPosition(x, y + 22);
            this.BomDown.setVisible(false);
            game.addChild(this.BomDown);
        }


    },
    update: function (dt) {
        if (this.active) {
            this.timeBombang += dt;
            if (this.timeBombang > 2) {
                this.bombang();
            }
            if (this.timeBombang > 2.1 && this.timeBombang < 3) {
                this.destroy();
                this.timeBombang = 3;
            }
        }

    },
    bombang: function () {
        /**
         * use when bom bang

         */
        if (this.active) {
            this.BomLeft.setVisible(true);
            this.BomRight.setVisible(true);
            this.BomUp.setVisible(true);
            this.BomDown.setVisible(true);
        }

    },
    bomwave: function (sizebomb, arrMap) {
        /**
         * sizebomb: size of Player's bomb
         * arrmap: its an array, it is all sprite of map
         */
        var point = this.getPosition();
//left
        var sizeleft = sizebomb;
        var rectleft = cc.rect(point.x + 23 - this.BomLeft.getContentSize().width,
            point.y - 10,
            this.BomLeft.getContentSize().width - 1,
            this.BomLeft.getContentSize().height - 25);
        if (sizeleft > 0) {
            if (this.checkMap(rectleft, arrMap) == false) {
                sizeleft -= 1;
                if (sizeleft >= 1) {
                    this.BomLeft.setTexture("res/Bomb/bombbang_left" + sizeleft + ".png");
                    this.bomwave(sizeleft, arrMap);
                }
                if (sizeleft < 1) {
                    this.BomLeft.setTexture("");
                }

            }
        }
//right
        var sizeright = sizebomb;
        var rectRight = cc.rect(point.x - 22, point.y - 10,
            this.BomRight.getContentSize().width - 1,
            this.BomRight.getContentSize().height - 25);
        if (sizeright > 0) {
            if (this.checkMap(rectRight, arrMap) == false) {

                sizeright -= 1;

                if (sizeright >= 1) {
                    this.BomRight.setTexture("res/Bomb/bombbang_right" + sizeright + ".png");
                    this.bomwave(sizeright, arrMap);
                }
                if (sizeright < 1) {
                    this.BomRight.setTexture("");

                }

            }
        }
        //up
        var sizeup = sizebomb;
        var rectup = cc.rect(point.x - 10, point.y - 22,
            this.BomUp.getContentSize().width - 25,
            this.BomUp.getContentSize().height - 1);
        if (sizeup > 0) {
            if (this.checkMap(rectup, arrMap) == false) {

                sizeup -= 1;

                if (sizeup >= 1) {
                    this.BomUp.setTexture("res/Bomb/bombbang_up" + sizeup + ".png");
                    this.bomwave(sizeup, arrMap);
                }
                if (sizeup < 1) {
                    this.BomUp.setTexture("");
                }

            }
        }
        //down

        var sizedown = sizebomb;
        var rectDown = cc.rect(point.x - 10, point.y + 23 - this.BomDown.getContentSize().height,
            this.BomDown.getContentSize().width - 25,
            this.BomDown.getContentSize().height - 1);
        if (sizedown > 0) {

            if (this.checkMap(rectDown, arrMap) == false) {

                sizedown -= 1;
                if (sizedown >= 1) {
                    this.BomDown.setTexture("res/Bomb/bombbang_down" + sizedown + ".png");
                    this.bomwave(sizedown, arrMap);
                }
                if (sizedown < 1) {
                    this.BomDown.setTexture("");

                }

            }
        }

    },
    createRect: function (p) {
        /**
         * create a rectangle of the bomb

         */
        var a = this.getContentSize();
        return cc.rect(p.x + 2 - a.width / 2, p.y + 2 - a.height / 2, a.width - 4, a.width - 4)
    },
    checkMap: function (a, b) {
        /**
         * check position of bomb as position of map's box

         */
        for (var i = 0; i < b.length; i++) {
            if (b[i].visible) {
                var point2 = b[i].getPosition();
                var rect2 = b[i].createRect(point2);
                if (cc.rectIntersectsRect(a, rect2)) {
                    return false;
                }
            }
        }
        return true;

    },
    destroy: function () {
        /**
         * Destroy a bomb.
         */
        this.setVisible(false);
        this.BomLeft.setVisible(false);
        this.BomRight.setVisible(false);
        this.BomUp.setVisible(false);
        this.BomDown.setVisible(false);
        this.active = false;
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
    },
    checkbom: function (point, rect) {
        var point1 = rect.getPosition();
        var rect1 = rect.createRect(point1);

        var rectleft = cc.rect(point.x + 22 - this.BomLeft.getContentSize().width,
            point.y - 10,
            this.BomLeft.getContentSize().width,
            this.BomLeft.getContentSize().height - 25);

        var rectRight = cc.rect(point.x - 22, point.y - 10,
            this.BomRight.getContentSize().width,
            this.BomRight.getContentSize().height - 25);

        var rectup = cc.rect(point.x - 10, point.y - 22,
            this.BomUp.getContentSize().width - 25,
            this.BomUp.getContentSize().height);
        var rectDown = cc.rect(point.x - 10, point.y + 22 - this.BomDown.getContentSize().height,
            this.BomDown.getContentSize().width - 25,
            this.BomDown.getContentSize().height);

        if (cc.rectIntersectsRect(rect1, rectleft) || cc.rectIntersectsRect(rect1, rectRight) || cc.rectIntersectsRect(rect1, rectup) || cc.rectIntersectsRect(rect1, rectDown)) {
            return false;
        }

        return true;
    },
});