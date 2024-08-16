# MyNewYouTubeVideoHook

自分のYouTubeチャンネルで動画を投稿をするとDiscordにWebhookが送信される GAS

非公開や限定公開の動画もWebhookが送信されます。

## 使い方

Google Apps Script のライブラリに
<https://github.com/googleworkspace/apps-script-oauth2>
を追加してください。

GCP の認証情報の "承認済みのリダイレクトURI" には
`https://script.google.com/macros/d/GASプロジェクトID/usercallback`
に設定してください。

GASプロジェクトID はGASエディタのURLの
`https://script.google.com/u/0/home/projects/GASプロジェクトID/edit`
に書かれています。

<./config.js> に値を設定して、
<./code.js> の `function authorize()` を実行すると認証することができます。

<./code.js> の `function checkNewVideos()` を 10分に一回実行されるようにトリガーを作成することで
使えるようになります。
