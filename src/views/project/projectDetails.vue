<template>
  <div class="projectDetails">
    <div class="header">
       <myHeader></myHeader>
    </div>
    <div class="title">
      <img :src="'http://admin.kxcoin.com'+projectData.url"/>
      <h1>{{projectData.p_name}}</h1>
     <!--  <p>{{projectData.alias}}</p> -->
    </div>
    <div class="info">
      <div class="info-twoLine">
        <h6>项目简介</h6>
        <p v-html="projectData.introduction"></p>
      </div>
      <div class="info-twoLine">
        <h6>项目说明</h6>
        <p v-html="projectData.content"></p>
      </div>
      <div class="info-line">
        <h6>平台剩余额度($)</h6>
        <span>{{surplus_priceFormat}}</span>
      </div>
      <div class="info-line">
        <h6>总额度($)</h6>
        <span>{{total_priceFormat}}</span>
      </div>
    </div>
    <div class="steps">
      <van-steps :active="projectData.status-1" :active-color="'#3C5A9A'">
        <van-step>预约成功</van-step>
        <van-step>封闭期</van-step>
        <van-step>上市交易</van-step>
      </van-steps>
    </div>
    <div class="interaction">
      <div v-if="btnText!=='登录'" class="interaction-num">
        <span>已预约额度</span>
        <span>{{numFormat}} $</span>
      </div>
      <div class="interaction-link">
        <h6>我的打新额度($)</h6>
        <p>{{userAmountMoneyFormat}}</p>
        <span @click="userInfoClick">获取更多额度</span>
        <van-icon name="arrow" />
        <div class="botton" v-if="!isEnd">
          <van-button size="large" @click="btnClick">{{btnText}}</van-button>
        </div>
      </div>
    </div>
    <van-popup class="bottom-dialog" :position="'bottom'" v-model="bottomDialogShow">
          <div class="buy-info">
            <img :src="'http://admin.kxcoin.com'+projectData.url"/>
            <div class="buy-form" v-if="!buySuccess">
              <div>
                <span>预约项目</span>
                <span>{{projectData.p_name}}</span>
              </div>
              <div>
                <span>预约最高限额</span>
                <span>{{max_numFormat}} $</span>
              </div>
              <div>
                <span>预约最低限额</span>
                <span>{{min_numFormat}} $</span>
              </div>
              <div>
                <span>我的打新额度 <span class="upamount" @click="upAmountClick">去提额</span> <img class="up-icon" src="static/up.png"/></span>
                <span>{{userAmountMoneyFormat}} $</span>
              </div>
              <div>
                <span>预约金额</span>
                <div class="buy-number"><input type="text" placeholder="请输入金额" autocomplete="off" v-model="buyNumber"> $</div>
              </div>
              <div class="buy-button">
                <van-button type="default" @click="buyClick">立即预约</van-button>
              </div>
            </div>
            <div class="buy-success" v-if="buySuccess">
              <div class="success-img">
                <img src="static/wancheng.png" />
              </div>
              <div class="success-title">
                预约成功
              </div>
              <div class="success-span">
                <span>预约项目</span>
                <span>{{projectData.p_name}}</span>
              </div>
              <div class="success-span">
                <span>预约项目</span>
                <span>{{buyNumber}} $</span>
                </div>
              <div class="success-button">
                <van-button type="default" @click="buySuccessClick">完成</van-button>
              </div>
            </div>
          </div>
      </van-popup>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader'
