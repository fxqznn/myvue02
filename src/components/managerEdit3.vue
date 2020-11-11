<template>

    <div>

      <el-button  @click="goback" icon="el-icon-back" >返回上一级</el-button>
      <el-button icon="el-icon-document" @click="getPdf()">导出表格</el-button>

      <br><br>
      <div id="pdfDom">
        <el-row >
          <el-col  :offset="2"> <div  >
            <table width="80%" id="scoreList">
              <tr>
                <td colspan="10"> <h2>金桥学员成长跟踪表</h2></td>
              </tr>
              <tr >
                <td >姓名</td>
                <td width="70px">{{student.sname}}</td>
                <td width="70px">性别</td>
                <td width="70px">{{student.sex}}</td>
                <td colspan="2" >民族</td>
                <td colspan="2" >{{student.nation}}</td>
                <td rowspan="4" colspan="2"><img :src="'http://localhost:8081/'+student.pic" style="width: 2.5cm;height: 3.5cm"></td>
              </tr>
              <tr>
                <td >出生年月</td>
                <td>{{student.birthday}}</td>
                <td >籍贯</td>
                <td >{{student.address}}</td>
                <td colspan="2">婚否</td>
                <td colspan="2"><span>{{student.marry ==0? "未婚":"已婚"}}</span></td>
              </tr>
              <tr>
                <td >联系电话</td>
                <td colspan="2">{{student.phone}}</td>
                <td>身份证号码</td>
                <td colspan="4">{{student.cardid}}</td>
              </tr>
              <tr>
                <td >毕业学校</td>
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
                <td height="40px">项目</td>
                <td >员工部门</td>
                <td  >员工职务</td>
                <td >评价人</td>
                <td colspan="6" rowspan="2">
                  <el-table :data="table0Data">
                    <el-table-column
                      align="center"
                      label="评价">
                      <template v-for="(item,index) in tableHead">
                        <el-table-column :prop="item.cid" :label="item.cname" align="center" :formatter="showJudge">
                          <template slot-scope="scope">
                            <el-input class="paperview-input-text"
                                      readonly
                                      @input="inputChange(scope.row[scope.column.property])"
                                      v-model="scope.row[scope.column.property]" ></el-input>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="sumscore"
                      label="整体评价分数(平均分)">
                      <template slot-scope="scope">
                        {{scope.row.sumscore || "尚未评分"}}
                      </template>
                    </el-table-column>
                  </el-table>
                </td>

              </tr>

              <tr>
                <td height="40px">工作评价</td>
                <td>{{emp.dname}}</td>
                <td>{{emp.job}}</td>
                <td>{{ename1}}</td>

              </tr>
              <tr>
                <td width="60px" >评价(包括主要优点及缺陷)</td>
                <td colspan="9">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="textarea0"
                    readonly>
                  </el-input>
                </td>
              </tr>

              <tr>
                <td colspan="10" height="40px">
                  <h3>第一年工作评价</h3>
                </td>
              </tr>
              <tr>
                <td height="40px">项目</td>
                <td >员工部门</td>
                <td  >员工职务</td>
                <td >评价人</td>
                <td colspan="6" rowspan="2">
                  <el-table :data="table1Data">
                    <el-table-column
                      align="center"
                      label="评价">
                      <template v-for="(item,index) in tableHead">
                        <el-table-column :prop="item.cid" :label="item.cname" align="center" :formatter="showJudge">
                          <template slot-scope="scope">
                            <el-input
                              class="paperview-input-text" v-model="scope.row[scope.column.property]" readonly></el-input>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="sumscore"
                      label="整体评价分数(平均分)">
                      <template slot-scope="scope">
                        {{scope.row.sumscore || "尚未评分"}}
                      </template>
                    </el-table-column>
                  </el-table>
                </td>

              </tr>

              <tr>
                <td height="40px">工作评价</td>
                <td>{{emp.dname}}</td>
                <td>{{emp.job}}</td>
                <td>{{ename1}}</td>

              </tr>
              <tr>
                <td width="60px" >评价(包括主要优点及缺陷)</td>
                <td colspan="9">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="textarea1"
                    readonly
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
                <td height="40px">项目</td>
                <td >员工部门</td>
                <td  >员工职务</td>
                <td >评价人</td>
                <td colspan="6" rowspan="2">
                  <el-table :data="table2Data">
                    <el-table-column
                      align="center"
                      label="评价">
                      <template v-for="(item,index) in tableHead">
                        <el-table-column :prop="item.cid" :label="item.cname" align="center" :formatter="showJudge">
                          <template slot-scope="scope">
                            <el-input class="paperview-input-text"
                                      v-model="scope.row[scope.column.property]" readonly></el-input>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="sumscore"
                      label="整体评价分数(平均分)">
                      <template slot-scope="scope">
                        {{scope.row.sumscore || "尚未评分"}}
                      </template>
                    </el-table-column>
                  </el-table>
                </td>

              </tr>

              <tr>
                <td height="40px">工作评价</td>
                <td>{{emp.dname}}</td>
                <td>{{emp.job}}</td>
                <td>{{ename1}}</td>

              </tr>
              <tr>
                <td width="60px" >评价(包括主要优点及缺陷)</td>
                <td colspan="9">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="textarea2"
                    readonly
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
                <td height="40px">项目</td>
                <td >员工部门</td>
                <td  >员工职务</td>
                <td >评价人</td>
                <td colspan="6" rowspan="2">
                  <el-table :data="table3Data" >
                    <el-table-column
                      align="center"
                      label="评价">
                      <template v-for="(item,index) in tableHead">
                        <el-table-column  :prop="item.cid" :label="item.cname" align="center" :formatter="showJudge">
                          <template slot-scope="scope">
                            <el-input class="paperview-input-text"
                                      v-model="scope.row[scope.column.property]" @blur="scoreEdit3([scope.column.label],scope.row[scope.column.property])" ></el-input>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="sumscore"
                      label="整体评价分数(平均分)">
                      <template slot-scope="scope">
                        <el-input class="paperview-input-text"
                                  @input="inputChange(scope.row.sumscore)"
                                  v-model="scope.row.sumscore"
                                  @blur="editSum3(scope.row.sumscore)"
                        ></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </td>
              </tr>
              <tr>
                <td height="40px">工作评价</td>
                <td>{{emp.dname}}</td>
                <td>{{emp.job}}</td>
                <td>{{ename1}}</td>
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
          </div></el-col>
        </el-row>
      </div>



    </div>

