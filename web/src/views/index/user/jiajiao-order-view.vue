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
// 导入必要的模块和组件
import { message } from "ant-design-vue";
import { cancelApi, deleteApi, listApi } from "/@/api/order";
import { getFormatTime } from "/@/utils";

// 定义表格列配置
const columns = reactive([
  {
    title: '序号', // 列标题
    dataIndex: 'index', // 数据索引
    key: 'index', // 键
    align: 'center', // 对齐方式
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
    customRender: ({ text }) => (text ? text.substring(0, 10) + '...' : '--'), // 自定义渲染，截取字符串
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
    customRender: ({ text }) => getFormatTime(text, true), // 自定义渲染，格式化时间
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
  tagList: [], // 标签列表
  loading: false, // 加载状态
  keyword: '', // 搜索关键字
  selectedRowKeys: [] as any[], // 选中的行键数组
  pageSize: 10, // 每页显示条数
  page: 1, // 当前页码
});

// 组件挂载时执行的逻辑
onMounted(() => {
  getDataList(); // 获取数据列表
});

/**
 * 获取数据列表
 */
const getDataList = () => {
  data.loading = true; // 设置加载状态
  listApi({
    keyword: data.keyword, // 请求参数
  })
    .then((res) => {
      data.loading = false; // 关闭加载状态
      console.log(res); // 打印响应数据
      res.data.forEach((item: any, index: any) => {
        item.index = index + 1; // 添加序号
      });
      data.tagList = res.data; // 设置标签列表数据
    })
    .catch((err) => {
      data.loading = false; // 关闭加载状态
      console.log(err); // 打印错误信息
    });
};

// 行选择配置
const rowSelection = ref({
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows); // 打印选中的行键和行数据
    data.selectedRowKeys = selectedRowKeys; // 更新选中的行键数组
  },
});

/**
 * 确认取消订单
 * @param {any} record 订单记录
 */
const confirmCancel = (record: any) => {
  cancelApi({ id: record.id }) // 取消订单API请求
    .then((res) => {
      getDataList(); // 重新获取数据列表
      message.success('取消成功'); // 显示成功消息
    })
    .catch((err) => {
      message.error(err.msg || '操作失败'); // 显示错误消息
    });
};

/**
 * 确认删除订单
 * @param {any} record 订单记录
 */
const confirmDelete = (record: any) => {
  console.log('delete', record); // 打印删除的订单记录
  deleteApi({ ids: record.id }) // 删除订单API请求
    .then((res) => {
      getDataList(); // 重新获取数据列表
    })
    .catch((err) => {
      message.error(err.msg || '操作失败'); // 显示错误消息
    });
};

/**
 * 处理新增操作
 */
const handleAdd = () => {
  // 示例代码，实际实现可能有所不同
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
 * 批量删除
 */
const handleBatchDelete = () => {
  console.log(data.selectedRowKeys); // 打印选中的行键
  if (data.selectedRowKeys.length <= 0) {
    console.log('hello'); // 打印调试信息
    message.warn('请勾选删除项'); // 显示警告消息
    return;
  }
  deleteApi({ ids: data.selectedRowKeys.join(',') }) // 批量删除API请求
    .then((res) => {
      message.success('删除成功'); // 显示成功消息
      data.selectedRowKeys = []; // 清空选中的行键数组
      getDataList(); // 重新获取数据列表
    })
    .catch((err) => {
      message.error(err.msg || '操作失败'); // 显示错误消息
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
