var GameLayer = cc.Layer.extend({
    die: false,
    winlose: false,
    _dataUser: null,   //Player's data when chose figure.
    _userName: null, // its Player's name
    _player: null, //its Player
    _boss: null,   //its Boss
    _background: null, //game's background
    ctor: function (userName, dataUser) {
        /**
         * userName:its Player's name
         * datauser: Player's data when chose figure.
         */
        this._userName = userName;
        this._dataUser = dataUser;
        this._super();
        this.init();

    },
    init: function () {
        var size = cc.director.getWinSize();
        arrCreeps = []; //array of creeps
        arrBooms = [];
        arrItems = [];
        KEYS = [];
        arrBosss = [];
        arrLocalItem = [];// location of items
        arrMaps = [
            [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 2],
            [2, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 2],
            [2, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 3, 0, 2],
            [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1]
        ];
        arrMap1s = [];
        this._background = new Background();
        this.addChild(this._background);
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {

            cc.eventManager.addListener(
                {
                    event: cc.EventListener.KEYBOARD,

                    onKeyPressed: function (key, event) {
                        KEYS[key] = true;
                    },

                    onKeyReleased: function (key, event) {
                        KEYS[key] = false;
                    }
                }, this);
        }
        realMap(this);// create map
        creatCrepp(this);// create creep
        creatRandomItem(this);// create items
        this._player = new Player(250, 120, this._dataUser);//create player
        this.addChild(this._player);

        this._score = new LayerScore(this._userName);
        this.addChild(this._score);

        this._boss = new Boss(475, 409);//creat boss
        this._boss.bossHeart(this);
        this.addChild(this._boss);
        arrBosss.push(this._boss);

        var cancel = new ccui.Button();
        cancel.loadTextures(res.BtnCancel_png, res.BtnCancel2_png);
        cancel.x = size.width - 50;
        cancel.y = 50;
        cancel.addTouchEventListener(this.touchExit, this);
        this.addChild(cancel);
        this.creatAvatarPlayer();

        this.scheduleUpdate();
    },
    touchExit: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var scene = new HelloWorldLayer();
                cc.director.runScene(new cc.TransitionFade(2, scene));
                break;
        }
    },
    update: function (dt) {

        if (this.winlose == false) {//ít active when player alive and boss alive
            this._score.update(dt);
            this._score.countBomLB.setString(this._player.MaxBomb.toString());
            this._score.countSpeedLB.setString(this._player.speed.toString());
            this._score.countKillBossLB.setString(this._player.Score.toString());
            this._score.kimLB.setString(this._player.Kim.toString());
            this._score.playerLiveLB.setString(this._player.Live.toString());
            //condition win
            if (this._boss.active == false) {
                this._winlose = new LayerWinLose(this, cc.director.getWinSize(), this._userName, this._player.Score);
                this.winlose.activewin = true;
                this.winlose = true;
                var dataScore = this._userName.toString() + "           " + this._player.Score;
                arrScorePlayer.push(dataScore);
                var scene = new GameMenuHighScore();
                cc.director.pushScene(new cc.TransitionFade(10, scene));
            }
            //condition lose
            if (this._player.Live == 0) {
                this._winlose = new LayerWinLose(this, cc.director.getWinSize(), this._userName, this._player.Score);
                this.winlose.activelose = true;
                this.winlose = true;
                gameOverNow = false;
                // var dataLose= this._userName.
                var dataScore = this._userName.toString() + "           " + this._player.Score;
                arrScorePlayer.push(dataScore);
                var scene = new GameMenuHighScore();
                cc.director.pushScene(new cc.TransitionFade(10, scene));

            }
            //update creep's move
            for (var i = 0; i < arrCreeps.length; i++) {
                arrCreeps[i].update(dt);
            }
            //create bomb when press space
            if (KEYS[cc.KEY.space]) {
                this.creatbomb();
                KEYS[cc.KEY.space] = false;
            }
            //update boss's move
            arrBosss[0].update(dt);
            //update boom
            for (var j = 0; j < arrBooms.length; j++) {
                arrBooms[j].update(dt);
                arrBooms[j].bomwave(this._player.BombSize, arrMap1s);
            }

            //destroy box
            for (var k = 0; k < arrMap1s.length; k++) {
                if (arrMap1s[k].visible && arrMap1s[k].getTag() == 4) {
                    for (var i = 0; i < arrBooms.length; i++) {
                        if (arrBooms[i].BomDown.visible) {
                            if (arrBooms[i].checkbom(arrBooms[i].getPosition(), arrMap1s[k]) == false) {
                                arrMap1s[k].setVisible(false);
                            }
                        }
                    }
                }
            }
            //killbosss
            for (var i = 0; i < arrBooms.length; i++) {
                if (arrBooms[i].BomDown.visible) {
                    for (var j = 0; j < arrCreeps.length; j++) {
                        if (arrCreeps[j].active) {
                            if (arrBooms[i].checkbom(arrBooms[i].getPosition(), arrCreeps[j]) == false) {
                                arrCreeps[j].destroy();
                                this._player.Score += 10;
                            }
                        }
                    }
                }
            }

            //playercheckBomb
            for (var i = 0; i < arrBooms.length; i++) {
                if (arrBooms[i].BomDown.visible) {
                    if (arrBooms[i].checkbom(arrBooms[i].getPosition(), this._player) == false) {
                        this._player.saxNuoc();
                    }
                }
            }
            //playercheckdie
            for (var i = 0; i < arrCreeps.length; i++) {
                if (arrCreeps[i].active) {
                    if (this.collide(this._player, arrCreeps[i])) {
                        this._player.Live -= 1;
                        this._player.setOpacity(0);
                        this._player.setPosition(340, 120);
                        var BossDie = cc.FadeIn.create(1);
                        this._player.runAction(BossDie);
                    }
                }
            }
            //item
            for (var i = 0; i < arrItems.length; i++) {
                if (arrItems[i].active) {
                    if (this.collide(arrItems[i], this._player)) {
                        if (arrItems[i].getTag() == 2) {
                            this._score.realTime = 3;
                            this._player.speed += 1;
                        }
                        if (arrItems[i].getTag() == 1) {
                            this._player.MaxBomb += 1;
                        }
                        if (arrItems[i].getTag() == 3) {
                            if (this._player.BombSize <= 10) ;
                            {
                                this._player.BombSize += 1;
                            }

                        }
                        arrItems[i].destroy();
                    }
                }
            }

            //Bosshit
            for (var i = 0; i < arrBooms.length; i++) {
                if (arrBooms[i].BomDown.visible) {
                    if (arrBooms[i].checkbom(arrBooms[i].getPosition(), this._boss) == false && arrBooms[i].hitBoss == true) {
                        if (this._boss.countHeartBoss > 0) {
                            this._boss.arrheart[this._boss.countHeartBoss - 1].setVisible(false);
                            this._boss.countHeartBoss -= 1;
                            this._boss.setOpacity(0);
                            var BossDie = cc.FadeIn.create(0.3);
                            this._boss.runAction(BossDie);
                            this._player.Score += 10;
                        }
                        if (this._boss.countHeartBoss == 0) {
                            this._boss.destroy();

                        }
                        arrBooms[i].hitBoss = false;
                    }
                }
            }
        }


    },
    creatbomb: function () {

        var count = 0;
        for (var i = 0; i < arrBooms.length; i++) {
            if (arrBooms[i].active) {
                count += 1;
            }
        }
        var boomstatic = true;
        if (arrBooms.length > 0) {
            for (var i = 0; i < arrBooms.length; i++) {
                if (arrBooms[i].active) {


                    if (this.collide(this._player, arrBooms[i])) {
                        boomstatic = false;
                    }
                }
            }
        }
        if (boomstatic == true) {
            if (count < this._player.MaxBomb) {
                var point = this._player.getPosition();
                var bomb = new Bomb(point.x, point.y, this, this._player.BombSize);
                arrBooms.push(bomb);

            }
        }
    },
    collide: function (a, b) { //colide of 2 obj
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();
        var aRect = a.createRect(pos1);
        var bRect = b.createRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    },
    creatAvatarPlayer: function () {
        var avtPlayer = new cc.Sprite();
        avtPlayer.setAnchorPoint(cc.p(0.5, 0.5));
        avtPlayer.setPosition(1020, 505);
        avtPlayer.setScale(0.4);
        if (this._dataUser == khokhos) {
            avtPlayer.setTexture(res.khoKho1_png);
        }
        if (this._dataUser == bebongs) {
            avtPlayer.setTexture(res.AvtBeBong1_png);
        }
        if (this._dataUser == tiachops) {
            avtPlayer.setTexture(res.tiachop1_png);
        }
        this.addChild(avtPlayer);
    }
});
creatRandomItem = function (game) {
    var count = arrLocalItem.length;
    for (var k = 0; k < 20; k++) {
        var n = Math.floor(Math.random() * count);
        var item = new Items(arrLocalItem[n].x, arrLocalItem[n].y);
        game.addChild(item);
        arrItems.push(item);
    }
},
    realMap = function (game) {
        for (var i = 0; i < arrMaps.length; i++) {
            for (var j = 0; j < arrMaps[i].length; j++) {
                var x = 45 * j;
                var y = 45 * i;
                var bit = arrMaps[i][j];
                var map = new Map(x + 70, y + 30, bit);
                arrMap1s.push(map);
                game.addChild(map);
                if (bit == 0) {
                    var point = new cc.p(x + 70, y + 30);
                    arrLocalItem.push(point);
                }
            }
        }
    },
    creatCrepp = function (game) {
        var creep1 = new Creep(115, 75);
        var creep2 = new Creep(340, 525);
        var creep3 = new Creep(115, 435);
        var creep4 = new Creep(790, 525);
        var creep5 = new Creep(790, 525);
        var creep6 = new Creep(565, 120);
        var creep7 = new Creep(430, 165);
        arrCreeps.push(creep1);
        arrCreeps.push(creep2);
        arrCreeps.push(creep3);
        arrCreeps.push(creep4);
        arrCreeps.push(creep5);
        arrCreeps.push(creep6);
        arrCreeps.push(creep7);
        game.addChild(creep1);
        game.addChild(creep2);
        game.addChild(creep3);
        game.addChild(creep4);
        game.addChild(creep5);
        game.addChild(creep6);
        game.addChild(creep7);
    }
var Gamescenes = cc.Scene.extend({
    ctor: function (userName, userData) {
        this._super();
        var layer = new GameLayer(userName, userData);
        this.addChild(layer);
    },

});