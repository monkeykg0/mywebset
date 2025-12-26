"use client"

import { useEffect, useRef } from 'react'

export function MouseTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const setSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        setSize()
        window.addEventListener('resize', setSize)

        // Track mouse position
        const mouse = { x: 0, y: 0 }
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }
        window.addEventListener('mousemove', handleMouseMove)

        // Trail particles
        const particles: Array<{
            x: number
            y: number
            size: number
            vx: number
            vy: number
            life: number
            color: string
        }> = []

        const colors = ['#60A5FA', '#3B82F6', '#8B5CF6', '#A78BFA']

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Add new particles at mouse position (if moving)
            // Only add sometimes to avoid too many particles
            if (Math.random() > 0.5) {
                particles.push({
                    x: mouse.x,
                    y: mouse.y,
                    size: Math.random() * 5 + 2,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 1.0,
                    color: colors[Math.floor(Math.random() * colors.length)]
                })
            }

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]
                p.x += p.vx
                p.y += p.vy
                p.life -= 0.02
                p.size *= 0.95

                ctx.globalAlpha = p.life
                ctx.fillStyle = p.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()

                if (p.life <= 0) {
                    particles.splice(i, 1)
                    i--
                }
            }

            ctx.globalAlpha = 1.0
            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', setSize)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
        />
    )
}
