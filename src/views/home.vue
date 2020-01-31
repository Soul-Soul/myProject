<template>
  <div>
    <Form ref="loginForm" :model="loginForm" :rules="loginRules" inline>
      <FormItem prop="user">
        <i-input type="text" v-model="loginForm.username" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem prop="password">
        <i-input type="password" v-model="loginForm.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('loginForm')">登录</Button>
      </FormItem>
    </Form>
    <button @click="showPwd">
      验证码
    </button>
  </div>
</template>

<script>
  import {requestConfirmCode} from '../api/login'
export default {
  name: 'home',
  components: {
  },
    data(){
        // 手机号
        const validateMobile = (rule, value, callback) => {
            const reg = /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的手机号码!'))
            }
        }
      return{
          loginForm: {
              username: '',
              password: ''
          },
          loginRules: {
              username: [{ required: true, trigger: 'blur', validator: validateMobile }],
              password: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
          },
      }
    },
    created(){
    },
    methods:{
        requestConfirmCode(){
            requestConfirmCode({
              mobile: this.loginForm.username
            }).then(res => {
                console.log(res)
            })
        },
        showPwd() {
            this.requestConfirmCode()
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
}
</script>
