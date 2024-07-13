<template>
  <!-- 详情页面的主要容器 -->
  <div class="detail">
    <!-- 引入头部组件 -->
    <Header />
    <div class="detail-content">
      <div class="detail-content-top">
        <div style="position: relative">
          <div class="thing-infos-view">
            <div class="thing-infos">
              <!-- 展示事物图片 -->
              <div class="thing-img-box">
                <img :src="detailData.cover" />
              </div>
              <!-- 展示事物信息 -->
              <div class="thing-info-box">
                <div class="thing-state">
                  <span class="state hidden-sm">信息状态</span>
                  <span>有效</span>
                </div>
                <h1 class="thing-name">{{ detailData.title }}</h1>
                <span>
                  <span class="a-price-symbol"></span>
                  <span class="a-price" style="font-size: 20px">{{ detailData.price }}元/时</span>
                </span>
                <!-- 展示年级信息 -->
                <div class="translators flex-view" style="">
                  <span>年级:</span>
                  <span class="name">{{ classification_title }}</span>
                </div>
                <!-- 展示性别信息 -->
                <div class="translators flex-view" style="">
                  <span>性别：</span>
                  <span class="name">{{ detailData.sex }}</span>
                </div>
                <!-- 展示年龄信息 -->
                <div class="translators flex-view" style="">
                  <span>年龄：</span>
                  <span class="name">{{ detailData.age }}岁</span>
                </div>
                <!-- 展示地区信息 -->
                <div class="translators flex-view" style="">
                  <span>地区：</span>
                  <span class="name">{{ detailData.location }}</span>
                </div>
                <!-- 如果当前用户不是发布者，显示联系和下单按钮 -->
                <div v-if="route.query.id.trim() != userStore.user_id" class="flex-view">
                  <button class="buy-btn" @click="handleOrder(detailData)">
                    <img :src="AddIcon" />
                    <span>立即联系</span>
                  </button>
                  <button class="buy-btn" @click="createOrder">
                    <img :src="AvatarIcon" />
                    <span>现在下单</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- 展示心愿单、收藏和分享功能 -->
            <div class="thing-counts hidden-sm">
              <div class="count-item flex-view pointer" @click="addToWish()">
                <div class="count-img">
                  <img :src="WantIcon" />
                </div>
                <div class="count-box flex-view">
                  <div class="count-text-box">
                    <span class="count-title">加入心愿单</span>
                  </div>
                  <div class="count-num-box">
                    <span class="num-text">{{ detailData.wishCount }}</span>
                  </div>
                </div>
              </div>
              <div class="count-item flex-view pointer" @click="collect()">
                <div class="count-img">
                  <img :src="RecommendIcon" />
                </div>
                <div class="count-box flex-view">
                  <div class="count-text-box">
                    <span class="count-title">收藏</span>
                  </div>
                  <div class="count-num-box">
                    <span class="num-text">{{ detailData.collectCount }}</span>
                  </div>
                </div>
              </div>
              <div class="count-item flex-view" @click="share()">
                <div class="count-img">
                  <img :src="ShareIcon" />
                </div>
                <div class="count-box flex-view">
                  <div class="count-text-box">
                    <span class="count-title">分享</span>
                  </div>
                  <div class="count-num-box">
                    <span class="num-text"></span>
                    <img :src="WeiboShareIcon" class="mg-l" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 详情页面的底部内容，包括简介和评论 -->
      <div class="detail-content-bottom">
        <div class="thing-content-view flex-view">
          <div class="main-content">
            <div class="order-view main-tab">
              <!-- 选项卡导航 -->
              <span
                class="tab"
                :class="selectTabIndex === index ? 'tab-select' : ''"
                v-for="(item, index) in tabData"
                :key="index"
                @click="selectTab(index)"
              >
                {{ item }}
              </span>
              <span :style="{ left: tabUnderLeft + 'px' }" class="tab-underline"></span>
            </div>

            <!-- 简介内容 -->
            <div class="thing-intro" :class="selectTabIndex <= 0 ? '' : 'hide'">
              <p class="text" style="">{{ detailData.description }}</p>
            </div>

            <!-- 评论内容 -->
            <div class="thing-comment" :class="selectTabIndex > 0 ? '' : 'hide'">
              <div class="title">发表新的评论</div>
              <div class="publish flex-view">
                <img :src="AvatarIcon" class="mine-img" />
                <input placeholder="说点什么..." class="content-input" ref="commentRef" />
                <button class="send-btn" @click="sendComment()">发送</button>
              </div>
              <div class="tab-view flex-view">
                <div class="count-text">共有{{ commentData.length }}条评论</div>
                <div class="tab-box flex-view" v-if="commentData.length > 0">
                  <span :class="sortIndex === 0 ? 'tab-select' : ''" @click="sortCommentList('recent')">最新</span>
                  <div class="line"></div>
                  <span :class="sortIndex === 1 ? 'tab-select' : ''" @click="sortCommentList('hot')">热门</span>
                </div>
              </div>
              <div class="comments-list">
                <!-- 评论列表 -->
                <div class="comment-item" v-for="item in commentData">
                  <div class="flex-item flex-view">
                    <img :src="AvatarIcon" class="avator" />
                    <div class="person">
                      <div class="name">{{ item.username }}</div>
                      <div class="time">{{ item.commentTime }}</div>
                    </div>
                    <div class="float-right">
                      <span @click="like(item.id)">推荐</span>
                      <span class="num">{{ item.likeCount }}</span>
                    </div>
                  </div>
                  <p class="comment-content">{{ item.content }}</p>
                </div>
                <div class="infinite-loading-container">
                  <div class="infinite-status-prompt" style="">
                    <div slot="no-results" class="no-results">
                      <div></div>
                      <p>没有更多了</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 热门推荐内容 -->
          <div class="recommend" style="">
            <div class="title">热门推荐</div>
            <div class="things">
              <div class="thing-item thing-item" v-for="item in recommendData" @click="handleDetail(item)">
                <div class="img-view">
                  <img :src="item.cover" />
                </div>
                <div class="info-view">
                  <h3 class="thing-name">{{ item.title.substring(0, 12) }}</h3>
                  <span>
                    <span class="a-price-symbol"></span>
                    <span class="a-price">{{ item.price }}元/时</span>&nbsp;
                    <span class="a-price">{{ item.location }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 引入页脚组件 -->
    <Footer />
  </div>
</template>

<script setup>
// 导入所需模块和组件
import { message, Modal } from "ant-design-vue";
import Header from "/@/views/index/components/header.vue";
import Footer from "/@/views/index/components/footer.vue";
import AddIcon from "/@/assets/images/add.svg";
import WantIcon from "/@/assets/images/want-read-hover.svg";
import RecommendIcon from "/@/assets/images/recommend-hover.svg";
import ShareIcon from "/@/assets/images/share-icon.svg";
import WeiboShareIcon from "/@/assets/images/wb-share.svg";
import AvatarIcon from "/@/assets/images/avatar.jpg";
import { detailApi, listApi as listThingList } from "/@/api/thing";
import { createApi as createCommentApi, likeApi, listThingCommentsApi } from "/@/api/comment";
import { wishApi } from "/@/api/thingWish";
import { collectApi } from "/@/api/thingCollect";
import { BASE_URL } from "/@/store/constants";
import { useRoute, useRouter } from "vue-router/dist/vue-router";
import { useUserStore } from "/@/store";
import { getFormatTime } from "/@/utils";

// 初始化变量和状态
const router = useRouter(); // 路由对象，用于导航
const route = useRoute(); // 当前路由信息
const userStore = useUserStore(); // 用户状态存储

// 定义响应式变量
let thingId = ref(''); // 事物ID
let detailData = ref({}); // 详情数据
let tabUnderLeft = ref(6); // 选项卡下划线位置
let tabData = ref(['简介', '评论']); // 选项卡数据
let selectTabIndex = ref(0); // 选中的选项卡索引
let classification_title = ref(''); // 分类标题

let commentData = ref([]); // 评论数据
let recommendData = ref([]); // 推荐数据
let sortIndex = ref(0); // 排序索引
let order = ref('recent'); // 默认排序方式为最新

let commentRef = ref(); // 评论输入框引用

// 页面加载时获取详情、推荐和评论数据
onMounted(() => {
  thingId.value = route.query.id.trim(); // 获取事物ID
  getThingDetail(); // 获取事物详情
  getRecommendThing(); // 获取推荐事物
  getCommentList(); // 获取评论列表
});

/**
 * 切换选项卡
 * @param {number} index 选项卡索引
 */
const selectTab = (index) => {
  selectTabIndex.value = index; // 设置选中的选项卡索引
  tabUnderLeft.value = 6 + 54 * index; // 更新下划线位置
};

/**
 * 获取事物详情数据
 */
const getThingDetail = () => {
  detailApi({ id: thingId.value })
    .then((res) => {
      detailData.value = res.data;
      detailData.value.cover = BASE_URL + '/api/staticfiles/image/' + detailData.value.cover;
      if (detailData.classificationId == '1') {
        classification_title.value = '小学';
      } else if (detailData.value.classificationId == '2') {
        classification_title.value = '初中';
      } else if (detailData.value.classificationId == '3') {
        classification_title.value = '高中';
      }
      console.log(detailData.value.classificationId);
      console.log(classification_title.value);
      console.log(detailData.value);
    })
    .catch((err) => {
      message.error('获取详情失败');
    });
};

/**
 * 创建订单
 */
const createOrder = () => {
  // 跳转到支付页面
  let text = router.resolve({ name: 'pay', query: { id: thingId.value } });
  window.open(text.href, '_blank');
};

/**
 * 加入心愿单
 */
const addToWish = () => {
  let userId = userStore.user_id;
  if (userId) {
    wishApi({ thingId: thingId.value, userId: userId })
      .then((res) => {
        message.success(res.msg);
        getThingDetail(); // 更新详情数据
      })
      .catch((err) => {
        console.log('操作失败');
      });
  } else {
    message.warn('请先登录');
  }
};

/**
 * 收藏功能
 */
const collect = () => {
  let userId = userStore.user_id;
  if (userId) {
    collectApi({ thingId: thingId.value, userId: userId })
      .then((res) => {
        message.success(res.msg);
        getThingDetail(); // 更新详情数据
      })
      .catch((err) => {
        console.log('收藏失败');
      });
  } else {
    message.warn('请先登录');
  }
};

/**
 * 分享功能
 */
const share = () => {
  let content = '分享一个非常好玩的网站 ' + window.location.href;
  let shareHref = 'http://service.weibo.com/share/share.php?title=' + content;
  window.open(shareHref);
};

/**
 * 处理立即联系按钮的点击事件
 * @param {Object} detailData 事物详情数据
 */
const handleOrder = (detailData) => {
  console.log(detailData);
  const userId = userStore.user_id;

  if (userId) {
    Modal.info({
      title: '联系方式',
      content: '家教联系电话：' + detailData.mobile,
      onOk() {},
    });
  } else {
    message.warn('请先登录！');
  }
};

/**
 * 获取推荐的事物列表
 */
const getRecommendThing = () => {
  listThingList({ sort: 'recommend' })
    .then((res) => {
      res.data.forEach((item, index) => {
        if (item.cover) {
          item.cover = BASE_URL + '/api/staticfiles/image/' + item.cover;
        }
      });
      console.log(res);
      recommendData.value = res.data.slice(0, 4);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 处理详情页面的点击事件
 * @param {Object} item 事物项数据
 */
const handleDetail = (item) => {
  // 跳转到详情页面
  let text = router.resolve({ name: 'detail', query: { id: item.id } });
  window.open(text.href, '_blank');
};

/**
 * 发送评论
 */
const sendComment = () => {
  console.log(commentRef.value);
  let text = commentRef.value.value.trim();
  console.log(text);
  if (text.length <= 0) {
    return;
  }
  commentRef.value.value = '';
  let userId = userStore.user_id;
  if (userId) {
    createCommentApi({ content: text, thingId: thingId.value, userId: userId })
      .then((res) => {
        getCommentList(); // 更新评论列表
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    message.warn('请先登录！');
    router.push({ name: 'login' });
  }
};

/**
 * 点赞评论
 * @param {string} commentId 评论ID
 */
const like = (commentId) => {
  likeApi({ id: commentId })
    .then((res) => {
      getCommentList(); // 更新评论列表
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 获取评论列表
 */
const getCommentList = () => {
  listThingCommentsApi({ thingId: thingId.value, order: order.value })
    .then((res) => {
      res.data.forEach((item) => {
        item.commentTime = getFormatTime(item.commentTime, true);
      });
      commentData.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 切换评论排序方式
 * @param {string} sortType 排序类型
 */
const sortCommentList = (sortType) => {
  if (sortType === 'recent') {
    sortIndex.value = 0;
  } else {
    sortIndex.value = 1;
  }
  order.value = sortType;
  getCommentList(); // 更新评论列表
};
</script>

<style scoped lang="less">
  .hide {
    display: none;
  }

  .detail-content {
    display: flex;
    flex-direction: column;
    width: 1100px;
    margin: 4px auto;
  }

  .flex-view {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .hidden-lg {
    display: none !important;
  }

  .thing-infos-view {
    display: flex;
    margin: 89px 0 40px;
    overflow: hidden;

    .thing-infos {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: flex;
    }

    .mobile-share-box {
      height: 38px;
      background: transparent;
      padding: 0 16px;
      margin: 12px 0;
      font-size: 0;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;

      .state {
        width: 64px;
        height: 24px;
        line-height: 24px;
        background: rgba(70, 132, 226, 0.1);
        border-radius: 2px;
        font-weight: 500;
        font-size: 12px;
        color: #4684e2;
        text-align: center;
      }

      .share-img {
        background: #fff;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        text-align: center;

        img {
          position: relative;
          top: 4px;
          width: 24px;
        }
      }
    }

    .thing-img-box {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 235px;
      flex: 0 0 235px;
      margin: 0 40px 0 0;

      img {
        width: 220px;
        height: 200px;
        display: block;
        background-size: cover;
        object-fit: cover;
      }
    }

    .thing-info-box {
      text-align: left;
      padding: 0;
      margin: 0;
    }

    .thing-state {
      height: 26px;
      line-height: 26px;

      .state {
        font-weight: 500;
        color: #4684e2;
        background: rgba(70, 132, 226, 0.1);
        border-radius: 2px;
        padding: 5px 8px;
        margin-right: 16px;
      }

      span {
        font-size: 14px;
        color: #152844;
      }
    }

    .thing-name {
      line-height: 32px;
      margin: 16px 0;
      color: #0f1111 !important;
      font-size: 15px !important;
      font-weight: 400 !important;
      font-style: normal !important;
      text-transform: none !important;
      text-decoration: none !important;
    }

    .translators,
    .authors {
      line-height: 18px;
      font-size: 14px;
      margin: 8px 0;
      -webkit-box-align: start;
      -ms-flex-align: start;
      align-items: flex-start;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;

      .name {
        color: #315c9e;
        white-space: normal;
      }
    }

    .tags {
      position: absolute;
      bottom: 20px;
      margin-top: 16px;

      .category-box {
        color: #152844;
        font-size: 14px;

        .title {
          color: #787878;
        }
      }
    }

    .thing-counts {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 235px;
      flex: 0 0 235px;
      margin-left: 20px;
    }

    .pointer {
      cursor: pointer;
    }

    .count-item {
      height: 64px;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      cursor: pointer;
    }

    .count-img {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 32px;
      flex: 0 0 32px;
      margin-right: 24px;
      font-size: 0;

      img {
        width: 100%;
        display: block;
      }
    }

    .count-box {
      position: relative;
      border-bottom: 1px solid #cedce4;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      height: 100%;
    }

    .count-text-box {
      font-size: 0;

      .count-title {
        color: #152844;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        display: block;
        height: 18px;
      }
    }

    .count-num-box {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #152844;
    }
  }

  .buy-btn {
    cursor: pointer;
    display: block;
    background: #4684e2;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    width: 110px;
    outline: none;
    border: none;
    margin-top: 18px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .buy-btn img {
    width: 12px;
    margin-right: 2px;
    vertical-align: middle;
  }

  .buy-btn span {
    vertical-align: middle;
  }

  .buy-way {
    overflow: hidden;

    .title {
      font-weight: 600;
      font-size: 18px;
      height: 26px;
      line-height: 26px;
      color: #152844;
      margin-bottom: 12px;
    }
  }

  .thing-content-view {
    margin-top: 40px;
    padding-bottom: 50px;
  }

  .main-content {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;

    .text {
      color: #484848;
      font-size: 16px;
      line-height: 26px;
      padding-left: 12px;
      margin: 11px 0;
      white-space: pre-wrap;
    }
  }

  .main-tab {
    border-bottom: 1px solid #cedce4;
  }

  .order-view {
    position: relative;
    color: #6c6c6c;
    font-size: 14px;
    line-height: 40px;

    .title {
      margin-right: 8px;
    }

    .tab {
      margin-right: 20px;
      cursor: pointer;
      color: #5f77a6;
      font-size: 16px;
      cursor: pointer;
    }

    .tab-select {
      color: #152844;
      font-weight: 600;
    }

    .tab-underline {
      position: absolute;
      bottom: 0;
      left: 84px;
      width: 16px;
      height: 4px;
      background: #4684e2;
      -webkit-transition: left 0.3s;
      transition: left 0.3s;
    }
  }

  .recommend {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 235px;
    flex: 0 0 235px;
    margin-left: 20px;

    .title {
      font-weight: 600;
      font-size: 18px;
      line-height: 26px;
      color: #152844;
      margin-bottom: 12px;
    }

    .things {
      border-top: 1px solid #cedce4;

      .thing-item {
        min-width: 255px;
        max-width: 255px;
        position: relative;
        flex: 1;
        margin-right: 20px;
        height: fit-content;
        overflow: hidden;
        margin-top: 26px;
        margin-bottom: 36px;
        padding-bottom: 24px;
        border-bottom: 1px #e1e1e1 solid;
        cursor: pointer;

        .img-view {
          //background: #f3f3f3;
          //text-align: center;
          height: 200px;
          width: 255px;
          //border: 1px #f3f3f3 solid;

          img {
            height: 200px;
            width: 255px;
            overflow: hidden;
            margin: 0 auto;
            background-size: contain;
            object-fit: contain;
          }
        }

        .info-view {
          //background: #f6f9fb;
          overflow: hidden;
          padding: 0 16px;

          .thing-name {
            line-height: 32px;
            margin-top: 12px;
            color: #0f1111 !important;
            font-size: 15px !important;
            font-weight: 400 !important;
            font-style: normal !important;
            text-transform: none !important;
            text-decoration: none !important;
          }

          .price {
            color: #ff7b31;
            font-size: 20px;
            line-height: 20px;
            margin-top: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .translators {
            color: #6f6f6f;
            font-size: 12px;
            line-height: 14px;
            margin-top: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .flex-view {
    display: flex;
  }

  .thing-comment {
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      height: 22px;
      color: #152844;
      margin: 24px 0 12px;
    }

    .publish {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .mine-img {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 40px;
        flex: 0 0 40px;
        margin-right: 12px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }

      .content-input {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        background: #f6f9fb;
        border-radius: 4px;
        height: 32px;
        line-height: 32px;
        color: #484848;
        padding: 5px 12px;
        white-space: nowrap;
        outline: none;
        border: 0px;
      }

      .send-btn {
        margin-left: 10px;
        background: #4684e2;
        border-radius: 4px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 80px;
        flex: 0 0 80px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        height: 32px;
        line-height: 32px;
        outline: none;
        border: 0px;
        cursor: pointer;
      }
    }

    .tab-view {
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      font-size: 14px;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin: 24px 0;

      .count-text {
        color: #484848;
        float: left;
      }

      .tab-box {
        color: #5f77a6;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        .tab-select {
          color: #152844;
        }

        span {
          cursor: pointer;
        }
      }

      .line {
        width: 1px;
        height: 12px;
        margin: 0 12px;
        background: #cedce4;
      }
    }
  }

  .comments-list {
    .comment-item {
      .flex-item {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 16px;

        .avator {
          -webkit-box-flex: 0;
          -ms-flex: 0 0 40px;
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          margin-right: 12px;
          border-radius: 50%;
          cursor: pointer;
        }

        .person {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }

        .name {
          color: #152844;
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;
          height: 22px;
          cursor: pointer;
        }

        .time {
          color: #5f77a6;
          font-size: 12px;
          line-height: 16px;
          height: 16px;
          margin-top: 2px;
        }

        .float-right {
          color: #4684e2;
          font-size: 14px;
          float: right;

          span {
            margin-left: 19px;
            cursor: pointer;
          }

          .num {
            color: #152844;
            margin-left: 6px;
            cursor: auto;
          }
        }
      }
    }
  }

  .comment-content {
    margin-top: 8px;
    color: #484848;
    font-size: 14px;
    line-height: 22px;
    padding-bottom: 16px;
    border-bottom: 1px dashed #cedce4;
    margin-left: 52px;
    overflow: hidden;
    word-break: break-word;
  }

  .infinite-loading-container {
    clear: both;
    text-align: center;
  }

  .a-price-symbol {
    top: -0.5em;
    font-size: 12px;
  }

  .a-price {
    color: #0f1111;
    font-size: 14px;
  }
</style>
