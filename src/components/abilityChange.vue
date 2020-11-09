<template>
    <div>
      <el-select v-model="value" placeholder="请选择要添加的评分项">
        <el-option
          v-for="item in options"
          :key="item.cid"
          :label="item.cname"
          :value="item.cid">
        </el-option>
      </el-select>
      <el-button @click="addAbility" icon="el-icon-plus">添加</el-button>
      <br><br>
      <el-table :data="tableData" border>
        <el-table-column
          prop="cid"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="cname"
          label="已选评分项">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="notSelect(scope.row)">删除该评分项</el-button>
          </template>

        </el-table-column>

      </el-table>

    </div>

</template>

<script>
  import axios from 'axios';
    export default {
        name: "abilityChange",
      data(){
          return{
            value:"",
            options:[],
            name:0,
            tableData:[]
          }
      },
      methods:{
        getName: function () {
          this.name = this.$store.state.user.uname;
        },
          getTable(){
            axios.get("http://localhost:8081/getAllEntity?eid=" + this.name ).then(res=>{
              this.tableData=res.data;
            })
          },
        getOptions(){
          axios.get("http://localhost:8081/getNotSelectedAbility?eid="+this.name ).then(res=>{
            this.options=res.data;
          })
        },
        notSelect(index){

          axios.get("http://localhost:8081/delAbility?eid="+this.name+"&&cid="+index.cid ).then(res=>{
            if(res.data==1){
              this.$message.success("成功删除");
              this.getTable();
              this.getOptions();
            }else{
              this.$message.error("未能删除");
            }
          })
        },
        addAbility(){
          axios.get("http://localhost:8081/addAbility?eid="+this.name+"&&cid="+this.value).then(res=>{
            if (res.data==1){
              this.$message.success("成功添加");
              this.value="";
              this.getTable();
              this.getOptions();
            } else{
              this.$message.error("请选择后再添加")
            }

          })
        }
      },
      mounted() {
          this.getName();
          this.getTable();
          this.getOptions();
      }
    }
</script>

<style scoped>

</style>
