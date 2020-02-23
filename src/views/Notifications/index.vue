<template>
  <div class="Notifications">
    <el-card v-loading="isLogin">
      <div slot="header" class="clearfix">
        <h2>通知中心<el-button style="float: right;margin-top:10px;" size="small" @click="ReadAll" :disabled="bellnum">全部标记为已读</el-button></h2>
        </div>
        <div class="notifi" v-for="item in belllist" :key="item.id">
          <div class="notifi-content">
            <div class="notifi-left">
            <p style="font-size:18px;">{{item.title}}</p>
            <p style="color: #909399;font-size:15px;">{{item.desc}}</p>
            </div>
            <div class="notifi-right" v-if="!item.hasRead">
              <el-Button size="small" @click="ReadById(item.id)">标记为已读</el-Button>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
  </el-card>
  </div>
</template>

<script>

export default {
  name: 'Notifications',
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    this.getNotifications()
  },
  methods: {
    // 获取通知
    getNotifications () {
      this.$store.dispatch('notifications/getlist')
    },
    // 全部标记为已读
    ReadAll () {
      this.$store.dispatch('notifications/readAll')
    },
    // 根据ID标记已读
    ReadById (id) {
      this.$store.dispatch('notifications/readById', id)
    }
  },
  computed: {
    belllist () {
      return this.$store.state.notifications.list
    },
    bellnum () {
      return this.$store.state.notifications.list.filter(item => { return !item.hasRead }).length <= 0
    }
  }
}
</script>
<style lang="less" scoped>
.notifi{
  padding-bottom:40px;
}
.notifi-content{
  display: flex;
  .notifi-right {
    display: flex;
    align-items: center;
  }
}
</style>
