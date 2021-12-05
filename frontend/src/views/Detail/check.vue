<template>
  <div>
    <header style="font-size: 200%">예약조회</header>
    <div>
      <h3 style="padding: 20px 10px;">
        {{
          this.isReserve ? "예약한 기관이 있습니다." : "예약한 기관이 없습니다."
        }}
      </h3>
      <v-divider />
    </div>
    <br />
    <template v-if="isReserve">
      <v-card class="mx-auto" max-width="400" style="padding: 20px 20px">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://github.com/LYHyoung/img_file/blob/main/_114241106_vaccineillus976_rtrs.jpg?raw=true"
        >
          <v-card-title style="color: 'black'"
            >백신접종이 예약되셨습니다</v-card-title
          >
        </v-img>
        <v-card-subtitle class="pb-0">
          {{ reservation.name }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ reservation.tel }}</div>

          <div>{{ reservation.address }}</div>
          <div>{{ reservation.date }} {{ reservation.time }} 예약</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" text dark @click="cancel">
            예약취소
          </v-btn>
          <v-btn color="red" text dark @click="modify">
            예약변경
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      isReserve: false,
      reservation: {},
    };
  },
  methods: {
    cancel() {
      if (confirm("정말 취소하시겠습니까?")) {
        store.commit("reservationRemove");
        this.isReserve = false;
        this.reservation = {};
        alert("예약이 취소되었습니다.");
      }
    },
    modify() {
      if (confirm("예약을 변경하시겠습니까?")) {
        this.$router.push("/main/reservation");
      }
    },
  },

  created() {
    this.reservation = { ...store.state.reservation };

    if (this.reservation.name) {
      this.isReserve = true;
    }
  },
};
</script>
