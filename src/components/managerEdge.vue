<template>
  <el-table style="width: 100%" border :data="tableData">

    <el-table-column
    prop="ename"
    label="姓名">
    </el-table-column>
    <el-table-column
      label="评价">
      <template v-for="(item,index) in tableHead">
        <el-table-column :prop="item.cid" :label="item.cname" :key="index" v-if="item.column_name != 'id'"></el-table-column>
      </template>
    </el-table-column>
    <el-table-column
      prop="grade"
      label="整体评价">
    </el-table-column>

  </el-table>
</template>

<script>
  import axios from 'axios';
  export default {
    name:"EmpList",
    data(){
      return{
        tableHead:[],
        tableData: []
      }
    },
    methods:{
      getAllEntity:function () {
        axios.get("http://localhost:8081/getAllEntity?type="+0+"&&eid="+$store.state.uname).then(res=>{
          this.tableHead = res.data;
        })
      },
      getAllEmp:function () {
        axios.get("http://localhost:8081/getAllEmp").then(res=>{
          this.tableHead = res.data;
        })
      }
    },
    //生命周期钩子
    mounted() {
      //编译后去获取数据
      this.getAllEmp();
      this.getAllEntity();
    }
  }
</script>

<style scoped>

</style>
