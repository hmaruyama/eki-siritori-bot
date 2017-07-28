# 駅しりとりBot

※これを動かすには[駅すぱあとWebサービス フリープラン](https://ekiworld.net/service/lp/webservice/)のアクセスキーが必要です！
アクセスキーは[こちら](https://ekiworld.net/free_provision/index.php)から無料で申し込みできます。

## 起動方法
以下のツールをローカルにインストールします。

* Node.js http://nodejs.org
* Bot Framework Channel Emulator https://emulator.botframework.com/

Botを起動します。

```sh
$ git clone https://github.com/hmaruyama/eki-siritori-bot.git
$ cd eki-siritori-bot
$ npm install
$ export EKISPERT_ACCESS_KEY=xxxxxxxxxxxxxxxx     # 駅すぱあとWebサービスのアクセスキー
$ node app.js
```

Botが起動されると、リクエストをリスンするポート番号がコンソールに表示されます。

Bot Framework Channel エミュレーターを立ち上げます。
ウィンドウ上部の`Enter your endpoint URL`をクリックし、以下のURLを入力します。

```
http://localhost:ポート番号/api/messages
```

`Microsoft App ID`と`Microsoft App Password`を指定する画面が表示されますが、空欄のまま`Connect`ボタンをクリックします。

以上でエミュレーターを使用する準備ができました。
下部のメッセージ入力欄に`新宿`と入力、送信し、`みつけました！ 〇〇 です`を表示されたら成功です。
