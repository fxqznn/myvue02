<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" offset="8">
        <el-input v-model="snamelike"  placeholder="输入姓名关键字查找" @change="tableRenderData" suffix-icon="el-icon-search"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="value"  @change="tableRenderData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            v-model="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table style="width: 100%" border :data="tableData" >
      <el-table-column
        align="center"
        prop="sid"
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
        prop="grade"
        label="整体评价分数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="s5"
        label="综合评价(优缺点)">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "StudentList",
      data() {
        return {
          options: [{
            value: '1',
            label: '学期'
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
          snamelike:'',
          current: 1,
          size: 5,
          total: 0,
          tid:1,
          tableHead:[],
          tableData:[]
        }
      },
      methods:{
        getAllScores(){
          axios.get("getCourses?tid="+1).then(res => {
            this.tableHead=res.data;
          })
        },

        tableRenderData:function () {
          axios.get('getCourseWithScore?current=' + this.current + '&size=' + this.size+'&tid=' + this.tid
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
             return "待评价"
          } else {
            return data;
          }
        }
      },
      mounted() {
        this.getAllScores();
        this.tableRenderData();
      }
    }
</script>

<style scoped>

</style>
