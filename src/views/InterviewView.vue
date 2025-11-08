<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="home-breadcrumb">
            <el-breadcrumb-item>面经后台</el-breadcrumb-item>
            <el-breadcrumb-item>面经管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="excel">
            <div class="excel-header">
                <span>共 {{ total }} 条记录</span>
                <el-button type="primary" size="mini" @click="addInterview('add')">添加面经</el-button>
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
                                <i class="el-icon-view" @click="preview('prev', obj.row.id)"></i>
                                <i class="el-icon-edit-outline" @click="editInterview('edit', obj.row.id)"></i>
                                <i class="el-icon-delete" @click="del('del', obj.row.id)"></i>
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


        <el-drawer :title="type" :visible="isShowDrawer" direction="rtl" :before-close="handleClose" :modal="true"
            :modal-append-to-body="false" size="60%">
            <el-form v-if="type === '预览面经'" :inline="true" class="demo-form-inline" label-position="right"
                label-width="80px" :model="formprev">
                <h1 class="contentt">标题：{{ formprev.stem }}</h1>
                <div v-html="formprev.content" class="contentt" style="width: 85%;"></div>
            </el-form>
            <el-form v-else :inline="true" :model="formadd" class="demo-form-inline" :rules="rules"
                label-position="right" label-width="80px">
                <el-form-item label="标题" prop="stem">
                    <el-input v-model="formadd.stem" placeholder="请输入面经标题"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <quill-editor v-model="formadd.content" @blur="handleBlur" class="contentt"></quill-editor>
                </el-form-item>
                <el-form-item class="contentt">
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
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
import { showInterview, addInterview, updateInterview } from "@/api/interview";



export default {
    name: 'InterviewView',
    data() {
        return {
            currentPage: 1,
            pageSize: 5,
            total: 0,

            tableData: [],

            isShowDrawer: false,
            type: '',
            types: {
                add: '添加面经',
                edit: '修改面经',
                prev: '预览面经',
                del: '删除面经'
            },
            id: '',

            formadd: {
                stem: '',
                content: ''
            },
            formprev: {
                stem: '',
                content: ''
            },
            rules: {
                stem: [{ required: true, message: '请输入面经标题', trigger: 'blur' }],
                content: [{ required: true, message: '请输入面经内容', trigger: 'blur' }]
            }

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

        handleClose() {
            this.$confirm('确认关闭？')
                .then(() => {
                    this.isShowDrawer = false
                })
                .catch(() => {
                });
        },
        handleBlur() {
            this.$refs.form.validateField('content')
        },
        addInterview(type) {
            this.isShowDrawer = true
            this.type = this.types[type]
        },
        async preview(type, id) {
            this.isShowDrawer = true
            this.type = this.types[type]
            const res = await showInterview(id)
            this.formprev = res.data
            this.id = id

        },
        async editInterview(type, id) {
            this.isShowDrawer = true
            this.type = this.types[type]
            const res = await showInterview(id)
            this.formadd = res.data
            this.id = id

        },
        del(type, id) {
            this.$message("没有权限删除")
            console.log(type, id);
            this.id = id
        },
        async submitForm() {
            if (this.type === this.types.add) {
                try {
                    await addInterview(this.formadd)
                    this.$message.success('添加成功')
                    this.handleClose()
                }
                catch (error) {
                    console.log(error);
                    this.$message.error(error.response.data.message)
                }
            }
            else if (this.type === this.types.edit) {
                try {
                    await updateInterview({ id: this.id, ...this.formadd })
                    this.$message.success('修改成功')
                    this.handleClose()
                }
                catch (error) {
                    console.log(error);
                    this.$message.error(error.response.data.message)
                }
            }
        }



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
::deep .el-drawer {
    width: 985px;
}

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

.quill-editor {
    ::v-deep .ql-editor {
        height: 300px;
    }
}

.contentt {
    margin-left: 80px;
}
</style>
