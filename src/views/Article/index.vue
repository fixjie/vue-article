<template>
  <div class="Article">
    <el-card v-loading="isLogin">
      <div slot="header"
           class="clearfix">
        <h2>通知中心<el-button style="float: right;margin-top:5px;"
                     size="small"
                     @click="toExcel">导出表格</el-button>
        </h2>
      </div>
      <el-table :data="tablePage"
                style="width: 100%"
                border>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="author"
                         label="作者">
        </el-table-column>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column prop="amount"
                         label="阅读数">
        </el-table-column>
        <el-table-column prop="createAt"
                         label="发布时间">
          <!-- <template slot-scope="scope">
            <span>{{totime(scope.row.createAt)}}</span>
          </template> -->
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button @click="editArticle(scope.row)"
                       type="primary"
                       size="mini">编辑</el-button>
            <el-button type="danger"
                       size="mini"
                       @click="delArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:80px;margin-top:20px;">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageInfo.current"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="pageInfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pageInfo.total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="编辑文章"
               :visible.sync="dialogVisible"
               width="700px"
               :destroy-on-close="false"
               :modal-append-to-body='false'>
      <el-form :model="articleForm"
               :rules="rules"
               ref="articleForm"
               label-width="100px"
               class="demo-articleForm">
        <el-form-item label="作者"
                      prop="author">
          <el-input v-model="articleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="阅读量"
                      prop="amount">
          <el-input v-model.number="articleForm.amount"></el-input>
        </el-form-item>
        <el-form-item prop="createAt"
                      label="创建时间">
          <el-date-picker type="date"
                          disabled
                          placeholder="选择日期"
                          v-model="articleForm.createAt"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content">
          <div class="qf-editor">
            <wang-editor :content="articleContent" ref="getContent" />
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="onSubmitArticle">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getacticelist } from '../../api/article'
import moment from 'moment'
import XLSX from 'xlsx'
import wangEditor from '../../components/wangEditor'

export default {
  name: 'Article',
  components: {
    wangEditor
  },
  data () {
    return {
      isLogin: false,
      tableData: [],
      pageInfo: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      articleForm: {
        id: '',
        author: '',
        title: '',
        amount: '',
        createAt: '',
        content: ''
      },
      editor: null,
      dialogVisible: false,
      rules: {
        author: [
          { required: true, message: '作者名不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '阅读数不能为空', trigger: 'blur' }
        ],
        createAt: [
          { required: true, message: '发布时间不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '文章内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    // 获取文章列表
    getArticle () {
      this.isLogin = true
      getacticelist(this.pageInfo).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list.map(item => {
            item.createAt = this.totime(item.createAt)
            return item
          })
          this.pageInfo.total = res.data.total
        }
        this.isLogin = false
      }).catch(() => {
        this.isLogin = false
      })
    },
    // 转换时间格式
    totime (time) {
      return moment(time).format('YYYY/MM/DD HH:mm:ss')
    },
    // 修改每页条数
    handleSizeChange (size) {
      this.pageInfo.pageSize = size
      this.toTop()
    },
    // 修改页数
    handleCurrentChange (current) {
      this.pageInfo.current = current
      this.toTop()
    },
    // 改变页数或改变每页条数后，回滚到顶部
    toTop () {
      // 实现滚动效果
      let top = document.getElementsByClassName('el-main')[0].scrollTop || document.getElementsByClassName('el-main')[0].scrollTop
      const timeTop = setInterval(() => {
        document.getElementsByClassName('el-main')[0].scrollTop = document.getElementsByClassName('el-main')[0].scrollTop = top -= 80
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    // 导出表格
    toExcel () {
      const cols = ['作者', '标题', '阅读数', '发布时间']
      const dataSource = [cols]
      this.tableData.map(table => {
        dataSource.push([table.author, table.title, table.amount, moment(table.createAt).format('YYYY/MM/DD HH:mm:ss')])
        return null
      })
      // return console.log(tabledata)
      const ws = XLSX.utils.aoa_to_sheet(dataSource)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, 'sheetjs.xlsx')
    },
    // 删除文章
    delArticle (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tableData = []
        this.tableData.forEach(item => {
          if (item.id !== id) {
            tableData.push(item)
          }
        })
        this.tableData = tableData
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑文章
    editArticle (row) {
      this.articleForm = {
        id: '',
        author: '',
        title: '',
        amount: '',
        createAt: '',
        content: ''
      }
      this.articleForm = { ...row }
      this.dialogVisible = true
    },
    // 确定提交编辑的文章
    onSubmitArticle () {
      this.getContent()
      this.$refs.articleForm.validate((valid) => {
        if (valid) {
          this.tableData = this.tableData.map(item => {
            if (item.id === this.articleForm.id) {
              return this.articleForm
            } else {
              return item
            }
          })
          this.$message.success('修改成功')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取文章内容
    getContent () {
      // console.log(this.$refs.getContent.editor.txt.html())
      // const content = this.$refs.getContent.editorContent
      const content = this.$refs.getContent.editor.txt.html()
      this.articleForm.content = content
    }
  },
  computed: {
    tablePage () {
      return this.tableData.slice((this.pageInfo.current - 1) * this.pageInfo.pageSize, this.pageInfo.current * this.pageInfo.pageSize)
    },
    articleContent () {
      return this.articleForm.content
    }
  }
}
</script>
<style lang="less" scoped>
</style>
