<template>
    <div class="tree-transfer">
        <div class="left box" :style="{width:width+'px',height:height+'px'}">
            <div class="boxTop">
                <el-checkbox :disabled="this.treeList.length==0" :indeterminate="left.leftIndeterminate" v-model="left.leftCheckAll"  @change="leftCheckAllChange">{{leftTitle}}</el-checkbox>
            </div>
            <div class="search" v-if="search">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="left.leftKey">
                </el-input>
            </div>
            <div class="content" :style="{top:search ? '100px' : '50px'}">
                <el-tree
                        :data="treeList"
                        ref="tree"
                        show-checkbox
                        default-expand-all
                        :node-key="keyId"
                        :filter-node-method="filterNode"
                        @check-change="checkChange"
                        :props="props">
                </el-tree>

            </div>
        </div>
        <div class="center">
            <div class="btn" :class="{btnSelected:isRightSelected}" @click="toLeft">
                <i class="el-icon-arrow-left" ></i>
            </div>
            <div class="btn" :class="{btnSelected:isLeftSelected}" @click="toRight">
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="right box" :style="{width:width+'px',height:height+'px'}">
            <div class="boxTop">
                <el-checkbox :disabled="this.right.rightList.length ===0" :indeterminate="right.rightIndeterminate" v-model="right.rightCheckAll" @change="rightCheckAllChange">{{rightTitle}}</el-checkbox>
            </div>
            <div class="search" v-if="search">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="right.rightKey">
                </el-input>
            </div>
            <div class="content" :style="{top:search ? '100px' : '50px'}">
                <ul>
                    <li v-for="(item,index) in right.rightList" :key="index">
                        <el-checkbox v-model="item.checked"  @change="rightCheckItemChange(item)">{{item.name}}</el-checkbox>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tree-transfer',
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            selectedArray: {
                type: Array,
                default() {
                    return []
                }
            },
            keyId: {
                type: String,
                default() {
                    return 'id'
                }
            },
            search: {
                type: Boolean,
                default: true
            },
            props: {
                type: Object,
                default() {
                    return {
                        children: 'children',
                        label: 'name'
                    }
                }
            },
            height: {
                type: Number,
                default() {
                    return 200
                }
            },
            width: {
                type: Number,
                default() {
                    return 300
                }
            },
            leftTitle: {
                type: String,
                default: '所有选择'
            },
            rightTitle: {
                type: String,
                default: '已选择'
            }
        },
        data() {
            return {
                left: {
                    leftIndeterminate: false,
                    leftCheckAll: false,
                    leftKey: '',
                    treeSelected: []
                },
                right: {
                    rightIndeterminate: false,
                    rightCheckAll: false,
                    rightKey: '',
                    rightList: []
                },
                allList: [],
                treeList: [],
                isRightSelected: false,
                isLeftSelected: false
            }
        },
        watch: {
            'left.leftKey': function(val) {
                this.$refs['tree'].filter(val)
            },
            'right.rightKey': function(val) {
                let list = []
                this.right.allRightList.map((item) => {
                    if (item.name.indexOf(val) > -1) {
                    list.push(item)
                }
            })
                this.right.rightList = list
            },
            data: function(val) {
                this.allList = this.deepCopy(val)
                // 赋值 右边回显的数据（已选择）
                this.right.rightList = []
                this.selectedArray.map(item => {
                    this.allList.map(ite => {
                    if (ite.children && ite.children.length > 0) {
                    ite.children.map(it => {
                        if (it.id === item) {
                        this.right.rightList.push(it)
                    }
                })
                }
            })
            })
                this.getTreeList()
            }
            // selectedArray:function(val){
            //     console.log(val)
            //     this.getTreeList()
            // }
        },
        methods: {
            leftCheckAllChange(val) {
                this.treeList.map(item => {
                    if (item.children && item.children.length > 0) {
                    item.children.map(ite => {
                        this.$refs.tree.setChecked(ite.id, val)
                })
                }
            })
            },
            rightCheckAllChange(val) {
                this.right.rightList.map(item => {
                    item.checked = val
            })
                if (val) {
                    this.right.rightIndeterminate = false
                    this.right.rightCheckAll = true
                    this.isRightSelected = true
                } else {
                    this.right.rightIndeterminate = false
                    this.right.rightCheckAll = false
                    this.isRightSelected = false
                }
            },
            rightCheckItemChange() {
                let leftSelected = []
                this.right.rightList.map(ite => {
                    if (ite.checked) {
                    leftSelected.push(ite)
                }
            })
                if (this.right.rightList.length === leftSelected.length) {
                    this.right.rightIndeterminate = false
                    this.right.rightCheckAll = true
                    this.isRightSelected = true
                } else if (leftSelected.length === 0) {
                    this.right.rightIndeterminate = false
                    this.right.rightCheckAll = false
                    this.isRightSelected = false
                } else {
                    this.right.rightIndeterminate = true
                    this.right.rightCheckAll = false
                    this.isRightSelected = true
                }
            },
            filterNode(value, data) {
                if (!value) return true
                return data.name.indexOf(value) !== -1
            },
            checkChange(node, checked, indeterminate) {
                this.$set(node, 'checked', checked)
                this.$set(node, 'indeterminate', indeterminate)
                let leftSelected = []
                let allNodes = []
                this.treeList.map(item => {
                    if (item.children && item.children.length > 0) {
                    item.children.map(ite => {
                        allNodes.push(ite)
                    if (ite.checked) {
                        leftSelected.push(ite)
                    }
                })
                }
            })
                if (allNodes.length === leftSelected.length) {
                    this.left.leftIndeterminate = false
                    this.left.leftCheckAll = true
                    this.isLeftSelected = true
                } else if (leftSelected.length === 0) {
                    this.left.leftIndeterminate = false
                    this.left.leftCheckAll = false
                    this.isLeftSelected = false
                } else {
                    this.left.leftIndeterminate = true
                    this.left.leftCheckAll = false
                    this.isLeftSelected = true
                }
            },
            toLeft() {
                if (this.isRightSelected) {
                    let rightSelected = []
                    let allIds = []
                    this.right.rightList.map((item) => {
                        if (!item.checked) {
                        rightSelected.push(item)
                    }
                })
                    this.right.rightList = rightSelected
                    this.allList = this.deepCopy(this.data)
                    this.getTreeList()
                    this.right.rightIndeterminate = false;
                    this.right.rightCheckAll = false;
                    this.isRightSelected = false
                    this.right.rightList.map((item) => {
                        allIds.push(item.id)
                })
                    this.$emit('getValue', allIds)
                }
            },
            toRight() {
                if (this.isLeftSelected) {
                    let allIds = []
                    this.treeList.map(item => {
                        if (item.children && item.children.length > 0) {
                        item.children.map((ite) => {
                            if (ite.checked) {
                            ite.checked = false
                            this.right.rightList.push(ite)
                            this.right.allRightList = this.deepCopy(this.right.rightList)
                        }
                    })
                    }
                })
                    this.left.leftIndeterminate = false
                    this.left.leftCheckAll = false
                    this.isLeftSelected = false
                    this.getTreeList()
                    this.right.rightList.map((item) => {
                        allIds.push(item.id)
                })
                    this.$emit('getValue', allIds)
                }
            },
            // 获取左侧数组件数据
            getTreeList() {
                this.treeList = this.getNoOptions(this.allList, this.right.rightList)
            },
            // 根据已选项获取所有未选项
            getNoOptions(allList, hadList) {
                let selectedIds = []
                let list = []
                hadList.map(item => {
                    selectedIds.push(item.id)
            })
                allList.map(item => {
                    if (item.children && item.children.length > 0) {
                    let children = []
                    item.children.map((ite) => {
                        if (selectedIds.indexOf(ite.id) === -1) {
                        children.push(ite)
                    }
                })
                    item.children = children
                    if (item.children && item.children.length > 0) {
                        list.push(item)
                    }
                }
            })
                return list
            },
            // 深拷贝
            deepCopy(obj) {
                var result = Array.isArray(obj) ? [] : {}
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object' && obj[key] !== null) {
                            result[key] = this.deepCopy(obj[key])
                        } else {
                            result[key] = obj[key]
                        }
                    }
                }
                return result
            }
        },
        mounted() {
            this.allList = this.deepCopy(this.data)
            this.right.rightList = []
            this.selectedArray.map(item => {
                this.allList.map(ite => {
                if (ite.children && ite.children.length > 0) {
                ite.children.map(it => {
                    if (it.id === item) {
                    this.right.rightList.push(it)
                }
            })
            }
        })
        })
            this.getTreeList()
        }
    }
