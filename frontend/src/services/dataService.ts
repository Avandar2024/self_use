import { ref } from 'vue'

export interface SummaryData {
  totalUsers: number;
  activeUsers: number;
  completionRate: number;
  coursesCount: number;
}

export interface Course {
  rank: number;
  name: string;
  platform: string;
  students: number;
  satisfaction: number;
}

export interface NewsItem {
  title: string;
  date: string;
  views: number;
}

export interface PlatformData {
  name: string;
  percentage: number;
  color: string;
}

// 初始数据
const summaryData = ref<SummaryData>({
  totalUsers: 3458,
  activeUsers: 2187,
  completionRate: 78.6,
  coursesCount: 124
})

const tableData = ref<Course[]>([
  {
    rank: 1,
    name: '人工智能导论',
    platform: '五大学堂',
    students: 1520,
    satisfaction: 96
  },
  {
    rank: 2,
    name: '大数据分析与应用',
    platform: '慕课',
    students: 1356,
    satisfaction: 94
  },
  {
    rank: 3,
    name: '计算机网络基础',
    platform: '学习通',
    students: 1245,
    satisfaction: 92
  },
  {
    rank: 4,
    name: '高级Java编程',
    platform: '五大学堂',
    students: 1120,
    satisfaction: 91
  },
  {
    rank: 5,
    name: 'Python数据分析',
    platform: '慕课',
    students: 986,
    satisfaction: 90
  }
])

const newsData = ref<NewsItem[]>([
  { title: '南大计算机学院举办2025春季学术论坛', date: '2025-04-25', views: 1240 },
  { title: '人工智能研究中心新增三位特聘教授', date: '2025-04-20', views: 986 },
  { title: '2025年度教学改革项目申报开始', date: '2025-04-18', views: 876 },
  { title: '南大与微软联合开展AI人才培养计划', date: '2025-04-15', views: 1320 }
])

const platformData = ref<PlatformData[]>([
  { name: '五大学堂', percentage: 38, color: '#2080f0' },
  { name: '慕课', percentage: 32, color: '#18a058' },
  { name: '学习通', percentage: 24, color: '#d03050' },
  { name: '其他平台', percentage: 6, color: '#f0a020' },
])

// 刷新数据的方法
export function refreshData() {
  // 在真实应用中，这里会调用后端API
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      // 更新数据
      summaryData.value = {
        totalUsers: Math.floor(3000 + Math.random() * 1000),
        activeUsers: Math.floor(2000 + Math.random() * 500),
        completionRate: 75 + Math.random() * 10,
        coursesCount: 120 + Math.floor(Math.random() * 10)
      }
      
      // 更新表格数据（随机变化学习人数）
      tableData.value = tableData.value.map(item => ({
        ...item,
        students: item.students + Math.floor(Math.random() * 20) - 10
      })).sort((a, b) => b.students - a.students)
        .map((item, index) => ({...item, rank: index + 1}))
      
      resolve()
    }, 1500)
  })
}

// 导出响应式数据
export function useDashboardData() {
  return {
    summaryData,
    tableData,
    newsData,
    platformData,
    refreshData
  }
}