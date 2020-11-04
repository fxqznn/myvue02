<template>
  <div>
    <br>
    <br>
    <el-table style="width: 100%" border :data="tableData" >
      <el-table-column
        align="center"
        prop="tname"
        label="学期">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ename"
        label="工号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="eid"
        label="工号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ename"
        label="姓名">
        <template slot-scope="scope">
          <a href="">{{scope.row.ename}}</a>
        </template>

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
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "CourseScoreList",
    data() {
      return {
        CourseData: [],//从后台获取数据
        appraise:""
      }
    },
    methods: {
      getAllCourseScore: function () {//获取全部员工
        axios.get("http://localhost:8081/getCourses/"+this.$store.state.student.sid).then(res => {
          this.CourseData = res.data;
        })
      },
      getAverage: function (param) {
        const {columns, data} = param;
        const avgs = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            avgs[index] = '平均分';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            avgs[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev / avgs.length;
              }
            }, 0);
          } else {
            avgs[index] = 'N/A';
          }
        });
        return avgs;
      },
      getAppraise:function () {
        axios.get("http://localhost:8081/getAppraise/"+this.$store.state.student.sid+"/-1").then(res => {
          this.appraise = res.data.content;
        })
      }
    },
    mounted() {//编译后去获取数据
      this.getAllCourseScore();
    }
  }
</script>

<style scoped>

</style>
