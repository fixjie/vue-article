<template>
  <el-container >
    <el-header height="70px">
      <div class="header-logo">
        <img src="../assets/logoko.png" />
      </div>
      <div class="header-right">
        <el-dropdown trigger="click"
                     style="padding-left:10px;cursor: pointer;">
          <el-badge :value="bell"
                    class="badge-item el-dropdown-link"
                    :hidden="isHidden">
            <span class="el-dropdown-link">
              <el-avatar shape="square"
                         size="large"
                         :src="squareUrl"></el-avatar>欢迎您!{{userName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <span @click="linkPath('/notifications')">
              <el-dropdown-item icon="el-icon-bell">
                <el-badge :value="bell"
                          is-dot
                          class="badge-items"
                          :hidden="isHidden">通知中心</el-badge>

              </el-dropdown-item>
            </span>
            <span @click="linkPath('/settings')">
              <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            </span>
            <span @click="logout">
              <el-dropdown-item icon="el-icon-switch-button">退出登陆</el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="qs-container">
      <div class="content-left">
        <el-aside width="200px">
          <el-menu :default-active="$router.history.current.path">
            <span v-for="item1 in $router.options.routes"
                  :key="item1.path">
              <el-submenu :index="item1.path"
                          v-if="item1.isShow&&item1.children&&item1.children.length>1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item1.name}}</span>
                </template>
                <span v-for="item2 in item1.children" :key="item2.path">
                  <el-menu-item :index="item2.path"
                                v-if="item2.isShow"
                                @click="linkPath(item2path)">
                    <i :class="item2.icon"></i>
                    <span slot="title">{{item2.name}}</span>
                  </el-menu-item>
                </span>
              </el-submenu>
              <el-menu-item :index="item1.children[0].path"
                            v-if="item1.isShow&&item1.children&&item1.children.length===1"
                            @click="linkPath(item1.children[0].path)">
                <i :class="item1.children[0].icon"></i>
                <span slot="title">{{item1.children[0].name}}</span>
              </el-menu-item>
            </span>
          </el-menu>
        </el-aside>
      </div>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  beforeCreate () {
    // console.log(this.$store.state)
  },
  created () {
    this.getNotifications()
  },
  methods: {
    linkPath (path) {
      this.$router.push(path)
    },
    // 退出登陆
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    },
    // 获取通知
    getNotifications () {
      this.$store.dispatch('notifications/getlist')
    }
  },
  computed: {
    // 返回是否显示红点
    isHidden () {
      return this.bell <= 0
    },
    bell () {
      return this.$store.state.notifications.list.filter(item => { return !item.hasRead }).length || 0
    },
    squareUrl () {
      return this.$store.state.user.avatar
    },
    userName () {
      return this.$store.state.user.name
    }
  }
}
</script>

<style lang="less" scoped>
.qs-container {
  //内容定位
  height: 100% !important;
  position: fixed;
  top:70px;
  width: 100%;
  min-width: 1000px;
}
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dedede;
  display: flex;
  position: fixed;
  width: 100%;
  div {
    display: flex;
    align-items: center;
  }
  .header-logo {
    // height: 100%;
    flex: 1;
    img {
      height: 70px;
      margin-left: -20px;
    }
  }
}
.el-aside {
  .el-menu {
    border: none;
  }
}
.content-left {
  height: 100%;
  background-color: white;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
.badge-item {
  margin-right: 20px;
}
.badge-items {
  text-align: center;
  margin-right: 10px;
}
</style>
