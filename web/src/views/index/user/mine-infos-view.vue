<template>
  <div class="mine-infos-view">

    <!-- 个人信息区域 -->
    <div class="info-box flex-view">
      <!-- 用户头像 -->
<!--      <img :src="AvatarImg" class="avatar-img" />-->
      <img :src="avatarUrl" class="avatar-img" />
      <div class="name-box">
        <!-- 用户昵称 -->
        <h2 class="nick">{{ userStore.user_name }}</h2>
        <div class="age">
          <!-- 活跃天数 -->
          <span>活跃2天</span>
          <span class="give-point"></span>
        </div>
      </div>
    </div>

    <!-- 用户统计信息区域 -->
    <div class="counts-view">
      <div class="counts flex-view">
        <!-- 收藏数 -->
        <div class="fans-box flex-item" @click="clickMenu('collectThingView')">
          <div class="text">收藏</div>
          <div class="num">{{ collectCount }}</div>
        </div>
        <div class="split-line"></div>
        <!-- 心愿单数 -->
        <div class="follow-box flex-item" @click="clickMenu('wishThingView')">
          <div class="text">心愿单</div>
          <div class="num">{{ wishCount }}</div>
        </div>
        <!--
        <div class="split-line"></div>
        <div class="points-box flex-item">
          <div class="text">积分</div>
          <div class="num">0</div>
        </div>
        -->
      </div>
    </div>

    <!-- 个人设置区域 -->
    <div class="setting-box">
      <div class="title">个人设置</div>
      <div class="list">
        <!-- 编辑资料 -->
        <div class="mine-item flex-view" @click="clickMenu('userInfoEditView')">
          <img :src="SettingIconImage" alt="编辑资料" />
          <span>编辑资料</span>
        </div>
        <!-- 账号安全 -->
        <div class="mine-item flex-view" @click="clickMenu('securityView')">
          <img :src="SafeIconImage" alt="账号安全" />
          <span>账号安全</span>
        </div>
        <!-- 订单管理 -->
        <div class="mine-item flex-view" @click="clickMenu('userOrderView')">
          <img :src="MyOrderImg" alt="订单管理" />
          <span>订单管理</span>
        </div>
        <!-- 推送设置 -->
        <div class="mine-item flex-view" @click="clickMenu('pushView')">
          <img :src="PushIconImage" alt="推送设置" />
          <span>推送设置</span>
        </div>
        <!-- 消息管理 -->
        <div class="mine-item flex-view" @click="clickMenu('messageView')">
          <img :src="MessageIconImage" alt="消息查看" />
          <span>消息查看</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import AvatarImg from "/@/assets/images/avatar.jpg";
import MyOrderImg from "/@/assets/images/order-icon.svg";
import SettingIconImage from "/@/assets/images/setting-icon.svg";
import SafeIconImage from "/@/assets/images/setting-safe-icon.svg";
import PushIconImage from "/@/assets/images/setting-push-icon.svg";
import MessageIconImage from "/@/assets/images/setting-msg-icon.svg";

import { userCollectListApi } from "/@/api/thingCollect";
import { userWishListApi } from "/@/api/thingWish";
import { useUserStore } from "/@/store";
import { userAvatarApi } from "/@/api/user";

const userStore = useUserStore();
const router = useRouter();

let collectCount = ref(0);
let wishCount = ref(0);
let avatarUrl = ref("");

onMounted(() => {
  console.log("正在获取用户ID:", userStore.user_id); // 调试信息
  getUserAvatar();  // 获取用户信息，包含头像URL
  getCollectThingList();
  getWishThingList();
});

const clickMenu = (name) => {
  router.push({ name: name });
};

