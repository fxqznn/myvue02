<template>
  <div>
    <table>
      <tr>
        <td colspan="7"> <h2>金桥学员成长跟踪表</h2></td>
      </tr>
      <tr >
        <td height="40px" width="80px">姓名</td>
        <td style="width: 100px"><el-input v-model="student.sname" style="border: none"></el-input></td>
        <td>性别</td>
        <td width="150px"><el-radio v-model="student.sex" label="男">男</el-radio>
          <el-radio v-model="student.sex" label="女">女</el-radio></td>
        <td>民族</td>
        <td width="150px"><el-input v-model="student.nation"></el-input></td>
        <td rowspan="4" width="150px" align="center">
          <el-upload
            class="avatar-uploader"
            action="upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="student.pic" :src="student.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </td>
      </tr>
      <tr>
        <td height="40px">出生年月</td>
        <td><el-date-picker v-model="student.birthday" type="date" placeholder="选择日期" style="border: 0px solid"></el-date-picker></td>
        <td width="60px">籍贯</td>
        <td width="100px"><el-input v-model="student.address"></el-input></td>
        <td width="100px">婚否</td>
        <td><span><el-radio v-model="marry" label="0" @change="changeMarry">未婚</el-radio>
          <el-radio v-model="marry" label="1" @change="changeMarry">已婚</el-radio></span></td>
      </tr>
      <tr>
        <td height="40px">联系电话</td>
        <td colspan="2"><el-input ref="phone" v-model="student.phone" @change="verifyPhone"></el-input></td>
        <td>身份证号码</td>
        <td colspan="2"><el-input ref="cardid"  v-model="student.cardid" @change="verifyCardid"></el-input></td>
      </tr>
      <tr>
        <td height="40px">毕业学校</td>
        <td colspan="2"><el-input v-model="student.school"></el-input></td>
        <td>专业</td>
        <td colspan="2"><el-input v-model="student.major"></el-input></td>
      </tr>
      <tr>
        <td height="40px">备注</td>
        <td colspan="6"><el-input type="textarea" :rows="2" v-model="student.info"></el-input></td>
      </tr>
      <tr><td colspan="7"><router-view/></td></tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "StudentDetails",
      data(){
        return{
          type:0,
          marry:"",
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
        }
      },
      methods:{
        showInfo(){
          axios.get("getSelf?sid="+this.$store.state.student.sid).then(res=>{
            this.student =res.data;
            this.marry=this.student.marry.toString();
          })
        },
        handleAvatarSuccess(res, file) {
          this.student.pic = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        verifyPhone:function (){
          var reg = /^1[3|4|5|8][0-9]\d{4,8}$/
          if(!(reg.test(this.student.phone))){
            this.$message.error("不是完整的11位手机号或者正确的手机号前七位");
            this.$refs.phone.focus();
            return false;
          }
        },
        verifyCardid:function () {
          var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          if (!(reg.test(this.student.cardid))){
            this.$message.error("不是正确的身份证号码格式");
            this.$refs.cardid.focus();
            return false;
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
  }
  .el-input{
    border:0px
  }
</style>
