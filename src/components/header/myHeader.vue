<template>
  <div class="header">
    <van-icon name="arrow-left" @click="backClick"/>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
    title: {
      default: '',
      type: String
    },
    isLogin: {
      default: false
    }
  },

  data () {
    return {
    }
  },

  computed: {
  },

  watch: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    init () {},
    backClick () {
      if (this.isLogin) {
        this.$router.push({path: '/'})
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  max-width: 800px;
  position: fixed;
  top: 0;
  z-index: 9997;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  line-height: 60px;
  text-align: center;
  background: #fff;
  i{
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }
  span{
    font-size:20px;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
}
</style>
