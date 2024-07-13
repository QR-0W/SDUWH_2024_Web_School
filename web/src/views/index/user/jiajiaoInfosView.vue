<template>
  <div class="mine-infos-view">
    <div class="info-box flex-view">
      <img :src="AvatarImg" class="avatar-img" />
      <div class="name-box">
        <h2 class="nick">{{ userStore.user_name }}</h2>
        <div class="age">
          <span>入驻1天</span>
          <span class="give-point"></span>
        </div>
      </div>
    </div>
    <div class="setting-box">
      <div class="title">个人设置</div>
      <div class="list">
        <div class="mine-item flex-view" @click="clickMenu('jiajiaoEditView')">
          <img :src="SettingIconImage" alt="编辑资料" />
          <span>家教资料</span>
        </div>
        <div class="mine-item flex-view" @click="clickMenu('securityView')">
          <img :src="SafeIconImage" alt="账号安全" />
          <span>账号安全</span>
        </div>
        <div class="mine-item flex-view" @click="clickMenu('jiajiaoOrderView')">
          <img :src="MyOrderImg" alt="订单管理" />
          <span>订单管理</span>
        </div>
        <div class="mine-item flex-view" @click="clickMenu('pushView')">
          <img :src="PushIconImage" alt="推送设置" />
          <span>推送设置</span>
        </div>
        <div class="mine-item flex-view" @click="clickMenu('messageView')">
          <img :src="MessageIconImage" alt="消息管理" />
          <span>消息管理</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入必要的图像资源
import AvatarImg from "/@/assets/images/avatar.jpg";
import MyOrderImg from "/@/assets/images/order-icon.svg";
import SettingIconImage from "/@/assets/images/setting-icon.svg";
import SafeIconImage from "/@/assets/images/setting-safe-icon.svg";
import PushIconImage from "/@/assets/images/setting-push-icon.svg";
import MessageIconImage from "/@/assets/images/setting-msg-icon.svg";

// 导入API和状态管理
import { userCollectListApi } from "/@/api/thingCollect";
import { userWishListApi } from "/@/api/thingWish";
import { useUserStore } from "/@/store";

// 获取用户存储和路由对象
const userStore = useUserStore();
const router = useRouter();

// 定义响应式变量
let collectCount = ref(0); // 收藏数量
let wishCount = ref(0); // 心愿单数量

// 组件挂载时执行的逻辑
onMounted(() => {
  getCollectThingList(); // 获取收藏的事物列表
  getWishThingList(); // 获取心愿单列表
});

/**
 * 处理菜单点击事件
 * @param {string} name 路由名称
 */
const clickMenu = (name) => {
  router.push({ name: name }); // 跳转到指定路由
};

/**
 * 获取收藏的事物列表
 */
const getCollectThingList = () => {
  let userId = userStore.user_id; // 获取当前用户ID
  userCollectListApi({ userId: userId })
    .then((res) => {
      collectCount.value = res.data.length; // 更新收藏数量
    })
    .catch((err) => {
      console.log(err.msg); // 打印错误信息
    });
};

/**
 * 获取心愿单列表
 */
const getWishThingList = () => {
  let userId = userStore.user_id; // 获取当前用户ID
  userWishListApi({ userId: userId })
    .then((res) => {
      wishCount.value = res.data.length; // 更新心愿单数量
    })
    .catch((err) => {
      console.log(err.msg); // 打印错误信息
    });
};
</script>


<style scoped lang="less">
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
