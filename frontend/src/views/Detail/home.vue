<template>
  <div>
    <header style="font-size: 200%">코로나19 백신 접종 현황</header>

    <v-container>
      <v-row class="mb-6">
        <v-col cols="6">
          <v-layout>
            <v-flex xs20 sm15>
              <v-card class="pa-2">
                <div>
                  <h3 style="padding: 20px 10px;">당일 접종 현황</h3>
                  <v-divider />
                </div>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">구분</th>
                        <th class="text-left">1차 접종완료</th>
                        <th class="text-left">2차 접종완료</th>
                        <th class="text-left">접종완료 합계</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in today_items" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.first }}</td>
                        <td>{{ item.second }}</td>
                        <td>{{ item.total }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>
        
        <v-col cols="6">
          <v-layout>
            <v-flex xs20 sm15>
              <v-card class="pa-2">
                <div>
                  <h3 style="padding: 20px 10px;"> 월 별 접종 추이</h3>
                </div>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="rgba(0, 0, 0, .12)"
                  elevation="12"
                  max-width="calc(100% - 40px)">
                  <GoogleChart2 />
                </v-sheet>
                <br>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-layout>
            <v-flex xs20 sm15>
              <v-card class="pa-2">
                <div>
                  <h3 style="padding: 20px 10px;"> 지역 별 접종 추이</h3>
                </div>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="rgba(0, 0, 0, .12)"
                  elevation="12"
                  max-width="calc(100% - 40px)">
                  <GoogleChart3 />
                </v-sheet>
                <br>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>

        <v-col cols="6">
          <v-layout>
            <v-flex xs20 sm15>
              <v-card class="pa-2">
                <div>
                  <h3 style="padding: 20px 10px;"> 나이대 별 접종/예약자수 비율</h3>
                </div>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="rgba(0, 0, 0, .12)"
                  elevation="12"
                  max-width="calc(100% - 40px)">
                  <GoogleChart4 />
                </v-sheet>
                <br>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
    <br>
  </div>
</template>

<script>
import GoogleChart2 from '../../components/GoogleChart2.vue'
import GoogleChart3 from '../../components/GoogleChart3.vue'
import GoogleChart4 from '../../components/GoogleChart4.vue'
export default {
  components: {
      GoogleChart2,
      GoogleChart3,
      GoogleChart4
    },
  data () {
    return {
      today_items: [
        { name: '당일실적', first: '', second: '', total: ''},
        { name: '당일누적', first: '', second: '', total: ''},
        { name: '전일누적', first: '', second: '', total: ''},
      ]
    }
  },
  created() {
    this.$http.get(`/main/home/`)
    .then(res=>{
      // 당일 접종 현황
      this.today_items[0].first = res.data[0].Today1;
      this.today_items[0].second = res.data[0].Today2;
      this.today_items[0].total = res.data[0].Today;
      this.today_items[1].first = res.data[0].TodayAccum1;
      this.today_items[1].second = res.data[0].TodayAccum2;
      this.today_items[1].total = res.data[0].TodayAccum;
      this.today_items[2].first = res.data[0].YestAccum1;
      this.today_items[2].second = res.data[0].YestAccum2;
      this.today_items[2].total = res.data[0].YestAccum;
    })
    .catch(err => {
      alert(err);
    });
  }
}  
</script>

<style>
  .v-sheet--offset {
    top: 0px;
    position: relative;
  }
</style>