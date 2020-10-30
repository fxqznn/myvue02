<template>

    <el-table style="width: 100%" border :data="tableData">
      <el-table-column
        prop="ename"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="dname"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="job"
        label="职位">
      </el-table-column>
      <el-table-column
       label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">详情</el-button>
          <el-button @click="toScore()" type="text" size="small">评价</el-button>
        </template>
      </el-table-column>
    </el-table>


</template>

<script>
  import axios from 'axios';
  export default {
    name:"EmpList",
    data(){
      return{
        tableData: []
      }
    },
    methods:{
      getAllEmp:function () {
        axios.get("http://localhost:8081/selectAllEmp1?eid="+100001).then(res=>{
          this.tableData = res.data;
        })
      },
      toScore(eid){
        return this.$router.push({path: "/empScoreList"})
      }
    },
    //生命周期钩子
    mounted() {
      //编译后去获取数据
      this.getAllEmp();

    }
  }
</script>

<style scoped>

</style>
