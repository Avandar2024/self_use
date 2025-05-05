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
import { NAvatar } from 'naive-ui'
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
  { id: '1', title: '复旦大学邯郸校区靠近上海站', date: new Date() },
  { id: '2', title: '南京站和南京南站是同一个站吗？', date: new Date() },
  { id: '3', title: '模拟性能对比图表生成', date: new Date() },
  { id: '4', title: '多轮生成性能与计算效率比较', date: new Date() },
  { id: '5', title: '构造四变量卡诺图', date: new Date() },
  { id: '6', title: '上海站到虹桥站交通时间和路南', date: new Date() },
  { id: '7', title: '创建可导出SVG的替代方案', date: new Date() }
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
.chat-view-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: #f9f9fb;
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
  background-color: #fff;
}

.chat-header {
  padding: 0;
  border-bottom: 1px solid #eaeaea;
  background-color: #fff;
}

.chat-header h2 {
  margin: 0;
  padding: 16px 24px;
  font-size: 18px;
  color: #333;
  font-weight: 500;
}

.chat-messages {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  background-color: #fff;
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
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
}

.typing-indicator {
  display: inline-block;
  animation: pulse 1.2s infinite;
  color: #666;
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