<template>
    <div class="TpST">
        <div class="layout">
            <Layout>
                <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                        <MenuItem :name="'1- ' + `${index}`"  v-for="(item,index) in menuList" :key="item.path" @click.native="toPage(item.path)">
                            <Icon type="ios-navigate"></Icon>
                            <span>{{item.name}}</span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout>
                    <Header :style="{padding: 0}" class="layout-header-bar">
                        <div style="display: flex;justify-content: flex-start">
                            <div>
                                <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                            </div>
                            <!--添加面包屑 -->
                            <Breadcrumb>
                                <BreadcrumbItem v-for="(item,index) in routerPath" :key="index" :to = "`${item.path}`">{{item.name}}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </Header>
                    <Content class="contentExample" :style={height:contentExample}>
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'dashboard',
        data(){
            return{
                isCollapsed: false,
                menuList:[
                    {
                        path: '/home',
                        name: '主页',
                    },
                    {
                        path: '/about',
                        name: '关于页',
                    }
                ],
                contentExample: (document.documentElement.clientHeight - 104) + 'px',
                fullHeight: document.documentElement.clientHeight, // 设备高度
                fullWidth:  document.documentElement.clientWidth,  // 设备宽度
                routerPath: []  // 面包屑路径容器
            }
        },
        watch:{
            $route(){   // 监听路由变化
                this.routerPath = []
                this.routerPath = this.$route.matched
            },
            fullHeight (val) { // 增加定时器会避免频繁调用window.onresize方法
                if(!this.timer) {
                    this.fullHeight = val
                    this.timer = true
                    let that = this
                    setTimeout(function (){
                        that.timer = false
                    },400)
                }
            },
            fullWidth (val) { // 增加定时器会避免频繁调用window.onresize方法
                if(!this.timer) {
                    this.fullWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function (){
                        that.timer = false
                    },400)
                }
            }
        },
        computed: {
            ...mapGetters(['getMenuList']),
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        mounted(){  // 刷新时
            const that = this
            that.routerPath = that.$route.matched,
                // 注：window.onresize只能在项目内触发1次
            window.onresize = () => {
                return (() => {
                    // 通过捕获系统的onresize事件触发我们需要执行的事件
                    window.fullHeight = document.documentElement.clientHeight
                    window.fullWidth = document.documentElement.clientWidth
                    that.fullHeight = window.fullHeight
                    that.fullWidth = window.fullWidth
                    that.contentExample = (that.fullHeight - 104) + 'px' // 容器Content高度
                    if(that.fullWidth < 600){
                        that.isCollapsed = true
                    } else {
                        that.isCollapsed
                    }
                })()
            }
        },
        methods:{
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            toPage(path){
                // router.push增加回调函数,push之后路由出现了问题 "捕获" 有任何的错误信息
                this.$router.push({path:path}).catch(err => {err})
            }
        }
    }
</script>

<style>
    .TpST{
        position: fixed;
        height: 100%;
        width: 100%;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 4px;
        overflow: hidden;
    }
    .contentExample{
        margin: 20px;
        background: #fff;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>