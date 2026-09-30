// ─────────────────────────────────────────────────────────────
// SITE CONTENT — single source of truth. Update facts, figures,
// photos, testimonials & videos here as the owner supplies them.
// Items marked OWNER-INPUT are placeholders awaiting verified data.
// ─────────────────────────────────────────────────────────────
const M = (en, mr) => ({ en, mr });

export const CONTACT = {
  phone: "+91 91751 57977",
  phoneHref: "tel:+919175157977",
  email: "careermaster1998@gmail.com",
  emailHref: "mailto:careermaster1998@gmail.com",
  whatsapp: "https://chat.whatsapp.com/Ij7yiHcl7yoIeLHA9q298C",
  website: "www.aicareermaster.com",
  location: M("Pune, Maharashtra, India", "पुणे, महाराष्ट्र, भारत"),
};

export const STATS = [
  { id: "students", value: "500+" },
  { id: "years", value: "30+" },
  { id: "modules", value: "10+" },
  { id: "vision", value: "1,00,000" },
];

export const BADGES = ["MKCL Approved", "Mindler Certified", "UT Austin Certified"];

export const IMAGES = {
  // TEMPORARY STOCK — replace each file in /frontend/public/images/ with originals.
  hero: "/images/hero-students.jpg",
  campus: "/images/campus.jpg",
  graduates: "/images/graduates.jpg",
  presentation: "/images/presentation.jpg",
  founderGanesh: "/images/founder-ganesh.jpg",
  founderPrashant: "/images/founder-prashant.jpg",
  // OWNER-INPUT: drop the approved logo at /frontend/public/brand/logo.png and it
  // replaces the built-in SVG wordmark everywhere (header, footer, favicon stays).
  logo: "/brand/logo.png",
};

export const FRAMEWORK_8D = [
  { n: "1D", title: M("Diagnostic Career Mapping", "निदानात्मक करिअर नकाशा"), desc: M("Strengths, interests & IKIGAI-based direction", "क्षमता, आवड व IKIGAI-आधारित दिशा") },
  { n: "2D", title: M("AI Domain Mastery", "AI क्षेत्र प्रभुत्व"), desc: M("Hands-on with the AI tools of your industry", "तुमच्या उद्योगाची AI साधने हाताळून") },
  { n: "3D", title: M("Applied Industry Projects", "उद्योग-आधारित प्रकल्प"), desc: M("Real work that fills your portfolio", "पोर्टफोलिओ भरणारे खरे काम") },
  { n: "4D", title: M("Digital Personal Branding", "डिजिटल वैयक्तिक ब्रँडिंग"), desc: M("Resume, LinkedIn & a visible reputation", "रिझ्यूम, LinkedIn व दिसणारी ख्याती") },
  { n: "5D", title: M("AI Productivity & Tooling", "AI उत्पादकता व साधने"), desc: M("Automate the boring, master the daily", "कंटाळवाणी काम आपोआप, रोजचं हुशार") },
  { n: "6D", title: M("Corporate Communication & Soft Skills", "कॉर्पोरेट संवाद व सौम्य कौशल्ये"), desc: M("Speak, present & write like a professional", "व्यावसायिकाप्रमाणे बोला, मांडा, लिहा") },
  { n: "7D", title: M("Executive Mentorship & Mock Interviews", "वरिष्ठ मार्गदर्शन व सराव मुलाखती"), desc: M("Mentors who've sat on the other side of the table", "मुलाखत घेतलेल्या मेंटर्सचं मार्गदर्शन") },
  { n: "8D", title: M("Direct Placement & Opportunity Access", "प्रत्यक्ष प्लेसमेंट व संधी"), desc: M("Drives, referrals & employer networks", "मेळावे, रेफरल व भरती-मंडळे") },
];

export const JOURNEY = [
  { title: M("Assessment & Career Profiling", "मूल्यांकन व करिअर प्रोफाइलिंग"), desc: M("Who you are, mapped properly", "तुम्ही कोण — सविस्तर नकाशा") },
  { title: M("Skill-Gap Analysis & Roadmap", "कौशल्य-अंतर विश्लेषण व रस्ता"), desc: M("A personal plan, not generic advice", "सामान्य सल्ला नाही, वैयक्तिक बेत") },
  { title: M("Hands-on AI Certification", "व्यावहारिक AI प्रमाणन"), desc: M("Learn by doing, in Marathi", "करत करत शिकणं, मराठीत") },
  { title: M("Live Capstone Projects", "प्रत्यक्ष प्रकल्प"), desc: M("Portfolio-grade work for real needs", "खऱ्या गरजांसाठी पोर्टफोलिओ-दर्जेदार काम") },
  { title: M("Placement & Interview Acceleration", "प्लेसमेंट व मुलाखत ॲक्सेलरेशन"), desc: M("Drives, referrals & final polish", "मेळावे, रेफरल व शेवटची पळस") },
];

