<template>
  <div class="ShareLink">
    <div class="header">
       <myHeader :title="'分享邀请好友'"></myHeader>
    </div>
    <p class="tip">复制文案，分享邀请好友</p>
    <div class="copywriting">
      <textarea id="text" v-model="copywriting">
      </textarea>
    </div>
    <div class="button">
       <van-button ref="copy" data-clipboard-action="copy" data-clipboard-target="#text" type="default" @click="copyClick">复制</van-button>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader'
import {getInvitationLink} from '@/api/index.js'
export default {
  name: 'ShareLink',

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
      link: '',
      copyBtn: null

    }
  },

  computed: {
    copywriting () {
      return '【开心交易所】百分百中签，轻松预约份额打新币，送你首发新币打新额度 http://www.kxcoin.com/ 请填写我的邀请码：' + this.link
    }
  },

  watch: {
  },

  created () {
    getInvitationLink().then(res => {
      this.link = res.data
    }).catch(e => {
      console.log(e)
    })
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
.ShareLink {
  max-width: 800px;
  margin: 0 auto;
  .header{
    height: 60px;
  }
  .tip{
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    margin-top: 50px;
    font-size:18px;
    font-weight:500;
  }
  .copywriting{
    margin-top: 20px;
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    height:140px;
    >textarea{
      height: 100%;
      width: 100%;
      resize:none
    }
  }
  .button{
    display: flex;
    justify-content: center;
    margin-top: 50px;
    >button{
      color: #ffffff;
      width: 90%;
      background:rgba(72,146,255,1);
      border-radius:6px;
    }
  }
}
</style>
