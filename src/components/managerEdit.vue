<template>
  <div>
    <table >
      <tr>
        <td colspan="7"> <h2>金桥学员成长跟踪表</h2></td>
      </tr>
      <tr >
        <td height="40px" width="80px">姓名</td>
        <td width="60px">{{student.sname}}</td>
        <td>性别</td>
        <td>{{student.sex}}</td>
        <td>民族</td>
        <td width="100px">{{student.nation}}</td>
        <td rowspan="4" width="150px"><img :src=student.pic></td>
      </tr>
      <tr>
        <td height="40px">出生年月</td>
        <td>{{student.birthday}}</td>
        <td width="60px">籍贯</td>
        <td width="100px">{{student.address}}</td>
        <td width="100px">婚否</td>
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
        <td colspan="7" height="40px">
          <h3>{{type == 0 ? "转正工作评价": "第一年工作评价"}}</h3>

        </td>
      </tr>
      <tr>
        <td height="40px">项目</td>
        <td>员工部门</td>
        <td>员工职务</td>
        <td>评价人</td>
        <td colspan="2" rowspan="2">

        </td>
        <td>整体评价分数</td>

      </tr>
      <tr>
        <td height="40px">工作评价</td>
        <td></td>
        <td></td>

        <td></td>
        <td></td>
      </tr>
      <tr>
        <td height="150px">评价(包括主要优点及缺陷)</td>
        <td colspan="6"></td>
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
              info:""
            },
            sid:0,

          }
      },
      methods:{
          showInfo(){
            axios.get("http://localhost:8081/getSelf?sid="+this.sid).then(res=>{
              this.student =res.data;
            })
          }
      },
      mounted() {
          this.sid = this.$route.params.sid;
            this.showInfo();
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
