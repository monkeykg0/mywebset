'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  shortQuestions, 
  standardQuestions, 
  comprehensiveQuestions, 
  personalityTypes, 
  MBTIDimension,
  MBTIQuestion 
} from './data';

// --- Components ---

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800 z-50">
    <motion.div
      className="h-full bg-indigo-500"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
    />
  </div>
);

const ModeCard = ({ title, desc, count, time, icon, onClick, active }: any) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`group cursor-pointer p-8 rounded-[3rem] border-2 transition-all flex flex-col justify-between h-full relative overflow-hidden ${
      active 
        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-xl shadow-indigo-500/10' 
        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1A1D23] hover:border-indigo-200 shadow-lg hover:shadow-indigo-500/5'
    }`}
  >
    <div className="relative z-10">
      <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500 origin-left">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
      
      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full text-xs font-bold transition-all group-hover:bg-indigo-600 group-hover:pl-7 group-hover:pr-5">
        立即开始 
        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          →
        </motion.span>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 relative z-10">
      <span className="group-hover:text-indigo-500 transition-colors">{count} 题目</span>
      <span>~ {time} 分钟</span>
    </div>

    {/* Background logic/decor for card */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
  </motion.div>
);

const LikertScale = ({ onSelect, value }: { onSelect: (val: number) => void; value?: number }) => {
  const options = [
    { label: '极其不同意', size: 54, activeColor: '#EF4444', baseColor: '#FEE2E2', val: 1 },
    { label: '不同意', size: 44, activeColor: '#F87171', baseColor: '#FEE2E2', val: 2 },
    { label: '略微不同意', size: 34, activeColor: '#FCA5A5', baseColor: '#FEE2E2', val: 3 },
    { label: '中立', size: 28, activeColor: '#94A3B8', baseColor: '#F1F5F9', val: 4 },
    { label: '略微同意', size: 34, activeColor: '#86EFAC', baseColor: '#DCFCE7', val: 5 },
    { label: '同意', size: 44, activeColor: '#4ADE80', baseColor: '#DCFCE7', val: 6 },
    { label: '极其同意', size: 54, activeColor: '#10B981', baseColor: '#DCFCE7', val: 7 },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-20 mb-12 px-4">
      {/* Background Track Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />
      
      {/* Semantic Labels at Ends */}
      <div className="flex justify-between items-center mb-10 px-2">
        <span className="text-sm font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
          不同意 <span className="w-4 h-[2px] bg-red-200"></span>
        </span>
        <span className="text-sm font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
          <span className="w-4 h-[2px] bg-emerald-200"></span> 同意
        </span>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-2 md:gap-4">
        {options.map((opt) => {
          const isActive = opt.val === value;
          return (
            <div key={opt.val} className="flex flex-col items-center group flex-1" onClick={() => onSelect(opt.val)}>
              <motion.div
                initial={false}
                animate={{ 
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive ? opt.activeColor : opt.baseColor,
                  borderColor: isActive ? opt.activeColor : '#E2E8F0',
                }}
                whileHover={{ scale: 1.2, borderColor: opt.activeColor }}
                whileTap={{ scale: 0.9 }}
                style={{ 
                  width: opt.size, 
                  height: opt.size, 
                  borderWidth: 2
                }}
                className={`rounded-full cursor-pointer transition-shadow duration-300 ${
                  isActive 
                    ? 'shadow-lg shadow-indigo-500/20 ring-4 ring-white dark:ring-slate-900 ring-offset-0' 
                    : 'shadow-sm border-dashed'
                }`}
              />
              <span className={`text-[9px] md:text-[11px] mt-6 font-bold transition-all duration-300 text-center leading-tight whitespace-nowrap hidden sm:block ${
                isActive ? 'text-slate-900 dark:text-white translate-y-1' : 'text-slate-400 opacity-0 group-hover:opacity-100'
              }`}>
                {opt.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Page Main ---

export default function MBTIPage() {
  const [step, setStep] = useState(0); // 0: Selection, 1: Questions, 2: Result
  const [activeQuestions, setActiveQuestions] = useState<MBTIQuestion[]>(shortQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultType, setResultType] = useState<string | null>(null);
  const [percentages, setPercentages] = useState<Record<string, number>>({});

  const totalSteps = activeQuestions.length;

  const startTest = (set: MBTIQuestion[]) => {
    setActiveQuestions(set);
    setAnswers(new Array(set.length).fill(0));
    setStep(1);
    setCurrentIndex(0);
  };

  const handleNext = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);

    if (currentIndex < totalSteps - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      calculateFinalResult(newAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const calculateFinalResult = (finalAnswers: number[]) => {
    // We'll normalize all dimensions to these "base" letters: E, S, T, J
    const basePoles: Record<MBTIDimension, string> = { EI: 'E', SN: 'S', TF: 'T', JP: 'J' };
    const rawScores: Record<MBTIDimension, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    const counts: Record<MBTIDimension, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    
    finalAnswers.forEach((val, idx) => {
      const q = activeQuestions[idx];
      const weight = val - 4; // -3 to 3
      
      // If this question's positive pole is the base pole (e.g., 'E'), add the weight.
      // If it's the opposite pole (e.g., 'I'), subtract the weight.
      const multiplier = q.positivePole === basePoles[q.dimension] ? 1 : -1;
      
      rawScores[q.dimension] += weight * multiplier;
      counts[q.dimension]++;
    });

    const percs: Record<string, number> = {};
    const typeLetters: string[] = [];

    (['EI', 'SN', 'TF', 'JP'] as MBTIDimension[]).forEach(dim => {
      const maxPossible = counts[dim] * 3;
      const score = rawScores[dim];
      
      // Calculate percentage for the base pole (E, S, T, J)
      // Range: -maxPossible to +maxPossible -> 0 to 100
      const p = Math.round(((score + maxPossible) / (maxPossible * 2)) * 100);
      percs[dim] = p;

      // Result Letter Determination
      const baseLetter = basePoles[dim];
      const oppositeLetter = dim.replace(baseLetter, '');
      typeLetters.push(score >= 0 ? baseLetter : oppositeLetter);
    });

    setPercentages(percs);
    setResultType(typeLetters.join(''));
    setStep(2);
  };

  const currentTypeData = resultType ? personalityTypes[resultType] : null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-[#0F1115] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-600">
      <ProgressBar current={step === 2 ? totalSteps : currentIndex + 1} total={totalSteps} />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-50 dark:bg-teal-900/10 rounded-full blur-[120px] opacity-40" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-10"
            >
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">
                  MBTI 精准测评
                </h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                  揭开潜意识的面纱，探索你的社交原力、认知模式与决策底层逻辑。请选择你期望的测评深度：
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                <ModeCard 
                  icon="⚡️" title="快速探测" count={20} time="2" 
                  desc="专为快节奏设计的初筛方案，适合快速了解性格底色。" 
                  onClick={() => startTest(shortQuestions)}
                />
                <ModeCard 
                  icon="🧐" title="标准深度" count={60} time="8" 
                  desc="基于 60 个核心生活场景，提供极具参考价值的性格画像。" 
                  onClick={() => startTest(standardQuestions)}
                />
                <ModeCard 
                  icon="🏆" title="专业全量" count={93} time="15" 
                  desc="参考 MBTI Step I 标准题库，多维交叉验证，追求极致准确度。" 
                  onClick={() => startTest(comprehensiveQuestions)}
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="w-full max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-bold uppercase tracking-widest text-indigo-500">
                  Question {currentIndex + 1} / {totalSteps}
                </span>
                <button onClick={handlePrev} className={`text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-opacity ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
                   ← 返回上一题
                </button>
              </div>

              <div className="min-h-[240px] flex items-center justify-center py-10">
                 <h2 className="text-2xl md:text-4xl font-semibold text-center leading-snug">
                   {activeQuestions[currentIndex].text}
                 </h2>
              </div>

              <LikertScale 
                value={answers[currentIndex]} 
                onSelect={handleNext} 
              />
              
              <p className="text-center text-slate-400 text-sm mt-10">
                本模式共 {totalSteps} 题 · 请凭直觉快速反应
              </p>
            </motion.div>
          )}

          {step === 2 && currentTypeData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative p-1 bg-gradient-to-br from-indigo-500 via-teal-400 to-indigo-600 rounded-[2.5rem] shadow-2xl">
                <div className="bg-white dark:bg-[#1A1D23] rounded-[2.3rem] p-8 md:p-14">
                  <div className="text-center mb-12 border-b border-slate-100 dark:border-slate-800 pb-12">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="inline-block px-6 py-2 rounded-full border-2 border-indigo-500 text-indigo-500 font-bold mb-6"
                    >
                      你的性格类型是
                    </motion.div>
                    <h2 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter" style={{ color: currentTypeData.color }}>
                      {currentTypeData.type}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      {currentTypeData.name} · <span className="opacity-60">{currentTypeData.title}</span>
                    </h3>
                  </div>

                  {/* Dimension Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-16 p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                    {[
                      { dim: 'EI', left: 'E', right: 'I', label: '能量来源' },
                      { dim: 'SN', left: 'S', right: 'N', label: '感知方式' },
                      { dim: 'TF', left: 'T', right: 'F', label: '决策偏好' },
                      { dim: 'JP', left: 'J', right: 'P', label: '生活态度' },
                    ].map(({ dim, left, right, label }) => {
                      const p = percentages[dim];
                      const q = activeQuestions.find(q => q.dimension === dim)!;
                      return (
                        <div key={dim} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-slate-400">
                            <span>{label}</span>
                            <span>{p >= 50 ? p : 100 - p}% {p >= 50 ? q.positivePole : q.negativePole}</span>
                          </div>
                          <div className="relative h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: '50%' }}
                              animate={{ width: `${p}%` }}
                              className="absolute h-full bg-indigo-500 rounded-full"
                            />
                          </div>
                          <div className="flex justify-between text-xs font-bold">
                            <span className={p >= 50 && q.positivePole === left ? 'text-indigo-600 font-black' : 'text-slate-300'}>{left}</span>
                            <span className={p < 50 && q.negativePole === right ? 'text-indigo-600 font-black' : 'text-slate-300'}>{right}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid md:grid-cols-2 gap-16 pt-12 border-t border-slate-100 dark:border-slate-800">
                    <div className="space-y-10">
                      <section>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-5 flex items-center gap-2">
                          <span className="w-8 h-[1px] bg-indigo-500/30"></span> 核心特质
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {currentTypeData.traits.map(trait => (
                            <span key={trait} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl text-sm font-medium border border-slate-100 dark:border-slate-700 shadow-sm">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-5 flex items-center gap-2">
                          <span className="w-8 h-[1px] bg-indigo-500/30"></span> 职业图谱
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {currentTypeData.careers.map(career => (
                            <div key={career} className="px-4 py-3 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-xl text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-500/10">
                              {career}
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    <div className="space-y-10">
                      <section>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-5 flex items-center gap-2">
                          <span className="w-8 h-[1px] bg-indigo-500/30"></span> 深度解析
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic text-lg">
                          "{currentTypeData.description}"
                        </p>
                      </section>

                      <section>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-5 flex items-center gap-2">
                          <span className="w-8 h-[1px] bg-indigo-500/30"></span> 代表名人
                        </h4>
                        <div className="space-y-3">
                          {currentTypeData.famousPeople.map(person => (
                            <div key={person} className="flex items-center gap-3 group">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></div>
                              <span className="text-slate-700 dark:text-slate-300 font-medium">{person}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="mt-16 flex flex-col md:flex-row gap-4 justify-center border-t border-slate-100 dark:border-slate-800 pt-12">
                    <button onClick={() => setStep(0)} className="px-12 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-indigo-500/10">
                      返回首页
                    </button>
                    <button className="px-12 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      保存结果
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-6 left-0 w-full text-center text-[10px] text-slate-400 uppercase tracking-[0.3em] pointer-events-none opacity-50">
        Authentic MBTI Assessment System &copy; 2026
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Marcellus&display=swap');
        
        body {
          font-family: 'Outfit', sans-serif;
        }

        h1, h2, h3, .font-display {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>
    </div>
  );
}
