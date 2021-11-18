<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card fluid outlined>
          <v-card-title>
              개인정보 조회
          </v-card-title>
              <v-divider />
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.id"
                label="아이디"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="form.pwd"
                label="비밀번호"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="join">회원가입</v-btn>
            <v-btn color="primary" @click="signIn">로그인</v-btn>
          </v-card-actions>
                <v-divider />
          <v-card-text>
              <h2>
                <p class="font-weight-black">
                  이용 문의
                </p>
              </h2>
              <a href="mailto:someone@example.com">someone@example.com</a>
              <div>
                <h3 class="company-name">(주) 임시방편소</h3>
                <p class="description">
                  대표자 : 홍길동<br/>
                  주소 : 서울특별시 노원구 광운로 20 (월계동 447-1)<br/>
                  대표전화 : 02-123-4567<br/>
                  사업자번호 : 111-22-33333<br/>
                </p>
              </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios';

export default {
  data () {
    return {
      form: {
        id: '',
        pwd: ''
      }
    }
  },
  methods: {
    signIn () {
        this.$router.push("/main/home");
        // console.log(this.$router.push);
    },
    join () {
        this.$router.push("/create");
    }
  }
};
</script>
<style>
  .company-name{
    padding: 10px 0;
    font-size: 0.95rem;
    font-weight: normal;
  }

  .description{
    font-size: 0.85rem;
  }
</style>