<template>
  <div>
    <header style="font-size: 200%">코로나19 예방접종</header>

    <v-container>
      <v-row
        class="mb-6"
      >
        <v-col
          cols="6"
        >
          <v-layout>
            <v-flex xs20 sm15>
              <v-card
                class="pa-2"
              >
                <div>
                  <h3 style="padding: 20px 10px;">예방접종 실적 현황</h3>
                  <v-divider />
                </div>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          구분
                        </th>
                        <th class="text-left">
                          1차접종
                        </th>
                        <th class="text-left">
                          접종완료
                        </th>
                        <th class="text-left">
                          추가접종
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in table_item"
                        :key="item.name"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.fir }}</td>
                        <td>{{ item.done }}</td>
                        <td>{{ item.plus }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>

        <v-col
          cols="6"
        >
        <v-card
          class="mt-4 mx-auto"
          max-width="1000"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="rgba(0, 0, 0, .12)"
            elevation="12"
            max-width="calc(100% - 40px)"
          >
            <v-sparkline
              :labels="date"
              :value="value"
              color="rgba(0, 0, 250, .5)"
              line-width="2"
              label-size="5"
              padding="10"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 mb-2">
              날짜별 접종 추이
            </div>
            <div class="subheading font-weight-light grey--text">
              from Kwangwoon Univ.
            </div>
            <br>
            <v-btn
              color="primary"
              @click="reserve"
            >
              예약하러 가기
            </v-btn>
          </v-card-text>
        </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="6"
        >
          <v-layout>
            <v-flex xs20 sm15>
              <v-card
                class="pa-2"
              >
                <div>
                  <h3 style="padding: 20px 10px;">지역 별 접종 현황</h3>
                  <v-divider />
                </div>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          구분
                        </th>
                        <th class="text-left">
                          1차접종
                        </th>
                        <th class="text-left">
                          접종완료
                        </th>
                        <th class="text-left">
                          추가접종
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in location"
                        :key="item.name"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.fir }}</td>
                        <td>{{ item.done }}</td>
                        <td>{{ item.plus }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>
        <v-col
          cols="4"
        >
          <v-layout>
            <v-flex xs20 sm15>
              <v-card
                class="pa-2"
              >
                <div>
                  <h3 style="padding: 20px 10px;">나이 별 접종 현황</h3>
                  <v-divider />
                </div>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          구분
                        </th>
                        <th class="text-left">
                          1차접종
                        </th>
                        <th class="text-left">
                          접종완료
                        </th>
                        <th class="text-left">
                          추가접종
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in ages"
                        :key="item.name"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.fir }}</td>
                        <td>{{ item.done }}</td>
                        <td>{{ item.plus }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
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
        date: [
        '1/15',
        '2/15',
        '3/10',
        '4/20',
        '5/30',
        '6/22',
        '7/12',
        '8/6',
      ],
      value: [
        20,
        25,
        40,
        40,
        66,
        75,
        80,
        81,
      ],
        table_item: [
          {
            name: '당일누적',
            fir: 40398477,
            done: 33166098,
            plus: 5575,
          },
          {
            name: '당일실적',
            fir: 63954,
            done: 353781,
            plus: 90,
          },
          {
            name: '전일누적',
            fir: 40334523,
            done: 32812317,
            plus: 5485,
          },
        ],
        location: [
          {
            name: '서울',
            fir: 7562468,
            done: 6194826,
            plus: 952
          },
          {
            name: '강원도',
            fir: 1212781,
            done: 1027130,
            plus: 197
          },
          {
            name: '경기도',
            fir: 10545235,
            done: 8451744,
            plus: 621
          },
          {
            name: '경상도',
            fir: 2597945,
            done: 2174376,
            plus: 368 
          },
          {
            name: '전라도',
            fir: 1429176,
            done: 1211946,
            plus: 372 
          },
          {
            name: '충청도',
            fir: 1690531,
            done: 1396705,
            plus: 286
          },
        ],
        ages: [
          {
            name: '유아~10대',
            fir: 7562468,
            done: 6194826,
            plus: 952
          },
          {
            name: '20대',
            fir: 1212781,
            done: 1027130,
            plus: 197
          },
          {
            name: '30대',
            fir: 10545235,
            done: 8451744,
            plus: 621
          },
          {
            name: '40대',
            fir: 2597945,
            done: 2174376,
            plus: 368 
          },
          {
            name: '50대',
            fir: 1429176,
            done: 1211946,
            plus: 372 
          },
          {
            name: '60대',
            fir: 1690531,
            done: 1396705,
            plus: 286
          },
          {
            name: '70대 이상',
            fir: 1690531,
            done: 1396705,
            plus: 286
          },
        ]
      }
    },
    methods: {
      reserve () {
        this.$router.push("/main/reservation");
        // console.log(this.$router.push);
      }
    },
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>