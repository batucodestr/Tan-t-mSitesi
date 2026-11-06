export interface Service {
  id: string;
  title: string;
  /** One or two sentences for the homepage. */
  summary: string;
  /** Longer text for the services page. */
  detail: string;
  features: string[];
  image: { src: string; alt: string };
}

export const services: Service[] = [
  {
    id: "tam-kapsamli-yonetim",
    title: "Tam kapsamlı mülk yönetimi",
    summary:
      "Anahtarı teslim ettiğiniz andan itibaren ilan, rezervasyon, misafir ve operasyon süreçlerinin tamamını tek ekip olarak yürütüyoruz.",
    detail:
      "Kısa dönem kiralama, dışarıdan göründüğünden çok daha fazla küçük işten oluşur. Gece gelen bir mesaj, son dakika iptali, eksilen bir havlu. Tam kapsamlı yönetimde bu işlerin hepsi tek bir ekipte toplanır. Sizin için tek muhatap, tek rapor ve tek sorumluluk noktası oluşur.",
    features: [
      "Mülkün kısa dönem kiralamaya hazırlanması",
      "Rezervasyon ve takvim yönetimi",
      "Giriş ve çıkış organizasyonu",
      "Size özel tek bir mülk sorumlusu",
    ],
    image: { src: "/images/site/service-management.jpg", alt: "Havuzlu, beyaz, modern bir villa" },
  },
  {
    id: "airbnb-booking-yonetimi",
    title: "Airbnb ve Booking.com yönetimi",
    summary:
      "Mülkünüzü iki platformda da doğru anlatıyor, takvimleri eşitliyor ve ilan performansını düzenli olarak takip ediyoruz.",
    detail:
      "İyi bir ilan, misafirin mülkü tanımadan önce ona güvenmesini sağlar. Fotoğrafları, başlığı ve metni mülkünüzün gerçek güçlü yönlerine göre hazırlıyor, iki platformu tek takvimden yöneterek çift rezervasyon riskini ortadan kaldırıyoruz.",
    features: [
      "Profesyonel fotoğraf çekimi organizasyonu",
      "Türkçe ve İngilizce ilan metinleri",
      "Takvim eşitleme ve çift rezervasyon kontrolü",
      "Yorum yönetimi ve ilan performansı takibi",
    ],
    image: { src: "/images/site/service-listing.jpg", alt: "İlan çekimi için özenle düzenlenmiş sıcak tonlarda bir iç mekân" },
  },
  {
    id: "misafir-iletisimi",
    title: "Misafir iletişimi",
    summary:
      "Rezervasyon öncesi sorulardan çıkış gününe kadar her mesajı Türkçe ve İngilizce olarak biz yanıtlıyoruz.",
    detail:
      "Misafir memnuniyeti çoğu zaman ilk mesajla başlar. Sorulara hızlı ve net yanıt veriyor, giriş bilgilerini zamanında paylaşıyor ve konaklama sırasında çıkan sorunları size ulaşmadan çözüyoruz. Telefonunuz gece çalmıyor.",
    features: [
      "7/24 misafir mesajlaşması",
      "Giriş öncesi bilgilendirme ve ev rehberi",
      "Konaklama sırasında destek",
      "Sorunlu durumlarda platform süreçlerinin takibi",
    ],
    image: { src: "/images/site/service-guest.jpg", alt: "Ahşap masa üzerinde ev maketi ve anahtar" },
  },
  {
    id: "fiyat-optimizasyonu",
    title: "Fiyat optimizasyonu",
    summary:
      "Sezon, talep, etkinlik ve rakip verilerine göre fiyatları düzenli güncelliyoruz. Hedefimiz yalnızca doluluk değil, toplam gelir.",
    detail:
      "Takvimi doldurmak kolaydır; zor olan, doğru fiyatla doldurmaktır. Bölgenizdeki talebi ve benzer mülkleri izliyor, minimum konaklama sürelerini ve fiyatları buna göre ayarlıyoruz. Kararlarımızın gerekçesini de aylık raporda sizinle paylaşıyoruz.",
    features: [
      "Sezon ve talebe göre dinamik fiyatlandırma",
      "Benzer mülklerle düzenli karşılaştırma",
      "Minimum konaklama ve boş gün yönetimi",
      "Fiyat kararlarının raporlanması",
    ],
    image: { src: "/images/site/service-pricing.jpg", alt: "Dizüstü bilgisayar ve notlarla çalışma masası" },
  },
  {
    id: "temizlik-bakim",
    title: "Temizlik ve bakım koordinasyonu",
    summary:
      "Her konaklamanın ardından kontrol listesine dayalı temizlik, çamaşır ve sarf malzemesi yenilemesi; gerektiğinde hızlı bakım.",
    detail:
      "Mülkünüz her misafire ilk günkü gibi hazır olmalı. Temizlik ekiplerini takvime göre planlıyor, her çıkış sonrasında kontrol listesiyle teslim alıyor ve arızaları güvendiğimiz ustalarla çözüyoruz. Belirli bir tutarın üzerindeki harcamaları önce size danışıyoruz.",
    features: [
      "Kontrol listesine dayalı temizlik",
      "Çamaşır, nevresim ve sarf malzemesi takibi",
      "Periyodik bakım ve arıza koordinasyonu",
      "Harcamalarda önceden onay",
    ],
    image: { src: "/images/site/service-cleaning.jpg", alt: "Mülkte pencere temizliği yapan temizlik görevlisi" },
  },
];

