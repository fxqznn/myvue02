<template>
  <el-container id="all" style="width: 100%;height: 100%;overflow: hidden">
    <el-header  style="height: 10% ;background-color: aliceblue">
      <div style="display: inline-block">
        <img src="../assets/jxd.jpg" style="vertical-align: middle" height="50px">
        <span style="font-weight: bolder;font-size: 25px">金桥学员成长跟踪系统</span>
      </div>
      <el-dropdown style="margin-top:1%;float: right">
        <el-button >
          <i class="el-icon-user"></i>
          <span v-text="name" style="font-size: 15px"></span>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button @click="changePass"  style="border: 0px">修改密码</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button @click="exit"  style="border: 0px">退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container style="overflow-y: hidden;">
      <el-aside  style="width: 20%; height: 100%;background-color: aliceblue "  >
        <el-menu style="background-color: aliceblue">
          <navigation-item v-for="(menu,i) in menus" :key="i" :item="menu"/>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main  style="width: 80%; height: 100%;overflow-x: hidden;" >
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import axios from 'axios';
  import NavigationItem from "./NavigationItem"; //引入菜单
  import Router from 'vue-router'
  import Vue from 'vue'
  import changePass from './changePass';

  export default {
    name: "mainFrame",
    components: {
      "navigation-item": NavigationItem,
      changePass,
    },
    data() {
      return {
        menus: [],
        name: null,
        role: null,
      }
    },
    methods: {
      getName: function () {
        this.name = this.$store.state.user.uname;
      },
      getRole: function () {
        this.role = this.$store.state.user.role;
      },
      getMenu: function () {
        axios.get('getMenu/' + this.role).then(res => {
          this.menus = res.data;
        })
      },
      exit: function () {
        this.$confirm('确认退出吗', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('user/setId', null);
          this.$store.dispatch('user/setUser', null);
          this.$store.dispatch('user/setPerm', null);
          this.$router.push({path: '/'})
        })
      },
      changePass: function () {
        this.$router.push({path: '/mainFrame/changePass'})
      },
    loginControll : function () {
      if(this.$store.state.user.uid == null) {
        this.$router.push('/')
      }else {
        if(this.$store.state.user.role == 0){
          this.$router.push('/userManage')
        } else if (this.$store.state.user.role == 1) {
          this.$router.push("/StudentList");
        } else if(this.$store.state.user.role == 2) {

        } else {
          this.$router.push("/StudentDetails");
        }
      }
    }
    },
    mounted() {//编译后去获取数据
      this.loginControll();
      this.getName();
      this.getRole();
      this.getMenu();
    }
  }
</script>

<style scoped>

</style>
