<template>
  <section class="pages">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <van-config-provider :theme-vars="themeVars">
          <component :is="Component"/>
        </van-config-provider>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      themeVars: {
        cellTextColor: '#fff',
        cellBackgroundColor: '#000',
        cellBorderColor: '#fff'
      }
    }
  },
  created() {

  }
})
</script>

<style>
</style>
