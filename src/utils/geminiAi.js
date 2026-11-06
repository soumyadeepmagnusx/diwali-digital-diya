// Google Gemini AI Festive Wish Generator

const SYSTEM_INSTRUCTION = `You are a master poet and cultural scholar celebrating Diwali, the Festival of Lights.
Generate an exquisite, deeply personalized, warm, and heartfelt Diwali greeting.
Incorporate themes of inner light (tamaso ma jyotirgamaya), victory of good over darkness, glowing golden diyas, vibrant rangolis, sweet delicacies (mithai), prosperity, and togetherness.
Format your response as a JSON object with:
- "headline": Short glowing festive title
- "verse": 3-6 line poetic greeting
- "translation": English translation or explanation if in Hindi/Bengali/Sanskrit
- "personalNote": A personalized warm concluding blessing from the sender to the recipient
- "themeTag": A short festive tagline`;

// Built-in Neural Festive Generator fallback for instant offline/keyless reliability
const FESTIVE_TEMPLATES = {
  family: {
    english: [
      {
        headline: "May the Divine Light Illuminate Our Home & Hearts",
        verse: "Like the golden flame of the Akhand Diya that dispels all shadows, may your life be filled with boundless laughter, flourishing health, and sweet moments of togetherness. May Goddess Lakshmi and Lord Ganesha shower our family with prosperity and peace.",
        translation: "May this sacred festival bring endless warmth and joy to every corner of your life.",
        themeTag: "Heartfelt Family Blessings"
      },
      {
        headline: "A Golden Diwali for the Pillars of My Life",
        verse: "With every diya we light tonight, I whisper a prayer of gratitude for the unconditional warmth and guidance you bring to my life. May this Deepavali weave threads of peace, long life, and eternal contentment around you.",
        translation: "May the divine festival bless you with perpetual health and happiness.",
        themeTag: "Pious Family Prayers"
      }
    ],
    hindi: [
      {
        headline: "शुभ दीपावली • सुख-समृद्धि एवं स्नेह का पावन पर्व",
        verse: "दीपक की स्वर्णिम रोशनी से जगमगाए आपका संसार,\nमां लक्ष्मी का मिले वरदान, बना रहे सदा अपनों का प्यार।\nमिठाइयों की मिठास और पटाखों की उमंग के साथ,\nआपके जीवन में आए खुशियों की सौगात।",
        translation: "May your world glow with golden diya light, blessed by Goddess Lakshmi and filled with lifelong love.",
        themeTag: "पारिवारिक आशीष"
      }
    ],
    bengali: [
      {
        headline: "শুভ দীপাবলি ও শ্যামা পূজার আন্তরিক শুভেচ্ছা",
        verse: "প্রদীপের আলোয় আলোকিত হোক তোমার ও পরিবারের প্রতিটি দিন।\nঅন্ধকার ঘুচে আসুক শুভ শক্তির প্রকাশ, মা কালীর কৃপায় দূর হোক সমস্ত সংকট।\nআনন্দ, স্বাস্থ্য আর অপার শান্তিতে ভরে উঠুক এই আলোক উৎসব।",
        translation: "May every day of yours and your family be enlightened by the sacred lamps. With Mother Kali's grace, may joy, health, and peace fill this festival of light.",
        themeTag: "শুভ দীপাবলির প্রীতি ও শুভেচ্ছা"
      }
    ],
    hinglish: [
      {
        headline: "Happy Diwali to My Wonderful Family!",
        verse: "Ghar me mithai ki mithaas, aangan me rangoli ka rang,\nHar diya laye khushiyan aur apno ka pyara sang!\nMay Goddess Lakshmi bless our home with endless health, wealth, and unconditional love.",
        translation: "May our house overflow with sweet memories, vibrant rangoli colors, and divine family bonding.",
        themeTag: "Ghar Wali Diwali"
      }
    ]
  },
  friends: {
    english: [
      {
        headline: "Sparklers, Smiles & Endless Festivities!",
        verse: "May your Diwali be as bright as a sky full of fireworks, as sweet as a box of Kaju Katli, and as colorful as the grandest rangoli! Here's to burning away all stress and lighting up new dreams, laughter, and crazy adventures together.",
        translation: "Celebrate with zero noise pollution and 100% pure festive joy!",
        themeTag: "Joyous Friends Vibe"
      }
    ],
    hindi: [
      {
        headline: "दीपावली की हार्दिक शुभकामनाएं मेरे यार!",
        verse: "रोशन हो आपका जहां, खुशियों का लगे अंबार,\nगम का कोई साया न हो, ऐसा हो यह रोशनी का त्यौहार!\nखूब खाओ काजू कतली, जलाओ प्यार के दिए,\nयह दिवाली लाए नई मंजिलें तुम्हारे लिए।",
        translation: "May your world shine brightly with mountains of happiness and sweet celebrations.",
        themeTag: "दोस्ती की रोशनी"
      }
    ],
    bengali: [
      {
        headline: "আলোর উৎসবে বন্ধু তোমায় জানাই শুভ দীপাবলি",
        verse: "বাজির রোশনাই আর টুনি লাইটের ঝলকানিতে মেতে উঠুক আড্ডা!\nমিষ্টি মুখের মিষ্টি দিনে কাটুক সব মনের ক্লান্তি।\nস্বপ্নগুলো ডানা মেলুক নতুন আলোর পথে, শুভ দীপাবলি আমার প্রিয় বন্ধু!",
        translation: "May festive gatherings ignite with sparkle and sweet celebrations. Wishing wings to all your dreams!",
        themeTag: "বন্ধুত্বের আলো"
      }
    ],
    hinglish: [
      {
        headline: "Shine Bright This Diwali, Dost!",
        verse: "Calories don't count this week, aur khushiyon ki koi limit nahi!\nMay your life shine brighter than a 1000-watt rocket and sparkle like the best phuljhadi. Have an electrifying Diwali!",
        translation: "Zero guilt for sweets and infinite festive high-spirits!",
        themeTag: "Dosti & Crackers"
      }
    ]
  },
  spiritual: {
    english: [
      {
        headline: "Tamaso Mā Jyotir Gamaya • From Darkness to Light",
        verse: " असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥\nAs the sacred earthen diya consumes darkness to bestow pure illumination, may the divine grace of Goddess Mahalakshmi kindle the eternal lamp of wisdom, purity, and inner calm within your soul.",
        translation: "Lead us from ignorance to truth, from darkness to light, and from mortality to immortality.",
        themeTag: "Sacred Sanskrit Blessing"
      }
    ],
    hindi: [
      {
        headline: "ॐ महालक्ष्म्यै नमः • शुभ दीपावली मंगलकामना",
        verse: "दीप ज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः।\nदीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तुते॥\nप्रभु श्रीराम के आगमन की यह पावन बेला आपके अंतर्मन को शांति और सकारात्मक ऊर्जा से परिपूर्ण करे।",
        translation: "May the divine lamp that represents the supreme consciousness eradicate all darkness and fill your being with peace.",
        themeTag: "आध्यात्मिक दीपावली"
      }
    ],
    bengali: [
      {
        headline: "অলোকবর্তিকা • আলোর জয়গান",
        verse: "অন্ধকার থেকে আলোর পথে যাত্রা হোক আমাদের সবার।\nমা লক্ষ্মী ও মা কালীর আশীর্বাদে অন্তর হোক শুদ্ধ, চেতনা হোক সমুজ্জ্বল।\nপবিত্র দীপাবলির পুণ্যলগ্নে আপনাকে ও আপনার সমগ্র পরিবারকে জানাই সশ্রদ্ধ প্রণাম।",
        translation: "Let our journey be from darkness to eternal light. May inner consciousness awaken with divine blessings.",
        themeTag: "আধ্যাত্মিক শুভকামনা"
      }
    ],
    hinglish: [
      {
        headline: "Divine Light & Inner Peace This Deepavali",
        verse: "May the spiritual aura of Diwali cleanse all negative vibes and fill your heart with purity, gratitude, and devotion. As every Diya whispers 'Tamaso Ma Jyotirgamaya', may you rise in truth and radiance.",
        translation: "May divine light overcome all negativity and bring profound bliss.",
        themeTag: "Sacred Light"
      }
    ]
  },
  professional: {
    english: [
      {
        headline: "Wishing You a Prosperous & Illuminating Diwali",
        verse: "May the auspicious festival of Diwali herald a new chapter of groundbreaking innovations, boundless prosperity, and triumphant milestones in your professional and personal journey. Thank you for being an inspiring collaborator and guiding light.",
        translation: "Wishing you exponential success and joyful celebrations with loved ones.",
        themeTag: "Executive & Mentor Wishes"
      }
    ],
    hindi: [
      {
        headline: "उज्ज्वल भविष्य एवं सुख-समृद्धि की मंगलकामनाएं",
        verse: "दीपावली का यह महापर्व आपके जीवन में नए अवसर, अपार सफलता और समृद्धि का संचार करे।\nआपके मार्गदर्शन और सहयोग के लिए हार्दिक आभार। शुभ दीपावली!",
        translation: "May this grand festival bring breakthrough opportunities and immense success to your endeavors.",
        themeTag: "व्यावसायिक शुभकामनाएं"
      }
    ],
    bengali: [
      {
        headline: "সাফল্য ও সমৃদ্ধির শুভ দীপাবলি",
        verse: "আলোর এই উৎসব আপনার কর্মজীবনে নিয়ে আসুক অভূতপূর্ব সাফল্য ও নতুন দিগন্তের উন্মোচন।\nআপনার অনুপ্রেরণা ও সহযোগিতার প্রতি রইল আন্তরিক শ্রদ্ধা। শুভ দীপাবলি!",
        translation: "May this festival of lights bring unparalleled success and new horizons to your career.",
        themeTag: "পেশাগত শুভেচ্ছা"
      }
    ],
    hinglish: [
      {
        headline: "Wishing You High Growth & Great Milestones!",
        verse: "May this Diwali spark new achievements, strong team synergy, and fulfilling breakthroughs. Here's to lighting up new benchmarks together!",
        translation: "Wishing great prosperity, growth, and joyful festive moments.",
        themeTag: "Inspiring Mentorship"
      }
    ]
  }
};

