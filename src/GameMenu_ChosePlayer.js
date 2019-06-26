var GameMenuChosePlayer = cc.Layer.extend({
    dataUser: null,     //Du lieu nhan vat duoc chon
    userNameGame: null, //Ten nhan vat do nguoi dung nhap
    noName: null,        //Popup thong bao khi chua ngap ten
    noChose: null,       //Popup thong bao khi chua chon nhan vat
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
        ok.setAnchorPoint(cc.p(0.5, 0.5));
        ok.x = 800;
        ok.y = 190;
        ok.setTitleText("Okey");
        ok.setTitleFontSize(30);
        ok.addTouchEventListener(this.gameMain, this);
        this.addChild(ok);

        this.userNameGame = new cc.EditBox(cc.size(150, 50));
        this.userNameGame.setInputMode(cc.KEYBOARD_RETURNTYPE_DEFAULT);
        this.userNameGame.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE);
        this.userNameGame.setPosition(800, 220);
        this.userNameGame.setAnchorPoint(cc.p(0.5, 0.5));
        this.userNameGame.setFontSize(25);

        this.userNameGame.setPlaceHolder("user Name");
        this.userNameGame.setPlaceholderFontSize(25);
        this.addChild(this.userNameGame);

        //canh bao chua nhap ten
        this.noName = new cc.LabelTTF("Bạn chưa nhập tên!");
        this.noName.setFontSize(15);
        this.noName.setVisible(false);
        this.noName.setPosition(cc.p(780, 250));
        this.noName.setColor(cc.color(0, 0, 0));
        this.addChild(this.noName);
        //canh bao chua chon nhan vat
        this.noChose = new cc.LabelTTF("Bạn chưa chọn nhân vật kìa!");
        this.noChose.setFontSize(15);
        this.noChose.setVisible(false);
        this.noChose.setPosition(cc.p(700, 450));
        this.noChose.setColor(cc.color(0, 0, 0));
        this.addChild(this.noChose);

        choseMain = new cc.Sprite();
        choseMain.setTexture("");
        choseMain.setAnchorPoint(cc.p(0.5, 0.5));
        choseMain.setPosition(cc.p(700, 450));
        this.addChild(choseMain);

    },
    gameMain: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (this.userNameGame.getString() == "") {
                    this.noName.setVisible(true);
                }
                else if (choseMain.getTexture() == null) {
                    this.noChose.setVisible(true);
                }
                else {
                    var scene = new GameLayer(this.userNameGame.getString(), this.dataUser);
                    cc.director.runScene(new cc.TransitionFade(2, scene));
                    break;
                }

        }
    },
    touchEvent: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                choseMain.setTexture(res.opbebong_png);
                this.dataUser = bebongs;
                avtplayerback = res.bebong1_png;
                break;
        }
    },

    touchEvent2: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                choseMain.setTexture(res.optiachop_png);
                this.dataUser = tiachops;
                avtplayerback = res.tiachop1_png;

                break;
        }
    },
    touchEvent3: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                choseMain.setTexture(res.opkhokho_png);
                this.dataUser = khokhos;
                avtplayerback = res.khoKho1_png;

                break;
        }
    },
    touchExit: function (sender, type) {
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
