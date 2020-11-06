<template>

    <div>

      <el-button  @click="goback" icon="el-icon-back" >返回上一级</el-button>
      <el-button icon="el-icon-document" @click="getPdf()">导出表格</el-button>

      <br><br>
      <div id="pdfDom">
        <table width="80%" id="scoreList">
          <tr>
            <td colspan="10"> <h2>金桥学员成长跟踪表</h2></td>
          </tr>
          <tr >
            <td height="40px" >姓名</td>
            <td >{{student.sname}}</td>
            <td>性别</td>
            <td>{{student.sex}}</td>
            <td colspan="2">民族</td>
            <td colspan="2">{{student.nation}}</td>
            <td rowspan="4" colspan="2"><img :src=student.pic></td>
          </tr>
          <tr>
            <td height="40px">出生年月</td>
            <td>{{student.birthday}}</td>
            <td >籍贯</td>
            <td >{{student.address}}</td>
            <td colspan="2">婚否</td>
            <td colspan="2"><span>{{student.marry ==0? "未婚":"已婚"}}</span></td>
          </tr>
          <tr>
            <td height="40px">联系电话</td>
            <td colspan="2">{{student.phone}}</td>
            <td>身份证号码</td>
            <td colspan="4">{{student.cardid}}</td>
          </tr>
          <tr>
            <td height="40px">毕业学校</td>
            <td colspan="2">{{student.school}}</td>
            <td>专业</td>
            <td colspan="4" >{{student.major}}</td>
          </tr>
          <tr>
            <td height="40px">备注</td>
            <td colspan="9">{{student.info}}</td>
          </tr>
          <tr>
            <td colspan="10" height="40px">
              <h3>转正工作评价</h3>
            </td>
          </tr>
          <tr>
            <td height="55px" rowspan="2">项目</td>
            <td rowspan="2">员工部门</td>
            <td rowspan="2" width="60px">员工职务</td>
            <td rowspan="2">评价人</td>
            <td colspan="5" height="20">评价分项</td>
            <td width="20" rowspan="2">整体评价分数</td>
          </tr>
          <tr>

            <td width="60">能力</td>
            <td width="60">交流</td>
            <td width="60">积极性</td>
            <td width="60">性格</td>
            <td width="60">人品</td>

          </tr>
          <tr>
            <td height="40px">工作评价</td>
            <td>{{emp.dname}}</td>
            <td>{{emp.job}}</td>
            <td>{{ename1}}</td>
            <td>
              <el-input v-model="score0.s1"></el-input>
            </td>
            <td>
              <el-input v-model="score0.s2"></el-input>
            </td>
            <td>
              <el-input v-model="score0.s3"></el-input>
            </td>
            <td>
              <el-input v-model="score0.s4"></el-input>
            </td>
            <td>
              <el-input v-model="score0.s5"></el-input>
            </td>
            <td>
              <el-input v-model="avg0" ></el-input>
            </td>
          </tr>
          <tr>
            <td width="60px" >评价(包括主要优点及缺陷)</td>
            <td colspan="9">
              <el-input
                type="textarea"
                :rows="4"
                v-model="textarea0"
                @blur="addAppraise(0,textarea0)">
              </el-input>
            </td>
          </tr>

          <tr>
            <td colspan="10" height="40px">
              <h3>第一年工作评价</h3>
            </td>
          </tr>
          <tr>
            <td height="55px" rowspan="2">项目</td>
            <td rowspan="2">员工部门</td>
            <td rowspan="2" width="60px">员工职务</td>
            <td rowspan="2">评价人</td>
            <td colspan="5" height="20">评价分项</td>
            <td width="120" rowspan="2">整体评价分数</td>
          </tr>
          <tr>

            <td width="60">能力</td>
            <td width="60">交流</td>
            <td width="60">积极性</td>
            <td width="60">性格</td>
            <td width="60">人品</td>

          </tr>
          <tr>
            <td height="40px">工作评价</td>
            <td>{{emp.dname}}</td>
            <td>{{emp.job}}</td>
            <td>{{ename1}}</td>
            <td>
              <el-input v-model="score1.s1"></el-input>
            </td>
            <td>
              <el-input v-model="score1.s2"></el-input>
            </td>
            <td>
              <el-input v-model="score1.s3"></el-input>
            </td>
            <td>
              <el-input v-model="score1.s4"></el-input>
            </td>
            <td>
              <el-input v-model="score1.s5"></el-input>
            </td>
            <td>
              <el-input v-model="avg1" ></el-input>
            </td>
          </tr>
          <tr>
            <td width="60px" >评价(包括主要优点及缺陷)</td>
            <td colspan="9">
              <el-input
                type="textarea"
                :rows="4"
                v-model="textarea1"
                @blur="addAppraise(1,textarea1)"
              >
              </el-input>
            </td>
          </tr>

          <tr>
            <td colspan="10" height="40px">
              <h3>第二年工作评价</h3>
            </td>
          </tr>
          <tr>
            <td height="55px" rowspan="2">项目</td>
            <td rowspan="2">员工部门</td>
            <td rowspan="2" width="60px">员工职务</td>
            <td rowspan="2">评价人</td>
            <td colspan="5" height="20">评价分项</td>
            <td width="120" rowspan="2">整体评价分数</td>
          </tr>
          <tr>

            <td width="60">能力</td>
            <td width="60">交流</td>
            <td width="60">积极性</td>
            <td width="60">性格</td>
            <td width="60">人品</td>

          </tr>
          <tr>
            <td height="40px">工作评价</td>
            <td>{{emp.dname}}</td>
            <td>{{emp.job}}</td>
            <td>{{ename1}}</td>
            <td>
              <el-input v-model="score2.s1"></el-input>
            </td>
            <td>
              <el-input v-model="score2.s2"></el-input>
            </td>
            <td>
              <el-input v-model="score2.s3"></el-input>
            </td>
            <td>
              <el-input v-model="score2.s4"></el-input>
            </td>
            <td>
              <el-input v-model="score2.s5"></el-input>
            </td>
            <td>
              <el-input v-model="avg2" ></el-input>
            </td>
          </tr>
          <tr>
            <td width="60px" >评价(包括主要优点及缺陷)</td>
            <td colspan="9">
              <el-input
                type="textarea"
                :rows="4"
                v-model="textarea2"
                @blur="addAppraise(2,textarea2)"
              >
              </el-input>
            </td>
          </tr>

          <tr>
            <td colspan="10" height="40px">
              <h3>第三年工作评价</h3>
            </td>
          </tr>
          <tr>
            <td height="55px" rowspan="2">项目</td>
            <td rowspan="2">员工部门</td>
            <td rowspan="2" width="60px">员工职务</td>
            <td rowspan="2">评价人</td>
            <td colspan="5" height="20">评价分项</td>
            <td width="120" rowspan="2">整体评价分数</td>
          </tr>
          <tr>

            <td width="60">能力</td>
            <td width="60">交流</td>
            <td width="60">积极性</td>
            <td width="60">性格</td>
            <td width="60">人品</td>

          </tr>
          <tr>
            <td height="40px">工作评价</td>
            <td>{{emp.dname}}</td>
            <td>{{emp.job}}</td>
            <td>{{ename1}}</td>
            <td>
              <el-input v-model="score3.s1"></el-input>
            </td>
            <td>
              <el-input v-model="score3.s2"></el-input>
            </td>
            <td>
              <el-input v-model="score3.s3"></el-input>
            </td>
            <td>
              <el-input v-model="score3.s4"></el-input>
            </td>
            <td>
              <el-input v-model="score3.s5"></el-input>
            </td>
            <td>
              <el-input v-model="avg3" ></el-input>
            </td>
          </tr>
          <tr>
            <td width="60px" >评价(包括主要优点及缺陷)</td>
            <td colspan="9">
              <el-input
                type="textarea"
                :rows="4"
                v-model="textarea3"
                @blur="addAppraise(3,textarea3)"
              >
              </el-input>
            </td>
          </tr>
        </table>
      </div>

    </div>



