# FrontEnd

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### CORS 처리

vue.config.js 에서 devServer를 아래의 코드로 변경

```
  devServer: {
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      "/": {
        // 프록시 요청을 보낼 서버의 주소
        target: "http://localhost:3000",
      },
    },
  },
```

### API 사용하기

원하는 파일에서 아래와 같은 방식으로 요청

```

<script>
export default {
  methods: {
    async loadData() {
      const { data } = await this.$http.get("/users");
      console.log(data);
    },
  },

  created() {
    this.loadData();
  },
};
</script>

```
