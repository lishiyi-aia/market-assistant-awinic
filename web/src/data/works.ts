export type WorkLanguage = 'zh' | 'en'

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export type WorkItem = WorkListItem

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export type WorksCopy = WorksLang

export const WORKS: Record<WorkLanguage, WorksLang> = {
  zh: {
  "title": "项目经历",
  "closeLabel": "返回",
  "openLabel": "展开作品",
  "hint": "继续下滑",
  "awardsLabel": "项目成果",
  "visitLabel": "查看完整项目",
  "detailPlaceholder": "项目详情",
  "phImageLabel": "项目预览",
  "phButtonLabel": "打开项目",
  "countLabel": (n: number) => `${n} 个项目`,
  "sections": [
    {
      "id": "project-1",
      "no": "01",
      "title": "市场支持与数据复盘",
      "tagline": "需求调研｜推广资料｜活动协同｜AI 看板",
      "items": [
        {
          "name": "AI 产品市场支持与运营复盘",
          "meta": "Market Support & AI-assisted Operations Review",
          "slug": "ai-news-dashboard",
          "link": `${import.meta.env.BASE_URL}projects/ai-news-dashboard/case_study.html`,
          "tags": [
            "需求与执行：价格问卷、100+条资料及线上线下推广",
            "AI 看板：跟踪渠道表现与流失，支持预算调整",
          "复盘结果：注册较前周+50%，首发专题创建率相对约+15%"
          ]
        }
      ]
    },
    {
      "id": "project-2",
      "no": "02",
      "title": "客户支持与合作跟进",
      "tagline": "需求分类｜使用答疑｜合作交接｜跨部门协作",
      "items": [
        {
          "name": "AI 教育客户需求与合作支持",
          "meta": "Customer Support & Partnership Coordination",
          "slug": "ai-education-partnership",
          "link": `${import.meta.env.BASE_URL}projects/ai-education-partnership/case_study.html`,
          "tags": [
            "客户支持：100+条反馈分类，30+篇指南及 FAQ",
            "合作执行：东南亚合作跟进、高校活动与物料协同",
            "反馈改进：10余项建议，期间核心功能使用率+30%"
          ]
        }
      ]
    },
    {
      "id": "project-4",
      "no": "03",
      "title": "新品推广与渠道协同",
      "tagline": "新品调研｜英文内容｜物料排期｜周度复盘",
      "items": [
        {
          "name": "ZUS Coffee 新品推广与渠道协同",
          "meta": "New-product Promotion & Channel Coordination",
          "slug": "zus-everywhere",
          "link": `${import.meta.env.BASE_URL}projects/zus-everywhere/case_study.html`,
          "tags": [
            "推广执行：新品卖点梳理，协助50条英文社媒内容",
            "渠道协同：线上首发、FamilyMart 物料与发布排期",
            "持续复盘：15+次复盘，协同账号粉丝增长1.1w+"
          ]
        }
      ]
    }
  ]
},
  en: {
  "title": "Project Experience",
  "closeLabel": "Back",
  "openLabel": "Open case",
  "hint": "Scroll to continue",
  "awardsLabel": "Outcomes",
  "visitLabel": "View full case",
  "detailPlaceholder": "Project details",
  "phImageLabel": "Project preview",
  "phButtonLabel": "Open project",
  "countLabel": (n: number) => `${n} projects`,
  "sections": [
    {
      "id": "project-1",
      "no": "01",
      "title": "Market Support & Data Review",
      "tagline": "Research · Materials · Campaigns · AI Dashboard",
      "items": [
        {
          "name": "AI Product Market Support & Operations Review",
          "meta": "Research, Execution and Performance Feedback",
          "slug": "ai-news-dashboard",
          "link": `${import.meta.env.BASE_URL}projects/ai-news-dashboard/case_study.html`,
          "tags": [
            "Execution: pricing surveys, 100+ content items and campaigns",
            "AI dashboard: channels and drop-offs informed budget reviews",
            "Results: registrations +50% vs prior week; first-topic rate ~+15% relatively"
          ]
        }
      ]
    },
    {
      "id": "project-2",
      "no": "02",
      "title": "Customer & Partnership Support",
      "tagline": "Needs · FAQs · Handoffs · Cross-team Coordination",
      "items": [
        {
          "name": "AI Education Customer & Partnership Support",
          "meta": "Customer Needs, University Activities and Follow-up",
          "slug": "ai-education-partnership",
          "link": `${import.meta.env.BASE_URL}projects/ai-education-partnership/case_study.html`,
          "tags": [
            "Support: 100+ feedback items, 30+ guides and FAQs",
            "Coordination: Southeast Asia partnerships and university activities",
            "Iteration: 10+ suggestions; core-feature usage +30% during the period"
          ]
        }
      ]
    },
    {
      "id": "project-4",
      "no": "03",
      "title": "Product & Channel Coordination",
      "tagline": "Research · English Content · Schedules · Weekly Review",
      "items": [
        {
          "name": "ZUS Coffee Product Promotion & Channel Coordination",
          "meta": "Launch Materials, English Content and Weekly Reviews",
          "slug": "zus-everywhere",
          "link": `${import.meta.env.BASE_URL}projects/zus-everywhere/case_study.html`,
          "tags": [
            "Execution: product messaging and support for 50 Instagram posts",
            "Channels: online launches, FamilyMart materials and schedules",
            "Review: 15+ reviews; contributed to 11k+ follower growth"
          ]
        }
      ]
    }
  ]
}
}

export const WORKS_CONTENT = WORKS

export const SECTION_COVERS: Record<string, string> = {
  'project-1': `${import.meta.env.BASE_URL}works/covers/sohu-dashboard.png`,
  'project-2': `${import.meta.env.BASE_URL}works/covers/education-pilot.png`,
  'project-4': `${import.meta.env.BASE_URL}works/covers/zus-everywhere.jpg`,
}
