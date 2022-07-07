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
      <Cat />
    </section>

  </section>
</template>

<script setup lang="ts">
import Cat from "../../assets/svg/cat.svg"
import { ref } from 'vue'

const count = ref(9999)
const checked = ref(false)

</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>
