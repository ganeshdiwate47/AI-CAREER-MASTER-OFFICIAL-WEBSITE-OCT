import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";

const SECTIONS = [
  {
    h: { en: "What we collect", mr: "आम्ही काय जमा करतो" },
    p: {
      en: "When you submit an enquiry we collect your name, mobile/WhatsApp number, email (where provided), program interest and any message you share. We also record basic technical metadata such as the page, referral source and campaign parameters (UTM) attached to your visit.",
      mr: "चौकशी सादर केल्यावर आम्ही तुमचं नाव, मोबाईल/WhatsApp क्रमांक, ईमेल (दिल्यास), कार्यक्रमाची आवड आणि दिलेला संदेश जमा करतो. तसेच पृष्ठ, स्रोत व मोहीम-मापदंड (UTM) यांसारखी मूलभूत तांत्रिक माहितीही नोंदवतो.",
    },
  },
  {
    h: { en: "How we use it", mr: "आम्ही ती कशी वापरतो" },
    p: {
      en: "Your details are used only to respond to your enquiry, provide counselling and share the program information you asked for. Enquiries may be synced to our CRM (Coacheasily) and, where configured, to our Google Forms response sheets for follow-up.",
      mr: "तुमची माहिती फक्त चौकशीची उत्तरं देण्यास, कौन्सेलिंगसाठी व मागितलेल्या कार्यक्रम-माहितीसाठी वापरली जाते. चौकशी आमच्या CRM (Coacheasily) मध्ये व, संरचित असल्यास, Google Forms उत्तर-शीट्समध्ये समक्रमित केली जाऊ शकते.",
    },
  },
  {
    h: { en: "Third-party processing", mr: "तृतीय-पक्ष प्रक्रिया" },
    p: {
      en: "Lead data may be processed by trusted providers on our behalf — our CRM, Google Forms/Sheets and communication tools. We never sell your personal data.",
      mr: "चौकशी-माहिती आमच्या वतीने विश्वासू पुरवठादारांकडून प्रक्रिया होऊ शकते — आमचे CRM, Google Forms/Sheets व संवाद-साधने. आम्ही तुमचा वैयक्तिक डेटा विकत नाही.",
    },
  },
  {
    h: { en: "Storage & security", mr: "साठवण व सुरक्षा" },
    p: {
      en: "Submissions are stored in our secured database and are accessible only to authorised team members. We apply industry-standard safeguards and retain data only as long as needed for its purpose.",
      mr: "सादरीकरण आमच्या सुरक्षित डेटाबेसमध्ये साठवले जातात व केवळ अधिकृत टीम-सदस्यांना दिसतात. आम्ही उद्योग-प्रमाण खबरदारी घेतो व डेटा गरजेपुरता तेवढाच ठेवतो.",
    },
  },
  {
    h: { en: "Your rights", mr: "तुमचे अधिकार" },
    p: {
      en: "You may ask us to access, correct or delete your personal data at any time by writing to careermaster1998@gmail.com.",
      mr: "तुमच्या वैयक्तिक माहितीचा प्रत्यय, दुरुस्ती किंवा नष्टीकरणाची विनंती तुम्ही कधीही careermaster1998@gmail.com वर ईमेल करून करू शकता.",
    },
  },
  {
    h: { en: "Updates to this policy", mr: "धोरणातील बदल" },
    p: {
      en: "We may update this policy as our tools and processes evolve. The latest version will always be available on this page.",
      mr: "आमची साधने व प्रक्रिया बदलल्यास हे धोरण अद्ययावत होऊ शकते. नवीनतम आवृत्ती नेहमी या पृष्ठावर उपलब्ध असेल.",
    },
  },
];

export default function Privacy() {
  const { t, L } = useLang();
  return (
    <>
      <SEO title={t("pages.privacy.title")} description="How AI Career Master collects, uses and protects your enquiry data." />
      <section className="grain relative overflow-hidden bg-navy pb-14 pt-36 sm:pt-44">
        <div className="container-x relative">
          <p className="eyebrow text-orange-soft">{t("pages.privacy.eyebrow")}</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl" data-testid="privacy-title">{t("pages.privacy.title")}</h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/50">{t("pages.privacy.updated")}</p>
        </div>
      </section>
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-3xl space-y-10">
          {SECTIONS.map((s, i) => (
            <Reveal key={i} y={18}>
              <div data-testid={`privacy-section-${i}`}>
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
