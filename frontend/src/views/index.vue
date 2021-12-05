<template>
  <v-card min-height="100vh">
    <v-layout>
        <v-navigation-drawer permanent height="100vh">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                백신 예약
              </v-list-item-title>
              <v-layout>
                <v-btn color="primary" @click="login">로그아웃</v-btn>
              </v-layout>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <template v-for="item in items">
              <div :key="item.title" >
                <v-list-item @click="link(item)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </template>
          </v-list>
        </v-navigation-drawer>
        <div style="width: 100%">
          <router-view />
        </div>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "홈으로", icon: "mdi-home", name: "home" },
        { title: "예약하기", icon: "mdi-clock", name: "reservation" },
        { title: "예약조회", icon: "mdi-flag", name: "check" },
        { title: "개인정보조회", icon: "mdi-account", name: "personal" },
      ]
    };
  },
  methods: {
    login() {
      this.$router.push("/");
    },
    
    link(item) {
      this.$router.push({
        name: item.name
      });
    },
    
  },
};
</script>
<style >
  header{
    height: 87px; 
    border-bottom:1px solid #ccc; 
    padding-left: 20px; 
    display:flex; 
    align-items:center;
  }
</style>