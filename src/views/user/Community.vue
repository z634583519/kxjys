<template>
  <div class="Community">
     <div class="header">
       <myHeader :title="'加入社群'"></myHeader>
    </div>
    <div class="tip">加入社群，获取最新打新资讯</div>
    <div class="img"><img src="static/wximg.png"/></div>
    <div class="vxcode">
      <span>微信号：</span><span id="text">kxcoin001</span>
      <van-button ref="copy" data-clipboard-action="copy" data-clipboard-target="#text" type="default"  @click="copyClick">复制</van-button>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader'
export default {
  name: 'Community',

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
      copyBtn: null
    }
  },

  computed: {
  },

  watch: {
  },

  created () {
  },

  mounted () {
    // eslint-disable-next-line new-cap
    this.copyBtn = new this.clipboard(this.$refs.copy)
  },

  methods: {
    init () {},
    copyClick () {
      let _this = this
      let clipboard = _this.copyBtn
      clipboard.on('success', function () {
        _this.$toast.success('复制成功')
      })
      clipboard.on('error', function () {
        _this.$toast.fail('复制失败，请手动复制')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Community {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  .header{
    height: 60px;
  }
  .tip{
    margin-top: 30px;
    font-size:18px;
    font-weight:500;
  }
  .img{
    margin-top: 30px;
    >img{
      width: 160px;
    }
  }
  .vxcode{
    margin-top: 30px;
    font-size:18px;
    >button{
      margin-left: 10px;
      height: 32px;
      line-height: 32px;
      color: #fff;
      background:rgba(72,146,255,1);
      border-radius:6px;
    }
  }
}
</style>
