"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Code, Database, Globe, Zap } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: 'AI 智能助手',
      description: '基于 LLM 的智能对话助手，支持上下文记忆、代码生成与多轮对话。',
      tech: ['React', 'Next.js', 'OpenAI API', 'TailwindCSS'],
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      github: '#',
      demo: '#'
    },
    {
      title: '电商后台管理系统',
      description: '功能强大的后台管理系统，包含商品管理、订单处理、数据可视化等模块。',
      tech: ['Vue 3', 'TypeScript', 'Vite', 'Element Plus'],
      icon: <Database className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500',
      github: '#',
      demo: '#'
    },
    {
      title: '跨平台在线教育 App',
      description: '基于 Flutter 开发的在线学习平台，支持视频播放、实时互动与离线缓存。',
      tech: ['Flutter', 'Dart', 'Firebase', 'Provider'],
      icon: <Globe className="w-8 h-8" />,
      gradient: 'from-green-500 to-teal-500',
      github: '#',
      demo: '#'
    },
    {
      title: '个人博客系统',
      description: '简约风格的个人博客，支持 Markdown 渲染、暗黑模式与 SEO 优化。',
      tech: ['Next.js', 'React', 'MDX', 'Vercel'],
      icon: <Code className="w-8 h-8" />,
      gradient: 'from-orange-500 to-red-500',
      github: '#',
      demo: '#'
    }
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
    <section id="projects" className="section relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

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
                专业领域
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              专注于 Web 与移动应用开发，提供高质量的技术解决方案
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  {/* 卡片头部渐变 */}
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${project.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                        {project.icon}
                      </div>
                      <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-4 pt-4">
                    <Button
                      variant="default"
                      size="sm"
                      className={`flex-1 bg-gradient-to-r ${project.gradient} hover:opacity-90 transition-all duration-300 group/btn`}
                      asChild
                    >
                      <a href="#contact" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        咨询预约
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              variant="gradient"
              size="lg"
              className="group relative overflow-hidden"
              asChild
            >
              <a href="#contact" className="flex items-center gap-2">
                <span className="relative z-10">预约咨询</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}