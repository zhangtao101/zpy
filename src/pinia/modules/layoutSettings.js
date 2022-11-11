import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'
import defaultSettings from '@/default-settings'

export const useLayoutsettings = defineStore('layoutSettings', {
    state: () => getItem('defaultSettings') || defaultSettings,
    actions: {
        saveSettings(data) {
            Object.entries(data).forEach(([key, value]) => {
                this[key] = value
            })
            setItem('defaultSettings', data)
        },
    }
})
