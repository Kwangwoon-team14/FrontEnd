<template>
  <div id="app">
    <GChart
      type="LineChart"
      :options="options"
      :data="month_items"
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
      month_items: [
      ],
      options: {
      }
    };
  },
  created() {
    this.$http.get(`/main/home/month`)
    .then(res=>{
      // 월별 접종 추이
      this.month_items = new Array(res.data.length+1);
      this.month_items[0] = ["Month", "접종&예약자수"];
      for (var i = 0; i < (res.data).length; i++)
      {
        var temp = res.data[i].month.split('-');
        this.month_items[i+1] = [temp[0].substring(2) + '/'+ temp[1], res.data[i].count];
      }
    })
    .catch(err => {
      alert(err);
    });
  }
};
</script>