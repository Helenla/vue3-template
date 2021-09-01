<template>
  <section class="page">
    <header class="header">首页</header>
    <section class="page-content">
      <van-cell center title="黑夜模式">
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-cell>
      <van-cell center title="黑夜模式" />
    </section>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup: () => {
    const count = ref(9999)
    const checked = ref(false)

    return {
      count,
      checked
    }
  },
  created() {
    console.log(this.checked)
  },
  watch: {
    checked(val) {
      
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>
