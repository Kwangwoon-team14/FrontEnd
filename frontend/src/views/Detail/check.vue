<template>
  <div>
    <header style="font-size: 200%">예약조회</header>
    
    <div>
      <h3 style="padding: 20px 10px;">
        {{ this.isReserve ? "접종완료 및 예약 기록" : "접종완료 및 예약 기록이 없습니다." }}
      </h3>
      <v-divider />
    </div>
    <br />

    <div style="padding: 20px 20px">
      <v-container fluid>
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <template v-slot:default="props" v-if="items.length > 0">
            <v-row>
              <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                <v-card v-if="new Date(item.Date) <= new Date()"> 
                  <v-img class="white--text align-end" height="200px"
                  src="https://github.com/LYHyoung/img_file/blob/main/139110_66262_5215.jpg?raw=true">
                    <v-card-title style="color: 'black'">{{ item.Inoculation }}차 접종정보</v-card-title>
                  </v-img>
                  <v-card-subtitle class="pb-0">
                    {{ item.Hname }}
                  </v-card-subtitle>
                  <v-card-text class="text--primary">
                    <div>{{ item.City + ' ' + item.Gu + ' ' + item.Dong }}</div>
                    <div>{{ item.Phone }}</div>
                    <div>접종백신{{ ':' + item.Vname }}</div>
                    <div>{{ item.Date + ' ' + item.Time + ':00' }} 접종완료</div>
                  </v-card-text>
                </v-card>
                <v-card v-else>
                  <v-img class="white--text align-end" height="200px"
                  src="https://github.com/LYHyoung/img_file/blob/main/_114241106_vaccineillus976_rtrs.jpg?raw=true">
                    <v-card-title style="color: 'black'">{{ item.Inoculation }}차 예약정보</v-card-title>
                  </v-img>
                  <v-card-subtitle class="pb-0">
                    {{ item.Hname }}
                  </v-card-subtitle>
                  <v-card-text class="text--primary">
                    <div>{{ item.City + ' ' + item.Gu + ' ' + item.Dong }}</div>
                    <div>{{ item.Phone }}</div>
                    <div>접종백신{{ ':' + item.Vname }}</div>
                    <div>{{ item.Date + ' ' + item.Time + ':00' }} 예약됨</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="red" text dark @click="cancel(item)">예약취소</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <span class="grey--text">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray" :key="index"
                    @click="updateItemsPerPage(number)">
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-spacer></v-spacer>
              <span class="mr-4 grey--text">
                Page {{ page }} of {{ numberOfPages }}
              </span>
              <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
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
  export default {
    data () {
      return {
        search: "",
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        itemsPerPageArray: [4, 8, 12],

        isReserve: true,
        items: [],
      }
    },
    computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    }
  },
    methods: {
      cancel (item) {
        if (confirm("해당 예약을 취소하시겠습니까?")) {
          this.$http.delete(`/main/check/${this.$store.state.mno}/${item.Inoculation}/${item.Hno}/${item.Vno}`)
          .then(res =>{
            alert(res.data.message);
          })
          .catch(err => {
            alert(err);
          });
          this.$router.push("/main/reservation");
        }
      },
      nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
      },
      formerPage() {
        if (this.page - 1 >= 1) this.page -= 1;
      },
      updateItemsPerPage(number) {
        this.itemsPerPage = number;
      }
    },
    created() {
      this.$http.get(`/main/check/${this.$store.state.mno}`)
      .then(res => {
        if (res.data[0] == undefined) {
          this.isReserve = false;
        }
        else {
          this.isReserve = true;
          this.items = res.data;
        }
      })
      .catch(err => {
        alert(err);
      });
    }
  }
</script>
