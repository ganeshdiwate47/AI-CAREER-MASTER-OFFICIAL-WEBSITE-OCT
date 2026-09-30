import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";

const SECTIONS = [
  {
    h: { en: "Use of this website", mr: "या संकेतस्थळाचा वापर" },
    p: {
      en: "This website is operated by AI Career Master. By using it you agree to these terms. Content here is general information about our programs; details shared at counselling or enrolment prevail.",
      mr: "हे संकेतस्थळ AI Career Master चलवते. वापर केल्यास या अटी मान्य असतात. येथील मजकूर आमच्या कार्यक्रमांविषयी सामान्य माहिती आहे; कौन्सेलिंग/प्रवेशावेळी दिलेले तपशील अंतिम राहतील.",
    },
  },
  {
    h: { en: "Programs & intellectual property", mr: "कार्यक्रम व बौद्धिक संपदा" },
    p: {
      en: "Program names, curriculum, the 8D Career Transformation Framework™ and all training materials are the property of AI Career Master and may not be copied or reproduced without written permission.",
      mr: "कार्यक्रम-नावे, अभ्यासक्रम, 8D करिअर ट्रान्सफॉर्मेशन फ्रेमवर्क™ व सर्व प्रशिक्षण-साहित्य AI Career Master ची मालमत्ता आहे; लेखी परवानगीशिवाय त्याची पुनरुत्पादना करू नये.",
    },
  },
  {
    h: { en: "Enrolment, fees & refunds", mr: "प्रवेश, फी व परतावा" },
    p: {
      en: "Fees, schedules, instalment options and refund terms are shared in writing at the time of enrolment and form part of your admission agreement.",
      mr: "फी, वेळापत्रक, हप्ता-पर्याय व परतावा-अटी प्रवेशाच्या वेळी लेखी दिल्या जातात व त्या तुमच्या प्रवेश-कराराचा भाग असतात.",
    },
  },
  {
    h: { en: "Certifications & placement assistance", mr: "प्रमाणपत्रे व प्लेसमेंट मदत" },
    p: {
      en: "Certificates recognise course completion. Placement assistance — training, resume support, interviews and drives — is provided in good faith; no employment guarantee is implied.",
      mr: "प्रमाणपत्र कोर्स पूर्णतेची दाखलं देतं. प्लेसमेंट मदत — प्रशिक्षण, रिझ्यूम, मुलाखती व मेळावे — प्रामाणिकपणे दिली जाते; नोकरीची हमी असं याचा अर्थ घेऊ नये.",
    },
  },
  {
    h: { en: "Limitation of liability", mr: "दायित्व मर्यादा" },
    p: {
      en: "We keep the information on this website accurate and updated, but we are not liable for decisions made solely on the basis of website content.",
      mr: "संकेतस्थळावरील माहिती अचूक व अद्ययावत ठेवण्याचा आम्ही प्रयत्न करतो; पण केवळ या मजकुरावर आधारित निर्णयांसाठी आम्ही जबाबदार राहणार नाही.",
    },
  },
  {
    h: { en: "Governing law", mr: "लागू कायदा" },
    p: {
      en: "These terms are governed by the laws of India; the courts at Pune, Maharashtra have exclusive jurisdiction.",
      mr: "या अटी भारताच्या कायद्यानुसार राहतील; पुणे, महाराष्ट्र येथील न्यायालयांना एकच अधिकारक्षेत्र राहील.",
    },
  },
  {
    h: { en: "Contact", mr: "संपर्क" },
    p: {
      en: "Questions about these terms: careermaster1998@gmail.com | +91 91751 57977.",
      mr: "या अटींविषयी प्रश्न: careermaster1998@gmail.com | +91 91751 57977.",
    },
  },
];

export default function Terms() {
  const { t, L } = useLang();
  return (
    <>
      <SEO title={t("pages.terms.title")} description="Terms of service for the AI Career Master website and programs." />
      <section className="grain relative overflow-hidden bg-navy pb-14 pt-36 sm:pt-44">
        <div className="container-x relative">
          <p className="eyebrow text-orange-soft">{t("pages.terms.eyebrow")}</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl" data-testid="terms-title">{t("pages.terms.title")}</h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/50">{t("pages.terms.updated")}</p>
        </div>
      </section>
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-3xl space-y-10">
          {SECTIONS.map((s, i) => (
            <Reveal key={i} y={18}>
              <div data-testid={`terms-section-${i}`}>
                <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">{L(s.h)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{L(s.p)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
