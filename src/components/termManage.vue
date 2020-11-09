<template>
  <div>
    <el-row>
      <el-col :span="14" :offset="2">
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

    <el-table ref="multipleTable" :data="tableData" border style="width: 100%" max-height="420"
              :default-sort="{prop:'tid',order:'ascending'}"  @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed prop="tid" label="编号"></el-table-column>
      <el-table-column fixed prop="tname" label="名称"></el-table-column>
      <el-table-column prop="tdate" label="开始时间"></el-table-column>
      <el-table-column fixed="right" prop="eid" label="授课老师" :formatter="eidFormat"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">修改信息</el-button>
          <el-button @click="handleChecked(scope.$index, scope.row)" type="text" size="small">选课</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"
                   align="center"></el-pagination>

    <el-dialog title="添加学期" :visible.sync="addVisiable" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="学期名称" label-width="100px">
              <el-input v-model="addData.tname" @blur="checkName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="开始时间" label-width="100px">
              <el-date-picker v-model="addData.tdate" type="date" placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="授课老师" label-width="100px">
              <el-select v-model="addData.eid">
                <el-option v-for="item in teachers" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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

    <el-dialog title="修改学期信息" :visible.sync="editVisiable" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="学期编号" label-width="100px">
              <el-input v-model="editData.tid" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="学期名称" label-width="100px">
              <el-input v-model="editData.tname" @blur="checkNameEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="开始时间" label-width="100px">
              <el-date-picker v-model="addData.tdate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="授课老师" label-width="100px">
              <el-select v-model="editData.eid">
                <el-option v-for="item in teachers" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit()">取 消</el-button>
        <el-button @click="eidtConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选课" :visible.sync="checkedVisiable" width="50%" :center="dialogCenter">
      <el-table ref="editTable" :data="checkedData" border style="width: 100%" max-height="380"
                :default-sort="{prop:'cid',order:'ascending'}" >
        <el-table-column fixed prop="cid" label="编号"></el-table-column>
        <el-table-column prop="cname" label="名称"></el-table-column>
        <el-table-column prop="isdel" label="状态"></el-table-column>
        <el-table-column fixed="right" prop="checked" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.checked == true" @click="cancalChecked(scope.$index, scope.row)" type="text" size="small">取消</el-button>
            <el-button v-if="scope.row.checked == false" @click="Checked(scope.$index, scope.row)" type="text" size="small">选课</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';

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
        delData:0,
        checkedVisiable:false,
        checkedData:[],
        checkedTermId:0
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
        var teacher_tem = [{value:0,label:'请选择老师',disabled:false}];
        axios.get('getEmpsByRole?role=1').then(res => {
          res.data.forEach(function (item, index) {
            if(item.isdel == 1){
              teacher_tem.push({value:item.eid, label:item.ename,disabled:true});
            } else {
              teacher_tem.push({value:item.eid, label:item.ename,disabled:false});
            }
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
        this.addData = {tname:'',tdate:'', eid:0};
        this.addVisiable = true;
      },
      cancelAdd : function () {
        this.addVisiable = false;
      },
      checkName : function () {
        if(this.addData.tname == ""){
          this.$message('学期名不能为空')
          return false;
        } else {
          return true;
        }
      },
      addConfirm : function () {
        if(this.checkName() == false){

        } else {
          axios.post('addTerm',qs.stringify(this.addData)).then(res => {
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
        }

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
        axios.get('getTermById?tid=' + row.tid).then(res => {
          this.editData = res.data;
        });
        this.editVisiable = true;
      },
      cancelEdit : function () {
        this.editVisiable = false;
      },
      checkNameEdit : function () {
        if(this.editData.tname == ""){
          this.$message('学期名不能为空');
          return false;
        } else {
          return true;
        }
      },
      eidtConfirm : function () {
        if(this.checkNameEdit() == false){

        } else {
          axios.post('editTerm',qs.stringify(this.editData)).then(res => {
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
        }
      },

      handleChecked : function (index,row) {
        if(row.isdel == "已删除"){
          this.$message("课程已经删除");
          return false;
        }
        this.checkedTermId = row.tid;
        this.checkedTableDataRender(row.tid);
        this.checkedVisiable = true;
      },
      checkedTableDataRender : function (tid) {
        axios.get('getCoursesForTerm?tid=' + tid ).then(res => {
          this.checkedData = res.data;
        })
      },
      cancalChecked : function (index, row) {
        axios.get('delTermCourse?tid=' + this.checkedTermId + '&cid=' + row.cid).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'取消选课成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.checkedTableDataRender(this.checkedTermId);
      },
      Checked : function (index, row) {
        axios.post('addTermCourse',qs.stringify({tid:this.checkedTermId,cid:row.cid})).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'选课成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.checkedTableDataRender(this.checkedTermId);
      }
    },
    mounted() {
      this.tableRenderData();
      this.teacherRenderData();
    }
  }
</script>

<style scoped>

</style>
