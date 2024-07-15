<template>
  <div class="content-list">
    <div class="list-title">我的积分</div>
    <div class="my-score-view">
      <div class="score-title">积分余额：{{ score }}</div>
    </div>
  </div>
</template>

<script setup>
// 导入必要的模块和工具
import { detailApi } from "/@/api/user";
import { useUserStore } from "/@/store";

// 获取路由和用户状态存储
const router = useRouter();
const userStore = useUserStore();

// 定义响应式变量
let score = ref(0); // 用户积分

// 组件挂载时执行的逻辑
onMounted(() => {
  getUserInfo(); // 获取用户信息
});

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  let userId = userStore.user_id; // 获取当前用户ID

  detailApi({ userId: userId })
    .then((res) => {
      if (res.data) {
        score.value = res.data.score; // 更新用户积分
      }
    })
    .catch((err) => {
      console.log(err); // 打印错误信息
    });
};
</script>


<style scoped lang="less">
  .flex-view {
    display: flex;
  }

  .content-list {
    flex: 1;

    .list-title {
      color: #152844;
      font-weight: 600;
      font-size: 18px;
      //line-height: 24px;
      height: 48px;
      margin-bottom: 4px;
      border-bottom: 1px solid #cedce4;
    }
  }

  .my-score-view {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-top: 16px;

    .score-title {
      color: #111111;
      font-size: 14px;
      font-weight: 700;
    }
  }
</style>
