"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Database, Globe, Zap, Award, BookOpen } from 'lucide-react'

export default function About() {
  const skills = [
    { name: 'JavaScript/TypeScript', level: 95, icon: <Code className="w-4 h-4" /> },
    { name: 'React/Next.js', level: 90, icon: <Globe className="w-4 h-4" /> },
    { name: 'Node.js', level: 85, icon: <Zap className="w-4 h-4" /> },
    { name: 'Python', level: 80, icon: <Code className="w-4 h-4" /> },
    { name: 'SQL/NoSQL', level: 85, icon: <Database className="w-4 h-4" /> },
    { name: 'AWS/云服务', level: 75, icon: <Globe className="w-4 h-4" /> },
    { name: 'Git/GitHub', level: 90, icon: <Code className="w-4 h-4" /> },
    { name: 'Docker', level: 70, icon: <Zap className="w-4 h-4" /> }
  ]

  const achievements = [
    { title: "5年+", subtitle: "开发经验", icon: <Award className="w-6 h-6" /> },
    { title: "50+", subtitle: "完成项目", icon: <Code className="w-6 h-6" /> },
    { title: "10+", subtitle: "技术栈", icon: <Zap className="w-6 h-6" /> },
    { title: "100%", subtitle: "客户满意度", icon: <Globe className="w-6 h-6" /> }
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
              一个充满激情的开发者，致力于创造令人惊叹的数字体验
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
                    我是一名充满热情的全栈开发工程师，拥有5年的软件开发经验。
                    我喜欢解决复杂的技术问题，并将创意想法转化为实际的数字产品。
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    在我的职业生涯中，我参与了多个大型项目的开发，
                    从电商平台到企业级管理系统，积累了丰富的实战经验。
                    我相信技术应该服务于人，让生活变得更美好。
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    除了编程，我还热爱阅读、摄影和旅行。
                    我认为多元化的兴趣爱好能够为我的工作带来更多的创意和灵感。
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
                    <p className="font-medium text-gray-900">计算机科学学士</p>
                    <p className="text-gray-600">某某大学 | 2015-2019</p>
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