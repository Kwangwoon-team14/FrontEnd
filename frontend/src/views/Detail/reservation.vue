<template>
  <div>
    <header style="font-size: 200%">예약하기</header>

    <div>
      <h3 style="padding: 20px 10px;"> 의료기관 찾기</h3>
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
              <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title class="subheading font-weight-bold">
                    {{ item.Name }}
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        주소
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.City + ' ' + item.Gu + ' ' + item.Dong }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        전화번호
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item["Phone"] }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        휴무요일
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item["Holiday"] }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        보유백신
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item["Remains"] }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        <v-select
                          v-model="item.Vacc"
                          :items="item.VaccList"
                          value
                          filled
                          label="백신 선택"
                        ></v-select>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-select
                          v-model="item.Date"
                          :items="item.DateList"
                          value
                          filled
                          label="예약일"
                        ></v-select>
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                        <v-select
                          v-model="item.Time"
                          :items="times"
                          value
                          filled
                          label="예약시간"
                        ></v-select>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-actions class="justify-center">
                      <v-btn color="primary" dark @click="onClickReservation(item)">
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
                  <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
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
        itemsPerPageArray: [4, 8, 12],
        page: 1,
        itemsPerPage: 4,
        sortDesc: false,
        sortBy: "name",
        search: "",
        items: [],
        day: ['일', '월', '화', '수', '목', '금', '토'],

        times: ["09:00", "10:00", "11:00", "12:00","13:00",
                "14:00", "15:00", "16:00", "17:00","18:00"]
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage);
      }
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1;
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1;
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number;
      },
      onClickReservation(item) {
        if (item.Vacc != '' && item.Date != '' && item.Time != '') {
          item.Mno = this.$store.state.mno
          this.$http.post(`/main/reservation`, item)
          .then(res => {
            // reservation success
            if (res.data.success == true) {
              alert(res.data.message)
              this.$router.push('/main/check');
            }
            //  reservation fail
            if (res.data.success == false) {
              alert(res.data.message)
            }
            })
          .catch(err => {
            alert(err);
          });
        }
        else  alert("예약정보를 모두 선택해주세요!");
      }
    },
    created() {
      // GET for hospital data (+ holiday, vaccine)
       this.$http.get(`/main/reservation/hospital`)
      .then(res => {
        // standard hospital data
        this.items = res.data[0];
        // hospital holiday, date, reservation date, time
        var row = 0;
        for (var i = 0; i < (this.items).length; i++)
        {
          this.items[i].HolidayList = [];
          this.items[i].Holiday = '';
          var count = 0;
          if (res.data[1][row] !== undefined) {
            while (this.items[i].Hno == res.data[1][row].Hno)
            {
              this.items[i].HolidayList[count++] = res.data[1][row].Day;
              this.items[i].Holiday += ('[' + res.data[1][row++].Day + ']');
              if (res.data[1][row] == undefined)
                break;
            }
          }
          const today = new Date();
          const year = today.getFullYear();
          const month = today.getMonth();
          const day = today.getDate();
          this.items[i].DateList = [];
          this.items[i].Date = '';
          this.items[i].Time = '';
          count = 0;
          for (var j = 1; j < 61; j++)
          {
            var temp = new Date(year, month, day + j);
            var k = 0;
            for (k = 0; k < this.items[i].HolidayList.length; k++)
            {
              if (this.items[i].HolidayList[k] == this.day[temp.getDay()])  
                break;
            }
            if (k == this.items[i].HolidayList.length)
              this.items[i].DateList[count++] = temp.getFullYear() + '-' + (temp.getMonth()+1) + '-' + temp.getDate();
          }
        }
        // hospital's vaccine 
        row = 0;
        for (i = 0; i < (this.items).length; i++)
        {
          this.items[i].VaccList = [];
          this.items[i].Remains = '';
          this.items[i].Vacc = '';
          count = 0;
          if (res.data[2][row] !== undefined) {
             while (this.items[i].Hno == res.data[2][row].Hno)
            {
              this.items[i].VaccList[count++] = res.data[2][row].Name;
              this.items[i].Remains += ('[' + res.data[2][row].Name + '(' + res.data[2][row++].Remains + ')'+ ']');
              if (res.data[2][row] == undefined)
                break;
            }
          }
        }
      })
      .catch(err => {
        alert(err);
      });
    }
  };
</script>
