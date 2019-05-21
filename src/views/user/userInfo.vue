<template>
  <div class="userInfo">
    <div class="header">
      <myHeader :title="title"></myHeader>
    </div>
    <div class="my-amount">
        <h6>我的打新额度($)</h6>
        <p>{{userAmountFormat}}<span v-if="userBuyMoneyFormat!==undefined">(已预约:{{userBuyMoneyFormat}})</span></p>
    </div>
    <div class="up-method">
      <div class="up-method-title">
        <h6>提额方式</h6>
      </div>
     <div class="home-user" @click="registerClick">
        <div class="home-user-info">
          <div class="logo">
          <img src="static/registerImg.png"/>
          </div>
          <div class="info">
            <h6>注册就送</h6>
            <p>注册即送500$</p>
          </div>
        </div>
        <div class="home-user-getmore">
          <span>{{registerText}}</span>
          <van-icon ref="vanIcon" name="arrow" :size="'16px'" />
        </div>
      </div>
      <div class="home-user" @click="invitationClick">
        <div class="home-user-info">
          <div class="logo">
          <img src="static/invitationImg.png"/>
          </div>
          <div class="info">
            <h6>邀请提额</h6>
            <p>每邀请1人送500$</p>
          </div>
        </div>
        <div class="home-user-getmore">
          <span>去邀请</span>
          <van-icon name="arrow" :size="'16px'" />
        </div>
      </div>
      <div class="home-user" @click="communityClick">
        <div class="home-user-info">
          <div class="logo">
          <img src="static/joinImg.png"/>
          </div>
          <div class="info">
            <h6>加入社群</h6>
            <p>加入社群送500$</p>
          </div>
        </div>
        <div class="home-user-getmore">
          <span>去加入</span>
          <van-icon name="arrow" :size="'16px'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader'
import {getUserAmount} from '@/api/index.js'
export default {
  name: 'userInfo',

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
      title: '我的额度',
      userAmount: '- -',
      registerText: '去注册',
      userBuyMoney: undefined
    }
  },

  computed: {
    userAmountFormat () {
      return this.$cut(this.userAmount)
    },
    userBuyMoneyFormat () {
      if (this.userBuyMoney === undefined) {
        return undefined
      } else {
        return this.$cut(this.userBuyMoney)
      }
    }
  },

  watch: {
  },

  created () {
    getUserAmount().then(res => {
      this.userAmount = res.data.userAmountMoney
      this.$refs.vanIcon.className = this.$refs.vanIcon.className.replace('arrow', 'success')
      this.registerText = '已注册'
      this.userBuyMoney = res.data.userBuyMoney
    }).catch(e => {
      this.userAmount = '- -'
      this.$refs.vanIcon.className = this.$refs.vanIcon.className.replace('success', 'arrow')
      this.registerText = '去注册'
      this.userBuyMoney = undefined
    })
  },

  mounted () {
  },

  methods: {
    init () {},
    /* 注册click */
    registerClick () {
      if (this.userAmount !== '- -') {
        return false
      } else {
        this.$router.push({path: '/login'})
      }
    },
    /* 邀请click */
    invitationClick () {
      if (this.userAmount !== '- -') {
        this.$router.push({path: '/invitationIndex'})
      } else {
        this.$router.push({path: '/login'})
      }
    },
    /* 加入社群click */
    communityClick () {
      this.$router.push({path: '/community'})
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo {
  max-width: 800px;
  margin: 0 auto;
  .header{
    height: 60px;
  }
  .my-amount{
    width: 90%;
    height: 80px;
    box-shadow:0px 2px 12px 0px rgba(0,0,0,0.26);
    border-radius:10px;
    margin: 10px auto;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    >h6{
      font-size:13px;
      color:rgba(0,0,0,.4);
      margin-bottom: 6px;
      font-weight: normal;
    }
    >p{
      color:rgba(72,146,255,1);
      font-size:20px;
      >span{
        color:rgba(0,0,0,.4);
        font-size:14px;
      }
    }
  }
  .up-method{
    width: 90%;
    height: 340px;
    box-shadow:0px 2px 12px 0px rgba(0,0,0,0.26);
    border-radius:10px;
    margin: 10px auto;
    .up-method-title{
      padding-top: 20px;
      text-align: center;
      >h6{
        font-size:13px;
        color:rgba(0,0,0,.4);
        font-weight: normal;
      }
    }
    .home-user{
      box-sizing: border-box;
      width: 80%;
      height: 90px;
      border-bottom: 1px solid rgba(0,0,0,.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
     .home-user-info{
        display: flex;
        .logo{
          display: flex;
          align-items: center;
          margin-right: 10px;
          >img{
            height:30px ;
          }
        }
        .info{
          text-align: center;
          font-size:13px;
          color:rgba(0,0,0,.4);
          text-align: left;
          >h6{
            margin-bottom:10px;
            font-size:16px;
            color:rgba(0,0,0,1);
            font-weight:500;
          }
        }
    }
    .home-user-getmore{
      font-size:13px;
      color:rgba(0,0,0,.4);
      >i{
        font-size: 16px;
        vertical-align: sub;
        }
      }
    }
  }
}
</style>