import {getProjectInfo, userBuy} from '@/api/index.js'
export default {
  name: 'projectDetails',
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
      /* 项目详情 */
      btnText: '立即预约',
      isEnd: true, /* 是否结束 */
      projectData: {
        url: '', /* 图片地址 */
        p_name: '', /* 项目名称 */
        alias: '', /* 项目代码 */
        surplus_price: '', /* 剩余额度 */
        total_price: '', /* 总额度 */
        introduction: '', /* 项目介绍 */
        content: '', /* 项目详情 */
        status: 1, /* 项目进度 */
        max_num: 0, /* 最大预约数 */
        min_num: 0/* 最小预约数 */
      },
      /* 用户信息 */
      userInfo: {
        /* 已预约额度 */
        num: '0',
        /* 打新额度 */
        userAmountMoney: '- -'
      },
      /* 预约form显示 */
      bottomDialogShow: false,
      /* 预约金额 */
      buyNumber: '',
      /* 成功显示 */
      buySuccess: false
    }
  },

  computed: {
    surplus_priceFormat () {
      return this.$cut(this.projectData.surplus_price)
    },
    total_priceFormat () {
      return this.$cut(this.projectData.total_price)
    },
    numFormat () {
      return this.$cut(this.userInfo.num)
    },
    userAmountMoneyFormat () {
      return this.$cut(this.userInfo.userAmountMoney)
    },
    max_numFormat () {
      return this.$cut(this.projectData.max_num)
    },
    min_numFormat () {
      return this.$cut(this.projectData.min_num)
    }
  },

  watch: {
  },

  created () {
    this.init()
  },

  mounted () {
    /* 是否展示最下面按钮 */
    if (this.$route.query.isEnd === false || this.$route.query.isEnd === 'false') {
      this.isEnd = false
    } else {
      this.isEnd = true
    }
  },

  methods: {
    init () {
      getProjectInfo({
        p_id: this.$route.query.id
      }).then(res => {
        this.projectData = res.data.projectInfo
        if (res.data.num > 0) {
          this.btnText = '追加预约'
        } else if (res.data.userAmountMoney === '') {
          this.btnText = '登录'
          return false
        } else {
          this.btnText = '立即预约'
        }
        this.userInfo.num = res.data.num
        this.userInfo.userAmountMoney = res.data.userAmountMoney
      }).catch(e => {
        this.$toast('请求失败，请联系管理员')
      })
    },
    /* 获取更多额度click */
    userInfoClick () {
      this.$router.push({
        name: 'userInfo',
        params: {
          userId: 1
        }
      })
    },
    /* 最下面按钮点击 */
    btnClick () {
      if (this.btnText === '登录') {
        this.$router.push({
          path: '/login'
        })
      } else {
        this.bottomDialogShow = true
      }
    },
    /* 去提额click */
    upAmountClick () {
      this.$router.push({
        path: '/userInfo'
      })
    },
    /* 预约点击 */
    buyClick () {
      var numTest = /^\+?[1-9][0-9]*$/
      /* /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/ 保留两位的浮点数 */
      if (!numTest.test(this.buyNumber)) {
        this.$dialog.alert({
          message: '金额必须是一个非零的正整数'
        })
        return false
      }
      if (this.buyNumber > this.projectData.max_num) {
        this.$dialog.alert({
          message: '金额必须小于预约最高限额'
        })
        return false
      }
      if (this.buyNumber < this.projectData.min_num) {
        this.$dialog.alert({
          message: '金额必须大于预约最低限额'
        })
        return false
      }
      if (this.buyNumber > this.userInfo.userAmountMoney) {
        this.$dialog.alert({
          message: '可用打新额度不足'
        })
        return false
      }
      userBuy({
        num: this.buyNumber,
        p_id: this.$route.query.id
      }).then(res => {
        this.buySuccess = true
        this.init()
      }).catch(e => {
        this.$dialog.alert({
          message: '预约失败'
        })
      })
    },
    /* 完成点击 */
    buySuccessClick () {
      this.bottomDialogShow = false
      this.buySuccess = false
    }
  }
}
</script>

