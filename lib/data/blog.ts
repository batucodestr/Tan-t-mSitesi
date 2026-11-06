export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date. */
  publishedAt: string;
  image: { src: string; alt: string };
  sections: { heading: string; paragraphs: string[] }[];
}

/** SAMPLE ARTICLES, newest first. Review them and set real dates before launch. */
export const blogPosts: BlogPost[] = [
  {
    slug: "kisa-donem-kiralama-izin-belgesi",
    title: "Kısa dönem kiralama izin belgesi hakkında bilmeniz gerekenler",
    excerpt: "7464 sayılı Kanun, evini kısa süreli kiralayan ev sahiplerinin sorumluluklarını belirliyor. Başlamadan önce nelere bakmalısınız?",
    category: "Mevzuat",
    publishedAt: "2026-10-20",
    image: { src: "/images/blog/izin-belgesi.jpg", alt: "Gri koltuklu, ahşap sehpalı sıcak bir oturma odası" },
    sections: [
      {
        heading: "Kimler izin almak zorunda?",
        paragraphs: [
          "1 Ocak 2024'te yürürlüğe giren 7464 sayılı Kanun, konutların 100 günü aşmayan sürelerle turizm amacıyla kiralanmasını düzenliyor. Evinizi bu kapsamda kiralamak istiyorsanız Kültür ve Turizm Bakanlığı'ndan izin belgesi almanız gerekiyor.",
          "Kapsam, ilanın hangi platformda yayınlandığına göre değişmiyor. Airbnb, Booking.com veya başka bir kanal üzerinden kiralama yapmanız sonucu değiştirmez.",
        ],
      },
      {
        heading: "Apartman ve sitelerde kat maliklerinin kararı",
        paragraphs: [
          "Başvuru sırasında aranan en önemli şartlardan biri, binadaki kat maliklerinin oy birliğiyle verdiği karardır. Bu nedenle sürece komşularınızla konuşarak başlamak zaman kazandırır.",
        ],
      },
      {
        heading: "Başvuru öncesi hazırlık",
        paragraphs: [
          "Tapu bilgilerinizi, kat malikleri kararını ve kimlik bilgilerinizi önceden hazırlamak süreci kolaylaştırır. Mevzuat zaman içinde değişebileceği için güncel şartları Bakanlığın resmî kaynaklarından kontrol etmenizi öneririz.",
          "Bu yazı genel bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez.",
        ],
      },
    ],
  },
  {
    slug: "ilan-fotograflari-nasil-olmali",
    title: "Daha çok rezervasyon getiren ilan fotoğrafları nasıl çekilir?",
    excerpt: "Misafir ilanınızı okumadan önce fotoğraflarınıza bakar. İyi bir çekim için pahalı ekipmandan çok doğru hazırlık gerekir.",
    category: "İlan Yönetimi",
    publishedAt: "2026-10-02",
    image: { src: "/images/blog/ilan-fotograflari.jpg", alt: "Hasır avizeli, sıcak tonlarda bir oturma alanı" },
    sections: [
      {
        heading: "Çekimden önce evi hazırlayın",
        paragraphs: [
          "Kişisel eşyaları kaldırın, yatakları özenle yapın ve tezgâhları boşaltın. Amaç evi boş göstermek değil, misafirin kendini orada hayal edebilmesini sağlamaktır.",
        ],
      },
      {
        heading: "Gün ışığından yararlanın",
        paragraphs: [
          "Perdeleri açın ve çekimi evin en çok ışık aldığı saatlere planlayın. Teras veya havuz varsa gün batımı saatlerini ayrıca değerlendirin; bu kareler çoğu zaman ilanın kapak fotoğrafı olur.",
        ],
      },
      {
        heading: "Kapak fotoğrafını özenle seçin",
        paragraphs: [
          "Arama sonuçlarında misafirin ilk gördüğü şey kapak fotoğrafınızdır. Mülkünüzün en güçlü özelliğini tek karede anlatan bir görsel seçin ve fotoğrafları evi gezdiren bir sırayla dizin.",
          "Gerçeği yansıtmayan açılardan kaçının. Beklentisi karşılanmayan misafir olumsuz yorum bırakır; bu da uzun vadede fotoğrafın getirdiğinden fazlasını götürür.",
        ],
      },
    ],
  },
  {
    slug: "kisa-donem-kiralamada-fiyatlandirma",
    title: "Kısa dönem kiralamada doğru fiyatı belirlemenin yolları",
    excerpt: "Tüm yıl aynı fiyatla kiralamak, yoğun dönemde gelir kaçırmak ve sakin dönemde boş kalmak demektir.",
    category: "Gelir Yönetimi",
    publishedAt: "2026-09-15",
    image: { src: "/images/blog/fiyatlandirma.jpg", alt: "Dizüstü bilgisayar ve notlarla çalışma masası" },
    sections: [
      {
        heading: "Doluluk tek başına başarı değildir",
        paragraphs: [
          "Takvimin tamamen dolu olması her zaman iyi bir işaret değildir; fiyatın düşük kaldığını da gösterebilir. Asıl bakılması gereken, belirli bir dönemin sonunda kalan toplam gelirdir.",
        ],
      },
      {
        heading: "Fiyatı değiştiren etkenleri takip edin",
        paragraphs: [
          "Sezon, hafta sonları, resmî tatiller ve bölgedeki etkinlikler talebi doğrudan etkiler. Benzer mülklerin fiyatlarını ve doluluklarını düzenli olarak izlemek, kendi fiyatınızı doğru yere koymanızı sağlar.",
        ],
      },
      {
        heading: "Boş günleri değerlendirin",
        paragraphs: [
          "İki rezervasyon arasında kalan kısa boşluklar çoğu zaman kiralanmadan geçer. Minimum konaklama süresini bu tarihler için esnetmek veya yaklaşan boş tarihlerde fiyatı ayarlamak, kaybolacak geceleri gelire çevirebilir.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

const dateFormat = new Intl.DateTimeFormat("tr-TR", { dateStyle: "long", timeZone: "UTC" });

export function formatBlogDate(isoDate: string): string {
  return dateFormat.format(new Date(isoDate));
}
