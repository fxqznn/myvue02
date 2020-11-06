<template>
  <div>

    <table>

      <tr>
        <td colspan="7"><span style="font-size: 20px">金桥学员成长跟踪表</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-link @click="returnStudentList">返回学生列表页面</el-link></td>
      </tr>
      <tr >
        <td>姓名</td>
        <td>{{student.sname}}</td>
        <td>性别</td>
        <td>{{student.sex}}</td>
        <td>民族</td>
        <td >{{student.nation}}</td>
        <td rowspan="4" width="80px"><img :src=student.pic></td>
      </tr>
      <tr>
        <td >出生年月</td>
        <td>{{student.birthday}}</td>
        <td >籍贯</td>
        <td>{{student.address}}</td>
        <td >婚否</td>
        <td><span>{{student.marry ==0? "未婚":"已婚"}}</span></td>
      </tr>
      <tr>
        <td>联系电话</td>
        <td colspan="2">{{student.phone}}</td>
        <td>身份证号码</td>
        <td colspan="2">{{student.cardid}}</td>
      </tr>
      <tr>
        <td>毕业学校</td>
        <td colspan="2">{{student.school}}</td>
        <td>专业</td>
        <td colspan="2">{{student.major}}</td>
      </tr>
      <tr>
        <td>备注</td>
        <td colspan="6">{{student.info}}</td>
      </tr>
      <tr>
        <td colspan="7">
          <h3>培训学校评价</h3>

        </td>
      </tr>
      <tr>
        <td colspan="7">
          <el-table :data="tableData">
            <el-table-column align="center" prop="tabName" label="培训学校">{{this.tabName}}</el-table-column>
            <el-table-column align="center" prop="tname" label="班期"></el-table-column>
            <el-table-column align="center" prop="ename" label="评价人"></el-table-column>
            <el-table-column align="center" label="成绩">
              <template v-for="(item,index) in tableHead">
                <el-table-column :prop="item.cid" :label="item.cname" :formatter="scoreShow" align="center">
                </el-table-column>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sumscore" :formatter="averageShow" label="整体评价分数">
            </el-table-column>
          </el-table>
        </td>
      </tr>

      <tr>
        <td width="100px">
          评价(包括主要优点及缺陷)
        </td>
        <td colspan="6">
          <el-input type="textarea" :rows="5" v-model="appraise"></el-input>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    name: "studentMsg",
    data(){
      return{
        appraise:"学校评价",
        tabName:"学习评价",
        student:{},
        tableHead:[],
        tableData:[],
        sid:0,
        eid:this.$store.state.uid,
        tid:0
      }
    },
    methods:{
      showInfo(){
        axios.get("getSelf?sid="+this.sid).then(res => {
          this.student = res.data;
          this.tid = res.data.tid;
        })
      },
      scoreShow:function (row,column) {
        var data = row[column.property];
        if (data < 0){
          return "未评分"
        } else {
          return data;
        }
      },
      averageShow:function (row,column) {
        var data = row[column.property];
        if (data < 0){
          return "未评分"
        } else {
          return data;
        }
      },
      returnStudentList:function(){
        this.$router.push("/mainFrame/StudentList")
      },
      getAllCourse(){
        axios.get("getCoursesTerm?tid=" + this.tid).then(res => {
          this.tableHead = res.data;
        })
      },
      tableRenderData:function () {
        axios.get("getStudentScoresBySid?sid=" + this.sid + "&tid=" + this.tid).then(res => {
          this.tableData = res.data;
        });
      }
    },
    mounted() {
      this.sid = this.$route.params.sid;
      this.tid = this.$route.params.tid;
      this.showInfo();
      this.getAllCourse();
      this.tableRenderData();
    }
  }
</script>

<style scoped>
  table{
    border: solid 2px black;
    border-collapse: collapse;
  }
  tr,td{
    font-size: 13px;
    border: solid 1px black;
    border-collapse: collapse;
  }
</style>
