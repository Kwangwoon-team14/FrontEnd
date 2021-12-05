<template>
  <div>
    <header style="font-size: 200%">예약하기</header>

    <div>
      <h3 style="padding: 20px 10px;">의료기관 찾기 / 예약 변경</h3>
      <v-divider />
    </div>

    <div style="padding: 20px 20px">
      <v-container fluid>
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar dark color="blue darken-3" class="mb-1">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="통합 검색"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:default="props" v-if="items.length > 0">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card>
                  <v-card-title class="subheading font-weight-bold">
                    {{ item.name }}
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        서울특별시
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        구
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item["gu"] }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        동
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item["dong"] }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        전화번호
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item["tel"] }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        주소
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item["address"] }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        <v-select
                          v-model="item.date"
                          :items="dates"
                          value
                          filled
                          label="예약일"
                        ></v-select>
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        <v-select
                          v-model="item.time"
                          :items="times"
                          value
                          filled
                          label="예약시간"
                        ></v-select>
                      </v-list-item-content>
                    </v-list-item>

                    <v-card-actions class="justify-center">
                      <v-btn
                        color="primary"
                        dark
                        @click="onClickReservation(item)"
                      >
                        예약하기
                      </v-btn>
                    </v-card-actions>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <span class="grey--text">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    dark
                    text
                    color="primary"
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-spacer></v-spacer>

              <span
                class="mr-4
                grey--text"
              >
                Page {{ page }} of {{ numberOfPages }}
              </span>
              <v-btn
                fab
                dark
                color="blue darken-3"
                class="mr-1"
                @click="formerPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                color="blue darken-3"
                class="ml-1"
                @click="nextPage"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </div>
    <v-divider />
    <div></div>
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      type: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      sortByGu: "",
      seoul: "서울특별시",
      vaccine: ["아스트라제네카", "안센", "화이자", "모더나"],
      gu: [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구",
      ],
      keys: ["Name", "서울특별시", "구", "동", "전화번호", "주소"],
      dates: ["1/15", "2/15", "3/10", "4/20", "5/30", "6/22", "7/12", "8/6"],
      times: [
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
      ],
      items: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    createItems() {
      this.items = [
        {
          name: "아이비 이비인후과 의원",
          gu: "영등포구",
          dong: "청담동",
          tel: "02-479-1234",
          address: "서울특별시 영등포구 여의도동 43-4",
          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "상쾌한이비인후과 의원",
          gu: "강동구",
          dong: "강동",
          tel: "02-472-1234",
          address: "562 한빛프라자, 송파대로 송파구 서울특별시",
          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "송내과의원",
          gu: "중구",
          dong: "을지로4가",
          tel: "02-444-1234",
          address: "서울특별시 성북구 종암동 70-1",
          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "늘편한내과의원",
          gu: "강동구",
          dong: "성내동",
          tel: "02-473-1234",
          address: "서울특별시 강동구 성내동 439-15",

          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "해맑은이비인후과의원",
          gu: "송파구",
          dong: "잠실본동",
          tel: "02-479-2314",
          address: "서울특별시 송파구 잠실본동 184-21",
          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "강동중앙내과외과의원",
          gu: "강동구",
          dong: "강동",
          tel: "02-479-2223",
          address: "서울특별시 강동구 길동 411-4번지 3층",
          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "송파중앙병원",
          gu: "송파구",
          dong: "풍납1동",
          tel: "02-479-1245",
          address: "서울특별시 송파구 올림픽로 326 05552",
          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "광운중앙병원",
          gu: "성동구",
          dong: "용답동",
          tel: "070-7555-1221",
          address: "서울특별시 노원구 월계1동 광운로 20",
          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "중앙보훈병원",
          gu: "강동구",
          dong: "둔촌2동",
          tel: "070-7525-1221",
          address: "서울특별시 강동구 둔촌2동 진황도로61길 53",
          date: "2021-12-05",
          time: "14:00",
        },
        {
          name: "스타이비인후과 의원",
          gu: "송파구",
          dong: "석촌동",
          tel: "070-7555-2311",
          address: "서울특별시 송파구 석촌동 백제고분로 365",
          date: "2021-12-05",
          time: "14:00",
        },
      ];
    },
    onClickReservation(item) {
      store.commit("reservationUpdate", item);
      alert("예약되었습니다.");
      this.$router.push("/main/check");
    },
  },
  created() {
    this.createItems();
  },
};
</script>
