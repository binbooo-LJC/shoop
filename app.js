//app.js
App({
  onLaunch: function (ops) {
    console.log(ops.scene)
    // 展示本地存储能力
    if (ops.scene == 1044) {
      console.log(ops.shareTicket)
    }
  },
  globalData: {
    app_address:'https://api.it120.cc/',
    subDomain:'5394cdb5d2a361dbaa95247f9c1cfc31',
    shareshortTitle:'LEARN THE MINI APP BY MYSELF'
  }
})