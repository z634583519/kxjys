<template>
  <div class="invitationIndex">
     <div class="header">
       <myHeader :title="'邀请提额'"></myHeader>
    </div>
    <div class="bgImg">
      <img src="static/invitationIndexBg.png" />
    </div>
    <div class="text">
      <p>邀请新用户可获得</p>
      <p>500$</p>
    </div>
    <div class="button">
      <van-button type="default" @click="posterClick">获取邀请海报</van-button>
      <van-button type="default" @click="shareLinkClick">分享邀请链接</van-button>
    </div>
    <div class="invitation-number">
      已邀请<span> {{invitationNumber}} </span>人
    </div>
    <div>
      <van-cell
        v-for="item in invitedList"
        :key="item"
        :title="item.phoneNumber"
        :value="item.money"
      />
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader'
import { getUserRecommend } from '@/api/index.js'
export default {
  name: 'invitationIndex',

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
      invitationNumber: 0,
      invitedList: []
    }
  },

  computed: {
  },

  watch: {
  },

  created () {
    getUserRecommend().then(res => {
      this.invitationNumber = res.data.count
      res.data.recommend.forEach(item => {
        this.invitedList.push({
          phoneNumber: item.user.telephone,
          money: `已为您提升 ${item.num} 额度`
        })
      })
    }).catch(e => {
      this.$router.push({
        path: '/login'
      })
    })
  },

  mounted () {
  },

  methods: {
    init () {},
    shareLinkClick () {
      this.$router.push({
        path: '/shareLink'
      })
    },
    posterClick () {
      this.$router.push({
        path: '/invitationPoster'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.invitationIndex {
  max-width: 800px;
  margin: 0 auto;
  .header{
    height: 60px;
  }
  .bgImg{
    margin-top: 0px;
    width: 100%;
    >img{
      width: 100%;
    }
  }
  .text{
    margin-top: 30px;
    text-align: center;
    >p{
      font-size:30px;
      font-weight:500;
    }
  }
  .button{
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
    align-content: center;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    >button{
      color: #ffffff;
      width: 47%;
      background:rgba(72,146,255,1);
      border-radius:6px;
    }
  }
  .invitation-number{
    font-size:12px;
    color:rgba(0,0,0,.4);
    text-align: center;
    margin-top: 30px;
    >span{
      color:rgba(72,146,255,1);
    }
  }
  .van-cell:not(:last-child)::after{
    border-bottom: 0
  }
}
</style>