export const DIFFERENTIATORS = [
  { icon: "Languages", title: M("Marathi-first learning", "मराठीतून शिकवण"), desc: M("Deep concepts in Marathi, professional terms in English — so nothing gets lost in translation.", "संकल्पना मराठीत, व्यावसायिक शब्द इंग्रजीत — भाषेचा अडथळा नाही.") },
  { icon: "Briefcase", title: M("Corporate + 30-year teaching depth", "कॉर्पोरेट + तीस वर्षांची शिकवण"), desc: M("Mentors from Tata International, P&G, Mondelez & Volkswagen, alongside 30+ years of education roots.", "टाटा इंटरनॅशनल, P&G, मोंडेलेझ व व्हॉक्सवॅगनचा अनुभव, सोबत शिक्षण क्षेत्रातील ३०+ वर्षे.") },
  { icon: "Hammer", title: M("Practical, not theoretical", "व्यावहारिक, पुस्तकी नाही"), desc: M("10+ hands-on modules, 50+ AI tools, real files, real posts, real results.", "१०+ कृती मॉड्यूल, ५०+ AI साधने — खरी फाइल, खरा मजकूर, खरा निकाल.") },
  { icon: "FolderKanban", title: M("Portfolio before certificate", "प्रमाणपत्राआधी पोर्टफोलिओ"), desc: M("You leave with work you can show — posters, dashboards, chatbots, plans.", "दाखवता येईल असं काम घेऊन जाता — पोस्टर, डॅशबोर्ड, चॅटबॉट, बेत.") },
  { icon: "Target", title: M("Placement-obsessed", "प्लेसमेंटवर केंद्रित"), desc: M("Resume, branding, mock interviews and drives — everything aims at the offer letter.", "रिझ्यूम, ब्रँडिंग, सराव मुलाखती व मेळावे — लक्ष्य फक्त ऑफर लेटर.") },
  { icon: "Globe", title: M("Local roots, global standards", "स्थानिक मुळं, जागतिक दर्जा"), desc: M("MKCL-grounded centre with international certifications — UT Austin, Mindler & more.", "MKCL आधारित केंद्र, आंतरराष्ट्रीय प्रमाणपत्रांसोबत — UT Austin, Mindler व अजून.") },
];

export const FOUNDERS = [
  {
    id: "ganesh",
    name: "Ganesh Diwate",
    nameMr: "गणेश दिवटे",
    role: M("Founder & Chief Career Transformation Strategist", "संस्थापक आणि करिअर ट्रान्सफॉर्मेशन स्ट्रॅटेजिस्ट"),
    bio: M(
      "Corporate professional with 10+ years across Tata International, P&G, Mondelez and Volkswagen. AI Educator, Career Guide and Corporate Mentor on a mission to make Maharashtra AI-ready.",
      "टाटा इंटरनॅशनल, P&G, मोंडेलेझ आणि व्हॉक्सवॅगनमधील १०+ वर्षांचा सांघिक अनुभव. महाराष्ट्राला AI-सक्षम बनवण्याच्या ध्येयाने असलेले AI शिक्षक, करिअर मार्गदर्शक आणि कॉर्पोरेट मेंटर."
    ),
    creds: [
      M("BE Electrical — Govt. College of Engg. Karad", "BE इलेक्ट्रिकल — शासकीय अभियांत्रिकी महाविद्यालय, कराड"),
      M("MBA Marketing — Indira Group of Institutes, Pune", "MBA मार्केटिंग — इंदिरा ग्रुप ऑफ इन्स्टिट्यूट्स, पुणे"),
      M("PGP Data Science & Business Analytics — UT Austin (pursuing)", "PGP डेटा सायन्स व बिझनेस ॲनालिटिक्स — UT Austin (चालू)"),
      M("Internationally Certified Career Counsellor", "आंतरराष्ट्रीय प्रमाणित करिअर कौन्सेलर"),
    ],
    quote: M(
      "Success is not determined by the degree you earn, but by the value you create.",
      "यश तुम्ही कमावलेल्या पदवीवर नाही, तर तुम्ही निर्माण केलेल्या मूल्यावर ठरतं."
    ),
    photo: "/images/founder-ganesh.jpg",
  },
  {
    id: "prashant",
    name: "Prashant Amane",
    nameMr: "प्रशांत आमणे",
    role: M("Co-Founder & Chief Learning Officer", "सह-संस्थापक आणि प्रमुख प्रशिक्षक"),
    bio: M(
      "Founder of Sai Computers, Tarale (MKCL Authorised Learning Centre) with 30+ years in education. MKCL Master Trainer who has trained thousands of learners across rural Maharashtra.",
      "साई कॉम्प्युटर, तारळे (MKCL अधिकृत शिक्षण केंद्र) चे संस्थापक; शिक्षण क्षेत्रात ३०+ वर्षे. ग्रामीण महाराष्ट्रात हजारो विद्यार्थ्यांना घडविलेले MKCL मास्टर ट्रेनर."
    ),
    creds: [
      M("MKCL Master Trainer", "MKCL मास्टर ट्रेनर"),
      M("Certified International Career Coach & Counsellor", "प्रमाणित आंतरराष्ट्रीय करिअर कोच व कौन्सेलर"),
      M("Certified Google Educator & Microsoft Excel Expert", "प्रमाणित Google शिक्षक व Microsoft Excel तज्ज्ञ"),
      M("DOEACC (Govt. of India) certified computer professional", "DOEACC (भारत सरकार) प्रमाणित संगणक व्यावसायिक"),
    ],
    quote: M(
      "Quality education is defined by opportunity, not by location.",
      "दर्जेदार शिक्षण म्हणजे संधी — ठिकाण नाही."
    ),
    photo: "/images/founder-prashant.jpg",
  },
];

