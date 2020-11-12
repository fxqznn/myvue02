<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4" :offset="2">
            <el-input v-model="snamelike"  placeholder="输入姓名关键字查找" @change="tableRenderData" suffix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="6" :offset="10">
            <el-select v-model="term" @change="tableRenderData">
              <el-option
                v-for="item in options"
                :key="item.tid"
                :label="item.tname"
                v-model="item.tid">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="height: 550px">
        <el-table style="width:100%" border :data="tableData" >
          <el-table-column
            align="center"
            prop="sid"
            fixed="left"
            label="ID">
            <template slot-scope="scope">
              <router-link :to="'/studentMsg/'+scope.row.sid + '/' + term">{{scope.row.sid}}</router-link>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="sname"
            label="姓名">
          </el-table-column>

          <el-table-column
            align="center"
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            align="center"
            prop="school"
            label="学校">
          </el-table-column>
          <el-table-column
            align="center"
            label="成绩">
            <template v-for="(item,index) in tableHead">
              <el-table-column :prop="item.cid" :label="item.cname" :formatter="scoreShow" align="center">
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="sumscore"
            :formatter="averageShow"
            label="整体评价分数">
          </el-table-column>
          <el-table-column
            align="center"
            prop="s5"
            label="综合评价(优缺点)">
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-row>
          <el-col :span="8" :offset="8">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "StudentList",
    data() {
      return {
        dialogTableVisible: false,
        term:3,
        options: [],
        snamelike:'',
        current: 1,
        size: 5,
        total: 0,
        eid:this.$store.state.user.uname,
        tableHead:[],
        tableData:[],
        dialogTableData:[]
      }
    },
    methods:{
      getAllTerm(){
        axios.get('getTermByEid?eid=' + this.eid).then(res =>{
          this.options = res.data;
          var max = 0;
          this.options.forEach(function (item,index) {
            if (item.tid>max){
              max = item.tid;
            }
          });
          this.term = max;
          this.tableRenderData()
        })
      },
      getAllCourse(){
        axios.get("getCourses?tid="+this.term).then(res => {
          this.tableHead=res.data;
        })
      },
      tableRenderData:function () {
        this.getAllCourse();
        axios.get('getCourseWithScore?current=' + this.current + '&size=' + this.size+'&tid=' + this.term
          +"&snamelike=" + this.snamelike).then(res => {
          this.tableData = res.data.records;
          this.current = res.data.current;
          this.size = res.data.size;
          this.total = res.data.total;
        });
      },
      //每页条数改变时触发 选择一页显示多少行
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      scoreShow:function (row,column) {
        var data = row[column.property];
        if (data < 0){
          return "未评分"
        } else {
          return data;
        }
      },
      averageShow:function (row,column) {
        var data = row[column.property];
        if (data < 0){
          return "未评分"
        } else {
          return data;
        }
      },
    },

    mounted() {
      this.getAllTerm();
      this.getAllCourse();
      this.tableRenderData();
    }
  }
</script>

<style scoped>

</style>
