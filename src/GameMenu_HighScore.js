var GameMenuHighScore = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var backHighScore = new cc.Sprite(res.BGHighScore_png);
        backHighScore.setAnchorPoint(cc.p(0.5, 0.5));
        backHighScore.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(backHighScore);

        var cancel = new ccui.Button();
        cancel.loadTextures(res.BtnCancel_png, res.BtnCancel2_png);
        cancel.x = size.width - 176;
        cancel.y = 76;
        cancel.addTouchEventListener(this.touchEvent, this);
        this.addChild(cancel);

        for (var i=0;i<arrHighScores.length;i++){
            var overgame = new cc.LabelTTF(arrHighScores[i]);
            overgame.setFontSize(25);
            overgame.setAnchorPoint(cc.p(0, 0.5));
            overgame.setColor(cc.color(0, 0, 0));
            overgame.setPosition(cc.p(300, 500-30*i));
            this.addChild(overgame);
        }
    },
    touchEvent: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                var scene= new HelloWorldLayer;
                cc.director.pushScene(new cc.TransitionFade(1,scene));
                break;
        }
    }
});
var GameMenuHighScoreScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameMenuHighScore();
        this.addChild(layer);

    }
});