</script>

<style scoped lang="less">
    @border:1px solid #aaa;
    .borderRadius( @top , @right,@bottom,@left){
        -webkit-border-radius: @top @right @bottom @left;
        -moz-border-radius: @top @right @bottom @left;
        border-radius: @top @right @bottom @left;
    }
    .h-lh(@h){
        height:@h;
        line-height: @h;
    }
    .flex_row(){
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .flex_col{
        display: flex;
        flex-direction: column;
    }
    .tree-transfer{
        .btnSelected{
            background: rgba(39, 104, 248, 0.75);
            color:white;
        }
        .flex_row();
        .box{
            position: relative;
            border:@border;
            .borderRadius(5px,5px,5px,5px);
            .boxTop{
                .h-lh(45px);
                background: #ddd;
                padding-left:20px;
            }
            .search{
                padding:5px;
            }
            .content{
                position: absolute;
                bottom:0;
                width:100%;
                padding:5px 0 ;
                overflow: auto;
                ul{
                    list-style: none;
                    padding: 0 15px;
                    margin:0;
                }
            }
        };
        .center{
            margin:0 15px;
            .btn{
                border:@border;
                width:36px;
                .h-lh(36px);
                .borderRadius(50%,50%,50%,50%);
                margin-bottom:20px;
                text-align: center;
            }
        }
    }
</style>
