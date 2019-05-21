<template>
  <div class="InvitationPoster">
    <div class="header">
       <myHeader></myHeader>
    </div>
    <img src="/kx/userCenter/qrcode"/>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader'
export default {
  name: 'InvitationPoster',

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
    init () {}
  }
}
</script>

<style lang="scss" scoped>
.InvitationPoster {
  max-width: 800px;
  margin: 0 auto;
  >img{
    margin-top: -60px;
    width: 100%;
  }
  .header{
    background: rgba(255,255,255,0)
  }
}
</style>
