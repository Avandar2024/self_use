<script setup lang="ts">
import { 
  NCard, 
  NSpace, 
  NProgress 
} from 'naive-ui'
import platformText from '../resource/components/platformDistribution'

interface PlatformData {
  name: string;
  percentage: number;
  color: string;
}

defineProps<{
  platformData: PlatformData[];
}>();
</script>

<template>
  <n-card :title="platformText.title" class="platform-card bordered-card">
    <template #header>
      <div class="card-header">
        <div>{{ platformText.title }}</div>
        <div class="description">{{ platformText.description }}</div>
      </div>
    </template>
    <n-space vertical>
      <div v-if="platformData && platformData.length > 0">
        <div v-for="(platform, index) in platformData" :key="index" class="platform-item">
          <div class="platform-header">
            <span>{{ platform.name }}</span>
            <span>{{ platform.percentage }}%</span>
          </div>
          <n-progress
            type="line"
            :percentage="platform.percentage"
            :color="platform.color"
            :height="12"
            :border-radius="4"
          />
        </div>
      </div>
      <div v-else class="no-data">
        {{ platformText.noData }}
      </div>
    </n-space>
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

.card-header {
  display: flex;
  flex-direction: column;
}

.description {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 4px;
}

.platform-item {
  margin-bottom: 12px;
}

.platform-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 4px;
  color: #333333;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: rgba(0, 0, 0, 0.45);
}

/* 确保卡片标题也是黑色 */
:deep(.n-card-header__main) {
  color: #333333;
}
</style>