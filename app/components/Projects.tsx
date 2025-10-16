"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Code, Database, Globe, Zap } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: '心血管疾病',
      description: '擅长运用中医辨证论治结合现代医学诊疗手段，治疗冠心病、高血压、心律失常等心血管疾病，疗效显著。',
      tech: ['冠心病', '高血压', '心律失常', '心力衰竭'],
      icon: <Globe className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      github: '#',
      demo: '#'
    },
    {
      title: '老年病诊治',
      description: '针对老年患者的特殊体质，制定个性化的中西医结合治疗方案，注重整体调理，提高生活质量。',
      tech: ['慢性病', '体质调理', '养生保健', '康复指导'],
      icon: <Code className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500',
      github: '#',
      demo: '#'
    },
    {
      title: '中医内科',
      description: '运用中医经典理论，结合现代诊疗技术，治疗各类内科疾病，如脾胃病、失眠、慢性疲劳等。',
      tech: ['脾胃病', '失眠调理', '体质辨识', '中药调理'],
      icon: <Database className="w-8 h-8" />,
      gradient: 'from-green-500 to-teal-500',
      github: '#',
      demo: '#'
    },
    {
      title: '健康管理',
      description: '提供专业的健康咨询和慢性病管理服务，制定科学的预防保健方案，帮助患者建立健康生活方式。',
      tech: ['健康评估', '慢性病管理', '预防保健', '养生指导'],
      icon: <Zap className="w-8 h-8" />,
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
              专注于中医内科及心血管疾病的诊疗，提供专业的中西医结合治疗方案
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