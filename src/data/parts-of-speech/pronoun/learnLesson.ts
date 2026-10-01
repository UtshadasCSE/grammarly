import { PronounLesson } from '@/types';

export const pronounLessonData: PronounLesson = {
  id: 'pronoun',
  name: 'Pronoun',
  banglaName: 'সর্বনাম (Pronoun)',
  subtitle: 'Master English Pronouns from Zero to IELTS Advanced Band 9.0',
  introduction:
    'A pronoun is a word that replaces a noun to avoid unnecessary repetition, establish clear grammatical reference, and enhance cohesion in sentences and academic texts.',
  introductionBangla:
    'Pronoun হলো এমন শব্দ যা বাক্যে Noun-এর পুনরাবৃত্তি দূর করতে Noun-এর পরিবর্তে ব্যবহৃত হয় এবং বাক্যকে সুন্দর ও স্পষ্ট করে তোলে।',
  interactiveSentence: [
    { text: 'She', role: 'Subject Pronoun', partOfSpeech: 'Subject Pronoun', color: '#6366f1', explanation: 'Replaces a specific female noun (Subject of the sentence)' },
    { text: 'gave', role: 'Verb (Past Simple)', partOfSpeech: 'Verb', color: '#06b6d4', explanation: 'The action performed' },
    { text: 'him', role: 'Object Pronoun', partOfSpeech: 'Object Pronoun', color: '#10b981', explanation: 'Replaces a male noun receiving the indirect object action' },
    { text: 'her', role: 'Possessive Determiner', partOfSpeech: 'Possessive Determiner', color: '#f59e0b', explanation: 'Modifies the noun "book" to indicate ownership' },
    { text: 'book', role: 'Noun (Direct Object)', partOfSpeech: 'Noun', color: '#ec4899', explanation: 'Direct object noun' },
    { text: 'yesterday.', role: 'Adverb of Time', partOfSpeech: 'Adverb', color: '#8b5cf6', explanation: 'Specifies when the action happened' },
  ],
  sections: [
    {
      id: 'what-is-pronoun',
      title: '1. What is a Pronoun? (সর্বনাম কী?)',
      banglaTitle: 'সর্বনাম পরিচিতি ও প্রাথমিক ধারণা',
      level: 'Zero / Beginner',
      description:
        'A pronoun is a word used in place of a noun. It prevents boring repetition and makes communication natural and fluent.',
      banglaExplanation:
        'বারবার একই Noun ব্যবহার না করে তার জায়গায় যে শব্দ ব্যবহার করা হয় তাকে Pronoun বলে।',
      rules: [
        'A pronoun takes the place of a noun or a noun phrase (known as the antecedent).',
        'Repetitive: "Utsha is a developer. Utsha works with React. Utsha built an app." -> Fluent: "Utsha is a developer. He works with React. He built an app."',
        'Pronouns must clearly match the noun they replace in number, gender, and grammatical case.',
      ],
      examples: [
        {
          text: 'Utsha is a software engineer. He develops interactive learning applications.',
          breakdown: 'Utsha (Noun) → He (Pronoun replacing Utsha)',
          note: '"He" prevents repeating the name "Utsha".',
        },
        {
          text: 'The university announced its new academic calendar today.',
          breakdown: 'The university (Singular Institution Noun) → its (Singular Neuter Pronoun / Determiner)',
          note: 'Use "it / its" for non-human entities and organizations.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Rahim is my friend. Rahim lives in London. Rahim loves football.',
          correct: 'Rahim is my friend. He lives in London and he loves football.',
          reason: 'Overusing the noun makes English sound unnatural and repetitive.',
        },
      ],
      ieltsTips: [
        'In IELTS Academic Writing Task 2, using accurate pronouns provides essential lexical cohesion and avoids word redundancy.',
      ],
      miniCheck: {
        question: 'In the sentence "Sarah completed the project because she worked hard", what word is the pronoun?',
        options: ['project', 'she', 'Sarah', 'worked'],
        correctIndex: 1,
        explanation: '"she" replaces the noun "Sarah" as the subject of the subordinate clause.',
        simpleExplanation: '"she" is the pronoun replacing Sarah.',
      },
    },
    {
      id: 'personal-pronouns',
      title: '2. Personal Pronouns: Subject vs. Object (ব্যক্তিবাচক সর্বনাম)',
      banglaTitle: 'Subject ও Object Pronoun-এর পার্থক্য',
      level: 'Beginner',
      description:
        'Personal pronouns change their form (case) depending on whether they perform the action (subject) or receive the action (object).',
      banglaExplanation:
        'Subject হিসেবে বসে: I, you, he, she, it, we, they। Object হিসেবে বসে: me, you, him, her, it, us, them।',
      rules: [
        'Subject Pronouns (I, You, He, She, It, We, They): Perform the verb action.',
        'Object Pronouns (Me, You, Him, Her, It, Us, Them): Receive the verb action or follow a preposition.',
        'Formula: [Subject Pronoun] + [Verb] + [Object Pronoun]. Example: "She helped him."',
      ],
      examples: [
        {
          text: 'She called me yesterday evening to discuss the test.',
          breakdown: 'She (Subject Pronoun) + called (Verb) + me (Object Pronoun)',
          note: '"She" does the calling; "me" receives the call.',
        },
        {
          text: 'We invited them to join our research team.',
          breakdown: 'We (Subject Pronoun) + invited (Verb) + them (Object Pronoun)',
          note: '"Them" is the object pronoun for a group of people.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Him and me went to the library.',
          correct: 'He and I went to the library.',
          reason: '"He" and "I" are subject pronouns and must be used as the grammatical subject of the sentence.',
        },
        {
          wrong: 'The professor gave the book to he.',
          correct: 'The professor gave the book to him.',
          reason: 'Prepositions (to, with, for, between) are followed by object pronouns (him, me, them).',
        },
      ],
      ieltsTips: [
        'Always check compound subjects in IELTS essays: "My supervisor and I designed the experiment" (NOT "me and my supervisor").',
      ],
      miniCheck: {
        question: 'Choose the correct pronoun: "The director invited Dr. Rahman and ______ to speak at the conference."',
        options: ['I', 'me', 'he', 'they'],
        correctIndex: 1,
        explanation: '"Dr. Rahman and me" is the compound direct object of the verb "invited", requiring the object pronoun "me".',
        simpleExplanation: 'Use "me" because it is receiving the invitation (object).',
      },
    },
    {
      id: 'possessive-pronouns',
      title: '3. Possessive Pronouns vs. Possessive Determiners (মালিকানাসূচক সর্বনাম)',
      banglaTitle: 'Possessive Pronoun (mine/yours) বনাম Determiner (my/your)',
      level: 'Easy',
      description:
        'Possessive determiners (my, your, his, her, its, our, their) come BEFORE a noun. Possessive pronouns (mine, yours, his, hers, ours, theirs) STAND ALONE and replace the noun entirely.',
      banglaExplanation:
        'Determiner Noun-এর আগে বসে (my car), কিন্তু Possessive Pronoun একাই বসে (This car is mine)।',
      rules: [
        'Possessive Determiner + Noun: "This is my research paper."',
        'Possessive Pronoun (No Noun follows): "This research paper is mine."',
        'Chart: my → mine | your → yours | his → his | her → hers | our → ours | their → theirs.',
        'Never use an apostrophe in possessive pronouns: yours (NOT your\'s), theirs (NOT their\'s), its (NOT it\'s).',
      ],
      examples: [
        {
          text: 'Your methodology is effective, but ours yields higher accuracy.',
          breakdown: 'Your (Determiner + Noun) vs. ours (Possessive Pronoun replacing "our methodology")',
          note: '"Ours" avoids repeating the word "methodology".',
        },
        {
          text: 'Is that tablet yours or his?',
          breakdown: 'yours (Possessive Pronoun) | his (Possessive Pronoun)',
          note: 'Both words stand alone without repeating "tablet".',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The car lost it\'s tire.',
          correct: 'The car lost its tire.',
          reason: '"its" is possessive; "it\'s" is a contraction of "it is" or "it has".',
        },
        {
          wrong: 'This laptop is my.',
          correct: 'This laptop is mine.',
          reason: '"my" requires a following noun; "mine" stands alone as a possessive pronoun.',
        },
      ],
      ieltsTips: [
        'In academic writing, distinguish carefully between "its" (possessive) and "it\'s" (contraction). Contractions are prohibited in formal IELTS writing.',
      ],
      miniCheck: {
        question: 'Select the correct sentence:',
        options: [
          'That research conclusion is her.',
          'That research conclusion is hers.',
          'That research conclusion is her\'s.',
          'That research conclusion is she.',
        ],
        correctIndex: 1,
        explanation: '"hers" is the stand-alone possessive pronoun. It does not take an apostrophe.',
        simpleExplanation: '"hers" means "her conclusion" and stands alone.',
      },
    },
    {
      id: 'reflexive-and-emphatic',
      title: '4. Reflexive and Emphatic Pronouns (আত্মবাচক ও জোর প্রদানকারী সর্বনাম)',
      banglaTitle: 'Reflexive (myself/himself) ও Emphatic Pronoun-এর ব্যবহার',
      level: 'Easy / Medium',
      description:
        'Reflexive pronouns (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) are used when the subject and object are the SAME person or to emphasize who did the action.',
      banglaExplanation:
        'কর্তা নিজে কোনো কাজ নিজের ওপর করলে Reflexive (He hurt himself) এবং জোর দিয়ে বোঝালে Emphatic (The president himself visited) হয়।',
      rules: [
        'Reflexive Use: Subject and object refer to the same entity. "She taught herself Python."',
        'Emphatic (Intensive) Use: Adds emphasis to a noun or pronoun. "The director himself signed the document."',
        'Singular forms end in -self (myself, himself); Plural forms end in -selves (ourselves, themselves).',
        'Standard English rule: "theirselves" and "hisself" DO NOT exist in standard English.',
      ],
      examples: [
        {
          text: 'The automated system recalibrates itself every twelve hours.',
          breakdown: 'The system (Subject) → recalibrates (Verb) → itself (Reflexive Object)',
          note: 'The subject and object are the same system.',
        },
        {
          text: 'I myself conducted the laboratory interviews.',
          breakdown: 'I (Subject) + myself (Emphatic Pronoun for emphasis)',
          note: 'Emphasizes that I personally did it.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Please send the report to myself.',
          correct: 'Please send the report to me.',
          reason: 'Do not use a reflexive pronoun where a simple object pronoun "me" is required.',
        },
        {
          wrong: 'They prepared the presentation by theirselves.',
          correct: 'They prepared the presentation by themselves.',
          reason: '"theirselves" is non-standard English; the correct plural form is "themselves".',
        },
      ],
      ieltsTips: [
        'In IELTS Speaking Part 1, you can use reflexive pronouns naturally: "I taught myself how to play the guitar during lockdown."',
      ],
      miniCheck: {
        question: 'Choose the correct form: "The candidates prepared ______ thoroughly for the IELTS examination."',
        options: ['themself', 'themselves', 'theirselves', 'theirs'],
        correctIndex: 1,
        explanation: '"The candidates" is plural, requiring the plural reflexive pronoun "themselves".',
        simpleExplanation: 'Use "themselves" for plural groups.',
      },
    },
    {
      id: 'demonstrative-pronouns',
      title: '5. Demonstrative Pronouns: This, That, These, Those (নির্দেশক সর্বনাম)',
      banglaTitle: 'নিকটবর্তী ও দূরবর্তী বস্তু নির্দেশক সর্বনাম',
      level: 'Easy / Medium',
      description:
        'Demonstrative pronouns point to specific items in terms of distance (near vs. far) and number (singular vs. plural).',
      banglaExplanation:
        'কাছের একটি বোঝাতে This, কাছের একাধিক বোঝাতে These; দূরের একটি বোঝাতে That, দূরের একাধিক বোঝাতে Those ব্যবহৃত হয়।',
      rules: [
        'Near in space/time: THIS (singular), THESE (plural). Example: "This is my laptop; these are my notes."',
        'Far in space/time: THAT (singular), THOSE (plural). Example: "That was a difficult exam; those are the results."',
        'Demonstrative Pronoun (stands alone): "This is remarkable."',
        'Demonstrative Determiner (precedes a noun): "This finding is remarkable."',
      ],
      examples: [
        {
          text: 'These are the primary variables analyzed in the climate study.',
          breakdown: 'These (Plural Demonstrative Pronoun) + are (Plural Verb)',
          note: 'Refers to multiple items close in context.',
        },
        {
          text: 'The air quality in rural areas is cleaner than that of metropolitan cities.',
          breakdown: 'that (Singular Demonstrative Pronoun replacing "the air quality")',
          note: 'Advanced IELTS comparison structure avoiding repetitive nouns.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'These is the main reason for the economic downturn.',
          correct: 'This is the main reason for the economic downturn.',
          reason: '"reason" is singular, so the singular demonstrative "this" must be used.',
        },
        {
          wrong: 'The salary of an engineer is higher than a teacher.',
          correct: 'The salary of an engineer is higher than that of a teacher.',
          reason: 'In formal comparison, use "that of" to compare the salary, not the person.',
        },
      ],
      ieltsTips: [
        'Use "that of" (singular) and "those of" (plural) in IELTS Writing Task 1 to compare data points without repeating nouns: "The exports of Japan exceeded those of Germany."',
      ],
      miniCheck: {
        question: 'Complete the comparison: "The energy consumption rates of developed nations are significantly higher than ______ of developing countries."',
        options: ['this', 'that', 'these', 'those'],
        correctIndex: 3,
        explanation: '"rates" is plural, so the plural demonstrative pronoun "those" is required to replace "the energy consumption rates".',
        simpleExplanation: '"those" replaces the plural noun "rates".',
      },
    },
    {
      id: 'interrogative-pronouns',
      title: '6. Interrogative Pronouns: Who, Whom, Whose, Which, What (প্রশ্নবোধক সর্বনাম)',
      banglaTitle: 'প্রশ্ন তৈরির ক্ষেত্রে সর্বনামের সঠিক ব্যবহার',
      level: 'Medium',
      description:
        'Interrogative pronouns are used to ask direct and embedded questions about people, things, and possession.',
      banglaExplanation:
        'ব্যক্তি (subject) জানতে Who, ব্যক্তি (object) জানতে Whom, মালিকানা জানতে Whose, নির্দিষ্ট পছন্দ জানতে Which এবং তথ্য জানতে What ব্যবহৃত হয়।',
      rules: [
        'WHO: Inquires about the subject (person). "Who authored this report?" (He/She authored it).',
        'WHOM: Inquires about the object (person), especially after prepositions. "To whom was the letter addressed?"',
        'WHOSE: Inquires about possession. "Whose hypothesis proved accurate?"',
        'WHICH: Inquires about a specific choice from a limited set. "Which of the two candidates was selected?"',
        'WHAT: Inquires about general things or information. "What caused the financial crisis?"',
      ],
      examples: [
        {
          text: 'Who presented the keynote lecture at the international conference?',
          breakdown: 'Who (Interrogative Subject Pronoun) + presented (Verb)',
          note: 'Asking for the person who performed the presentation.',
        },
        {
          text: 'Whom did the committee nominate for the prestigious fellowship?',
          breakdown: 'Whom (Interrogative Object Pronoun) + did the committee nominate (Verb Phrase)',
          note: 'Asking for the person receiving the nomination.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Who did you give the scholarship to? (Formal written)',
          correct: 'To whom did you give the scholarship? / Whom did you give the scholarship to?',
          reason: 'In formal academic English, "whom" is required as the object of a preposition.',
        },
        {
          wrong: 'Who\'s research paper is on the table?',
          correct: 'Whose research paper is on the table?',
          reason: '"Whose" indicates possession; "who\'s" is the contraction of "who is".',
        },
      ],
      ieltsTips: [
        'In IELTS Speaking Part 3, using accurate embedded questions showcases high grammatical range: "It is crucial to consider whom this policy ultimately benefits."',
      ],
      miniCheck: {
        question: 'Choose the correct formal option: "______ was appointed as the chief research director?"',
        options: ['Whom', 'Who', 'Whose', 'Which'],
        correctIndex: 1,
        explanation: 'The question asks for the subject who was appointed, so "Who" is correct.',
        simpleExplanation: '"Who" is the subject doing/receiving the main state.',
      },
    },
    {
      id: 'relative-pronouns',
      title: '7. Relative Pronouns: Who, Whom, Whose, Which, That (সম্পর্কবাচক সর্বনাম)',
      banglaTitle: 'Relative Clause ও জটিল বাক্য গঠনে সর্বনাম',
      level: 'Medium / Core',
      description:
        'Relative pronouns connect a dependent relative clause to an antecedent noun, allowing you to combine ideas into sophisticated complex sentences.',
      banglaExplanation:
        'দুটি বাক্যকে যুক্ত করতে ব্যক্তির জন্য who/whom, বস্তুর জন্য which/that এবং মালিকানায় whose ব্যবহৃত হয়।',
      rules: [
        'WHO: For people as subjects. "The professor who taught economics retired."',
        'WHOM: For people as objects (formal/prepositional). "The student with whom I collaborated scored band 8.5."',
        'WHICH: For non-human entities in non-defining clauses (with commas) or defining clauses. "The experiment, which began in 2020, concluded successfully."',
        'THAT: For people or things in essential/defining relative clauses (no commas). "The evidence that was presented convinced the panel."',
        'WHOSE: Indicates possession for people or objects. "The scholar whose paper won the award is giving a lecture."',
      ],
      examples: [
        {
          text: 'Artificial intelligence technologies that automate routine tasks enhance workforce efficiency.',
          breakdown: 'technologies (Noun) + that automate routine tasks (Defining Relative Clause)',
          note: '"That" introduces essential defining information without commas.',
        },
        {
          text: 'Dr. Johnson, whose empirical research revolutionized renewable energy, received a grant.',
          breakdown: 'Dr. Johnson (Antecedent) + whose empirical research (Possessive Relative Clause)',
          note: 'Non-defining clause set off by commas.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The student which scored the highest mark was awarded a gold medal.',
          correct: 'The student who scored the highest mark was awarded a gold medal.',
          reason: 'Use "who" for human beings, not "which".',
        },
        {
          wrong: 'The book, that I read yesterday, was informative.',
          correct: 'The book, which I read yesterday, was informative.',
          reason: 'In non-defining relative clauses (enclosed in commas), use "which", not "that".',
        },
      ],
      ieltsTips: [
        'Mastering defining vs. non-defining relative clauses with "which" and "who" is one of the fastest ways to score Band 7.0+ in IELTS Grammatical Range and Accuracy.',
      ],
      miniCheck: {
        question: 'Select the grammatically correct sentence for academic writing:',
        options: [
          'The participants which were selected received formal training.',
          'The participants who were selected received formal training.',
          'The participants whom were selected received formal training.',
          'The participants whose was selected received formal training.',
        ],
        correctIndex: 1,
        explanation: '"participants" are human subjects of the clause "were selected", so "who" is the correct relative pronoun.',
        simpleExplanation: 'Use "who" for people acting as subjects.',
      },
    },
    {
      id: 'indefinite-pronouns',
      title: '8. Indefinite Pronouns & Subject-Verb Agreement (অনির্দিষ্ট সর্বনাম)',
      banglaTitle: 'Indefinite Pronoun ও এদের সাথে Verb-এর Singular/Plural নিয়ম',
      level: 'Medium / Advanced',
      description:
        'Indefinite pronouns refer to non-specific people, objects, or amounts. Understanding their singular vs. plural nature is vital for subject-verb agreement.',
      banglaExplanation:
        'Everyone, everybody, someone, nobody, each, either, neither সর্বদা SINGULAR verb গ্রহণ করে।',
      rules: [
        'Always Singular: Everyone, everybody, everything, someone, somebody, something, anyone, anybody, anything, no one, nobody, nothing, each, either, neither. Example: "Everyone is present." (NOT "are")',
        'Always Plural: Both, few, fewer, many, others, several. Example: "Both of the studies were published."',
        'Variable (Singular or Plural based on noun): All, any, more, most, none, some. Example: "Some of the water IS contaminated" vs. "Some of the students ARE absent."',
      ],
      examples: [
        {
          text: 'Each of the participants was given an individualized questionnaire.',
          breakdown: 'Each (Singular Indefinite Pronoun) + of the participants + was given (Singular Verb)',
          note: 'Even though "participants" is plural, "Each" is singular.',
        },
        {
          text: 'Neither of the proposed solutions is feasible under current economic constraints.',
          breakdown: 'Neither (Singular Indefinite Pronoun) + is (Singular Verb)',
          note: '"Neither" strictly takes a singular verb in academic English.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Everyone in the conference room have submitted their feedback.',
          correct: 'Everyone in the conference room has submitted their feedback.',
          reason: '"Everyone" is grammatically singular and requires the singular verb "has".',
        },
        {
          wrong: 'Each students should bring their own calculator.',
          correct: 'Each student should bring their own calculator. / Each of the students should...',
          reason: '"Each" modifies a singular noun ("student") or takes a partitive phrase ("each of the students").',
        },
      ],
      ieltsTips: [
        'Subject-verb agreement errors with "everyone/each/neither" are among the most penalized grammatical mistakes in IELTS Writing Task 2.',
      ],
      miniCheck: {
        question: 'Identify the correct sentence:',
        options: [
          'Neither of the arguments are supported by empirical evidence.',
          'Neither of the arguments is supported by empirical evidence.',
          'Neither of the argument are supported by empirical evidence.',
          'Neither of the arguments were supported without any evidence.',
        ],
        correctIndex: 1,
        explanation: '"Neither of the arguments" has the singular pronoun "Neither" as its subject, requiring the singular verb "is".',
        simpleExplanation: '"Neither" takes the singular verb "is".',
      },
    },
    {
      id: 'reciprocal-and-distributive',
      title: '9. Reciprocal & Distributive Pronouns (পারস্পরিক ও বণ্টনমূলক সর্বনাম)',
      banglaTitle: 'Each other, One another, Each, Either, Neither-এর ব্যবহার',
      level: 'Medium / Advanced',
      description:
        'Reciprocal pronouns express mutual actions between two or more parties, while distributive pronouns single out individuals within a group.',
      banglaExplanation:
        'দুজনের মধ্যে পারস্পরিক বোঝাতে each other, দুইয়ের বেশিতে one another; পৃথকভাবে বোঝাতে each/either/neither ব্যবহৃত হয়।',
      rules: [
        'EACH OTHER: Traditional reference to two parties. "The two rival companies collaborated with each other."',
        'ONE ANOTHER: Reference to three or more parties. "Members of the multidisciplinary team supported one another."',
        'DISTRIBUTIVE (Each, Either, Neither): Refers to persons or things taken one at a time. "Either of the dates is convenient."',
      ],
      examples: [
        {
          text: 'International organizations must cooperate with one another to mitigate climate change.',
          breakdown: 'International organizations (Plural) + with one another (Reciprocal Pronoun for multiple entities)',
          note: 'Refers to mutual global collaboration.',
        },
        {
          text: 'Either of the proposed transport routes is capable of handling peak traffic.',
          breakdown: 'Either (Distributive Pronoun) + is (Singular Verb)',
          note: 'Refers to one of two valid options individually.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The two students helped one another with the project.',
          correct: 'The two students helped each other with the project.',
          reason: 'Use "each other" when specifically referring to two individuals.',
        },
      ],
      ieltsTips: [
        'Use reciprocal structures in IELTS speaking and writing: "Societies thrive when citizens respect one another\'s cultural backgrounds."',
      ],
      miniCheck: {
        question: 'Fill in the blank: "The twin brothers always encourage ______ before academic competitions."',
        options: ['one another', 'each other', 'themselves', 'themself'],
        correctIndex: 1,
        explanation: 'Because there are two brothers (twins), "each other" is the standard reciprocal pronoun.',
        simpleExplanation: 'Use "each other" for two people.',
      },
    },
    {
      id: 'pronoun-reference-and-ambiguity',
      title: '10. Pronoun Reference & Avoiding Ambiguity (সর্বনামের স্পষ্টতা ও দ্বিধামুক্ত বাক্য)',
      banglaTitle: 'Pronoun-এর অস্পষ্ট রেফারেন্স দূরীকরণ (IELTS Writing Band 8+)',
      level: 'Advanced',
      description:
        'Pronoun ambiguity occurs when a pronoun could refer to more than one preceding noun. In IELTS Academic Writing, ambiguous reference severely degrades coherence and task achievement.',
      banglaExplanation:
        'একটি বাক্যে pronoun কোন noun-কে বোঝাচ্ছে তা একদম স্পষ্ট হতে হবে, যেন পাঠকের মনে কোনো বিভ্রান্তি তৈরি না হয়।',
      rules: [
        'Clear Antecedent Rule: Every pronoun must have exactly ONE logical and unmistakable noun antecedent.',
        'Ambiguous: "The teacher told the student that he failed the exam." (Who failed? The teacher or student?)',
        'Clear: "The teacher informed the student, \'You failed the exam,\'" or "The teacher told the student that the student had failed."',
        'Avoid broad "this/that/it" referring to an entire vague idea. Instead, use a summary noun: "This trend indicates...", "This policy failure demonstrates..."',
      ],
      examples: [
        {
          text: 'Ambiguous: The government introduced subsidies for renewable energy companies, but they soon collapsed.',
          breakdown: 'Unclear whether "they" refers to the subsidies or the companies.',
          note: 'Improved: "...subsidies for renewable energy companies, but these businesses soon collapsed."',
        },
        {
          text: 'Precise IELTS Reference: Urbanization accelerated rapidly in the 1990s. This demographic shift created immense housing pressures.',
          breakdown: 'This + demographic shift (Demonstrative Determiner + Summary Noun Phrase)',
          note: 'Replacing a vague "This" with "This demographic shift" elevates academic cohesion.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'When the laptop fell on the glass table, it broke.',
          correct: 'When the laptop fell on the glass table, the table broke. / ...the laptop broke.',
          reason: '"it" is completely ambiguous because both the laptop and the glass table could break.',
        },
      ],
      ieltsTips: [
        'Never write a sentence beginning with a naked "This means that..." in IELTS Writing Task 2. Always qualify it: "This development implies that..." or "This statistical pattern suggests that..."',
      ],
      miniCheck: {
        question: 'Which sentence avoids ambiguous pronoun reference?',
        options: [
          'After the car hit the traffic pole, it was towed away.',
          'After the car hit the traffic pole, the damaged vehicle was towed away.',
          'After the car hit the traffic pole, they towed it away immediately.',
          'After the car hit the traffic pole, it got destroyed.',
        ],
        correctIndex: 1,
        explanation: 'Replacing the vague pronoun "it" with "the damaged vehicle" eliminates any confusion with the traffic pole.',
        simpleExplanation: 'Explicitly naming "the damaged vehicle" removes ambiguity.',
      },
    },
    {
      id: 'pronoun-antecedent-agreement',
      title: '11. Pronoun-Antecedent Agreement & Singular "They" (সর্বনামের সঙ্গতি ও Singular They)',
      banglaTitle: 'Pronoun ও Antecedent-এর মিল এবং আধুনিক Singular "They"',
      level: 'Advanced',
      description:
        'A pronoun must agree with its antecedent in gender and number. Modern standard and academic English fully accepts singular "they" for gender-neutral singular individuals.',
      banglaExplanation:
        'একবচন Noun-এর সাথে একবচন Pronoun এবং বহুবচনের সাথে বহুবচন Pronoun বসাতে হয়। নির্দিষ্ট জেন্ডার জানা না থাকলে "they/them/their" ব্যবহার আধুনিক ও সর্বজনগ্রাহ্য।',
      rules: [
        'Traditional: "A student must submit his or her assignment before Friday."',
        'Modern Standard & Academic: "A student must submit their assignment before Friday."',
        'Singular Antecedents with Indefinite Pronouns: "If anyone calls, tell them I am in a meeting."',
        'Collective Nouns as Units (US/Standard IELTS): "The committee reached its decision" (treating committee as a single unit).',
      ],
      examples: [
        {
          text: 'Every prospective applicant must verify their eligibility prior to submitting the online form.',
          breakdown: 'applicant (Singular) → their (Gender-neutral Singular Pronoun)',
          note: 'Universally accepted in IELTS and academic journals.',
        },
        {
          text: 'The municipal council published its annual sustainability audit.',
          breakdown: 'The municipal council (Single institution) → its (Singular neuter)',
          note: 'Use "its" when treating an organization as a singular entity.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The multinational corporation changed their logo.',
          correct: 'The multinational corporation changed its logo.',
          reason: 'A corporation is a singular legal entity and takes the neuter singular possessive "its".',
        },
      ],
      ieltsTips: [
        'Using singular "they/their" avoids clunky repetitions of "he/she" and "his/her" in your IELTS essays.',
      ],
      miniCheck: {
        question: 'Choose the best pronoun: "The university announced that ______ will offer five new scholarships next semester."',
        options: ['they', 'it', 'them', 'theirs'],
        correctIndex: 1,
        explanation: '"The university" is a singular institution acting as a unified body, so "it" is the correct pronoun.',
        simpleExplanation: 'Use "it" for a singular institution.',
      },
    },
    {
      id: 'pronouns-after-prepositions-comparisons',
      title: '12. Pronouns After Prepositions & in Comparisons (Preposition ও তুলনামূলক বাক্যে Pronoun)',
      banglaTitle: 'Between you and me এবং Than I / Than me-এর সঠিক ব্যবহার',
      level: 'Advanced / IELTS Advanced',
      description:
        'Prepositions strictly govern object pronouns. In comparisons with "than" and "as", standard formal English adheres to parallel clause structures.',
      banglaExplanation:
        'Preposition-এর পর সর্বদা Object Pronoun (me, him, her, us, them) বসে (Between you and me)। Comparisons-এ formal English-এ "than I (am)" ব্যবহৃত হয়।',
      rules: [
        'Rule 1 (Prepositions): Always use object pronouns after prepositions (between, with, for, except, like). "Between you and me" (NOT "between you and I").',
        'Rule 2 (Formal Comparison): "She scored higher on the IELTS reading test than I [did / am]."',
        'Rule 3 (Informal Comparison): "She scored higher than me" is common in speech, but formal academic writing prefers explicit elliptical clauses ("than I did").',
      ],
      examples: [
        {
          text: 'The confidential agreement remains strictly between the senior investigator and me.',
          breakdown: 'between (Preposition) + senior investigator + and me (Object Pronoun)',
          note: 'Never say "between the investigator and I".',
        },
        {
          text: 'Dr. Rahman has published more peer-reviewed papers than she has.',
          breakdown: 'than (Comparative Conjunction) + she (Subject) + has (Auxiliary Verb)',
          note: 'Formal parallel comparison structure.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Everyone attended the conference except he and I.',
          correct: 'Everyone attended the conference except him and me.',
          reason: '"Except" functions as a preposition here and requires object pronouns ("him and me").',
        },
        {
          wrong: 'Between you and I, the initial hypothesis was flawed.',
          correct: 'Between you and me, the initial hypothesis was flawed.',
          reason: '"Between" is a preposition requiring the object pronoun "me".',
        },
      ],
      ieltsTips: [
        'In IELTS Speaking Part 3, using "Between you and me" incorrectly as "Between you and I" is a classic hypercorrection error that examiners notice immediately.',
      ],
      miniCheck: {
        question: 'Select the grammatically accurate sentence for formal discourse:',
        options: [
          'The research coordinator divided the responsibilities between Tariq and I.',
          'The research coordinator divided the responsibilities between Tariq and me.',
          'The research coordinator divided the responsibilities between Tariq and myself.',
          'The research coordinator divided the responsibilities between Tariq and mine.',
        ],
        correctIndex: 1,
        explanation: '"between" is a preposition and governs the object pronoun "me".',
        simpleExplanation: 'Prepositions take object pronouns like "me".',
      },
    },
    {
      id: 'ielts-pronoun-cohesion-mastery',
      title: '13. IELTS Cohesion & Pronoun Mastery (IELTS কোহিশন ও ব্যান্ড ৯ টেকনিক)',
      banglaTitle: 'আইইএলটিএস রাইটিংয়ে রিপিটেশন কমানো ও কোহিশন বৃদ্ধি',
      level: 'IELTS Advanced',
      description:
        'In IELTS Academic Writing, Band 8 and 9 descriptors require seamless cohesion through reference and substitution without mechanical transitions or confusing pronouns.',
      banglaExplanation:
        'আইইএলটিএস-এ বারবার একই শব্দ না লিখে pronoun ও demonstrative phrase (such policies, these measures) দিয়ে নিখুঁত কোহিশন তৈরি করতে হয়।',
      rules: [
        'Technique 1 (Lexical Variation): Replace recurring nouns with anaphoric pronouns (it, they, these).',
        'Technique 2 (Summary Reference): Combine demonstratives with abstract nouns: "these measures", "this phenomenon", "such advancements".',
        'Technique 3 (Relative Clause Synthesis): Merge two simple sentences into one sophisticated complex sentence using relative pronouns.',
      ],
      examples: [
        {
          text: 'Governments frequently invest in public transport infrastructure. Such investments not only ease urban congestion but also reduce carbon emissions, which directly benefits public health.',
          breakdown: 'Such investments (Demonstrative + Noun) | which directly benefits (Sentential Relative Pronoun referring to the whole preceding clause)',
          note: 'Exemplifies Band 9.0 cohesion and sentence architecture.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Governments should tax fossil fuels. This will solve pollution. This will also help green energy.',
          correct: 'Governments should tax fossil fuels, a policy that would simultaneously curb pollution and accelerate investment in renewable energy.',
          reason: 'Overusing bare "This" makes writing feel mechanical and unacademic.',
        },
      ],
      ieltsTips: [
        'Examiners award high marks for sentential relative clauses with "which" (referring back to an entire clause): "Deforestation continues at an alarming rate, which threatens biodiversity."',
      ],
      miniCheck: {
        question: 'Which revision best enhances cohesion? Original: "The government subsidized solar panels. Subsidizing solar panels encouraged households to adopt renewable energy."',
        options: [
          'The government subsidized solar panels. The solar panels subsidized encouraged households to adopt renewable energy.',
          'The government subsidized solar panels, a measure which encouraged households to adopt renewable energy.',
          'The government subsidized solar panels and it did that because solar panels are good.',
          'The government subsidized solar panels so that solar panels did encourage households to adopt renewable energy.',
        ],
        correctIndex: 1,
        explanation: '"a measure which encouraged..." uses a summary noun phrase with a relative pronoun, creating seamless academic cohesion.',
        simpleExplanation: 'Using "a measure which..." combines the ideas elegantly.',
      },
    },
  ],
};
