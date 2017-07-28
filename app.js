var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    // やりたいこと
    // botと鉄道駅に限定した駅しりとりを行う
    // * ユーザのメッセージをnameに代入し駅API呼び出し
    //   * 駅が存在した場合
    //     * みつけました！〇〇です
    //   * 駅が存在しなかった場合
    //     * そんなえきないですよ
    baseUrl = "http://api.ekispert.jp/v1/json/"
    method = "station"
    url = encodeURI(baseUrl + method + "?name=" + session.message.text + "&key=" + process.env.EKISPERT_ACCESS_KEY)
    options = {
      url: url,
      json: true
    }

    request.get(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body.ResultSet.Point)
        session.send("みつけました！ %s です", body.ResultSet.Point.Station.Name)
      } else {
        console.log('error: '+ response.statusCode)
      }
    })
});
