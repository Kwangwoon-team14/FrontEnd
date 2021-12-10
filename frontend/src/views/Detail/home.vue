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
                  <h3 style="padding: 20px 10px;">월 별 접종 추이</h3>
                </div>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="rgba(0, 0, 0, .12)"
                  elevation="12"
                  max-width="calc(100% - 40px)">
                  <v-sparkline
                    :labels="month_items.month"
                    :value="month_items.count"
                    color="rgba(0, 0, 250, .5)"
                    line-width="2"
                    label-size="5"
                    padding="10"
                  ></v-sparkline>
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
                  <h3 style="padding: 20px 10px;">지역 별 접종 추이</h3>
                </div>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="rgba(0, 0, 0, .12)"
                  elevation="12"
                  max-width="calc(100% - 40px)">
                  <v-sparkline
                    :labels="region_items.region"
                    :value="region_items.count"
                    type='bar'
                    color="rgba(0, 0, 250, .5)"
                    line-width="2"
                    label-size="5"
                    padding="10"
                  ></v-sparkline>
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
                  <h3 style="padding: 20px 10px;">나이대 별 접종 추이</h3>
                </div>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="rgba(0, 0, 0, .12)"
                  elevation="12"
                  max-width="calc(100% - 40px)">
                  <v-sparkline
                    :labels="age_items.age"
                    :value="age_items.count"
                    type='bar'
                    color="rgba(0, 0, 250, .5)"
                    line-width="2"
                    label-size="5"
                    padding="10"
                  ></v-sparkline>
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
export default {
  data () {
    return {
      today_items: [
        { name: '당일실적', first: '', second: '', total: ''},
        { name: '당일누적', first: '', second: '', total: ''},
        { name: '전일누적', first: '', second: '', total: ''},
      ],
      month_items: {
        month: [],
        count: []
      },
      region_items: {
        region: [],
        count: []
      },
      age_items: {
        age: [],
        count: []
      }
    }
  },
  created() {
    this.$http.get(`/main/home/`)
    .then(res=>{
      // 당일 접종 현황
      this.today_items[0].first = res.data[0][0].Today1;
      this.today_items[0].second = res.data[0][0].Today2;
      this.today_items[0].total = res.data[0][0].Today;
      this.today_items[1].first = res.data[0][0].TodayAccum1;
      this.today_items[1].second = res.data[0][0].TodayAccum2;
      this.today_items[1].total = res.data[0][0].TodayAccum;
      this.today_items[2].first = res.data[0][0].YestAccum1;
      this.today_items[2].second = res.data[0][0].YestAccum2;
      this.today_items[2].total = res.data[0][0].YestAccum;
      // 월별 접종 추이
      this.month_items.month = new Array(res.data[1].length)
      this.month_items.count = new Array(res.data[1].length)
      for (var i = 0; i < (res.data[1]).length; i++)
      {
        var temp = res.data[1][i].month.split('-');
        this.month_items.month[i] = temp[0].substring(2) + '/'+ temp[1];
        this.month_items.count[i] = res.data[1][i].count;
      }
      // 지역별 접종 현황
      this.region_items.region = new Array(res.data[3].length)
      this.region_items.count = new Array(res.data[3].length)
      for (i = 0; i < (res.data[3]).length; i++)
      {
        this.region_items.region[i] = res.data[3][i].City.substring(0, 2);
        this.region_items.count[i] = res.data[3][i].people;
      }
      // 나이별 접종 현황
      this.age_items.age = new Array(res.data[5].length)
      this.age_items.count = new Array(res.data[5].length)
      for (i = 0; i < (res.data[5]).length; i++)
      {
        this.age_items.age[i] = res.data[5][i].front_age;
        this.age_items.count[i] = res.data[5][i].people;
      }
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