<style lang="scss">
.projectDetails {
  max-width: 800px;
  margin: 0 auto;
  .header{
    height: 60px;
  }
  .title{
    text-align: center;
    margin-bottom: 20px;
    >img{
      height: 60px;
    }
    >h1{
      font-size: 20px;
      font-weight:500;
      margin: 10px 0 6px 0;
    }
    >p{
      font-size:13px;
      font-weight:normal;
      color:rgba(0,0,0,.4);
    }
  }
  .info{
    box-sizing: border-box;
    width: 100%;
    padding:0 10px;
    .info-twoLine{
      >h6{
        font-size:13px;
        color:rgba(0,0,0,.4);
        font-weight:normal;
        margin-bottom: 10px;
      }
      >p{
        font-size:13px;
        margin-bottom: 10px;
      }
    }
    .info-line{
      margin-bottom: 10px;
      >h6{
        font-size:13px;
        color:rgba(0,0,0,.4);
        font-weight:normal;
        display: inline-block;
        min-width: 110px;
      }
      >span{
        font-size:13px;
      }
    }
  }
  .steps{
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto;
   /*  border-bottom: 1px solid rgba(0, 0, 0, .1); */
    .van-step--finish .van-step__circle, .van-step--finish .van-step__line {
      background-color: #3C5A9A;
    }
  }
  .interaction{
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    margin-top: 20px;
    .interaction-num{
      display: flex;
      justify-content: space-between;
      >span{
        font-size:13px;
      }
      >span:nth-child(1){
        color:rgba(0,0,0,.4);
      }
    }
    .interaction-link{
      text-align: center;
      margin: 30px 0;
      >h6{
        font-size:13px;
        color:rgba(0,0,0,.4);
        font-weight:normal;
        margin-bottom: 10px;
      }
      >p{
        color: #4892ff;
        font-size:13px;
        margin-bottom: 10px;
      }
      >span{
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:#3C5A9A;
      }
      >i{
          color:rgba(72,146,255,1);
          font-size: 18px;
          vertical-align: sub;
          margin-left: 10px;
        }
      .botton{
        width: 90%;
        margin: 10px auto;
       .van-button--large{
          height: 44px;
          line-height: 44px;
          color:#fff;
          background:#3C5A9A;
          border-radius:6px;
        }
      }
    }
  }
  .bottom-dialog{
    z-index: 9998 !important;
    height: 280px;
    overflow-y: visible;
    border-radius:20px 20px 0px 0px;
    .buy-info{
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      z-index: 9999;
      height: 280px;
      width: 100%;
      background-color: #fff;
      border-radius:20px 20px 0px 0px;
      padding: 25px 10px;
      >img{
        height: 40px;
        position: absolute;
        z-index: 9999;
        top:-20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
      }
      .buy-form{
          >div{
              display: flex;
              justify-content: space-between;
              margin-bottom:15px;
            >span:nth-child(1){
              font-size:13px;
              color:rgba(0,0,0,.4);
              font-weight:400;
            }
            >span:nth-last-child(1){
              font-size:13px;
              font-weight:400;
            }
            .upamount{
              color:rgba(72,146,255,1);
              margin-left: 10px;
            }
            .buy-number{
              font-size: 13px;
              >input{
                box-sizing: border-box;
                border:1px solid rgba(151,151,151,.5);
                border-radius:4px;
                width: 100px;
                height: 30px;
                padding: 0 10px;
              }
            }
        }
         .buy-button{
          display: flex;
          justify-content: center;
          margin-top: 25px;
          >button{
            width: 90%;
            background:rgba(72,146,255,1);
            border-radius:6px;
            color: #fff;
          }
        }
        .up-icon{
          height: 15px;
          vertical-align: unset;
        }
      }
      .buy-success{
        >div{
          text-align: center;
        }
        .success-img{
          margin-top: 20px;
            >img{
              height: 30px;
            }
        }
        .success-title{
          margin-top: 20px;
          margin-bottom: 20px;
            font-size:20px;
            color:rgba(0,0,0,1);
            font-weight:bold;
        }
        .success-span{
          display: flex;
          justify-content: space-between;
          margin-bottom:15px;
          >span:nth-child(1){
            font-size:13px;
            color:rgba(0,0,0,.4);
            font-weight:400;
          }
          >span:nth-last-child(1){
            font-size:13px;
            font-weight:400;
          }
        }
        .success-button{
          display: flex;
          justify-content: center;
          margin-top: 25px;
          >button{
            width: 90%;
            background:rgba(72,146,255,1);
            border-radius:6px;
            color: #fff;
          }
        }
      }
    }
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
