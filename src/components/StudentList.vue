<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" offset="8">
        <el-input v-model="snamelike"  placeholder="输入姓名关键字查找" @change="tableRenderData" suffix-icon="el-icon-search"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="term" @change="tableRenderData" >
          <el-option
            v-for="item in options"
            :key="item.tid"
            :label="item.tname"
            v-model="item.tid">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table style="width: 100%" border :data="tableData" >
      <el-table-column
        align="center"
        prop="sid"
        fixed="left"
        label="ID">
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
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                   layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
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
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "StudentList",
      data() {
        return {
          dialogFormVisible: false,
          term:'',
          count:0,
          average:0,
          options: [],
          snamelike:'',
          current: 1,
          size: 5,
          total: 0,
          eid:1,
          tableHead:[],
          tableData:[]
        }
      },
      methods:{
          getAllTerm(){
            axios.get('getTermByEid?eid=' + this.eid).then(res =>{
                this.options = res.data;
            })
          },
        getAllScores(){
          axios.get("getCourses?tid="+1).then(res => {
            this.count = res.data.length;
            this.tableHead=res.data;
          })
        },
        tableRenderData:function () {
          axios.get('getCourseWithScore?current=' + this.current + '&size=' + this.size+'&tid=' + this.term
            +"&snamelike=" + this.snamelike).then(res => {
            this.tableData = res.data.records;
            this.current = res.data.current;
            this.size = res.data.size;
            this.total = res.data.total;
          })
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
        }
      },

      mounted() {
        this.getAllTerm();
        this.getAllScores();
        this.tableRenderData();

      }
    }
</script>

<style scoped>

</style>