</template>

<script>

  import axios from 'axios';
    export default {
        name: "managerEdit",
      data(){
          return{
            name:0,
            type:0,
            tableHead:[],
            table0Data:[],
            table1Data:[],
            table2Data:[],
            table3Data:[],
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
            htmlTitle: '员工评价表',
            ename1:"",
            textarea0:"",
            textarea1:"",
            textarea2:"",
            textarea3:"",
          }
      },
      methods:{
        inputChange(num){
          num = num.replace(/[^\d.]/g,'');
        },
        getName: function () {
          this.name = this.$store.state.user.uname;
        },

          showInfo(){
            axios.get("http://localhost:8081/getStudent?eid="+this.eid).then(res=>{
              this.student =res.data;
            })
          },
          getAllAbility() {
            axios.get("http://localhost:8081/getAllEntity?eid=" + this.name ).then(res => {
              this.tableHead = res.data;
            })
          },
        getAllScores0(){
          axios.get("http://localhost:8081/getOneAbilityScore?eid="+this.eid+"&&type=0").then(res => {
            this.table0Data = res.data;

          })
        },
        getAllScores1(){
          axios.get("http://localhost:8081/getOneAbilityScore?eid="+this.eid+"&&type=1").then(res => {
            this.table1Data = res.data;
          })
        },
        getAllScores2(){
          axios.get("http://localhost:8081/getOneAbilityScore?eid="+this.eid+"&&type=2").then(res => {
            this.table2Data = res.data;

          })
        },
          getAllScores3(){
            axios.get("http://localhost:8081/getOneAbilityScore?eid="+this.eid+"&&type=3").then(res => {
              this.table3Data = res.data;

            })
          },
        editSum3(sumscore){
          if (sumscore<0||sumscore>100){
            this.$message.error("评分：100分制");
          } else{
            axios.get("http://localhost:8081/updateApp02?sumscore="+sumscore+"&&sid="+this.student.sid+"&&type="+3).then(res => {
              if (res.data==1){
                this.$message.success("成功更新总评分信息");
              }else{
                this.$message.error("更新评分失败");
              }

            })
          }
        },

        scoreEdit3(cname,score){
          if(score<0||score>100){
            this.$message.error("评分：100分制");
          }else {
            axios.get("http://localhost:8081/updateEmpScore?cname="
              + cname + "&&score=" + score + "&&eid=" + this.eid + "&&type=" + 3).then(res => {
              if (res.data == "success") {
                this.$message.success("成功更新评分信息");
                axios.get("http://localhost:8081/getOneAbilityScore?eid=" + this.eid + "&&type=3").then(res => {
                  this.table1Data = res.data;
                })
              } else {
                this.$message.error("更新评分失败");
              }
            })
          }
        },
          getEmp(){
            axios.get("http://localhost:8081/getManager?eid="+this.eid).then(res=>{
              this.emp = res.data;
            })
          },


          goback(){
              this.$router.go(-1);
          },
          addAppraise(type,textarea){

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


          },
          getApp0(){
            axios.get("http://localhost:8081/getApp?eid="+this.eid+"&&type="+0).then(res=>{
              this.textarea0=res.data;

            })
          },
          getApp1(){
            axios.get("http://localhost:8081/getApp?eid="+this.eid+"&&type="+1).then(res=>{
              this.textarea1=res.data;

            })
          },
          getApp2(){
            axios.get("http://localhost:8081/getApp?eid="+this.eid+"&&type="+2).then(res=>{
              this.textarea2=res.data;

            })
          },
          getApp3(){
            axios.get("http://localhost:8081/getApp?eid="+this.eid+"&&type="+3).then(res=>{
              this.textarea3=res.data;

            })
          },
      },
      mounted(){
        this.eid = this.$route.params.eid;
        this.ename1 = this.$route.params.ename;
        this.getName();
        this.showInfo();
        this.getApp0();
        this.getApp1();
        this.getApp2();
        this.getApp3();
        this.getEmp();

        this.getAllAbility();
        this.getAllScores0();
        this.getAllScores1();
        this.getAllScores2();
        this.getAllScores3();
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
  .paperview-input-text >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 0;
    width: 100%;
    text-align: center;
  }

</style>
