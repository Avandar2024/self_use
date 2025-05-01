<script setup lang="ts">
import { 
  NCard, 
  NDataTable
} from 'naive-ui'
import courseTableText from '../resource/components/courseTable'

// 表格数据类型定义
interface Course {
  rank: number;
  name: string;
  platform: string;
  students: number;
  satisfaction: number;
}

defineProps<{
  tableData: Course[];
}>();

// 表格列定义
const columns = [
  {
    title: courseTableText.columns.name,
    key: 'name'
  },
  {
    title: courseTableText.columns.platform,
    key: 'platform'
  },
  {
    title: courseTableText.columns.students,
    key: 'students'
  },
  {
    title: courseTableText.columns.rating,
    key: 'satisfaction'
  },
  {
    title: courseTableText.columns.progress,
    key: 'progress'
  }
]
</script>

<template>
  <n-card :title="courseTableText.title" class="dashboard-card bordered-card">
    <template #header-extra>
      <a href="#" class="view-all">{{ courseTableText.viewAll }}</a>
    </template>
    <div v-if="tableData && tableData.length > 0">
      <n-data-table
        :columns="columns"
        :data="tableData"
        :bordered="false"
        :single-line="false"
      />
    </div>
    <div v-else class="no-data">
      {{ courseTableText.noData }}
    </div>
  </n-card>
</template>

<style scoped>
.bordered-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  color: #333333;
}

.view-all {
  font-size: 14px;
  color: #2080f0;
  text-decoration: none;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: rgba(0, 0, 0, 0.45);
}

/* 确保卡片标题和表格内容为黑色 */
:deep(.n-card-header__main) {
  color: #333333;
}

:deep(.n-data-table) {
  color: #333333;
  --n-th-color: #f5f5f5;
  --n-td-color: transparent;
}
</style>