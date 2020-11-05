<template>
  <div>
    <table width="1000px">
      <tr>
        <td colspan="7" align="center"><h4>{{this.year}}工作评价</h4></td>
      </tr>
      <tr>
        <td height="140px">项目</td>
        <td colspan="6" rowspan="2">
          <el-table style="width: 100%" border :data="tableData" :row-style="{height:'60px'}"
                    :cell-style="{padding:'0px'}" :header-row-style="{'height': '70px'}">
            <el-table-column
              align="center"
              prop="dname"
              label="员工部门">
            </el-table-column>
            <el-table-column
              align="center"
              prop="job"
              label="员工职务">
            </el-table-column>
            <el-table-column
              align="center"
              prop="ename"
              label="评价人">
            </el-table-column>
            <el-table-column
              align="center"
              label="评价分项">
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
        <td>工作评价</td>
      </tr>
      <tr>
        <td height="150px">评价(包括主要优点及缺陷)</td>
        <td colspan="6">{{appraise.content}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
        name: "AbilitiesScoreList",
      data() {
        return {
          tableHead: [],
          tableData: [],
          appraise:{content:""},
          type:this.$route.params.type,
          year:""
        }
      },
    watch:{
          "$route":'routerChange'
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
          axios.get("getAllEntity?eid="+this.$store.state.user.uname).then(res => {
            this.tableHead = res.data;
          })
        },
        showScores() {
          axios.get("getScoreAbilities/" + this.$store.state.student.sid+"/"+this.type).then(res => {
            this.tableData = res.data;
          })
        },
        getAppraise:function () {
          axios.get("getAppraise/"+this.$store.state.student.sid+"/"+this.type).then(res => {
            this.appraise = res.data;
          })
        },
        showYear:function () {
          if (this.type==0){
            this.year = "转正";
          } else if (this.type==1){
            this.year = "第一年";
          } else if (this.type==2){
            this.year = "第二年";
          }else if (this.type==3){
            this.year = "第三年";
          }
        },
        routerChange:function () {
          this.type=this.$route.params.type;
          this.getAllCourses();
          this.showScores();
          this.getAppraise();
          this.showYear();
        }
      },
      mounted() {//编译后去获取数据
        this.getAllCourses();
        this.showScores();
        this.getAppraise();
        this.showYear();
      }
    }
</script>

<style scoped>
  table,tr,td{
    border: 1px solid;
    border-collapse: collapse;
  }

</style>
