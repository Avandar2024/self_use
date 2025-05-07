<template>
  <div class="chat-view-wrapper">
    <div class="chat-container">
      <!-- 聊天侧边栏 -->
      <chat-sidebar
        :chat-history="chatHistory"
        :current-chat-index="currentChatIndex"
        @new-chat="startNewChat"
        @select-chat="selectChat"
        @delete-chat="deleteChat"
      />
      
      <!-- 主聊天区域 -->
      <div class="chat-main">
        <!-- 聊天头部 -->
        <div class="chat-header">
          <transition name="fade" mode="out-in">
            <h2 :key="currentChatIndex">{{ currentChat?.title || chatResource.title }}</h2>
          </transition>
        </div>
        
        <!-- 聊天消息区域 -->
        <div class="chat-messages" ref="messagesContainer">
          <!-- 欢迎消息 -->
          <transition name="fade" mode="out-in">
            <welcome-screen
              v-if="messages.length === 0"
              @ask-example="askExample"
            />
            
            <!-- 聊天消息列表 -->
            <div v-else class="messages-list">
              <transition-group name="message-fade">
                <chat-message
                  v-for="(msg, index) in messages"
                  :key="'msg-' + index"
                  :role="msg.role"
                  :content="msg.content"
                />
              </transition-group>
              
              <!-- 正在输入提示 -->
              <transition name="fade">
                <div v-if="isTyping" class="ai-typing">
                  <div class="typing-indicator">{{ chatResource.thinking }}</div>
                </div>
              </transition>
            </div>
          </transition>
        </div>
        
        <!-- 输入区域 -->
        <chat-input @send="onSendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import chatResource from '../resource/chat.ts'
import ChatSidebar from '../components/chat/ChatSidebar.vue'
import ChatMessage from '../components/chat/ChatMessage.vue'
import WelcomeScreen from '../components/chat/WelcomeScreen.vue'
import ChatInput from '../components/chat/ChatInput.vue'

// 定义ChatItem接口
interface ChatItem {
  id: string;
  title: string;
  date: Date;
}

// 聊天历史
const chatHistory = ref<ChatItem[]>([
  {
    id: '1',
    title: '南京大学计算机学院新闻',
    date: new Date(),
  },
  {
    id: '2',
    title: '南京大学校园活动咨询',
    date: new Date(),
  },
  {
    id: '3',
    title: '南京大学图书馆服务',
    date: new Date(),
  },
  {
    id: '4',
    title: '南京大学招生政策查询',
    date: new Date(),
  }
])

// 当前选中的聊天索引
const currentChatIndex = ref(0)

// 当前聊天
const currentChat = computed(() => {
  return chatHistory.value[currentChatIndex.value]
})

// 聊天消息
const messages = ref([
  { role: 'user', content: '今天计算机学院有什么新闻？' },
  {
    role: 'ai',
    content: '正在为您查找南京大学计算机学院的最新新闻...'
  }
])

// 是否正在输入
const isTyping = ref(false)
// 消息容器引用
const messagesContainer = ref<HTMLElement | null>(null)

// 发送消息
async function onSendMessage(message: string) {
  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: message
  })

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  // 显示AI正在输入
  isTyping.value = true

  // 模拟AI响应延迟
  setTimeout(() => {
    let aiResponse = `这是对"${message}"的模拟回复。请关注学校官方通知。`;
    if (message === '今天计算机学院有什么新闻？') {
      aiResponse = '南京大学计算机科学与技术系今日发布了关于人工智能研讨会的最新消息，详情请见院系官网公告。此外，本周五将举办博士生毕业论文答辩会。';
    }
    // 添加AI回复
    messages.value.push({
      role: 'ai',
      content: aiResponse
    })

    // 隐藏正在输入提示
    isTyping.value = false

    // 滚动到底部
    nextTick(() => {
      scrollToBottom()
    })
  }, 1500)
}

// 使用示例问题
function askExample(question: string) {
  onSendMessage(question)
}

// 滚动到底部
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 选择聊天
function selectChat(index: number) {
  currentChatIndex.value = index

  // 在实际应用中，这里会加载选中聊天的历史消息
  // 此处仅做演示
  if (chatHistory.value[index]?.title === '南京大学计算机学院新闻') {
    messages.value = [
      { role: 'user', content: '今天计算机学院有什么新闻？' },
      {
        role: 'ai',
        content: '南京大学计算机科学与技术系今日发布了关于人工智能研讨会的最新消息，详情请见院系官网公告。此外，本周五将举办博士生毕业论文答辩会。'
      }
    ]
  } else {
    // 其他对话只显示标题，没有历史消息
    messages.value = []
  }
}

// 删除聊天
function deleteChat(index: number) {
  chatHistory.value.splice(index, 1)
  if (currentChatIndex.value === index) {
    currentChatIndex.value = 0
    messages.value = []
  } else if (currentChatIndex.value > index) {
    currentChatIndex.value--
  }
}

// 开始新聊天
function startNewChat() {
  messages.value = []
  // 在实际应用中，这里会创建一个新的聊天记录
}

// 页面加载时滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-view-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: var(--md-grey-50);
  overflow: hidden;
}

.chat-container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background-color: #fffff0; /* Ivory color */
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
}

.chat-header {
  padding: 0;
  border-bottom: 1px solid #eaeaea;
  background-color: #fffff0; /* Ivory color */
  text-align: center;
  border-top-left-radius: 16px;
}

.chat-header h2 {
  margin: 0;
  padding: 16px 24px;
  font-size: 18px;
  color: var(--md-grey-800);
  font-weight: 500;
}

.chat-messages {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  background-color: #fffff0; /* Ivory color */
  position: relative;
}

.messages-list {
  min-height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.ai-typing {
  padding: 16px 24px;
  background-color: #fffbeb; /* Slightly darker ivory for contrast */
  border-bottom: 1px solid #eaeada;
}

.typing-indicator {
  display: inline-block;
  animation: pulse 1.2s infinite;
  color: var(--md-grey-700);
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.message-fade-enter-active {
  transition: all 0.4s ease;
}

.message-fade-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.message-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.message-fade-leave-to {
  opacity: 0;
}

.message-fade-move {
  transition: transform 0.4s ease;
}
</style>