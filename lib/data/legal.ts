export interface LegalDocument {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
}

/**
 * DRAFT TEMPLATES. These texts have not been reviewed by a lawyer and need to
 * be replaced with reviewed versions before launch. The legal page shows a
 * visible notice until `legalDraft` is set to false.
 */
export const legalDraft = true;

export const legalDocuments: LegalDocument[] = [
  {
    slug: "kvkk-aydinlatma-metni",
    title: "KVKK Aydınlatma Metni",
    description: "Kişisel verilerinizin 6698 sayılı Kanun kapsamında nasıl işlendiğine dair aydınlatma metni.",
    sections: [
      {
        heading: "Veri sorumlusu",
        body: "Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla [Şirket unvanı] tarafından işlenmektedir.",
      },
      {
        heading: "İşlenen kişisel veriler",
        body: "Formlarımız aracılığıyla ad, soyad, e-posta adresi, telefon numarası ve mülkünüze ilişkin paylaştığınız bilgiler işlenmektedir.",
      },
      {
        heading: "İşleme amaçları",
        body: "Verileriniz, başvurunuzu değerlendirmek, sizinle iletişime geçmek ve talep ettiğiniz hizmete ilişkin süreçleri yürütmek amacıyla işlenir.",
      },
      {
        heading: "Hukuki sebep ve aktarım",
        body: "Verileriniz, bir sözleşmenin kurulması ile ilgili olması ve meşru menfaat hukuki sebeplerine dayanılarak işlenir. Yalnızca hizmetin yürütülmesi için gerekli olduğu ölçüde tedarikçilerimizle paylaşılabilir.",
      },
      {
        heading: "Haklarınız",
        body: "Kanun'un 11. maddesi kapsamındaki haklarınızı kullanmak için [e-posta adresi] üzerinden bize başvurabilirsiniz.",
      },
    ],
  },
  {
    slug: "gizlilik-politikasi",
    title: "Gizlilik Politikası",
    description: "Web sitemizi kullanırken bilgilerinizi nasıl koruduğumuzu açıklayan gizlilik politikası.",
    sections: [
      {
        heading: "Topladığımız bilgiler",
        body: "Yalnızca formlar aracılığıyla bize ilettiğiniz bilgileri ve sitenin çalışması için gereken teknik kayıtları topluyoruz.",
      },
      {
        heading: "Bilgilerin kullanımı",
        body: "Bilgilerinizi talebinizi yanıtlamak için kullanıyoruz. Pazarlama amacıyla üçüncü taraflara satmıyoruz.",
      },
      {
        heading: "Saklama süresi",
        body: "Bilgilerinizi amacın gerektirdiği süre ve yasal yükümlülüklerimiz boyunca saklıyoruz.",
      },
      {
        heading: "İletişim",
        body: "Gizlilikle ilgili sorularınız için [e-posta adresi] üzerinden bize ulaşabilirsiniz.",
      },
    ],
  },
  {
    slug: "kullanim-kosullari",
    title: "Kullanım Koşulları",
    description: "Web sitemizin kullanımına ilişkin koşullar.",
    sections: [
      {
        heading: "Sitenin amacı",
        body: "Bu site, hizmetlerimizi tanıtmak için hazırlanmıştır. Site üzerinden rezervasyon veya ödeme yapılmaz.",
      },
      {
        heading: "İçerik",
        body: "Sitedeki bilgiler, fiyatlandırma ve blog yazıları dahil, bilgilendirme amaçlıdır ve zaman içinde değişebilir. Güncel bilgi için bizimle iletişime geçebilirsiniz.",
      },
      {
        heading: "Fikri mülkiyet",
        body: "Sitedeki metin, görsel ve tasarımlar izinsiz kopyalanamaz ve kullanılamaz.",
      },
    ],
  },
];
