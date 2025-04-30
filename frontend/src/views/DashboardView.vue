<template>
  <div>
    <!-- 顶部控制栏 -->
    <div class="dashboard-header">
      <h1>教育数据看板</h1>
      <n-button 
        @click="handleRefresh" 
        :loading="loading"
        secondary 
        type="primary"
        class="refresh-btn"
      >
        <template #icon>
          <n-icon><refresh-icon /></n-icon>
        </template>
        刷新数据
      </n-button>
    </div>
    
    <!-- 调试信息 -->
    <div class="debug-info">
      <p>总用户数: {{ summaryData?.totalUsers }}</p>
      <p>课程数量: {{ tableData?.length }}</p>
      <p>新闻数量: {{ newsData?.length }}</p>
    </div>
    
    <n-spin :show="loading">
      <!-- 概览卡片 -->
      <StatisticCards :summary-data="summaryData" />
      
      <n-grid :cols="12" :x-gap="16" :y-gap="16" class="dashboard-grid">
        <!-- 热门课程表格 -->
        <n-grid-item :span="8">
          <CourseTable :table-data="tableData" />
        </n-grid-item>
        
        <!-- 右侧统计区 -->
        <n-grid-item :span="4">
          <!-- 平台使用分布 -->
          <PlatformDistribution :platform-data="platformData" />
          
          <!-- 最新动态 -->
          <LatestNews :news-data="newsData" />
        </n-grid-item>
      </n-grid>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  NButton,
  NGrid,
  NGridItem,
  NSpin,
  NIcon,
  createDiscreteApi
} from 'naive-ui'
import { RefreshOutline as RefreshIcon } from '@vicons/ionicons5'
import StatisticCards from '../components/StatisticCards.vue'
import CourseTable from '../components/CourseTable.vue'
import PlatformDistribution from '../components/PlatformDistribution.vue'
import LatestNews from '../components/LatestNews.vue'
import { useDashboardData } from '../services/dataService'

// 获取数据
const { summaryData, tableData, newsData, platformData, refreshData } = useDashboardData()
const loading = ref(false)

// 创建离散API，可以在组件外使用
const { message } = createDiscreteApi(['message'])

// 刷新数据的方法
const handleRefresh = async () => {
  loading.value = true
  try {
    await refreshData()
    message.success('数据已更新')
  } catch (error) {
    console.error('Refresh error:', error)
    message.error('更新数据失败')
  } finally {
    loading.value = false
  }
}

// 确保在页面加载后数据可用
onMounted(() => {
  console.log('Dashboard mounted, data available:', { 
    summaryData: summaryData.value,
    tableData: tableData.value,
    newsData: newsData.value,
    platformData: platformData.value
  });
})
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dashboard-header h1 {
  color: #333333;
  font-size: 24px;
  margin: 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
}

.dashboard-grid {
  margin-top: 20px;
}

.debug-info {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>