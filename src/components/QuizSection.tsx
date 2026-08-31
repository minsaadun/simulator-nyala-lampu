import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quizQuestions } from '../data/quizData';
import { sound } from '../utils/audio';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, Award, Sparkles, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizSectionProps {
  onRestartLab: () => void;
  onScoreUpdate?: (score: number) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onRestartLab, onScoreUpdate }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answersHistory, setAnswersHistory] = useState<{ qId: number; selected: number; isCorrect: boolean }[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => {
        const next = prev + 1;
        if (onScoreUpdate) onScoreUpdate(next);
        return next;
      });
    } else {
      sound.playWrong();
    }

    setAnswersHistory((prev) => [
      ...prev,
      {
        qId: currentQ.id,
        selected: idx,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      // Completed all questions
      setShowResult(true);
      sound.playVictory();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    if (onScoreUpdate) onScoreUpdate(0);
    setAnswersHistory([]);
    setShowResult(false);
  };

  const percentage = Math.round((score / quizQuestions.length) * 100);

  const getBadge = () => {
    if (percentage >= 85) {
      return {
        title: "Pakar Litar Elektrik Cilik! 🏆",
        message: "Cemerlang! Anda telah menguasai konsep Litar Elektrik, Perubahan Tenaga, dan Litar Bersiri/Selari dengan cemerlang!",
        stars: "⭐⭐⭐"
      };
    }
    if (percentage >= 55) {
      return {
        title: "Jurutera Elektrik Muda! 🌟",
        message: "Bagus! Anda memahami kebanyakan konsep asas litar elektrik. Teruskan ulang kaji untuk markah penuh!",
        stars: "⭐⭐"
      };
    }
    return {
      title: "Pelatih Makmal Berpotensi! 💡",
      message: "Jangan berputus asa. Ulang kaji nota poket dan cuba eksperimen semula di simulator makmal!",
      stars: "⭐"
    };
  };

  if (showResult) {
    const badge = getBadge();
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-7 sm:p-10 text-center shadow-2xl space-y-6 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative inline-flex">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-4xl shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <Trophy className="w-12 h-12 text-slate-950" />
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-slate-950 border border-amber-400 rounded-full text-xs font-mono font-bold text-amber-300 shadow-md">
              {badge.stars}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              {badge.title}
            </h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              {badge.message}
            </p>
          </div>

          {/* Big Score Box */}
          <div className="py-5 px-8 bg-slate-950/70 border border-slate-800/80 rounded-2xl max-w-xs mx-auto space-y-1 backdrop-blur-sm shadow-inner">
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">Markah Kuiz Anda</p>
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 font-mono">
              {score} / {quizQuestions.length}
            </div>
            <p className="text-xs text-emerald-400 font-mono font-bold">{percentage}% Ketepatan Jawapan</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-slate-800/80 hover:bg-slate-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" /> Uji Semula Kuiz
            </button>
            <button
              onClick={onRestartLab}
              className="px-7 py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 transition-all cursor-pointer"
            >
              Kembali ke Makmal Litar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Detailed Question Review List */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-7 space-y-4 backdrop-blur-md shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400" /> Semakan Diagnostik Jawapan Sains:
          </h3>
          <div className="space-y-3">
            {quizQuestions.map((q, idx) => {
              const userAns = answersHistory.find((a) => a.qId === q.id);
              const isCorrect = userAns?.isCorrect;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 backdrop-blur-sm ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Soalan {idx + 1}: {q.question}</span>
                    {isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1 shrink-0 font-mono text-xs"><CheckCircle2 className="w-4 h-4" /> Betul</span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1 shrink-0 font-mono text-xs"><XCircle className="w-4 h-4" /> Salah</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    <strong className="text-slate-300">Penerangan Sains:</strong> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Quiz Progress & Category Card */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-md">
        <div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold uppercase tracking-wider">
            {currentQ.category}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white mt-1.5 uppercase tracking-tight">
            Soalan {currentIdx + 1} daripada {quizQuestions.length}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Markah Semasa</p>
          <p className="text-xl font-mono font-bold text-amber-400">{score} Mata</p>
        </div>
      </div>

      {/* Question Box */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-md"
      >
        <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currentQ.question}
        </p>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let btnStyle = 'bg-slate-950/60 border-slate-800/80 text-slate-200 hover:border-blue-500/50';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500/15 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-400';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-500/15 border-rose-400 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.2)] ring-1 ring-rose-400';
              } else {
                btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between backdrop-blur-sm ${btnStyle} ${
                  !isAnswered ? 'cursor-pointer hover:bg-slate-900/80 active:scale-[0.99]' : 'cursor-default'
                }`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback & Scientific Explanation */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border space-y-2 backdrop-blur-sm ${
                selectedOpt === currentQ.correctIndex
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedOpt === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Syabas! Jawapan anda Tepat.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Kurang tepat. Jawapan yang betul ialah pilihan {['A', 'B', 'C', 'D'][currentQ.correctIndex]}.</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Penerangan Sains:</strong> {currentQ.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Question Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNextQuestion}
              className="px-7 py-3.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 transition-all cursor-pointer"
            >
              {currentIdx + 1 < quizQuestions.length ? 'Soalan Seterusnya' : 'Lihat Keputusan Kuiz'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