// OWNER-INPUT: verified testimonials + result figures will replace these placeholders.
export const TESTIMONIALS = {
  note: true, // shows the placeholder note band
  items: [
    { quote: "", name: M("Student Name", "विद्यार्थी नाव"), role: M("Program name", "कार्यक्रमाचं नाव"), placeholder: true },
    { quote: "", name: M("Student Name", "विद्यार्थी नाव"), role: M("Program name", "कार्यक्रमाचं नाव"), placeholder: true },
    { quote: "", name: M("Parent / Principal Name", "पालक / प्राचार्य नाव"), role: M("Relation", "नातं"), placeholder: true },
  ],
  video: { url: "", title: M("Student story video", "विद्यार्थी गोष्टीचा व्हिडिओ") },
};

export const COLLEGE_MODELS = [
  { icon: "Users", title: M("AI Literacy Workshops", "AI साक्षरता कार्यशाळा"), desc: M("Batch-wise student workshops on practical AI tools.", "वर्गानुसार व्यावहारिक AI साधनांच्या कार्यशाळा.") },
  { icon: "Presentation", title: M("Faculty Development Programs", "प्राध्यापक विकास कार्यक्रम"), desc: M("FDPs that make your staff AI-confident teachers.", "प्राध्यापकांना AI-आत्मविश्वासू शिक्षक बनवणारे FDP.") },
  { icon: "BriefcaseBusiness", title: M("Campus Placement Drives", "कॅम्पस प्लेसमेंट मेळावे"), desc: M("Placement sprints and drive coordination on campus.", "कॅम्पसवर प्लेसमेंट स्प्रिंट व मेळाव्याची संमती.") },
  { icon: "Lightbulb", title: M("AI Innovation Lab", "AI इनोव्हेशन लॅब"), desc: M("A dedicated lab setup for student AI projects.", "विद्यार्थी AI प्रकल्पांसाठी समर्पित प्रयोगशाळा.") },
  { icon: "Mic", title: M("Guest Lectures & Seminars", "अतिथी व्याख्यान व चर्चासत्र"), desc: M("Industry sessions that spark career clarity.", "करिअर-स्पष्टता आणणारी उद्योग-सत्रं.") },
  { icon: "FileSignature", title: M("MoU & Long-term Partnership", "MoU व दीर्घकालीन भागीदारी"), desc: M("Structured multi-year collaboration with reporting.", "अहवालासह रचनाबद्ध बहुवर्षिक सहकार्य.") },
];

export const COLLEGE_PROCESS = [
  { title: M("Consult", "चर्चा"), desc: M("Share your goals in a discovery call", "पहिल्या कॉलमध्ये उद्दिष्टे सांगा") },
  { title: M("Design", "रचना"), desc: M("A custom proposal & MoU for your campus", "तुमच्या कॅम्पससाठी विशेष प्रस्ताव व MoU") },
  { title: M("Deliver", "अंमलबजावणी"), desc: M("Workshops, FDPs & drives delivered on campus", "कॅम्पसवर कार्यशाळा, FDP व मेळावे") },
  { title: M("Track", "मागोठा"), desc: M("Outcome reports & the next roadmap", "निकाल-अहवाल व पुढची योजना") },
];

export const COLLEGE_BENEFITS = [
  { title: M("Placement records that climb", "वाढणारी प्लेसमेंट आकडेवारी"), desc: M("Interview-ready batches year on year.", "वर्षावरील वर्ष सज्ज बॅचेस.") },
  { title: M("NAAC/NIRF-friendly evidence", "NAAC/NIRF-अनुकूल पुरावे"), desc: M("Documented programs, participation & outcome reports.", "दस्तऐवजीकृत कार्यक्रम, सहभाग व निकाल-अहवाल.") },
  { title: M("Faculty who teach with AI", "AI वापरून शिकवणारे प्राध्यापक"), desc: M("FDP-certified staff across departments.", "सर्व विभागांत FDP-प्रमाणित कर्मचारी.") },
  { title: M("A differentiator for admissions", "प्रवेशासाठी वेगळेपण"), desc: M("AI-ready curriculum parents look for.", "पालक शोधत असलेली AI-सज्ज पाठ्यरचना.") },
];
