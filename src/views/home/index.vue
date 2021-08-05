<template>
  <section class="page page-content">
    <h1>首页</h1>
    <div class="box">box</div>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { Toast } from 'vant'

export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const count = ref(9999)

    onMounted(() => {
      Toast({message: count.value})
    })

    return { count }
  },
  created() {
    console.log(import.meta.env);
  },
})
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>
