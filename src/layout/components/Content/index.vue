<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheList">
      <component :is="Component" :key="key" />
    </keep-alive>
  </router-view>
</template>

<script>
import {
  defineComponent,
  computed
} from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useTags } from '@/pinia/modules/tags'
export default defineComponent({
  name: "trail-content",
  setup(){
    const route = useRoute()
    const { cacheList } = storeToRefs(useTags())

    const key = computed(() => route.fullPath)

    return {
      cacheList,
      key
    }
  }
})
</script>
