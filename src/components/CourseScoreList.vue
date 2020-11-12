<template>
  <div >
    <table style="width: 100%;height: 100%">
      <tr>
        <td colspan="7" align="center"><h4>培训学校评价</h4></td>
      </tr>
      <tr>
        <td height="140px" width="200px">培训学校</td>
        <td colspan="6" rowspan="2">
    <el-table style="width: 100%" border :data="tableData" :row-style="{height:'60px'}"
              :cell-style="{padding:'0px'}" :header-row-style="{'height': '70px'}">
      <el-table-column
        align="center"
        prop="tname"
        label="学期">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ename"
        label="评价人">
      </el-table-column>
      <el-table-column
        align="center"
        label="培训期间测试成绩">
        <template v-for="(item,index) in tableHead">
          <el-table-column :prop="item.cid" :label="item.cname" align="center" :formatter="showJudge">
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="avg"
        label="整体评价分数(平均分)">
        <template slot-scope="scope">
          {{scope.row.avg || "尚未评分"}}
        </template>
      </el-table-column>
    </el-table>
        </td>
      </tr>
      <tr>
        <td>学习评价</td>
      </tr>
      <tr>
        <td height="100px">整体评价</td>
        <td colspan="6">{{appraise}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "CourseScoreList",
    data() {
      return {
        tableHead: [],
        tableData: [],
        appraise:""
      }
    },
    methods: {
      showJudge(row,column){
        const score = row[column.property];
        if (score == undefined){
          return "未评分";
        }else{
          return score;
        }
      },
      getAllCourses: function () {//获取全部员工
        axios.get("getStudentCourses/"+this.$store.state.student.sid).then(res => {
          this.tableHead = res.data;
        })
      },
      showScores() {
        axios.get("getScoreCourses/" + this.$store.state.student.sid).then(res => {
          this.tableData = res.data;
        })
      },
      getContent:function () {
        debugger
        axios.get("getContent/"+this.$store.state.student.sid+"/-1").then(res => {
          this.appraise=res.data;
        })
      }
    },
    mounted() {//编译后去获取数据
      this.getAllCourses();
      this.showScores();
      this.getContent();
    }
  }
</script>

<style scoped>
  table,tr,td{
    border: 1px solid;
    border-collapse: collapse;
  }
</style>
