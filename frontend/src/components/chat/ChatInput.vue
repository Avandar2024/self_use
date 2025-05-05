<template>
  <div class="chat-input-container">
    <div class="input-wrapper">
      <n-input 
        v-model:value="inputValue"
        type="textarea" 
        :autosize="{ minRows: 1, maxRows: 4 }"
        :placeholder="chatResource.placeholder"
        @keydown.enter.prevent="sendMessage"
      />
      <div class="input-actions">
        <n-button type="primary" :disabled="!inputValue.trim()" @click="sendMessage">
          {{ chatResource.send }}
        </n-button>
      </div>
    </div>
    <div class="chat-footer">
      <small>内容由 AI 生成，请勿完全依赖</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput } from 'naive-ui'
import chatResource from '../../resource/chat'

const inputValue = ref('')

const emit = defineEmits(['send'])

function sendMessage() {
  if (!inputValue.value.trim()) return
  
  emit('send', inputValue.value)
  inputValue.value = ''
}
</script>

<style scoped>
.chat-input-container {
  padding: 16px;
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.input-actions {
  margin-bottom: 8px;
}

.chat-footer {
  margin-top: 12px;
  text-align: center;
  color: #999;
}
</style>