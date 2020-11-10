<template>
  <div>
    <el-row>
      <el-col :span="15" :offset="1">
        <el-input placeholder="请输入课程名称" v-model="cname" style="width: 200px">
          <el-button slot="append" @click="tableRenderData">查询</el-button>
        </el-input>
        <el-select v-model="type" @change="tableRenderData"  style="width: 200px">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
        <el-select v-model="isdel" @change="tableRenderData"  style="width: 200px">
          <el-option v-for="item in isdels" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" >
        <el-button @click="add()" type="primary">添加课程</el-button>
        <el-button @click="dels()" >删除课程</el-button>
      </el-col>
    </el-row>

    <br />

    <el-table ref="multipleTable" :data="tableData" border style="width: 100%" max-height="420"
              :default-sort="{prop:'cid',order:'ascending'}"  @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed prop="cid" label="编号"></el-table-column>
      <el-table-column fixed prop="cname" label="名称"></el-table-column>
      <el-table-column fixed="right" prop="type" label="类型" :formatter="typeFormat"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="current" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="size"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"
                    align="center"></el-pagination>

    <el-dialog title="添加课程" :visible.sync="addVisiable" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="名称" label-width="50px">
              <el-input v-model="addData.cname" @blur="checkNameAdd" style="width: 300px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="类型" label-width="50px">
              <el-select v-model="addData.type" style="width: 300px;">
                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                  <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addConfirm()" type="primary">确 定</el-button>
        <el-button @click="cancelAdd()">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除课程" :visible.sync="delsVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除所有选中的数据吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delsConfirm()" type="primary">确 定</el-button>
        <el-button @click="cancelDels()">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除课程" :visible.sync="delVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delConfirm()" type="primary">确 定</el-button>
        <el-button @click="cancelDel()">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改课程信息" :visible.sync="editVisiable" width="50%" :center="dialogCenter">
        <el-form>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="编号" label-width="50px">
                <el-input v-model="editData.cid" readonly style="width: 300px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="名称" label-width="50px">
                <el-input v-model="editData.cname" @blur="checkNameEdit" style="width: 300px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="类型" label-width="50px">
                <el-select v-model="editData.type" style="width: 300px;">
                  <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                    <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="eidtConfirm()" type="primary">确 定</el-button>
        <el-button @click="cancelEdit()">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import XLSX from 'xlsx';

  export default {
    name: "courseManage",
    data(){
      return {
        dialogCenter: true,

        cname:'',
        types:[{value:0,label:'课程'},{value:1,label:'能力'}],
        type:0,
        isdel:0,
        isdels:[{value:0,label:'存在'},{value:1,label:'已删除'}],

        total:0,
        size:5,
        current:1,
        tableData:[],
        multipleSelection:[],

        addVisiable:false,
        addData:{ cname:'', type:0},
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
        axios.get('getAllCourse?current=' + this.current + '&size=' + this.size +
          '&cname=' + this.cname + '&type=' + this.type + '&isdel=' + this.isdel).then(res => {
          this.tableData = res.data.records;
          this.current = res.data.current;
          this.size = res.data.size;
          this.total = res.data.total;
        })
      },
      handleSelectionChange : function (val) {
        this.multipleSelection = val;
      },
      typeFormat : function(row, column) {
        var type_tem = '';
        this.types.forEach(function (item, value) {
          if(item.value == row.type){
            type_tem = item.label;
          }
        });
        return type_tem;
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
        this.addData.cname = '';
        this.addData.type = this.type;
        this.addVisiable = true;
      },
      cancelAdd : function () {
        this.addVisiable = false;
      },
      checkNameAdd : function () {
        if(this.addData.cname == ""){
          this.$message('课程名不能为空');
          return false;
        } else {
          return true;
        }
      },
      addConfirm : function () {
        if(this.checkNameAdd() == true){
          axios.get('selectForAdd?name=' + this.addData.cname).then(responce => {
            if(responce.data == "no"){
              this.$message("该课程名已经存在");
              return false;
            }else {
              axios.post('addCourse',qs.stringify(this.addData)).then(res => {
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
          });
        }
      },

      dels : function () {
        this.delsData = [];
        if(this.multipleSelection.length == 0){
          this.$message("请选择课程进行删除")
        } else {
          this.delsVisiable = true;
          this.delsData = this.multipleSelection;
        }
      },
      cancelDels : function () {
        this.delsVisiable = false;
      },
      delsConfirm : function () {
        var cids = [];
        this.delsData.forEach(function (item, index) {
          cids.push(item.cid);
        });
        axios.post('delCoursesByIds',qs.stringify({cids:cids},{indices:false})).then(res => {
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
        this.delData = row.cid;
      },
      cancelDel : function () {
        this.delVisiable = false;
      },
      delConfirm : function () {
        axios.get('delCourseById?cid=' + this.delData).then(res => {
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
        this.editData = {};
        axios.get('getCourseById?cid=' + row.cid).then(res => {
          this.editData = res.data;
        });
        this.editVisiable = true;
      },
      cancelEdit : function () {
        this.editVisiable = false;
      },
      checkNameEdit : function () {
        if(this.editData.cname == ""){
          this.$message('课程名不能为空');
          return false;
        } else {
          return true;
        }
      },
      eidtConfirm : function () {
        if(this.checkNameEdit() == true){
          axios.get('selectForAdd?name=' + this.addData.cname).then(responce => {
            if(responce.data == "no"){
              this.$message("该课程名已经存在");
              return false;
            }else {
              axios.post('editCourse',qs.stringify(this.editData)).then(res => {
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
          });
        }
      },

    },
    mounted() {
      this.tableRenderData();
    }
  }
</script>

<style scoped>

</style>
