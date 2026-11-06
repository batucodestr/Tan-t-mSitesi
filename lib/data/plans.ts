export interface Plan {
  id: string;
  name: string;
  /** Who the plan suits, in one sentence. */
  audience: string;
  /**
   * Commission as shown to visitors. PLACEHOLDER: replace with the real rates,
   * for example "Gelirin %X'i". This is the only place they need to change.
   */
  commission: string;
  features: string[];
  recommended: boolean;
}

export const plans: Plan[] = [
  {
    id: "dijital-yonetim",
    name: "Dijital Yönetim",
    audience: "Temizlik ve giriş-çıkış işlerini kendisi veya kendi ekibiyle yürüten ev sahipleri için.",
    commission: "Değerlendirme sonrası belirlenir",
    features: [
      "Airbnb ve Booking.com ilan yönetimi",
      "Fiyatlandırma ve takvim yönetimi",
      "Misafir mesajları",
      "Aylık gelir raporu",
    ],
    recommended: false,
  },
  {
    id: "tam-yonetim",
    name: "Tam Yönetim",
    audience: "Mülkünün tüm işlerini tek bir ekibe bırakmak isteyen ev sahipleri için.",
    commission: "Değerlendirme sonrası belirlenir",
    features: [
      "Dijital Yönetim'deki her şey",
      "Giriş ve çıkış organizasyonu",
      "Temizlik, çamaşır ve sarf malzemesi takibi",
      "Bakım ve arıza koordinasyonu",
      "Size özel mülk sorumlusu",
    ],
    recommended: true,
  },
];

export const planComparison: { task: string; digital: boolean; full: boolean }[] = [
  { task: "İlan hazırlığı ve platform yönetimi", digital: true, full: true },
  { task: "Fiyatlandırma ve takvim", digital: true, full: true },
  { task: "Misafir mesajları", digital: true, full: true },
  { task: "İzin belgesi sürecinde yol gösterme", digital: true, full: true },
  { task: "Aylık raporlama", digital: true, full: true },
  { task: "Giriş ve çıkış organizasyonu", digital: false, full: true },
  { task: "Temizlik ve çamaşır planlaması", digital: false, full: true },
  { task: "Bakım ve arıza koordinasyonu", digital: false, full: true },
  { task: "Size özel mülk sorumlusu", digital: false, full: true },
];

export const pricingFaqs = [
  {
    question: "Sabit bir aylık ücret ödüyor muyum?",
    answer:
      "Hayır. Komisyon, mülkünüzün elde ettiği gelir üzerinden hesaplanır. Rezervasyon olmayan bir ayda yönetim komisyonu da oluşmaz.",
  },
  {
    question: "Komisyon oranı neye göre belirleniyor?",
    answer:
      "Seçtiğiniz plana, mülkün konumuna ve büyüklüğüne göre. Oranı değerlendirme sonrasında sizinle paylaşıyor ve sözleşmede açıkça belirtiyoruz.",
  },
  {
    question: "Komisyona dahil olmayan giderler neler?",
    answer:
      "Platform kesintileri, temizlik ve çamaşır, sarf malzemeleri ve onarımlar ayrıca hesaplanır. Hepsini aylık raporunuzda satır satır görürsünüz.",
  },
  {
    question: "Planımı sonradan değiştirebilir miyim?",
    answer:
      "Evet. İhtiyacınız değişirse mülk sorumlunuzla görüşerek planınızı değiştirebilirsiniz. Koşullar sözleşmede yer alır.",
  },
];
