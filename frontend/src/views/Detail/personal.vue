<template>
  <div>
    <header style="font-size: 200%">개인 정보 조회</header>
    <v-card>
      <v-container fluid>
        <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
          <v-toolbar-title>개인정보</v-toolbar-title>
        </v-toolbar>
          <v-divider />

        <template v-if="this.$store.state.mno">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.Id"
                  label="id"
                  :disabled="true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.Name"
                  label="이름"
                  :disabled="true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="gender"
                  label="성별"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.Age"
                  label="나이"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.Phone"
                  label="전화번호"
                  :disabled="edit !== true"
                ></v-text-field> </v-col
            ></v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.Email"
                  label="이메일"
                  :disabled="edit !== true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.Address"
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
            <v-btn color="blue" right @click="onClickEdit" v-if="edit === false">
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
export default {
  data() {
    return {
      user: {},
      gender: '',
      edit: false
    };
  },

  methods: {
    onClickEdit() {
      this.edit = true;
    },

    onClickCancel() {
      this.$http.get(`/main/personal/${this.$store.state.mno}`)
      .then(res => {
        this.user = res.data;
        if (this.user.Sex == 'F')  this.gender = '여자';
        else  this.gender = '남자';
      })
      .catch(err => {
        alert(err);
      });
      this.edit = false;
    },

    onClickSave() {
      if (confirm("회원정보를 변경하시겠습니까?")) {
        if (this.gender == '여자')  this.user.Sex == 'F';
        else  this.user.Sex = 'M';
        this.$http.patch(`/main/personal/${this.$store.state.mno}`, this.user)
        .then(res => {
          alert(res.data.message);
        })
        .catch(err =>{
          alert(err);
        });
        this.onClickCancel();
      }
    },
  },

  created() {
    this.$http.get(`/main/personal/${this.$store.state.mno}`)
    .then(res => {
      this.user = res.data;
      if (this.user.Sex == 'F')  this.gender = '여자';
      else  this.gender = '남자';
    })
    .catch(err => {
      alert(err);
    });
  },
};
</script>
