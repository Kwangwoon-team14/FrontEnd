<template>
  <div>
    <header style="font-size: 200%">예약조회</header>
    <div>
      <h3 style="padding: 20px 10px;">예약한 기관이 {{chk[tmp]}}</h3>
      <v-divider />
    </div>
    <br>
    <v-card
      class="mx-auto"
      max-width="400"
      style="padding: 20px 20px"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://github.com/LYHyoung/img_file/blob/main/_114241106_vaccineillus976_rtrs.jpg?raw=true"
      >
        <v-card-title style="color: 'black'">백신접종이 예약되셨습니다</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        중앙보훈병원
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>070-7525-1221</div>

        <div>서울특별시 강동구 둔촌2동 진황도로61길 53</div>
        <div>14:00 예약</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="red"
          text
          dark
          @click="cancel"
        >
          예약취소
        </v-btn>
        <v-btn
          color="red"
          text
          dark
          @click="cancel"
        >
          예약변경
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chk: [
          '있습니다',
          '없습니다'
        ],
        tmp: 0,
      }
    },
    methods: {
      cancel () {
        alert("정말 취소하시겠습니까?")
        // this.$router.push("/main/reservation");
      }
    },
  }
</script>
