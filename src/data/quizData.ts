import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Apakah fungsi sel kering dalam suatu litar elektrik?",
    options: [
      "A) Menyerap cahaya dari persekitaran",
      "B) Membekalkan tenaga elektrik",
      "C) Memutuskan dan menyambungkan litar",
      "D) Mengelakkan wayar menjadi panas"
    ],
    correctIndex: 1,
    category: "Fungsi Komponen",
    explanation: "Sel kering mengandungi tenaga kimia yang ditukarkan kepada tenaga elektrik untuk membekalkan arus kepada komponen litar.",
    tip: "Fikirkan sumber kuasa yang menghidupkan lampu suluh."
  },
  {
    id: 2,
    question: "Apakah perubahan bentuk tenaga yang berlaku apabila mentol menyala dalam litar elektrik yang lengkap?",
    options: [
      "A) Tenaga Kimia ➔ Tenaga Elektrik ➔ Tenaga Cahaya + Tenaga Haba",
      "B) Tenaga Cahaya ➔ Tenaga Elektrik ➔ Tenaga Kinetik",
      "C) Tenaga Haba ➔ Tenaga Bunyi ➔ Tenaga Kimia",
      "D) Tenaga Elektrik ➔ Tenaga Kimia ➔ Tenaga Keupayaan"
    ],
    correctIndex: 0,
    category: "Perubahan Bentuk Tenaga",
    explanation: "Tenaga kimia dari sel kering bertukar menjadi tenaga elektrik yang mengalir melalui wayar, dan seterusnya bertukar kepada tenaga cahaya dan tenaga haba pada mentol.",
    tip: "Mentol yang menyala bukan sahaja terang, tetapi juga terasa panas jika disentuh."
  },
  {
    id: 3,
    question: "Mengapakah mentol TIDAK menyala apabila suis dibuka (litar terbuka)?",
    options: [
      "A) Litar menjadi terlalu lengkap",
      "B) Arus elektrik terputus kerana tiada laluan lengkap",
      "C) Sel kering secara automatik kehilangan cas",
      "D) Mentol terbakar serta-merta"
    ],
    correctIndex: 1,
    category: "Litar Lengkap & Tidak Lengkap",
    explanation: "Suis terbuka menyebabkan litar terputus (litar terbuka). Arus elektrik hanya boleh mengalir dalam satu gelung litar yang lengkap dan tertutup.",
    tip: "Suis terbuka = jambatan terangkat, kereta tidak boleh lalu."
  },
  {
    id: 4,
    question: "Dalam litar bersiri, apakah yang berlaku kepada mentol lain jika satu mentol ditanggalkan atau terbakar?",
    options: [
      "A) Mentol lain menjadi semakin cerah",
      "B) Mentol lain terus menyala seperti biasa",
      "C) Mentol lain turut terpadam",
      "D) Sel kering akan meletup"
    ],
    correctIndex: 2,
    category: "Litar Bersiri & Selari",
    explanation: "Dalam litar bersiri, arus elektrik hanya mengalir melalui satu laluan tunggal. Jika satu mentol rosak/terbakar, laluan terputus dan semua mentol lain terpadam.",
    tip: "Litar bersiri hanya ada 1 jalan raya untuk arus elektrik."
  },
  {
    id: 5,
    question: "Antara susunan berikut, susunan manakah yang menghasilkan mentol paling CERAH?",
    options: [
      "A) 1 sel kering dengan 3 mentol dalam litar bersiri",
      "B) 2 sel kering dengan 1 mentol dalam litar lengkap",
      "C) 1 sel kering dengan 2 mentol dalam litar bersiri",
      "D) 1 sel kering dengan suis terbuka"
    ],
    correctIndex: 1,
    category: "Kecerahan Mentol",
    explanation: "Menambah bilangan sel kering meningkatkan voltan/tenaga elektrik, manakala mengurangkan bilangan mentol berkongsi tenaga membolehkan mentol menyala dengan paling cerah.",
    tip: "Lebih banyak bateri + sedikit mentol = nyalaan lebih terang."
  },
  {
    id: 6,
    question: "Bahan manakah yang merupakan KONDUKTOR elektrik dan boleh menyalakan mentol apabila diuji?",
    options: [
      "A) Pembaris kayu",
      "B) Pemadam getah",
      "C) Paku besi",
      "D) Sudu plastik"
    ],
    correctIndex: 2,
    category: "Konduktor & Penebat",
    explanation: "Paku besi diperbuat daripada logam yang merupakan konduktor elektrik (membenarkan arus elektrik mengalir melaluinya). Kayu, getah, dan plastik adalah penebat elektrik.",
    tip: "Logam adalah pengalir elektrik yang sangat baik."
  },
  {
    id: 7,
    question: "Apakah kelebihan litar SELARI berbanding litar bersiri di rumah kita?",
    options: [
      "A) Menggunakan lebih sedikit wayar",
      "B) Jika satu peralatan elektrik dimatikan, peralatan lain masih boleh berfungsi",
      "C) Mentol menjadi malap apabila dipasang banyak",
      "D) Tidak memerlukan suis"
    ],
    correctIndex: 1,
    category: "Aplikasi Harian",
    explanation: "Dalam litar selari, terdapat lebih daripada satu laluan arus elektrik. Setiap cabang mempunyai laluannya sendiri, membolehkan peralatan dikawal secara berasingan.",
    tip: "Lampu bilik tidur boleh ditutup tanpa memadamkan lampu ruang tamu."
  }
];
