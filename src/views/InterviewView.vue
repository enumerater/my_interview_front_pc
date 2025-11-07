<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="home-breadcrumb">
            <el-breadcrumb-item>面经后台</el-breadcrumb-item>
            <el-breadcrumb-item>面经管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="excel">
            <div class="excel-header">
                <span>共 {{ total }} 条记录</span>
                <el-button type="primary" size="mini" @click="isShowDrawer = true">添加面经</el-button>
            </div>
            <div class="excel-body">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="stem" label="标题" width="180">
                    </el-table-column>
                    <el-table-column prop="creator" label="作者" width="180">
                    </el-table-column>
                    <el-table-column prop="likeCount" label="点赞">
                    </el-table-column>
                    <el-table-column prop="views" label="浏览数">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="更新时间">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作">
                        <template #default="obj">
                            <div class="actions">
                                <i class="el-icon-view"></i>
                                <i class="el-icon-edit-outline"></i>
                                <i class="el-icon-delete" @click="del(obj.row.id)"></i>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="excel-footer">
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    :current-page="currentPage" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </el-card>


        <el-drawer title="我是标题" :visible="isShowDrawer" direction="rtl" :before-close="handleClose" :modal="false"
            :modal-append-to-body="false">
            <div>
                <quill-editor ref="myQuillEditor">
                </quill-editor>
            </div>
        </el-drawer>

    </div>
</template>

<script>
import { queryInterview } from "@/api/interview";
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'


export default {
    name: 'InterviewView',
    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            total: 0,

            tableData: [],

            isShowDrawer: false,

        }
    },
    methods: {
        async handleCurrentChange(page) {
            const res = await queryInterview({
                current: page,
                pageSize: this.pageSize
            })
            this.tableData = res.data.rows
            this.total = res.data.total
            this.currentPage = page
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done(); // 执行关闭动画
                    this.isShowDrawer = false; // 同步更新显示状态
                })
                .catch(() => {
                });
        },



    },

    created() {
        this.handleCurrentChange()
    },
    mounted() {
    },
    components: {
        quillEditor
    },
    watch: {
    },

}
</script>

<style lang="scss" scoped>
.home-breadcrumb {
    margin-left: 20px;
}

.excel {
    margin: 20px;
}

.excel-header {
    margin: 10px;
    display: flex;
    justify-content: space-between;
}

.actions {
    display: flex;
    gap: 30px;

    i {
        font-size: 18px;
        cursor: pointer;
    }
}

.excel-footer {
    display: flex;
    justify-content: center;
    margin: 20px auto;
}
</style>
