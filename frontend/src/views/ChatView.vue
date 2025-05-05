<template>
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
        <h2>{{ currentChat?.title || chatResource.title }}</h2>
      </div>
      
      <!-- 聊天消息区域 -->
      <div class="chat-messages" ref="messagesContainer">
        <!-- 欢迎消息 -->
        <welcome-screen
          v-if="messages.length === 0"
          @ask-example="askExample"
        />
        
        <!-- 聊天消息列表 -->
        <template v-else>
          <chat-message
            v-for="(msg, index) in messages"
            :key="index"
            :role="msg.role"
            :content="msg.content"
          />
          
          <!-- 正在输入提示 -->
          <div v-if="isTyping" class="message ai-message">
            <div class="message-avatar">
              <n-avatar :size="32" round>AI</n-avatar>
            </div>
            <div class="message-content">
              <div class="typing-indicator">{{ chatResource.thinking }}</div>
            </div>
          </div>
        </template>
      </div>
      
      <!-- 输入区域 -->
      <chat-input @send="onSendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { NAvatar } from 'naive-ui'
import chatResource from '../resource/chat.ts'
import ChatSidebar from '../components/chat/ChatSidebar.vue'
import ChatMessage from '../components/chat/ChatMessage.vue'
import WelcomeScreen from '../components/chat/WelcomeScreen.vue'
import ChatInput from '../components/chat/ChatInput.vue'

// 聊天历史
const chatHistory = ref([
  { id: 1, title: '复旦大学邯郸校区靠近上海站' },
  { id: 2, title: '南京站和南京南站是同一个站吗？' },
  { id: 3, title: '模拟性能对比图表生成' },
  { id: 4, title: '多轮生成性能与计算效率比较' },
  { id: 5, title: '构造四变量卡诺图' },
  { id: 6, title: '上海站到虹桥站交通时间和路南' },
  { id: 7, title: '创建可导出SVG的替代方案' }
])

// 当前选中的聊天索引
const currentChatIndex = ref(0)

// 当前聊天
const currentChat = computed(() => {
  return chatHistory.value[currentChatIndex.value]
})

// 聊天消息
const messages = ref([
  { role: 'user', content: '复旦大学邯郸校区靠近上海站' },
  { 
    role: 'ai', 
    content: `靠近上海站的是复旦大学的邯郸校区（主校区）。

具体信息：

- 邯郸校区地址：上海市杨浦区邯郸路220号
- 距离上海站：约10公里，车程约20-30分钟（视交通情况）。

交通方式：
- 地铁：上海站乘坐地铁1号线（莘庄方向）→ 人民广场站换乘8号线（市光路方向）→ 四平路站换乘
10号线（新江湾城方向）→ 江湾体育场站或五角场站下车，步行即可到达。
- 打车/自驾：约20-30分钟，建议走南北高架或内环高架。

其他校区：

1. 江湾校区：位于杨浦区，距离上海站约12公里。
2. 枫林校区：位于徐汇区，距离上海站约8公里，但主要为医学院。
3. 张江校区：位于浦东新区，距离上海站约20公里。` 
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
    // 添加AI回复
    messages.value.push({
      role: 'ai',
      content: `这是对"${message}"的回答。在实际应用中，这里会连接到后端API获取AI的回复。`
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
  if (index === 0) {
    messages.value = [
      { role: 'user', content: '复旦大学邯郸校区靠近上海站' },
      { 
        role: 'ai', 
        content: `靠近上海站的是复旦大学的邯郸校区（主校区）。

具体信息：

- 邯郸校区地址：上海市杨浦区邯郸路220号
- 距离上海站：约10公里，车程约20-30分钟（视交通情况）。

交通方式：
- 地铁：上海站乘坐地铁1号线（莘庄方向）→ 人民广场站换乘8号线（市光路方向）→ 四平路站换乘
10号线（新江湾城方向）→ 江湾体育场站或五角场站下车，步行即可到达。
- 打车/自驾：约20-30分钟，建议走南北高架或内环高架。

其他校区：

1. 江湾校区：位于杨浦区，距离上海站约12公里。
2. 枫林校区：位于徐汇区，距离上海站约8公里，但主要为医学院。
3. 张江校区：位于浦东新区，距离上海站约20公里。` 
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
.chat-container {
  display: flex;
  height: calc(100vh - 60px);
  background-color: #f9f9fb;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #fff;
}

.chat-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
}

.typing-indicator {
  display: inline-block;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>