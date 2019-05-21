<template>
  <div class="userOrder">
    <div class="header">
      <myHeader :title="title"></myHeader>
    </div>
    <div class="centent">
      <van-tabs type="card">
        <van-tab title="预约中">
          <orderCard v-for="item in ingList" :key="item.b_id" v-bind="item" :state="'ing'" @revokeClick="revokeClick"></orderCard>
        </van-tab>
        <van-tab title="历史预约">
          <orderCard v-for="item in historyList" :key="item.b_id" v-bind="item" :state="'history'"></orderCard>
        </van-tab>
        <van-tab title="已撤单">
          <orderCard v-for="item in deleteList" :key="item.b_id" v-bind="item" :state="'delete'"></orderCard>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader'
import orderCard from '@/components/card/orderCard'
import {getUserOrder, getUserRevoke} from '@/api/index.js'
export default {
  name: 'userOrder',

  components: {
    myHeader,
    orderCard
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data () {
    return {
      title: '我的预约',
      ingList: [],
      historyList: [],
      deleteList: []
    }
  },

  computed: {
  },

  watch: {
  },

  created () {
    this.init()
  },

  mounted () {
  },

  methods: {
    init () {
      getUserOrder().then(res => {
        res.data[1].forEach(item => {
          this.ingList.push({
            b_id: item.b_id,
            imgSrc: item.project.url,
            projectName: item.project.p_name,
            projectCode: item.project.alias,
            userAmount: item.num,
            orderTime: new Date(item.create_time * 1000).format('yyyy-MM-dd hh:mm:ss'),
            cancelTime: item.revoke_time ? new Date(item.revoke_time * 1000).format('yyyy-MM-dd hh:mm:ss') : ''
          })
        })
        res.data[2].forEach(item => {
          this.historyList.push({
            imgSrc: item.project.url,
            projectName: item.project.p_name,
            projectCode: item.project.alias,
            userAmount: item.num,
            orderTime: new Date(item.create_time * 1000).format('yyyy-MM-dd hh:mm:ss'),
            cancelTime: item.revoke_time ? new Date(item.revoke_time * 1000).format('yyyy-MM-dd hh:mm:ss') : ''
          })
        })
        res.data[3].forEach(item => {
          this.deleteList.push({
            imgSrc: item.project.url,
            projectName: item.project.p_name,
            projectCode: item.project.alias,
            userAmount: item.num,
            orderTime: new Date(item.create_time * 1000).format('yyyy-MM-dd hh:mm:ss'),
            cancelTime: item.revoke_time ? new Date(item.revoke_time * 1000).format('yyyy-MM-dd hh:mm:ss') : ''
          })
        })
      }).catch(e => {
        this.$router.push({path: '/login'})
      })
    },
    // eslint-disable-next-line camelcase
    revokeClick (b_id) {
      this.$dialog.confirm({
        title: '确认',
        message: '确认要撤单吗'
      }).then(() => {
        getUserRevoke({
          b_id
        }).then(res => {
          this.$toast.success('撤单成功')
          this.ingList = []
          this.historyList = []
          this.deleteList = []
          this.init()
        }).catch(e => {
          this.$toast.fail('撤单失败')
        })
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style lang="scss">
.userOrder {
  max-width: 800px;
  margin: 0 auto;
  .header{
    height: 60px;
  }
  .centent{
    .van-tabs__nav--card{
      border:0;
    }
    .van-tabs__nav--card .van-tab{
      color:rgba(0, 0, 0, .4);
      font-weight:500;
      border:0;
    }
    .van-tabs__nav--card .van-tab.van-tab--active{
      color:#fff;
      font-weight:500;
      background-color: #4892FF;
      border-radius:16px;
    }
    .van-tabs .van-tab__pane{
      padding:0 15px;
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
