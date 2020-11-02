<template>
    <div>

      <el-input v-model="ename"  placeholder="输入姓名查找" @change="showScores"></el-input>

      <el-select v-model="value" placeholder="请选择" @change="showScores">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          v-model="item.value">
        </el-option>
      </el-select>

      <br><br>
      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
      <span>部门：dname  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  &nbsp; &nbsp;&nbsp;&nbsp;       评价人：ename （eid）</span>
      <br><br>
      <el-table style="width: 100%" border :data="tableData" >
        <el-table-column
          align="center"
          prop="eid"
          label="工号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="ename"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="job"
          label="职位">
        </el-table-column>
        <el-table-column
          align="center"
          label="成绩">
          <template v-for="(item,index) in tableHead">
            <el-table-column :prop="item.cid" :label="item.cname" align="center">
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="grade"
          label="整体评价分数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="title"
          label="综合评价(优缺点)">
        </el-table-column>
      </el-table>
    </div>



</template>

<script>
  import axios from 'axios';
  export default {
    name:"EmpList",
    data(){
      return{
        options: [{
          value: '0',
          label: '转正评价'
        }, {
          value: '1',
          label: '第一年评价'
        }, {
          value: '2',
          label: '第二年评价'
        }, {
          value: '3',
          label: '第三年评价'
        }],
        value:"0",
        ename:"",
        tableHead:[],
        tableData:[]
      }
    },
    methods:{
      getAllScores(){
        axios.get("http://localhost:8081/getAllEntity?eid="+100001+"&&type="+0).then(res => {
            this.tableHead=res.data;
        })
      },
      showScores(){
        axios.get("http://localhost:8081/showAbilityScore?eid="+100001+"&&type="+this.value+"&&ename="+this.ename).then(res => {
          this.tableData=res.data;
        })
      },
      resel(type){

      }
    },
    //生命周期钩子
    mounted() {
      //编译后去获取数据
      this.getAllScores();
      this.showScores();
    }
  }
</script>

<style scoped>

</style>
