<template>
  <el-container>
    <el-header>
      <el-dropdown>
        <i class="el-icon-user" style="margin-right: 15px"></i>
        <span v-text="name"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="changePass">修改密码</el-dropdown-item>
          <el-dropdown-item @click="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside>
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

  export default {
    name: "main",
    components: {NavigationItem},
    data() {
      return {
        menus: [],
        name: null,
        role: null
      }
    },
    methods: {
      getName: function () {
        if (this.$store.user.name == null) {
          this.$router.push({path: "/"})
        } else {
          this.name = this.$store.user.name;
        }
      },
      getRole: function () {
        if (this.$store.user.role == null) {
          this.$router.push({path: "/"})
        } else {
          this.role = this.$store.user.role;
          this.checkRole(this.role)
        }
      },
      getMenu: function () {
        axios.get('http://localhost:8080/getMenu/' + this.role).then(res => {
          this.menus = res.data;
        })
      },
      exit: function () {
        if (confirm("确认要退出吗？")) {
          this.$store.dispatch('user/setId', null);
          this.$store.dispatch('user/setUser', null);
          this.$store.dispatch('user/setPerm', null);
          this.$router.push({path: '/'})
        }
      },
      changePass: function () {
        this.$router.push({path: '/changePass'})
      }
    },
    mounted() {//编译后去获取数据
      this.getName();
      this.getMenu();
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
