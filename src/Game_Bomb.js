var Bomb = cc.Sprite.extend({
    BomLeft: null,
    BomRight: null,
    BomUp: null,
    BomDown: null,
    timeBombang: 0,
    sizebom: 0,
    hitBoss: true,
    active: true,
    ctor: function (x, y, game, sizebomb) {
        this._super();
        if (this.active) {
            this.sizebom = sizebomb;
            x = this.changePointX(x);
            y = this.changePointY(y);
            cc.associateWithNative(this, cc.Sprite);
            this.initWithFile(res.Boom_png);
            this.setLocalZOrder(0);
            this.setPosition(cc.p(x, y));
            this.setAnchorPoint(cc.p(0.5, 0.5));
            game.addChild(this);
            //bomleft
            this.BomLeft = cc.Sprite.create("res/Bomb/bombbang_left" + this.sizebom + ".png");
            this.BomLeft.setAnchorPoint(cc.p(1, 0.5));
            this.BomLeft.setPosition(x, y);
            this.BomLeft.setVisible(false);
            game.addChild(this.BomLeft);
            //bỏmight
            this.BomRight = cc.Sprite.create("res/Bomb/bombbang_right" + this.sizebom + ".png");
            this.BomRight.setAnchorPoint(cc.p(0, 0.5));
            this.BomRight.setPosition(x, y);
            this.BomRight.setVisible(false);
            game.addChild(this.BomRight);
            //Bomup
            this.BomUp = cc.Sprite.create("res/Bomb/bombbang_up" + this.sizebom + ".png");
            this.BomUp.setAnchorPoint(cc.p(0.5, 0));
            this.BomUp.setPosition(x, y);
            this.BomUp.setVisible(false);
            game.addChild(this.BomUp);
            //BomDown
            this.BomDown = cc.Sprite.create("res/Bomb/bombbang_down" + this.sizebom + ".png");
            this.BomDown.setAnchorPoint(cc.p(0.5, 1));
            this.BomDown.setPosition(x, y);
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
            if (this.timeBombang > 2.1&& this.timeBombang<3) {
                this.destroy();
                this.timeBombang=3;
            }
        }

    },
    bombang: function () {
        if (this.active){
            this.BomLeft.setVisible(true);
            this.BomRight.setVisible(true);
            this.BomUp.setVisible(true);
            this.BomDown.setVisible(true);
        }

    },
    bomwave: function (sizebomb, arrMap) {
        var point = this.getPosition();

        var sizeleft = sizebomb;
        var rectleft = cc.rect(point.x + 23 - this.BomLeft.getContentSize().width,
            point.y - 10,
            this.BomLeft.getContentSize().width - 23,
            this.BomLeft.getContentSize().height - 25);
        if (sizeleft > 0) {
            if (this.checkMap(rectleft, arrMap) == false) {
                sizeleft -= 1;
                if (sizeleft >=1) {
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
        var rectRight = cc.rect(point.x, point.y - 10,
            this.BomRight.getContentSize().width - 23,
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
        var rectup = cc.rect(point.x - 10, point.y,
            this.BomUp.getContentSize().width - 25,
            this.BomUp.getContentSize().height - 23);
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
            this.BomDown.getContentSize().height - 23);
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
    collideRect: function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x + 2 - a.width / 2, p.y + 2 - a.height / 2, a.width - 4, a.width - 4)
    },
    checkMap: function (a, b) {
        for (var i = 0; i < b.length; i++) {
            if (b[i].visible) {
                var point2 = b[i].getPosition();
                var rect2 = b[i].collideRect(point2);
                if (cc.rectIntersectsRect(a, rect2)) {
                    return false;
                }
            }
        }
        return true;

    },
    destroy: function () {
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
        var rect1 = rect.collideRect(point1);

        var rectleft = cc.rect(point.x+10 - this.BomLeft.getContentSize().width,
            point.y - 10,
            this.BomLeft.getContentSize().width-10,
            this.BomLeft.getContentSize().height - 25);

        var rectRight = cc.rect(point.x, point.y - 10,
            this.BomRight.getContentSize().width-10,
            this.BomRight.getContentSize().height - 25);

        var rectup = cc.rect(point.x - 10, point.y,
            this.BomUp.getContentSize().width - 25,
            this.BomUp.getContentSize().height-10);
        var rectDown = cc.rect(point.x - 10, point.y+10 - this.BomDown.getContentSize().height,
            this.BomDown.getContentSize().width - 25,
            this.BomDown.getContentSize().height-10);

        if (cc.rectIntersectsRect(rect1, rectleft) || cc.rectIntersectsRect(rect1, rectRight) || cc.rectIntersectsRect(rect1, rectup) || cc.rectIntersectsRect(rect1, rectDown)) {
            return false;
        }

        return true;
    },
});