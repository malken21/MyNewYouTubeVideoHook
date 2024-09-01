// Google Cloud Platform の OAuth 2.0クライアントID
const CLIENT_ID = 'CLIENT_ID';
// Google Cloud Platform の OAuth 2.0クライアントシークレット
const CLIENT_SECRET = 'CLIENT_SECRET';
// Discord Webhook URL
const DISCORD_WEBHOOK_URL = 'DISCORD_WEBHOOK_URL';


// Discordに送信される payload
// ビデオのプロパティは下記のドキュメントを参照してください
// https://developers.google.com/youtube/v3/docs/search?hl=ja#properties
const payload = video => {
    return {
        "content": `新しい動画が投稿されました! https://youtu.be/${video.id.videoId}`
    }
}