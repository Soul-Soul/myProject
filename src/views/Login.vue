<template>
    <div class="example">
        <div class="FmPosition">
            <Form :model="loginForm" :rules="ruleForm">
                <FormItem prop="username">
                    <i-input class="IPosition" type="text" v-model="loginForm.username" placeholder="手机号" autocomplete="off" size="large">
                        <Icon type="ios-contact" slot="prepend"></Icon>
                    </i-input>
                </FormItem>
                <FormItem prop="password">
                    <i-input class="IPosition" type="password" v-model="loginForm.password" placeholder="密码" autocomplete="off" size="large">
                        <Icon type="ios-lock" slot="prepend"></Icon>
                        <Button type="primary" slot="append" :disabled="disabled" @click="sendcode" size="large" class="btns" >{{btntxt}}</Button>
                    </i-input>
                </FormItem>
                <FormItem>
                    <Button class="IPosition" type="primary" size="large" @click="handleSubmit('loginForm')">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
          /*  // 手机号
            const validateMobile = (rule, value, callback) => {
                const reg = /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else if (!reg.test(value)) {
                    callback('手机号格式不正确');
                } else {
                    callback();
                }
            }*/
            return {
                disabled:false,
                time:0,
                btntxt:"获取验证码",
                loginForm:{
                    username: '',
                    password: '',
                },
                ruleForm: {
                    username: [{required: true,message: '请输入密码', trigger: 'blur'}],
                    password: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                }
            }
        },
        methods:{
            //验证手机号码部分
            sendcode(){
                const reg = /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/
                //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
                if(this.loginForm.username === ''){
                    alert("请输入手机号码");
                }else if(!reg.test(this.loginForm.username)){
                    alert("手机格式不正确");
                }else{
                    this.time=60;
                    this.disabled=true;
                    this.timer();
                    /*axios.post(url).then(
                        res=>{
                        this.phonedata=res.data;
                    })*/
                }
            },
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt=this.time+"s后重新获取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.time=0;
                    this.btntxt="获取验证码";
                    this.disabled=false;
                }
            },
            handleSubmit() {
                this.$Message.success('Success!')
                this.$router.push({path: '/dashboard'})
               /* this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })*/
            }
        }
    }
</script>

<style scoped lang="less">
    .example {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #515a6e;
        .FmPosition{
            width: 500px;
            height: 400px;
            padding: 20px;
            .IPosition{
                width: 400px;
                margin-top: 20px;
                .btns{
                    color: #fff;
                    background-color: #2d8cf0;
                    border-color: #2d8cf0
                }
            }
        }
    }
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
        .example {padding: 20% 0 30%}
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        .example {padding: 10% 20%}
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        .example {padding: 22% 35%}
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        .example {padding: 22% 35%}
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        .example {padding: 15% 30%}
    }
</style>
