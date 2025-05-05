<template>
  <div 
    class="message" 
    :class="{ 'user-message': role === 'user', 'ai-message': role === 'ai' }"
  >
    <div class="message-avatar">
      <n-avatar :size="32" round>
        {{ role === 'user' ? 'U' : 'AI' }}
      </n-avatar>
    </div>
    <div class="message-content">
      <div v-html="formattedContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps({
  role: {
    type: String,
    required: true,
    validator: (value: string) => ['user', 'ai'].includes(value)
  },
  content: {
    type: String,
    required: true
  }
})

// 格式化消息内容，支持简单的markdown
const formattedContent = computed(() => {
  // 处理换行
  let formatted = props.content.replace(/\n/g, '<br>')
  // 处理加粗
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // 处理列表
  formatted = formatted.replace(/- (.*?)(?=<br>|$)/g, '• $1')
  return formatted
})
</script>

<style scoped>
.message {
  display: flex;
  margin-bottom: 24px;
  gap: 12px;
}

.message-avatar {
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.6;
}

.user-message .message-content {
  background-color: #e6f7ff;
}

.ai-message .message-content {
  background-color: #f9f9fb;
}
</style>