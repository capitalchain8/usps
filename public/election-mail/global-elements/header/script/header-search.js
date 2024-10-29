var fdicGlobals = fdicGlobals || {};
fdicGlobals.Require = fdicGlobals.Require || {}, fdicGlobals.Require.requireGlobals = fdicRequireNS.require.config({
    baseUrl: "/global-elements/lib/script",
    context: "global"
}), fdicGlobals.Require.requireHeader = fdicRequireNS.require.config({
    baseUrl: "/global-elements/header/script/",
    context: "header",
    paths: {
        jquery: "/global-elements/footer/script/jquery-3.7.1",
        "require-jquery": "/global-elements/lib/script/require-jquery",
        helpers: "/global-elements/lib/script/helpers"
    },
    waitSeconds: 30
}), fdicGlobals.Require.requireHeader(["require", "require-jquery", "helpers","search-fe"], function(e, t, n, r) {
    var i = function() {
        var t = function() {};
        t()
    }()
});