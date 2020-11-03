<template>
    <div>
      <br>
      <el-row :gutter="20">

        <el-col :span="4" offset="8">
          <el-input v-model="ename"  placeholder="输入姓名关键字查找" @change="showScores" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value"  @change="showScores">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              v-model="item.value">
            </el-option>
          </el-select>
        </el-col>
        <br>

      </el-row>
      <br>
        <span>部门：{{dname}}  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  &nbsp; &nbsp;&nbsp;&nbsp;       评价人：{{ename}}</span>
      <br>
      <br>
      <el-table style="width: 100%" border :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" >
        <el-table-column
          align="center"
          prop="eid"
          label="工号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="ename"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="job"
          label="职位">
        </el-table-column>
        <el-table-column
          align="center"
          label="成绩">
          <template v-for="(item,index) in tableHead">
            <el-table-column :prop="item.cid" :label="item.cname" align="center" :formatter="showJudge">
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sum"
          label="整体评价分数(平均分)">
        </el-table-column>
        <el-table-column
          align="center"
          prop="title"
          label="综合评价(优缺点)">
          <el-button type="text" @click="dialogFormVisible = true" size="mini">编写评价</el-button>
        </el-table-column>
      </el-table>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="评价(包括主要优点及缺陷)" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="title"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1,5,10,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableData.length">
        </el-pagination>
      </div>
    </div>

</template>

<script>
  import axios from 'axios';
  export default {
    name: "EmpList",
    data() {
      return {
        dialogFormVisible: false,
        options: [{
          value: '0',
          label: '转正评价'
        }, {
          value: '1',
          label: '第一年评价'
        }, {
          value: '2',
          label: '第二年评价'
        }, {
          value: '3',
          label: '第三年评价'
        }],

        title:"",
        currentPage: 1,
        total: 20,
        pageSize: 5,
        uname: "100001",
        value: "0",
        ename: "",
        tableHead: [],
        tableData: []
      }
    },
    methods: {
      showJudge(row,column){
        const score = row[column.property];
        if (score == undefined){
            return "未评分";
        }else{
          return score;
        }
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

    getName: function () {
      this.name = this.$store.state.user.uname;
    },
    getAllScores() {
      axios.get("http://localhost:8081/getAllEntity?eid=" + this.uname + "&&type=" + this.value).then(res => {

        this.tableHead = res.data;
      })
    },
    showScores() {
      axios.get("http://localhost:8081/showAbilityScore?eid=" + this.uname + "&&type=" + this.value + "&&ename=" + this.ename).then(res => {
        this.tableData = res.data;
      })
    },
  },
    mounted() {
      //编译后去获取数据
      this.getAllScores();
      this.showScores();
      this.getName();
    }
  }
</script>

<style scoped>


</style>
