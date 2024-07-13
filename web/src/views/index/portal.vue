<template>
  <div class="portal">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
// 导入组件
import Header from '/@/views/index/components/header.vue';
import Footer from '/@/views/index/components/footer.vue';
import Content from '/@/views/index/components/content.vue';

export default {
  // 注册组件
  components: {
    Footer,   // 页脚组件
    Header,   // 页头组件
    Content,  // 内容组件
  },
  // 定义组件的数据
  data() {
    return {};
  },
};
</script>


<style scoped lang="less"></style>
