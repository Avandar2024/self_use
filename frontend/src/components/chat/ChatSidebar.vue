<template>
  <div class="chat-sidebar">
    <div class="logo">
      <h2>deepseek</h2>
    </div>
    
    <!-- 新建聊天按钮 -->
    <div class="new-chat-button">
      <n-button type="primary" ghost @click="$emit('new-chat')">
        <template #icon>
          <n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/></svg></n-icon>
        </template>
        {{ chatResource.clearChat }}
      </n-button>
    </div>
    
    <!-- 历史对话列表 -->
    <div class="history-container">
      <h3>{{ chatResource.title }}</h3>
      <div 
        v-for="(chat, index) in chatHistory" 
        :key="index" 
        class="history-item" 
        :class="{ active: currentChatIndex === index }"
        @click="$emit('select-chat', index)"
      >
        {{ chat.title }}
        <div class="item-actions">
          <n-button quaternary circle size="small" @click.stop="$emit('delete-chat', index)">
            <template #icon><n-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg></n-icon></template>
          </n-button>
        </div>
      </div>
    </div>
    
    <!-- 底部用户信息 -->
    <div class="user-info">
      <n-avatar size="small" round>U</n-avatar>
      <span>个人信息</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon, NAvatar } from 'naive-ui'
import chatResource from '../../resource/chat'

interface ChatItem {
  title: string;
  // Add other properties your chat object might have
}

defineProps({
  chatHistory: {
    type: Array as () => ChatItem[],
    required: true
  },
  currentChatIndex: {
    type: Number,
    required: true
  }
})

defineEmits(['new-chat', 'select-chat', 'delete-chat'])
</script>

<style scoped>
.chat-sidebar {
  width: 240px;
  background-color: #f9f9fb;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
}

.logo {
  margin-bottom: 20px;
  padding-left: 10px;
}

.logo h2 {
  color: #333;
  font-size: 24px;
  margin: 0;
}

.new-chat-button {
  margin-bottom: 20px;
}

.history-container {
  flex: 1;
  overflow-y: auto;
}

.history-container h3 {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  padding-left: 10px;
}

.history-item {
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-item:hover {
  background-color: #f0f0f0;
}

.history-item.active {
  background-color: #e6f7ff;
}

.item-actions {
  opacity: 0;
}

.history-item:hover .item-actions {
  opacity: 1;
}

.user-info {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #e5e7eb;
  margin-top: 10px;
}
</style>