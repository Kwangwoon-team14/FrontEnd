<template>
  <div id="app">
    <GChart
      type="ColumnChart"
      :options="options"
      :data="region_items"
    />    
  </div>
</template>
 
<script>
import { GChart } from "vue-google-charts";
export default {
  name: "App",
  components: {
    GChart
  },
  data() {
    return {
      region_items: [],
      color_tables: ["navy", "green", "black", "blue", "purple", "hotpink", "red", "yellow"],
      options: {
      }
    };
  },
  created() {
    this.$http.get(`/main/home/region`)
    .then(res=>{
      // 지역별 접종 현황
      this.region_items = new Array(res.data[1].length+1);
      this.region_items[0] = ["지역", "접종&예약자수", { role: 'style' }];
      for (var i = 0; i < (res.data[1]).length; i++)
      {
        this.region_items[i+1] = [res.data[1][i].City.substring(0, 2), res.data[1][i].people, this.color_tables[i%8]];
      }
    })
    .catch(err => {
      alert(err);
    });
  }
};
</script>