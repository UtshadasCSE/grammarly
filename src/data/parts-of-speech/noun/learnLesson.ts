import type { NounLesson } from '@/types';

export const nounLesson: NounLesson = {
  id: 'noun',
  name: 'Noun (বিশেষ্য)',
  banglaName: 'বিশেষ্য পদ — Noun Mastery',
  subtitle: 'Master English nouns from absolute zero to IELTS Band 8+ academic fluency',
  introduction:
    'A noun is the foundation of every English sentence. It names a person, place, thing, animal, concept, or abstract idea. Understanding how nouns behave—whether they are countable or uncountable, singular or plural, concrete or abstract, and how they form noun phrases—is essential for accurate IELTS Speaking and Writing.',
  introductionBangla:
    'Noun বা বিশেষ্য হলো কোনো ব্যক্তি, স্থান, বস্তু, প্রাণী, গুণ বা ধারণার নাম। ইংরেজি বাক্যের Subject ও Object হিসেবে Noun ব্যবহৃত হয়। IELTS পরীক্ষায় ব্যাকরণগত নির্ভুলতা (Grammatical Accuracy) অর্জনের জন্য Noun-এর সঠিক প্রকারভেদ, Countable/Uncountable নিয়ম ও Noun Phrase জানা অত্যন্ত জরুরি।',
  interactiveSentence: [
    {
      text: 'The dedicated researchers',
      role: 'Complex Noun Phrase (Subject)',
      explanation: 'Determiner ("The") + Adjective modifier ("dedicated") + Head plural noun ("researchers"). Acts as the subject of the sentence.',
      color: '#6E0D25',
    },
    {
      text: 'collected',
      role: 'Action Verb',
      explanation: 'Past simple action verb showing what the researchers did.',
      color: '#0284c7',
    },
    {
      text: 'valuable empirical evidence',
      role: 'Noun Phrase (Direct Object)',
      explanation: 'Adjectives ("valuable", "empirical") modifying the uncountable head noun ("evidence"). Cannot say "an evidence" or "evidences".',
      color: '#16a34a',
    },
    {
      text: 'about climate change',
      role: 'Prepositional Phrase (Object of Preposition)',
      explanation: 'Preposition ("about") + Compound abstract noun ("climate change"). Modifies the findings.',
      color: '#d97706',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: '1. What is a Noun? (Zero / Beginner)',
      banglaTitle: 'Noun কী? (প্রাথমিক ধারণা)',
      level: 'Zero / Beginner',
      description:
        'A noun is simply a naming word. Every person, place, thing, animal, or idea in the universe has a name, and that name is a noun.',
      banglaExplanation:
        'Noun হলো কোনো ব্যক্তি (Person), স্থান (Place), বস্তু (Thing), প্রাণী (Animal), বা ধারণার (Idea) নাম। যেমন: teacher, Dhaka, computer, tiger, freedom।',
      rules: [
        'Person: Names a human or professional role (e.g., student, doctor, mother, scientist).',
        'Place: Names a geographic location or facility (e.g., Bangladesh, library, hospital, London).',
        'Thing: Names a physical, tangible object (e.g., book, phone, table, water).',
        'Animal: Names living creatures (e.g., tiger, elephant, bird, dolphin).',
        'Idea / Concept: Names intangible concepts you can think about (e.g., freedom, happiness, knowledge, success).',
      ],
      examples: [
        { text: 'The teacher explained the lesson.', breakdown: 'teacher = person (noun), lesson = thing/concept (noun)' },
        { text: 'Dhaka is a bustling metropolis.', breakdown: 'Dhaka = place (noun), metropolis = place/city (noun)' },
        { text: 'Cats are independent animals.', breakdown: 'Cats = animals (noun), animals = category (noun)' },
        { text: 'Freedom requires personal responsibility.', breakdown: 'Freedom = idea/concept (noun), responsibility = concept (noun)' },
      ],
      commonMistakes: [
        { wrong: 'She wants to happy.', correct: 'She wants happiness.', reason: '"Happy" is an adjective. Use the noun "happiness" after wanting something.' },
      ],
      ieltsTips: [
        'In IELTS Writing, identifying whether you need a noun or an adjective prevents basic word-formation errors.',
      ],
      miniCheck: {
        question: 'Identify all the nouns in this sentence: "The student showed great enthusiasm in the laboratory."',
        options: [
          'student, enthusiasm, laboratory',
          'The, showed, great',
          'showed, in, the',
          'great, enthusiasm',
        ],
        correctIndex: 0,
        explanation: '"student" (person), "enthusiasm" (abstract concept), and "laboratory" (place) are all nouns.',
        simpleExplanation: 'Student is a person, enthusiasm is a feeling/quality, and laboratory is a place.',
      },
    },
    {
      id: 'section-2',
      title: '2. Common Noun vs Proper Noun',
      banglaTitle: 'Common Noun ও Proper Noun',
      level: 'Beginner',
      description:
        'Common nouns refer to general items, while proper nouns refer to specific, named individuals, places, days, months, or organizations, and ALWAYS start with a capital letter.',
      banglaExplanation:
        'সাধারণ যেকোনো ব্যক্তি, বস্তু বা স্থানের নাম হলো Common Noun (যেমন: city, river, student)। আর নির্দিষ্ট নাম বোঝালে তা Proper Noun (যেমন: London, Padma, Rakib), যা সর্বদা Capital letter দিয়ে শুরু হয়।',
      rules: [
        'Common Noun: General name for a class or group (e.g., university, professor, country, month). Do not capitalize unless starting a sentence.',
        'Proper Noun: Specific name of an entity (e.g., Oxford University, Professor Smith, Canada, October). Always capitalized in English.',
        'Languages, nationalities, days of the week, and months are always Proper Nouns (e.g., English, Bengali, Monday, July).',
      ],
      examples: [
        { text: 'The country elected a new president.', breakdown: 'country, president = Common Nouns (general)' },
        { text: 'Canada elected a new Prime Minister in November.', breakdown: 'Canada, Prime Minister, November = Proper Nouns (specific, capitalized)' },
        { text: 'Many students study English at Cambridge.', breakdown: 'students = Common Noun; English, Cambridge = Proper Nouns' },
      ],
      commonMistakes: [
        { wrong: 'I have an exam on monday in english.', correct: 'I have an exam on Monday in English.', reason: 'Days and languages are Proper Nouns and MUST be capitalized.' },
      ],
      ieltsTips: [
        'Capitalization errors in IELTS Listening and Writing directly reduce your Grammatical Accuracy score.',
      ],
      miniCheck: {
        question: 'Which of the following contains only Proper Nouns?',
        options: [
          'London, Friday, Bangladeshi',
          'City, Day, Country',
          'Teacher, Oxford, Library',
          'Language, French, River',
        ],
        correctIndex: 0,
        explanation: 'London (city), Friday (day), and Bangladeshi (nationality) are all specific Proper Nouns requiring capital letters.',
      },
    },
    {
      id: 'section-3',
      title: '3. Concrete Nouns vs Abstract Nouns',
      banglaTitle: 'Concrete Noun ও Abstract Noun',
      level: 'Easy',
      description:
        'Concrete nouns can be experienced with the 5 physical senses (sight, touch, hearing, smell, taste). Abstract nouns refer to ideas, qualities, emotions, and academic concepts.',
      banglaExplanation:
        'যেসব Noun ইন্দ্রিয় দিয়ে দেখা, ছোঁয়া বা অনুভব করা যায় তা Concrete (যেমন: computer, apple, sound)। আর যেসব গুণ, অবস্থা বা ধারণাকে মন দিয়ে উপলব্ধি করতে হয় তা Abstract (যেমন: integrity, poverty, pollution, education)।',
      rules: [
        'Concrete Nouns: Physical entities (e.g., building, microphone, water, tree, laboratory).',
        'Abstract Nouns: Ideas, states, emotions, philosophical concepts (e.g., sustainability, innovation, justice, poverty, wisdom).',
        'IELTS Academic essays heavily rely on abstract nouns to discuss societal issues, economic trends, and psychological impacts.',
      ],
      examples: [
        { text: 'The engineer built a solar panel.', breakdown: 'engineer, solar panel = Concrete Nouns (physical)' },
        { text: 'Technological innovation drives economic growth.', breakdown: 'innovation, growth = Abstract Nouns (economic concepts)' },
        { text: 'Poverty affects the well-being of the population.', breakdown: 'Poverty, well-being = Abstract Nouns' },
      ],
      commonMistakes: [
        { wrong: 'The government should reduce the poor.', correct: 'The government should reduce poverty.', reason: '"Poor" is an adjective. The abstract noun condition is "poverty".' },
      ],
      ieltsTips: [
        'Transforming simple sentences into nominalized structures using abstract nouns (e.g., "People are poor" → "The eradication of poverty") is a hallmark of IELTS Band 8 writing.',
      ],
      miniCheck: {
        question: 'Which word in this sentence is an Abstract Noun? "The scientist demonstrated immense patience during the experiment."',
        options: ['scientist', 'patience', 'experiment', 'during'],
        correctIndex: 1,
        explanation: '"Patience" is an abstract quality that cannot be physically touched or held.',
      },
    },
    {
      id: 'section-4',
      title: '4. Collective Nouns and Subject-Verb Agreement',
      banglaTitle: 'Collective Noun ও এদের Verb Agreement',
      level: 'Easy / Medium',
      description:
        'A collective noun refers to a group of individuals or items acting as a single unit (e.g., team, committee, government, audience, family).',
      banglaExplanation:
        'Collective Noun দ্বারা একজাতীয় ব্যক্তি বা বস্তুর অবিভক্ত সমষ্টি বোঝায়। সাধারণত একক সংস্থা হিসেবে কাজ করলে Singular Verb নেয় (যেমন: The team is winning), কিন্তু সদস্যদের পৃথক আচরণ বোঝালে Plural Verb নেয়।',
      rules: [
        'When the group acts as a single unit in standard English, use a singular verb (e.g., "The government has implemented a new policy.").',
        'Common collective nouns: team, committee, jury, family, government, public, audience, class, staff.',
        'Special animal groups: a flock of birds, a herd of cattle, a pack of wolves, a school of fish.',
      ],
      examples: [
        { text: 'The committee has made its final decision.', breakdown: 'committee = single body → singular verb "has made" and singular pronoun "its"' },
        { text: 'The audience was captivated by the performance.', breakdown: 'audience = unified group → singular verb "was"' },
        { text: 'A swarm of locusts destroyed the crops.', breakdown: 'A swarm of = collective measure phrase' },
      ],
      commonMistakes: [
        { wrong: 'The government have announced its plan.', correct: 'The government has announced its plan.', reason: 'In standard formal IELTS writing, collective nouns representing institutions take singular agreement (has/its).' },
      ],
      ieltsTips: [
        'Consistently using singular agreement with institutional nouns like "the government", "the university", and "the management" shows grammatical control in Task 2.',
      ],
      miniCheck: {
        question: 'Choose the grammatically correct sentence for formal IELTS Academic writing:',
        options: [
          'The research team has published its findings.',
          'The research team have published their findings.',
          'The research team are publishing its findings.',
          'The research team have published its findings.',
        ],
        correctIndex: 0,
        explanation: '"The research team" as a single unit agrees with singular "has" and singular possessive "its".',
      },
    },
    {
      id: 'section-5',
      title: '5. Countable vs Uncountable Nouns & Quantifiers (CRITICAL)',
      banglaTitle: 'Countable ও Uncountable Noun (আইইএলটিএস-এর সবচেয়ে গুরুত্বপূর্ণ নিয়ম)',
      level: 'Medium / Core',
      description:
        'Countable nouns can be counted as individual units and have plural forms. Uncountable nouns cannot be counted directly, do NOT have plural forms, and do not take "a" or "an".',
      banglaExplanation:
        'গণনাযোগ্য Noun হলো Countable (যেমন: student/students, book/books)। যা গণনা করা যায় না তা Uncountable (যেমন: information, advice, equipment, evidence)। Uncountable Noun-এর সাথে কখনো "s/es" বা "a/an" বসবে না।',
      rules: [
        'Countable Nouns: singular/plural forms (e.g., one challenge, three challenges; a university, several universities).',
        'Uncountable Nouns: NO plural -s, NO "a/an" directly. Take singular verbs (e.g., "Information is vital", NOT "Informations are").',
        'Top 10 IELTS Uncountable Nouns that learners often misspell: information, advice, equipment, evidence, research, knowledge, traffic, furniture, progress, luggage.',
        'Quantifiers for Countable: many, a few, few, several, a number of, both.',
        'Quantifiers for Uncountable: much, a little, little, a great deal of, an amount of.',
        'Quantifiers for Both: some, any, a lot of, plenty of, all, most.',
        'Partitive expressions to count uncountable nouns: "a piece of advice", "two pieces of equipment", "a body of research".',
      ],
      examples: [
        { text: 'The consultant provided valuable advice.', breakdown: 'advice = uncountable (never "an advice" or "advices")' },
        { text: 'Modern laboratories require state-of-the-art equipment.', breakdown: 'equipment = uncountable (never "equipments")' },
        { text: 'Substantial evidence suggests that temperatures are rising.', breakdown: 'evidence = uncountable (takes singular verb "suggests")' },
        { text: 'A large amount of research was conducted.', breakdown: '"amount of" + uncountable noun "research"' },
      ],
      commonMistakes: [
        { wrong: 'She gave me many useful advices.', correct: 'She gave me a lot of useful advice. / several pieces of advice.', reason: '"Advice" is strictly uncountable. Use "a lot of advice" or "pieces of advice".' },
        { wrong: 'The scientist bought new equipments.', correct: 'The scientist bought new equipment. / items of equipment.', reason: '"Equipment" is never pluralized in English.' },
        { wrong: 'Recent researches show that...', correct: 'Recent research shows that... / Recent studies show that...', reason: '"Research" is uncountable. Use "research shows" or countable synonym "studies show".' },
      ],
      ieltsTips: [
        'Never write "informations", "advices", "equipments", "researches", or "evidences" in IELTS Writing Task 1 or 2. This is an immediate Band 6 grammatical ceiling penalty.',
      ],
      miniCheck: {
        question: 'Which sentence is grammatically correct?',
        options: [
          'The professor shared several insightful pieces of advice with her students.',
          'The professor shared several insightful advices with her students.',
          'The professor shared an insightful advice with her students.',
          'The professor shared many insightful advices with her students.',
        ],
        correctIndex: 0,
        explanation: 'Because "advice" is uncountable, we use the partitive phrase "pieces of advice" to count individual recommendations.',
      },
    },
    {
      id: 'section-6',
      title: '6. Singular and Plural Nouns (Regular and Irregular)',
      banglaTitle: 'Singular ও Plural Noun (নিয়মিত ও অনিয়মিত রূপ)',
      level: 'Easy / Medium',
      description:
        'Plural nouns indicate more than one item. Most regular nouns add -s, -es, or -ies, but irregular nouns follow unique historical patterns.',
      banglaExplanation:
        'সাধারণত -s, -es, -ies যুক্ত করে Plural করা হয় (যেমন: book → books, city → cities)। কিন্তু Irregular Noun-এ ভেতরের Vowel পরিবর্তন বা বিশেষ রূপ হয় (যেমন: child → children, person → people, criterion → criteria)।',
      rules: [
        'Regular: add -s (book → books), -es for words ending in -s, -ss, -sh, -ch, -x, -z (bus → buses, match → matches).',
        'Consonant + y: change -y to -ies (country → countries, policy → policies).',
        'Vowel + y: add -s only (key → keys, delay → delays).',
        '-f / -fe endings: change to -ves (life → lives, half → halves, leaf → leaves).',
        'Irregular plurals: child → children, person → people, man → men, woman → women, mouse → mice, foot → feet, tooth → teeth.',
        'Academic Greek/Latin plurals: criterion → criteria, phenomenon → phenomena, analysis → analyses, hypothesis → hypotheses, thesis → theses.',
      ],
      examples: [
        { text: 'The researchers examined several distinct phenomena.', breakdown: 'phenomena = plural of phenomenon (academic Greek root)' },
        { text: 'Both analyses confirmed the original hypothesis.', breakdown: 'analyses = plural of analysis' },
        { text: 'The children enjoyed the educational activities.', breakdown: 'children = irregular plural of child (never "childrens")' },
      ],
      commonMistakes: [
        { wrong: 'The childrens are playing outside.', correct: 'The children are playing outside.', reason: '"Children" is already plural. Adding "-s" is incorrect.' },
        { wrong: 'This is an important criteria for evaluation.', correct: 'This is an important criterion for evaluation.', reason: '"Criteria" is plural; the singular form is "criterion".' },
      ],
      ieltsTips: [
        'Using academic plurals correctly (e.g., "these criteria are", "this criterion is") elevates your Lexical Resource and Grammatical Range to Band 8+.',
      ],
      miniCheck: {
        question: 'What is the correct singular form of "hypotheses"?',
        options: ['hypothesis', 'hypothese', 'hypothesy', 'hypothesum'],
        correctIndex: 0,
        explanation: 'Singular is "hypothesis" (ends in -is); plural is "hypotheses" (ends in -es).',
      },
    },
    {
      id: 'section-7',
      title: '7. Possessive Nouns',
      banglaTitle: 'Possessive Noun (মালিকানা বা সম্পর্কসূচক Noun)',
      level: 'Medium',
      description:
        'Possessive nouns show ownership, origin, or association. We form them using apostrophes (\'s or s\').',
      banglaExplanation:
        'মালিকানা বা অধিকার বোঝাতে Possessive Noun ব্যবহৃত হয়। Singular Noun-এর শেষে apostrophe-s (\'s) এবং Plural Noun-এর শেষে কেবল apostrophe (\') বসে (যেমন: the student\'s book vs the students\' classroom)।',
      rules: [
        'Singular noun: add \'s (e.g., the student\'s paper, the researcher\'s lab, James\'s office).',
        'Regular plural ending in -s: add apostrophe only after s (e.g., the students\' grades, the teachers\' union).',
        'Irregular plural not ending in -s: add \'s (e.g., the children\'s playground, people\'s rights, women\'s health).',
        'Joint ownership (shared): John and Mary\'s house (one house owned by both).',
        'Separate ownership: John\'s and Mary\'s houses (two separate houses).',
      ],
      examples: [
        { text: 'The author\'s conclusion was widely supported.', breakdown: 'One author → author\'s (singular possessive)' },
        { text: 'The researchers\' methodologies were published online.', breakdown: 'Multiple researchers → researchers\' (plural possessive)' },
        { text: 'The government protected the children\'s welfare.', breakdown: 'Irregular plural "children" → children\'s' },
      ],
      commonMistakes: [
        { wrong: 'The student\'s had their exam yesterday.', correct: 'The students had their exam yesterday.', reason: 'Do not use an apostrophe for simple plural subjects without possession.' },
        { wrong: 'The childrens\' rights must be protected.', correct: 'The children\'s rights must be protected.', reason: '"Children" is already plural, so we add "\'s", not "s\'".' },
      ],
      ieltsTips: [
        'Avoid confusing plural nouns ("the students") with possessive nouns ("the student\'s book" or "the students\' books") in IELTS Writing.',
      ],
      miniCheck: {
        question: 'Which sentence correctly refers to the work belonging to multiple professors?',
        options: [
          'The professors\' research was recognized internationally.',
          'The professor\'s research was recognized internationally.',
          'The professors research was recognized internationally.',
          'The professores\' research was recognized internationally.',
        ],
        correctIndex: 0,
        explanation: '"Professors\'" with the apostrophe after the plural "s" indicates possession belonging to multiple professors.',
      },
    },
    {
      id: 'section-8',
      title: '8. Noun Formation & Academic Suffixes',
      banglaTitle: 'Noun Formation (Verb ও Adjective থেকে Noun তৈরি)',
      level: 'Medium / Advanced',
      description:
        'In academic English and IELTS Writing, nominalization—turning verbs and adjectives into nouns using suffixes—is critical for concise, formal expression.',
      banglaExplanation:
        'Verb ও Adjective-এর শেষে বিভিন্ন Suffix (যেমন: -tion, -ment, -ance, -ity, -ness) যোগ করে Academic Noun গঠিত হয়। যেমন: develop → development, efficient → efficiency, innovate → innovation।',
      rules: [
        'Verb → Noun with -tion/-sion: educate → education, decide → decision, inform → information, conclude → conclusion.',
        'Verb → Noun with -ment: develop → development, improve → improvement, achieve → achievement, govern → government.',
        'Verb → Noun with -ance/-ence: perform → performance, exist → existence, depend → dependence.',
        'Verb → Noun with -al: approve → approval, propose → proposal, arrive → arrival.',
        'Adjective → Noun with -ity: efficient → efficiency, sustainable → sustainability, flexible → flexibility.',
        'Adjective → Noun with -ness: happy → happiness, aware → awareness, dark → darkness.',
        'Adjective → Noun with -ance/-ence: significant → significance, convenient → convenience, intelligent → intelligence.',
      ],
      examples: [
        { text: 'The rapid development of urban infrastructure requires substantial investment.', breakdown: 'develop (verb) → development (noun)' },
        { text: 'Environmental sustainability should be a national priority.', breakdown: 'sustainable (adj) → sustainability (noun)' },
        { text: 'The government recognized the significance of public healthcare.', breakdown: 'significant (adj) → significance (noun)' },
      ],
      commonMistakes: [
        { wrong: 'The government focuses on economic develop.', correct: 'The government focuses on economic development.', reason: 'After the adjective "economic", a noun form "development" is required.' },
      ],
      ieltsTips: [
        'Nominalization is one of the highest predictors of IELTS Band 7.5 to Band 9 in Writing Task 2. Instead of "When cities develop rapidly, it causes...", write "The rapid development of cities results in...".',
      ],
      miniCheck: {
        question: 'What is the correct noun form of the adjective "efficient"?',
        options: ['efficiency', 'efficientness', 'efficientation', 'efficientment'],
        correctIndex: 0,
        explanation: '"Efficient" (adjective) becomes "efficiency" (abstract noun) by adding "-cy".',
      },
    },
    {
      id: 'section-9',
      title: '9. Noun Functions in Sentences',
      banglaTitle: 'বাক্যে Noun-এর কার্যাবলী (Subject, Object, Complement)',
      level: 'Medium',
      description:
        'Nouns can perform 5 main syntactic functions in English sentences: Subject, Direct Object, Indirect Object, Subject Complement, and Object of a Preposition.',
      banglaExplanation:
        'একটি বাক্যে Noun প্রধানত ৫টি ভূমিকা পালন করে: ১. Subject (কর্তা), ২. Direct Object (কর্ম), ৩. Indirect Object, ৪. Subject Complement (Subject-এর পরিচয়), এবং ৫. Object of Preposition (Preposition-এর পরের Noun)।',
      rules: [
        'Subject: The performer or topic of the verb (e.g., "Technology transforms education.").',
        'Direct Object: Receives the action of the verb directly (e.g., "Students use laptops.").',
        'Indirect Object: Receives the direct object (e.g., "The teacher gave the students feedback.").',
        'Subject Complement: Follows a linking verb (be, become, seem) to rename the subject (e.g., "She became an experienced engineer.").',
        'Object of Preposition: Follows a preposition (in, on, at, about, with) (e.g., "He succeeded through determination.").',
      ],
      examples: [
        { text: 'Artificial intelligence (Subject) creates new opportunities (Direct Object).', breakdown: 'AI = Subject, opportunities = Direct Object' },
        { text: 'Dr. Emily is a renowned professor (Subject Complement).', breakdown: 'professor renames Dr. Emily after linking verb "is"' },
        { text: 'Students benefit from practical training (Object of Preposition).', breakdown: 'training is the object of preposition "from"' },
      ],
      commonMistakes: [
        { wrong: 'The students were given to the prizes.', correct: 'The students were given the prizes.', reason: 'Confusing indirect object with prepositional object.' },
      ],
      ieltsTips: [
        'Varying where and how you use nouns across your clauses prevents repetitive sentence structures in IELTS essays.',
      ],
      miniCheck: {
        question: 'What is the grammatical function of "architect" in this sentence: "After years of rigorous study, Maria became an architect"?',
        options: [
          'Subject Complement',
          'Direct Object',
          'Indirect Object',
          'Object of a Preposition',
        ],
        correctIndex: 0,
        explanation: '"Architect" follows the linking verb "became" and renames the subject "Maria", making it a Subject Complement.',
      },
    },
    {
      id: 'section-10',
      title: '10. Noun + Determiner / Article Combinations',
      banglaTitle: 'Noun ও Determiner / Article-এর ব্যবহার',
      level: 'Medium / Advanced',
      description:
        'Determiners (a, an, the, this, that, these, those, every, each, some, any, my, their) introduce nouns and specify their definiteness, proximity, and quantity.',
      banglaExplanation:
        'Noun-এর পূর্বে বসে তার নির্দিষ্টতা বা সংখ্যা নির্ধারণ করে Determiner। Singular countable noun-এর পূর্বে অবশ্যই কোনো Determiner (a/an/the/my) বসতে হয়।',
      rules: [
        'A singular countable noun CANNOT stand alone without a determiner (e.g., "I saw car" ❌ → "I saw a car" / "I saw the car" ✅).',
        'Plural countable nouns can stand alone when speaking in general (e.g., "Computers have changed our lives.").',
        'Uncountable nouns stand alone when speaking in general (e.g., "Knowledge is power.", NOT "The knowledge is power.").',
        'Demonstratives: this/that (singular: this study, that theory), these/those (plural: these studies, those theories).',
      ],
      examples: [
        { text: 'A student must submit every assignment on time.', breakdown: 'A (indefinite determiner) + student (singular countable noun)' },
        { text: 'These findings challenge established theories.', breakdown: 'These (plural demonstrative) + findings (plural noun)' },
        { text: 'Water is essential for all living organisms.', breakdown: 'Water (uncountable, general) stands without "the"' },
      ],
      commonMistakes: [
        { wrong: 'Student should attend lectures.', correct: 'A student should attend lectures. / Students should attend lectures.', reason: 'Singular countable noun "student" cannot stand alone without a determiner.' },
      ],
      ieltsTips: [
        'Article errors with nouns are the single most frequent reason test-takers get stuck at Band 6.5 in Grammatical Accuracy.',
      ],
      miniCheck: {
        question: 'Which sentence is grammatically correct?',
        options: [
          'University should provide modern facilities for all students.',
          'A university should provide modern facilities for all students.',
          'The universities provides modern facilities for all student.',
          'An university should provide modern facilities for all students.',
        ],
        correctIndex: 1,
        explanation: 'Singular countable "university" requires the determiner "A" (pronunciation starts with consonant /j/ sound).',
      },
    },
    {
      id: 'section-11',
      title: '11. Compound Nouns',
      banglaTitle: 'Compound Noun (যৌগিক বিশেষ্য)',
      level: 'Medium',
      description:
        'A compound noun is made up of two or more words working together as a single noun (e.g., website, classroom, solar panel, climate change, software engineer).',
      banglaExplanation:
        'দুই বা ততোধিক শব্দ একত্রিত হয়ে একটিমাত্র Noun তৈরি করলে তাকে Compound Noun বলে। এটি Closed (website), Open (climate change), বা Hyphenated (decision-making) হতে পারে।',
      rules: [
        'Closed compound: written as a single word (e.g., classroom, website, textbook, framework, rainfall).',
        'Open compound: written as separate words (e.g., climate change, high school, public transport, air pollution).',
        'Hyphenated compound: connected with hyphens (e.g., decision-making, well-being, mother-in-law).',
        'Pluralizing compound nouns: pluralize the principal/head noun (e.g., mother-in-law → mothers-in-law, software engineer → software engineers, passer-by → passers-by).',
      ],
      examples: [
        { text: 'Public transport reduces air pollution in major cities.', breakdown: 'Public transport, air pollution = Open Compound Nouns' },
        { text: 'The board praised his effective decision-making.', breakdown: 'decision-making = Hyphenated Compound Noun' },
        { text: 'The university updated its online textbook database.', breakdown: 'textbook = Closed Compound Noun' },
      ],
      commonMistakes: [
        { wrong: 'My brother-in-laws visited yesterday.', correct: 'My brothers-in-law visited yesterday.', reason: 'Pluralize the principal noun "brother", not "law".' },
      ],
      ieltsTips: [
        'Using precise compound nouns (e.g., "renewable energy sources", "carbon footprint", "urban congestion") demonstrates strong topic-specific vocabulary in IELTS.',
      ],
      miniCheck: {
        question: 'What is the correct plural form of "passer-by"?',
        options: ['passers-by', 'passer-bys', 'passers-bys', 'passer-byes'],
        correctIndex: 0,
        explanation: 'In hyphenated compounds, the primary noun "passer" takes the plural -s: "passers-by".',
      },
    },
    {
      id: 'section-12',
      title: '12. Building Noun Phrases (Crucial for Band 7-9)',
      banglaTitle: 'Noun Phrase তৈরি (ব্যান্ড ৭-৯ অর্জনের মূল চাবিকাঠি)',
      level: 'Advanced / IELTS Advanced',
      description:
        'A noun phrase consists of a head noun accompanied by pre-modifiers (determiners, adverbs, adjectives, noun adjuncts) and post-modifiers (prepositional phrases, participle clauses, relative clauses).',
      banglaExplanation:
        'একটি Head Noun-এর সাথে তার আগের ও পরের বর্ণনামূলক শব্দগুচ্ছ মিলে Noun Phrase তৈরি হয়। যেমন: "a dramatic increase in global temperatures". IELTS-এ জটিল ও তথ্যবহুল বাক্য লিখতে Noun Phrase অপরিহার্য।',
      rules: [
        'Basic structure: Determiner + Adjective + Head Noun (e.g., "a significant increase").',
        'Advanced structure: Determiner + Adverb + Adjective + Head Noun + Prepositional Phrase (e.g., "a dramatically rapid development in artificial intelligence").',
        'Participle post-modifiers: "research conducted by leading scientists" (past participle clause modifying "research").',
        'Relative clause post-modifiers: "the policies that were implemented last year".',
      ],
      examples: [
        {
          text: 'A substantial proportion of university graduates struggle to find employment.',
          breakdown: 'Noun Phrase: "A substantial proportion of university graduates" acting as the sentence subject.',
        },
        {
          text: 'The unprecedented rise in greenhouse gas emissions poses severe risks.',
          breakdown: 'Noun Phrase: "The unprecedented rise in greenhouse gas emissions"',
        },
      ],
      commonMistakes: [
        { wrong: 'It was a very rapidly growth.', correct: 'It was a very rapid growth.', reason: 'Adjectives (rapid) modify nouns (growth), not adverbs (rapidly).' },
      ],
      ieltsTips: [
        'In IELTS Academic Task 1, instead of "Prices increased quickly", write "There was a rapid increase in prices". In Task 2, noun phrases make your arguments sound authoritative and academic.',
      ],
      miniCheck: {
        question: 'Which of the following is a complex Noun Phrase functioning as a subject?',
        options: [
          'A remarkable breakthrough in renewable energy technology',
          'Has been discovered recently by researchers',
          'Quickly and efficiently solved the problem',
          'Because the system was failing constantly',
        ],
        correctIndex: 0,
        explanation: '"A remarkable breakthrough in renewable energy technology" is a complete noun phrase with pre-modifiers and a prepositional phrase post-modifier.',
      },
    },
    {
      id: 'section-13',
      title: '13. Noun Clauses (IELTS Band 8+ Mastery)',
      banglaTitle: 'Noun Clause (উচ্চমানের জটিল বাক্য গঠন)',
      level: 'IELTS Advanced',
      description:
        'A noun clause is a dependent clause that acts as a noun in a sentence. It contains a subject and a verb and can function as a Subject, Object, or Complement.',
      banglaExplanation:
        'Noun Clause হলো এমন একটি Subordinate Clause যা সম্পূর্ণ Noun-এর মতো কাজ করে (Subject বা Object হিসেবে)। এটি সাধারণত that, what, whether, how, why ইত্যাদি দিয়ে শুরু হয়।',
      rules: [
        'Subject Noun Clause: "What the study revealed was deeply concerning."',
        'Object Noun Clause: "Researchers believe that renewable energy is viable."',
        'Complement Noun Clause: "The main argument is that education must remain accessible."',
        'Common noun clause markers: that, what, whatever, whether, if, how, why, where, when.',
      ],
      examples: [
        { text: 'What students need is comprehensive practical training.', breakdown: '"What students need" = Noun Clause functioning as Subject' },
        { text: 'The evidence confirms that global temperatures are rising.', breakdown: '"that global temperatures are rising" = Noun Clause functioning as Direct Object' },
        { text: 'Whether governments should intervene remains a controversial issue.', breakdown: '"Whether governments should intervene" = Noun Clause as Subject' },
      ],
      commonMistakes: [
        { wrong: 'What does the researcher say is important.', correct: 'What the researcher says is important.', reason: 'Noun clauses use statement word order (Subject + Verb), NOT question order (does...say).' },
      ],
      ieltsTips: [
        'Using noun clauses (e.g., "What is undeniable is that...", "Whether this approach will succeed depends on...") shows mastery of Complex Grammatical Structures in IELTS Band 8+.',
      ],
      miniCheck: {
        question: 'Identify the noun clause in this sentence: "Economists argue that automation will create new employment opportunities."',
        options: [
          'that automation will create new employment opportunities',
          'Economists argue',
          'new employment opportunities',
          'argue that automation',
        ],
        correctIndex: 0,
        explanation: '"that automation will create new employment opportunities" is a noun clause acting as the direct object of the verb "argue".',
      },
    },
  ],
};
