var USPSGlobals = USPSGlobals || {};
USPSGlobals.Require = USPSGlobals.Require || {}, USPSGlobals.Require.requireGlobals = USPSRequireNS.require.config({
    baseUrl: "/global-elements/lib/script",
    context: "global"
}), USPSGlobals.Require.requireHeader = USPSRequireNS.require.config({
    baseUrl: "/global-elements/header/script/",
    context: "header",
    paths: {
        jquery: "/global-elements/footer/script/jquery-3.7.1",
        "require-jquery": "/global-elements/lib/script/require-jquery",
        helpers: "/global-elements/lib/script/helpers"
    },
    waitSeconds: 30
}), USPSGlobals.Require.requireHeader(["require", "require-jquery", "helpers","search-fe"], function(e, t, n, r) {
    var i = function() {
        var t = function() {};
        t()
    }()
});