<script setup lang="ts">
import { 
  NCard, 
  NDataTable
} from 'naive-ui'

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
    title: '排名',
    key: 'rank'
  },
  {
    title: '课程名称',
    key: 'name'
  },
  {
    title: '平台',
    key: 'platform'
  },
  {
    title: '学习人数',
    key: 'students'
  },
  {
    title: '满意度',
    key: 'satisfaction'
  }
]
</script>

<template>
  <n-card title="热门课程排名" class="dashboard-card bordered-card">
    <n-data-table
      :columns="columns"
      :data="tableData"
      :bordered="false"
      :single-line="false"
    />
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