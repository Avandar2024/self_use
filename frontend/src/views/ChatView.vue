<template>
  <div class="chat-container">
    <n-card :title="chatText.title" class="chat-card">
      <div class="chat-messages" ref="chatMessagesRef">
        <ChatMessage 
          v-for="(message, index) in messages" 
          :key="index"
          :message="message"
          :userAvatar="userAvatar"
        />
      </div>
      
      <div class="chat-input blur-effect">
        <n-input
          v-model:value="inputMessage"
          type="textarea"
          :placeholder="chatText.placeholder"
          :autosize="{ minRows: 2, maxRows: 5 }"
          @keydown.enter.prevent="sendMessage"
        />
        <n-button 
          type="primary" 
          :disabled="!inputMessage.trim()" 
          @click="sendMessage"
          class="send-btn"
        >
          <template #icon>
            <n-icon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg>
            </n-icon>
          </template>
          {{ chatText.send }}
        </n-button>
      </div>
    </n-card>
    
    <n-card :title="chatText.examples.title" class="suggestions-card">
      <div class="suggestion-list">
        <div v-for="(suggestion, index) in chatText.examples.questions" :key="index" 
             class="suggestion-item blur-effect" @click="useQuestion(suggestion)">
          {{ suggestion }}
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { 
  NCard, 
  NInput, 
  NButton, 
  NIcon
} from 'naive-ui'
import ChatMessage from '../components/ChatMessage.vue'
import chatText from '../resource/chat'

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  time: string;
}

// 聊天记录
const messages = ref<ChatMessage[]>([
  {
    role: 'ai',
    content: chatText.welcomeMessage,
    time: new Date().toLocaleTimeString()
  }
]);

// 输入内容
const inputMessage = ref('');

// 用户头像
const userAvatar = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg';

// 聊天区域DOM引用
const chatMessagesRef = ref<HTMLElement | null>(null);

// 发送消息
const sendMessage = async () => {
  const content = inputMessage.value.trim();
  if (!content) return;
  
  // 用户消息
  const userMessage: ChatMessage = {
    role: 'user',
    content,
    time: new Date().toLocaleTimeString()
  };
  
  messages.value.push(userMessage);
  inputMessage.value = '';
  
  // 滚动到底部
  await nextTick();
  scrollToBottom();
  
  // 模拟AI回复
  setTimeout(() => {
    const aiResponse = getAIResponse(content);
    messages.value.push({
      role: 'ai',
      content: aiResponse,
      time: new Date().toLocaleTimeString()
    });
    
    // 滚动到底部
    nextTick().then(() => {
      scrollToBottom();
    });
  }, 1000);
};

// 使用建议问题
const useQuestion = (question: string) => {
  inputMessage.value = question;
};

// 模拟AI回复
const getAIResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('学习效率')) {
    return '提高学习效率的方法：1. 制定明确的学习计划；2. 使用番茄工作法；3. 减少干扰源；4. 保持充足的睡眠；5. 使用主动回忆法学习。';
  } else if (lowerMsg.includes('计算机') && lowerMsg.includes('课程')) {
    return '推荐的计算机科学入门课程：1. CS50（哈佛大学）；2. MIT的计算机导论；3. 北京大学的《计算机科学与编程导论》；4. 浙江大学的《程序设计入门》；5. 南京大学的《计算机系统基础》。';
  } else if (lowerMsg.includes('学习数据') || lowerMsg.includes('分析')) {
    return '根据您最近的学习数据，您的知识点掌握率为78%，比上周提高了5%。建议重点关注"数据结构"和"算法设计"两个薄弱环节。';
  } else if (lowerMsg.includes('学习计划')) {
    return '制定有效学习计划的步骤：1. 明确学习目标；2. 分解为小目标；3. 设定时间限制；4. 安排固定学习时间；5. 定期回顾和调整；6. 设置奖励机制；7. 使用学习工具追踪进度。';
  } else if (lowerMsg.includes('学习方法')) {
    return '有效的学习方法：1. 费曼学习法（教授他人）；2. 间隔重复法；3. 主动回忆法；4. 思维导图整理知识；5. 针对性练习；6. PQ4R方法（预览、提问、阅读、思考、复述、回顾）。';
  } else {
    return '感谢您的问题。作为AI助手，我正在不断学习中。您可以尝试问我关于学习方法、课程推荐或学习计划方面的问题，我会尽力提供帮助。';
  }
};

// 滚动到底部
const scrollToBottom = () => {
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
.chat-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 150px);
}

.chat-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.suggestions-card {
  height: 100%;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100% - 120px);
}

.chat-input {
  margin-top: auto;
  display: flex;
  gap: 10px;
  align-items: flex-end;
  padding: 20px 15px 5px;
  border-radius: 16px;
}

.send-btn {
  height: 54px;
  display: flex;
  align-items: center;
}

.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.suggestion-item {
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease, backdrop-filter 0.3s ease;
  background-color: rgba(245, 245, 245, 0.7);
}

.suggestion-item:hover {
  background-color: rgba(230, 247, 255, 0.7);
  transform: translateY(-2px);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 3px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>