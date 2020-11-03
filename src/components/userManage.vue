<template>
  <div>
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :offset="1">
        <el-input placeholder="请输入用户名" v-model="uname" style="width: 300px">
          <el-button slot="append" @click="tableRenderData">查询</el-button>
        </el-input>
        <el-select v-model="role" @change="tableRenderData">
          <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="5">
        <el-button @click="addUser" >添加用户</el-button>
        <el-button @click="deleteUsers" >删除用户</el-button>
      </el-col>
    </el-row>

    <el-table ref="multipleTable" :data="tableData" border style="width: 100%" max-height="600"
              :default-sort="{prop:'uid',order:'ascending'}"  @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed prop="uid" label="编号"></el-table-column>
      <el-table-column prop="uname" label="用户名"></el-table-column>
      <el-table-column prop="role" label="角色" :formatter="roleFormat"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">修改权限</el-button>
          <el-button @click="handleSetPwdDefault(scope.$index,scope.row)" type="text" size="small">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>

    <el-dialog title="删除用户" :visible.sync="delMsgVisible" width="25%" :center="dialogCenter">
      <p><strong>确认删除吗？</strong></p>
      <el-checkbox v-model="delCascade">级联删除账号所有信息</el-checkbox>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDel()">取 消</el-button>
        <el-button @click="delConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除用户" :visible.sync="delUsersVisible" width="25%" :center="dialogCenter">
      <p><strong>确认删除所有选中的数据吗？</strong></p>
      <el-checkbox v-model="delCascade">级联删除账号所有信息</el-checkbox>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDelUsers()">取 消</el-button>
        <el-button @click="delUsersConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加账户" :visible.sync="userAddVisible" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="姓名" label-width="50px">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="角色" label-width="50px">
              <el-select v-model="user.role">
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

    <el-dialog title="修改权限" :visible.sync="userEditVisible" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="账户" label-width="50px">
              <el-input v-model="editRowData.uname" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="角色" label-width="50px">
              <el-select v-model="editRowData.role">
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
    name: "userManage",
    data(){
      return {
        tableData:[],
        multipleSelection: [],
        current: 1,
        size: 5,
        total: 0,
        uname: '',
        delCascade:true,
        role:-1,
        roles:[{value:-1,label:'请选择角色'},
          {value:0,label:'管理员'},
          {value:1,label:'教师'},
          {value:2,label:'部门经理'},
          {value:3,label:'学生'}],
        delMsgVisible:false,
        delRowData:{},
        delRowsData:[],
        user:{name:'',role:3},
        userAddVisible:false,
        dialogCenter:true,
        delUsersVisible:false,
        userEditVisible:false,
        editRowData:{}
      }
    },
    methods:{
      cancelEdit: function(){
        this.userEditVisible = false;
        this.editRowData = {};
      },
      eidtConfirm: function(){
        axios.post('editUser',qs.stringify(this.editRowData)).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'修改成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.userEditVisible = false;
        this.editRowData = {};
      },
      addUser:function(){
        this.userAddVisible = true;
      },
      deleteUsers: function(){
        if(this.multipleSelection.length == 0){
          this.$message({
            message:'请选择账户进行删除'
          })
        } else {
          this.delUsersVisible = true;
          this.delRowsData = this.multipleSelection;
        }
      },
      handleSelectionChange: function(val) {
        this.multipleSelection =  val;
      },
      handleSizeChange: function(val) {
        this.size = val;
        this.tableRenderData();
      },
      handleCurrentChange: function(val){
        this.current = val;
        this.tableRenderData();
      },
      handleDelete:function (index, row) {
        this.delMsgVisible = true;
        this.delRowData = row;
      },
      handleEidt:function(index, row){
        this.userEditVisible = true;
        axios.get('getUserById?uid=' + row.uid).then(res => {
          this.editRowData = res.data;
        })
      },
      cancelDel: function(){
        this.delMsgVisible = false;
        this.delRowData = {};
        this.delCascade = true;
      },
      delConfirm: function(){
        this.delMsgVisible = false;
        if(this.delCascade){
          axios.get('delUserByIdCascade?uid=' + this.delRowData.uid).then(res => {
            if(res.data == "success"){
              this.$message({
                message:'删除成功',
                type:'success'
              });
            } else {
              this.$message.error('服务器响应失败');
            }
          })
        }else{
          axios.get('delUserById?uid=' + this.delRowData.uid).then(res => {
            if(res == "success"){
              this.$message({
                message:'删除成功',
                type:'success'
              })
            } else {
              this.message.error('服务器响应失败')
            }
          })
        }
        this.delRowData = {};
        this.delCascade = true;
        this.tableRenderData();
      },
      tableRenderData:function () {
        axios.get('getAllUser?current=' + this.current + '&size=' + this.size
          + '&role=' + this.role + "&uname=" + this.uname).then(res => {
          this.tableData = res.data.records;
          this.current = res.data.current;
          this.size = res.data.size;
          this.total = res.data.total;
        })
      },
      handleSetPwdDefault:function (index, row) {
        axios.get('setDefaultPwd?uid=' + row.uid).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'重置成功',
              type:'success'
            })
          } else {
            this.message.error('服务器响应失败')
          }
        })
      },
      addConfirm: function () {
        if(this.user.name == '' || this.user.role == -1) {
          this.$message({
            message:'请输入姓名和角色',
            type:'warning'
          })
        } else {
          axios.get('addUser?name=' + this.user.name + '&role=' + this.user.role).then(res => {
            if(res.data == "success"){
              this.$message({
                message:'添加成功',
                type:'success'
              });
            }else {
              this.$message.error('服务器响应失败');
            }
          })
        }
        this.userAddVisible = false;
        this.user.name = '';
        this.user.role = 3;
        this.tableRenderData();
      },
      cancelAdd:function () {
        this.userAddVisible = false;
        this.user.name = '';
        this.user.role = 3;
      },
      cancelDelUsers: function () {
        this.delRowsData = [];
        this.delUsersVisible = false;
        this.delCascade = true;
      },
      delUsersConfirm: function () {
        var uids = [];
        this.delRowsData.forEach( function (item, index){
          uids.push(item.uid);
        });
        if(this.delCascade){
          axios.post('delUsersByIdsCascade',qs.stringify({uids:uids},{indices: false})).then(res => {
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
          axios.post('delUsersByIds',qs.stringify({uids:uids},{indices:false})).then(res => {
            if(res == "success"){
              this.$message({
                message:'删除成功',
                type:'success'
              });
            } else {
              this.$message.error('服务器响应失败');
            }
          })
        }
        this.delRowsData = [];
        this.delCascade = true;
        this.tableRenderData();
      },
      roleFormat:function (row, column) {
        if(row.role == 0){
          return '管理员';
        } else if (row.role == 1){
          return '教师';
        } else if (row.role == 2){
          return '部门经理'
        } else {
          return '学生'
        }
      }
    },
    mounted() {
      this.tableRenderData();
    }
  }
</script>

<style scoped>

</style>
