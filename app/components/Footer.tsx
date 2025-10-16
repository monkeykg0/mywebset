"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub", color: "hover:text-gray-300" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter", color: "hover:text-blue-300" },
    { icon: <Mail className="w-5 h-5" />, href: "#contact", label: "Email", color: "hover:text-green-400" },
  ]

  const quickLinks = [
    { href: '#home', label: '首页' },
    { href: '#about', label: '关于我' },
    { href: '#projects', label: '项目' },
    { href: '#contact', label: '联系我' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* 品牌信息 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              陈胜燕医师
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              中医内科医师，专注于心血管疾病的中西医结合治疗。
              致力于为患者提供优质的医疗服务。
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>and lots of ☕</span>
            </div>
          </motion.div>
          
          {/* 快速链接 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">快速链接</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block group"
                  >
                    <span className="border-b border-transparent group-hover:border-white transition-all duration-300">
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* 社交媒体 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">关注我</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700 group`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              让我们保持联系，分享技术见解和创意想法
            </p>
          </motion.div>
        </div>
        
        {/* 分割线 */}
        <motion.div
          className="border-t border-gray-700 pt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-gray-400 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              © {currentYear} 陈胜燕医师. 保留所有权利. | 用 ❤️ 和 Next.js 构建
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-gray-400 hover:text-white hover:bg-gray-800 group"
              >
                <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform duration-300" />
                回到顶部
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}