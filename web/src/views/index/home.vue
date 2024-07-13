<template>
  <Header />
  <a-carousel class="homepage" autoplay ref="carousel">
    <div v-for="(item, index) in carouselItems" :key="index" class="carousel-item">
      <img :src="item.image" class="carousel-image" />
      <div class="carousel-text">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </a-carousel>
  <a-button class="enterBtn" type="primary" @click="handleEnter()" shape="round">开始学习</a-button>
</template>

<script setup lang="ts">
// 导入图片资源和组件
import carousel01 from "/@/assets/images/Image_1715812747861.jpg";
import carousel02 from "/@/assets/images/100543859_p1.jpg";
import Header from "/@/views/index/components/header.vue";

// 导入路由功能
const router = useRouter();

/**
 * 处理进入按钮的点击事件
 * 跳转到门户页面
 */
const handleEnter = () => {
  router.push({ name: 'portal' }); // 导航到名称为'portal'的路由
};

// 定义轮播图项目数组
const carouselItems = [
  {
    image: carousel01,   // 轮播图项目1的图片
    title: '',           // 轮播图项目1的标题
    description: '',     // 轮播图项目1的描述
  },
  {
    image: carousel02,   // 轮播图项目2的图片
    title: '',           // 轮播图项目2的标题
    description: ' ',    // 轮播图项目2的描述
  },
];
</script>

<style scoped>
  .ant-carousel .carousel-item {
    position: relative;
    text-align: center;
  }

  .enterBtn {
    position: absolute;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 50%;
    bottom: 0;
    width: 200px;
    height: 50px;
  }

  .ant-carousel .carousel-image {
    width: 95%;
    max-height: 70%;
    display: block;
    margin: auto;
  }

  .homepage {
    width: 100%;
    height: 90%;
  }

  .ant-carousel .carousel-text {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .ant-carousel .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .ant-carousel .carousel-control.prev {
    left: 10px;
  }

  .ant-carousel .carousel-control.next {
    right: 10px;
  }
</style>
