<template>
  <div>
    <el-row>
      <el-col :span="14" :offset="2">
        <el-input placeholder="请输入学生姓名" v-model="sname" style="width: 300px">
          <el-button slot="append" @click="tableRenderData">查询</el-button>
        </el-input>
        <el-select v-model="term" @change="tableRenderData">
          <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" :offset="0">
        <el-button @click="add()" type="primary">添加学生</el-button>
        <el-button @click="adds()" >批量添加</el-button>
        <el-button @click="dels()" type="primary">删除学生</el-button>
      </el-col>
    </el-row>

    <br/>

    <el-table ref="multipleTable" :data="tableData" border style="width: 100%" max-height="420"
              :default-sort="{prop:'sid',order:'ascending'}"  @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed prop="sid" label="学号"></el-table-column>
      <el-table-column fixed prop="sname" label="姓名"></el-table-column>
      <el-table-column fixed="right" prop="tid" label="学期" :formatter="tidFormat"></el-table-column>
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

    <el-dialog title="添加学生" :visible.sync="addVisiable" width="50%" :center="dialogCenter">
      <el-form>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="姓名" label-width="50px">
              <el-input v-model="addData.sname" @blur="checkNameAdd" style="width: 300px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="学期" label-width="50px">
              <el-select v-model="addData.tid" style="width: 300px;">
                <el-option v-for="item in terms_add_edit" :key="item.value" :label="item.label" :value="item.value">
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

    <el-dialog title="批量添加" :visible.sync="addsVisiable" width="100%" :center="dialogCenter">
      <el-upload class="upload" action :multiple="false" :show-file-list="false"
                 accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                 :http-request="httpRequest">
        <el-button type="primary">上 传 表 格</el-button>
      </el-upload>
      <el-table :data="addsData">
        <el-table-column prop="sname" label="姓名"></el-table-column>
        <el-table-column prop="tname" label="学期"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addsConfirm()" type="primary">确 定</el-button>
        <el-button @click="cancelAdds()">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除学生" :visible.sync="delsVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除所有选中的数据吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delsConfirm()" type="primary">确 定</el-button>
        <el-button @click="cancelDels()">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除学生" :visible.sync="delVisiable" width="25%" :center="dialogCenter">
      <p><strong>确认删除吗？</strong></p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delConfirm()" type="primary">确 定</el-button>
        <el-button @click="cancelDel()">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改学生信息" :visible.sync="editVisiable" width="50%" :center="dialogCenter">
      <div slot="footer" class="dialog-footer">
        <el-form>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="学号" label-width="50px">
                <el-input v-model="editData.sid" readonly style="width: 300px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="姓名" label-width="50px">
                <el-input v-model="editData.sname" @blur="checkNameEdit" style="width: 300px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="学期" label-width="50px">
                <el-select v-model="editData.tid" style="width: 300px;">
                  <el-option v-for="item in terms_add_edit" :key="item.value" :label="item.label" :value="item.value">
                    <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
    name: "studentManage",
    data(){
      return {
        dialogCenter: true,

        sname:'',
        terms:[],
        term:-1,
        terms_add_edit:[],

        total:0,
        size:5,
        current:1,
        tableData:[],
        multipleSelection:[],

        addVisiable:false,
        addData:{ sname:'', tid:0},
        addsVisiable:false,
        addsData:[],
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
        axios.get('getAllStudent?current=' + this.current + '&size=' + this.size +
          '&sname=' + this.sname + '&tid=' + this.term).then(res => {
          this.tableData = res.data.records;
          this.current = res.data.current;
          this.size = res.data.size;
          this.total = res.data.total;
        })
      },
      termRenderData : function () {
        var term_tem = [{value:0,label:'未分配学期'},{value:-1,label:'请选择学期'}];
        axios.get('getAllTermForStudent').then(res => {
          res.data.forEach(function (item, index) {
            term_tem.push({value:item.tid, label:item.tname});
          })
        });
        this.terms = term_tem;
      },
      termsRenderData : function() {
        var term_tem = [{value:0,label:'未分配学期'}];
        axios.get('getAllTermForStudent').then(res => {
          res.data.forEach(function (item, index) {
            term_tem.push({value:item.tid, label:item.tname});
          })
        });
        this.terms_add_edit = term_tem;
      },
      handleSelectionChange : function (val) {
        this.multipleSelection = val;
      },
      tidFormat : function(row, column) {
        var term_name = '';
        this.terms.forEach(function (item, value) {
          if(item.value == row.tid){
            term_name = item.label;
          }
        });
        return term_name;
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
        this.addData = { sname:'', tid:0};
        this.addVisiable = true;
      },
      cancelAdd : function () {
        this.addVisiable = false;
      },
      checkNameAdd : function () {
        if(this.addData.sname == ""){
          this.$message('姓名不能为空');
          return false;
        } else {
          return true;
        }
      },
      addConfirm : function () {
        if(this.checkNameAdd() == true){
          axios.post('addStudent',qs.stringify(this.addData)).then(res => {
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

      adds : function() {
        this.addsData = [];
        this.addsVisiable = true;
      },
      cancelAdds : function() {
        this.addsVisiable = false;
      },
      addsConfirm : function() {
        var data = this.addsData;
        if(data.length == 0){
          this.$message('请上传文件');
          return false;
        }
        var term = this.terms;
        var saveData = [];
        data.forEach(function (dataitem, index) {
          var tid = 0;
          term.forEach(function (termitem, index) {
            if(dataitem.tname == termitem.label){
              tid = termitem.value;
            }
          });
          saveData.push({sname:dataitem.sname, tid:tid});
        });
        axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'post',
          url: 'addStudents',
          data: JSON.stringify(saveData)
        }).then(res => {
          if(res.data == "success"){
            this.$message({
              message:'添加成功',
              type:'success'
            });
          } else {
            this.$message.error('服务器响应失败');
          }
        });
        this.addsVisiable = false;
        this.tableRenderData();
      },

      dels : function () {
        this.delsData = [];
        if(this.multipleSelection.length == 0){
          this.$message("请选择学生进行删除")
        } else {
          this.delsVisiable = true;
          this.delsData = this.multipleSelection;
        }
      },
      cancelDels : function () {
        this.delsVisiable = false;
      },
      delsConfirm : function () {
        var sids = [];
        this.delsData.forEach(function (item, index) {
          sids.push(item.sid);
        });
        axios.post('delStudentsByIds',qs.stringify({sids:sids},{indices:false})).then(res => {
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
        this.delData = row.sid;
      },
      cancelDel : function () {
        this.delVisiable = false;
      },
      delConfirm : function () {
        axios.get('delStudentById?sid=' + this.delData).then(res => {
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
        axios.get('getSelf?sid=' + row.sid).then(res => {
          this.editData = res.data;
        });
        this.editVisiable = true;
      },
      cancelEdit : function () {
        this.editVisiable = false;
      },
      checkNameEdit : function() {
        if(this.editData.sname == ""){
          this.$message('姓名不能为空');
          return false;
        } else {
          return true;
        }
      },
      eidtConfirm : function () {
        if(this.checkNameEdit() == true){
          axios.post('updateSelf',qs.stringify(this.editData)).then(res => {
            if(res.data == "修改信息成功"){
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

      httpRequest(e) {
        let file = e.file; // 文件信息
        if (!file) {
          // 没有文件
          return false;
        } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
          // 格式根据自己需求定义
          this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
          return false;
        }
        const fileReader = new FileReader();
        var this_ = this;
        fileReader.onload = ev => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: "binary" // 以字符编码的方式解析
            });
            const exlname = workbook.SheetNames[0]; // 取第一张表
            var exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]); // 生成json表格内容
            //excel转为json数据，记住header中的label一定要和excel中的表头汉字一致，不然无法匹配
            var showdata = [];
            exl.forEach(function (item, index) {
              showdata.push({sname:item['姓名'], tname:item['学期']});
            });
            this.addsData = showdata;
          } catch (e) {
            this.$message.error('失败');
            return false;
          }
        };
        fileReader.readAsBinaryString(file);
      }
    },
    mounted() {
      this.tableRenderData();
      this.termRenderData();
      this.termsRenderData();
    }
  }
</script>

<style scoped>

</style>
