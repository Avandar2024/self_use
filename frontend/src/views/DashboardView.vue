<template>
  <div>
    <!-- 调试信息 -->
    <div class="debug-info" v-if="debugMode">
      <p>{{ dashboardText.debug.totalUsers }}: {{ summaryData?.totalUsers }}</p>
      <p>{{ dashboardText.debug.coursesCount }}: {{ tableData?.length }}</p>
      <p>{{ dashboardText.debug.newsCount }}: {{ ddlData?.length }}</p>
    </div>
    
    <n-spin :show="loading">      
      <n-grid :cols="12" :x-gap="16" :y-gap="16" class="dashboard-grid">
        <!-- 左侧区域 -->
        <n-grid-item :span="8">
          <!-- 今日消息 -->
          <n-card :title="dashboardText.todayMessages.title" class="card-section">
            <div v-if="todayMessages && todayMessages.length > 0">
              <div v-for="(message, index) in todayMessages" :key="index" class="message-item">
                <div class="message-title">{{ message.title }}</div>
                <div class="message-footer">
                  <span>{{ message.time }}</span>
                  <span>{{ message.source }}</span>
                </div>
              </div>
              <div class="view-more">
                <a href="#">{{ dashboardText.todayMessages.viewMore }}</a>
              </div>
            </div>
            <div v-else class="no-data">
              {{ dashboardText.todayMessages.noMessages }}
            </div>
          </n-card>
          
          <!-- 历史消息 -->
          <n-card :title="dashboardText.historyMessages.title" class="card-section">
            <div v-if="historyMessages && historyMessages.length > 0">
              <div v-for="(message, index) in historyMessages" :key="index" class="message-item">
                <div class="message-title">{{ message.title }}</div>
                <div class="message-footer">
                  <span>{{ message.date }}</span>
                  <span>{{ message.views }} {{ dashboardText.historyMessages.views }}</span>
                </div>
              </div>
              <div class="view-more">
                <a href="#">{{ dashboardText.historyMessages.viewMore }}</a>
              </div>
            </div>
            <div v-else class="no-data">
              {{ dashboardText.historyMessages.noMessages }}
            </div>
          </n-card>
        </n-grid-item>
        
        <!-- 右侧区域 -->
        <n-grid-item :span="4">
          <!-- ddl提醒 -->
          <DdlNews :newsData="ddlBySelectedDate" />
          
          <!-- 简单日历 -->
          <n-card :title="dashboardText.calendar.title" class="calendar-card">
            <div class="calendar-container">
              <SimpleCalendar
                v-model:value="selectedDate"
                :disableFutureDates="true"
                @update:value="handleDateSelect"
              />
              <div class="calendar-footer">
                <span>点击查看 DDL</span>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  NGrid,
  NGridItem,
  NSpin,
  NCard,
  createDiscreteApi
} from 'naive-ui'
import DdlNews from '../components/DdlNews.vue'
import SimpleCalendar from '../components/SimpleCalendar.vue'
import { useDashboardData } from '../services/dataService'
import dashboardText from '../resource/dashboard'

// 调试模式开关
const debugMode = ref(false)

// 获取数据
const { summaryData, tableData, ddlData, todayMessages, historyMessages } = useDashboardData()
const loading = ref(false)
const selectedDate = ref(new Date())

// 创建离散API，可以在组件外使用
const { message } = createDiscreteApi(['message'])

// 日期选择处理
function handleDateSelect(date: Date) {
  selectedDate.value = date
}

// 根据选中日期过滤 DDL 数据
const ddlBySelectedDate = computed(() => {
  const sd = selectedDate.value.toISOString().slice(0, 10) // YYYY-MM-DD
  return ddlData.value.filter(item => item.date === sd)
})

// 确保在页面加载后数据可用
onMounted(() => {
  console.log('Dashboard mounted, data available:', { 
    summaryData: summaryData.value,
    newsData: ddlData.value,
    todayMessages: todayMessages.value,
    historyMessages: historyMessages.value
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

.summary-section {
  margin-bottom: 20px;
}

.summary-section h2 {
  font-size: 18px;
  margin-bottom: 12px;
  color: #333333;
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

.card-section {
  margin-bottom: 20px;
}

.message-item {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.message-item:last-child {
  border-bottom: none;
}

.message-title {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 6px;
}

.message-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999999;
}

.view-more {
  text-align: right;
  margin-top: 10px;
  font-size: 14px;
}

.view-more a {
  color: #8052da;
  text-decoration: none;
}

.no-data {
  text-align: center;
  padding: 15px 0;
  color: #999999;
}

.calendar-card {
  margin-top: 20px;
}

.calendar-container {
  display: flex;
  flex-direction: column;
}

.calendar-footer {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #999999;
}
</style>