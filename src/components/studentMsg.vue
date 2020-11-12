<template>
  <div>
    <el-button  @click="returnStudentList" icon="el-icon-back" >返回上一级</el-button>
    <el-button icon="el-icon-document" @click="getPdf()">导出表格</el-button>
    <div id="pdfDom">
    <br><br><br>
    <table width="70%">
      <tr>
        <td colspan="7">
          <h2>金桥学员成长跟踪表</h2>
        </td>
      </tr>
      <tr>
        <td height="40px">姓名</td>
        <td>{{student.sname}}</td>
        <td>性别</td>
        <td>{{student.sex}}</td>
        <td>民族</td>
        <td>{{student.nation}}</td>
        <td rowspan="4" width="150px"><img :src="'http://localhost:8081/'+student.pic" style="width:2.5cm;height: 3.5cm"></td>
      </tr>
      <tr>
        <td height="40px">出生年月</td>
        <td>{{student.birthday}}</td>
        <td >籍贯</td>
        <td>{{student.address}}</td>
        <td >婚否</td>
        <td><span>{{student.marry ==0? "未婚":"已婚"}}</span></td>
      </tr>
      <tr>
        <td height="40px">联系电话</td>
        <td colspan="2">{{student.phone}}</td>
        <td>身份证号码</td>
        <td colspan="2">{{student.cardid}}</td>
      </tr>
      <tr>
        <td height="40px">毕业学校</td>
        <td colspan="2">{{student.school}}</td>
        <td>专业</td>
        <td colspan="2">{{student.major}}</td>
      </tr>
      <tr>
        <td height="40px">备注</td>
        <td colspan="6">{{student.info}}</td>
      </tr>
      <tr>
        <td colspan="7" align="center" height="40px">
          <h3>培训学校评价</h3>
        </td>
      </tr>
      <tr>
        <td colspan="7">
          <el-table :data="tableData" @cell-click="toggle">
            <el-table-column align="center" prop="tabName" label="培训学校">{{this.tabName}}</el-table-column>
            <el-table-column align="center" prop="tname" label="班期"></el-table-column>
            <el-table-column align="center" prop="ename" label="评价人"></el-table-column>
            <el-table-column align="center" label="成绩">
              <template v-for="(item,index) in tableHead">
                <el-table-column :prop="item.cid" :label="item.cname" align="center" :formatter="showJudge">{{item.cid}}
                  <template slot-scope="scope">
                    <el-input class="paperview-input-text" v-model="scope.row[scope.column.property]" @blur="scoreEdit([scope.column.label],scope.row[scope.column.property])"></el-input>
                  </template>
                </el-table-column>
              </template>
            </el-table-column>
            <el-table-column prop="sumscore" align="center" label="整体评价分数">
              <template slot-scope="scope">
                <el-input class="paperview-input-text" v-model="scope.row[scope.column.property]" @blur="sumscoreEdit([scope.column.label],scope.row[scope.column.property])"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </td>
      </tr>

      <tr>
        <td width="100px">
          评价(包括主要优点及缺陷)
        </td>
        <td colspan="6">
          <el-input
            type="textarea"
            :rows="4"
            v-model="appraise"
            @blur="addAppraise(-1,appraise)"/>
        </td>
      </tr>
    </table>
  </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import qs from 'qs'
  export default {
    name: "studentMsg",
    data(){
      return{
        oldSumScore:0,
        htmlTitle: 'StudentMsg',
        appraise:"未评价",
        tabName:"学习评价",
        student:{},
        tableHead:[],
        tableData:[],
        sid:0,
        eid:this.$store.state.user.uname,
        tid:0,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'

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

      returnStudentList:function(){
        this.$router.push("/StudentList")
      },
      scoreEdit(cname,score){
        if (score >= 0 && score <= 5) {
          axios.post("updateStudentScore02?cname="
            +cname+"&&score="+score+"&&sid="+this.sid+"&&eid="+this.eid).then(res => {
            if (res.data=="success"){
              this.$message.success("成功更新评分信息");
              this.tableRenderData();
              this.averageShow();
              this.scoreShow();

            } else{
              this.$message.error("更新评分失败");
            }
          })
        } else{
          this.$message.error("评分范围（0~5）");
        }

      },
      getAppraise:function(){
        axios.get('getAppraise/' + this.sid +'/-1'+ '/' + this.eid).then(res =>{
          this.appraise = res.data.content;
          if (res.data == null && res.data.content == ""){
            this.appraise = "未评价"
          }
        })
      },
      getAllCourse(){
        axios.get("getCoursesTerm?tid=" + this.tid).then(res => {
          this.tableHead = res.data;
          this.oldSumScore = res.data.sumscore;
        })
      },
      tableRenderData:function () {
        this.getAppraise();

        axios.get("getStudentScoresBySid?sid=" + this.sid + "&tid=" + this.tid).then(res => {
          this.tableData = res.data;
        });
      },
      sumscoreEdit:function(cname,score){
        if (score >= 0 && score <= 5) {
          axios.get("updateApp02?sid=" + this.student.sid + "&&type=-1" + "&&sumscore=" + score).then(res => {
            if (res.data == 1) {
              this.$message({
                message: '成功更新评分信息',
                type: 'success'
              });
            }else {
              this.$message.error("更新评分失败")
            }
          })
        } else{
          this.$message.error("评分范围（0~5）");
        }

      },
      addAppraise(type,appraise) {
        if (!appraise == "" && appraise.length <= 30) {
          axios.get("updateApp?sid=" + this.student.sid + "&&type=" + type + "&&content=" + appraise).then(res => {
            if (res.data == 1) {
              this.$message({
                message: '更新评价成功',
                type: 'success'
              });
            }else {
              this.$message.error("更新评价失败")
            }
          })
        } else if (!appraise == "" && appraise.length > 30) {
          this.$message.error("字数超出限制（30字）")
        } else {
          this.$message.error("评价不能为空")
        }
      }

    },
    mounted() {
      this.sid = this.$route.params.sid;
      this.tid = this.$route.params.tid;
      this.showInfo();
      this.getAppraise();
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
    font-size: 15px;
    border: solid 1px black;
    border-collapse: collapse;
    text-align: center;
  }
  .paperview-input-text >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 0px;
    width: 100%;
    text-align: center;
  }
</style>
