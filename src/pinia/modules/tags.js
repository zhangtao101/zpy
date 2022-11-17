import { defineStore } from 'pinia'
import { getItem, removeItem } from '@/utils/storage'
const TAGLIST = 'VEA-TAGLIST'

export const useTags = defineStore('tags', {
    state: () => ({
        tagList: getItem(TAGLIST) || [],
        cacheList: [],
        activePosition: -1,
    }),
    actions:{
        clearAllTags() {
            this.cacheList = []
            this.tagList = []
            // 保存到localStorage
            removeItem(TAGLIST)
        }
    }

})
