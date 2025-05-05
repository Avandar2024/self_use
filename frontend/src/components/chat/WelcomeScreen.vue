<template>
  <div class="welcome-container">
    <h1>{{ chatResource.title }}</h1>
    <p>{{ chatResource.welcomeMessage }}</p>
    
    <div class="examples-container">
      <h3>{{ chatResource.examples.title }}</h3>
      <div class="examples-grid">
        <div 
          v-for="(example, index) in chatResource.examples.questions" 
          :key="index" 
          class="example-item"
          @click="$emit('ask-example', example)"
        >
          {{ example }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import chatResource from '../../resource/chat'

defineEmits(['ask-example'])
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 20px;
}

.welcome-container h1 {
  font-size: 32px;
  margin-bottom: 16px;
  color: #333;
}

.welcome-container p {
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin-bottom: 40px;
}

.examples-container {
  max-width: 800px;
  width: 100%;
}

.examples-container h3 {
  margin-bottom: 20px;
  color: #666;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.example-item {
  padding: 16px;
  background-color: #f9f9fb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.example-item:hover {
  background-color: #f0f0f0;
}
</style>