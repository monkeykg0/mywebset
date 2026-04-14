'use client'
import React, { useState } from 'react'

interface SanguoCharProps {
  code: string
  color: string
  size?: number
}

// 替换原有的点阵像素人物，改用 Nano Banana AI 生成的专属 Q 版插图！
export function SanguoPixelChar({ code, color, size = 5 }: SanguoCharProps) {
  // 统一转小写匹配文件名，例如 "CAOCAO" -> "caocao.png"
  const filename = code.toLowerCase()
  const [error, setError] = useState(false)

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size * 18,
      height: size * 18,
      position: 'relative',
      borderRadius: '50%',
      // 外发光体现赛博武将的主题色
      background: `${color}10`,
      boxShadow: `0 0 15px ${color}40`,
      border: `2px solid ${color}80`,
      overflow: 'hidden'
    }}>
      <img 
        src={error ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(code)}&backgroundColor=transparent` : `https://www.monkeykg.top/sanguo/${filename}.png`}
        alt={code}
        onError={() => setError(true)}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover'
        }}
      />
    </div>
  )
}

export default SanguoPixelChar
