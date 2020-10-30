<template>
  <el-table style="width: 100%" border :data="tableData">
    <el-table-column
      prop="cname"
      label="评分项">
    </el-table-column>
    <el-table-column
      prop="score"
      label="成绩">
    </el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "empScoreList",
        data(){
            return{
              tableData:[]
            }
      }, methods:{
        getScores:function () {
          axios.get("http://localhost:8081/selectScores?type="+0+"&&eid="+100000).then(res=>{
            this.tableData = res.data;
          })
        }
      },
      //生命周期钩子
      mounted() {
        //编译后去获取数据
        this.getScores();

      }
    }
</script>

<style scoped>

</style>
