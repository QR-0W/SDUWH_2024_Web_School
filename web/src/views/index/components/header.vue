<template>
  <!-- 主导航栏视图 -->
  <div class="main-bar-view">
    <!-- 网站logo部分 -->
    <div class="logo">
      <!-- logo图片，点击跳转到主页 -->
      <img :src="logoImage" class="search-icon" @click="$router.push({ name: 'portal' })" />
    </div>
    <!-- 搜索输入区域 -->
    <div class="search-entry">
      <!-- 搜索图标 -->
      <img :src="SearchIcon" class="search-icon" />
      <!-- 搜索输入框，按回车触发搜索方法 -->
      <input placeholder="输入关键词" ref="keywordRef" @keyup.enter="search" />
    </div>
    <!-- 右侧操作区域 -->
    <div class="right-view">
      <!-- 家教入驻按钮，非用户角色5时显示 -->
      <a-button v-if="userStore.user_role != '5'" type="link" @click="handleJoin()">家教入驻</a-button>
      <!-- 用户登录后显示的部分 -->
      <template v-if="userStore.user_token">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <!-- 用户头像 -->
            <img :src="AvatarIcon" class="self-img" />
          </a>
          <!-- 下拉菜单 -->
          <template #overlay>
            <a-menu>
              <!-- 个人中心 -->
              <a-menu-item>
                <a @click="goUserCenter()">个人中心</a>
              </a-menu-item>
              <!-- 退出登录 -->
              <a-menu-item>
                <a @click="quit()">退出</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <!-- 用户未登录时显示的登录按钮 -->
      <template v-else>
        <button class="login btn hidden-sm" @click="goLogin()">登录</button>
      </template>

      <!-- 消息图标，点击打开消息抽屉 -->
      <div v-if="userStore.user_token" class="right-icon" @click="msgVisible = true">
        <img :src="MessageIcon" />
        <span class="msg-point" style=""></span>
      </div>
      <!-- 消息抽屉 -->
      <div v-if="userStore.user_token">
        <a-drawer title="我的消息" placement="right" :closable="true" :maskClosable="true" :visible="msgVisible" @close="onClose">
          <a-spin :spinning="loading" style="min-height: 200px">
            <div class="list-content">
              <div class="notification-view">
                <div class="list">
                  <!-- 消息列表 -->
                  <div class="notification-item flex-view" v-for="item in msgData">
                    <div class="content-box">
                      <div class="header">
                        <span class="title-txt">{{ item.title }}</span>
                        <br />
                        <span class="time">{{ item.create_time }}</span>
                      </div>
                      <div class="head-text"> </div>
                      <div class="content">
                        <p>{{ item.content }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a-spin>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { listApi } from '/@/api/notice';
  import { useUserStore } from '/@/store';
  import logoImage from '/@/assets/images/logo2.svg';
  import SearchIcon from '/@/assets/images/search-icon.svg';
  import AvatarIcon from '/@/assets/images/avatar.jpg';
  import MessageIcon from '/@/assets/images/message-icon.svg';
  import { message } from 'ant-design-vue';

  const router = useRouter(); // 使用路由实例
  const route = useRoute(); // 使用当前路由信息
  const userStore = useUserStore(); // 使用用户状态管理

  const keywordRef = ref(); // 搜索关键词引用

  let loading = ref(false); // 加载状态
  let msgVisible = ref(false); // 消息抽屉可见状态
  let msgData = ref([] as any); // 消息数据

  onMounted(() => {
    getMessageList(); // 组件挂载时获取消息列表
  });

  // 获取消息列表的方法
  const getMessageList = () => {
    loading.value = true;
    listApi({})
      .then((res) => {
        msgData.value = res.data;
        loading.value = false;
      })
      .catch((err) => {
        console.log(err);
        loading.value = false;
      });
  };

  // 搜索方法
  const search = () => {
    const keyword = keywordRef.value.value;
    if (route.name === 'search') {
      router.push({ name: 'search', query: { keyword: keyword } });
    } else {
      let text = router.resolve({ name: 'search', query: { keyword: keyword } });
      window.open(text.href, '_blank');
    }
  };

  // 跳转到登录页面
  const goLogin = () => {
    router.push({ name: 'login' });
  };

  // 跳转到用户中心页面
  const goUserCenter = () => {
    console.log(userStore.user_role);
    if (userStore.user_role === '1' || userStore.user_role === '2') {
      router.push({ name: 'userInfoEditView' });
    } else if (userStore.user_role === '5') {
      router.push({ name: 'jiajiaoOrderView' });
    }
  };

  // 退出登录方法
  const quit = () => {
    userStore.logout().then((res) => {
      router.push({ name: 'portal' });
    });
  };

  // 关闭消息抽屉
  const onClose = () => {
    msgVisible.value = false;
  };

  // 处理家教入驻方法
  const handleJoin = () => {
    let userId = userStore.user_id;
    if (userId) {
      router.push({ name: 'jiajiaoRegister' });
    } else {
      message.warn('请先登录！');
    }
  };
</script>

<style scoped lang="less">
  .main-bar-view {
    position: fixed;
    top: 0;
    left: 0;
    height: 56px;
    width: 100%;
    background: #16265c;
    border-bottom: 1px solid #cedce4;
    padding-left: 48px;
    z-index: 16;
    display: flex;
    flex-direction: row;
    //justify-content: center; /*水平居中*/
    align-items: center;
    /*垂直居中*/
  }

  .logo {
    margin-right: 24px;

    img {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }

  .search-entry {
    position: relative;
    width: 400px;
    min-width: 200px;
    height: 32px;
    background: #ecf3fc;
    padding: 0 12px;
    border-radius: 16px;
    font-size: 0;
    cursor: pointer;

    img {
      max-width: 100%;
      height: auto;
    }

    .search-icon {
      width: 18px;
      margin: 7px 8px 0 0;
    }

    input {
      position: absolute;
      top: 4px;
      width: 85%;
      height: 24px;
      border: 0px;
      outline: none;
      color: #000;
      background: #ecf3fc;
      font-size: 14px;
    }
  }

  .right-view {
    padding-right: 36px;
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: flex-end;
    /* 内容右对齐 */

    .username {
      height: 32px;
      line-height: 32px;
      text-align: center;
    }

    button {
      outline: none;
      border: none;
      cursor: pointer;
    }

    img {
      cursor: pointer;
    }

    .right-icon {
      position: relative;
      width: 24px;
      margin: 4px 0 0 4px;
      cursor: pointer;
      display: inline-block;
      font-size: 0;

      span {
        position: absolute;
        right: -15px;
        top: -3px;
        font-size: 12px;
        color: #fff;
        background: #4684e2;
        border-radius: 8px;
        padding: 0 4px;
        height: 16px;
        line-height: 16px;
        font-weight: 600;
        min-width: 20px;
        text-align: center;
      }

      .msg-point {
        position: absolute;
        right: -4px;
        top: 0;
        min-width: 8px;
        width: 8px;
        height: 8px;
        background: #4684e2;
        border-radius: 50%;
      }
    }

    .self-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
    }

    .btn {
      background: #4684e2;
      font-size: 14px;
      color: #fff;
      border-radius: 32px;
      text-align: center;
      width: 66px;
      height: 32px;
      line-height: 32px;
      vertical-align: middle;
      margin-left: 32px;
    }
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

  .notification-item {
    padding-top: 16px;

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .content-box {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      border-bottom: 1px dashed #e9e9e9;
      padding: 4px 0 16px;
    }

    .header {
      margin-bottom: 12px;
    }

    .title-txt {
      color: #315c9e;
      font-weight: 500;
      font-size: 14px;
    }

    .time {
      color: #a1adc5;
      font-size: 14px;
    }

    .head-text {
      color: #152844;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;

      .name {
        margin-right: 8px;
      }
    }

    .content {
      margin-top: 4px;
      color: #484848;
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>
