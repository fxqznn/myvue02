<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="8" style="background-color: darkgrey">
        <div style="padding-top: 20px">
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
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
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
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get("http://localhost:8081/login/" + this.ruleForm.uname + "/" + this.ruleForm.pass).then(res => {
              if (res.data != null && res.data != "") {
                this.$store.dispatch("setUser", this.ruleForm.uname);
                if (res.data.role === 0){
                  return this.$router.push({path: "/Top"})
                }
              }else {
               this.$message("用户名或密码错误")
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

