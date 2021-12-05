module.exports = {
  /* connect to backend */

  devServer: {
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      "/": {
        // 프록시 요청을 보낼 서버의 주소
        target: "http://localhost:3000",
      },
    },
  },

  outputDir: "../backend/public",
  transpileDependencies: ["vuetify"],
};