export const faqs = [
  {
    question: "Mülkümü yönetmeniz için ne yapmam gerekiyor?",
    answer:
      "Başvuru formunu doldurmanız yeterli. Mülkünüzü değerlendirip potansiyelini ve bizden neler bekleyebileceğinizi sizinle paylaşıyoruz. Anlaşırsak hazırlık sürecini birlikte planlıyor, ardından ilanları yayına alıyoruz.",
  },
  {
    question: "Ücretlendirme nasıl çalışıyor?",
    answer:
      "Sabit bir ücret yerine, mülkünüzün elde ettiği gelir üzerinden komisyon çalışıyoruz. Oran; mülkün konumuna, büyüklüğüne ve kapsam ihtiyacına göre değerlendirme sonrasında netleşir ve sözleşmede açıkça yer alır.",
  },
  {
    question: "Kısa dönem kiralama için izin belgesi gerekiyor mu?",
    answer:
      "Evet. 1 Ocak 2024'te yürürlüğe giren 7464 sayılı Kanun uyarınca, konutunu 100 günü aşmayan sürelerle turizm amacıyla kiralamak isteyenlerin Kültür ve Turizm Bakanlığı'ndan izin belgesi alması gerekiyor. Apartman ve sitelerde kat maliklerinin oy birliğiyle verdiği karar da aranıyor. Başvuru sürecinde size yol gösteriyoruz.",
  },
  {
    question: "Mülkümü kendim de kullanabilir miyim?",
    answer:
      "Elbette. Kullanmak istediğiniz tarihleri bildirmeniz yeterli; takvimi buna göre kapatıyoruz.",
  },
  {
    question: "Gelirimi ve giderleri nasıl takip edeceğim?",
    answer:
      "Her ay rezervasyonları, geliri, platform kesintilerini, temizlik ve bakım giderlerini ve size kalan net tutarı gösteren anlaşılır bir rapor alıyorsunuz.",
  },
  {
    question: "Hasar olursa ne oluyor?",
    answer:
      "Her çıkış sonrasında mülkü kontrol ediyor, hasar varsa fotoğraflarla belgeliyoruz. Platformların hasar süreçlerini sizin adınıza takip ediyor ve gelişmeleri sizinle paylaşıyoruz.",
  },
];
