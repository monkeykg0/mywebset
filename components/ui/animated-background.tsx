"use client"

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // 创建粒子
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    // 鼠标位置
    const mouse = { x: -1000, y: -1000 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // 计算与鼠标的距离
        const dxMouse = mouse.x - particle.x
        const dyMouse = mouse.y - particle.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        const maxDist = 150

        // 鼠标排斥/吸引效果
        if (distMouse < maxDist) {
          const forceDirectionX = dxMouse / distMouse
          const forceDirectionY = dyMouse / distMouse
          const force = (maxDist - distMouse) / maxDist
          const directionX = forceDirectionX * force * particle.size * 0.5
          const directionY = forceDirectionY * force * particle.size * 0.5

          // 粒子逃离鼠标 (负号表示逃离)
          particle.vx -= directionX * 0.05
          particle.vy -= directionY * 0.05
        }

        // 更新位置
        particle.x += particle.vx
        particle.y += particle.vy

        // 添加摩擦力，防止速度无限增加
        particle.vx *= 0.99
        particle.vy *= 0.99

        // 保持最小速度，防止静止
        if (Math.abs(particle.vx) < 0.1) particle.vx = (Math.random() - 0.5) * 0.2
        if (Math.abs(particle.vy) < 0.1) particle.vy = (Math.random() - 0.5) * 0.2

        // 边界检测 (反弹)
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()

        // 连接附近的粒子
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            // 距离越近线越明显
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}