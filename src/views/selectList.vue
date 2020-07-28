<template>
    <div id="SwitchList">
        <button @click="SwitchList" >
            导入数据
        </button>
        <div class="dropdown" :class="{ 'boxShadow': showPlan && showPlanChild}">
            <div style="display: flex">
                <div v-show="showPlan" style="width: 120px" :class="{ 'boxShadow': showPlan && !showPlanChild}">
                    <div class="btn" @click="getSend1">导入Excel表格</div>
                    <div class="btn"  @click="SwitchPlan">导入控制器</div>
                    <div class="btn" @click="getSend2">导入IMC</div>
                    <div class="btn" @click="getSend3">绿洲数据</div>
                </div>
                <div v-show="showPlanChild" style="width: 120px">
                    <div v-for="item in ArrChildren" :key="item.id">
                        <div class="btn" @click = SendAsset(item.id)>{{item.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            你好
        </div>
    </div>
</template>

<script>
    export default {
        name: "select",
        data() {
            return {
                showPlan:false,
                ArrChildren:[],
                showPlanChild:false,
            }
        },
        computed: {},
        methods: {
            //外层按钮，触发，显示和隐藏；获得控制器的参数
            SwitchList(){
                this.showPlan = ! this.showPlan
                if(this.showPlan === true){
                    this.getThirdPartInfoByType()
                }else{
                    this.showPlanChild =false
                }
            },
            getThirdPartInfoByType(){
                let selectArr = [
                    {id:'1',name:'小明'},
                    {id:'2',name:'小红'},
                    {id:'3',name:'小蓝'}
                ]
                this.ArrChildren = selectArr
                console.log( this.ArrChildren,1111)
            },
            //内层按钮，触发，显示和隐藏；获得控制器的参数
            SwitchPlan(){
                this.showPlanChild = !this.showPlanChild
            },
            SendAsset(val){
                let params = val
                this.showPlan =false
                this.showPlanChild =false
                console.log(params,'传递参数')
            },
            getSend1(){
                console.log(1)
                this.showPlan =false
                this.showPlanChild =false
            },
            getSend2(){
                this.showPlan =false
                this.showPlanChild =false
            },
            getSend3(){
                this.showPlan =false
                this.showPlanChild =false
            },
        }
    }
</script>

<style scoped lang='less'>
    @wd:120px;
    .boxShadow{
        box-shadow: 10px 10px 5px #888888;
    }
    #SwitchList{
        position: relative;
        .dropdown{
            position:absolute;
            top:36px;
            left:0;
            right:0;
        }
        &>button{
            width: @wd*2;
            height:36px;
        }
        &>div{
           width: @wd*2;
            >div{
                width: @wd;
            }
        }
        .btn{
            width: @wd;
            color: #515a6e;
            background: white;
            /*border:1px solid gray;*/
            &:hover{
                background: #f3f3f3;
                color: #2d8cf0
            }
        }
    }
</style>