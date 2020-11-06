<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-input placeholder="请输入学期名称" v-model="tname" style="width: 300px">
          <el-button slot="append" @click="tableRenderData">查询</el-button>
        </el-input>
        <el-select v-model="eid" @change="tableRenderData">
          <el-option v-for="item in teachers" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" >
        <el-button @click="add()" >添加学期</el-button>
        <el-button @click="dels()" >删除学期</el-button>
      </el-col>
    </el-row>

    <br />

    <el-table ref="multipleTable" :data="tableData" border style="width: 100%" max-height="600"
              :default-sort="{prop:'tid',order:'ascending'}"  @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed prop="tid" label="编号"></el-table-column>
      <el-table-column fixed prop="tname" label="名称"></el-table-column>
      <el-table-column prop="date" label="开始时间"></el-table-column>
      <el-table-column fixed="right" prop="eid" label="授课老师" :formatter="eidFormat"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>

    <el-dialog title="添加学期" :visible.sync="addVisiable" width="100%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="名称" label-width="50px">
              <el-input v-model="addData.tname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="开始时间" label-width="50px">
              <el-input type="tdate" v-model="addData.tdate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="授课老师" label-width="50px">
              <el-select v-model="addData.eid">
                <el-option v-for="item in teachers" :key="item.value" :label="item.label" :value="item.value">
                  <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table ref="multipleTable" :data="addData.courses" border style="width: 100%" max-height="600"
                :default-sort="{prop:'cid',order:'ascending'}">
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd()">取 消</el-button>
        <el-button @click="addConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除学期" :visible.sync="delsVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除所有选中的数据吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDels()">取 消</el-button>
        <el-button @click="delsConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除学期" :visible.sync="delVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDel()">取 消</el-button>
        <el-button @click="delConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改学期信息" :visible.sync="editVisiable" width="100%" :center="dialogCenter">
      <div slot="footer" class="dialog-footer">
        <el-form>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="编号" label-width="50px">
                <el-input v-model="editData.term.tid" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="名称" label-width="50px">
                <el-input v-model="editData.term.tname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="开始时间" label-width="50px">
                <el-input type="tdate" v-model="addData.date"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table ref="multipleTable" :data="tableData_forAdd" border style="width: 100%" max-height="600"
                  :default-sort="{prop:'tid',order:'ascending'}"  @selection-change="handleSelectionChange">
        </el-table>
        <el-button @click="cancelEdit()">取 消</el-button>
        <el-button @click="eidtConfirm()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import XLSX from 'xlsx';

  export default {
    name: "termManage",
    data(){
      return {
        dialogCenter: true,

        tname:'',
        teachers:[],
        eid:0,

        total:0,
        size:5,
        current:1,
        tableData:[],
        multipleSelection:[],

        addVisiable:false,
        addData:{},
        delsVisiable:false,
        delsData:[],
        editVisiable:false,
        editData:{},
        delVisiable:false,
        delData:0
      }
    },
    methods:{
      tableRenderData : function () {
        axios.get('getAllTerm?current=' + this.current + '&size=' + this.size +
          '&tname=' + this.tname + '&eid=' + this.eid).then(res => {
          this.tableData = res.data.records;
          this.current = res.data.current;
          this.size = res.data.size;
          this.total = res.data.total;
        })
      },
      teacherRenderData : function() {
        var teacher_tem = [{value:0,label:'请选择老师',isdel:0}];
        axios.get('getEmpsByRole?role=1').then(res => {
          res.data.forEach(function (item, index) {
            teacher_tem.push({value:item.eid, label:item.ename,isdel:item.isdel});
          })
        });
        this.teachers = teacher_tem;
      },
      eidFormat : function(row, column) {
        var ename_tem = '';
        this.teachers.forEach(function (item, value) {
          if(item.value == row.eid){
            ename_tem = item.label;
          }
        });
        return ename_tem;
      },

      handleSelectionChange : function (val) {
        this.multipleSelection = val;
      },
      handleSizeChange : function(val) {
        this.size = val;
        this.tableRenderData();
      },
      handleCurrentChange : function(val) {
        this.current = val;
        this.tableRenderData();
      },

      add : function () {
        this.addData = {tname:'',tdate:null, eid:0, courses:[], checkedCourses:[]};
        axios.get('getCoursesForTermAdd').then(res => {
          this.addData.courses = res.data;
        });
        this.addVisiable = true;
      },
      cancelAdd : function () {
        this.addVisiable = false;
      },
      addConfirm : function () {
        axios.post('addTerm',qs.stringify({term:this.addData, courses:JSON.stringify(this.selected)})).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'添加成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.addVisiable = false;
        this.tableRenderData();
      },

      dels : function () {
        this.delsData = [];
        if(this.multipleSelection.length == 0){
          this.$message("请选择学期进行删除")
        } else {
          this.delsVisiable = true;
          this.delsData = this.multipleSelection;
        }
      },
      cancelDels : function () {
        this.delsVisiable = false;
      },
      delsConfirm : function () {
        var tids = [];
        this.delsData.forEach(function (item, index) {
          tids.push(item.tid);
        });
        axios.post('delTermsByIds',qs.stringify({tids:tids},{indices:false})).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'删除成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.delsVisiable = false;
        this.tableRenderData();
      },

      handleDelete : function (index, row) {
        this.delVisiable = true;
        this.delData = row.tid;
      },
      cancelDel : function () {
        this.delVisiable = false;
      },
      delConfirm : function () {
        axios.get('delTermById?tid=' + this.delData).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'删除成功',
              type:'success'
            });
          } else if (res.data == 'notdel'){
            this.$message('学期内存在学生不能删除');
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.delVisiable = false;
        this.tableRenderData();
      },

      handleEidt : function (index, row) {
        this.editData = {};
        axios.get('getTermById?tid=' + row.tid).then(res => {
          this.editData = res.data;
        });
        this.editVisiable = true;
      },
      cancelEdit : function () {
        this.editVisiable = false;
      },
      eidtConfirm : function () {
        axios.post('editCourse',
          qs.stringify({term:this.editData.term,
            checkCourses:JSON.stringify(this.editData.checkedCourses)})).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'修改成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.editVisiable = false;
        this.tableRenderData();
      },

    },
    mounted() {
      this.tableRenderData();
      this.teacherRenderData();
    }
  }
</script>

<style scoped>

</style>
