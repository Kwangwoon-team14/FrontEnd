<template>
  <div>
    <header style="font-size: 200%">개인 정보 조회</header>
    <v-card>
      <v-container fluid>
        <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
          <v-toolbar-title>개인정보</v-toolbar-title>
        </v-toolbar>
        <v-divider />

        <template v-if="user.name">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.id"
                  label="id"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.name"
                  label="이름"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.gender"
                  label="성별"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.age"
                  label="나이"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.tel"
                  label="전화번호"
                  :disabled="edit !== true"
                ></v-text-field> </v-col
            ></v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.email"
                  label="이메일"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.address"
                  label="주소"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
          </v-container>
        </template>
        <v-toolbar class="mt-2" color="indigo" dark flat>
          <v-toolbar-title class="subheading">
            <v-btn
              color="blue"
              right
              @click="onClickEdit"
              v-if="edit === false"
            >
              수정하기
            </v-btn>

            <template v-else>
              <v-btn color="blue" right @click="onClickCancel">
                취소하기
              </v-btn>
              <v-btn right @click="onClickSave">
                저장하기
              </v-btn>
            </template>
          </v-toolbar-title>
        </v-toolbar>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      user: {},
      edit: false,
    };
  },

  methods: {
    onClickEdit() {
      this.edit = true;
    },
    onClickCancel() {
      this.edit = false;
    },
    onClickSave() {
      if (confirm("회원정보를 변경하시겠습니까?")) {
        store.commit("update", this.user);
        this.edit = false;
        alert("변경되었습니다.");
      }
    },
  },

  created() {
    this.user = { ...store.state.user };
  },
};
</script>
