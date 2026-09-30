// ─────────────────────────────────────────────────────────────
// PROGRAMS CATALOG — data-driven. To add a program: copy any object,
// give it a unique `slug`, fill the {en, mr} fields, save. No redesign needed.
// `audience` keys map to AUDIENCES below. `featured: true` = homepage spotlight.
// ─────────────────────────────────────────────────────────────
export const AUDIENCES = ["students", "graduates", "professionals", "teachers", "business", "parents", "colleges"];

const M = (en, mr) => ({ en, mr }); // bilingual shorthand

export const PROGRAMS = [
  {
    slug: "place-easily",
    icon: "Rocket",
    accent: "royal",
    featured: true,
    audience: ["students", "graduates"],
    name: M("PLACE EASILY", "प्लेस ईझिली"),
    tag: M("Career Transformation Program", "करिअर ट्रान्सफॉर्मेशन प्रोग्राम"),
    duration: M("90 Days", "९० दिवस"),
    format: M("Offline + Online", "ऑफलाइन + ऑनलाइन"),
    level: M("Career-focused", "करिअर-केंद्रित"),
    summary: M(
      "Our flagship 90-day journey from final-year confusion to placement-ready professional — diagnostic career mapping, AI skills, resume, personal branding, interviews and placement drives.",
      "आमचा फ्लॅगशिप ९०-दिवसांचा प्रवास — अंतिम वर्षाची गोंधळलेली स्थिती पासून प्लेसमेंट-सज्ज व्यावसायिकापर्यंत: करिअर नकाशा, AI कौशल्ये, रिझ्यूम, ब्रँडिंग, मुलाखती आणि प्लेसमेंट मेळावे."
    ),
    highlights: [
      M("Diagnostic career mapping with IKIGAI", "IKIGAI आधारित करिअर नकाशा"),
      M("ATS-ready resume + LinkedIn makeover", "ATS-सज्ज रिझ्यूम + LinkedIn सुधारणा"),
      M("AI tools for a smart job hunt", "हुशार नोकरी-शोधासाठी AI साधने"),
      M("Mock interviews & placement drives", "सराव मुलाखती व प्लेसमेंट मेळावे"),
    ],
    outcomes: [
      M("A placement-ready professional profile", "प्लेसमेंट-सज्ज व्यावसायिक प्रोफाइल"),
      M("Portfolio that proves your skills", "कौशल्ये सिद्ध करणारं पोर्टफोलिओ"),
      M("Interview confidence with practice rounds", "सरावाने येणारा मुलाखतीतला आत्मविश्वास"),
      M("Access to recruiter networks & drives", "भरती-मंडळ व मेळाव्यांशी संपर्क"),
    ],
    modules: [
      M("Career Diagnostic & IKIGAI Roadmap", "करिअर निदान व IKIGAI रस्ता"),
      M("Resume & ATS Optimization", "रिझ्यूम व ATS ऑप्टिमायझेशन"),
      M("LinkedIn & Personal Branding", "LinkedIn व वैयक्तिक ब्रँडिंग"),
      M("AI Tools for Smart Job Search", "हुशार नोकरी-शोधासाठी AI साधने"),
      M("Communication & Mock Interviews", "संवाद कौशल्य व सराव मुलाखती"),
      M("Placement Drives & Referral Access", "प्लेसमेंट मेळावे व रेफरल संधी"),
    ],
    careers: [M("Private-sector roles", "खासगी क्षेत्रातील पदं"), M("Internships & apprenticeships", "इंटर्नशिप व ॲप्रेंटिसशिप"), M("Sales, ops & analytics entry roles", "विक्री, संचालन व अॅनालिटिक्स सुरुवातीची पदं")],
  },
  {
    slug: "cm-placement-sprint",
    icon: "Zap",
    accent: "orange",
    featured: false,
    audience: ["students", "graduates"],
    name: M("21 Days CM Placement Sprint", "२१ दिवसांचा CM प्लेसमेंट स्प्रिंट"),
    tag: M("Intensive placement preparation", "तीव्र प्लेसमेंट तयारी"),
    duration: M("21 Days", "२१ दिवस"),
    format: M("Online + Weekend Offline", "ऑनलाइन + वीकएंड ऑफलाइन"),
    level: M("Intensive", "तीव्र"),
    summary: M(
      "A 21-day sprint that compresses placement prep into daily focused wins — aptitude, company patterns, a 48-hour ATS resume, group discussions, HR rounds and a final drive-ready checklist.",
      "२१ दिवसांचा स्प्रिंट — दररोजच्या केंद्रित सरावात प्लेसमेंट तयारी: ॲप्टिट्यूड, कंपनी पॅटर्न, ४८-तासांत ATS रिझ्यूम, ग्रुप डिस्कशन, HR फेऱ्या व अंतिम तयारीची यादी."
    ),
    highlights: [
      M("Daily aptitude & reasoning practice", "दैनिक ॲप्टिट्यूड व रिझनिंग सराव"),
      M("Company-specific test patterns", "कंपनी-आधारित चाचणी पॅटर्न"),
      M("48-hour ATS resume challenge", "४८-तासांत ATS रिझ्यूम आव्हान"),
      M("GD + HR mock rounds", "GD व HR सराव फेऱ्या"),
    ],
    outcomes: [
      M("Placement-test confidence", "प्लेसमेंट-चाचणीतला आत्मविश्वास"),
      M("Polished resume & application kit", "तयास्त रिझ्यूम व अर्ज-किट"),
      M("Interview rhythm and composure", "मुलाखतीची लय व शांतता"),
    ],
    modules: [
      M("Aptitude & Reasoning Sprint", "ॲप्टिट्यूड व रिझनिंग स्प्रिंट"),
      M("Company-Specific Patterns", "कंपनी-आधारित पॅटर्न"),
      M("ATS Resume in 48 Hours", "४८ तासांत ATS रिझ्यूम"),
      M("GD & HR Mock Rounds", "GD व HR सराव फेऱ्या"),
      M("AI-Assisted Job Hunt", "AI-मदतीचा नोकरी-शोध"),
      M("Final Drive-Ready Checklist", "अंतिम तयारीची यादी"),
    ],
    careers: [M("Campus & off-campus placements", "कॅम्पस व ऑफ-कॅम्पस प्लेसमेंट"), M("Entry-level corporate roles", "प्रारंभिक कॉर्पोरेट पदं")],
  },
  {
    slug: "ai-for-all",
    icon: "Sparkles",
    accent: "gold",
    featured: true,
    audience: ["students", "graduates", "professionals", "teachers", "business", "parents"],
    name: M("AI for All", "एआय फॉर ऑल"),
    tag: M("Marathi-first AI & Vibe Coding", "मराठीतून AI आणि व्हाइब कोडिंग"),
    duration: M("10 Modules", "१० मॉड्यूल"),
    format: M("Offline (Satara) + Online", "ऑफलाइन (सातारा) + ऑनलाइन"),
    level: M("Absolute Beginner", "अगदी सुरुवातीपासून"),
    summary: M(
      "Maharashtra's friendliest AI start — taught Marathi-first, from basic computer to AI tools, prompt engineering, data science basics and vibe coding. No IT background needed.",
      "महाराष्ट्रातील सर्वात सोपी AI सुरुवात — मराठीतून: मूलभूत संगणक ते AI साधने, प्रॉम्प्ट इंजिनिअरिंग, डेटा सायन्स बेसिक्स आणि व्हाइब कोडिंग. IT पार्श्वभूमीची गरज नाही."
    ),
    highlights: [
      M("Taught in Marathi, zero coding fear", "मराठीतून शिकवण, कोडिंगची भीती नाही"),
      M("10 practical modules, step by step", "१० व्यावहारिक मॉड्यूल, टप्प्याटप्प्याने"),
      M("ChatGPT, Gemini & 50+ tools hands-on", "ChatGPT, Gemini व ५०+ साधने हाताळून"),
      M("Portfolio: real posters, sheets & plans", "पोर्टफोलिओ: खरे पोस्टर, शीट्स व योजना"),
    ],
    outcomes: [
      M("Everyday AI confidence", "रोजच्या जीवनात AI चा आत्मविश्वास"),
      M("A personal AI toolkit for study & work", "अभ्यास व कामासाठी वैयक्तिक AI किट"),
      M("Clear next-step career roadmap", "पुढच्या पायऱ्याचा स्पष्ट करिअर रस्ता"),
    ],
    modules: [
      M("Basic Computer", "संगणक मूलभूत ज्ञान"),
      M("MS Office & Power BI", "MS Office व Power BI"),
      M("AI Tools — ChatGPT, Gemini & more", "AI साधने — ChatGPT, Gemini व अजून"),
      M("Prompt Engineering", "प्रॉम्प्ट इंजिनिअरिंग"),
      M("Data Science Basics", "डेटा सायन्स बेसिक्स"),
      M("LinkedIn Optimization", "LinkedIn ऑप्टिमायझेशन"),
      M("Resume Optimization", "रिझ्यूम ऑप्टिमायझेशन"),
      M("Smart Job Automation", "हुशार नोकरी-शोध"),
      M("Freelancing Basics", "फ्रीलान्सिंग बेसिक्स"),
      M("IKIGAI Roadmap", "IKIGAI करिअर रस्ता"),
    ],
    careers: [M("AI-ready any career", "कोणत्याही करिअरसाठी AI-सज्जता"), M("Freelance income start", "फ्रीलान्स कमाईची सुरुवात")],
  },
  {
    slug: "ai-for-vyapari",
    icon: "Store",
    accent: "orange",
    featured: false,
    audience: ["business"],
    name: M("AI for Vyapari", "एआय फॉर व्यापारी"),
    tag: M("AI for Small Entrepreneurs", "लघु उद्योजकांसाठी AI"),
    duration: M("4 Weeks", "४ आठवडे"),
    format: M("Offline + Online Support", "ऑफलाइन + ऑनलाइन मदत"),
    level: M("Beginner", "सुरुवातीचं"),
    summary: M(
      "Run your shop, service or small firm with AI — posters and product photos, WhatsApp marketing, ads, automated customer replies and daily business tasks, all learned hands-on in Marathi.",
      "तुमचं दुकान, सेवा किंवा लघुउद्योग AI नं चालवा — पोस्टर व प्रोडक्ट फोटो, WhatsApp मार्केटिंग, जाहिराती, ग्राहक-उत्तरांची आपोआप यंत्रणा आणि रोजची कामं — सर्व मराठीत, हाताळून."
    ),
    highlights: [
      M("AI posters & product photography", "AI पोस्टर व प्रोडक्ट फोटो"),
      M("WhatsApp & social media marketing", "WhatsApp व सोशल मीडिया मार्केटिंग"),
      M("Automated customer replies", "ग्राहक-उत्तरांची आपोआप यंत्रणा"),
      M("Ads, offers & festival campaigns", "जाहिराती, ऑफर व सण-मोहीम"),
    ],
    outcomes: [
      M("Professional marketing without agency fees", "एजन्ट-फीशिवाय व्यावसायिक मार्केटिंग"),
      M("Hours saved every week", "दर आठवड्याला वाचतील तास"),
      M("More walk-ins, more repeat customers", "अधिक ग्राहक, अधिक परतावे"),
    ],
    modules: [
      M("AI Posters & Product Shoots", "AI पोस्टर व प्रोडक्ट फोटो"),
      M("WhatsApp & Social Content", "WhatsApp व सोशल कंटेंट"),
      M("Ads That Convert", "ग्राहक आणणाऱ्या जाहिराती"),
      M("Automated Customer Replies", "आपोआप ग्राहक-उत्तरे"),
      M("Billing, Stock & Daily Ops", "बिलिंग, स्टॉक व रोजची कामं"),
      M("Competitor Watch with AI", "AI नं स्पर्धक निरीक्षण"),
    ],
    careers: [M("Grow your own business", "स्वतःचा व्यवसाय वाढवा"), M("Offer marketing services locally", "स्थानिक मार्केटिंग सेवा द्या")],
  },
  {
    slug: "ai-for-teachers",
    icon: "GraduationCap",
    accent: "royal",
    featured: false,
    audience: ["teachers"],
    name: M("AI for Teachers", "एआय फॉर टीचर्स"),
    tag: M("Classroom superpowers, in Marathi", "वर्गासाठी AI पराक्रम, मराठीत"),
    duration: M("4 Weeks", "४ आठवडे"),
    format: M("Offline + Online", "ऑफलाइन + ऑनलाइन"),
    level: M("Beginner", "सुरुवातीचं"),
    summary: M(
      "Lesson plans, worksheets, assessments, presentations and parent communication — prepared in minutes with AI, so you can give your hours back to students.",
      "पाठ-योजना, वर्कशीट, मूल्यमापन, सादरीकरण व पालक-संवाद — AI च्या मदतीने मिनिटांत, म्हणजे तुमची तास विद्यार्थ्यांसाठी वाचतील."
    ),
    highlights: [
      M("Lesson planning with AI in minutes", "मिनिटांत AI पाठ-योजना"),
      M("Worksheets & assessments on demand", "मागितल्यावर तयार होणारी वर्कशीट-मूल्यमापन"),
      M("Presentations & visual aids", "सादरीकरण व दृक् साधने"),
      M("Responsible AI for classrooms", "वर्गासाठी जबाबदार AI वापर"),
    ],
    outcomes: [
      M("Weekly hours reclaimed", "दर आठवड्याला वाचतील तास"),
      M("Better-engaged classrooms", "अधिक सहभागी वर्गं"),
      M("Digital-first teaching portfolio", "डिजिटल-प्रथम शिकवण पोर्टफोलिओ"),
    ],
    modules: [
      M("Lesson Planning with AI", "AI नं पाठ-योजना"),
      M("Worksheets & Assessments in Minutes", "मिनिटांत वर्कशीट व मूल्यमापन"),
      M("Presentations & Visual Aids", "सादरीकरण व दृक् साधने"),
      M("Personalized Learning Support", "वैयक्तिक शिकवण मदत"),
      M("Admin & Parent Communication", "शासकीय काम व पालक-संवाद"),
      M("Responsible AI in Classroom", "वर्गात जबाबदार AI"),
    ],
    careers: [M("Certified digital educator", "प्रमाणित डिजिटल शिक्षक"), M("Lead AI adoption in your school", "तुमच्या शाळेत AI-स्वीकाराचं नेतृत्व")],
  },
  {
    slug: "ai-for-students",
    icon: "BookOpen",
    accent: "royal",
    featured: false,
    audience: ["students", "parents"],
    name: M("AI for Students", "एआय फॉर स्टुडंट्स"),
    tag: M("Study smarter, not harder", "जास्त मेहनत नाही, हुशार अभ्यास"),
    duration: M("3 Weeks", "३ आठवडे"),
    format: M("Offline + Online", "ऑफलाइन + ऑनलाइन"),
    level: M("School & College Friendly", "शाळा-कॉलेज अनुरूप"),
    summary: M(
      "Notes, revision, projects and presentations — done with AI in Marathi, plus early exposure to coding, career planning and responsible AI use.",
      "टिपा, उजळणी, प्रकल्प व सादरीकरण — मराठीत AI नं सोपं, आणि सोबत कोडिंगची, करिअर-नियोजनाची व जबाबदार AI ची सुरुवात."
    ),
    highlights: [
      M("AI study systems that stick", "व्यवस्थित बसणारी AI अभ्यास पद्धत"),
      M("Projects & presentations that impress", "प्रभावी प्रकल्प व सादरीकरण"),
      M("Gentle intro to vibe coding", "व्हाइब कोडिंगची सोपी ओळख"),
      M("Exam & career planning early", "परीक्षा व करिअर नियोजन लवकर"),
    ],
    outcomes: [
      M("Independent, confident learner", "स्वावलंबी, आत्मविश्वासू विद्यार्थी"),
      M("Study time cut, understanding up", "वेळ कमी, समज जास्त"),
      M("A head start on future skills", "भविष्यातील कौशल्यांना तोंड देण्याची सुरुवात"),
    ],
    modules: [
      M("AI Study Systems", "AI अभ्यास पद्धती"),
      M("Notes, Summaries & Revision", "टिपा, सारांश व उजळणी"),
      M("Projects & Presentations", "प्रकल्प व सादरीकरण"),
      M("Intro to Coding & Vibe Coding", "कोडिंग व व्हाइब कोडिंग ओळख"),
      M("Exam & Career Planning", "परीक्षा व करिअर नियोजन"),
      M("Safe & Responsible AI Use", "सुरक्षित व जबाबदार AI वापर"),
    ],
    careers: [M("Strong base for any stream", "कोणत्याही शाखेसाठी मजबूत पाया")],
  },
  {
    slug: "ai-career-growth-strategy",
    icon: "TrendingUp",
    accent: "gold",
    featured: true,
    audience: ["professionals", "graduates"],
    name: M("AI for Working Professionals", "एआय फॉर वर्किंग प्रोफेशनल्स"),
    tag: M("AI Career Growth Strategy", "AI करिअर ग्रोथ स्ट्रॅटेजी"),
    duration: M("6 Weeks", "६ आठवडे"),
    format: M("Online Live + 1-on-1", "ऑनलाइन लाइव्ह + १-ऑन-१"),
    level: M("Working Professional", "नोकरदारांसाठी"),
    summary: M(
      "Your personal AI career growth strategy — productivity stack, workflow automation, visibility at work and a 90-day plan, with an optional free 1-on-1 strategy call to start.",
      "तुमची वैयक्तिक AI करिअर-वाढ रणनीती — उत्पादकता साधने, कामाची आपोआप यंत्रणा, कार्यालयात दिसणं आणि ९०-दिवसांचा बेत; सुरुवातीला मोफत १-ऑन-१ स्ट्रॅटेजी कॉलसोबत."
    ),
    highlights: [
      M("AI productivity stack for your role", "तुमच्या पदासाठी AI उत्पादकता किट"),
      M("Workflow automation without IT team", "IT टीमशिवाय कामाची यंत्रणा"),
      M("Visibility: reports, decks & brand", "दिसणं: अहवाल, सादरीकरण व ब्रँड"),
      M("Personal 90-day growth plan", "वैयक्तिक ९०-दिवसांचा बेत"),
    ],
    outcomes: [
      M("Hours saved every week", "दर आठवड्याला वाचतील तास"),
      M("Promotion-ready work profile", "बढती-सज्ज कामाचं प्रोफाइल"),
      M("A salary-growing AI skillset", "उत्पन्न वाढवणारी AI कौशल्ये"),
    ],
    modules: [
      M("AI Productivity Stack", "AI उत्पादकता स्टॅक"),
      M("Workflow Automation", "कामाची आपोआप यंत्रणा"),
      M("Prompt Engineering at Work", "कामातलं प्रॉम्प्ट इंजिनिअरिंग"),
      M("Data & Reporting with AI", "AI नं डेटा व अहवाल"),
      M("Personal Brand & Visibility", "वैयक्तिक ब्रँड व दिसणं"),
      M("Your 90-Day Growth Strategy", "तुमचा ९०-दिवसांचा बेत"),
    ],
    careers: [M("Faster promotions & appraisals", "लवकर बढती व ॲप्रेझल"), M("AI-ready career switches", "AI-सज्ज करिअर बदल")],
  },
  {
    slug: "ai-software-generation",
    icon: "Bot",
    accent: "orange",
    featured: false,
    audience: ["professionals", "graduates", "business"],
    name: M("AI Software Generation", "एआय सॉफ्टवेअर जनरेशन"),
    tag: M("Agents, Chatbots, GPTs & Automations", "एजंट, चॅटबॉट, GPT व ऑटोमेशन"),
    duration: M("8 Weeks", "८ आठवडे"),
    format: M("Online Live + Labs", "ऑनलाइन लाइव्ह + लॅब"),
    level: M("Advanced Beginner+", "पुढची पातळी"),
    summary: M(
      "Build real AI products without heavy coding — custom GPTs, business chatbots, AI agents and no-code automations for yourself or paying clients.",
      "जड कोडिंगशिवाय खरी AI उत्पादनं बनवा — कस्टम GPT, व्यवसाय-चॅटबॉट, AI एजंट व नो-कोड ऑटोमेशन — स्वतःसाठी किंवा ग्राहकांसाठी."
    ),
    highlights: [
      M("Custom GPT & chatbot building", "कस्टम GPT व चॅटबॉट बनवणं"),
      M("AI agents for real workflows", "खऱ्या कामांसाठी AI एजंट"),
      M("No-code automation workflows", "नो-कोड ऑटोमेशन"),
      M("Ship & monetize your first AI product", "पहिलं AI उत्पादन विका व कमावा"),
    ],
    outcomes: [
      M("A working AI product portfolio", "चालू AI उत्पादनांचं पोर्टफोलिओ"),
      M("Client-ready service offerings", "ग्राहक-सज्ज सेवा"),
      M("In-demand AI builder skills", "मागणीची AI-बिल्डर कौशल्ये"),
    ],
    modules: [
      M("GPT & Chatbot Building", "GPT व चॅटबॉट बनवणं"),
      M("AI Agents 101", "AI एजंट ओळख"),
      M("No-Code Automation Workflows", "नो-कोड ऑटोमेशन"),
      M("Vibe Coding Fundamentals", "व्हाइब कोडिंग तत्त्वे"),
      M("APIs & Integrations Basics", "API व इंटिग्रेशन बेसिक्स"),
      M("Ship Your First AI Product", "पहिलं AI उत्पादन बाजारात"),
    ],
    careers: [M("AI automation consultant", "AI ऑटोमेशन सल्लागार"), M("Freelance AI builder", "फ्रीलान्स AI बिल्डर"), M("In-house AI champion", "संस्थेतला AI पथप्रदर्शक")],
  },
];

export const getProgram = (slug) => PROGRAMS.find((p) => p.slug === slug);
export const featuredPrograms = PROGRAMS.filter((p) => p.featured);
export const programsForAudience = (key) =>
  key === "all" ? PROGRAMS : PROGRAMS.filter((p) => p.audience.includes(key));
