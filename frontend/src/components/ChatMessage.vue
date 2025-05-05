<template>
  <div :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']">
    <!-- 用户头像 -->
    <div class="message-avatar" v-if="message.role === 'user'">
      <n-avatar :src="userAvatar" />
    </div>
    
    <!-- 消息内容 -->
    <div class="message-content" :class="message.role === 'user' ? 'user-content' : 'ai-content'">
      <div class="message-text">{{ message.content }}</div>
      <div class="message-time">{{ message.time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui'

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  time: string;
}

defineProps<{
  message: ChatMessage;
  userAvatar: string;
}>();
</script>

<style scoped>
.message {
  display: flex;
  gap: 12px;
  max-width: 85%;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.ai-message {
  align-self: flex-start;
}

.message-avatar {
  flex-shrink: 0;
}

.message-content {
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
}

.user-content {
  background-color: rgba(230, 247, 255, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top-right-radius: 0;
  transition: backdrop-filter 0.3s ease;
}

.user-content:hover {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.ai-content {
  background-color: rgba(245, 245, 245, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top-left-radius: 4px;
  margin-left: 0;
  transition: backdrop-filter 0.3s ease;
}

.ai-content:hover {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.message-text {
  margin-bottom: 5px;
  white-space: pre-wrap;
}

.message-time {
  font-size: 12px;
  color: #999;
  text-align: right;
}
</style>