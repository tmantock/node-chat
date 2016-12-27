//https://docs.botframework.com/en-us/node/builder/overview/

var restify = require('restify');
var builder = require('botbuilder');
var PORT = 3000;

//=========
//Bot Setup
//========

var server = restify.createServer();
server.listen(PORT, function () {
    console.log(`Listening to ${PORT}, ${server.name}, ${server.url}`);
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//Bot Dialogs

bot.dialog('/', function (session) {
    session.send("Hello World");
});
