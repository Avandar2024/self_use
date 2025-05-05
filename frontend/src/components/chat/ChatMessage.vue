<template>
  <div class="message-container" :class="role">
    <div v-if="role === 'user'" class="message-bubble">
      <div v-html="formattedContent" class="message-content"></div>
    </div>
    
    <div v-else class="ai-content">
      <div v-html="formattedContent" class="message-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
.message-container {
  display: flex;
  width: 100%;
  margin: 0;
  gap: 12px;
  align-items: flex-start;
}

.message-container.user {
  justify-content: flex-end;
  padding: 8px 16px;
}

.message-container.ai {
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 16px 24px;
  border-bottom: 1px solid #eaeaea;
}

.message-bubble {
  max-width: 80%;
  word-wrap: break-word;
  padding: 10px 16px;
  border-radius: 18px;
  background-color: #1890ff;
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* AI 内容直接嵌入页面 */
.ai-content {
  width: 100%;
  word-wrap: break-word;
}

.message-content {
  line-height: 1.6;
}

.ai .message-content {
  font-size: 15px;
}

.user .message-content {
  text-align: left;
}

.ai + .ai {
  border-top: none;
  margin-top: -16px; /* 使连续的AI消息更加紧凑 */
  padding-top: 0;
}
</style>