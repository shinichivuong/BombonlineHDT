/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    BackGame_png : "res/background/background_Play3.png",
    //nhaan vaatj bebong
    BebongDown_png : "res/bebong/bebong_down.png",
    BebongUp_png : "res/bebong/bebong_up.png",
    BebongRight_png : "res/bebong/bebong_right.png",
    BebongLeft_png : "res/bebong/bebong_left.png",
    //creeps
    Creepleft_png: "res/creeps/quaivat 3_left.png",
    Creepright_png: "res/creeps/quaivat 3_right.png",
    Creepup_png: "res/creeps/quaivat 3_up.png",
    Creepdown_png: "res/creeps/quaivat 3_down.png",
    //map
    BoxGo_png: "res/Maps/boxgo.png",
    BoxGo2_png: "res/Maps/boxgo2.png",
    BoxSat_png: "res/Maps/boxsat.png",
    BoxCot_png: "res/Maps/boxcot.png",
    BoxSatMain_png:"res/Maps/boxsatmain.png",

    bebong1_png: "res/User/beBong1.png",
    bebong2_png: "res/User/beBong2.png",
    tiachop1_png: "res/User/tiaChop1.png",
    tiachop2_png: "res/User/tiaChop2.png",
    khoKho1_png: "res/User/khoKho1.png",
    khoKho2_png: "res/User/khoKho2.png",

    Sound_foot: "res/sound/foot.wav",

    BeBongDown_png: "res/bebong_down.png",
    BeBongLeft_png: "res/bebong_left.png",
    BeBongRight_png: "res/bebong_right.png",
    BeBongUp_png: "res/bebong_up.png",
    //tia chop
    TiaChopUp_png: "res/User/tiachop_up.png",
    TiaChopRight_png: "res/User/tiachop_right.png",
    TiaChopLeft_png: "res/User/tiachop_left.png",
    TiaChopDown_png: "res/User/tiachop_down.png",
    //khokho
    KhoKhoUp_png: "res/User/khokho_up.png",
    KhoKhoRight_png: "res/User/khokho_right.png",
    KhoKhoLeft_png: "res/User/khokho_left.png",
    KhoKhoDown_png: "res/User/khokho_down.png",

    AvtBeBong1_png:"res/User/beBong2.png",
    Backgr2_png:"res/backGround.jpg",
    //player chose
//chose picture
    opbebong_png: "res/User/opbebong.png",
    opkhokho_png: "res/User/opkhokho.png",
    optiachop_png: "res/User/optiachop.png",

    Ghost_png: "res/user/ghost2.png",
    SaxNuoc_png:"res/bebong_dead.png",
    GhostCr_png:"res/ghost3.png",


    Boss_png: "res/quaivat 3_left.png",
    BigBossDown_png:"res/Boss/boss_down.png",
    BigBossLeft_png:"res/Boss/boss_left.png",
    BigBossRight_png:"res/Boss/boss_right.png",
    BigBossUp_png:"res/Boss/boss_up.png",
    BigBossHeart_png:"res/Boss/heart_boss.png",
    //CreppTiny
    CreepTinyLeft_png:"res/CreepTiny/quaivat 2_left.png",
    CreepTinyRight_png:"res/CreepTiny/quaivat 2_right.png",
    CreepTinyUp_png:"res/CreepTiny/quaivat 2_up.png",
    CreepTinyDown_png:"res/CreepTiny/quaivat 2_down.png",
    //sound
    Playgame_sound: "res/sound/soundGame.wav",
    Sound_Monsterdie:"res/sound/monster_die.wav",
    Sound_creatBoom: "res/sound/newbomb.wav",
    Sound_bombang:"res/sound/bomb_bang.wav",
    Sound_item: "res/sound/item.wav",
    sound_main: "res/sound/menu.wav",
    sound_lose: "res/sound/bomDrink.wav",
    sound_win: "res/sound/win.wav",


    Chat_png:"res/chat-28317513.jpg",
//map

//items
    ItemBoom_png: "res/items/item_bomb.gif",
    ItemSpeed_png: "res/items/item_bombsize.gif",
    ItemShoe_png: "res/items/item_shoe.gif",
    ItemBoomSize_png: "res/items/item_bombsize.gif",

    Boom_png: "res/bomb.gif",
    Map2_png: "res/img-1306336479-2.jpg",
    Help_png: "res/background_option.png",
    BGHighScore_png: "res/background_hightscore.png",
    BGChosePlayer_png: "res/background_Actor.png",

    BtnCancel_png: "res/cancel1.png",
    BtnCancel2_png: "res/cancel2.png",


    BoomBang_png: "res/bombbang.png",
    Start_png: "res/Play.png",
    Start2_png: "res/Play2.png",
    Exit_png: "res/Exit.png",
    Exit2_png: "res/Exit2.png",
    HightScore_png: "res/HightScore.png",
    HightScore2_png: "res/HightScore2.png",
    BackGr_png: "res/background_Menu.png",
    BoxOP_png: "res/Option.png",
    BoxOP2_png: "res/Option2.png",
    SliderProgress_png: "res/slider/sliderProgress.png",
    SliderThumb_png: "res/slider/sliderThumb.png",
    SliderTrack_png: "res/slider/sliderTrack.png",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
