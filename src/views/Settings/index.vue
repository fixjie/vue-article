<template>
  <el-card>
    <div slot="header"
         class="clearfix">
      <h2>个人设置</h2>
      <el-row type="flex"
              justify="center">
        <el-upload v-loading="isUploading"
                   class="avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :before-upload="beforeAvatarUpload"
                   :http-request="handUpload"
                   accept="image/*">
          <img v-if="newAvatar"
               :src="newAvatar"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-row>
      <el-row type="flex"
              justify="center"
              style="margin-top:20px;">
        <el-button type="primary"
                   :disabled="isUploading" @click="saveAvatar">保存头像</el-button>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Settings',
  data () {
    return {
      isUploading: false,
      newAvatar: this.$store.state.user.avatar
    }
  },
  methods: {
    handUpload ({ file }) {
      this.isUploading = true
      const fromdata = new FormData()
      fromdata.append('Token', '4dfe149d01f1167118fc5e6958ec094753ecd4f9:05a2Gm1vvTEPuPx99W_njJwFDc4=:eyJkZWFkbGluZSI6MTU4MTkyNDk1NSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA5ODc5IiwiYWlkIjoiMTY2NDE5NCIsImZyb20iOiJmaWxlIn0=')
      fromdata.append('file', file)
      axios.post('http://up.imgapi.com/', fromdata).then(resp => {
        if (resp.status === 200) {
          this.newAvatar = resp.data.linkurl
          this.isUploading = false
        }
      }).catch(() => {
        this.isUploading = false
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    saveAvatar () {
      this.$store.dispatch('user/save_avatar', this.newAvatar)
    }
  },
  computed: {
  }
}
</script>
<style lang="less" scoped>
.el-card,
.el-card__body {
  height: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: auto;
  min-width: 100px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: auto;
  min-width: 100px;
  height: 200px;
  display: block;
}
</style>
