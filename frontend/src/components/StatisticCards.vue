<script setup lang="ts">
import { 
  NGrid, 
  NGridItem, 
  NCard, 
  NStatistic,
  NIcon
} from 'naive-ui'

defineProps<{
  summaryData: {
    totalUsers: number;
    activeUsers: number;
    completionRate: number;
    coursesCount: number;
  }
}>();
</script>

<template>
  <n-grid :cols="4" :x-gap="16">
    <n-grid-item>
      <n-card class="stat-card">
        <n-statistic label="总用户数" :value="summaryData.totalUsers">
          <template #prefix>
            <n-icon class="stat-icon user-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
            </n-icon>
          </template>
        </n-statistic>
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card class="stat-card">
        <n-statistic label="活跃用户" :value="summaryData.activeUsers">
          <template #prefix>
            <n-icon class="stat-icon active-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 14q-1.25 0-2.125-.875T13 11q0-1.25.875-2.125T16 8q1.25 0 2.125.875T19 11q0 1.25-.875 2.125T16 14m-6 8q-.425 0-.712-.288T9 21v-2H5q-.425 0-.712-.288T4 18V4q0-.425.288-.712T5 3h14q.425 0 .713.288T20 4v14q0 .425-.288.713T19 19h-4v2q0 .425-.288.713T14 22z"/></svg>
            </n-icon>
          </template>
        </n-statistic>
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card class="stat-card">
        <n-statistic label="完成率" :value="`${summaryData.completionRate.toFixed(1)}%`">
          <template #prefix>
            <n-icon class="stat-icon rate-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.66 10.37L20.43 14l1.23 3.63C21.89 18.29 21.13 19 20.41 19c-.3 0-.6-.08-.85-.22L16 17.13l-3.56 1.65c-.25.14-.55.22-.85.22c-.72 0-1.48-.71-1.25-1.37L11.57 14l-1.23-3.63c-.23-.66.53-1.37 1.25-1.37c.3 0 .6.08.85.22L16 10.87l3.56-1.65c.25-.14.55-.22.85-.22c.72 0 1.48.71 1.25 1.37"/></svg>
            </n-icon>
          </template>
        </n-statistic>
      </n-card>
    </n-grid-item>
    <n-grid-item>
      <n-card class="stat-card">
        <n-statistic label="课程总数" :value="summaryData.coursesCount">
          <template #prefix>
            <n-icon class="stat-icon course-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9zm6.82 6L12 12.72L5.18 9L12 5.28zM17 16l-5 2.72L7 16v-3.73L12 15l5-2.73z"/></svg>
            </n-icon>
          </template>
        </n-statistic>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<style scoped>
.stat-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
  color: #333333;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 24px;
  margin-right: 8px;
}

.user-icon {
  color: #2080f0;
}

.active-icon {
  color: #18a058;
}

.rate-icon {
  color: #f0a020;
}

.course-icon {
  color: #d03050;
}

/* 确保统计数据和标签为黑色 */
:deep(.n-statistic-value) {
  color: #333333 !important;
}

:deep(.n-statistic-label) {
  color: rgba(0, 0, 0, 0.7) !important;
}
</style>