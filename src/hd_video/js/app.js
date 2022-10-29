const dplayer = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: './images/video.mp4',  //视频地址
        pic: './images/banner.jpeg', //视频封面
        thumbnails: 'images/default.png', //视频缩略图
        type: 'auto'
    },
    //lang: 'en', // 可选，语言，`zh'用于中文，`en'用于英语，默认：Navigator
    loop: false, // 可选，循环播放音乐，默认：true
    theme: '#FADFA3', // 可选，主题颜色，默认: #b7daff
    screenshot: true, // 可选，启用截图功能，默认值：false，注意：如果设置为true，视频和视频截图必须启用跨域
    hotkey: true,  // 可选，绑定热键，包括左右键和空格，默认值：true
    preload: 'auto',  // 可选，预加载的方式可以是'none''metadata''auto'，默认

    // dplayer.seek('6.972618'), //跳转到指定时间位置
    autoplay: true, //自动播放 不支持移动浏览器
    danmaku: {   // 可选，显示弹幕，忽略此选项以隐藏弹幕
        id: '9E2E3368B56CDBB4',  // 必需，弹幕 id，注意：它必须是唯一的，不能在你的新播放器中使用这些： `https://api.prprpr.me/dplayer/list`
        api: 'https://api.prprpr.me/dplayer/',   // 必需，弹幕 api
        token: 'tokendemo',  // 可选，api 的弹幕令牌
        maximum: 1000,  // 可选，最大数量的弹幕
        addition: ['https://api.prprpr.me/dplayer/bilibili?aid=4157142']  // 可选的，额外的弹幕，参见：`Bilibili弹幕支持`
    }
});