</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import axios from 'axios';
    export default {
        name: "managerEdit",
      data(){
          return{
            type:0,
            table1Data:[],
            student:{
              sid:0,
              sname:"",
              sex:"",
              birthday:"",
              nation:"",
              address:"",
              marry:0,
              phone:0,
              cardid:0,
              school:"",
              major:'',
              pic:"",
              info:"",
            },
            emp:{
              ename:"",
              dname:"",
              job:"",
            },
            avg0:0,
            avg1:0,
            avg2:0,
            avg3:0,
            score0:{
              s1:0,
              s2:0,
              s3:0,
              s4:0,
              s5:0
            },
            score1:{
              s1:0,
              s2:0,
              s3:0,
              s4:0,
              s5:0
            },
            score2:{
              s1:0,
              s2:0,
              s3:0,
              s4:0,
              s5:0
            },
            score3:{
              s1:0,
              s2:0,
              s3:0,
              s4:0,
              s5:0
            },
            htmlTitle: '员工评价表',
            ename1:"",
            textarea0:"",
            textarea1:"",
            textarea2:"",
            textarea3:"",
          }
      },
      methods:{
        exportToExcel () {
          let et = XLSX.utils.table_to_book(document.getElementById('scoreList')); //此处传入table的DOM节点
          let etout = XLSX.write(et, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'array'
          });
          try {
            FileSaver.saveAs(new Blob([etout], {
              type: 'application/octet-stream'
            }), 'trade-publish.xlsx');   //trade-publish.xlsx 为导出的文件名
          } catch (e) {
            console.log(e, etout) ;
          }
          return etout;
        },
          showInfo(){
            axios.get("http://localhost:8081/getStudent?eid="+this.eid).then(res=>{
              this.student =res.data;
            })
          },
          getEmp(){
            axios.get("http://localhost:8081/getManager?eid="+this.eid).then(res=>{
              this.emp = res.data;
            })
          },
          getAvg(){
              this.avg0=(this.score0.s1+this.score0.s2+this.score0.s3+this.score0.s4+this.score0.s5)/5;
          },
          goback(){
              this.$router.go(-1);
          },
          addAppraise(type,textarea){
            if(!textarea==""){
              axios.get("http://localhost:8081/updateApp?sid="+this.student.sid+"&&type="+type+"&&content="+textarea).then(res=>{
                if (res.data==1){
                  this.$message({
                    message: '更新评价成功',
                    type: 'success'
                  });
                }else{
                  this.$message.error("更新失败")
                }
              })
            }

          },
          getApp0(){
            axios.get("http://localhost:8081/getApp?eid="+this.eid+"&&type="+0).then(res=>{
              this.textarea0=res.data;
              if (this.textarea0==""){
                axios.get("http://localhost:8081/addApp?eid="+this.eid+"&&type="+0).then(res=>{

                })
              }
            })
          },
          getApp1(){
            axios.get("http://localhost:8081/getApp?eid="+this.eid+"&&type="+1).then(res=>{
              this.textarea1=res.data;
              if (this.textarea1==""){
                axios.get("http://localhost:8081/addApp?eid="+this.eid+"&&type="+1).then(res=>{

                })
              }
            })
          },
          getApp2(){
            axios.get("http://localhost:8081/getApp?eid="+this.eid+"&&type="+2).then(res=>{
              this.textarea2=res.data;
              if (this.textarea2==""){
                axios.get("http://localhost:8081/addApp?eid="+this.eid+"&&type="+2).then(res=>{

                })
              }
            })
          },
          getApp3(){
            axios.get("http://localhost:8081/getApp?eid="+this.eid+"&&type="+3).then(res=>{
              this.textarea3=res.data;
              if (this.textarea3==""){
                axios.get("http://localhost:8081/addApp?eid="+this.eid+"&&type="+3).then(res=>{

                })
              }
            })
          },
      },
      beforeMount() {

      },
      mounted(){
        this.eid = this.$route.params.eid;
        this.ename1 = this.$route.params.ename;
        this.showInfo();
        this.getApp0();
        this.getApp1();
        this.getApp2();
        this.getApp3();
        this.getEmp();
        this.getAvg();
      },
      updated() {

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
    text-align: center;
  }

</style>
