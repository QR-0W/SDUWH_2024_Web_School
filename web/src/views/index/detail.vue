<template>
  <div class="detail">
    <!-- 头部组件 -->
    <Header />

    <div class="detail-content">
      <div class="detail-content-top">
        <div style="position: relative">
          <div class="thing-infos-view">
            <div class="thing-infos">
              <div class="thing-img-box">
                <!-- 事物图片 -->
                <img :src="detailData.cover" />
              </div>
              <div class="thing-info-box">
                <div class="thing-state">
                  <span class="state hidden-sm">信息状态</span>
                  <!-- 信息状态：有效 -->
                  <span>有效</span>
                </div>
                <!-- 事物标题 -->
                <h1 class="thing-name">{{ detailData.title }}</h1>
                <span>
                  <span class="a-price-symbol"></span>
                  <!-- 事物价格 -->
                  <span class="a-price" style="font-size: 20px">{{ detailData.price }}元/时</span>
                </span>
                <div class="translators flex-view" style="">
                  <span>科目：</span>
                  <!-- 事物科目 -->
                  <span class="name">{{ detailData.classification_title }}</span>
                </div>
                <div class="translators flex-view" style="">
                  <span>性别：</span>
                  <!-- 事物性别 -->
                  <span class="name">{{ detailData.sex }}</span>
                </div>
                <div class="translators flex-view" style="">
                  <span>年龄：</span>
                  <!-- 事物年龄 -->
                  <span class="name">{{ detailData.age }}岁</span>
                </div>
                <div class="translators flex-view" style="">
                  <span>地区：</span>
                  <!-- 事物地区 -->
                  <span class="name">{{ detailData.location }}</span>
                </div>
                <!-- 立即联系按钮 -->
                <button class="buy-btn" @click="handleOrder(detailData)">
                  <img :src="AddIcon" />
                  <span>立即联系</span>
                </button>
              </div>
            </div>
            <!-- 事物计数 -->
            <div class="thing-counts hidden-sm">
              <!-- 加入心愿单 -->
              <div class="count-item flex-view pointer" @click="addToWish()">
                <div class="count-img">
                  <img :src="WantIcon" />
                </div>
                <div class="count-box flex-view">
                  <div class="count-text-box">
                    <span class="count-title">加入心愿单</span>
                  </div>
                  <div class="count-num-box">
                    <!-- 心愿单数量 -->
                    <span class="num-text">{{ detailData.wishCount }}</span>
                  </div>
                </div>
              </div>
              <!-- 收藏 -->
              <div class="count-item flex-view pointer" @click="collect()">
                <div class="count-img">
                  <img :src="RecommendIcon" />
                </div>
                <div class="count-box flex-view">
                  <div class="count-text-box">
                    <span class="count-title">收藏</span>
                  </div>
                  <div class="count-num-box">
                    <!-- 收藏数量 -->
                    <span class="num-text">{{ detailData.collectCount }}</span>
                  </div>
                </div>
              </div>
              <!-- 分享 -->
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
      <div class="detail-content-bottom">
        <div class="thing-content-view flex-view">
          <div class="main-content">
            <div class="order-view main-tab">
              <!-- 选项卡 -->
              <span
                class="tab"
                :class="selectTabIndex === index ? 'tab-select' : ''"
                v-for="(item, index) in tabData"
                :key="index"
                @click="selectTab(index)"
              >
                {{ item }}
              </span>
              <!-- 选项卡下划线 -->
              <span :style="{ left: tabUnderLeft + 'px' }" class="tab-underline"></span>
            </div>

            <!-- 简介 -->
            <div class="thing-intro" :class="selectTabIndex <= 0 ? '' : 'hide'">
              <p class="text" style="">{{ detailData.description }}</p>
            </div>

            <!-- 评论 -->
            <div class="thing-comment" :class="selectTabIndex > 0 ? '' : 'hide'">
              <div class="title">发表新的评论</div>
              <div class="publish flex-view">
                <img :src="AvatarIcon" class="mine-img" />
                <!-- 评论输入框 -->
                <input placeholder="说点什么..." class="content-input" ref="commentRef" />
                <!-- 发送评论按钮 -->
                <button class="send-btn" @click="sendComment()">发送</button>
              </div>
              <div class="tab-view flex-view">
                <!-- 评论数量 -->
                <div class="count-text">共有{{ commentData.length }}条评论</div>
                <div class="tab-box flex-view" v-if="commentData.length > 0">
                  <!-- 最新、热门评论切换 -->
                  <span :class="sortIndex === 0 ? 'tab-select' : ''" @click="sortCommentList('recent')">最新</span>
                  <div class="line"></div>
                  <span :class="sortIndex === 1 ? 'tab-select' : ''" @click="sortCommentList('hot')">热门</span>
                </div>
              </div>
              <!-- 评论列表 -->
              <div class="comments-list">
                <div class="comment-item" v-for="item in commentData">
                  <div class="flex-item flex-view">
                    <img :src="AvatarIcon" class="avator" />
                    <div class="person">
                      <!-- 评论人信息 -->
                      <div class="name">{{ item.username }}</div>
                      <div class="time">{{ item.commentTime }}</div>
                    </div>
                    <div class="float-right">
                      <!-- 点赞 -->
                      <span @click="like(item.id)">推荐</span>
                      <!-- 点赞数量 -->
                      <span class="num">{{ item.likeCount }}</span>
                    </div>
                  </div>
                  <!-- 评论内容 -->
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
          <!-- 推荐 -->
          <div class="recommend" style="">
            <div class="title">热门推荐</div>
            <div class="things">
              <div class="thing-item thing-item" v-for="item in recommendData" @click="handleDetail(item)">
                <div class="img-view"> <img :src="item.cover" /></div>
                <div class="info-view">
                  <!-- 推荐事物标题 -->
                  <h3 class="thing-name">{{ item.title.substring(0, 12) }}</h3>
                  <span>
                    <span class="a-price-symbol"></span>
                    <!-- 推荐事物价格 -->
                    <span class="a-price">{{ item.price }}元/时</span>&nbsp;
                    <!-- 推荐事物地区 -->
                    <span class="a-price">{{ item.location }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部组件 -->
    <Footer />
  </div>
</template>

<script setup>
  import { message, Modal } from 'ant-design-vue';
  import Header from '/@/views/index/components/header.vue';
  import Footer from '/@/views/index/components/footer.vue';
  import AddIcon from '/@/assets/images/add.svg';
  import WantIcon from '/@/assets/images/want-read-hover.svg';
  import RecommendIcon from '/@/assets/images/recommend-hover.svg';
  import ShareIcon from '/@/assets/images/share-icon.svg';
  import WeiboShareIcon from '/@/assets/images/wb-share.svg';
  import AvatarIcon from '/@/assets/images/avatar.jpg';
  import { computed, ref, reactive, onMounted } from 'vue';

  // 页面相关数据
  const detailData = reactive({
    cover: '',
    title: '',
    price: 0,
    classification_title: '',
    sex: '',
    age: 0,
    location: '',
    description: '',
    wishCount: 0,
    collectCount: 0,
  });

  // 评论数据
  const commentData = reactive([]);
  // 推荐数据
  const recommendData = reactive([]);

  // 页面选项卡数据
  const tabData = ['简介', '评论'];

  // 选中的选项卡索引
  let selectTabIndex = ref(0);

  // 选项卡下划线位置
  let tabUnderLeft = computed(() => {
    return selectTabIndex.value * 64;
  });

  // 排序索引（最新或热门评论）
  let sortIndex = ref(0);

  // 获取事物详情
  const getDetail = () => {
    // 发送请求获取详情数据的逻辑
    // 示例数据
    detailData.cover = '/static/images/thing-cover.jpg';
    detailData.title = '示例事物标题';
    detailData.price = 50;
    detailData.classification_title = '数学';
    detailData.sex = '男';
    detailData.age = 25;
    detailData.location = '北京';
    detailData.description = '这是一个示例事物的简介。';
    detailData.wishCount = 100;
    detailData.collectCount = 200;

    // 获取评论数据
    getComments();

    // 获取推荐数据
    getRecommend();
  };

  // 获取评论数据
  const getComments = () => {
    // 发送请求获取评论数据的逻辑
    // 示例数据
    commentData.push({
      username: '用户1',
      commentTime: '2024-07-11',
      likeCount: 10,
      content: '这是一个示例评论。',
    });
    commentData.push({
      username: '用户2',
      commentTime: '2024-07-12',
      likeCount: 5,
      content: '这是另一个示例评论。',
    });
  };

  // 获取推荐数据
  const getRecommend = () => {
    // 发送请求获取推荐数据的逻辑
    // 示例数据
    recommendData.push({
      cover: '/static/images/recommend-cover1.jpg',
      title: '推荐事物1标题',
      price: 60,
      location: '上海',
    });
    recommendData.push({
      cover: '/static/images/recommend-cover2.jpg',
      title: '推荐事物2标题',
      price: 70,
      location: '广州',
    });
  };

  // 选择选项卡
  const selectTab = (index) => {
    selectTabIndex.value = index;
  };

  // 排序评论列表
  const sortCommentList = (type) => {
    if (type === 'recent') {
      sortIndex.value = 0;
      // 最新排序逻辑
      // 示例：根据评论时间排序
      commentData.sort((a, b) => new Date(b.commentTime) - new Date(a.commentTime));
    } else if (type === 'hot') {
      sortIndex.value = 1;
      // 热门排序逻辑
      // 示例：根据点赞数量排序
      commentData.sort((a, b) => b.likeCount - a.likeCount);
    }
  };

  // 发表评论
  const sendComment = () => {
    const content = $refs.commentRef.value.trim();
    if (!content) {
      message.warning('请输入评论内容');
      return;
    }
    // 发送评论的逻辑
    // 示例：成功后更新评论列表
    commentData.unshift({
      username: '当前用户',
      commentTime: new Date().toLocaleDateString(),
      likeCount: 0,
      content: content,
    });
    $refs.commentRef.value = '';
  };

  // 加入心愿单
  const addToWish = () => {
    // 示例：加入心愿单的逻辑
    Modal.success({
      content: '成功加入心愿单！',
    });
  };

  // 收藏
  const collect = () => {
    // 示例：收藏的逻辑
    Modal.success({
      content: '成功收藏！',
    });
  };

  // 分享
  const share = () => {
    // 示例：分享的逻辑
    Modal.success({
      content: '分享成功！',
    });
  };

  // 立即联系
  const handleOrder = (item) => {
    // 示例：立即联系的逻辑
    Modal.success({
      content: '立即联系成功！',
    });
  };

  // 处理详情跳转
  const handleDetail = (item) => {
    // 示例：处理详情跳转的逻辑
    console.log('跳转到详情页：', item.title);
  };

  // 页面加载时获取详情数据
  onMounted(() => {
    getDetail();
  });

  // 导出相关方法和数据
  return {
    Header,
    Footer,
    AddIcon,
    WantIcon,
    RecommendIcon,
    ShareIcon,
    WeiboShareIcon,
    AvatarIcon,
    detailData,
    commentData,
    recommendData,
    tabData,
    selectTabIndex,
    tabUnderLeft,
    sortIndex,
    selectTab,
    sortCommentList,
    sendComment,
    addToWish,
    collect,
    share,
    handleOrder,
    handleDetail,
  };
</script>

<style scoped lang="scss">
  /* 样式可以根据实际需要进行调整 */
  .detail {
    width: 100%;
    .detail-content {
      max-width: 1200px;
      margin: 0 auto;
      .detail-content-top {
        padding: 20px;
        background-color: #fff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      }
      .detail-content-bottom {
        padding: 20px;
        margin-top: 20px;
        background-color: #fff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      }
      .detail-content-top .thing-img-box {
        width: 50%;
        float: left;
      }
      .detail-content-top .thing-info-box {
        width: 50%;
        float: right;
      }
      .detail-content-top .thing-infos {
        width: 100%;
      }
      .detail-content-bottom .thing-content-view .main-content {
        width: 100%;
        background-color: #fff;
      }
      .detail-content-bottom .thing-content-view .recommend {
        width: 30%;
        margin-left: 10px;
        background-color: #fff;
        float: right;
      }
      .detail-content-top .thing-infos .thing-img-box img {
        width: 100%;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-state {
        color: #f60;
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 10px;
        text-align: center;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-name {
        color: #333;
        font-size: 20px;
        line-height: 30px;
        margin: 15px 0;
        text-align: center;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-name span {
        font-size: 20px;
        color: #f60;
      }
      .detail-content-top .thing-infos .thing-info-box .translators .name {
        color: #666;
        font-size: 14px;
        margin-left: 10px;
      }
      .detail-content-top .thing-infos .thing-info-box .buy-btn {
        background-color: #f60;
        border: none;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        margin-top: 20px;
        padding: 0 25px;
        text-align: center;
        text-decoration: none;
        transition: background-color 0.3s;
      }
      .detail-content-top .thing-infos .thing-info-box .buy-btn img {
        vertical-align: middle;
        margin-right: 5px;
      }
      .detail-content-top .thing-infos .thing-info-box .buy-btn:hover {
        background-color: #f90;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-counts .count-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-counts .count-item .count-img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-counts .count-item .count-text {
        font-size: 14px;
        color: #666;
        line-height: 30px;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-counts .count-item .count-value {
        font-size: 16px;
        color: #333;
        line-height: 30px;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-counts .count-item .count-value:first-child {
        margin-right: 20px;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-counts .count-item .count-value span {
        font-size: 20px;
        color: #f60;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-counts .count-item:hover .count-value span {
        color: #f90;
      }
      .detail-content-top .thing-infos .thing-info-box .thing-counts .count-item .count-value img {
        vertical-align: middle;
        margin-right: 5px;
      }
      .detail-content-bottom .tab .nav-tab {
        padding-bottom: 15px;
        border-bottom: 2px solid #f60;
      }
      .detail-content-bottom .tab .nav-tab ul {
        display: flex;
        justify-content: space-between;
        padding: 0;
        margin: 0;
        list-style: none;
      }
      .detail-content-bottom .tab .nav-tab ul li {
        cursor: pointer;
        padding: 10px 20px;
        font-size: 16px;
        color: #333;
        transition: color 0.3s;
      }
      .detail-content-bottom .tab .nav-tab ul li:hover {
        color: #f60;
      }
      .detail-content-bottom .tab .nav-tab .under {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: #f60;
        transition: transform 0.3s, width 0.3s;
      }
      .detail-content-bottom .tab .nav-tab .under-line {
        width: 64px;
        transform: translateX(0);
      }
      .detail-content-bottom .tab .nav-tab ul li:nth-child(2) {
        cursor: pointer;
      }
      .detail-content-bottom .tab .tab-content {
        margin-top: 20px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane {
        display: none;
      }
      .detail-content-bottom .tab .tab-content .tab-pane.active {
        display: block;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-input {
        margin-top: 20px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-input textarea {
        width: 100%;
        height: 100px;
        padding: 10px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #ccc;
        resize: none;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-input .send-btn {
        cursor: pointer;
        background-color: #f60;
        border: none;
        color: #fff;
        font-size: 16px;
        padding: 8px 15px;
        margin-left: 10px;
        transition: background-color 0.3s;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-input .send-btn:hover {
        background-color: #f90;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list {
        margin-top: 20px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item {
        padding: 15px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item:last-child {
        border-bottom: none;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info {
        flex: 1;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info .user-info {
        margin-bottom: 5px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info .user-info .username {
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info .user-info .time {
        color: #999;
        font-size: 14px;
        margin-left: 10px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info .comment-content {
        margin-top: 5px;
        color: #666;
        font-size: 14px;
        line-height: 20px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info .comment-footer {
        margin-top: 10px;
        color: #999;
        font-size: 14px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info .comment-footer .action {
        margin-right: 10px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info .comment-footer .action .icon {
        margin-right: 5px;
        vertical-align: middle;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .comment-list .comment-item .comment-info .comment-footer .action .like {
        color: #f60;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .recommend {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #f5f5f5;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      }
      .detail-content-bottom .tab .tab-content .tab-pane .recommend .recommend-title {
        font-size: 18px;
        color: #333;
        margin-bottom: 10px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .recommend .recommend-item {
        width: 100%;
        margin-top: 10px;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .recommend .recommend-item:hover {
        transform: translateY(-5px);
      }
      .detail-content-bottom .tab .tab-content .tab-pane .recommend .recommend-item .recommend-img {
        width: 100%;
        height: 160px;
        margin-bottom: 10px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .recommend .recommend-item .recommend-title {
        font-size: 16px;
        color: #333;
        line-height: 20px;
        margin-bottom: 10px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .recommend .recommend-item .recommend-price {
        color: #f60;
        font-size: 16px;
      }
      .detail-content-bottom .tab .tab-content .tab-pane .recommend .recommend-item .recommend-location {
        color: #999;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
</style>
