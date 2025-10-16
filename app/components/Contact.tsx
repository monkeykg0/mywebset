'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Send, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('表单数据:', formData)
    alert('感谢您的留言！我会尽快回复您。')
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "邮箱",
      value: "联系请通过医院预约",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "就诊预约",
      value: "医院门诊预约",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "就职医院",
      value: "武汉科技大学医院附属德康老年病医院",
      gradient: "from-purple-500 to-pink-500"
    }
  ]

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  ]

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
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
                联系我
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              欢迎咨询预约，我将竭诚为您提供专业的中医诊疗服务
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 左侧信息 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <MessageCircle className="w-8 h-8 text-blue-600" />
                    预约咨询
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    如果您有健康方面的困扰，欢迎预约咨询。
                    我将运用专业的中医知识和临床经验，为您提供个性化的诊疗方案。
                  </p>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 10 }}
                      >
                        <div className={`w-14 h-14 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center mr-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                          {info.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{info.title}</p>
                          <p className="text-gray-600">{info.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* 就诊提示 */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-700 font-medium mb-2">就诊须知</p>
                    <p className="text-gray-600 text-sm">
                      • 建议提前预约挂号<br/>
                      • 初诊患者请携带既往病历资料<br/>
                      • 如有过敏史请提前告知
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* 右侧表单 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">发送消息</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="请输入您的姓名"
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱 *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="请输入您的邮箱"
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        留言 *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="请输入您的留言..."
                        className="resize-none transition-all duration-300 focus:scale-105"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        className="w-full group relative overflow-hidden"
                        disabled={isSubmitting}
                      >
                        <span className="flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              发送中...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                              发送留言
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}