<template>
  <div class="user">
    <Header />

    <div class="user-content">
      <div class="user-content-left">
        <MineInfosView />
      </div>
      <div class="user-content-right">
        <router-view />
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
// 导入组件
import Header from '/@/views/index/components/header.vue';
import Footer from '/@/views/index/components/footer.vue';
import MineInfosView from '/@/views/index/user/jiajiaoInfosView.vue';

export default {
  // 注册组件
  components: {
    MineInfosView,
    Footer,
    Header,
  },
  // 定义组件的数据
  data() {
    return {
      collapsed: false, // 控制侧边栏是否折叠的状态
    };
  },
};
</script>


<style scoped lang="less">
  .user {
    display: block;
  }

  .user-content {
    display: flex;
    flex-direction: row;
    //background-color: #2a9a44;
    max-width: 1200px;
    min-width: 800px;
    margin: 80px auto;
    .user-content-left {
    }
    .user-content-right {
      flex: 1;
      padding-right: 20px;
    }
  }
</style>
