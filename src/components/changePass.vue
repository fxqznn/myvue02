<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <div style="padding-top: 20px">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label= "新密码：" prop="newPass">
              <el-col :span="18">
                <el-input :type="passw" v-model="ruleForm.newPass" autocomplete="off" @change="setPass()">
                  <i slot="suffix" :class="icon" @click="showPass"></i>
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
              <el-col :span="18">
                <el-input :type="passw" v-model="ruleForm.checkPass" autocomplete="off">
                  <i slot="suffix" :class="icon" @click="showPass"></i>
                </el-input>
              </el-col>
            </el-form-item>
            <el-col :span="18">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';

  export default {
    name: "changePass",
    data() {
      var checkNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkNewPass !== '') {
            this.$refs.ruleForm.validateField('checkNewPass');
          }
          callback();
        }
      };
      var checkCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        //用于改变Input类型
        passw: "password",
        icon: "el-icon-view",
        uid: this.$store.state.user.uid,
        pwd: '',
        ruleForm: {
          newPass: '',
          checkPass: ''
        },
        rules: {
          newPass: [
            {validator: checkNewPass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: checkCheckPass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.get("changePass/" + this.uid + "/" + this.pwd).then(res => {
                if (res.data == "success") {
                  this.$message.success("修改密码成功")
                  this.$router.push("/")
                } else {
                  this.$message.error("修改密码失败")
                }
              })
            }
          }
        )
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      ,
      //密码的隐藏和显示
      showPass() {
        //点击图标是密码隐藏或显示
        if (this.passw === "text") {
          this.passw = "password";
          //更换图标
          this.icon = "el-icon-view";
        } else {
          this.passw = "text";
          this.icon = "el-icon-loading"
        }
      }
      ,
      setPass() {
        this.pwd = this.ruleForm.newPass;
      }
    }
  }
</script>

<style scoped>

</style>
