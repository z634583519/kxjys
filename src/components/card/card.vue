<template>
  <div ref="card" class="card" @click="cardClick">
    <div class="card-header">
      <img :src="'http://admin.kxcoin.com'+url"/>
      <h1>{{p_name}}</h1>
      <!-- <span>({{alias}})</span> -->
    </div>
    <div class="card-content">
      <div class="surplus-amount">
        <h6>平台剩余额度($)</h6>
        <p>{{surplus_priceFormat}}</p>
      </div>
      <div class="total-amount">
        <h6>总额度($)</h6>
        <p>{{total_priceFormat}}</p>
      </div>
    </div>
    <div class="card-botton" v-if="!isEnd">
      <van-button size="large" >立即预约</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
    p_id: {
      required: true
    },
    url: {
      type: String,
      required: true
    },
    p_name: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: true
    },
    surplus_price: {
      required: true
    },
    total_price: {
      required: true
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
    }
  },

  computed: {
    surplus_priceFormat () {
      return this.$cut(this.surplus_price)
    },
    total_priceFormat () {
      return this.$cut(this.total_price)
    }
  },

  watch: {
  },

  created () {
  },

  mounted () {
    if (this.isEnd) {
      this.$refs.card.style.height = '120px'
    }
  },

  methods: {
    init () {},
    cardClick () {
      this.$emit('click', this.p_id, this.isEnd)
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  width: 90%;
  height: 200px;
  box-shadow:0px 2px 12px 0px rgba(0,0,0,0.26);
  border-radius:10px;
  border:1px solp_id gainsboro;
  margin:10px auto;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  .card-header{
    align-self: flex-start;
    margin: 0 auto;
    margin-top: 10px;
    >img{
      height: 25px;
      vertical-align: text-bottom;
    }
    >h1{
      font-size:16px;
      display: inline-block;
      font-weight: bold
    }
    >span{
      font-size:16px;
      display: inline-block;
    }
  }
  .card-content{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    >div{
      text-align: center;
      >h6{
        font-size:13px;
        color:rgba(0,0,0,.4);
        font-weight: normal;
        margin-bottom: 5px;
      }
      >p{
        font-size:13px;
      }
    }
  }
  .card-botton{
    width: 90%;
    .van-button--large{
      height: 44px;
      line-height: 44px;
      color:#fff;
      background:#3C5A9A;
      border-radius:6px;
    }
  }
}
</style>
