<template>
  <el-container id="all" style="width: 100%;height: 100%">
    <el-header style="text-align: right;height: 15%">
      <el-dropdown style="margin-top:1%">
        <el-button>
          <i class="el-icon-user"></i>
          <span v-text="name" style="font-size: 15px"></span>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button @click="changePass">修改密码</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button @click="exit">退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside style="width: 20%">
        <el-menu>
          <navigation-item v-for="(menu,i) in menus" :key="i" :item="menu"/>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
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
        axios.get('http://localhost:8081/getMenu/' + this.role).then(res => {
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
      }
    },
    mounted() {//编译后去获取数据
      this.getName();
      this.getRole();
      this.getMenu();
    }
  }
</script>

<style scoped>

</style>