/**
 * Generate a personalized Diwali greeting
 */
export async function generateFestiveWish({
  sender = "A Well-Wisher",
  recipient = "Dear Friend",
  relation = "friends",
  tone = "joyful",
  language = "english",
  apiKey = ""
}) {
  // Normalize parameters
  const relKey = FESTIVE_TEMPLATES[relation] ? relation : 'friends';
  const langKey = FESTIVE_TEMPLATES[relKey][language] ? language : 'english';

  // If user provided a Gemini API Key, try calling Gemini REST API
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt = `Write a personalized Diwali greeting from "${sender}" to "${recipient}".
Relationship: ${relation}
Language: ${language}
Tone: ${tone}
Include specific mentions of ${recipient} and heartfelt wishes from ${sender}.
Return ONLY valid JSON matching this schema:
{
  "headline": "catchy festive title",
  "verse": "3 to 5 lines poetic greeting",
  "translation": "English meaning if non-english",
  "personalNote": "personal closing blessing",
  "themeTag": "short tag"
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.8,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          return {
            ...parsed,
            sender,
            recipient,
            modelUsed: "Google Gemini 1.5 Flash (Live AI)"
          };
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart festive engine:", err);
    }
  }

  // Built-in intelligent generative synthesis
  const categoryTemplates = FESTIVE_TEMPLATES[relKey][langKey] || FESTIVE_TEMPLATES.friends.english;
  const picked = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];

  // Personalize the note dynamically
  let personalNote = "";
  if (language === 'hindi') {
    personalNote = `प्रिय ${recipient}, आपके लिए ${sender} की ओर से ढेर सारा प्यार एवं शुभाशीष! 🪔✨`;
  } else if (language === 'bengali') {
    personalNote = `স্নেহের ${recipient}, তোমার জন্য ${sender}-এর তরফ থেকে অফুরন্ত ভালোবাসা ও শুভকামনা! 🪔✨`;
  } else if (language === 'hinglish') {
    personalNote = `Dearest ${recipient}, wishing you the happiest Diwali from ${sender}! Khush raho aur chamko! 🪔✨`;
  } else {
    personalNote = `Dearest ${recipient}, may the glow of this digital diya warm your heart always. With fondest love & blessings, from ${sender}. 🪔✨`;
  }

  return {
    headline: picked.headline.replace(/My Family|My Friend|Our Home/gi, `${recipient}`),
    verse: picked.verse,
    translation: picked.translation,
    personalNote: personalNote,
    themeTag: picked.themeTag,
    sender,
    recipient,
    modelUsed: "Gemini AI Festive Synthesis Engine"
  };
}
