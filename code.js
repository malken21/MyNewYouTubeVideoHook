function checkNewVideos() {
    // 前回取得した最新の動画の投稿した時刻を取得
    const lastCheckDate = getDate();

    const service = getYouTubeService();

    if (service.hasAccess()) {
        // 自分のチャンネルの動画をアップロードされた時間が新しい順で取得する URL
        const url = `https://www.googleapis.com/youtube/v3/search?forMine=true&part=snippet&order=date&type=video&maxResults=50`;
        const response = UrlFetchApp.fetch(url, { headers: { Authorization: `Bearer ${service.getAccessToken()}` } });
        const data = JSON.parse(response.getContentText());

        if (data.items) data.items.slice().reverse().forEach((item, index) => {
            if (new Date(item.snippet.publishedAt) > lastCheckDate) {
                // Discord に Webhook 送信
                sendDiscordNotification(item);
                // 2s 待機
                Utilities.sleep(2000);

                // もし最新の動画だったら
                if (index + 1 == data.items.length)
                    setDate(item.snippet.publishedAt);
            }
        });
    } else {
        console.log(service.getLastError());
    }
}


// 認証をする関数
function authorize() {
    const service = getYouTubeService();
    if (!service.hasAccess()) {
        const authorizationUrl = service.getAuthorizationUrl();
        console.log("以下のURLにアクセスして認証をしてください");
        console.log(authorizationUrl);
    }
}
