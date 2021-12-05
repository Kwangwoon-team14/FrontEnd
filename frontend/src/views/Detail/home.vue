<template>
  <div>
    <header style="font-size: 200%">코로나19 예방접종</header>

    <v-container>
      <v-row class="mb-6">
        <v-col cols="6">
          <v-layout>
            <v-flex xs20 sm15>
              <v-card class="pa-2">
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
                          접종예약
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in table_item" :key="item.name">
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

        <v-col cols="6">
          <v-card class="mt-4 mx-auto" max-width="1000">
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
              <br />
              <v-btn color="primary" @click="reserve">
                예약하러 가기
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-layout>
            <v-flex xs20 sm15>
              <v-card class="pa-2">
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
                          접종예약
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in location" :key="item.name">
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
        <v-col cols="4">
          <v-layout>
            <v-flex xs20 sm15>
              <v-card class="pa-2">
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
                          접종예약
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in ages" :key="item.name">
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
    <br />
  </div>
</template>

<script>
import store from "../../store";

export default {
  data() {
    return {
      usesr: {},
      date: ["1/15", "2/15", "3/10", "4/20", "5/30", "6/22", "7/12", "8/6"],
      value: [],
      table_item: [],
      location: [],
      ages: [],
    };
  },
  methods: {
    async loadData() {
      const { data } = await this.$http.get("/home-data");

      this.value = data.values;
      this.table_item = data.table_items;
      this.location = data.locations;
      this.ages = data.ages;

      if (store.state.reservation.name) {
        const data = [...this.table_item];
        data[1]["plus"] = data[1]["plus"] + 1;
        data[2]["plus"] = data[2]["plus"] + 1;

        this.table_item = data;
      }

      if (store.state.reservation.name) {
        const data = [...this.location];
        data[0]["plus"] = data[0]["plus"] + 1;
      }

      if (store.state.reservation.name) {
        const data = [...this.ages];
        switch(true) {
          case (this.user.age < 20):
            data[0]["plus"] = data[0]["plus"] + 1;
            break;
          case (this.user.age < 30):
            data[1]["plus"] = data[1]["plus"] + 1;
            break;
          case (this.user.age < 40):
            data[2]["plus"] = data[2]["plus"] + 1;
            break;
          case (this.user.age < 50):
            data[3]["plus"] = data[3]["plus"] + 1;
            break;
          case (this.user.age < 60):
            data[4]["plus"] = data[4]["plus"] + 1;
            break;
          case (this.user.age < 70):
            data[5]["plus"] = data[5]["plus"] + 1;
            break;
          default:
            data[6]["plus"] = data[6]["plus"] + 1;
        }
      }
    },
    reserve() {
      this.$router.push("/main/reservation");
    },
  },

  created() {
    this.user = { ...store.state.user };
  },

  mounted() {
    this.loadData();

    console.log(store);
  },
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
