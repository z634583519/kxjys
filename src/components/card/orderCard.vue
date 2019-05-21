<template>
  <div class="orderCard">
    <div class="title">
      <img :src="'http://admin.kxcoin.com'+imgSrc"/>
      <span class="title-name">{{projectName}}</span>
      <span class="title-code">({{projectCode}})</span>
    </div>
    <div class="user-amount">
      <h6>预约额度($)</h6>
      <p>{{userAmountFormat}}</p>
    </div>
    <div class="order-state">
      <div class="time">
        <div>
          <span class="time-name">下单时间：</span>
          <span class="time-value">{{orderTime}}</span>
        </div>
        <div v-if="state==='delete'">
          <span class="time-name">撤单时间：</span>
          <span class="time-value">{{cancelTime}}</span>
        </div>
      </div>
      <div v-if="state==='ing'">
        <van-button type="default" @click="revokeClick">撤单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderCard',

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
    b_id: {
      required: true
    },
    state: {
      /* ing:预约中，history:历史预约，delete已删除 */
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    },
    projectName: {
      type: String,
      required: true
    },
    projectCode: {
      type: String,
      required: true
    },
    userAmount: {
      required: true
    },
    orderTime: {
      required: true
    },
    cancelTime: {}
  },

  data () {
    return {
    }
  },

  computed: {
    userAmountFormat () {
      return this.$cut(this.userAmount)
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
    revokeClick () {
      this.$emit('revokeClick', this.b_id)
    }
  }
}
</script>

<style lang="scss" scoped>
.orderCard {
  height: 180px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  .title{
    margin-top: 30px;
    >img{
      height: 25px;
      vertical-align: middle;
    }
    .title-name{
      font-size:16px;
      font-weight:bold;
      margin-left: 10px;
    }
    .title-code{
      font-size:15px;
      margin-left: 10px;
    }
  }
  .user-amount{
    text-align: center;
    margin-top: 16px;
    >h6{
      font-size:13px;
      font-weight: normal;
      color:rgba(0,0,0,.4);
    }
    >p{
      margin-top: 10px;
      font-size:16px;
    }
  }
  .order-state{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    align-items: center;
    height: 50px;
    .time{
      display: flex;
      align-items: center;
      flex-flow: column;
      .time-name{
        font-size:13px;
        color:rgba(0,0,0,.4);
      }
      .time-value{
        font-size:13px;
      }
    }
  }
}
</style>
