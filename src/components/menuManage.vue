<template>

  <div>
    <el-row>
      <el-col :span="14" align="left" :offset="2">
        <el-select v-model="role" @change="tableRenderData">
          <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" >
        <el-button @click="add()" >添加菜单</el-button>
        <el-button @click="dels()" >删除菜单</el-button>
      </el-col>
    </el-row>

    <br />

    <el-table ref="multipleTable" :data="tableData.slice((current-1)*size,current*size)"
              border style="width: 100%" max-height="380"
              :default-sort="{prop:'mid',order:'ascending'}"  @selection-change="handleSelectionChange"
              row-key="mid" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed prop="mid" label="编号"></el-table-column>
      <el-table-column fixed prop="path" label="路由" width="300px"></el-table-column>
      <el-table-column prop="nameZh" label="名称"></el-table-column>
      <el-table-column prop="parentId" label="父组件编号"></el-table-column>
      <el-table-column fixed="right" prop="component" label="组件"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>

`    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>

    <el-dialog title="添加菜单" :visible.sync="addVisiable" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="中文名称" label-width="100px">
              <el-input v-model="addData.nameZh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="英文名称" label-width="100px">
              <el-input v-model="addData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="请求路径" label-width="100px">
              <el-input v-model="addData.path"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="组件名称" label-width="100px">
              <el-input v-model="addData.component"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="父组件编号" label-width="100px">
              <el-input v-model="addData.parentId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="菜单图标" label-width="100px">
              <el-select v-model="addData.iconCls">
                <el-option value="el-icon-view"><span style="float: left; color: #8492a6; font-size: 13px">请选择图标</span></el-option>
                <el-option value="el-icon-edit"> <i class="el-icon-edit"></i></el-option>
                <el-option value="el-icon-view"> <i class="el-icon-view"></i></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="菜单角色" label-width="100px">
              <el-select v-model="addData.role">
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

    <el-dialog title="修改菜单" :visible.sync="editVisiable" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="中文名称" label-width="100px">
              <el-input v-model="editData.nameZh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="英文名称" label-width="100px">
              <el-input v-model="editData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="请求路径" label-width="100px">
              <el-input v-model="editData.path"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="组件名称" label-width="100px">
              <el-input v-model="editData.component"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="父组件编号" label-width="100px">
              <el-input v-model="editData.parentId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="菜单图标" label-width="100px">
              <el-select v-model="editData.iconCls">
                <el-option value="el-icon-view"><span style="float: left; color: #8492a6; font-size: 13px">请选择图标</span></el-option>
                <el-option value="el-icon-edit"> <i class="el-icon-edit"></i></el-option>
                <el-option value="el-icon-view"> <i class="el-icon-view"></i></el-option>
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

    <el-dialog title="删除菜单" :visible.sync="delsVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除所有选中的数据吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDels()">取 消</el-button>
        <el-button @click="delsConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除菜单" :visible.sync="delVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDel()">取 消</el-button>
        <el-button @click="delConfirm()">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
    import axios from 'axios';
    import qs from 'qs';

    export default {
        name: "menuManage",
      data(){
        return {
          dialogCenter: true,

          roles:[{value:0,label:'管理员'},{value:1,label:'教师'},{value:2,label:'经理'},{value:3,label:'学生'}],
          role:0,

          total:0,
          size:5,
          current:1,
          tableData:[],
          multipleSelection:[],

          addVisiable:false,
          addData:{path:'',name:'',nameZh:'',iconCls:'',component:'',parentId:0, role:0},
          delsVisiable:false,
          delsData:[],
          editVisiable:false,
          editData:{ term:{}, courses:[], checkedCourses:[]},
          delVisiable:false,
          delData:0
        }
      },
      methods:{
        tableRenderData : function () {
          axios.get('/getMenu/' + this.role).then(res => {
            this.tableData = res.data;
            this.total = this.tableData.length;
          })
        },

        handleSelectionChange : function (val) {
          this.multipleSelection = val;
        },
        handleSizeChange : function(val) {
          this.size = val;
          this.current = 1;
        },
        handleCurrentChange : function(val) {
          this.current = val;
          this.tableRenderData();
        },

        add : function () {
          this.addVisiable = true;
          this.addData = {path:'',name:'',nameZh:'',iconCls:'',component:'',parentId:0, role:0}
        },
        cancelAdd : function () {
          this.addVisiable = false;
        },
        addConfirm : function () {
          axios.post('addMenu',qs.stringify(this.addData)).then(res => {
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
          var mids = [];
          this.delsData.forEach(function (item, index) {
            mids.push(item.mid);
          });
          axios.post('delMenuByIds',qs.stringify({mids:mids, role:this.role},{indices:false})).then(res => {
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
          this.delData = row.mid;
        },
        cancelDel : function () {
          this.delVisiable = false;
        },
        delConfirm : function () {
          axios.get('delMenuById?mid=' + this.delData + '&role=' + this.role).then(res => {
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
          axios.get('getMenuById?mid=' + row.mid).then(res => {
            this.editData = res.data;
          });
          this.editVisiable = true;
        },
        cancelEdit : function () {
          this.editVisiable = false;
        },
        eidtConfirm : function () {
          axios.post('editMenu',qs.stringify(this.editData)).then(res => {
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
      }
    }
</script>

<style scoped>

</style>
