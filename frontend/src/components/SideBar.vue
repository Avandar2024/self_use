<script setup lang="ts">
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Component } from 'vue'
import { 
  NLayoutSider, 
  NMenu, 
  NIcon,
  NButton
} from 'naive-ui'
import { 
  BookOutline as BookIcon,
  HomeOutline as HomeIcon,
  InformationCircleOutline as InfoIcon,
  BarChartOutline as ChartIcon,
  MenuOutline as MenuIcon,
  ChevronBackOutline as ChevronBackIcon
} from '@vicons/ionicons5'

const router = useRouter()
// 控制侧边栏折叠状态
const collapsed = ref(true)

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
    label: '今日消息',
    key: 'dashboard',
    icon: renderIcon(ChartIcon)
  },
  {
    label: 'ai互动',
    key: 'chat',
    icon: renderIcon(BookIcon)
  },
  {
    label: '关于我们',
    key: 'about',
    icon: renderIcon(InfoIcon)
  }
]

// 处理菜单选择事件
const handleMenuSelect = (key: string) => {
  router.push(`/${key === 'home' ? '' : key}`)
  // 在移动设备上选择菜单项后自动折叠侧边栏
  if (window.innerWidth < 768) {
    collapsed.value = true
  }
}

// 切换侧边栏显示/隐藏
const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div class="sidebar-container">
    <!-- 侧边栏切换按钮 -->
    <div class="sidebar-toggle" @click="toggleSidebar">
      <n-button circle>
        <template #icon>
          <n-icon>
            <MenuIcon v-if="collapsed" />
            <ChevronBackIcon v-else />
          </n-icon>
        </template>
      </n-button>
    </div>
    
    <!-- 侧边栏遮罩层 -->
    <div 
      v-show="!collapsed" 
      class="sidebar-overlay"
      @click="collapsed = true"
    ></div>
    
    <!-- 侧边栏内容 -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="0"
      :width="240"
      :collapsed="collapsed"
      :native-scrollbar="false"
      class="sidebar"
      :class="{ 'sidebar-expanded': !collapsed }"
    >
      <div class="logo-container">
        <img alt="Logo" class="logo" src="../assets/logo.svg" />
      </div>
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        default-value="dashboard"
        @update:value="handleMenuSelect"
      />
    </n-layout-sider>
  </div>
</template>

<style scoped>
.sidebar-container {
  position: relative;
}

.sidebar-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 200;
  transition: left 0.3s;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 150;
  background-color: #ffffff;
  color: #333333;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.sidebar-expanded {
  transform: translateX(0);
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 120;
}

.logo-container {
  padding: 16px;
  display: flex;
  justify-content: center;
  margin-top: 40px; /* 为顶部菜单按钮留出空间 */
}

.logo {
  width: 40px;
  height: 40px;
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

/* 响应式调整 */
@media (min-width: 768px) {
  .sidebar-toggle {
    left: 250px;
  }
}
</style>