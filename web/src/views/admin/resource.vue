<template>
    <div>
        <!--页面区域 -->
        <div class="page-view">
            <div class="table-operations">
                <a-space>
                    <a-button type="primary" @click="handleAdd">新增</a-button>
                    <a-button @click="handleBatchDelete">批量删除</a-button>
                    <a-input-search addon-before="教师id" enter-button @search="onSearch" @change="onSearchChange" />
                </a-space>
            </div>
            <a-table size="middle" rowKey="id" :loading="data.loading" :columns="columns" :data-source="data.resourceList"
                :scroll="{ x: 'max-content' }" :row-selection="rowSelection" :pagination="{
                    size: 'default',
                    current: data.page,
                    pageSize: data.pageSize,
                    onChange: (current) => (data.page = current),
                    showSizeChanger: false,
                    showTotal: (total) => `共${total}条数据`,
                }">
                <template #bodyCell="{ text, record, index, column }">
                    <template v-if="column.key === 'imageUrl'">
                        <img :src="text" style="width: 60px;height: 40px;" />
                    </template>
                    <template v-if="column.key === 'operation'">
                        <span>
                            <a @click="handleEdit(record)">编辑</a>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定删除?" ok-text="是" cancel-text="否" @confirm="confirmDelete(record)">
                                <a href="#">删除</a>
                            </a-popconfirm>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>

        <!--弹窗区域-->
        <div>
            <a-modal :visible="modal.visile" :forceRender="true" :title="modal.title" width="580px" ok-text="确认"
                cancel-text="取消" @cancel="handleCancel" @ok="handleOk">
                <div>

                    <a-form ref="myform" :label-col="{ style: { width: '80px' } }" :model="modal.form" :rules="modal.rules">
                        <a-upload-dragger name="fileList" :multiple="true" v-model:file-list="fileList"
                            :before-upload="beforeUpload">
                            <p class="ant-upload-drag-icon">
                                <file-image-outlined />
                            </p>
                            <p class="ant-upload-text">
                                请选择要上传的文件
                            </p>
                            <p class="ant-upload-hint">
                                支持单次或批量上传
                            </p>
                        </a-upload-dragger>
                        <a-divider style="height: 2px; background-color: #7cb305" />
                        <a-form-item label="教师编号" name="tid">
                            <a-input placeholder="请输入" :min="0" v-model:value="modal.form.tid"
                                style="width: 100%;"></a-input>
                        </a-form-item>
                    </a-form>
                </div>
            </a-modal>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FormInstance, message } from 'ant-design-vue';
import { createApi, listApi, updateApi, deleteApi } from '/@/api/resource';
import { getFormatTime } from "/@/utils";

const columns = reactive([
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
    },
    {
        title: '文件地址',
        dataIndex: 'link',
        key: 'link',
        align: 'center',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        customRender: ({ text }) => getFormatTime(text, true)
    },
    {
        title: '上传家教的id',
        dataIndex: 'tid',
        key: 'tid',
        align: 'center',
    },
]);


const beforeUpload = (file: File) => {
    // 改文件名
    return false;
};
// 文件列表
const fileList = ref<any[]>([]);

// 页面数据
const data = reactive({
    resourceList: [],
    loading: false,
    currentAdminresourceName: '',
    keyword: '',
    selectedRowKeys: [] as any[],
    pageSize: 10,
    page: 1,
});

// 弹窗数据源
const modal = reactive({
    visile: false,
    editFlag: false,
    title: '',
    form: {
        tid: undefined
    },
    rules: {
        tid: [{ required: true, message: '请输入教师编号', trigger: 'change' }],
    },
});

const myform = ref<FormInstance>();

onMounted(() => {
    getresourceList();
});

const getresourceList = () => {
    data.loading = true;
    listApi({
        keyword: data.keyword,
    })
        .then((res) => {
            data.loading = false;
            console.log(res);
            res.data.forEach((item: any, index: any) => {
                item.index = index + 1;
            });
            data.resourceList = res.data;
        })
        .catch((err) => {
            data.loading = false;
            console.log(err);
        });
};


const onSearch = () => {
    getresourceList();
};

const rowSelection = ref({
    onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        data.selectedRowKeys = selectedRowKeys;
    },
});

const handleAdd = () => {
    resetModal();
    modal.visile = true;
    modal.editFlag = false;
    modal.title = '新增';
    // 重置
    for (const key in modal.form) {
        modal.form[key] = undefined;
    }
};
const handleEdit = (record: any) => {
    resetModal();
    modal.visile = true;
    modal.editFlag = true;
    modal.title = '编辑';
    // 重置
    for (const key in modal.form) {
        modal.form[key] = undefined;
    }
    for (const key in record) {
        modal.form[key] = record[key];
    }
};

const confirmDelete = (record: any) => {
    console.log('delete', record);
    deleteApi({ ids: record.id })
        .then((res) => {
            getresourceList();
        })
        .catch((err) => {
            message.warn(err.msg || "操作失败")
        });
};

const handleBatchDelete = () => {
    console.log(data.selectedRowKeys);
    if (data.selectedRowKeys.length <= 0) {
        console.log('hello');
        message.warn('请勾选删除项');
        return;
    }
    deleteApi({ ids: data.selectedRowKeys.join(',') })
        .then((res) => {
            message.success('删除成功');
            data.selectedRowKeys = [];
            getresourceList();
        })
        .catch((err) => {
            message.warn(err.msg || "操作失败")
        });
};

const handleOk = () => {
    myform.value
        ?.validate()
        .then(() => {

            fileList.value.forEach((file, index) => {
                const formData = new FormData();
                if (modal.form.tid) {
                    formData.append('tid', modal.form.tid);
                }
                formData.append('file', new File([file], file.name));
                if (modal.editFlag) {
                    updateApi(formData)
                        .then((res) => {
                            hideModal();
                            getresourceList();
                        })
                        .catch((err) => {
                            console.log(err);
                            message.warn(err.msg || "操作失败")
                        });
                } else {
                    createApi(formData)
                        .then((res) => {
                            hideModal();
                            getresourceList();
                        })
                        .catch((err) => {
                            console.log(err);
                            message.warn(err.msg || "操作失败")
                        });
                }
            })

        })
        .catch((err) => {
            console.log('不能为空');
        });
};

const handleCancel = () => {
    hideModal();
};

// 恢复表单初始状态
const resetModal = () => {
    myform.value?.resetFields();
    fileList.value = []
};

// 关闭弹窗
const hideModal = () => {
    modal.visile = false;
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

.table-operations>button {
    margin-right: 8px;
}
</style>
