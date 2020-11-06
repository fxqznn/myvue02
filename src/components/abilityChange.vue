<template>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="cname"
        label="评价项">
      </el-table-column>
      <el-table-column
        prop="isdel"
        label="状态">
      </el-table-column>
    </el-table>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "abilityChange",
      data(){
          return{
            tableData:[]
          }
      },
      methods:{
          getTable(){
            axios.get("http://localhost:8081/showAllEntity").then(res=>{
              this.tableData=res.data;
            })
          }
      },
      mounted() {
          this.getTable();
      }
    }
</script>

<style scoped>

</style>
