var App = {
    logo: "https://avatars.githubusercontent.com/u/75770878?s=400&u=85be0810ccfb5f56a393f71cf971021f087c5a59&v=4",
    messages: [
        "Aprendiendo a Escuchar",
        "Todo es Mas Sencillo"
    ],
    data: {received: [], sent: []}
}
App.random_message = function () {
    return this.messages[Math.round( Math.random() * (this.messages.length - 1) )];
};
function SendMessage ( message ){
    App.data.received.push(message.text);
    var chat = $(this).data("chat");
    setTimeout(function(){
        var _m = {
            name: "CircuitalMinds",
            time: (new Date()),
            avatar: App.logo,
            text: App.random_message(),
            position: "left"
        };
       App.data.sent.push(_m.text);
       chat.add(_m);
    }, 1000 + Math.round(Math.random() * 2000));
}