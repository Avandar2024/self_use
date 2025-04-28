<script setup lang="ts">
import { h } from 'vue'
import type { Component } from 'vue'
import { 
  NLayoutSider, 
  NMenu, 
  NIcon 
} from 'naive-ui'
import { 
  BookOutline as BookIcon,
  HomeOutline as HomeIcon,
  InformationCircleOutline as InfoIcon,
  BarChartOutline as ChartIcon
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: '首页',
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '数据看板',
    key: 'dashboard',
    icon: renderIcon(ChartIcon)
  },
  {
    label: '学习资源',
    key: 'resources',
    icon: renderIcon(BookIcon)
  },
  {
    label: '关于我们',
    key: 'about',
    icon: renderIcon(InfoIcon)
  }
]
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="false"
    class="sidebar"
  >
    <div class="logo-container">
      <img alt="Logo" class="logo" src="../assets/logo.svg" />
    </div>
    <n-menu
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      default-value="dashboard"
    />
  </n-layout-sider>
</template>

<style scoped>
.logo-container {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.logo {
  width: 40px;
  height: 40px;
}

.sidebar {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  z-index: 100;
  background-color: #ffffff;
  color: #333333;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

/* 确保菜单项文本颜色为黑色 */
:deep(.n-menu-item-content) {
  color: rgba(0, 0, 0, 0.85);
}

:deep(.n-menu-item-content__icon) {
  color: rgba(0, 0, 0, 0.85);
}

:deep(.n-menu-item-content.n-menu-item-content--selected) {
  color: #2080f0;
}
</style>