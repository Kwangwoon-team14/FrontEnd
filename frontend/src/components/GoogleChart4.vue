<template>
  <div>
    <GChart
      type="PieChart"
      :options="options"
      :data="age_items"
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
      age_items: [],
      options: {
      }
    };
  },
  created() {
    this.$http.get(`/main/home/age`)
    .then(res=>{
      // 나이별 접종 현황
      this.age_items = new Array(res.data[1].length+1)
      this.age_items[0] = ["나이대", "접종&예약자 비율"];
      for (var i = 0; i < (res.data[1]).length; i++)
      {
        this.age_items[i+1] = [res.data[1][i].front_age, res.data[1][i].people];
      }
    })
    .catch(err => {
      alert(err);
    });
  }
  
};
</script>