const API = require("./api");

module.exports = new class HUD {

    constructor() {

    }

    init() {
        API.on("needToLogin",   this.showLoginPanel);
        API.on("loginSuccess",  this.showUserPanel);

        $(".facebook-login").click(() => API.redirectLogin("facebook"));
        $(".discord-login" ).click(() => API.redirectLogin("discord"));
        $(".google-login"  ).click(() => API.redirectLogin("google"));
        $(".logout-button" ).click(() => API.logout());
    }

    showLoginPanel() {
        $("#login-panel").show();
    }

    showUserPanel() {
        $("#user-panel").show();
        $("#username").text(API.name);
        $("#user-pfp").attr("src", API.avatarURL);
    }
}