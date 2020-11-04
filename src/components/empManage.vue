<template>
<div>
  <el-row>
    <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" >
      <el-input placeholder="请输入员工姓名" v-model="ename" style="width: 300px">
        <el-button slot="append" @click="tableRenderData">查询</el-button>
      </el-input>
      <el-select v-model="dept" @change="tableRenderData">
        <el-option v-for="item in depts" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
        </el-option>
      </el-select>
      <el-select v-model="isdel" @change="tableRenderData">
        <el-option v-for="item in isdels" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-col>
    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
      <el-button @click="addEmp" >添加用户</el-button>
      <el-button @click="delEmps" >删除用户</el-button>
    </el-col>
  </el-row>

  <el-table ref="multipleTable" :data="tableData" border style="width: 100%" max-height="600"
            :default-sort="{prop:'uid',order:'ascending'}"  @selection-change="handleSelectionChange">
    <el-table-column fixed type="selection"></el-table-column>
    <el-table-column fixed prop="eid" label="工号"></el-table-column>
    <el-table-column fixed prop="ename" label="姓名"></el-table-column>
    <el-table-column prop="did" label="部门" :formatter="didFormat"></el-table-column>
    <el-table-column prop="job" label="工作"></el-table-column>
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

  <el-dialog title="添加员工" :visible.sync="addEmpVisiable" width="50%" :center="dialogCenter">
    <el-form>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="姓名" label-width="50px">
            <el-input v-model="emp.ename"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="工作" label-width="50px">
            <el-input v-model="emp.job"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="部门" label-width="50px">
            <el-select v-model="emp.did" @change="tableRenderData">
              <el-option v-for="item in depts_forAdd" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="角色" label-width="50px">
            <el-select v-model="role">
              <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
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

  <el-dialog title="删除员工" :visible.sync="delEmpsVisiable" width="25%" :center="dialogCenter">
    <p><strong>确认删除所有选中的数据吗？</strong></p>
    <el-checkbox v-model="delCascade">级联删除员工所有信息</el-checkbox>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDelEmps()">取 消</el-button>
      <el-button @click="delEmpsConfirm()">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="删除员工" :visible.sync="delEmpVisiable" width="25%" :center="dialogCenter">
    <p><strong>确认删除吗？</strong></p>
    <el-checkbox v-model="delCascade">级联删除员工所有信息</el-checkbox>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDel()">取 消</el-button>
      <el-button @click="delConfirm()">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="修改员工信息" :visible.sync="editEmpVisible" width="50%" :center="dialogCenter">
    <el-form>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="工号" label-width="50px">
            <el-input v-model="empForEdit.eid" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="姓名" label-width="50px">
            <el-input v-model="empForEdit.ename"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="工作" label-width="50px">
            <el-input v-model="empForEdit.job"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="部门" label-width="50px">
            <el-select v-model="empForEdit.did" @change="tableRenderData">
              <el-option v-for="item in depts_forEdit" :key="item.value" :label="item.label" :value="item.value">
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

