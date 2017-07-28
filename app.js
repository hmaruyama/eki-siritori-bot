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

    baseUrl = "http://api.ekispert.jp/v1/json/"
    method = "station"
    url = encodeURI(baseUrl + method + "?name=" + session.message.text + "&key=" + process.env.EKISPERT_ACCESS_KEY)
    options = {
      url: url,
      json: true
    }

    request.get(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {

        if (body.ResultSet.Point) {
          point = {}
          if (body.ResultSet.Point instanceof Array) {
            point = body.ResultSet.Point[0]
          } else {
            point = body.ResultSet.Point
          }

          url = encodeURI(baseUrl + method + "?name=" + point.Station.Yomi.slice(-1) + "&key=" + process.env.EKISPERT_ACCESS_KEY)
          options = {
            url: url,
            json: true
          }
          request.get(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              if (body.ResultSet.Point) {
                point = {}
                if (body.ResultSet.Point instanceof Array) {
                  point = body.ResultSet.Point[0]
                } else {
                  point = body.ResultSet.Point
                }
                session.send("みつけました！ %s です", point.Station.Yomi)
              } else {
                session.send('まいりました')
              }
            } else {
              console.log('error: '+ response.statusCode)
            }
          })
        } else {
          session.send("そんなえきないですよ")
        }
        console.log(body.ResultSet.Point)
        session.send("みつけました！ %s です", body.ResultSet.Point.Station.Name)
      } else {
        console.log('error: '+ response.statusCode)
      }
    })
});
