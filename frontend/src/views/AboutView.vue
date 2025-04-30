<template>
  <div class="about-container">
    <n-card title="关于我们" class="about-card">
      <div class="about-content">
        <div class="about-section">
          <h2>我们的使命</h2>
          <p>我们致力于通过数据分析与AI技术，为教育机构和学生提供更高效、个性化的学习体验，推动教育资源的有效利用和学习效果的最大化。</p>
        </div>
        
        <div class="about-section">
          <h2>技术优势</h2>
          <div class="tech-grid">
            <div class="tech-item">
              <n-icon size="36" color="#2080f0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9s9-4.04 9-9s-4.04-9-9-9m0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7m1-11h-2v6h2v-6m0 8h-2v2h2v-2Z"/></svg>
              </n-icon>
              <h3>实时数据分析</h3>
              <p>提供即时的学习数据分析，帮助用户了解学习进度和效果</p>
            </div>
            <div class="tech-item">
              <n-icon size="36" color="#18a058">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4l9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m2.8-10V9.5C14.8 8.1 13.4 7 12 7S9.2 8.1 9.2 9.5V11c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3m-1.3 0h-3V9.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3V11Z"/></svg>
              </n-icon>
              <h3>数据安全</h3>
              <p>严格的数据保护机制，确保用户隐私和学习数据安全</p>
            </div>
            <div class="tech-item">
              <n-icon size="36" color="#f0a020">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M23 11.5L19.95 8l.6-3.5l-3.55-.75L15.2 1l-3.2 1.75L8.8 1L7 3.75L3.45 4.5L4.05 8L1 11.5l3.05 3.5l-.6 3.5l3.55.75L8.8 22l3.2-1.75L15.2 22l1.8-2.75l3.55-.75l-.6-3.5L23 11.5M10.95 16.55l-3.9-3.9l1.05-1.05l2.85 2.85l5.85-5.85l1.05 1.05l-6.9 6.9Z"/></svg>
              </n-icon>
              <h3>AI智能推荐</h3>
              <p>基于用户学习行为，智能推荐合适的学习资源和学习路径</p>
            </div>
            <div class="tech-item">
              <n-icon size="36" color="#d03050">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
              </n-icon>
              <h3>精准定位</h3>
              <p>精准定位学习薄弱环节，提供有针对性的辅导和资源</p>
            </div>
          </div>
        </div>
        
        <div class="about-section">
          <h2>团队介绍</h2>
          <p>我们的团队由教育专家、数据科学家和软件工程师组成，致力于将先进技术应用于教育领域，打造最智能、高效的教育数据平台。</p>
          <div class="team-info">
            <div class="team-stat">
              <div class="stat-number">20+</div>
              <div class="stat-label">团队成员</div>
            </div>
            <div class="team-stat">
              <div class="stat-number">5年+</div>
              <div class="stat-label">行业经验</div>
            </div>
            <div class="team-stat">
              <div class="stat-number">100+</div>
              <div class="stat-label">合作机构</div>
            </div>
          </div>
        </div>
        
        <div class="about-section">
          <h2>联系我们</h2>
          <div class="contact-info">
            <div class="contact-item">
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/></svg>
              </n-icon>
              <span>contact@edu-data.com</span>
            </div>
            <div class="contact-item">
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </n-icon>
              <span>400-123-4567</span>
            </div>
            <div class="contact-item">
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/></svg>
              </n-icon>
              <span>南京市栖霞区仙林大道163号</span>
            </div>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard, NIcon } from 'naive-ui'
</script>

<style scoped>
.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.about-card {
  margin-bottom: 20px;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.about-section {
  margin-bottom: 10px;
}

.about-section h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.about-section h2:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: #2080f0;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.tech-item {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.tech-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.tech-item h3 {
  margin: 15px 0 10px;
  color: #333;
}

.tech-item p {
  font-size: 0.9rem;
  color: #666;
}

.team-info {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  flex-wrap: wrap;
}

.team-stat {
  text-align: center;
  padding: 0 20px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2080f0;
}

.stat-label {
  color: #666;
  margin-top: 5px;
}

.contact-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-item span {
  color: #333;
}
</style>