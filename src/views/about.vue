<template>
  <div>
    <treeselect ref="tree" v-model="value" @input="inputChange" :multiple="true" :options="options" :min-height="60" />
    <LiquidFill></LiquidFill>
  </div>
</template>

<script>
    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import  LiquidFill from '../component/liquidfill'
    export default {
        name: 'about',
        components: { Treeselect,LiquidFill },
        data(){
            return{
                // define the default value
                value: [],
                datalist:[
                {
                    id: '1',
                    label: 'a',
                    children: [ {
                        id: '1-1',
                        label: 'aa',
                        children: [ {
                            id: '1-1-1',
                            label: 'aaa',
                        }, {
                            id: '1-1-2',
                            label: 'aab',
                        },{
                            id: '1-1-3',
                            label: 'aac',
                        } ],
                    },
                        {
                        id: '1-2',
                        label: 'ab',
                        children: [ {
                            id: '1-2-1',
                            label: 'aba',
                        }, {
                            id: '1-2-2',
                            label: 'abb',
                        } ],
                    }, {
                            id: '1-3',
                            label: 'ac',

                        }  ],
                },
                {
                    id: '2',
                    label: 'b',
                },
                {
                    id: '3',
                    label: 'c',
                } ]
            }
        },
        created(){
            this.valueData()

        },
        computed:{
            options(){
                return this.datalist
            }
        },
        methods:{
            // arr1:父数组   arr2:子数组
            removePointById(value,datalist){
                for(let i=0;i<datalist.length;i++){
                    if(datalist[i].children !== undefined){
                        if(datalist[i].children.length !== null){
                            //存储 布尔值
                            let a = []
                            a.length = datalist[i].children.length
                            for(let i =0;i<= a.length - 1; i++){
                                a[i] = false
                            }
                           let valueArrFather = []
                            datalist[i].children.forEach((item,index) => {
                                //存储 布尔值
                                let b = []
                                b.length = item.children.length
                                for(let i =0;i<= b.length - 1; i++){
                                    b[i] = false
                                }
                                // 子节点下  后代长度
                                let arr = []
                                if(item.children !== undefined){
                                    for(let j=0;j<item.children.length;j++) {
                                        if (item.children !== undefined) {
                                            arr.push(item.children[j].id)
                                        }
                                    }
                                    // 处理 value数组 匹配 arr
                                    let valueArr = []
                                    for(let i in arr){
                                        let indexS = value.indexOf(arr[i])
                                        valueArr.push(...value.slice(indexS,indexS+1))
                                    }
                                    // console.log(valueArr,"valueArr"+index)
                                    if(valueArr.length === arr.length){
                                        // push 子节点，删除“后代”
                                        for(let i in arr){
                                            let indexS = value.indexOf(arr[i])
                                            value.splice(indexS,1)
                                            b[i] = true
                                        }
                                        if(b.indexOf(false) == -1){
                                            valueArrFather.push(item.id)
                                            value.push(item.id)
                                        }
                                    }
                                }
                                console.log(arr,index)
                            })
                            if(a.indexOf(false) !== -1){
                                // 子节点的  id 集合
                                let ArrFather = valueArrFather
                                console.log(ArrFather,"底层遍历向上")
                                for(let j in ArrFather){
                                    let indexS = value.indexOf(ArrFather[j])
                                    value.splice(indexS,1)
                                }
                                value.push(datalist[i].id)
                                console.log(value,"数据整合")
                                console.log("全部为true",value)
                            }
                        }

                    }
                    /*for(let j=0;j<value.length;j++){
                        if(datalist[i] == value[j]){
                            let indexs = value.indexOf(value[j]);
                            value.splice(indexs, 1);
                        }
                    }*/
                }
            },
            inputChange(val){
                console.log(val)
                console.log(this.value)
            },
            valueData(){
                this.$nextTick(()=>{
                    this.value = ["1-1-1", "1-1-2","1-1-3", "1-2-1", "1-2-2","1-3","3"]
                    this.removePointById(this.value,this.datalist)
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>