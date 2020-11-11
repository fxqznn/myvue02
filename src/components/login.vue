<template>
  <div style="width: 100%; height: 100%"
       v-bind:style="{backgroundImage:'url(' + bg + ')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}">
    <div style="position: absolute;margin-top: 70px; margin-left: 500px"><span style="font-size: 40px; font-weight: bolder;color:rgba(255,255,255,0.9) ">金桥学员跟踪系统</span></div>
    <el-row style="padding-top: 200px; padding-right: 100px">
      <el-col :span="8" :offset="16">
        <div style="padding-top: 20px;background-color: rgba(255,255,255,0.2)">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="uname">
              <el-col :span="20" :offset="1">
                <el-input v-model="ruleForm.uname" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
              <el-col :span="20" :offset="1">
                <el-input :type="passw" v-model="ruleForm.pass" autocomplete="off">
                  <i slot="suffix" :class="icon" @click="showPass"></i>
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item style="margin-left: 40px">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <br>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "login",
    data() {
      var checkUname = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('用户名不能为空'));
        } else {
          callback();
        }

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };

      return {
        //用于改变Input类型
        passw: "password",
        icon:"el-icon-view",
        ruleForm: {
          pass: '',
          uname: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          uname: [
            { validator: checkUname, trigger: 'blur' }
          ]
        },
        bg: require('@/assets/company.jpg')
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get("login/" + this.ruleForm.uname + "/" + this.ruleForm.pass).then(res => {
              if (res.data != null && res.data != "") {
                this.$store.dispatch("user/setId", res.data.uid);
                this.$store.dispatch("user/setUser", this.ruleForm.uname);
                this.$store.dispatch("user/setPerm", res.data.role);

                if(this.$store.state.user.role == 0){
                  this.$router.push({path: "/mainFrame"})
                }else if(this.$store.state.user.role == 1){
                  this.$router.push({path: "/mainFrame"})
                }else if(res.data.role == 2) {

                  this.$router.push({path: "/mainFrame"})

                } else if (res.data.role==3){
                  axios.get("getByUser/"+this.$store.state.user.uid).then(res =>{
                    this.$store.dispatch("student/setStudent",res.data);
                    this.$router.push({path: "/mainFrame"})
                  })
                }
              }else {
               this.$message.error("用户名或密码错误")
              }
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //密码的隐藏和显示
      showPass(){
        //点击图标是密码隐藏或显示
        if( this.passw === "text"){
          this.passw = "password";
          //更换图标
          this.icon = "el-icon-view";
        }else {
          this.passw = "text";
          this.icon = "el-icon-loading"
        }
      }
    }
  }
</script>

<style scoped>

</style>

