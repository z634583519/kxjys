<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-title">
        <img src="static/logo.png"/>
      </div>
      <!-- <div class="home-header-info">全球优质项目首发交易平台</div> -->
    </div>
    <div class="home-user" @click="userInfoClick">
      <div class="home-user-info">
        <!-- <div class="logo">
        <img src="static/kxblogo.png"/>
        </div> -->
        <div class="info">
          <h6>我的打新额度($)</h6>
          <p>{{userAmountFormat}}<!-- <span v-if="userBuyMoneyFormat!==undefined">(已预约:{{userBuyMoneyFormat}})</span> --></p>
        </div>
      </div>
      <div class="home-user-getmore">
        <span>获取更多额度</span>
        <van-icon name="arrow" :size="'16px'" />
      </div>
    </div>
    <div class="home-share">
      <div class="home-share-header">
        <div class="share"><!-- 预约份额 --></div>
        <div class="my-share" @click="myOrderClick">我的预约<van-icon class-prefix="iconfont" name="shuangjiantou" /></div>
      </div>
      <div class="home-share-card">
        <div v-for="item in canBuyList" :key="item.p_id">
          <card v-bind="item" :isEnd="false" @click="projectClick"></card>
        </div>
      </div>
      <div class="home-share-upcurrency">
        <a href="http://kxcoin-com.mikecrm.com/rerBY54">我是项目方，我也要上币<van-icon class-prefix="iconfont" name="shuangjiantou" /></a>
      </div>
    </div>
    <!-- <div class="home-share">
      <div class="home-share-header">
        <div class="share">已截止</div>
      </div>
      <div class="home-share-card">
        <p v-if="canNotBuyList.length<1">当前还没有已截止打新的项目</p>
        <div v-for="item in canNotBuyList" :key="item.p_id">
          <card v-bind="item" :isEnd="true" @click="projectClick"></card>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import card from '@/components/card/card'
import { getUserAmount, getProjectList } from '@/api/index.js'
export default {
  name: 'home',

  components: {
    card
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data () {
    return {
      /* 用户 */
      userInfo: {
        userId: 1,
        userAmount: '- -',
        userBuyMoney: undefined
      },
      /* 项目卡片 */
      cardData: {
        id: 1,
        imgSrc: 'static/logo.png',
        projectName: '项目名称',
        projectCode: '000000',
        surplusAmount: '200000.05',
        totalAmount: '2000000'
        /* isEnd: false */
      },
      // 可预约项目list
      canBuyList: [],
      // 已截止项目list
      canNotBuyList: []
    }
  },

  computed: {
    userAmountFormat () {
      return this.$cut(this.userInfo.userAmount)
    },
    userBuyMoneyFormat () {
      if (this.userInfo.userBuyMoney === undefined) {
        return undefined
      } else {
        return this.$cut(this.userInfo.userBuyMoney)
      }
    }
  },

  watch: {
  },

  created () {
    // 获取用户额度
    getUserAmount().then(res => {
      this.userInfo.userAmount = res.data.userAmountMoney
      this.userInfo.userBuyMoney = res.data.userBuyMoney
    }).catch(e => {
      this.userInfo.userAmount = '- -'
      this.userInfo.userBuyMoney = undefined
    })
    // 获取项目列表
    getProjectList().then(res => {
      this.canBuyList = res.data[1]
      this.canNotBuyList = res.data[2]
    }).catch(e => {
      this.$toast('请求失败，请联系管理员')
    })
  },

  mounted () {
  },

  methods: {
    init () {},
    /* 获取更多额度click */
    userInfoClick () {
      this.$router.push({
        name: 'userInfo',
        params: {
          userId: this.userInfo.userId
        }
      })
    },
    /* 项目click */
    projectClick (id, isEnd) {
      this.$router.push({
        name: 'project',
        query: {
          id,
          isEnd
        }
      })
    },
    /* 我的预约click */
    myOrderClick () {
      this.$router.push({
        path: '/userOrder'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* @import url('static/font_mxhgcpjpmcq/iconfont.css'); */
.home {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
  .home-header{
    box-sizing: border-box;
    text-align: center;
    padding-top: 40px;
    margin-bottom: 60px;
    .home-header-title{
      >img{
        height: 60px;
      }
    }
    .home-header-info{
      font-size: 12px;
      padding-top: 10px;
    }
  }
  .home-user{
    box-sizing: border-box;
    padding: 0 20px;
    width: 90%;
    height: 80px;
    box-shadow:0px 2px 12px 0px rgba(0,0,0,0.26);
    border-radius:10px;
    border:1px solid gainsboro;
    margin:10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .home-user-info{
      display: flex;
      .logo{
        margin-right: 10px;
        >img{
          height:30px ;
        }
      }
      .info{
        text-align: center;
        font-size:13px;
        color:rgba(0,0,0,.4);
        >h6{
           font-size:13px;
           font-weight: normal;
        }
        >p{
          color: #4892ff;
          >span{
            color:rgba(0,0,0,.4);
            font-size:10px;
          }
        }
      }
    }

    .home-user-getmore{
      font-size:13px;
      color:rgba(0,0,0,.4);
      >i{
        vertical-align: sub
      }
    }
  }
  .home-share{
    .home-share-header{
      box-sizing: border-box;
      width: 90%;
      margin: 30px auto;
      padding: 0 20px;
      display: flex;
      justify-content: center;
      font-size:20px;
      .my-share{
        align-self: center;
        font-size: 13px;
        color: #3C5A9A;
        >i{
          font-size: 13px;
          margin-left: 10px
        }
      }
    }
    .home-share-upcurrency{
      >a{
        color: #3C5A9A;
        font-size:13px;
        text-decoration:none;
      }
        text-align: center;
        margin-top: 30px;
      i{
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .home-share-card{
      >p{
        text-align: center;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
