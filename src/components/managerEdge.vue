<template>
  <el-table style="width: 100%" border :data="tableData">

    <el-table-column
    prop="ename"
    label="姓名">
    </el-table-column>
    <el-table-column
      label="评价">
      <template v-for="(item,index) in tableHead">
        <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>
      </template>
    </el-table-column>
    <el-table-column
      prop="grade"
      label="整体评价">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "managerEdge",
        data(){
          return{
            tableHead:[
              {
                column_name: "column_name",column_comment:"能力"
              },
              {
                column_name: "column_age",column_comment:"积极性"
              },
              {
                column_name: "column_sex",column_comment:"沟通"
              },{
                column_name: "column_class",column_comment:"人品"
              },{
                column_name: "column_state",column_comment:"性格"
              }
            ],
// 表格数据
            tableData: [{

              ename:'员工1',
              column_age: '5.0',
              column_name: '5',
              column_sex: '3',
              column_class:'4',
              column_state:'4',
              grade:'4'
            },
              {

                ename:'员工2',
                column_age: '5',
                column_name: '5',
                column_sex: '3',
                column_class:'4',
                column_state:'4',
                grade:'4'
              },
              {

                ename:'员工3',
                column_age: '5',
                column_name: '5',
                column_sex: '3',
                column_class:'4',
                column_state:'4',
                grade:'4'
              }],
          }
        }
    }
</script>

<style scoped>

</style>
