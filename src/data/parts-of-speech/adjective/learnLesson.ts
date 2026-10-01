import type { AdjectiveLesson } from '@/types';

export const adjectiveLessonData: AdjectiveLesson = {
  id: 'adjective',
  name: 'Adjective',
  banglaName: 'বিশেষণ পদ (Adjective)',
  subtitle: 'Master English Adjectives from Zero to IELTS Advanced Band 9.0',
  introduction:
    'An adjective is a describing word that qualifies, identifies, or quantifies a noun or pronoun. Adjectives enrich sentences by adding detail, precision, nuance, and academic sophistication.',
  introductionBangla:
    'Adjective বা বিশেষণ হলো এমন একটি শব্দ যা Noun বা Pronoun-এর দোষ, গুণ, অবস্থা, পরিমাণ, আকার বা সংখ্যা প্রকাশ করে এবং বর্ণনায় গভীরতা ও সুস্পষ্টতা আনে।',
  interactiveSentence: [
    { text: 'The', role: 'Definite Article (Determiner)', color: '#6366f1', explanation: 'Specifies the definite noun phrase' },
    { text: 'highly', role: 'Adverb of Degree', color: '#8b5cf6', explanation: 'Intensifies and modifies the following descriptive adjective' },
    { text: 'effective', role: 'Attributive Descriptive Adjective', color: '#10b981', explanation: 'Describes the quality and capability of the policy' },
    { text: 'environmental', role: 'Classifying / Relational Adjective', color: '#06b6d4', explanation: 'Categorizes the domain of the policy (Environment)' },
    { text: 'policy', role: 'Head Noun', color: '#f59e0b', explanation: 'The core noun being modified by the preceding adjectives' },
    { text: 'remains', role: 'Linking / Copular Verb', color: '#ec4899', explanation: 'Connects the subject noun phrase to the predicative adjective' },
    { text: 'essential', role: 'Predicative Adjective (Subject Complement)', color: '#ef4444', explanation: 'Describes the indispensable state of the policy after the linking verb' },
    { text: 'for sustainable development.', role: 'Prepositional Phrase Complement', color: '#64748b', explanation: 'Specifies the beneficiary domain with another adjective ("sustainable")' },
  ],
  sections: [
    // ─── Section 1: Zero / Beginner ─────────────────────────────────────
    {
      id: 'what-is-adjective',
      title: '1. What is an Adjective? (Adjective কী?)',
      banglaTitle: 'বিশেষণ পরিচিতি ও প্রাথমিক ধারণা',
      level: 'Zero / Beginner',
      description:
        'An adjective is a word that describes or provides more information about a noun (a person, place, thing) or a pronoun.',
      banglaExplanation:
        'যে শব্দ কোনো Noun বা Pronoun সম্পর্কে তথ্য দেয় এবং কেমন, কতটুকু বা কোনটি তা জানায়, তাকে Adjective বলে।',
      rules: [
        'An adjective answers questions such as: What kind? (a big house), Which one? (this car), How many? (three books).',
        'Adjectives give color, size, shape, feeling, quality, and condition to nouns.',
        'Unlike languages where adjectives change according to gender or plural forms, English adjectives usually stay the same: "one smart student" vs "five smart students".',
      ],
      examples: [
        {
          text: 'She lives in a large house in London.',
          breakdown: 'house = noun; large = adjective describing the physical size of the house.',
        },
        {
          text: 'The clever student solved the difficult math puzzle quickly.',
          breakdown: 'student = noun; clever = adjective; puzzle = noun; difficult = adjective describing the puzzle.',
        },
        {
          text: 'He bought a red bicycle yesterday.',
          breakdown: 'bicycle = noun; red = adjective describing the color.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'She bought three books expensives.',
          correct: 'She bought three expensive books.',
          reason: 'English adjectives are placed before the noun and never take plural "-s".',
        },
      ],
      ieltsTips: [
        'Using precise descriptive adjectives instead of vague words like "good" or "bad" elevates your Lexical Resource score in IELTS Speaking and Writing.',
      ],
      miniCheck: {
        question: 'Identify the adjective in this sentence: "The brilliant scientist conducted a groundbreaking experiment."',
        options: ['scientist', 'brilliant', 'conducted', 'experiment'],
        correctIndex: 1,
        explanation: '"brilliant" is an adjective describing the noun "scientist".',
        simpleExplanation: '"brilliant" tells us what kind of scientist she is.',
      },
    },

    // ─── Section 2: What Adjectives Describe ───────────────────────────
    {
      id: 'what-adjectives-describe',
      title: '2. What Adjectives Describe (আকার, বয়স, রঙ ও গুণাবলি)',
      banglaTitle: 'বিশেষণের বহুমুখী শ্রেণি ও বৈশিষ্ট্য',
      level: 'Beginner',
      description:
        'Adjectives express diverse attributes including size, age, color, shape, origin, material, quality, emotion, opinion, condition, and importance.',
      banglaExplanation:
        'Adjective বিভিন্ন বৈশিষ্ট্য যেমন: আকার (size), বয়স (age), রঙ (color), উপাদান (material), অনুভূতি (emotion) ও গুণ (quality) প্রকাশ করে।',
      rules: [
        'Physical attributes: size (tiny, massive), age (ancient, contemporary), color (azure, crimson), shape (oval, spherical).',
        'Subjective opinions: beautiful, terrible, magnificent, delightful.',
        'Material & Origin: wooden, metallic, ceramic, Italian, Japanese.',
        'Emotional states & conditions: joyful, exhausted, fragile, resilient.',
      ],
      examples: [
        {
          text: 'The antique wooden table was crafted in France.',
          breakdown: 'antique = age adjective; wooden = material adjective; table = noun.',
        },
        {
          text: 'The exhausted medical staff rested after a twelve-hour surgery.',
          breakdown: 'exhausted = condition/emotion adjective; medical = classifying adjective; staff = noun.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'He wore a silk blue shirt.',
          correct: 'He wore a blue silk shirt.',
          reason: 'Color adjectives normally precede material adjectives (blue silk, not silk blue).',
        },
      ],
      ieltsTips: [
        'In IELTS Academic Writing Task 1, descriptive adjectives like "significant", "moderate", and "steady" are essential for summarizing chart trends.',
      ],
      miniCheck: {
        question: 'Which word in "The fragile glass vase shattered instantly" describes the condition of the vase?',
        options: ['glass', 'fragile', 'shattered', 'instantly'],
        correctIndex: 1,
        explanation: '"fragile" describes the delicate physical condition of the vase.',
        simpleExplanation: '"fragile" tells us the condition (easily broken).',
      },
    },

    // ─── Section 3: Positions: Attributive vs Predicative ────────────────
    {
      id: 'attributive-vs-predicative',
      title: '3. Adjective Positions: Attributive vs Predicative',
      banglaTitle: 'Noun-এর পূর্বে ও Linking Verb-এর পরে বিশেষণ',
      level: 'Easy',
      description:
        'Adjectives can occupy two primary grammatical positions: Attributive (placed directly before a noun) and Predicative (placed after a linking/copular verb).',
      banglaExplanation:
        'Noun-এর পূর্বে বসলে তাকে Attributive Adjective (a happy person) এবং Linking verb-এর পরে বসলে তাকে Predicative Adjective (The person is happy) বলে।',
      rules: [
        'Attributive position: Adjective + Noun (e.g. "an innovative company").',
        'Predicative position: Subject + Linking Verb + Adjective (e.g. "The company is innovative").',
        'Common linking verbs followed by predicative adjectives: be, seem, appear, become, look, sound, smell, taste, feel, remain, stay.',
        'Some adjectives can ONLY be predicative: alive, asleep, afraid, aware, alone, content (e.g., "The baby is asleep", not "an asleep baby").',
      ],
      examples: [
        {
          text: 'Attributive: The successful entrepreneur founded three technological startups.',
          breakdown: 'successful sits directly before noun "entrepreneur".',
        },
        {
          text: 'Predicative: The new software strategy appears highly effective.',
          breakdown: 'appears = linking verb; effective = predicative adjective describing "strategy".',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Look at the afraid child.',
          correct: 'Look at the frightened child. / The child is afraid.',
          reason: '"afraid" is exclusively a predicative adjective; use "frightened" or "scared" attributively.',
        },
      ],
      ieltsTips: [
        'Varying between attributive phrases ("a viable alternative") and predicative clauses ("the alternative remains viable") displays structural flexibility for Band 8+ Grammatical Range.',
      ],
      miniCheck: {
        question: 'In "The newly proposed taxation scheme seems impractical," what role does "impractical" play?',
        options: ['Attributive adjective', 'Predicative adjective (Subject complement)', 'Adverb of manner', 'Object of verb'],
        correctIndex: 1,
        explanation: '"impractical" follows the linking verb "seems" and acts as a predicative adjective describing the scheme.',
        simpleExplanation: 'It follows the linking verb "seems" to describe the subject.',
      },
    },

    // ─── Section 4: Common Adjective Types ──────────────────────────────
    {
      id: 'adjective-types',
      title: '4. Major Adjective Types (Descriptive, Quantitative, Demonstrative)',
      banglaTitle: 'বিশেষণের প্রধান প্রকারভেদ',
      level: 'Easy / Medium',
      description:
        'Adjectives are classified into distinct functional categories: Descriptive, Quantitative, Demonstrative, Possessive, Interrogative, and Proper.',
      banglaExplanation:
        'গুণবাচক (Descriptive), পরিমাণবাচক (Quantitative), নির্দেশক (Demonstrative), সম্বন্ধসূচক (Possessive) এবং নামবাচক (Proper) বিশেষণ।',
      rules: [
        'Descriptive: denotes quality (intelligent, sustainable, catastrophic).',
        'Quantitative / Numerical: indicates quantity/order (many, several, few, first, double).',
        'Demonstrative: points out specific entities (this, that, these, those + noun).',
        'Possessive determiners/adjectives: denotes ownership (my, your, his, her, our, their + noun).',
        'Proper adjectives: derived from proper nouns (British, Bangladeshi, Victorian, Shakespearean).',
      ],
      examples: [
        {
          text: 'These several British researchers published their comprehensive study.',
          breakdown: 'These (demonstrative) + several (quantitative) + British (proper) + their (possessive) + comprehensive (descriptive).',
        },
      ],
      commonMistakes: [
        {
          wrong: 'She loves to study the Shakespearian dramas.',
          correct: 'She loves to study Shakespearean drama.',
          reason: 'Proper adjectives must be capitalized (Shakespearean, Bangladeshi, Asian).',
        },
      ],
      ieltsTips: [
        'Demonstrative adjectives ("this trend", "these empirical findings") serve as crucial cohesive devices for IELTS Task 2 coherence.',
      ],
      miniCheck: {
        question: 'Which of the following contains a PROPER adjective?',
        options: ['an ancient Greek philosophical manuscript', 'a large wooden table', 'several difficult examinations', 'this modern automobile'],
        correctIndex: 0,
        explanation: '"Greek" is a proper adjective derived from the proper noun Greece.',
        simpleExplanation: '"Greek" comes from the proper noun "Greece" and is capitalized.',
      },
    },

    // ─── Section 5: Natural Adjective Order ─────────────────────────────
    {
      id: 'adjective-order',
      title: '5. The Natural Royal Order of Adjectives (বিশেষণের ক্রম)',
      banglaTitle: 'একাধিক বিশেষণের প্রাকৃতিক বিন্যাস',
      level: 'Medium',
      description:
        'When multiple adjectives modify a single noun, native English follows a strict conventional hierarchy: Opinion → Size → Age → Shape → Color → Origin → Material → Purpose → Noun (OSASCOMP).',
      banglaExplanation:
        'একটি Noun-এর পূর্বে একাধিক Adjective বসলে নির্দিষ্ট ক্রম মানতে হয়: Opinion → Size → Age → Shape → Color → Origin → Material → Purpose + Noun।',
      rules: [
        'O - Opinion: beautiful, valuable, brilliant, lovely',
        'S - Size: enormous, tiny, compact, massive',
        'A - Age: antique, medieval, modern, ancient',
        'S - Shape: circular, rectangular, triangular, flat',
        'C - Color: turquoise, crimson, golden, dark',
        'O - Origin: Japanese, Scandinavian, Egyptian',
        'M - Material: silk, leather, titanium, wooden',
        'P - Purpose: running (shoes), research (facility), dining (table)',
      ],
      examples: [
        {
          text: 'A magnificent large antique rectangular brown French wooden dining table.',
          breakdown: 'Opinion (magnificent) + Size (large) + Age (antique) + Shape (rectangular) + Color (brown) + Origin (French) + Material (wooden) + Purpose (dining) + Noun (table).',
        },
        {
          text: 'An elegant contemporary Japanese architectural design.',
          breakdown: 'Opinion (elegant) + Age (contemporary) + Origin (Japanese) + Purpose (architectural) + Noun (design).',
        },
      ],
      commonMistakes: [
        {
          wrong: 'A wooden beautiful old cottage.',
          correct: 'A beautiful old wooden cottage.',
          reason: 'Opinion (beautiful) comes before Age (old), which comes before Material (wooden).',
        },
      ],
      ieltsTips: [
        'In IELTS Speaking Part 2 describing objects or places, correctly ordering 2–3 adjectives (e.g. "a charming little historic town") sounds effortlessly fluent.',
      ],
      miniCheck: {
        question: 'Which sequence of adjectives follows standard English order?',
        options: [
          'a leather handsome Italian jacket',
          'a handsome Italian leather jacket',
          'an Italian leather handsome jacket',
          'a leather Italian handsome jacket',
        ],
        correctIndex: 1,
        explanation: 'Opinion (handsome) → Origin (Italian) → Material (leather) + Noun (jacket).',
        simpleExplanation: 'Opinion comes first, then origin, then material.',
      },
    },

    // ─── Section 6: Comparative Adjectives ──────────────────────────────
    {
      id: 'comparative-adjectives',
      title: '6. Comparative Adjectives (তুলনামূলক বিশেষণ)',
      banglaTitle: 'দুইয়ের মধ্যে তুলনা ও তুলনামূলক রূপ',
      level: 'Medium',
      description:
        'Comparative adjectives compare differences between two people, objects, groups, or ideas. They are formed using "-er" for short adjectives and "more / less" for longer adjectives.',
      banglaExplanation:
        'দুটি ব্যক্তি, বস্তু বা বিষয়ের মধ্যে তুলনা করতে Comparative Adjective ব্যবহৃত হয় (short adj + -er অথবা more/less + long adj)।',
      rules: [
        '1-syllable adjectives: add "-er" (fast → faster, clean → cleaner, big → bigger).',
        '2-syllables ending in "-y": change "-y" to "-ier" (easy → easier, healthy → healthier).',
        '2+ syllable adjectives: use "more" or "less" (more expensive, more efficient, less vulnerable).',
        'Irregular comparatives: good → better, bad → worse, far → farther/further, little → less, many/much → more.',
        'Followed by "than": "A is faster than B".',
      ],
      examples: [
        {
          text: 'Solar panels are becoming significantly cheaper and more efficient than coal plants.',
          breakdown: 'cheaper (1-syllable -er) + more efficient (multisyllabic more + adj) + than.',
        },
        {
          text: 'Public transit in Tokyo is far cleaner than in many Western capitals.',
          breakdown: 'cleaner = comparative of clean; intensified by "far".',
        },
      ],
      commonMistakes: [
        {
          wrong: 'This method is more easier than the old one.',
          correct: 'This method is easier than the old one.',
          reason: 'Double comparatives (*more easier) are strictly ungrammatical. Use "easier" alone.',
        },
        {
          wrong: 'His score was more good than mine.',
          correct: 'His score was better than mine.',
          reason: '"good" is irregular: good → better (never *more good).',
        },
      ],
      ieltsTips: [
        'In IELTS Task 1 Academic charts, comparative constructions with quantifiers ("substantially higher than", "marginally lower than") are mandatory.',
      ],
      miniCheck: {
        question: 'Select the grammatically accurate comparative sentence:',
        options: [
          'The novel approach is more effective than traditional methods.',
          'The novel approach is more effectiver than traditional methods.',
          'The novel approach is effectiver than traditional methods.',
          'The novel approach is more better than traditional methods.',
        ],
        correctIndex: 0,
        explanation: '"effective" has 3 syllables, so it forms its comparative with "more effective".',
        simpleExplanation: 'Long adjectives take "more + adjective".',
      },
    },

    // ─── Section 7: Superlative Adjectives ──────────────────────────────
    {
      id: 'superlative-adjectives',
      title: '7. Superlative Adjectives (সর্বোচ্চ মাত্রার বিশেষণ)',
      banglaTitle: 'সকলের মধ্যে তুলনা ও সর্বোচ্চ রূপ',
      level: 'Medium',
      description:
        'Superlative adjectives describe an object or person that is at the upper or lower limit of a quality among three or more items. They typically require the definite article "the".',
      banglaExplanation:
        'তিন বা ততোধিক ব্যক্তি বা বিষয়ের মধ্যে সর্বোচ্চ বা সর্বনিম্ন মাত্রা বোঝাতে Superlative রূপ (the + adj-est অথবা the most/least + adj) ব্যবহৃত হয়।',
      rules: [
        '1-syllable adjectives: the + [adj]-est (the smallest, the largest, the hottest).',
        '2-syllables ending in "-y": the + [adj]-iest (the easiest, the earliest, the heaviest).',
        '2+ syllable adjectives: the most / the least + [adj] (the most prominent, the least expensive).',
        'Irregular superlatives: good → the best, bad → the worst, far → the farthest/furthest.',
      ],
      examples: [
        {
          text: 'Climate change represents the most formidable environmental challenge of the 21st century.',
          breakdown: 'the most formidable = superlative describing "challenge" across all challenges.',
        },
        {
          text: 'This laboratory possesses the most advanced electron microscope in the country.',
          breakdown: 'the most advanced = superlative of multisyllabic adjective "advanced".',
        },
      ],
      commonMistakes: [
        {
          wrong: 'She is most qualified candidate.',
          correct: 'She is the most qualified candidate.',
          reason: 'Superlatives identifying a specific entity require the definite article "the".',
        },
        {
          wrong: 'That was the most worst decision.',
          correct: 'That was the worst decision.',
          reason: 'Avoid double superlatives (*most worst); "worst" is already superlative.',
        },
      ],
      ieltsTips: [
        'Superlatives like "the most dominant sector", "the lowest proportion", and "the peak period" are crucial for Task 1 overviews.',
      ],
      miniCheck: {
        question: 'Which sentence correctly uses the superlative form of "bad"?',
        options: [
          'This is the worst economic downturn in fifty years.',
          'This is the most baddest economic downturn in fifty years.',
          'This is the baddest economic downturn in fifty years.',
          'This is the most worst economic downturn in fifty years.',
        ],
        correctIndex: 0,
        explanation: 'The irregular superlative of "bad" is "the worst".',
        simpleExplanation: 'Bad → Worse → Worst.',
      },
    },

    // ─── Section 8: Equal Comparison (as ... as) ────────────────────────
    {
      id: 'equal-comparison',
      title: '8. Equal Comparison & Proportional Structures (as...as)',
      banglaTitle: 'সমান তুলনা ও আনুপাতিক পরিবর্তন',
      level: 'Medium / Core',
      description:
        'Equal comparison uses "as + base adjective + as" to indicate that two entities share the same degree of a quality. Negative comparison uses "not as / so + base adjective + as".',
      banglaExplanation:
        'দুটি জিনিস সমান গুণসম্পন্ন বোঝাতে "as + base adjective + as" এবং অসমান বোঝাতে "not as + adjective + as" বসে।',
      rules: [
        'Affirmative: Subject + verb + as + [base adjective] + as + Object (e.g. "The train is as fast as the plane").',
        'Negative: Subject + verb + not as/so + [base adjective] + as + Object (e.g. "Hydrogen is not as abundant as oxygen").',
        'Multipliers: twice as [adj] as, three times as [adj] as, half as [adj] as.',
        'Double comparatives for proportionality: The [comparative], the [comparative] (e.g. "The higher the price, the lower the demand").',
      ],
      examples: [
        {
          text: 'Electric vehicles are now almost as affordable as traditional petrol cars.',
          breakdown: 'as affordable as = equal degree of affordability.',
        },
        {
          text: 'The more accessible tertiary education becomes, the more prosperous a society grows.',
          breakdown: 'The more accessible... the more prosperous... (Double comparative structure).',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The new system is as more efficient as the old one.',
          correct: 'The new system is as efficient as the old one.',
          reason: 'Always use the base form of the adjective between "as...as", never the comparative form.',
        },
      ],
      ieltsTips: [
        'The correlative structure "The + comparative, the + comparative" is a Band 9.0 complex sentence structure highly rewarded in IELTS Writing.',
      ],
      miniCheck: {
        question: 'Complete the equal comparison: "The secondary campus is not as ______ as the main university building."',
        options: ['larger', 'large', 'largest', 'more large'],
        correctIndex: 1,
        explanation: 'The "not as ... as" construction requires the plain base adjective "large".',
        simpleExplanation: 'Between "as...as", always use the base adjective.',
      },
    },

    // ─── Section 9: Advanced Degree Modifiers & Intensifiers ────────────
    {
      id: 'degree-modifiers',
      title: '9. Advanced Degree Modifiers & Intensifiers',
      banglaTitle: 'বিশেষণের তীব্রতা ও মাত্রা নির্ধারণকারী শব্দ',
      level: 'Advanced',
      description:
        'Adjectives can be modified by adverbs of degree to fine-tune their intensity. Different modifiers collocate with gradable vs non-gradable (extreme) adjectives.',
      banglaExplanation:
        'Adjective-এর তীব্রতা বাড়াতে বা কমাতে Degree Modifiers (very, extremely, highly, slightly, utterly) ব্যবহৃত হয়।',
      rules: [
        'With gradable adjectives: very, extremely, highly, remarkably, relatively, slightly, somewhat (e.g. "very difficult", "highly effective").',
        'With non-gradable / extreme adjectives: absolutely, completely, utterly, totally, entirely (e.g. "absolutely essential", "completely unique").',
        'With comparatives: far, significantly, considerably, substantially, marginally, slightly (e.g. "considerably higher than").',
      ],
      examples: [
        {
          text: 'The statistical discrepancy was considerably larger than anticipated.',
          breakdown: 'considerably = modifier intensifying the comparative adjective "larger".',
        },
        {
          text: 'It is utterly impossible to predict earthquakes with absolute precision.',
          breakdown: 'utterly modifies extreme non-gradable adjective "impossible".',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The conclusion was very unique.',
          correct: 'The conclusion was truly unique / completely unique.',
          reason: '"unique" is non-gradable (something is either unique or not; it cannot be *very unique).',
        },
        {
          wrong: 'The results were very better than expected.',
          correct: 'The results were far better / much better than expected.',
          reason: 'Use "far", "much", or "significantly" with comparatives, never "very".',
        },
      ],
      ieltsTips: [
        'Using precision modifiers ("substantially superior", "marginally distinct") creates nuanced academic register for Band 8+ Writing.',
      ],
      miniCheck: {
        question: 'Which phrase correctly modifies the comparative adjective "more expensive"?',
        options: ['very more expensive', 'substantially more expensive', 'absolutely more expensive', 'too more expensive'],
        correctIndex: 1,
        explanation: '"substantially" is the correct academic modifier for comparative adjectives.',
        simpleExplanation: 'Use "substantially" or "far" with comparative structures.',
      },
    },

    // ─── Section 10: Gradable vs Non-Gradable Adjectives ────────────────
    {
      id: 'gradable-vs-non-gradable',
      title: '10. Gradable vs Non-Gradable / Absolute Adjectives',
      banglaTitle: 'পরিমাপযোগ্য বনাম চরম/পরম বিশেষণ',
      level: 'Advanced',
      description:
        'Gradable adjectives represent qualities on a scale (hot, cold, good, bad, expensive). Non-gradable (extreme or absolute) adjectives represent absolute extremes or all-or-nothing states (freezing, boiling, impossible, perfect, dead, essential).',
      banglaExplanation:
        'Gradable Adjective হলো যা কম-বেশি হতে পারে (good, big); Non-gradable হলো চরম বা চূড়ান্ত অবস্থা (perfect, impossible, freezing)।',
      rules: [
        'Gradable adjectives take comparative/superlative forms and words like "a bit", "very", "extremely".',
        'Non-gradable / Extreme adjectives already mean "very + [base]": freezing = very cold; furious = very angry; essential = very important.',
        'Non-gradable adjectives take absolute modifiers: completely, absolutely, totally, practically.',
        'Classifying adjectives are also non-gradable: nuclear, financial, pregnant, domestic (e.g. you cannot be *very nuclear).',
      ],
      examples: [
        {
          text: 'Gradable: The weather is extremely cold today.',
          breakdown: 'cold = gradable; takes "extremely".',
        },
        {
          text: 'Non-gradable: The Arctic waters are absolutely freezing.',
          breakdown: 'freezing = extreme adjective (= very cold); takes "absolutely".',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The proposal is very perfect.',
          correct: 'The proposal is absolutely perfect.',
          reason: '"perfect" is an absolute non-gradable state; it pairs with "absolutely", not "very".',
        },
      ],
      ieltsTips: [
        'Avoid informal extreme adjectives like "huge" or "terrific" in IELTS Task 2; prefer "substantial", "monumental", or "paramount".',
      ],
      miniCheck: {
        question: 'Which of the following is an EXTREME / NON-GRADABLE adjective?',
        options: ['cold', 'interesting', 'vital', 'difficult'],
        correctIndex: 2,
        explanation: '"vital" means absolutely essential/necessary and is non-gradable.',
        simpleExplanation: '"vital" already means very essential/important.',
      },
    },

    // ─── Section 11: Participial Adjectives (-ed vs -ing) ───────────────
    {
      id: 'participial-adjectives',
      title: '11. Participial Adjectives: -ed (Feeling) vs -ing (Cause)',
      banglaTitle: 'অংশগ্রহণমূলক বিশেষণ: -ed বনাম -ing',
      level: 'Medium / Core',
      description:
        'Participial adjectives are derived from verbs. "-ed" adjectives describe how someone feels (the recipient of a feeling), while "-ing" adjectives describe the thing or person that causes the feeling.',
      banglaExplanation:
        '-ed যুক্ত Adjective ব্যক্তির অনুভূতি বা অবস্থা (I am interested) প্রকাশ করে; -ing যুক্ত Adjective অনুভূতির কারণ বা উৎস (The book is interesting) প্রকাশ করে।',
      rules: [
        '-ed = Experiencing a feeling / state: interested, bored, confused, excited, exhausted, fascinated, surprised.',
        '-ing = Causing the feeling / attribute: interesting, boring, confusing, exciting, exhausting, fascinating, surprising.',
        'Test: If a person feels the emotion → use "-ed". If the thing produces the effect → use "-ing".',
      ],
      examples: [
        {
          text: 'The confusing academic lecture left the students deeply confused.',
          breakdown: 'confusing lecture (cause of confusion) → confused students (feeling the confusion).',
        },
        {
          text: 'She was fascinated by the fascinating discoveries in astronomy.',
          breakdown: 'fascinated person (feeling wonder) ← fascinating discoveries (provoking wonder).',
        },
      ],
      commonMistakes: [
        {
          wrong: 'I was very interesting in the scientific presentation.',
          correct: 'I was very interested in the scientific presentation.',
          reason: 'The speaker experiences the interest, so the "-ed" form "interested" is required.',
        },
        {
          wrong: 'The long journey was very exhausted.',
          correct: 'The long journey was very exhausting.',
          reason: 'The journey caused exhaustion, so the "-ing" form "exhausting" is needed.',
        },
      ],
      ieltsTips: [
        'Misusing -ed/-ing participles (*I am boring in class) is an immediate indicator of grammatical confusion that penalizes IELTS Speaking.',
      ],
      miniCheck: {
        question: 'Choose the correct participial adjective: "The experimental results were completely ______, shocking all the scientists."',
        options: ['astonished', 'astonishing', 'astonish', 'astonishes'],
        correctIndex: 1,
        explanation: 'The results caused shock and astonishment, so the "-ing" active participle "astonishing" is required.',
        simpleExplanation: 'The results caused the surprise (use -ing).',
      },
    },

    // ─── Section 12: Adjective Suffixes & Word Formation ────────────────
    {
      id: 'adjective-word-formation',
      title: '12. Adjective Word Formation & Derivational Suffixes',
      banglaTitle: 'Noun ও Verb থেকে Adjective গঠন',
      level: 'Advanced',
      description:
        'Adjectives are formed from nouns and verbs by adding derivational suffixes such as -ful, -less, -ous, -al, -ive, -able/-ible, -ic, -ary, and -y.',
      banglaExplanation:
        'বিভিন্ন প্রত্যয় (suffixes) যেমন -able, -ful, -ive, -al যুক্ত করে Noun বা Verb-কে Adjective-এ রূপান্তর করা হয়।',
      rules: [
        '-able / -ible (capable of): sustain → sustainable, adapt → adaptable, access → accessible.',
        '-al (relating to): environment → environmental, nation → national, economy → economical/economic.',
        '-ful (full of) vs -less (without): care → careful / careless, hope → hopeful / hopeless.',
        '-ive (tending to): innovate → innovative, create → creative, effect → effective.',
        '-ous (possessing): disaster → disastrous, danger → dangerous, ambiguity → ambiguous.',
        '-ic (characteristic of): academic, strategic, economic, catastrophic.',
      ],
      examples: [
        {
          text: 'Renewable energy provides an economically viable and environmentally sustainable solution.',
          breakdown: 'viable (-able), sustainable (-able), environmental (-al) derived from nouns/verbs.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The policy was full of success.',
          correct: 'The policy was highly successful.',
          reason: 'Using the derived adjective "successful" elevates prose quality over wordy phrases.',
        },
        {
          wrong: 'Economic car (meaning cheap to run).',
          correct: 'Economical car (economic = relating to the economy; economical = saving money/fuel).',
          reason: 'Beware false synonym pairs: economic (economy-related) vs economical (cost-saving).',
        },
      ],
      ieltsTips: [
        'Mastering derivational morphology allows flexible paraphrasing between noun forms ("efficiency") and adjective forms ("efficient") in IELTS Task 2.',
      ],
      miniCheck: {
        question: 'Which suffix correctly converts the verb "rely" into an adjective meaning dependable?',
        options: ['-able (reliable)', '-ful (relyful)', '-ive (relyive)', '-ous (relyous)'],
        correctIndex: 0,
        explanation: '"rely" + "-able" (y → i) forms the adjective "reliable".',
        simpleExplanation: 'Rely becomes reliable.',
      },
    },

    // ─── Section 13: Adjective vs Adverb Distinction ───────────────────
    {
      id: 'adjective-vs-adverb',
      title: '13. Adjective vs Adverb Distinction',
      banglaTitle: 'বিশেষণ বনাম ক্রিয়া-বিশেষণের পার্থক্য',
      level: 'Medium / Advanced',
      description:
        'Adjectives modify nouns and pronouns (describing what kind / which one). Adverbs modify verbs, adjectives, or other adverbs (describing how, when, where, or to what degree).',
      banglaExplanation:
        'Adjective Noun বা Pronoun-কে বিশেষায়িত করে; আর Adverb Verb, Adjective বা অন্য কোনো Adverb-কে বিশেষায়িত করে।',
      rules: [
        'Adjective + Noun: "She is a fluent speaker." (fluent modifies speaker).',
        'Verb + Adverb: "She speaks English fluently." (fluently modifies speaks).',
        'Adverb + Adjective: "A highly influential report." (highly modifies influential).',
        'Words ending in "-ly" that are ADJECTIVES, NOT adverbs: friendly, lovely, lonely, costly, deadly, timely, orderly, lively.',
        'Flat adjectives/adverbs (same form): fast, hard, early, late, daily.',
      ],
      examples: [
        {
          text: 'The prompt response from the government was received promptly.',
          breakdown: 'prompt = adjective modifying response; promptly = adverb modifying was received.',
        },
        {
          text: 'The organization provided timely financial assistance in a friendly manner.',
          breakdown: 'timely and friendly are adjectives modifying assistance and manner.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'She spoke very friendly.',
          correct: 'She spoke in a very friendly manner / way.',
          reason: '"friendly" is an adjective, not an adverb. To use it adverbially, say "in a friendly way".',
        },
        {
          wrong: 'He drives very fastly.',
          correct: 'He drives very fast.',
          reason: '"fast" is both adjective and adverb; *fastly does not exist in English.',
        },
      ],
      ieltsTips: [
        'Collocations combining adverbs of degree with academic adjectives ("drastically reduced", "immensely advantageous") display Band 9 lexical control.',
      ],
      miniCheck: {
        question: 'Which word in "The timely intervention prevented a costly disaster" is an ADJECTIVE ending in "-ly"?',
        options: ['intervention', 'timely', 'prevented', 'disaster'],
        correctIndex: 1,
        explanation: '"timely" and "costly" are adjectives ending in -ly modifying nouns.',
        simpleExplanation: '"timely" modifies the noun "intervention".',
      },
    },

    // ─── Section 14: Adjective + Preposition Collocations ───────────────
    {
      id: 'adjective-prepositions',
      title: '14. Adjective + Preposition Collocations',
      banglaTitle: 'বিশেষণের সাথে নির্দিষ্ট Preposition-এর ব্যবহার',
      level: 'Advanced / IELTS Advanced',
      description:
        'Many adjectives govern specific dependent prepositions. These combinations must be memorized as fixed collocations.',
      banglaExplanation:
        'অনেক Adjective-এর পর নির্দিষ্ট Dependent Preposition বসে, যেমন: interested in, responsible for, capable of, aware of ইত্যাদি।',
      rules: [
        'of: aware of, capable of, proud of, typical of, characteristic of, fond of.',
        'for: responsible for, famous for, suitable for, essential for, notorious for.',
        'with: familiar with, compatible with, associated with, satisfied with, consistent with.',
        'to: similar to, susceptible to, vulnerable to, proportional to, allergic to.',
        'in: interested in, involved in, experienced in, deficient in, skilled in.',
        'at: good at, proficient at, adept at, skilled at.',
      ],
      examples: [
        {
          text: 'Governments are strictly responsible for maintaining public healthcare infrastructure.',
          breakdown: 'responsible + for (fixed dependent preposition).',
        },
        {
          text: 'Coastal regions are particularly vulnerable to rising sea levels.',
          breakdown: 'vulnerable + to (fixed dependent preposition).',
        },
      ],
      commonMistakes: [
        {
          wrong: 'He is very good in mathematics.',
          correct: 'He is very good at mathematics.',
          reason: 'Skill and ability collocate with "good at", not "good in".',
        },
        {
          wrong: 'This model is different than the original.',
          correct: 'This model is different from the original.',
          reason: 'In standard British and IELTS academic English, "different from" is preferred over "different than".',
        },
      ],
      ieltsTips: [
        'Using accurate adjective-preposition collocations ("conducive to", "detrimental to", "compatible with") secures high accuracy marks in IELTS Task 2.',
      ],
      miniCheck: {
        question: 'Complete the academic collocation: "Researchers must ensure the study is fully compatible ______ ethical standards."',
        options: ['to', 'with', 'for', 'about'],
        correctIndex: 1,
        explanation: '"compatible" strictly collocates with the preposition "with".',
        simpleExplanation: 'Compatible + with.',
      },
    },

    // ─── Section 15: Adjective Patterns: Infinitives & Clauses ──────────
    {
      id: 'adjective-patterns-clauses',
      title: '15. Advanced Adjective Patterns: Infinitives & Clauses',
      banglaTitle: 'বিশেষণ + Infinitive ও That-Clause গঠন',
      level: 'IELTS Advanced',
      description:
        'In academic discourse, adjectives frequently govern to-infinitives ("likely to expand") or that-clauses ("It is imperative that...") to structure objective arguments and hedging.',
      banglaExplanation:
        'উচ্চমানের একাডেমিক লেখায় "It is important to understand" বা "It is clear that..." কাঠামোর মাধ্যমে বস্তুনিষ্ঠ যুক্তি উপস্থাপন করা হয়।',
      rules: [
        'Impersonal dummy-it structure: It + be + Adjective + to-infinitive (e.g. "It is essential to analyze the data").',
        'Subject + be + Adjective + to-infinitive: "The economy is likely to recover", "The species is prone to vanish".',
        'Impersonal that-clause: It + be + Adjective + that-clause (e.g. "It is evident that climate change accelerates").',
        'Mandative subjunctive with adjectives of urgency: It is vital/imperative/crucial that + subject + [bare base verb].',
      ],
      examples: [
        {
          text: 'It is imperative that policymakers adopt sustainable green subsidies.',
          breakdown: 'imperative + that-clause with subjunctive bare verb "adopt".',
        },
        {
          text: 'Unemployment rates are unlikely to diminish without significant industrial investment.',
          breakdown: 'unlikely + to-infinitive (to diminish) expressing epistemic probability.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'It is important governments to act quickly.',
          correct: 'It is important for governments to act quickly. / It is important that governments act quickly.',
          reason: 'Include "for [agent]" before the infinitive, or use a "that"-clause.',
        },
      ],
      ieltsTips: [
        'Impersonal evaluation structures ("It is widely considered vital that...") enhance objective academic tone in Band 9 IELTS essays.',
      ],
      miniCheck: {
        question: 'Select the correct subjunctive structure: "It is crucial that every candidate ______ the examination rules."',
        options: ['follows', 'follow', 'followed', 'will follow'],
        correctIndex: 1,
        explanation: '"It is crucial that..." triggers the mandative subjunctive bare base form "follow".',
        simpleExplanation: 'Subjunctive uses the plain base verb (follow).',
      },
    },
  ],
};

export const adjectiveLesson = adjectiveLessonData;
