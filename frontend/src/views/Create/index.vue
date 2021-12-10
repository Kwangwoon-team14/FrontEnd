<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card fluid outlined flat>
          <v-card-title>
            회원가입
          </v-card-title>
          <v-divider />

          <v-snackbar v-model="snackbar" absolute top right color="success">
            <span>회원가입에 성공하였습니다.</span>
            <v-icon dark>
              mdi-checkbox-marked-circle
            </v-icon>
          </v-snackbar>

          <v-snackbar v-model="isError" absolute top right color="error">
            <span>동일한 아이디가 이미 존재합니다!</span>
          </v-snackbar>

          <v-form ref="form" @submit.prevent="submit">
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.name"
                    :rules="rules.name"
                    color="purple darken-2"
                    label="이름"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.gender"
                    :items="gender"
                    color="pink"
                    label="성별"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.number"
                    :rules="rules.number"
                    color="purple darken-2"
                    label="전화번호"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.email"
                    :rules="rules.email"
                    color="purple darken-2"
                    label="이메일"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.id"
                    :rules="rules.id"
                    color="purple darken-2"
                    label="아이디"
                    @keyDown="console.log(1)"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.passwd"
                    :rules="rules.passwd"
                    type="password"
                    color="purple darken-2"
                    label="비밀번호"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="form.address" color="teal">
                    <template v-slot:label>
                      <div>주소 <small>(도로명 주소)</small></div>
                    </template>
                  </v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-slider
                    v-model="form.age"
                    color="orange"
                    label="나이"
                    hint="나이가 맞는지 확인해주세요."
                    min="1"
                    max="100"
                    thumb-label
                  ></v-slider>
                </v-col>
                <v-col cols="12">
                  <v-checkbox v-model="form.terms" color="green">
                    <template v-slot:label>
                      <div @click.stop="">
                        정보 제공 이용
                        <a href="#" @click.prevent="terms = true">동의서</a>
                        에 동의하십니까? (필수)
                      </div>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn text @click="back">
                돌아가기
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!formIsValid"
                text
                color="primary"
                type="submit"
              >
                회원가입
              </v-btn>
            </v-card-actions>
          </v-form>
          
          <v-dialog v-model="terms" width="70%">
            <v-card>
              <v-card-title class="text-h6">
                Terms
              </v-card-title>
              <v-card-text v-for="n in 5" :key="n">
                {{ content }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="purple" @click="terms = false">
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        bio: '',
        favoriteAnimal: '',
        age: null,
        terms: false,
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          name: [val => (val || '').length > 0 || '이름을 작성해주세요'],
          number: [val => (val || '').length > 0 || '전화번호를 작성해주세요'],
          id: [val => (val || '').length > 0 || '아이디를 작성해주세요'],
          passwd: [val => (val || '').length > 0 || '비밀번호를 작성해주세요'],
          email: [val => (val || '').length > 0 || '이메일을 작성해주세요']
        },
        gender: ['남자', '여자'],
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.',
        snackbar: false,
        isError: false,
        terms: false,
        defaultForm,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.name &&
          this.form.number &&
          this.form.id &&
          this.form.gender &&
          this.form.passwd &&
          this.form.email &&
          this.form.address &&
          this.form.age &&
          this.form.terms
        )
      },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.$http.post("/create", this.form)
        .then(res => {
          // same id not exist
          if (res.data.success == true) {
            this.snackbar = true;
            this.resetForm();
            this.$router.push('/');
          }
          // same id exist
          if (res.data.success == false) {
            this.isError = true;
            setTimeout(() => {
              this.isError = false;
            }, 1000);
          }
        })
        .catch(err => {
          alert(err);
          this.resetForm();
        })
      },
      back () {
        this.$router.push("/");
        // console.log(this.$router.push);
      }
    },
  }
</script>
