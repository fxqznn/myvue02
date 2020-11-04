<template>
  <div>
    <el-table
      :data="CourseData"
      border
      :summary-method="getAverage"
      show-summary
      style="width: 100%">
      <el-table-column
        prop="cname"
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ename"
        label="评分人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tname"
        label="学期"
        width="180">
      </el-table-column>
    </el-table>
    <span>主要优缺点：</span>
    <label>
      <textarea v-model="appraise"></textarea>
    </label>
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
