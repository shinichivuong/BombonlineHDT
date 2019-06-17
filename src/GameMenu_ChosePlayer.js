var noChose=null;
var GameMenuChosePlayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var backChosePlayer = new cc.Sprite(res.BGChosePlayer_png);
        backChosePlayer.setAnchorPoint(cc.p(0.5, 0.5));
        backChosePlayer.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(backChosePlayer);

        var cancel = new ccui.Button();
        cancel.loadTextures(res.BtnCancel_png, res.BtnCancel2_png);
        cancel.x = size.width - 176;
        cancel.y = 76;
        cancel.addTouchEventListener(this.touchExit, this);
        this.addChild(cancel);

        //Button chose Player
        var bebong = new ccui.Button();
        bebong.loadTextures(res.bebong1_png, res.bebong2_png);
        bebong.x = 320;
        bebong.y = 450;
        bebong.addTouchEventListener(this.touchEvent, this);
        this.addChild(bebong);

        var tiachop = new ccui.Button();
        tiachop.loadTextures(res.tiachop1_png, res.tiachop2_png);
        tiachop.x = 320;
        tiachop.y = 190;
        tiachop.addTouchEventListener(this.touchEvent2, this);
        this.addChild(tiachop);

        var khokho = new ccui.Button();
        khokho.loadTextures(res.khoKho1_png, res.khoKho2_png);
        khokho.x = 570;
        khokho.y = 190;
        khokho.addTouchEventListener(this.touchEvent3, this);
        this.addChild(khokho);

        var ok = new ccui.Button();
        ok.setAnchorPoint(cc.p(0.5,0.5));
        ok.x = 800;
        ok.y = 190;
        ok.setTitleText("Okey");
        ok.setTitleFontSize(30);
        ok.addTouchEventListener(this.gameMain, this);
        this.addChild(ok);

        userNameGame= new cc.EditBox(cc.size(150,50));
        // userNameGame.setPlaceHolderColor(cc.Color.GRAY);
        userNameGame.setInputMode(cc.KEYBOARD_RETURNTYPE_DEFAULT);
        userNameGame.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE);
        userNameGame.setPosition(800,220);
        userNameGame.setAnchorPoint(cc.p(0.5,0.5));
        userNameGame.setFontSize(25);

        userNameGame.setPlaceHolder("user Name");
        userNameGame.setPlaceholderFontSize(25);
        this.addChild(userNameGame);

        //canh bao chua nhap ten
        noName = new cc.LabelTTF("Bạn chưa nhập tên!");
        noName.setFontSize(15);
        noName.setVisible(false);
        noName.setPosition(cc.p(780, 250));
        noName.setColor(cc.color(0, 0, 0));
        this.addChild(noName);
        //canh bao chua chon nhan vat
        noChose = new cc.LabelTTF("Bạn chưa chọn nhân vật kìa!");
        noChose.setFontSize(15);
        noChose.setVisible(false);
        noChose.setPosition(cc.p(700, 450));
        noChose.setColor(cc.color(0, 0, 0));
        this.addChild(noChose);

        choseMain = new cc.Sprite();
        choseMain.setTexture("");
        choseMain.setAnchorPoint(cc.p(0.5, 0.5));
        choseMain.setPosition(cc.p(700, 450));
        this.addChild(choseMain);

    },
    gameMain: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (userNameGame.getString()==""){
                    noName.setVisible(true);
                }
                else if (choseMain.getTexture()==null){
                    noChose.setVisible(true);
                }
                else {
                    var scene = new GameLayer;
                    cc.director.runScene(new cc.TransitionFade(2,scene));
                    break;
                }

        }
    },
    touchEvent: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                choseMain.setTexture(res.opbebong_png);
                // arrPlayer=bebongs;
                avtplayerback=res.bebong1_png;
                break;
        }
    },

    touchEvent2:function (sender,type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                choseMain.setTexture(res.optiachop_png);
                // arrPlayer=tiachops;
                avtplayerback=res.tiachop1_png;

                break;
        }
    },
    touchEvent3:function (sender,type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                choseMain.setTexture(res.opkhokho_png);
                // arrPlayer=khokhos;
                avtplayerback=res.khoKho1_png;

                break;
        }
    },
    touchExit:function (sender,type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                cc.director.popScene();
                break;
        }
    }
});
var GameMenuChosePlayerScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameMenuChosePlayer();
        this.addChild(layer);

    }
});
