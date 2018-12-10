/**
* name 
*/
var uiEx;
(function (uiEx) {
    var Home = (function (_super) {
        function Home() {
            Home.super(this);
        }
        Laya.class(Home, "uiEx.Home", _super);
        return Home;
    }(ui.homeUI));
    uiEx.Home = Home;
})(uiEx || (uiEx = {}));