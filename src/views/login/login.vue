<template>
  <div class="login">
    <div class="header">
       <myHeader :isLogin="true"></myHeader>
    </div>
    <div class="title">登录</div>
    <div class="tip">手机号</div>
    <div class="phone-number">
      <div class="phone-number-prefix"><span>+86</span></div>
      <div class="phone-number-input"><input type="text" placeholder="请输入手机号码" autocomplete="off" v-model="phoneNumber"></div>
    </div>
    <div class="ver-code">
      <div class="ver-code-input"><input type="text" placeholder="请输入验证码" autocomplete="off" v-model="verCode"></div>
      <div class="ver-code-suffix" @click="getCode" ref="verCode"><span>{{verCodeText}}</span></div>
    </div>
    <div class="ver-code invitation-code">
      <div class="ver-code-input"><input type="text" placeholder="请输入邀请码" autocomplete="off" v-model="invitationCode"></div>
    </div>
    <div class="tip2">新用户登录即自动注册，填写邀请码后双方可获打新额度奖励，已注册用户进行登录不必填写</div>
    <div class="button">
      <van-button size="large" :disabled="isDisabled" @click="loginClick">登录</van-button>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader'
import { login, getPhoneCode } from '@/api/index.js'
export default {
  name: 'login',

  components: {
    myHeader
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data () {
    return {
      phoneNumber: '',
      verCode: '',
      verCodeText: '获取验证码',
      verCodeClickFlag: true,
      invitationCode: undefined
    }
  },

  computed: {
    isDisabled () {
      var myreg = /^[1][3,4,5,7,8,6,9][0-9]{9}$/
      if (this.phoneNumber && myreg.test(this.phoneNumber) && this.verCode) {
        return false
      } else {
        return true
      }
    }
  },

  watch: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    init () {},
    /* 获取验证码 */
    getCode () {
      this.$refs.verCode.style.background = 'gainsboro'
      setTimeout(() => {
        this.$refs.verCode.style.background = '#fff'
      }, 100)
      if (!this.verCodeClickFlag) {
        return false
      }
      var myreg = /^[1][3,4,5,7,8,6,9][0-9]{9}$/
      if (!myreg.test(this.phoneNumber)) {
        this.$dialog.alert({
          message: '手机号错误'
        })
        return false
      }
      this.verCodeClickFlag = false

      var time = 60
      var interval = setInterval(() => {
        time--
        this.verCodeText = time + 's'
        if (time === 0) {
          this.verCodeText = '获取验证码'
          this.verCodeClickFlag = true
          clearInterval(interval)
        }
      }, 1000)

      getPhoneCode({
        telephone: this.phoneNumber
      }).then(res => {
        this.$dialog.alert({
          message: '获取成功，验证码时效5分钟，请尽快登录'
        })
      }).catch(e => {
        this.verCodeText = '获取验证码'
        this.verCodeClickFlag = true
        clearInterval(interval)
        this.$dialog.alert({
          message: e
        })
      })
    },
    /* 登录click */
    loginClick () {
      var resb = {}
      if (this.invitationCode) {
        resb = {
          telephone: this.phoneNumber,
          code: this.verCode,
          invit_code: this.invitationCode
        }
      } else {
        resb = {
          telephone: this.phoneNumber,
          code: this.verCode
        }
      }
      login(resb).then(res => {
        this.$router.push({
          path: '/'
        })
      }).catch(e => {
        this.$dialog.alert({
          message: e
        })
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  .header{
    height: 60px;
    margin-left: -10px;
  }
  .title{
    font-size:18px;
  }
  .tip{
    font-size:13px;
    color:rgba(0,0,0,.4);
    margin-top: 50px;
  }
  .phone-number{
    height: 44px;
    border-radius:3px;
    border:1px solid rgba(0,0,0,0.2);
    margin-top: 10px;
    display: flex;
    >div{
      display: inline-block;
      height: 100%;
    }
    .phone-number-prefix{
      width: 60px;
      text-align: center;
      line-height: 44px;
      font-size:13px;
      color: rgba(0,0,0,.4);
      border-right: 1px solid rgba(0,0,0,0.2);
    }
    .phone-number-input{
      display: flex;
      width: calc(100% - 100px);
      padding: 0 10px;
      >input{
        width:100%;
        border: 0;
        font-size:13px;
      }
    }
  }
  .ver-code{
    display: flex;
    height: 44px;
    border-radius:3px;
    border:1px solid rgba(0,0,0,0.2);
    margin-top: 20px;
    >div{
      display: inline-block;
      height: 100%;
    }
    .ver-code-input{
      display: flex;
      box-sizing: border-box;
      width: calc(100% - 105px);
      padding: 0 10px;
      >input{
        width:100%;
        border: 0;
        font-size:13px;
      }
    }
    .ver-code-suffix{
      width: 99px;
      text-align: center;
      line-height: 44px;
      font-size:13px;
      color: #4892FF;
      border-left: 1px solid rgba(0,0,0,0.2);
    }
  }
  .tip2{
    font-size:11px;
    color:rgba(0,0,0,.4);
    margin-top: 10px;
  }
  .button{
    margin-top: 40px;
    .van-button--large{
      height: 44px;
      line-height: 44px;
      color:#fff;
      background:rgba(72,146,255,1);
      border-radius:6px;
    }
  }
  .invitation-code .ver-code-input{
    display: flex;
    justify-content: center;
    flex-flow: column;
    width: 100%;
  }
}
.van-dialog{
  z-index: 10000 !important;
  box-shadow:0px 2px 12px 0px rgba(0,0,0,0.26);
  border-radius:10px;
}
.van-overlay{
  z-index: 9997 !important;
}

</style>
