"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import { FloatingElements } from '@/components/ui/floating-elements'
import { AnimatedBackground } from '@/components/ui/animated-background'

export default function Hero() {
  const roles = [
    "中医内科医师",
    "心血管方向专家", 
    "中西医结合专家",
    "健康守护者",
    "仁心仁术"
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 动画背景 */}
      <div className="absolute inset-0 gradient-bg opacity-20"></div>
      <AnimatedBackground />
      <FloatingElements />
      
      {/* 主要内容 */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 头像区域 */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
                陈
              </div>
            </div>
          </motion.div>

          {/* 标题 */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-gray-900">你好，我是</span>
            <motion.span 
              className="block mt-2 text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
            >
              陈胜燕
            </motion.span>
          </motion.h1>

          {/* 动态职业描述 */}
          <motion.div
            className="text-2xl md:text-3xl text-gray-600 mb-8 h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <TypewriterEffect 
              words={roles}
              className="font-semibold"
            />
          </motion.div>

          {/* 描述文字 */}
          <motion.p 
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            毕业于河南中医药大学，硕士研究生学历，专业中医内科，心血管方向。
            擅长中医治疗以及中西医结合治疗方案。
            目前就职于武汉科技大学医院附属德康老年病医院。
          </motion.p>

          {/* 按钮组 */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Button 
              variant="gradient" 
              size="lg"
              className="group relative overflow-hidden"
              asChild
            >
              <a href="#projects">
                <span className="relative z-10">了解专业领域</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              asChild
            >
              <a href="#contact">联系我</a>
            </Button>
          </motion.div>

          {/* 滚动提示 */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <p className="text-sm text-gray-500 mt-2">向下滚动</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}