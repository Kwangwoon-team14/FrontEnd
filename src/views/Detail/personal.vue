<template>
  <div>
    <header style="font-size: 200%">개인 정보 조회</header>
    <v-card>
      <v-container fluid>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          dark
          flat
        >
          <v-toolbar-title>개인정보</v-toolbar-title>
        </v-toolbar>
          <v-divider />
        
        <v-container>
          <v-row><v-col>{{tag_name[0]}}</v-col><v-col>{{about[0]}}</v-col></v-row>
          <v-divider />
          <v-row><v-col>{{tag_name[1]}}</v-col><v-col>{{about[1]}}</v-col></v-row>
          <v-divider />
          <v-row><v-col>{{tag_name[2]}}</v-col><v-col>{{about[2]}}</v-col></v-row>
          <v-divider />
          <v-row><v-col>{{tag_name[3]}}</v-col><v-col>{{about[3]}}</v-col></v-row>
          <v-divider />
          <v-row><v-col>{{tag_name[4]}}</v-col><v-col>{{about[4]}}</v-col></v-row>
          <v-divider />
          <v-row><v-col>{{tag_name[5]}}</v-col><v-col>{{about[5]}}</v-col></v-row>
          <v-divider />
          <v-row><v-col>{{tag_name[6]}}</v-col><v-col>{{about[6]}}</v-col></v-row>
          <v-divider />
        </v-container>
        <v-toolbar
          class="mt-2"
          color="indigo"
          dark
          flat
        >
          <v-toolbar-title class="subheading">
            <v-btn
              color="blue"
              right
            >
              수정하기
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tag_name: [
          '이름',
          '성별',
          '나이',
          '전화번호',
          'E-mail',
          'ID',
          '주소',
        ],
        about: [
          '홍길동',
          '남자',
          '20',
          '010-1234-5678',
          '2017000000@kw.ac.kr',
          'fake_id',
          '서울특별시 노원구 월계1동 광운로 20 새빛관 101호',
          '1234',
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    }
  }
</script>
