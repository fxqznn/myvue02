<template>
  <el-container>
    <el-header>
      <el-dropdown>
        <i class="el-icon-user" style="margin-right: 15px"></i>
        <span v-text="name"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside>
        <router-view name="side"/>
      </el-aside>
      <el-container>
        <el-main>
          <router-view name="main"/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import axios from 'axios/index';

  export default {
    name: "Main",
    data: {
      name: null
    },
    methods: {
      getName: function () {
        if (this.$store.user.name==null){
          this.$router.push({path:"/"})
        }else {
          this.name = this.$store.user.name;
        }
      }
    },
    mounted() {//编译后去获取数据
      this.getName();
    }
  }
</script>

<style scoped>
  .el-header {
    height: 20%;
    width: 100%;
    text-align: right;
    font-size: 12px
  }

  .el-container {
    height: 100%;
    width: 100%;
    border: 1px solid #eee
  }

  .el-main {
    width: 70%;
    height: 80%
  }

  .el-aside {
    width: 30%;
    height: 80%
  }
</style>
