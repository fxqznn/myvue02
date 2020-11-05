<template>
  <div>
    <table width="1000px">
      <tr>
        <td colspan="7" align="center"><h4>培训学校评价</h4></td>
      </tr>
      <tr>
        <td height="118px">培训学校</td>
        <td colspan="6" rowspan="2">
          <el-table style="width: 100%" border :data="tableData" >
            <el-table-column
              align="center"
              prop="tname"
              label="学期">
            </el-table-column>
            <el-table-column
              align="center"
              prop="ename"
              label="评价人">
            </el-table-column>
            <el-table-column
              align="center"
              label="培训期间测试成绩">
              <template v-for="(item,index) in tableHead">
                <el-table-column :prop="item.cid" :label="item.cname" align="center" :formatter="showJudge">
                </el-table-column>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="avg"
              label="整体评价分数(平均分)">
              <template slot-scope="scope">
                {{scope.row.avg || "尚未评分"}}
              </template>
            </el-table-column>
          </el-table>
        </td>
      </tr>
      <tr>
        <td>学习评价</td>
      </tr>
      <tr>
        <td height="150px">评价(包括主要优点及缺陷)</td>
        <td colspan="6">{{appraise.content}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
    export default {
        name: "AbilitiesScoreList"
    }
</script>

<style scoped>

</style>