</div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';

    export default {
        name: "empManage",
        data(){
          return {
            depts:[{value:-1,label:'请选择部门'},{value:0,label:'未分配部门'}],
            isdels:[{value:0,label:'在职'},{value:1,label:'离职'}],
            dept:-1,
            isdel:0,
            ename:'',
            tableData:[],
            multipleSelection:[],
            current:1,
            size:5,
            total:0,
            addEmpVisiable:false,
            delEmpsVisiable:false,
            emp:{ename:'',did:0,job:''},
            role:3,
            depts_forAdd:[],
            roles:[{value:0,label:'管理员'},
              {value:1,label:'教师'},
              {value:2,label:'部门经理'},
              {value:3,label:'学生'}],
            dialogCenter:'center',
            empDelIds:[],
            delCascade:true,
            delEmpVisiable:false,
            delEmp_eid:0,
            editEmpVisible:false,
            empForEdit:{eid:'',ename:'',job:'',did:'',},
            depts_forEdit:[],
          }
        },
        methods:{
          deptRenderData : function(){
            axios.get('getAllDeptForEmp').then(res => {
              var depts_tem = this.depts;
              res.data.forEach(function (item, index) {
                depts_tem.push({value:item.did, label:item.dname});
              });
              this.depts = depts_tem;
            })
          },
          tableRenderData : function () {
            axios.get('getAllEmp?current='+ this.current + '&size=' + this.size +
            '&ename=' + this.ename + '&did=' + this.dept + '&isdel=' + this.isdel).then(res => {
              this.tableData = res.data.records;
              this.current = res.data.current;
              this.size = res.data.size;
              this.total = res.data.total;
            })
          },
          handleSelectionChange : function(val) {
            this.multipleTable = val;
          },
          handleDelete : function (index, row) {
            this.delCascade = true;
            this.delEmpVisiable = true;
            this.delEmp_eid = row.eid;
          },
          cancelDel : function() {
            this.delEmpVisiable = false;
          },
          delConfirm : function() {
            if(this.delCascade){
              axios.get('delEmpByIdCascade?eid=' + this.delEmp_eid).then(res => {
                if(res.data == "success"){
                  this.$message({
                    message:'删除成功',
                    type:'success'
                  });
                } else {
                  this.$message.error('服务器响应失败');
                }
              })
            } else {
              axios.post('delEmpsById?eid=' + this.delEmp_eid).then(res => {
                if(res.data == "success"){
                  this.$message({
                    message:'删除成功',
                    type:'success'
                  });
                } else {
                  this.$message.error('服务器响应失败');
                }
              })
            }
            this.delEmpVisiable = false;
            this.tableRenderData();
          },
          handleEidt : function(index, row) {
            this.empForEdit = {eid:'',ename:'',job:'',did:'',};
            axios.get('getEmpById?eid=' + row.eid).then(res => {
              this.empForEdit.did = res.data.did;
              this.empForEdit.eid = res.data.eid;
              this.empForEdit.ename = res.data.ename;
              this.empForEdit.job = res.data.job;
            });
            axios.get('getAllDeptForEmp').then(res => {
              var depts_tem = [{value:0,label:'未分配部门'}];
              res.data.forEach(function (item, index) {
                depts_tem.push({value:item.did, label:item.dname});
              });
              this.depts_forEdit = depts_tem;
            });
            this.editEmpVisible = true;
          },
          cancelEdit : function() {
            this.editEmpVisible = false;
          },
          eidtConfirm : function() {
            axios.post('editEmp',qs.stringify({eid:this.empForEdit.eid,
            ename:this.empForEdit.ename, job:this.empForEdit.job,
            did:this.empForEdit.did})).then(res => {
              if(res.data == "success"){
                this.$message({
                  message:'修改成功',
                  type:'success'
                });
              } else {
                this.$message.error('服务器响应失败');
              }
            });
            this.editEmpVisible = false;
            this.tableRenderData();
          },
          addEmp : function () {
            axios.get('getAllDeptForEmp').then(res => {
              var depts_tem = [{value:0,label:'请选择部门'}];
              this.emp.did = 0;
              this.role = 3;
              this.emp.ename = '';
              this.emp.job = '';
              res.data.forEach(function (item, index) {
                depts_tem.push({value:item.did, label:item.dname});
              });
              this.depts_forAdd = depts_tem;
            });
            this.addEmpVisiable = true;
          },
          cancelAdd : function() {
            this.addEmpVisiable = false;
          },
          addConfirm : function() {
            axios.post('addEmp',qs.stringify({ename:this.emp.ename,
              did:this.emp.did, job:this.emp.job, role:this.role})).then(res => {
              if(res.data == "success"){
                this.$message({
                  message:'添加成功',
                  type:'success'
                });
              } else {
                this.$message.error('服务器响应失败');
              }
            });
            this.addEmpVisiable = false;
            this.tableRenderData();
          },
          handleSelectionChange: function(val) {
            this.multipleSelection =  val;
          },
          delEmps : function () {
            if(this.multipleSelection.length == 0){
              this.$message({
                message:'请选择账户进行删除'
              })
            } else {
              var uids = [];
              this.multipleSelection.forEach( function (item, index){
                uids.push(item.eid);
              });
              this.empDelIds = uids;
              this.delEmpsVisiable = true;
              this.delCascade = true;
            }
          },
          cancelDelEmps : function() {
            this.delEmpsVisiable = false;
          },
          delEmpsConfirm : function() {
            if(this.delCascade){
              axios.post('delEmpsByIdsCascade',qs.stringify({eids:this.empDelIds},{indices:false})).then(res => {
                if(res.data == "success"){
                  this.$message({
                    message:'删除成功',
                    type:'success'
                  });
                } else {
                  this.$message.error('服务器响应失败');
                }
              })
            } else {
              axios.post('delEmpsByIds',qs.stringify({eids:this.empDelIds},{indices:false})).then(res => {
                if(res.data == "success"){
                  this.$message({
                    message:'删除成功',
                    type:'success'
                  });
                } else {
                  this.$message.error('服务器响应失败');
                }
              })
            }
            this.delEmpsVisiable = false;
            this.tableRenderData();
          },
          didFormat : function(row, column) {
              var dept_name = '';
              this.depts.forEach(function (item, index) {
                if(item.value == row.did){
                  dept_name = item.label;
                }
              });
              return dept_name;
          },
          handleSizeChange : function (val) {
            this.size = val;
            this.tableRenderData();
          },
          handleCurrentChange : function (val) {
            this.current = val;
            this.tableRenderData();
          }
        },
        mounted() {
          this.tableRenderData();
          this.deptRenderData();
        }
    }
</script>

<style scoped>

</style>
