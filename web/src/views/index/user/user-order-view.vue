<template>
  <div>
    <!--页面区域-->
    <div class="page-view">
      <div class="table-operations">
        <a-space>
          <!--          <a-button type="primary" @click="handleAdd">模拟新增</a-button>-->
          <a-button @click="handleBatchDelete">批量删除</a-button>
        </a-space>
      </div>
      <a-table
        size="middle"
        rowKey="id"
        :loading="data.loading"
        :columns="columns"
        :data-source="data.tagList"
        :scroll="{ x: 'max-content' }"
        :row-selection="rowSelection"
        :pagination="{
          size: 'default',
          current: data.page,
          pageSize: data.pageSize,
          onChange: (current) => (data.page = current),
          showSizeChanger: false,
          showTotal: (total) => `共${total}条数据`,
        }"
      >
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.key === 'status'">
            <a-tag :color="text === '2' ? '#2db7f5' : '#87d068'">
              {{ text === '2' ? '已支付' : '已取消' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'operation'">
            <span>
              <a-popconfirm title="确定取消?" ok-text="是" cancel-text="否" @confirm="confirmCancel(record)">
                <a>取消</a>
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除?" ok-text="是" cancel-text="否" @confirm="confirmDelete(record)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入必要的模块和工具
import { message } from "ant-design-vue";
import { cancelApi, deleteApi, listApi } from "/@/api/order";
import { getFormatTime } from "/@/utils";

// 定义表格列配置
const columns = reactive([
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
  },
  {
    title: '用户',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
  },
  {
    title: '商品',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    customRender: ({ text }) => (text ? text.substring(0, 10) + '...' : '--'),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: '订单时间',
    dataIndex: 'orderTime',
    key: 'orderTime',
    align: 'center',
    customRender: ({ text }) => getFormatTime(text, true),
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'operation',
    align: 'center',
    fixed: 'right',
    width: 120,
  },
]);

// 页面数据
const data = reactive({
  tagList: [], // 订单数据列表
  loading: false, // 加载状态
  keyword: '', // 搜索关键字
  selectedRowKeys: [] as any[], // 选中的行键数组
  pageSize: 10, // 每页显示数量
  page: 1, // 当前页码
});

// 组件挂载时执行的逻辑
onMounted(() => {
  getDataList(); // 获取订单数据列表
});

/**
 * 获取订单数据列表
 */
const getDataList = () => {
  data.loading = true; // 设置加载状态为true
  listApi({
    keyword: data.keyword,
  })
    .then((res) => {
      data.loading = false; // 设置加载状态为false
      console.log(res);
      res.data.forEach((item: any, index: any) => {
        item.index = index + 1; // 为每个订单项添加序号
      });
      data.tagList = res.data; // 更新订单数据列表
    })
    .catch((err) => {
      data.loading = false; // 设置加载状态为false
      console.log(err);
    });
};

// 表格行选择配置
const rowSelection = ref({
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    data.selectedRowKeys = selectedRowKeys; // 更新选中的行键数组
  },
});

/**
 * 确认取消订单
 * @param {Object} record 订单记录
 */
const confirmCancel = (record: any) => {
  cancelApi({ id: record.id })
    .then((res) => {
      getDataList(); // 刷新订单列表
      message.success('取消成功'); // 显示取消成功的消息
    })
    .catch((err) => {
      message.error(err.msg || '操作失败'); // 显示操作失败的消息
    });
};

/**
 * 确认删除订单
 * @param {Object} record 订单记录
 */
const confirmDelete = (record: any) => {
  console.log('delete', record);
  deleteApi({ ids: record.id })
    .then((res) => {
      getDataList(); // 刷新订单列表
    })
    .catch((err) => {
      message.error(err.msg || '操作失败'); // 显示操作失败的消息
    });
};

/**
 * 处理添加操作
 */
const handleAdd = () => {
  // 示例代码，未实现具体功能
  // createApi({
  //   thingId: 1,
  //   userId: 2,
  //   count: 1
  // }).then(res => {
  //   getDataList()
  // }).catch(err => {
  //
  // })
};

/**
 * 批量删除选中的订单
 */
const handleBatchDelete = () => {
  console.log(data.selectedRowKeys);
  if (data.selectedRowKeys.length <= 0) {
    console.log('hello');
    message.warn('请勾选删除项'); // 显示警告消息
    return;
  }
  deleteApi({ ids: data.selectedRowKeys.join(',') })
    .then((res) => {
      message.success('删除成功'); // 显示删除成功的消息
      data.selectedRowKeys = []; // 清空选中的行键数组
      getDataList(); // 刷新订单列表
    })
    .catch((err) => {
      message.error(err.msg || '操作失败'); // 显示操作失败的消息
    });
};
</script>


<style scoped lang="less">
  .page-view {
    min-height: 100%;
    background: #fff;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  .table-operations {
    margin-bottom: 16px;
    text-align: right;
  }

  .table-operations > button {
    margin-right: 8px;
  }
</style>
