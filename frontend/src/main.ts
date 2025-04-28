import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {
  create,
  NButton,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  NIcon,
  NMessageProvider,
  NCard,
  NDataTable,
  NStatistic,
  NGrid,
  NGridItem,
  NSpin,
  NSpace,
  NProgress,
  NConfigProvider
} from 'naive-ui'

// 创建 Naive UI 实例
const naive = create({
  components: [
    NButton,
    NLayout,
    NLayoutSider,
    NLayoutContent,
    NMenu,
    NIcon,
    NMessageProvider,
    NCard,
    NDataTable,
    NStatistic,
    NGrid,
    NGridItem,
    NSpin,
    NSpace,
    NProgress,
    NConfigProvider
  ]
})

const app = createApp(App)
app.use(naive)
app.mount('#app')
