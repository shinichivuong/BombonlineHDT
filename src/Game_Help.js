var GameHelp = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var backOption = new cc.Sprite(res.Help_png);
        backOption.setAnchorPoint(cc.p(0.5, 0.5));
        backOption.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(backOption);

        var cancel = new ccui.Button();
        cancel.loadTextures(res.BtnCancel_png, res.BtnCancel2_png);
        cancel.x = size.width - 176;
        cancel.y = 76;
        cancel.addTouchEventListener(this.touchEvent, this);
        this.addChild(cancel);
    },
    touchEvent: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.director.popScene();
                break;
        }
    }
});
var GameHelpScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameHelp();
        this.addChild(layer);

    }
});
