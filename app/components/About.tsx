"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Database, Globe, Zap, Award, BookOpen } from 'lucide-react'

export default function About() {
  const skills = [
    { name: '中医诊断', level: 95, icon: <Code className="w-4 h-4" /> },
    { name: '心血管疾病治疗', level: 90, icon: <Globe className="w-4 h-4" /> },
    { name: '中西医结合', level: 90, icon: <Zap className="w-4 h-4" /> },
    { name: '针灸推拿', level: 85, icon: <Code className="w-4 h-4" /> },
    { name: '方剂配伍', level: 90, icon: <Database className="w-4 h-4" /> },
    { name: '老年病诊治', level: 85, icon: <Globe className="w-4 h-4" /> },
    { name: '慢性病管理', level: 88, icon: <Code className="w-4 h-4" /> },
    { name: '健康咨询', level: 90, icon: <Zap className="w-4 h-4" /> }
  ]

  const achievements = [
    { title: "硕士", subtitle: "研究生学历", icon: <Award className="w-6 h-6" /> },
    { title: "1000+", subtitle: "诊治患者", icon: <Code className="w-6 h-6" /> },
    { title: "中西医", subtitle: "结合治疗", icon: <Zap className="w-6 h-6" /> },
    { title: "专业", subtitle: "心血管方向", icon: <Globe className="w-6 h-6" /> }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="about" className="section relative overflow-hidden bg-white">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                关于我
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              一位充满爱心的中医医师，致力于为患者提供优质的医疗服务
            </p>
          </motion.div>

          {/* 成就统计 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-blue-600 mb-3 flex justify-center">
                      {achievement.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {achievement.title}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {achievement.subtitle}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 左侧：个人故事 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    我的故事
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    我是一名充满热情的中医内科医师，专注于心血管疾病的中医及中西医结合治疗。
                    我致力于将传统中医理论与现代医学技术相结合，为患者提供最优质的医疗服务。
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    在临床工作中，我积累了丰富的诊疗经验，
                    尤其在老年心血管疾病、慢性病管理等方面有独到见解。
                    我相信中医药的智慧能够为现代医学提供有益补充，帮助患者恢复健康。
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    除了临床工作，我还热心于中医药知识的传播和健康教育。
                    我希望通过专业的医疗服务和健康指导，帮助更多人提升生活质量。
                  </motion.p>

                  {/* 教育背景 */}
                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      教育背景
                    </h4>
                    <p className="font-medium text-gray-900">中医内科学 硕士研究生</p>
                    <p className="text-gray-600">河南中医药大学 | 心血管方向</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* 右侧：技能展示 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Zap className="w-8 h-8 text-purple-600" />
                    技能专长
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="space-y-2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600">{skill.icon}</span>
                            <span className="font-medium text-gray-900">{skill.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}