// 获取用户头像
const getUserAvatar = async () => {
  let userId = userStore.user_id;
  if (!userId) {
    console.log("用户ID未定义");
    return;
  }
  console.log("正在获取用户头像，用户ID:", userId); // 调试信息
  userAvatarApi({ userId: userId })
    .then((res) => {
      console.log("头像API返回数据:", res); // 调试信息
      if (res && res.data) {
        // 拼接完整的URL
        avatarUrl.value = `http://localhost:9101/api/staticfiles/avatar/${res.data}`;
        console.log("成功获取用户头像:", avatarUrl.value); // 调试信息
      } else {
        console.log("未能获取到用户头像数据");
      }
    })
    .catch((err) => {
      console.log("前端获取头像失败", err); // 调试信息
    });
};



const getCollectThingList = () => {
  let userId = userStore.user_id;
  userCollectListApi({ userId: userId })
    .then((res) => {
      collectCount.value = res.data.length;
    })
    .catch((err) => {
      console.log(err.msg);
    });
};

const getWishThingList = () => {
  let userId = userStore.user_id;
  userWishListApi({ userId: userId })
    .then((res) => {
      wishCount.value = res.data.length;
    })
    .catch((err) => {
      console.log(err.msg);
    });
};
</script>

<style lang="less" scoped>
.flex-view {
  display: flex;
}

.mine-infos-view {
  width: 235px;
  margin-right: 20px;
  border: 1px solid #cedce4;
  height: fit-content;

  .info-box {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 16px 16px 0;
    overflow: hidden;
  }

  .avatar-img {
    width: 48px;
    height: 48px;
    margin-right: 16px;
    border-radius: 50%;
  }

  .name-box {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;

    .nick {
      color: #152844;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0;
      overflow: hidden;
    }

    .age {
      font-size: 12px;
      color: #6f6f6f;
      height: 16px;
      line-height: 16px;
      margin-top: 8px;
    }

    .give-point {
      color: #4684e2;
      cursor: pointer;
      float: right;
    }
  }

  .counts-view {
    border: none;
    padding: 16px;
  }

  .counts {
    margin-top: 12px;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    .flex-item {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      cursor: pointer;
    }

    .text {
      height: 16px;
      line-height: 16px;
      color: #6f6f6f;
    }

    .num {
      height: 18px;
      line-height: 18px;
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      margin-top: 4px;
    }

    .split-line {
      width: 1px;
      height: 24px;
      background: #dae6f9;
    }
  }

  .intro-box {
    border-top: 1px solid #cedce4;
    padding: 16px;

    .title {
      color: #6f6f6f;
      font-size: 12px;
      line-height: 16px;
    }

    .intro-content {
      color: #152844;
      font-size: 14px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 8px 0;
    }
  }

  .create-box {
    cursor: pointer;
    border-top: 1px solid #cedce4;
    padding: 16px;

    .title {
      position: relative;
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      height: 18px;
    }

    .counts {
      margin-top: 12px;
      text-align: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .flex-item {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        cursor: pointer;
      }

      .split-line {
        width: 1px;
        height: 24px;
        background: #dae6f9;
      }
    }
  }

  .order-box {
    border-top: 1px solid #cedce4;
    padding: 16px;

    .title {
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      height: 18px;
      margin-bottom: 8px;
    }

    .list {
      padding-left: 16px;

      .mine-item {
        border-top: 1px dashed #cedce4;
        cursor: pointer;
        height: 48px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        img {
          width: 24px;
          margin-right: 8px;
          height: 24px;
        }

        span {
          color: #152844;
          font-size: 14px;
        }
      }

      .mine-item:first-child {
        border: none;
      }
    }
  }

  .setting-box {
    border-top: 1px solid #cedce4;
    padding: 16px;

    .title {
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      height: 18px;
      margin-bottom: 8px;
    }

    .list {
      padding-left: 16px;
    }

    .mine-item {
      border-top: 1px dashed #cedce4;
      cursor: pointer;
      height: 48px;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      img {
        width: 24px;
        margin-right: 8px;
        height: 24px;
      }

      span {
        color: #152844;
        font-size: 14px;
      }
    }

    .mine-item:first-child {
      border: none;
    }
  }
}
</style>
