import type { AdverbLesson, SentencePart } from '@/types';

export const adverbInteractiveSentence: SentencePart[] = [
  {
    text: 'The',
    role: 'Determiner (Definite Article)',
    partOfSpeech: 'determiner',
    explanation: '"The" specifies the definite subject noun phrase.',
    color: '#3b82f6',
  },
  {
    text: 'researchers',
    role: 'Subject Noun',
    partOfSpeech: 'noun',
    explanation: '"Researchers" is the plural agent noun performing the action.',
    color: '#8b5cf6',
  },
  {
    text: 'carefully',
    role: 'Adverb of Manner',
    partOfSpeech: 'adverb',
    explanation: '"Carefully" modifies the verb "analyzed", describing HOW the action was conducted (with method and meticulous precision).',
    color: '#06b6d4',
  },
  {
    text: 'analyzed',
    role: 'Main Verb (Past Simple)',
    partOfSpeech: 'verb',
    explanation: '"Analyzed" is the dynamic transitive action verb modified by the adverb.',
    color: '#f59e0b',
  },
  {
    text: 'the',
    role: 'Determiner',
    partOfSpeech: 'determiner',
    explanation: 'Definite article introducing the object noun phrase.',
    color: '#3b82f6',
  },
  {
    text: 'empirical',
    role: 'Classifying Adjective',
    partOfSpeech: 'adjective',
    explanation: '"Empirical" describes the nature of the data (evidence-based).',
    color: '#10b981',
  },
  {
    text: 'data',
    role: 'Direct Object Noun',
    partOfSpeech: 'noun',
    explanation: '"Data" is the head noun receiving the action.',
    color: '#8b5cf6',
  },
  {
    text: 'yesterday.',
    role: 'Adverb of Time (Adjunct)',
    partOfSpeech: 'adverb',
    explanation: '"Yesterday" functions as an adverb of time situated in terminal clause position, specifying WHEN the analysis occurred.',
    color: '#ec4899',
  },
];

