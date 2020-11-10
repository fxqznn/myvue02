<template>
  <div>

    <el-row>
      <el-col :span="15" :offset="1">
        <el-input placeholder="请输入部门名称" v-model="dname" style="width: 200px">
          <el-button slot="append" @click="tableRenderData">查询</el-button>
        </el-input>
        <el-select v-model="isdel" @change="tableRenderData" style="width: 200px">
          <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
        <el-select v-model="eid" @change="tableRenderData" style="width: 200px">
          <el-option v-for="item in managers" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" >
        <el-button @click="add()" >添加部门</el-button>
        <el-button @click="dels()" >删除部门</el-button>
      </el-col>
    </el-row>

    <br />

    <el-table ref="multipleTable" :data="tableData" border style="width: 100%" max-height="420"
              :default-sort="{prop:'did',order:'ascending'}"  @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed prop="did" label="编号"></el-table-column>
      <el-table-column fixed prop="dname" label="名称"></el-table-column>
      <el-table-column fixed="right" prop="eid" label="经理" :formatter="eidFormat"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">修改信息</el-button>
          <el-button @click="handleChecked(scope.$index, scope.row)" type="text" size="small">选择评价项</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"
                   align="center"></el-pagination>

    <el-dialog title="添加部门" :visible.sync="addVisiable" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="部门名称" label-width="100px">
              <el-input v-model="addData.dname" @blur="checkNameAdd"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="部门经理" label-width="100px">
              <el-select v-model="addData.dheader">
                <el-option v-for="item in managers" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
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

    <el-dialog title="删除部门" :visible.sync="delsVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除所有选中的数据吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDels()">取 消</el-button>
        <el-button @click="delsConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除部门" :visible.sync="delVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDel()">取 消</el-button>
        <el-button @click="delConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改部门信息" :visible.sync="editVisiable" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="部门编号" label-width="100px">
              <el-input v-model="editData.did" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="部门名称" label-width="100px">
              <el-input v-model="editData.dname" @blur="checkNameEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="部门经理" label-width="100px">
              <el-select v-model="editData.dheader">
                <el-option v-for="item in managers" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
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

    <el-dialog title="选择评价项" :visible.sync="checkedVisiable" width="50%" :center="dialogCenter">
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
    name: "deptManage",
    data(){
      return{
        dialogCenter: true,

        dname:'',
        status:[{value:0,label:'存在'},{value:1,label:'已删除'}],
        isdel:0,
        managers:[],
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
        checkedDeptId:0
      }
    },
    methods:{
      tableRenderData : function () {
        axios.get('getAllDept?current=' + this.current + '&size=' + this.size +
          '&dname=' + this.dname + '&isdel=' + this.isdel + '&eid=' + this.eid).then(res => {
          this.tableData = res.data.records;
          this.current = res.data.current;
          this.size = res.data.size;
          this.total = res.data.total;
        })
      },
      managerRenderData : function() {
        var manager_tem = [{value:0,label:'请选择经理',disabled:false}];
        axios.get('getEmpsByRole?role=2').then(res => {
          res.data.forEach(function (item, index) {
            if(item.isdel == 1){
              manager_tem.push({value:item.eid, label:item.ename,disabled:true});
            } else {
              manager_tem.push({value:item.eid, label:item.ename,disabled:false});
            }
          })
        });
        this.managers = manager_tem;
      },
      eidFormat : function(row, column) {
        var ename_tem = '';
        this.managers.forEach(function (item, value) {
          if(item.value == row.dheader){
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
        this.addData = {dname:'',dheader:0};
        this.addVisiable = true;
      },
      cancelAdd : function () {
        this.addVisiable = false;
      },
      checkNameAdd : function () {
        if(this.addData.dname == ""){
          this.$message('部门名称部门为空');
          return false;
        } else {
          return true;
        }
      },
      addConfirm : function () {
        if(this.checkNameAdd() == true){
          axios.post('addDept',qs.stringify(this.addData)).then(res => {
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
          this.$message("请选择部门进行删除")
        } else {
          this.delsVisiable = true;
          this.delsData = this.multipleSelection;
        }
      },
      cancelDels : function () {
        this.delsVisiable = false;
      },
      delsConfirm : function () {
        var dids = [];
        this.delsData.forEach(function (item, index) {
          dids.push(item.did);
        });
        axios.post('delDeptsByIds',qs.stringify({dids:dids},{indices:false})).then(res => {
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
        this.delData = row.did;
      },
      cancelDel : function () {
        this.delVisiable = false;
      },
      delConfirm : function () {
        axios.get('delDeptById?did=' + this.delData).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'删除成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.delVisiable = false;
        this.tableRenderData();
      },

      handleEidt : function (index, row) {
        axios.get('getDeptById?did=' + row.did).then(res => {
          this.editData = res.data;
        });
        this.editVisiable = true;
      },
      cancelEdit : function () {
        this.editVisiable = false;
      },
      checkNameEdit : function() {
        if(this.editData.dname == ""){
          this.$message('部门名称不能为空');
          return false;
        } else {
          return true;
        }
      },
      eidtConfirm : function () {
        if(this.checkNameEdit() == true){
          axios.post('editDept',qs.stringify(this.editData)).then(res => {
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
        this.checkedDeptId = row.did;
        this.checkedTableDataRender(row.did);
        this.checkedVisiable = true;
      },
      checkedTableDataRender : function (did) {
        axios.get('getCoursesForDept?did=' + did ).then(res => {
          this.checkedData = res.data;
        })
      },
      cancalChecked : function (index, row) {
        axios.get('delDeptCourse?did=' + this.checkedDeptId + '&cid=' + row.cid).then(res => {
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
        axios.post('addDeptCourse',qs.stringify({did:this.checkedDeptId,cid:row.cid})).then(res => {
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
      this.managerRenderData();
    }
  }
</script>

<style scoped>

</style>
