function getYouTubeService() {
    return OAuth2.createService('YouTube')
        .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
        .setTokenUrl('https://accounts.google.com/o/oauth2/token')
        .setClientId(CLIENT_ID)
        .setClientSecret(CLIENT_SECRET)
        .setCallbackFunction('authCallback')
        .setPropertyStore(PropertiesService.getScriptProperties())
        .setScope('https://www.googleapis.com/auth/youtube.readonly')
        .setTokenHeaders({
            'Authorization': 'Basic ' + Utilities.base64Encode(CLIENT_ID + ':' + CLIENT_SECRET)
        })
        .setParam('access_type', 'offline') // リフレッシュトークンを取得するために必要
        .setParam('approval_prompt', 'force'); // 初回のみユーザーに再度認証を促す
}

function authCallback(request) {
    const service = getYouTubeService();
    const isAuthorized = service.handleCallback(request);
    if (isAuthorized)
        return HtmlService.createHtmlOutput('認証に成功しました。');
    else
        return HtmlService.createHtmlOutput('認証に失敗しました。');
}

function getDate() {
    const time = PropertiesService.getScriptProperties().getProperty('lastCheckDate')
    if (!time) {
        const nowTime = new Date();
        PropertiesService.getScriptProperties().setProperty('lastCheckDate', nowTime.toISOString());
        return nowTime;
    }
    return new Date(time);
}
function setDate(time) {
    PropertiesService.getScriptProperties().setProperty('lastCheckDate', time);
}

function sendDiscordNotification(video) {
    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload(video))
    };
    UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, options);
    console.log(`${video.snippet.publishedAt}: https://youtu.be/${video.id.videoId}`);
}
