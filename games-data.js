// NEONPLAY — o'yinlar katalogi
const GAMES = [
  {
    id: "snake",
    title: "Neon Ilon",
    desc: "Klassik ilon o'yinining neon versiyasi. Olma yeb, o'zingizni chaynamang!",
    category: "arcade",
    tags: ["hot"],
    rating: 4.8,
    plays: "1.2M",
    file: "games/snake.html",
    grad: ["#134E4A", "#0E0B1E"],
    icon: `<svg viewBox="0 0 100 100"><path d="M20 70 L20 40 L40 40 L40 20 L80 20 L80 55 L55 55 L55 75 L20 75" stroke="#C4F135" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="80" cy="20" r="6" fill="#FF3D81"/></svg>`
  },
  {
    id: "2048",
    title: "2048",
    desc: "Raqamlarni birlashtirib 2048 pluginiga yeting. Oddiy, ammo qoyil qoldiruvchi.",
    category: "puzzle",
    tags: ["hot"],
    rating: 4.9,
    plays: "980K",
    file: "games/2048.html",
    grad: ["#3B2A6B", "#0E0B1E"],
    icon: `<svg viewBox="0 0 100 100"><rect x="15" y="15" width="30" height="30" rx="4" fill="#7C3AED"/><rect x="55" y="15" width="30" height="30" rx="4" fill="#A78BFA"/><rect x="15" y="55" width="30" height="30" rx="4" fill="#FF3D81"/><rect x="55" y="55" width="30" height="30" rx="4" fill="#C4F135"/></svg>`
  },
  {
    id: "memory",
    title: "Xotira Kartalari",
    desc: "Bir xil juftliklarni toping. Xotirangizni sinovdan o'tkazing.",
    category: "puzzle",
    tags: ["new"],
    rating: 4.6,
    plays: "410K",
    file: "games/memory.html",
    grad: ["#5B2A6B", "#0E0B1E"],
    icon: `<svg viewBox="0 0 100 100"><rect x="12" y="20" width="30" height="42" rx="5" fill="#7C3AED"/><rect x="58" y="20" width="30" height="42" rx="5" fill="#FF3D81"/><path d="M20 40l6 6 8-10" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="73" cy="40" r="7" fill="white"/></svg>`
  },
  {
    id: "tictactoe",
    title: "X-O O'yini",
    desc: "Do'stingiz yoki aqlli kompyuterga qarshi klassik X-O jangi.",
    category: "classic",
    tags: [],
    rating: 4.5,
    plays: "760K",
    file: "games/tictactoe.html",
    grad: ["#1E3A5F", "#0E0B1E"],
    icon: `<svg viewBox="0 0 100 100"><path d="M35 10v80M65 10v80M10 35h80M10 65h80" stroke="#A79DC7" stroke-width="4"/><path d="M18 18l14 14M32 18L18 32" stroke="#FF3D81" stroke-width="5" stroke-linecap="round"/><circle cx="75" cy="75" r="10" stroke="#C4F135" stroke-width="5" fill="none"/></svg>`
  },
  {
    id: "flappy",
    title: "Uchuvchi Qush",
    desc: "Bir bosish — bir sakrash. Trubalar orasidan omon o'ting!",
    category: "reflex",
    tags: ["hot"],
    rating: 4.7,
    plays: "1.5M",
    file: "games/flappy.html",
    grad: ["#164E63", "#0E0B1E"],
    icon: `<svg viewBox="0 0 100 100"><rect x="10" y="10" width="18" height="45" rx="3" fill="#22C55E"/><rect x="10" y="65" width="18" height="25" rx="3" fill="#22C55E"/><rect x="70" y="10" width="18" height="25" rx="3" fill="#22C55E"/><rect x="70" y="45" width="18" height="45" rx="3" fill="#22C55E"/><circle cx="48" cy="45" r="12" fill="#FDE047"/><path d="M58 45l8-4v8Z" fill="#F97316"/></svg>`
  },
  {
    id: "breakout",
    title: "G'ishtlar Jangi",
    desc: "To'pni burab, barcha g'ishtlarni parchalab tashlang.",
    category: "arcade",
    tags: [],
    rating: 4.4,
    plays: "530K",
    file: "games/breakout.html",
    grad: ["#5B1A3B", "#0E0B1E"],
    icon: `<svg viewBox="0 0 100 100"><rect x="10" y="15" width="20" height="10" rx="2" fill="#FF3D81"/><rect x="34" y="15" width="20" height="10" rx="2" fill="#C4F135"/><rect x="58" y="15" width="20" height="10" rx="2" fill="#7C3AED"/><rect x="22" y="30" width="20" height="10" rx="2" fill="#7C3AED"/><rect x="46" y="30" width="20" height="10" rx="2" fill="#FF3D81"/><circle cx="50" cy="60" r="6" fill="white"/><rect x="35" y="80" width="30" height="7" rx="3" fill="#A78BFA"/></svg>`
  },
  {
    id: "whackamole",
    title: "Krotni Ur",
    desc: "Teshiklardan chiqib qolgan krotlarni tezkorlik bilan urib chiqaring.",
    category: "reflex",
    tags: ["new"],
    rating: 4.3,
    plays: "290K",
    file: "games/whackamole.html",
    grad: ["#3B2A1F", "#0E0B1E"],
    icon: `<svg viewBox="0 0 100 100"><circle cx="25" cy="70" r="14" fill="#0E0B1E" stroke="#3B2A1F" stroke-width="4"/><circle cx="75" cy="70" r="14" fill="#0E0B1E" stroke="#3B2A1F" stroke-width="4"/><circle cx="50" cy="70" r="14" fill="#0E0B1E" stroke="#3B2A1F" stroke-width="4"/><ellipse cx="50" cy="45" rx="18" ry="22" fill="#A16207"/><circle cx="43" cy="40" r="3" fill="#0E0B1E"/><circle cx="57" cy="40" r="3" fill="#0E0B1E"/><ellipse cx="50" cy="52" rx="6" ry="4" fill="#0E0B1E"/></svg>`
  }
];
