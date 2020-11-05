<template>

    <div>
      <div>

      </div>
      <table width="80%">
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
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1" ></el-input>
          </td>
        </tr>
        <tr>
          <td width="60px" >评价(包括主要优点及缺陷)</td>
          <td colspan="9">
            <el-input
              type="textarea"
              :rows="4"
              v-model="textarea"
              @blur="addAppraise(0)">
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
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1" ></el-input>
          </td>
        </tr>
        <tr>
          <td width="60px" >评价(包括主要优点及缺陷)</td>
          <td colspan="9">
            <el-input
              type="textarea"
              :rows="4"
              v-model="textarea"
              @blur="addAppraise(1)"
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
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1" ></el-input>
          </td>
        </tr>
        <tr>
          <td width="60px" >评价(包括主要优点及缺陷)</td>
          <td colspan="9">
            <el-input
              type="textarea"
              :rows="4"
              v-model="textarea"
              @blur="addAppraise(2)"
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
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1"></el-input>
          </td>
          <td>
            <el-input v-model="score1" ></el-input>
          </td>
        </tr>
        <tr>
          <td width="60px" >评价(包括主要优点及缺陷)</td>
          <td colspan="9">
            <el-input
              type="textarea"
              :rows="4"
              v-model="textarea"
              @blur="addAppraise(3)"
            >
            </el-input>
          </td>
        </tr>
      </table>
    </div>



</template>

<script>
  import axios from 'axios';
    export default {
        name: "managerEdit",
      data(){
          return{
            type:0,
            table1Data:[],
            student:{
              sid:"",
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
            ename1:"",
            score1:"",
            textarea:"",
          }
      },
      methods:{
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
          addAppraise(type){
            axios.get("http://localhost:8081/updateApp?sid="+this.student.sid+"&&type="+type+"&&content="+this.textarea).then(res=>{

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
      mounted() {
            this.eid = this.$route.params.eid;
            this.ename1 = this.$route.params.ename;
            this.showInfo();
            this.getEmp();
            this.getAllScores();

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
