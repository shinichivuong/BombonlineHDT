var LayerScore = cc.Layer.extend({
    realTimeLB: null,
    countBomLB: null,
    countSpeedLB: null,
    countKillBossLB: null,
    countBomSizeLB: null,
    userNameLB: null,
    playerLiveLB: null,
    countKim: 5,
    kimLB: null,
    size: null,
    realTime: 0,
    ctor: function () {
        this._super();
        this.score();
        this.countItemBoom();
        this.countItemSpeed();
        this.userName();
        this.playerLive();
        this.kim();
        this.countKillBoos();
        this.countItemBomSize();
//time
        this.scheduleUpdate();
    },
    update: function (dt) {
        this.realTime += dt;
        this.realTimeLB.setString(this.realTime.toFixed(2));
    },
    chang: function (a) {
        // a.setString()
    },
    score: function () {
        this.realTimeLB = new cc.LabelTTF();
        this.realTimeLB.setString(this.realTime.toString());
        this.realTimeLB.setFontSize(15);
        this.realTimeLB.setPosition(cc.p(110, 656));
        this.realTimeLB.setColor(cc.color(255, 255, 255));
        this.addChild(this.realTimeLB);
    },
    countItemBoom: function () {
        this.countBomLB = new cc.LabelTTF("0");
        this.countBomLB.setFontSize(15);
        this.countBomLB.setPosition(cc.p(1129 - 100, 340));
        this.countBomLB.setColor(cc.color(255,255,255));
        this.addChild(this.countBomLB);
    },
    countItemSpeed: function () {
        this.countSpeedLB = new cc.LabelTTF("0");
        this.countSpeedLB.setFontSize(15);
        this.countSpeedLB.setPosition(cc.p(1129 - 100, 300));
        this.countSpeedLB.setColor(cc.color(255,255,255));
        this.addChild(this.countSpeedLB);
    },
    countItemBomSize: function () {
        this.countBomSizeLB = new cc.LabelTTF("0");
        this.countBomSizeLB.setFontSize(15);
        this.countBomSizeLB.setPosition(cc.p(1129 - 100, 320));
        this.countBomSizeLB.setColor(cc.color(255,255,255));
        this.addChild(this.countBomSizeLB);
    },
    userName: function () {
        this.userNameLB = new cc.LabelTTF();
        this.userNameLB.fontName = "Marker Felt";
        this.userNameLB.fontSize = 20;
        this.userNameLB.setString("thudzai");
        this.userNameLB.setPosition(cc.p(1129 - 100, 570));
        this.addChild(this.userNameLB);
    },
    playerLive: function () {
        this.playerLiveLB = new cc.LabelTTF("5");
        this.playerLiveLB.setFontSize(15);
        this.playerLiveLB.setPosition(cc.p(1129 - 100, 360));
        this.playerLiveLB.setColor(cc.color(255,255,255));
        this.addChild(this.playerLiveLB);
    },
    kim: function () {
        var textKim= new cc.LabelTTF("-KIM:");
        textKim.setFontSize(18);
        textKim.setPosition(cc.p(1129 - 190, 260));
        textKim.setColor(cc.color(240,230,140));
        this.addChild(textKim);

        this.kimLB = new cc.LabelTTF("5");
        this.kimLB.setFontSize(15);
        this.kimLB.setPosition(cc.p(1129 - 100, 260));
        this.kimLB.setColor(cc.color(255,255,255));
        this.addChild(this.kimLB);
    },
    countKillBoos: function () {


        this.countKillBossLB = new cc.LabelTTF("0");
        this.countKillBossLB.setFontSize(15);
        this.countKillBossLB.setPosition(cc.p(1129 - 100, 280));
        this.countKillBossLB.setColor(cc.color(255,255,255));
        this.addChild(this.countKillBossLB);
    },
});