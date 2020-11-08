<template>
  <div>

    <table>

      <tr>
        <td colspan="7">
          <el-row>
            <el-col :span="8" :offset="5">
              <h2>金桥学员成长跟踪表</h2>
            </el-col>
            <el-col :span="6" :offset="4">
              <el-link @click="returnStudentList">返回学生列表页面</el-link>
            </el-col>
          </el-row>
        </td>
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

          <el-row>
            <el-col :span="5" :offset="7">
              <h3>培训学校评价</h3>
            </el-col>
            <el-col :span="4" :offset="4">
              <el-button type="success" size="mini" @click="dialogFormVisible = true">编辑</el-button>
            </el-col>
          </el-row>
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
          <el-input type="textarea" :rows="3" v-model="appraise" placeholder="请输入评价信息"></el-input>
        </td>
      </tr>
    </table>
    <el-dialog title="录入学生成绩" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row>
          <el-col :span="4">
            <h3>学生编号：{{student.sid}}</h3>
          </el-col>
          <el-col :span="4">
            <h3>学生姓名：{{student.sname}}</h3>
          </el-col>
        </el-row>
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    name: "studentMsg",
    data(){
      return{
        appraise:"",
        tabName:"学习评价",
        student:{},
        tableHead:[],
        tableData:[],
        sid:0,
        eid:this.$store.state.uid,
        tid:0,
        appData:{sid:this.sid,conent:this.appraise,type:-1},
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
      editStudentScore(){

      },
      getAppraise:function(){
        axios.get('getAppraise/' + this.sid +'/-1').then(res =>{
          this.appraise = res.data;
        })
      },
      updateAppraise:function(){
        axios.post('updateApp',qs.stringify(this.appData)).then(res => {
          if(res.data > 0){
            this.$message({
              message:'添加成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        })
      },
      getAllCourse(){
        axios.get("getCoursesTerm?tid=" + this.tid).then(res => {
          this.tableHead = res.data;
        })
      },
      tableRenderData:function () {
        this.getAppraise();
        axios.get("getStudentScoresBySid?sid=" + this.sid + "&tid=" + this.tid).then(res => {
          this.tableData = res.data;
        });
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
    font-size: 13px;
    border: solid 1px black;
    border-collapse: collapse;
  }
</style>
