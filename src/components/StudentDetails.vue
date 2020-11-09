<template>
  <div>
    <table width="1000px" align="center">
      <tr>
        <td colspan="7"> <h2>金桥学员成长跟踪表</h2></td>
      </tr>
      <tr >
        <td height="40px" width="80px">姓名</td>
        <td style="width: 100px"><el-input v-model="student.sname" @blur="verifySname" ></el-input></td>
        <td>性别</td>
        <td width="150px"><el-radio v-model="student.sex" label="男" checked>男</el-radio>
          <el-radio v-model="student.sex" label="女">女</el-radio></td>
        <td>民族</td>
        <td width="150px"><el-input v-model="student.nation" @blur="verifyNation"></el-input></td>
        <td rowspan="4" style="width: 3cm;height: 4cm" align="center">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            enctype="multipart/form-data"
          name="photo">
            <img v-if="student.pic" :src='"http://localhost:8081/"+student.pic' class="avatar" style="width: 2.5cm;height: 3.5cm">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </td>
      </tr>
      <tr>
        <td height="40px">出生年月</td>
        <td><el-date-picker v-model="student.birthday" type="date" placeholder="选择日期" @blur="verifyBirthDay"></el-date-picker></td>
        <td width="60px">籍贯</td>
        <td width="100px"><el-input v-model="student.address" @blur="verifyAdress"></el-input></td>
        <td width="100px">婚否</td>
        <td><span><el-radio v-model="marry" label="0" @change="changeMarry" checked>未婚</el-radio>
          <el-radio v-model="marry" label="1" @change="changeMarry">已婚</el-radio></span></td>
      </tr>
      <tr>
        <td height="40px">联系电话</td>
        <td colspan="2"><el-input ref="phone" v-model="student.phone" @blur="verifyPhone"></el-input></td>
        <td>身份证号码</td>
        <td colspan="2"><el-input ref="cardid"  v-model="student.cardid" @blur="verifyCardid"></el-input></td>
      </tr>
      <tr>
        <td height="40px">毕业学校</td>
        <td colspan="2"><el-input v-model="student.school" @blur="verifySchool"></el-input></td>
        <td>专业</td>
        <td colspan="2"><el-input v-model="student.major" @blur="verifyMajor"></el-input></td>
      </tr>
      <tr>
        <td height="40px">备注</td>
        <td colspan="3"><el-input type="textarea" :rows="2" v-model="student.info"></el-input></td>
        <td colspan="3"><el-button @click="updateStu">修改个人信息</el-button>
        <el-button @click="delImg">删除照片</el-button></td>
      </tr>
      <tr><td colspan="7"><router-view /></td></tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
    export default {
        name: "StudentDetails",
      data(){
        return{
          type:0,
          marry:"",
          student:{
            sid:this.$store.state.student.sid,
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
            eid:0
          },
        }
      },
      methods:{
          updateStu:function(){
            if (this.verifySname()&&this.verifySex()&&this.verifyNation()&&this.verifyAdress()
              &&this.verifyBirthDay()&&this.verifySchool()&&this.verifyMajor()&&this.verifyMarry()
            &&this.verifyCardid()&&this.verifyPhone()) {
              axios.post("modifyDetails", qs.stringify(this.student)).then(res => {
                if (res.data == "success") {
                  this.$message("修改信息成功");
                } else {
                  this.$message.error("修改信息失败");
                }
              })
            }
          },
        uploadImg:function(){
          axios.get("updatePic/"+this.$store.state.student.sid+"/"+this.student.pic).then(res=>{
            if (res.data=="fail"){
              this.$message.error("上传照片失败");
            } else {
              this.$message("上传照片成功");
            }
          })
        },
        delImg:function(){
          axios.post("delImg",qs.stringify({imgName:this.student.pic})).then(res=>{
            if (res.data=="success"){
              this.$message("删除照片成功");
              this.student.pic="";
              this.uploadImg();
            } else if (res.data=="none"){
              this.$message.error("没有照片，不能删除")
            } else {
              this.$message.error("删除照片失败");
            }
          })
        },
        showInfo(){
          axios.get("getSelf?sid="+this.$store.state.student.sid).then(res=>{
            this.student =res.data;
            this.marry=this.student.marry.toString();
          })
        },
        handleAvatarSuccess(res, file) {
          axios.post("delImg",qs.stringify({imgName:this.student.pic}));
          this.student.pic = res;
          this.uploadImg();
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 5;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 5MB!');
          }
          return isJPG && isLt2M;
        },
        verifyPhone:function (){
          var reg = /^1[3|4|5|8][0-9]\d{4,8}$/
          if(!(reg.test(this.student.phone))){
            this.$message.error("不是完整的11位手机号或者正确的手机号前七位");
            this.$refs.phone.focus();
            return false;
          }else {
            return true;
          }
        },
        verifyCardid:function () {
          var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          if (!(reg.test(this.student.cardid))){
            this.$message.error("不是正确的身份证号码格式");
            this.$refs.cardid.focus();
            return false;
          }else {
            return true;
          }
        },
        verifySex:function(){
          if (this.student.sex.length==0){
            this.$message.error("请选择性别");
            return false;
          }else {
            return true;
          }
        },
        verifySname:function(){
          if (this.student.sname.length==0){
            this.$message.error("请输入姓名");
            return false;
          }else {
            return true;
          }
        },
        verifyNation:function(){
          if (this.student.nation.length==0){
            this.$message.error("请输入民族");
            return false;
          }else {
            return true;
          }
        },
        verifyBirthDay:function(){
          if (this.student.birthday.length==0){
            this.$message.error("请选择生日");
            return false;
          }else {
            return true;
          }
        },
        verifyAdress:function(){
          if (this.student.address.length==0){
            this.$message.error("请输入籍贯");
            return false;
          }else {
            return true;
          }
        },
        verifyMarry:function(){
          if (this.marry.length==0){
            this.$message.error("请选择婚姻状况");
            return false;
          }else {
            return true;
          }
        },
        verifySchool:function(){
          if (this.student.school.length==0){
            this.$message.error("请输入毕业院校");
            return false;
          }else {
            return true;
          }
        },
        verifyMajor:function(){
          if (this.student.major.length==0){
            this.$message.error("请输入专业");
            return false;
          }else {
            return true;
          }
        },
        changeMarry:function () {
          this.student.marry=parseInt(this.marry);
        }
      },
      mounted() {
        this.showInfo();
      }
    }
</script>

<style scoped>
  table,tr,td{
    border: 1px solid;
    border-collapse: collapse;
    text-align:center
  }
  .el-input{
    border:0px
  }
</style>
