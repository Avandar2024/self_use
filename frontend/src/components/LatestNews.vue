<script setup lang="ts">
import { NCard } from 'naive-ui'

interface NewsItem {
  title: string;
  date: string;
  views: number;
}

defineProps<{
  newsData: NewsItem[];
}>();
</script>

<template>
  <n-card title="最新动态" class="news-card bordered-card">
    <div v-for="(news, index) in newsData" :key="index" class="news-item">
      <div class="news-title">{{ news.title }}</div>
      <div class="news-footer">
        <span>{{ news.date }}</span>
        <span>{{ news.views }} 浏览</span>
      </div>
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

.news-card {
  margin-top: 16px;
}

.news-item {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.news-item:last-child {
  border-bottom: none;
}

.news-title {
  font-size: 14px;
  color: #333333;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
}

/* 确保卡片标题为黑色 */
:deep(.n-card-header__main) {
  color: #333333;
}
</style>