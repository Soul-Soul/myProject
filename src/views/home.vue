<template>
  <div class="positionPage">
    <div class="Content">
      <!--RadioGroup单选框-->
      <div>
        <div>数据类型：</div>
        <div>
          <RadioGroup v-model="numType" @on-change="checkModel">
            <Radio v-for="item in numTypeList" :label="item.label" :key="item.value" :style="{color:numType===item.value?'#2d8cf0':''}"></Radio>
          </RadioGroup>
        </div>
      </div>
      <!--步骤条-->
      <div>
        <div>
          <Steps :current="current">
            <Step :title="item.value" v-for="item in stepList" :key="item.title"></Step>
          </Steps>
        </div>
        <!--每个步骤条对应的数据内容-->
        <div>
          <div v-show="current===0">
            <div v-show="numType==='RDBMS'" >
              <Form   ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="RDBMS类型" prop="RDBMSType">
                  <RadioGroup v-model="formValidate.RDBMSType">
                    <Radio label="MySQL">MySQL</Radio>
                  </RadioGroup>

                </FormItem>
                <FormItem label="接入方式" prop="connectType">
                  <RadioGroup v-model="formValidate.connectType">
                    <Radio label="新建数据源">新建数据源</Radio>
                    <Radio label="接入已有数据">接入已有数据</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="数据源名称" prop="dataName">
                  <i-input v-model="formValidate.dataName" placeholder="请输入数据源名称"></i-input>
                </FormItem>
                <div class="ipPost">
                  <div>
                    <FormItem label="连接ip" prop="connectIp">
                      <i-input v-model="formValidate.connectIp" placeholder="请输入ip链接地址"></i-input>
                    </FormItem>
                  </div>
                  <div>
                    <FormItem label="连接端口" prop="connectPost">
                      <i-input v-model="formValidate.connectPost" placeholder="例如：8080"></i-input>
                    </FormItem>
                  </div>
                </div>
                <FormItem label="用户名" prop="user">
                  <i-input v-model="formValidate.user" placeholder="请输入用户名"></i-input>
                </FormItem>
                <FormItem label="密码" prop="password">
                  <div>
                    <i-input :type="pwdType"  v-model="formValidate.password" placeholder="请输入密码">
                      <Icon slot="suffix" :type="pwdType==='password'?'ios-eye':'ios-eye-outline'" size="24" @click="checkType"/>
                    </i-input>
                  </div>
                </FormItem>
                <FormItem label="数据库名" prop="dataBox">
                  <i-input v-model="formValidate.dataBox" placeholder="请输入数据库名"></i-input>
                </FormItem>
                <FormItem label="表名" prop="excel">
                  <i-input v-model="formValidate.excel" placeholder="请输入表名"></i-input>
                </FormItem>
                <FormItem label="数据连通性" prop="mail">
                  <div class="test">
                    <div v-show="btnTitle=='重新测试'">
                      <div>
                        <Icon :color="flag===true?'green':'red'" :type="flag===true?'ios-checkmark-circle-outline':'ios-close-circle-outline'" size="24" />
                      </div>
                      <div>
                        {{dataConnect}}
                      </div>
                    </div>
                    <div>
                      <Button type="error" @click="handleSubmit('formValidate')">{{btnTitle}}</Button>
                    </div>
                  </div>
                </FormItem>
              </Form>
            </div>
            <div v-show="numType==='kafka'" >
              我是kafka
            </div>
          </div>
          <div v-show="current===1">
            <div>
              数据表名称：{{formValidate.excel}}
            </div>
            <div>
              <Menu mode="horizontal" theme="light" active-name="1" @on-select="changePlan">
                <MenuItem name="1">
                  数据预览
                </MenuItem>
                <MenuItem name="2">
                  表结构
                </MenuItem>
              </Menu>
            </div>
            <div>
              <div v-show="planNum == 1">
                <Table :columns="columns1" :data="data1"></Table>
                <div style="margin-top:10px">
                  <Page
                          @on-change="pageChange"
                          :total="data1.length"
                          show-total
                  />
                </div>
              </div>
              <div v-show="planNum == 2">
                <Table :columns="columns2" :data="data2"></Table>
                <Page :total="data2.length" show-total />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button :disabled="current===0?true:false" type="primary" @click="goBack">上一步</Button>
          <Button :disabled="current===4?true:false" type="primary" @click="next">下一步</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'home',
        components: {
        },
        data(){
            return{
                numType:"RDBMS",
                numTypeList:[
                    {
                        label:'RDBMS',
                        value:'RDBMS'
                    },{
                        label:'kafka',
                        value:'kafka'
                    }
                ],// RadioGroup单选框
                current: 0,
                stepList:[
                    {
                        title:'0',
                        value:'数据源配置'
                    },{
                        label:'1',
                        value:'数据预览'
                    },
                    {
                        title:'2',
                        value:'目标配置'
                    },{
                        label:'3',
                        value:'抽取任务配置'
                    },{
                        label:'4',
                        value:'预览'
                    }
                ],// 步骤条
                pwdType: 'password',
                formValidate: {
                    RDBMSType: '',
                    connectType: '',
                    dataName: '',
                    connectIp: '',
                    connectPost: '',
                    user: '',
                    password: '',
                    dataBox: '',
                    excel:''
                },
                ruleValidate: {
                    RDBMSType: [{ required: true, message: 'RDBMS类型不能为空', trigger: 'blur' }],
                    connectType: [{ required: true, message: '接入方式不能为空', trigger: 'blur' }],
                    dataName:[{ required: true, message: '数据源名称不能为空', trigger: 'blur' }],
                    connectIp: [{ required: true, message: 'ip地址不能为空', trigger: 'blur'},
                        { type: 'string',pattern:/^((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([1-9]))\.(((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([0-9]))\.){2}((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([1-9]))$/, message:'请输入正确的ip地址', trigger:'blur'},],
                    connectPost: [{ required: true, message: '端口不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message:'请输入正确的端口', trigger:'blur'},],
                    user:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                    password:[{ required: true, message: '密码不能为空', trigger: 'blur' }],
                    dataBox:[{ required: true, message: '数据库名不能为空', trigger: 'blur' }],
                    excel:[{ required: true, message: '表名不能为空', trigger: 'blur' }]
                },// 表单验证
                flag:false,
                btnTitle:"测试连通性",
                dataConnect:"数据连通不正常",
                planNum: 1,//点击menu后获取跳转页面
                columns1: [
                    {
                        title: 'a',
                        key: 'a'
                    },
                    {
                        title: 'b',
                        key: 'b'
                    },
                    {
                        title: 'c',
                        key: 'c'
                    }
                ],
                data1: [
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    },{
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    },{
                        a: 1,
                        b: 2,
                        c: 3,
                    },
                    {
                        a: 1,
                        b: 2,
                        c: 3,
                    }
                ],
                page1: 0,
                columns2: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '字段名',
                        key: '字段名'
                    },
                    {
                        title: '数据类型',
                        key: '数据类型'
                    },
                    {
                        title: '是否为空',
                        key: '是否为空'
                    },
                    {
                        title: '备注',
                        key: '备注'
                    }
                ],
                data2: [
                    {
                        字段名: "a",
                        数据类型: "int(11)",
                        是否为空: "可为空",
                        备注:''
                    },
                    {
                        字段名: "b",
                        数据类型: "int(11)",
                        是否为空: "可为空",
                        备注:''
                    },
                    {
                        字段名: "c",
                        数据类型: "int(11)",
                        是否为空: "可为空",
                        备注:''
                    },
                    {
                        字段名: "d",
                        数据类型: "int(11)",
                        是否为空: "可为空",
                        备注:''
                    }
                ]

            }
        },
        created(){
        },
        methods:{
            checkModel(value){
                console.log(value)
                this.numType = value
                console.log(value,111)
                /*if(this.numType === "RDBMS"){

                }else{

                }*/
            },
            next () {
                if (this.current === 4) {
                    this.current = 4;
                } else {
                    if(this.flag === true){
                        console.log(this.flag)
                        this.current += 1;
                    }
                }
            },
            goBack () {
                if (this.current == 0) {
                    this.current = 0;
                } else {
                    this.current -= 1;
                }
            },
            checkType(){
                if(this.pwdType === 'password'){
                    this.pwdType = 'text'
                }else if(this.pwdType === 'text'){
                    this.pwdType = 'password'
                }
            },
            paramsValidate(params) {
                for(let  key in params){
                    if(params[key] != '0' && !params[key]){
                        this.flag = false;
                        console.log(this.flag,1)
                        return false;
                    }else{
                        this.flag = true
                        console.log(this.flag,2)
                        return true;
                    }
                }
            },
            handleSubmit (name) {
                let obj = this.$refs[name].model
                if(!this.paramsValidate(obj)) {
                    this.btnTitle = "重新测试"
                    if(this.flag === true){
                        this.dataConnect = "数据连通正常"
                    }else{
                        this.dataConnect = "数据连通不正常"
                    }
                }else{
                    this.btnTitle = "重新测试"
                }

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            changePlan(name){
                this.planNum = name
                console.log(name)
            },
            pageChange(page1) {
                this.page1 = page1 - 1;
            },
        }
    }
</script>

<style scoped lang="less">
  .positionPage{
    padding: 10px;
    margin-bottom: 20px;
    background: #fff;
    .Content{
      width: 80%;
      margin: 60px 10% 40px;
      padding: 5px;
      border: 1px solid black;
      >div:nth-child(1){
        display: flex;
        justify-content: flex-start;
        padding: 10px;
        >div:first-child{
          font-size: medium;
          font-weight: bold;
        }
      }
      >div:nth-child(2){
        >div:first-child{
          padding:20px 15px;
          border-bottom: 1px solid #ccc;
        }
        >div:nth-child(2){
          >div:nth-child(1){
            padding:20px 15px;
            width: 70%;
            .ipPost{
              display: flex;
              justify-content: space-between;
              >div:first-child{
                margin-right: 20px;
              }
              >div:last-child{
                margin-left: 20px;
              }
            }
            .test{
              display: flex;
              justify-content: flex-start;
              >div:first-child{
                margin-right: 10px;
                display: flex;
                justify-content: flex-start;
                >div:first-child{
                  margin-right: 10px;
                }
              }
            }
          }
          >div:nth-child(2){
            padding: 20px 0;
            >div:first-child{
              font-size: medium;
              font-weight: bold;
            }
            >div:nth-child(2){
              margin-top: 20px;
            }
            >div:last-child{
              border-bottom: 1px solid #ccc;
              padding-bottom: 40px;
              >div:first-child{

              }
              >div:last-child{

              }
            }
          }
        }
        >div:last-child{
          button{
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
