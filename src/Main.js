var INIT = false;
var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;
        var sprite = new cc.Sprite.create(res.Backgr2_png);
        sprite.setAnchorPoint(cc.p(0.5, 0.5));
        sprite.setScale(0.7);
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(sprite);
        // cc.audioEngine.playMusic(res.sound_main);
        // cc.audioEngine.setMusicVolume(0.3);

        var menuStart = new cc.MenuItemImage(res.Start_png, res.Start2_png, play);
        var menuImage = new cc.MenuItemImage(res.HightScore_png, res.HightScore2_png, hightscore);
        var menuExit = new cc.MenuItemImage(res.Exit_png, res.Exit2_png, exit);
        var menuOption = new cc.MenuItemImage(res.BoxOP_png, res.BoxOP2_png, option);
        menuStart.setPosition(cc.p(size.width - 150, (size.height / 4) + 350));
        menuImage.setPosition(cc.p(size.width - 150, (size.height / 4) + 250));
        menuOption.setPosition(cc.p(size.width - 150, (size.height / 4) + 150));
        menuExit.setPosition(cc.p(size.width - 150, (size.height / 4) + 50));

        var menu = new cc.Menu(menuExit, menuStart, menuImage, menuOption);
        menu.setPosition(cc.p(0, 0))
        this.addChild(menu);


        return true;
    },
    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Touch Down");
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("Touch move");
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log("Touch ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                cc.log("Touch CANCEL");
                break;
        }
    }
});
var play = function () {
    var scene= new GameMenuChosePlayer;
    cc.director.pushScene(new cc.TransitionFade(1,scene));
}
var hightscore = function () {
    var arr=[];
    var scene= new GameMenuHighScore(arr);
    cc.director.pushScene(new cc.TransitionFade(1,scene));
}
var exit = function () {
    var scene= new GameMenuChosePlayer;
    cc.director.pushScene(scene);
}
var option = function () {
    var scene= new GameHelp;
    cc.director.pushScene(new cc.TransitionFade(1,scene));
}
var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        if (INIT == false) {
            INIT = true;
            var layer = new HelloWorldLayer();
            this.addChild(layer);
        }

    }
});