export const adverbLesson: AdverbLesson = {
  id: 'adverb',
  name: 'Adverb Mastery',
  banglaName: 'ক্রিয়া-বিশেষণ ও ভাব-বিশেষণ (Adverb)',
  subtitle: 'From Zero to IELTS Advanced Academic Modifier Discourse',
  introduction:
    'An adverb is a versatile word that modifies or provides deeper contextual information about a verb, an adjective, another adverb, or an entire sentence. Adverbs answer fundamental questions such as How? (manner), When? (time), Where? (place), How often? (frequency), and To what extent? (degree).',
  introductionBangla:
    'Adverb (ক্রিয়া-বিশেষণ) হলো এমন একটি পদ যা Verb (ক্রিয়া), Adjective (বিশেষণ), অন্য কোনো Adverb কিংবা সম্পূর্ণ একটি Sentence-এর অর্থকে বিশেষিত (modify) করে। এটি সাধারণত কাজ কীভাবে (How), কখন (When), কোথায় (Where), কতবার (How often) বা কী পরিমাণে (Degree) সম্পন্ন হয় তা ব্যাখ্যা করে।',
  interactiveSentence: adverbInteractiveSentence,
  sections: [
    // ─── 1. Zero: What is an Adverb? ──────────────────────────────────────
    {
      id: 'what-is-an-adverb',
      title: '1. What is an Adverb? (Zero-to-Beginner)',
      banglaTitle: 'Adverb কী এবং এটি কীভাবে কাজ করে?',
      level: 'Zero / Beginner',
      description:
        'An adverb adds extra information to verbs, adjectives, or other adverbs. In simple sentences, adverbs often describe how an action is performed.',
      banglaExplanation:
        'Adverb প্রধানত কোনো কাজের ধরন বা পরিস্থিতি বর্ণনা করে। যেমন: She runs quickly (সে দ্রুত দৌড়ায়) — এখানে "quickly" শব্দটি "runs" verb-কে বর্ণনা করছে।',
      rules: [
        'Adverb modifying a verb: She speaks slowly. (How does she speak? Slowly).',
        'Adverb modifying an adjective: He is very smart. ("Very" intensifies "smart").',
        'Adverb modifying another adverb: She walked too quickly. ("Too" modifies "quickly").',
        'Adverb modifying an entire sentence: Fortunately, they survived.',
      ],
      examples: [
        { text: 'She runs quickly.', breakdown: 'runs = verb; quickly = adverb of manner' },
        { text: 'He speaks politely.', breakdown: 'speaks = verb; politely = adverb of manner' },
        { text: 'They arrived yesterday.', breakdown: 'arrived = verb; yesterday = adverb of time' },
      ],
      commonMistakes: [
        { wrong: 'She runs quick.', correct: 'She runs quickly.', reason: '"Quick" is an adjective; use adverb "quickly" to modify the action verb "runs".' },
      ],
      ieltsTips: [
        'Using precise adverbs in IELTS Speaking immediately signals grammatical accuracy and natural lexical flexibility to the examiner.',
      ],
      miniCheck: {
        question: 'Identify the adverb in: "The student listened attentively during the lecture."',
        options: ['student', 'listened', 'attentively', 'lecture'],
        correctIndex: 2,
        explanation: '"Attentively" modifies the verb "listened", answering how the student listened.',
        simpleExplanation: '"Attentively" tells us how the student listened.',
      },
    },

    // ─── 2. Adverb vs Adjective ───────────────────────────────────────────
    {
      id: 'adverb-vs-adjective',
      title: '2. Adverb vs. Adjective (Core Distinction)',
      banglaTitle: 'Adjective এবং Adverb-এর মধ্যকার পার্থক্য',
      level: 'Beginner',
      description:
        'Adjectives describe nouns and pronouns. Adverbs describe verbs, adjectives, other adverbs, or clauses.',
      banglaExplanation:
        'Adjective সর্বদা Noun বা Pronoun-এর দোষ/গুণ প্রকাশ করে। পক্ষান্তরে Adverb কোনো Verb, Adjective বা অন্য Adverb-কে modify করে।',
      rules: [
        'Adjective + Noun: "She is a careful driver." ("careful" describes noun "driver").',
        'Verb + Adverb: "She drives carefully." ("carefully" describes verb "drives").',
        'Linking Verbs take Adjectives, NOT Adverbs: "The food tastes delicious" (NOT *deliciously).',
      ],
      examples: [
        { text: 'He is a quick learner. / He learns quickly.', breakdown: 'quick = adjective; quickly = adverb' },
        { text: 'They gave a beautiful performance. / They performed beautifully.', breakdown: 'beautiful = adjective; beautifully = adverb' },
        { text: 'The idea seems practical.', breakdown: 'seems = linking verb; practical = predicate adjective' },
      ],
      commonMistakes: [
        { wrong: 'She speaks English very good.', correct: 'She speaks English very well.', reason: '"Good" is an adjective. Use the adverb "well" to modify the verb "speaks".' },
      ],
      ieltsTips: [
        'Never use an adverb after perception linking verbs (look, sound, taste, smell, feel, seem, appear) unless describing a deliberate physical action.',
      ],
      miniCheck: {
        question: 'Choose the grammatically correct sentence:',
        options: [
          'The candidate answered the questions intelligent.',
          'The candidate answered the questions intelligently.',
          'The candidate is an intelligently person.',
          'The candidate speaks very good.',
        ],
        correctIndex: 1,
        explanation: '"Intelligently" is an adverb modifying the action verb "answered".',
        simpleExplanation: 'Use the adverb "intelligently" to describe how the candidate answered.',
      },
    },

    // ─── 3. Common Adverb Formation & Spelling ────────────────────────────
    {
      id: 'adverb-formation-spelling',
      title: '3. Adverb Formation & Spelling Rules',
      banglaTitle: 'Adverb গঠন এবং বানানের নিয়মাবলি',
      level: 'Easy',
      description:
        'Most adverbs of manner are formed by adding "-ly" to adjectives, with specific spelling transformations for "-y", "-le", "-ic", and "-ful".',
      banglaExplanation:
        'অধিকাংশ Adverb তৈরি হয় Adjective-এর শেষে "-ly" যুক্ত করে। তবে consonant + y থাকলে "-ily", -le থাকলে "-ly", এবং -ic থাকলে "-ically" হয়।',
      rules: [
        'General: adjective + -ly (quick → quickly, careful → carefully, slow → slowly).',
        'Consonant + -y: change "y" to "i" + -ly (happy → happily, easy → easily, heavy → heavily).',
        'Ending in -le: replace "-e" with "-y" (simple → simply, possible → possibly, subtle → subtly).',
        'Ending in -ic: add "-ally" (dramatic → dramatically, basic → basically, scientific → scientifically; Exception: public → publicly).',
        'Ending in -ll: add "-y" (full → fully, dull → dully).',
        'True → Truly (drops "e").',
        'Flat Adverbs (No -ly): fast, hard, late, early, straight, well.',
      ],
      examples: [
        { text: 'The economic trends shifted dramatically.', breakdown: 'dramatic + -ally = dramatically' },
        { text: 'He solved the complex equation easily.', breakdown: 'easy → easily (y changed to i)' },
        { text: 'The train arrived late.', breakdown: 'late is a flat adverb modifying arrived' },
      ],
      commonMistakes: [
        { wrong: 'He runs fastly.', correct: 'He runs fast.', reason: '"Fast" is both an adjective and an adverb. "Fastly" does not exist in standard English.' },
      ],
      ieltsTips: [
        'In IELTS Task 1, precise adverbial spelling (e.g. "dramatically", "substantially", "steadily") is critical for Lexical Resource scoring.',
      ],
      miniCheck: {
        question: 'What is the correct adverb form of "dramatic"?',
        options: ['dramaticly', 'dramatically', 'dramaticall', 'dramatize'],
        correctIndex: 1,
        explanation: 'Adjectives ending in "-ic" add "-ally" to form the adverb (dramatically).',
        simpleExplanation: 'Add "-ally" to "-ic" words: dramatic → dramatically.',
      },
    },

    // ─── 4. Adverbs of Manner ─────────────────────────────────────────────
    {
      id: 'adverbs-of-manner',
      title: '4. Adverbs of Manner (How an Action Happens)',
      banglaTitle: 'Adverbs of Manner (কাজের ধরন)',
      level: 'Easy / Medium',
      description:
        'Adverbs of manner describe the way or method in which an action is performed. They typically follow the main verb or the direct object.',
      banglaExplanation:
        'Adverbs of manner কাজের পদ্ধতি বা ধরন প্রকাশ করে। যেমন: accurately (সঠিকভাবে), efficiently (দক্ষতার সাথে), meticulously (খুঁটিয়ে)।',
      rules: [
        'Position after intransitive verb: "She walks slowly."',
        'Position after direct object: "She completed the assignment carefully." (NEVER between verb and object: *She completed carefully the assignment).',
        'Academic adverbs of manner: rigorously, systematically, comprehensively, methodically.',
      ],
      examples: [
        { text: 'The team analyzed the empirical dataset meticulously.', breakdown: 'meticulously follows object "empirical dataset"' },
        { text: 'The engine operates quietly and efficiently.', breakdown: 'quietly & efficiently modify intransitive verb "operates"' },
        { text: 'Governments must allocate public subsidies equitably.', breakdown: 'equitably modifies transitive action allocate' },
      ],
      commonMistakes: [
        { wrong: 'He solved quickly the problem.', correct: 'He solved the problem quickly. / He quickly solved the problem.', reason: 'Do not separate a transitive verb from its direct object with an adverb.' },
      ],
      ieltsTips: [
        'Use adverbs of manner like "methodically", "rigorously", and "comprehensively" in IELTS Task 2 academic methodology descriptions.',
      ],
      miniCheck: {
        question: 'Select the sentence with natural adverb placement:',
        options: [
          'The scientist recorded accurately the temperature readings.',
          'The scientist recorded the temperature readings accurately.',
          'The scientist accurate recorded the temperature readings.',
          'The scientist recorded accurately.',
        ],
        correctIndex: 1,
        explanation: 'The adverb of manner "accurately" must follow the direct object "the temperature readings".',
        simpleExplanation: 'Put "accurately" after the object: "recorded the temperature readings accurately".',
      },
    },

    // ─── 5. Adverbs of Time & Place ───────────────────────────────────────
    {
      id: 'adverbs-of-time-and-place',
      title: '5. Adverbs of Time & Place (When & Where)',
      banglaTitle: 'সময় ও স্থান নির্দেশক Adverb (Time & Place)',
      level: 'Medium',
      description:
        'Adverbs of time tell us WHEN or for how long an action occurred. Adverbs of place tell us WHERE an action took place.',
      banglaExplanation:
        'Time adverbs (now, recently, previously, currently) সময় নির্দেশ করে। Place adverbs (here, everywhere, abroad, nearby) স্থান নির্দেশ করে।',
      rules: [
        'Time adverbs usually go at the end or beginning of a clause: "Yesterday, we met." / "We met yesterday."',
        'Place adverbs usually follow the main verb or object: "She studied abroad." / "They looked everywhere."',
        'Sequence rule when multiple adverbs appear together: Manner → Place → Time (M-P-T).',
      ],
      examples: [
        { text: 'She worked diligently (manner) in the library (place) yesterday (time).', breakdown: 'Follows standard M-P-T ordering' },
        { text: 'Currently, international organizations are addressing inflation.', breakdown: '"Currently" in front position for thematic emphasis' },
        { text: 'Renewable energy infrastructure is expanding rapidly worldwide.', breakdown: 'rapidly (manner) + worldwide (place)' },
      ],
      commonMistakes: [
        { wrong: 'She went yesterday to London.', correct: 'She went to London yesterday.', reason: 'Place ("to London") generally precedes time ("yesterday").' },
      ],
      ieltsTips: [
        'Fronting time adverbs ("Recently,", "Historically,", "Currently,") creates smooth academic transitions in IELTS Task 2 introductions.',
      ],
      miniCheck: {
        question: 'Which sentence follows the correct Manner-Place-Time order?',
        options: [
          'He spoke in London eloquently yesterday.',
          'He spoke yesterday eloquently in London.',
          'He spoke eloquently in London yesterday.',
          'He spoke yesterday in London eloquently.',
        ],
        correctIndex: 2,
        explanation: 'Standard order is Manner (eloquently) → Place (in London) → Time (yesterday).',
        simpleExplanation: 'Follow the M-P-T rule: Manner → Place → Time.',
      },
    },

    // ─── 6. Adverbs of Frequency & Positioning ────────────────────────────
    {
      id: 'adverbs-of-frequency-position',
      title: '6. Adverbs of Frequency & Core Position Rules',
      banglaTitle: 'পুনরাবৃত্তি নির্দেশক Adverb এবং অবস্থান নিয়মাবলী',
      level: 'Medium / Core',
      description:
        'Adverbs of frequency state how often an action occurs (always, usually, often, frequently, sometimes, occasionally, rarely, seldom, hardly ever, never).',
      banglaExplanation:
        'Frequency adverbs কাজের পুনরাবৃত্তি বোঝায়। এদের অবস্থান নির্ধারিত হয়: Main verb-এর পূর্বে, Linking verb "be"-এর পরে এবং Auxiliary verb-এর মাঝে।',
      rules: [
        'Before main verbs: "She usually works from home."',
        'After the verb "be": "He is always punctual."',
        'Between auxiliary/modal and main verb: "They have never witnessed such growth." / "You should always verify sources."',
        'Negative frequency adverbs (rarely, seldom, never) at clause start trigger subject-auxiliary inversion: "Rarely have I seen such dedication."',
      ],
      examples: [
        { text: 'Academic journals frequently publish groundbreaking research.', breakdown: 'frequently placed before main verb publish' },
        { text: 'Climate anomalies are consistently observed in polar regions.', breakdown: 'consistently placed after auxiliary are' },
        { text: 'Rarely do economists agree on fiscal forecasting.', breakdown: 'Inverted structure: Rarely + auxiliary "do" + subject + verb' },
      ],
      commonMistakes: [
        { wrong: 'She always is late.', correct: 'She is always late.', reason: 'Adverbs of frequency follow the verb "to be".' },
        { wrong: 'He works always hard.', correct: 'He always works hard.', reason: 'Place frequency adverb before the main verb "works".' },
      ],
      ieltsTips: [
        'Using inverted negative frequency structures ("Seldom do governments...", "Never has the demand been higher...") demonstrates Band 8+ grammatical complexity.',
      ],
      miniCheck: {
        question: 'Choose the sentence with correct adverb position:',
        options: [
          'They have visited never that country.',
          'They never have visited that country.',
          'They have never visited that country.',
          'Never they have visited that country.',
        ],
        correctIndex: 2,
        explanation: 'In compound tenses (have + V3), frequency adverbs go between the auxiliary "have" and main verb "visited".',
        simpleExplanation: 'Put "never" between "have" and "visited": "have never visited".',
      },
    },

    // ─── 7. Adverbs of Degree & Intensifiers ──────────────────────────────
    {
      id: 'adverbs-of-degree-intensifiers',
      title: '7. Adverbs of Degree & Academic Intensifiers',
      banglaTitle: 'মাত্রাবাচক Adverb এবং তীব্রতা নির্দেশক শব্দ',
      level: 'Medium / Advanced',
      description:
        'Adverbs of degree express the intensity, scale, or extent of an adjective, verb, or other adverb (very, extremely, highly, remarkably, significantly, considerably, slightly, barely).',
      banglaExplanation:
        'Degree adverbs কোনো বৈশিষ্ট্য বা কাজের মাত্রা প্রকাশ করে। যেমন: highly effective (অত্যন্ত কার্যকর), significantly higher (উল্লেখযোগ্যভাবে বেশি)।',
      rules: [
        'Gradable adjectives take scalar intensifiers: very difficult, extremely beneficial, highly productive, slightly lower.',
        'Non-gradable / extreme adjectives take absolute modifiers: absolutely essential, completely impossible, utterly devastated.',
        'Never use "very" with extreme adjectives: *very essential (wrong) → absolutely essential (correct).',
      ],
      examples: [
        { text: 'The new policy is highly beneficial for low-income households.', breakdown: 'highly modifies gradable adjective beneficial' },
        { text: 'The mathematical theorem is completely impossible to disprove.', breakdown: 'completely modifies non-gradable impossible' },
        { text: 'Tuition fees rose significantly between 2015 and 2025.', breakdown: 'significantly modifies verb rose' },
      ],
      commonMistakes: [
        { wrong: 'This is a very unique discovery.', correct: 'This is a truly unique discovery. / This is a unique discovery.', reason: '"Unique" is non-gradable and cannot take "very".' },
      ],
      ieltsTips: [
        'Replace basic intensifiers ("very", "really") with academic modifiers ("exceptionally", "considerably", "profoundly", "substantially").',
      ],
      miniCheck: {
        question: 'Which sentence correctly modifies an extreme adjective?',
        options: [
          'The research proposal was very essential.',
          'The research proposal was absolutely essential.',
          'The research proposal was fairly essential.',
          'The research proposal was slightly essential.',
        ],
        correctIndex: 1,
        explanation: '"Essential" is an extreme adjective and must be intensified by absolute adverbs like "absolutely".',
        simpleExplanation: 'Use "absolutely essential", not "very essential".',
      },
    },

    // ─── 8. Very vs. Too, Enough, So vs. Such ─────────────────────────────
    {
      id: 'very-too-enough-so-such',
      title: '8. Very vs. Too, Enough & So vs. Such Structures',
      banglaTitle: 'Very, Too, Enough এবং So/Such-এর কাঠামোগত ব্যবহার',
      level: 'Medium / Advanced',
      description:
        'Master the structural and semantic distinctions between high degree ("very"), excessive/problematic degree ("too"), sufficiency ("enough"), and correlative clauses ("so...that", "such...that").',
      banglaExplanation:
        'Very = তীব্র মাত্রা। Too = প্রয়োজনের চেয়ে বেশি যা সমস্যা সৃষ্টি করে। Enough = পর্যাপ্ত (adjective/adverb-এর পরে বসে, কিন্তু noun-এর আগে বসে)।',
      rules: [
        'Very vs. Too: "The coffee is very hot" (hot, but drinkable) vs. "The coffee is too hot to drink" (problem: cannot drink).',
        'Enough position: Adjective/Adverb + enough ("fast enough", "clear enough"); but enough + Noun ("enough resources").',
        'So + Adjective/Adverb + that: "The exam was so demanding that few passed."',
        'Such + (a/an) + Adjective + Noun + that: "It was such a demanding exam that few passed."',
      ],
      examples: [
        { text: 'The project was too complex to finish in one week.', breakdown: 'too + adj + to-infinitive implies impossibility' },
        { text: 'The candidate spoke persuasively enough to convince the panel.', breakdown: 'adverb persuasively + enough' },
        { text: 'The inflation rate rose so rapidly that consumers curtailed spending.', breakdown: 'so + adverb rapidly + that clause' },
      ],
      commonMistakes: [
        { wrong: 'She is enough old to drive.', correct: 'She is old enough to drive.', reason: '"Enough" follows adjectives and adverbs.' },
        { wrong: 'It was so difficult problem.', correct: 'It was such a difficult problem. / The problem was so difficult.', reason: 'Use "such a" before adjective + singular countable noun.' },
      ],
      ieltsTips: [
        'Using "so + adverb + that" result clauses elevates cohesion and grammatical range in IELTS Task 2 problem-solution essays.',
      ],
      miniCheck: {
        question: 'Choose the grammatically correct sentence:',
        options: [
          'The student did not write clearly enough.',
          'The student did not write enough clearly.',
          'The student wrote too clearly to understand.',
          'The student wrote such clearly.',
        ],
        correctIndex: 0,
        explanation: '"Enough" must be placed after the adverb "clearly" ("clearly enough").',
        simpleExplanation: '"Enough" comes AFTER adverbs: "clearly enough".',
      },
    },

    // ─── 9. Sentence & Comment Adverbs ────────────────────────────────────
    {
      id: 'sentence-and-comment-adverbs',
      title: '9. Sentence & Comment Adverbs (Clause-Level Stance)',
      banglaTitle: 'বাক্যের অভিমত প্রকাশক Adverb (Sentence Adverbs)',
      level: 'Advanced',
      description:
        'Sentence adverbs modify an entire clause, expressing the speaker’s attitude, evaluation, or epistemic certainty regarding the proposition (fortunately, clearly, arguably, surprisingly, inevitably).',
      banglaExplanation:
        'Sentence adverbs সম্পূর্ণ বাক্যের ওপর মন্তব্য বা দৃষ্টিভঙ্গি প্রকাশ করে। এগুলো সাধারণত বাক্যের শুরুতে কমা (comma) দিয়ে ব্যবহৃত হয়।',
      rules: [
        'Sentence adverbs are typically placed at the beginning of a sentence followed by a comma: "Fortunately, the data was recovered."',
        'Epistemic stance adverbs: arguably, undoubtedly, potentially, presumably, apparently.',
        'Evaluative comment adverbs: remarkably, regrettably, surprisingly, interestingly.',
      ],
      examples: [
        { text: 'Arguably, artificial intelligence is the most transformative technology of this century.', breakdown: 'Arguably modifies the entire proposition' },
        { text: 'Inevitably, urbanization leads to escalating infrastructural pressure.', breakdown: 'Inevitably expresses certainty regarding the consequence' },
        { text: 'Interestingly, the experimental group showed zero adverse reactions.', breakdown: 'Interestingly introduces an evaluative observation' },
      ],
      commonMistakes: [
        { wrong: 'Argue, this policy is effective.', correct: 'Arguably, this policy is effective.', reason: 'Use the sentence adverb "Arguably" rather than the imperative verb "Argue".' },
      ],
      ieltsTips: [
        'Stance adverbs ("Arguably,", "Undoubtedly,", "Evidently,") provide nuanced academic hedging and assertiveness in Band 8.5+ essays.',
      ],
      miniCheck: {
        question: 'Which word correctly functions as a sentence adverb in: "______, sustainable policies reduce carbon output."',
        options: ['Demonstrate', 'Undoubtedly', 'Certainty', 'Doubtful'],
        correctIndex: 1,
        explanation: '"Undoubtedly" functions as a sentence adverb modifying the full clause to express strong epistemic certainty.',
        simpleExplanation: '"Undoubtedly," introduces and comments on the whole sentence.',
      },
    },

    // ─── 10. Focusing Adverbs ─────────────────────────────────────────────
    {
      id: 'focusing-adverbs',
      title: '10. Focusing Adverbs (Only, Even, Also, Especially)',
      banglaTitle: 'নির্দিষ্টকারী Adverb (Focusing Adverbs)',
      level: 'Advanced',
      description:
        'Focusing adverbs limit, specify, or add emphasis to a particular element within a clause. Changing their placement changes the meaning of the entire sentence.',
      banglaExplanation:
        'Focusing adverbs (only, even, also, particularly, especially) বাক্যের নির্দিষ্ট কোনো শব্দের ওপর গুরুত্ব আরোপ করে। অবস্থানের পরিবর্তনের সাথে বাক্যের অর্থও বদলে যায়।',
      rules: [
        '"Only" modifies the word directly adjacent to it:',
        '• "Only John solved the puzzle." (Nobody else solved it).',
        '• "John only solved the puzzle." (He did nothing else with it).',
        '• "John solved only the puzzle." (He did not solve other tasks).',
        '"Even" indicates something surprising or unexpected: "Even experts made errors."',
      ],
      examples: [
        { text: 'The scholarship is available only to postgraduate researchers.', breakdown: '"only" limits eligibility strictly to postgraduate researchers' },
        { text: 'The initiative benefited rural communities, especially smallholder farmers.', breakdown: '"especially" highlights smallholder farmers within the group' },
        { text: 'She did not even mention the budgetary deficit.', breakdown: '"even" emphasizes the unexpected omission' },
      ],
      commonMistakes: [
        { wrong: 'I only have two questions to ask.', correct: 'I have only two questions to ask.', reason: 'In formal academic writing, place "only" directly before the numerical element it modifies.' },
      ],
      ieltsTips: [
        'Be extremely careful with "only" and "particularly" in Task 2 to avoid unintended generalization or misrepresentation of arguments.',
      ],
      miniCheck: {
        question: 'Which sentence means that NO OTHER PERSON submitted the assignment?',
        options: [
          'She only submitted the assignment yesterday.',
          'Only she submitted the assignment yesterday.',
          'She submitted only the assignment yesterday.',
          'She submitted the assignment only yesterday.',
        ],
        correctIndex: 1,
        explanation: 'Placing "Only" before the subject pronoun "she" restricts the action exclusively to her.',
        simpleExplanation: '"Only she" means nobody else did it.',
      },
    },

    // ─── 11. Linking & Discourse Adverbs ──────────────────────────────────
    {
      id: 'linking-discourse-adverbs',
      title: '11. Linking / Discourse Adverbials (Cohesion & Coherence)',
      banglaTitle: 'সংযোগকারী ও বাক্যতাত্ত্বিক Adverb (Discourse Adverbials)',
      level: 'Advanced / IELTS Advanced',
      description:
        'Conjunctive adverbs establish logical relationships between clauses or sentences (contrast, concession, cause-and-effect, addition, exemplification).',
      banglaExplanation:
        'Discourse adverbs (however, therefore, furthermore, consequently, nevertheless) বাক্যের মধ্যে যুক্তির ধারাবাহিকতা বজায় রাখে। এদের পর সাধারণত কমা বসে।',
      rules: [
        'Conjunctive adverbs cannot join two independent clauses with a comma alone (avoid comma splices).',
        'Punctuation pattern 1: "Sentence. However, Sentence."',
        'Punctuation pattern 2: "Clause; however, clause."',
        'Categories:',
        '• Contrast/Concession: however, nevertheless, conversely, nonetheless, on the contrary.',
        '• Cause/Result: therefore, consequently, thus, accordingly, as a result.',
        '• Addition: furthermore, moreover, additionally, in addition.',
      ],
      examples: [
        { text: 'The policy required substantial investment; however, it produced immense economic yields.', breakdown: 'Semicolon + however + comma joins independent clauses correctly' },
        { text: 'Renewable energy adoption expanded rapidly; consequently, urban emissions decreased.', breakdown: 'consequently expresses causal consequence' },
        { text: 'Moreover, international student mobility fosters multilateral cultural empathy.', breakdown: 'Moreover introduces a complementary academic argument' },
      ],
      commonMistakes: [
        { wrong: 'The car was expensive, however he bought it.', correct: 'The car was expensive; however, he bought it. / The car was expensive. However, he bought it.', reason: '"However" is an adverb, not a coordinating conjunction. Do not connect two main clauses with just a comma.' },
      ],
      ieltsTips: [
        'Mastering conjunctive adverb punctuation directly fulfills the Coherence and Cohesion criterion for Band 8.0+ in IELTS Writing.',
      ],
      miniCheck: {
        question: 'Identify the correctly punctuated sentence:',
        options: [
          'Automation increases efficiency, however it displaces manual workers.',
          'Automation increases efficiency; however, it displaces manual workers.',
          'Automation increases efficiency however, it displaces manual workers.',
          'Automation increases efficiency, however, it displaces manual workers.',
        ],
        correctIndex: 1,
        explanation: 'When joining two independent clauses with "however", use a semicolon before and a comma after.',
        simpleExplanation: 'Use "; however," to connect two full sentences.',
      },
    },

    // ─── 12. Comparative & Superlative Adverbs ────────────────────────────
    {
      id: 'comparative-superlative-adverbs',
      title: '12. Comparative & Superlative Adverbs',
      banglaTitle: 'তুলনামূলক Adverb (Comparative & Superlative)',
      level: 'Medium / Advanced',
      description:
        'Learn how to form comparative and superlative degrees for regular and multi-syllable adverbs.',
      banglaExplanation:
        'Adverb-এর তুলনা: এক syllable-এর ক্ষেত্রে -er/-est (faster, hardest) এবং -ly যুক্ত adverbs-এর ক্ষেত্রে more/most (more carefully, most efficiently)।',
      rules: [
        'Adverbs sharing adjective forms add -er / -est: fast → faster → fastest; hard → harder → hardest; early → earlier → earliest.',
        'Adverbs ending in -ly use "more" and "most": carefully → more carefully → most carefully; efficiently → more efficiently → most efficiently.',
        'Equal comparison: "as + adverb + as" ("She analyzed the report as thoroughly as her colleague").',
      ],
      examples: [
        { text: 'The modernized turbine operates far more efficiently than older models.', breakdown: 'more efficiently comparative modified by far' },
        { text: 'Of all candidates, she presented her thesis most convincingly.', breakdown: 'most convincingly superlative of multi-syllable adverb' },
        { text: 'Autonomous vehicles can react faster than human drivers.', breakdown: 'faster comparative of flat adverb fast' },
      ],
      commonMistakes: [
        { wrong: 'He works more hard than before.', correct: 'He works harder than before.', reason: '"Hard" is a single-syllable adverb; its comparative is "harder", not "more hard".' },
      ],
      ieltsTips: [
        'Use quantified comparative adverbs ("considerably more rapidly than", "substantially more effectively than") in IELTS Task 1 data comparisons.',
      ],
      miniCheck: {
        question: 'Complete the sentence: "The new automated system processes financial transactions ______ than manual methods."',
        options: ['more efficiently', 'efficientlier', 'most efficient', 'as efficiently'],
        correctIndex: 0,
        explanation: '"Efficiently" is a multi-syllable adverb and forms the comparative with "more efficiently".',
        simpleExplanation: 'Use "more efficiently" with "than".',
      },
    },

    // ─── 13. Irregular Adverbs ────────────────────────────────────────────
    {
      id: 'irregular-adverbs',
      title: '13. Irregular Adverbs (Well, Badly, Far, Little, Much)',
      banglaTitle: 'অনিয়মিত Adverb-এর রূপান্তর',
      level: 'Medium / Advanced',
      description:
        'Some adverbs have completely irregular positive, comparative, and superlative degrees.',
      banglaExplanation:
        'কিছু Adverb-এর তুলনামূলক রূপ সম্পূর্ণ ব্যতিক্রম হয়: well → better → best, badly → worse → worst, far → farther/further → farthest/furthest।',
      rules: [
        'well → better → best: "She speaks English well." / "She speaks better than I do."',
        'badly → worse → worst: "He performed badly." / "He performed worse than expected."',
        'much → more → most: "I like this more."',
        'little → less → least: "She worries less now."',
        'far → farther (physical distance) / further (figurative/extent) → farthest / furthest.',
      ],
      examples: [
        { text: 'The experimental cohort performed significantly better on the cognitive test.', breakdown: 'better is the irregular comparative of well' },
        { text: 'Without intervention, the ecosystem will deteriorate further.', breakdown: 'further denotes greater figurative degree/extent' },
        { text: 'This solution costs less and functions best.', breakdown: 'less (comparative of little) & best (superlative of well)' },
      ],
      commonMistakes: [
        { wrong: 'He played more well today.', correct: 'He played better today.', reason: 'The comparative of "well" is "better", never "more well".' },
        { wrong: 'She did bad on the exam.', correct: 'She did badly on the exam.', reason: 'Use the adverb "badly" to modify the verb "did".' },
      ],
      ieltsTips: [
        'Understand the distinction between "further" (used in academic arguments: "Furthermore", "investigate further") and "farther" (strictly geographic distance).',
      ],
      miniCheck: {
        question: 'Choose the correct comparative adverb: "The secondary cohort performed ______ than the baseline group."',
        options: ['more badly', 'worse', 'worser', 'more worse'],
        correctIndex: 1,
        explanation: '"Worse" is the irregular comparative adverb of "badly".',
        simpleExplanation: 'The comparative of "badly" is "worse".',
      },
    },

    // ─── 14. Confusing Adverb Pairs ───────────────────────────────────────
    {
      id: 'confusing-adverb-pairs',
      title: '14. Confusing Adverb Pairs (Hard/Hardly, Late/Lately, Near/Nearly)',
      banglaTitle: 'বিভ্রান্তিকর Adverb জোড়া (Hard/Hardly, Late/Lately ইত্যাদি)',
      level: 'Advanced',
      description:
        'Certain adverbs have dual forms with completely different meanings (hard vs. hardly, late vs. lately, near vs. nearly, high vs. highly, close vs. closely, direct vs. directly).',
      banglaExplanation:
        'কিছু শব্দের শেষে -ly যুক্ত করলে সম্পূর্ণ ভিন্ন অর্থ প্রকাশ করে। যেমন: Hard (কঠোর পরিশ্রম) vs Hardly (কদাচিৎ/না বললেই চলে); Late (দেরিতে) vs Lately (সম্প্রতি)।',
      rules: [
        'Hard (with great effort) vs. Hardly (almost not / barely): "He works hard" vs. "He hardly works".',
        'Late (not on time) vs. Lately (recently): "He arrived late" vs. "I haven’t seen him lately".',
        'Near (close in distance) vs. Nearly (almost): "Come near" vs. "The project is nearly finished".',
        'High (physical altitude) vs. Highly (to a high degree / highly respected): "Fly high" vs. "Highly effective".',
        'Close (proximity) vs. Closely (with careful attention): "Stand close" vs. "Watch closely".',
        'Direct (without stopping) vs. Directly (immediately / straightforwardly): "Fly direct" vs. "I will contact you directly".',
      ],
      examples: [
        { text: 'He worked hard throughout the semester and passed with distinction.', breakdown: 'hard = with immense effort' },
        { text: 'She was so exhausted that she could hardly keep her eyes open.', breakdown: 'hardly = barely / almost not at all' },
        { text: 'Lately, renewable investments have surged globally.', breakdown: 'lately = in recent times' },
      ],
      commonMistakes: [
        { wrong: 'She works hardly every day.', correct: 'She works hard every day.', reason: '"Hardly" means almost never. To express great effort, use "hard".' },
        { wrong: 'He arrived lately to the seminar.', correct: 'He arrived late to the seminar.', reason: '"Lately" means recently. To express unpunctuality, use "late".' },
      ],
      ieltsTips: [
        'Confusing "hard/hardly" and "late/lately" is an immediate marker of sub-Band 6.0 lexical control. Master these contrasts thoroughly.',
      ],
      miniCheck: {
        question: 'Which sentence correctly expresses that someone puts in great effort?',
        options: [
          'The researcher works hardly in the laboratory.',
          'The researcher works hard in the laboratory.',
          'The researcher works hardly ever in the laboratory.',
          'The researcher works with hardly effort in the laboratory.',
        ],
        correctIndex: 1,
        explanation: '"Works hard" means works with great effort. "Hardly" means almost not at all.',
        simpleExplanation: '"Works hard" means works with great effort.',
      },
    },

    // ─── 15. IELTS Academic Adverbs & Collocations ────────────────────────
    {
      id: 'ielts-academic-adverbs-collocations',
      title: '15. IELTS Academic Adverbs & High-Band Collocations',
      banglaTitle: 'IELTS একাডেমিক Adverb এবং কোলোকেশন',
      level: 'IELTS Advanced',
      description:
        'Master the sophisticated adverb + adjective and adverb + verb collocations essential for achieving Band 8.5–9.0 in IELTS Academic Writing and Speaking.',
      banglaExplanation:
        'IELTS পরীক্ষায় উচ্চ ব্যান্ড স্কোর অর্জনের জন্য একাডেমিক Adverb কোলোকেশন (যেমন: significantly increase, widely accepted, fundamentally flawed) অত্যন্ত গুরুত্বপূর্ণ।',
      rules: [
        'Task 1 Trend Descriptors: surged dramatically, declined steadily, fluctuated marginally, remained relatively stable.',
        'Academic Evaluation Collocations: highly beneficial, deeply concerned, widely accepted, closely correlated, fundamentally flawed, predominantly composed.',
        'Hedging and Stance: potentially feasible, arguably significant, predominantly responsible.',
      ],
      examples: [
        { text: 'Global temperatures increased significantly over the previous three decades.', breakdown: 'significantly modifies trend verb increased' },
        { text: 'The preliminary hypothesis was fundamentally flawed due to sampling bias.', breakdown: 'fundamentally modifies adjective flawed' },
        { text: 'These two socioeconomic variables are closely correlated.', breakdown: 'closely modifies participial adjective correlated' },
      ],
      commonMistakes: [
        { wrong: 'The chart shows a big up.', correct: 'The figures rose dramatically / experienced a dramatic rise.', reason: 'Use academic adverbs ("dramatically", "substantially") rather than informal nouns/adjectives.' },
      ],
      ieltsTips: [
        'Integrate natural adverb-adjective collocations ("exceptionally resilient", "profoundly impactful") across your IELTS Task 2 arguments to maximize your Lexical Resource score.',
      ],
      miniCheck: {
        question: 'Choose the most natural academic collocation for an IELTS Task 1 trend:',
        options: [
          'The unemployment rate increased bigly in 2020.',
          'The unemployment rate increased significantly in 2020.',
          'The unemployment rate increased heavy in 2020.',
          'The unemployment rate increased with highness in 2020.',
        ],
        correctIndex: 1,
        explanation: '"Increased significantly" is the standard academic collocation for describing substantial statistical growth.',
        simpleExplanation: '"Increased significantly" is the formal IELTS phrase for large increases.',
      },
    },
  ],
};

export const adverbLessonData = adverbLesson;
