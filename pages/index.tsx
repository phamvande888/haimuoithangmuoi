"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    img: "/images/nhu1.jpg",
    text: "Xin chào đằng ấy nha, đầu tiên là Ảnh chúc Cổ ngày mới vui vẽ năng lượng nè. Không chỉ riêng 20/10 mà tất cả các ngày còn lại đều là ngày tuyệt vời đối với cổ. \n    \n Lướt sang 👉 để đọc thêm nè",
  },
  {
    img: "/images/nhu3.jpg",
    text: "Hãy cười thật nhiều nhé, vì nụ cười của Cổ làm cả thế giới dịu lại❤️. Mỗi lần nhìn thấy Cổ cười là như được nạp đầy năng lượng vậy đó. Ảnh mong cổ sẽ luôn vui vẽ hồn nhiên như vậy. ",
  },
  {
    img: "/images/nhu2.jpg",
    text: "Cổ là người mang năng lượng vui tươi, làm mọi thứ xung quanh bừng sáng. Chúc Cổ luôn được yêu thương và bình an, mỗi ngày đều thật đặc biệt....🌺",
  },
  {
    img: "/images/nhu4.jpg",
    text: "Mỗi bước chân Cổ đi qua đều để lại những vết hạnh phúc nho nhỏ, gieo niềm vui cho những ai may mắn gặp Cổ. Dẫu thế gian có muôn ngàn màu sắc, năng lượng và lòng tử tế của Cổ luôn khiến mọi thứ trở nên rực rỡ hơn.",
  },
  {
    img: "/images/nhu5.jpg",
    text: "Chúc Cổ thật nhiều niềm vui 💕.\n    \n  Vậy là món quà nhỏ của ảnh đã kết thúc rồi...Lúc mà cổ thấy món quà này là lúc ảnh đang đi làm đó, cũng đuối nếu mà Cổ đọc tới đây rồi thì hãy gửi ảnh thứ gì đó để nạp năng lượng nha <3",
  },
];

export default function Card2010() {
  const [phase, setPhase] = useState("intro");
  const [displayedText, setDisplayedText] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [floaties, setFloaties] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const fullText = ` Nhân ngày Phụ nữ Việt Nam \n Ảnh có một vài lời muốn gửi đến cho Cổ... Nhấn vào icon lá thư để xem tiếp nha!`;
  // 💕 Sinh hiệu ứng bong bóng & trái tim
  useEffect(() => {
    const arr = [...Array(25)].map((_, i) => ({
      id: i,
      size: 18 + Math.random() * 24,
      startX: Math.random() * 100,
      endX: Math.random() * 100,
      duration: 15 + Math.random() * 12,
      delay: Math.random() * 8,
      isHeart: Math.random() > 0.4,
    }));
    setFloaties(arr);
  }, []);

  // ✨ Hiệu ứng gõ chữ
  useEffect(() => {
    if (phase === "intro") {
      setDisplayedText("");
      setShowLetter(false);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(interval);
          setTimeout(() => setShowLetter(true), 800);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleLetterClick = () => {
    const audio = document.getElementById("bgm");
    if (audio && audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
    setPhase("card");
  };

  const toggleMusic = () => {
    const audio = document.getElementById("bgm");
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
    autoplay: false,
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
      {/* 🌸 Nền gradient chuyển động */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 animate-gradientMove bg-[length:200%_200%] z-0"></div>

      {/* 💕 Hiệu ứng bong bóng & trái tim */}
      {typeof window !== "undefined" && floaties.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {floaties.map((f) => (
            <motion.div
              key={f.id}
              className="absolute"
              style={{
                left: `${f.startX}%`,
                bottom: `${Math.random() * 30 - 10}%`,
                fontSize: `${f.size}px`,
              }}
              initial={{ opacity: 0, y: "100vh" }}
              animate={{
                y: ["100vh", "-20vh"],
                x: [`${f.startX}%`, `${f.endX}%`],
                opacity: [0, 0.8, 0.6, 0],
                rotate: [0, f.isHeart ? 12 : -12, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: f.duration,
                delay: f.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span
                className={`${
                  f.isHeart ? "text-rose-400/80" : "text-pink-200/70"
                } drop-shadow-md`}
              >
                {f.isHeart ? "❤️" : "🎈"}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🔊 Nút bật/tắt nhạc */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-white/70 border border-rose-300 rounded-full p-3 shadow-md hover:scale-110 transition
             flex items-center justify-center min-w-[3rem] max-w-[3rem]"
      >
        {isPlaying ? "🔊" : "🔈"}
      </motion.button>

      <audio id="bgm" src="/music/2010.mp3" loop preload="auto" />

      <AnimatePresence mode="wait">
        {/* 🌷 Giao diện intro */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1 }}
            className="text-center space-y-6 relative z-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl font-extrabold text-rose-600 drop-shadow-sm"
            >
              20 / 10
            </motion.h1>

            <p className="text-rose-800/80 text-lg max-w-md mx-auto min-h-[3rem] font-medium whitespace-pre-line">
              {displayedText}
              <span className="animate-pulse text-rose-600">▍</span>
            </p>

            {showLetter && (
              <motion.div
                onClick={handleLetterClick} // ✨ click phát nhạc
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0px rgba(255, 182, 193, 0.4)",
                    "0 0 12px rgba(255, 182, 193, 0.8)",
                    "0 0 0px rgba(255, 182, 193, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex justify-center mt-10 cursor-pointer relative z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="w-16 h-16 bg-white/80 backdrop-blur-md border border-rose-300 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-3xl"
                  >
                    💌
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 💌 Giao diện thiệp */}
        {phase === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md bg-gradient-to-br from-white/85 via-rose-50/60 to-rose-100/50 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-rose-200/60 relative z-10"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-rose-700 text-center mb-4">
                🌸 Gửi Tố Như 🌸
              </h2>

              <div className="rounded-xl overflow-hidden ring-1 ring-rose-100">
                <Slider {...sliderSettings}>
                  {slides.map((item, i) => (
                    <div key={i} className="pb-8">
                      <img
                        src={item.img}
                        alt={`Ảnh ${i + 1}`}
                        className="w-full h-64 object-cover"
                      />
                      <p className="mt-4 text-rose-700/90 text-center text-base leading-relaxed px-4">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setPhase("intro")}
                  className="px-5 py-2 rounded-lg border border-rose-300 text-rose-600 font-medium hover:bg-rose-50 transition"
                >
                  Xem lại 💫
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎨 Hiệu ứng gradient nền */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 10s ease infinite;
        }
      `}</style>
    </main>
  );
}
