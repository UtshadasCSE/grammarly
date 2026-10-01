import { VerbLesson } from '@/types';

export const verbLessonData: VerbLesson = {
  id: 'verb',
  name: 'Verb',
  banglaName: 'ক্রিয়া পদ (Verb)',
  subtitle: 'Master English Verbs from Zero to IELTS Advanced Band 9.0',
  introduction:
    'A verb is the core engine of every English sentence. It expresses actions, events, states of being, or dynamic processes, and governs sentence tense, aspect, voice, and agreement.',
  introductionBangla:
    'Verb বা ক্রিয়া হলো বাক্যের মূল চালিকাশক্তি যা কোনো কাজ করা, অবস্থা, ঘটনা বা প্রক্রিয়া নির্দেশ করে এবং Tense, Voice ও Agreement নিয়ন্ত্রণ করে।',
  interactiveSentence: [
    { text: 'The researchers', role: 'Subject Noun Phrase', color: '#6366f1', explanation: 'The agents performing the action' },
    { text: 'have', role: 'Auxiliary Verb (Helping Verb)', color: '#06b6d4', explanation: 'Present Perfect auxiliary indicating completed action with present relevance' },
    { text: 'been analyzing', role: 'Main Verb Phrase (-ing continuous aspect)', color: '#10b981', explanation: 'Main lexical action showing an ongoing analytical process' },
    { text: 'the climate data', role: 'Direct Object', color: '#f59e0b', explanation: 'The entity receiving the analytical action (Transitive verb object)' },
    { text: 'to evaluate', role: 'Infinitive Verb (Purpose)', color: '#ec4899', explanation: 'To + base verb expressing the objective/purpose of the research' },
    { text: 'global emissions.', role: 'Infinitive Object Phrase', color: '#8b5cf6', explanation: 'Target of the evaluation' },
  ],
  sections: [
    {
      id: 'what-is-verb',
      title: '1. What is a Verb? (Verb বা ক্রিয়া কী?)',
      banglaTitle: 'ক্রিয়া পরিচিতি ও প্রাথমিক ধারণা',
      level: 'Zero / Beginner',
      description:
        'A verb is a word that describes an action (run, write), an event (happen, occur), a state of being (know, seem, be), or a process (develop, evolve). Every complete English sentence MUST contain at least one verb.',
      banglaExplanation:
        'যে শব্দ দ্বারা কোনো কিছু করা, হওয়া, থাকা, ঘটা বা কোনো অবস্থা বোঝায়, তাকে Verb বলে। Verb ছাড়া কোনো পূর্ণাঙ্গ ইংরেজি বাক্য তৈরি হতে পারে না।',
      rules: [
        'Action: "I study English every day." → "study" expresses an intentional action.',
        'State/Condition: "She knows the answer." → "knows" expresses a mental state.',
        'Event/Process: "The global climate changed rapidly." → "changed" expresses a natural event.',
      ],
      examples: [
        {
          text: 'Sarah works as a senior software developer.',
          breakdown: 'works (Action / Habitual State Verb)',
          note: 'Expresses ongoing professional activity.',
        },
        {
          text: 'The university became a premier research center.',
          breakdown: 'became (Linking / State Change Verb)',
          note: 'Expresses a transformation into a new state.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'She very happy today. (Missing Verb)',
          correct: 'She is very happy today.',
          reason: 'Unlike some languages, English strictly requires a finite verb ("is") in every clause.',
        },
      ],
      ieltsTips: [
        'In IELTS Academic Writing, choosing powerful, precise verbs (e.g., "illustrates" instead of "shows", "accelerates" instead of "makes fast") instantly elevates your Lexical Resource score.',
      ],
      miniCheck: {
        question: 'Identify the verb in this sentence: "The engineering team designed a new solar vehicle."',
        options: ['team', 'designed', 'solar', 'vehicle'],
        correctIndex: 1,
        explanation: '"designed" is the past simple action verb expressing what the team created.',
        simpleExplanation: '"designed" is the action verb.',
      },
    },
    {
      id: 'action-vs-stative',
      title: '2. Action Verbs vs. Stative Verbs (কাজ বনাম অবস্থা নির্দেশক ক্রিয়া)',
      banglaTitle: 'Dynamic Action Verb ও Stative Verb-এর পার্থক্য',
      level: 'Beginner',
      description:
        'Action (dynamic) verbs describe physical or mental activities that have a beginning and end (run, build). Stative verbs describe states, emotions, beliefs, or possession (know, believe, belong) and are NORMALLY NOT used in continuous (-ing) tenses.',
      banglaExplanation:
        'Action Verb শারীরিক বা মানসিক কাজ বোঝায় এবং continuous হতে পারে (I am writing)। কিন্তু Stative Verb অবস্থা, অনুভূতি বা মালিকানা বোঝায় এবং সাধারণত continuous হয় না (I know, NOT I am knowing)।',
      rules: [
        'Common Stative Verbs: know, believe, understand, remember, want, need, prefer, love, hate, own, possess, belong, seem, appear.',
        'Rule: Stative verbs take simple tenses: "I understand the concept" (NOT "I am understanding").',
        'Dual Verbs: Some verbs can be stative or dynamic with a change in meaning: "I have a car" (Possession = Stative) vs. "I am having lunch" (Action of eating = Dynamic).',
      ],
      examples: [
        {
          text: 'Economists believe that renewable energy reduces production costs.',
          breakdown: 'believe (Stative Verb - Mental Belief, Simple Present)',
          note: 'Never say "Economists are believing".',
        },
        {
          text: 'The lab technician is tasting the chemical solution vs. The soup tastes delicious.',
          breakdown: 'is tasting (Active Physical Action) vs. tastes (Stative Quality)',
          note: 'Notice the distinct shift in grammatical aspect.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'I am knowing all the IELTS grammar rules.',
          correct: 'I know all the IELTS grammar rules.',
          reason: '"know" is a stative verb representing cognitive knowledge and cannot be used in the continuous aspect.',
        },
      ],
      ieltsTips: [
        'Examiners heavily penalize using stative verbs in continuous tenses in Speaking Part 1 (e.g., "I am wanting to go abroad" ❌ → "I want to go abroad" ✅).',
      ],
      miniCheck: {
        question: 'Select the grammatically correct sentence:',
        options: [
          'The research team is understanding the data now.',
          'The research team understands the data now.',
          'The research team understanding the data.',
          'The research team are understand the data.',
        ],
        correctIndex: 1,
        explanation: '"understand" is a stative verb and takes the simple present tense "understands".',
        simpleExplanation: 'Stative verbs like "understand" do not take -ing continuous forms.',
      },
    },
    {
      id: 'main-vs-auxiliary',
      title: '3. Main Verbs vs. Auxiliary Verbs (মূল ক্রিয়া ও সাহায্যকারী ক্রিয়া)',
      banglaTitle: 'Main Verb এবং Helping / Auxiliary Verb (Be, Do, Have)',
      level: 'Beginner',
      description:
        'A main (lexical) verb carries the core meaning of the action. An auxiliary (helping) verb combines with a main verb to indicate tense, aspect, mood, voice, or to form negatives and questions.',
      banglaExplanation:
        'Main Verb বাক্যের মূল অর্থ বহন করে। Auxiliary Verb (Be, Do, Have, Modals) মূল Verb-এর সাথে যুক্ত হয়ে Tense, Negative ও Question তৈরি করে।',
      rules: [
        'Primary Auxiliaries: BE (am/is/are/was/were/been/being), DO (do/does/did), HAVE (have/has/had).',
        'Continuous Tenses: BE + Verb-ing ("She IS studying").',
        'Perfect Tenses: HAVE + Past Participle ("They HAVE published the study").',
        'Negatives & Questions in Simple Tenses: DO + Base Verb ("DO you agree?", "He DOES NOT agree").',
      ],
      examples: [
        {
          text: 'The government has implemented stringent anti-pollution measures.',
          breakdown: 'has (Auxiliary Verb) + implemented (Main Lexical Verb - Past Participle)',
          note: 'Forms the Present Perfect tense.',
        },
        {
          text: 'Did the investigator identify the source of contamination?',
          breakdown: 'Did (Past Simple Auxiliary) + identify (Base Form Main Verb)',
          note: 'After auxiliary "Did", the main verb always reverts to its base form.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Did you went to the university yesterday?',
          correct: 'Did you go to the university yesterday?',
          reason: 'Auxiliary "did" already marks the past tense; the main verb MUST remain in its base form ("go").',
        },
      ],
      ieltsTips: [
        'Mastering auxiliary inversions in conditional sentences (e.g., "Had the government intervened earlier, the crisis would have been mitigated") earns top Band 8.5+ grammatical range marks.',
      ],
      miniCheck: {
        question: 'Choose the correct form: "She ______ not understand the statistical methodology."',
        options: ['do', 'does', 'is', 'has'],
        correctIndex: 1,
        explanation: 'Third-person singular "She" in simple present negative takes the auxiliary "does" + "not".',
        simpleExplanation: '"She" takes "does not" in the simple present tense.',
      },
    },
    {
      id: 'verb-forms-table',
      title: '4. The 5 Major Verb Forms (ক্রিয়ার ৫টি প্রধান রূপ)',
      banglaTitle: 'Base Form, Past, Past Participle, -ing Form ও 3rd Person Singular',
      level: 'Easy',
      description:
        'Every English verb has five principal forms that dictate its usage across different tenses, voices, and grammatical structures.',
      banglaExplanation:
        'প্রতিটি ইংরেজি Verb-এর ৫টি রূপ থাকে: V1 (Base), V2 (Past), V3 (Past Participle), V4 (-ing), এবং V5 (3rd Person Singular -s/-es)।',
      rules: [
        '1. Base Form (V1): Infinitive root (study, write, develop).',
        '2. Past Simple (V2): Past tense action (studied, wrote, developed).',
        '3. Past Participle (V3): Used in perfect tenses & passive voice (studied, written, developed).',
        '4. Present Participle / Gerund (V4): -ing form (studying, writing, developing).',
        '5. Third-Person Singular (V5): Present tense with he/she/it (studies, writes, develops).',
      ],
      examples: [
        {
          text: 'Write (V1) → Wrote (V2) → Written (V3) → Writing (V4) → Writes (V5)',
          breakdown: 'Irregular Verb Conjugation Paradigm',
          note: 'V2 is used alone; V3 requires an auxiliary (have/be).',
        },
        {
          text: 'Analyze (V1) → Analyzed (V2) → Analyzed (V3) → Analyzing (V4) → Analyzes (V5)',
          breakdown: 'Regular Academic Verb Paradigm',
          note: 'Regular verbs share identical V2 and V3 forms (-ed).',
        },
      ],
      commonMistakes: [
        {
          wrong: 'I have wrote the essay.',
          correct: 'I have written the essay.',
          reason: 'After auxiliary "have", use the Past Participle V3 ("written"), never the Past Simple V2 ("wrote").',
        },
      ],
      ieltsTips: [
        'Passive voice in IELTS Writing Task 1 and Task 2 always uses BE + Past Participle (V3): "Data was collected", "Measures were implemented".',
      ],
      miniCheck: {
        question: 'Which form of the verb "choose" completes this passive sentence: "The candidate was ______ by the admissions panel."?',
        options: ['chose', 'chosen', 'choosed', 'choosing'],
        correctIndex: 1,
        explanation: 'Passive voice with "was" requires the Past Participle (V3) "chosen".',
        simpleExplanation: 'Use the past participle "chosen" after "was".',
      },
    },
    {
      id: 'regular-verbs-spelling',
      title: '5. Regular Verbs & Spelling Rules (নিয়মিত ক্রিয়া ও বানান নিয়ম)',
      banglaTitle: 'Regular Verb-এর Past ও Participle গঠনের নিয়মাবলী',
      level: 'Easy',
      description:
        'Regular verbs form their past simple (V2) and past participle (V3) by adding -ed or -d. Specific phonetic and spelling rules govern consonant doubling and -y modifications.',
      banglaExplanation:
        'যেসব Verb-এর শেষে -ed বা -d যোগ করে Past ও Past Participle করা হয় তাদের Regular Verb বলে।',
      rules: [
        'General: work → worked, develop → developed.',
        'Ending in -e: create → created, facilitate → facilitated.',
        'Consonant + y: study → studied, rely → relied (Change y to i and add -ed).',
        'Vowel + y: play → played, employ → employed (Keep y, add -ed).',
        'CVC Doubling: stop → stopped, plan → planned, occur → occurred (Double the final consonant if stressed).',
      ],
      examples: [
        {
          text: 'The government stopped subsidizing fossil fuels and relied on solar energy.',
          breakdown: 'stop → stopped (CVC double p) | rely → relied (y to ied)',
          note: 'Demonstrates both standard spelling shift rules.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The experiment stoped unexpectedly.',
          correct: 'The experiment stopped unexpectedly.',
          reason: 'Single syllable ending in Consonant-Vowel-Consonant doubles the final consonant: "stopped".',
        },
      ],
      ieltsTips: [
        'Spelling mistakes in -ed verb endings count against your Lexical Resource and Grammatical Accuracy in IELTS Writing.',
      ],
      miniCheck: {
        question: 'What is the correct past tense spelling of the verb "occur"?',
        options: ['occured', 'occurred', 'occureded', 'occurd'],
        correctIndex: 1,
        explanation: '"occur" has the stress on the final syllable (oc-CUR), so the final "r" is doubled: "occurred".',
        simpleExplanation: 'Double the r: "occurred".',
      },
    },
    {
      id: 'irregular-verbs-mastery',
      title: '6. Irregular Verbs Mastery (অনিয়মিত ক্রিয়া)',
      banglaTitle: 'গুরুত্বপূর্ণ Irregular Verb ও এদের ৩টি রূপ',
      level: 'Easy / Medium',
      description:
        'Irregular verbs do NOT add -ed to form their past and past participle forms. They undergo vowel shifts, consonant mutations, or remain unchanged.',
      banglaExplanation:
        'Irregular Verb-গুলো -ed যুক্ত না হয়ে নিজস্ব নিয়মে পরিবর্তিত হয় (go → went → gone)। এগুলো মুখস্থ রাখা অত্যন্ত জরুরি।',
      rules: [
        'Category 1 (All 3 forms identical): cut → cut → cut, cost → cost → cost, set → set → set.',
        'Category 2 (V2 and V3 identical): buy → bought → bought, bring → brought → brought, build → built → built.',
        'Category 3 (All 3 forms distinct): begin → began → begun, drive → drove → driven, speak → spoke → spoken.',
        'Category 4 (V1 and V3 identical): become → became → become, run → ran → run, come → came → come.',
      ],
      examples: [
        {
          text: 'The global economy grew by 4% after inflation had fallen.',
          breakdown: 'grow → grew (V2) | fall → had fallen (V3 with auxiliary had)',
          note: 'Two distinct irregular paradigms in one sentence.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The price of fuel has rised sharply.',
          correct: 'The price of fuel has risen sharply.',
          reason: '"rise" is an irregular verb: rise → rose → risen.',
        },
      ],
      ieltsTips: [
        'In IELTS Writing Task 1, describing trends requires flawless irregular verbs: "rose", "fell", "grew", "shrank", "fluctuated".',
      ],
      miniCheck: {
        question: 'Identify the correct Past Participle (V3) of the verb "shrink":',
        options: ['shranked', 'shrank', 'shrunk', 'shrinked'],
        correctIndex: 2,
        explanation: 'shrink (V1) → shrank (V2) → shrunk (V3).',
        simpleExplanation: 'V3 of shrink is "shrunk".',
      },
    },
    {
      id: 'transitive-intransitive',
      title: '7. Transitive vs. Intransitive Verbs (সকর্মক ও অকর্মক ক্রিয়া)',
      banglaTitle: 'Transitive (Object প্রয়োজন) বনাম Intransitive (Object ছাড়া)',
      level: 'Medium',
      description:
        'Transitive verbs require a direct object to complete their meaning ("She raised her hand"). Intransitive verbs do NOT take a direct object and cannot be made passive ("The sun rises").',
      banglaExplanation:
        'Transitive Verb-এর অর্থ পূর্ণ করতে Object লাগে (She opened the door)। Intransitive Verb-এর কোনো Object লাগে না (The baby cried) এবং এদের Passive Voice হয় না।',
      rules: [
        'Transitive: [Subject] + [Verb] + [Direct Object]. Example: "The government implemented the policy."',
        'Intransitive: [Subject] + [Verb] (+ Prepositional Phrase). Example: "The accident occurred at midnight."',
        'Crucial Distinction: RISE (Intransitive - no object: "Prices rise") vs. RAISE (Transitive - takes object: "Governments raise taxes").',
        'Crucial Distinction: LIE (Intransitive: "She lies on the bed") vs. LAY (Transitive: "She laid the book on the table").',
      ],
      examples: [
        {
          text: 'The university raised tuition fees by ten percent.',
          breakdown: 'raised (Transitive Verb) + tuition fees (Direct Object)',
          note: '"Raise" is transitive and requires the direct object "fees".',
        },
        {
          text: 'Global temperatures rose substantially throughout the decade.',
          breakdown: 'rose (Intransitive Verb) + substantially (Adverb - No Direct Object)',
          note: '"Rise" is intransitive and cannot take a direct object.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The accident was occurred yesterday.',
          correct: 'The accident occurred yesterday.',
          reason: '"occur" is an intransitive verb and CANNOT be used in the passive voice.',
        },
        {
          wrong: 'The government rose taxes.',
          correct: 'The government raised taxes.',
          reason: '"taxes" is a direct object, so the transitive verb "raised" is required.',
        },
      ],
      ieltsTips: [
        'Confusing "rise/raise" in IELTS Writing Task 1 is one of the most common errors examiners highlight: "The unemployment rate rose" (NOT "raised").',
      ],
      miniCheck: {
        question: 'Select the correct sentence for IELTS Task 1:',
        options: [
          'The number of international students raised steadily between 2015 and 2020.',
          'The number of international students rose steadily between 2015 and 2020.',
          'The number of international students was risen steadily between 2015 and 2020.',
          'The number of international students was raised by itself.',
        ],
        correctIndex: 1,
        explanation: '"The number of students" increased on its own without an external object, so the intransitive verb "rose" is correct.',
        simpleExplanation: 'Use "rose" when there is no direct object.',
      },
    },
    {
      id: 'linking-verbs',
      title: '8. Linking Verbs & Subject Complements (সংযোগকারী ক্রিয়া)',
      banglaTitle: 'Linking Verb (be, seem, become, feel) ও Subject Complement',
      level: 'Medium',
      description:
        'Linking (copular) verbs connect the subject to a subject complement (noun or adjective) that describes or identifies the subject, rather than expressing an action.',
      banglaExplanation:
        'Linking Verb কোনো শারীরিক কাজ বোঝায় না; বরং Subject-এর সাথে তার অবস্থা বা পরিচয় (Adjective বা Noun) সংযুক্ত করে (She is happy, The plan seems viable)।',
      rules: [
        'Common Linking Verbs: be, become, seem, appear, look, sound, smell, taste, feel, remain, stay.',
        'Followed by ADJECTIVES, not adverbs: "The proposal seems realistic" (NOT "realistically").',
        'Formula: [Subject] + [Linking Verb] + [Adjective / Noun Complement].',
      ],
      examples: [
        {
          text: 'The statistical methodology remains valid despite sample variations.',
          breakdown: 'methodology (Subject) + remains (Linking Verb) + valid (Predicate Adjective Complement)',
          note: '"Valid" modifies the subject "methodology".',
        },
        {
          text: 'Dr. Haque became the lead investigator on the oncology project.',
          breakdown: 'Dr. Haque (Subject) + became (Linking Verb) + lead investigator (Predicate Noun Complement)',
          note: 'Identifies the new status of the subject.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The soup smells deliciously.',
          correct: 'The soup smells delicious.',
          reason: 'Linking verbs of perception ("smell", "taste", "look", "feel") take adjective complements ("delicious"), not adverbs.',
        },
      ],
      ieltsTips: [
        'Use sophisticated linking verbs in IELTS essays to express cautious academic nuance: "The evidence appears conclusive", "This approach remains contentious".',
      ],
      miniCheck: {
        question: 'Choose the correct option: "The economic forecast looks ______ for the forthcoming fiscal quarter."',
        options: ['promisingly', 'promising', 'promise', 'promisedly'],
        correctIndex: 1,
        explanation: '"looks" is a linking verb and requires the predicate adjective "promising".',
        simpleExplanation: 'Use the adjective "promising" after the linking verb "looks".',
      },
    },
    {
      id: 'infinitives-and-gerunds',
      title: '9. Infinitives vs. Gerunds (Infinitive বনাম Gerund)',
      banglaTitle: 'To + Verb এবং Verb + ing-এর সঠিক ব্যবহার ও পার্থক্য',
      level: 'Medium / Core',
      description:
        'Verbs are often followed by either an infinitive (to + base verb) or a gerund (verb + ing). Certain verbs strictly require one or the other, while some allow both with critical shifts in meaning.',
      banglaExplanation:
        'কিছু Verb-এর পর সর্বদা Infinitive (to + verb) বসে (want to, decide to)। কিছু Verb-এর পর Gerund (verb + ing) বসে (enjoy doing, avoid making)।',
      rules: [
        'Verbs followed by INFINITIVE (to + V1): agree, decide, hope, plan, refuse, promise, manage, afford, tend, aim.',
        'Verbs followed by GERUND (V-ing): avoid, consider, enjoy, finish, suggest, recommend, admit, deny, postpone, risk.',
        'Verbs after Prepositions: ALWAYS use a Gerund after any preposition ("interested in studying", "prevent from leaving").',
      ],
      examples: [
        {
          text: 'The municipal committee decided to construct a new public transit network.',
          breakdown: 'decided + to construct (Infinitive)',
          note: '"decide" takes an infinitive.',
        },
        {
          text: 'The administration recommended investing in renewable energy infrastructure.',
          breakdown: 'recommended + investing (Gerund)',
          note: '"recommend" directly governs a gerund.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The professor suggested to read the academic journal.',
          correct: 'The professor suggested reading the academic journal.',
          reason: '"suggest" takes a gerund ("suggest reading") or a that-clause ("suggested that we read"), never an infinitive.',
        },
        {
          wrong: 'She is interested to learn Python.',
          correct: 'She is interested in learning Python.',
          reason: 'Prepositions ("in") are strictly followed by gerunds ("learning").',
        },
      ],
      ieltsTips: [
        'Using "suggest/recommend + gerund" accurately in IELTS Task 2 problem-solution essays is a major indicator of advanced grammatical control.',
      ],
      miniCheck: {
        question: 'Identify the correct sentence:',
        options: [
          'The government avoided to raise income taxes during the recession.',
          'The government avoided raising income taxes during the recession.',
          'The government avoided raise income taxes during the recession.',
          'The government avoided for raising income taxes during the recession.',
        ],
        correctIndex: 1,
        explanation: '"avoid" is followed by a gerund ("raising").',
        simpleExplanation: '"avoid" takes a gerund (-ing).',
      },
    },
    {
      id: 'gerund-infinitive-meaning-shifts',
      title: '10. Verbs with Meaning Shifts (অর্থ পরিবর্তনকারী Verb)',
      banglaTitle: 'Remember, Stop, Try, Forget-এর সাথে Gerund ও Infinitive-এর অর্থের পার্থক্য',
      level: 'Advanced',
      description:
        'Verbs like "remember", "stop", "try", "forget", and "regret" can be followed by either an infinitive or a gerund, but the meaning of the sentence changes entirely.',
      banglaExplanation:
        'Remember, Stop, Try ইত্যাদি Verb-এর পর Infinitive বা Gerund বসালে বাক্যের অর্থ সম্পূর্ণ বদলে যায়।',
      rules: [
        'REMEMBER TO DO: Remember a duty/task before doing it ("Remember to submit your essay").',
        'REMEMBER DOING: Recall a past memory/event ("I remember meeting Professor Haque in 2020").',
        'STOP TO DO: Halt an activity in order to do something else ("He stopped to answer the phone").',
        'STOP DOING: Cease or quit an ongoing action ("He stopped smoking").',
        'TRY TO DO: Make an effort to do a difficult task ("I tried to solve the equation").',
        'TRY DOING: Experiment with a method to see if it works ("Try restarting your computer").',
      ],
      examples: [
        {
          text: 'The researcher stopped to record the temperature reading.',
          breakdown: 'stopped in order to record (Infinitive of Purpose)',
          note: 'Paused previous work to take a reading.',
        },
        {
          text: 'The factory stopped emitting toxic wastewater into the river.',
          breakdown: 'stopped emitting (Ceased the activity completely)',
          note: 'Terminated the ongoing pollution.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Please stop to make noise in the examination hall.',
          correct: 'Please stop making noise in the examination hall.',
          reason: '"stop making noise" means quit producing noise; "stop to make noise" means pause other actions in order to create noise.',
        },
      ],
      ieltsTips: [
        'Nuanced use of "regret to inform you" (formal announcement) vs. "regret doing" (past remorse) is tested frequently in formal letter writing (IELTS General Training).',
      ],
      miniCheck: {
        question: 'Which sentence means "We recalled the past action of visiting London"?',
        options: [
          'We remembered to visit London.',
          'We remembered visiting London.',
          'We stopped to visit London.',
          'We tried to visit London.',
        ],
        correctIndex: 1,
        explanation: '"remember + gerund" (remembered visiting) refers to recalling a past experience from memory.',
        simpleExplanation: '"remembered visiting" refers to a memory of a past event.',
      },
    },
    {
      id: 'phrasal-verbs-academic',
      title: '11. Phrasal Verbs & Academic Alternatives (Phrasal Verb ও একাডেমিক সমার্থক)',
      banglaTitle: 'Phrasal Verb বনাম Formal Academic Verbs (IELTS Band 8+)',
      level: 'Medium / Advanced',
      description:
        'A phrasal verb combines a base verb with a preposition or adverb particle (e.g., carry out, bring about). In formal IELTS Academic Writing, single-word academic verbs are preferred.',
      banglaExplanation:
        'Verb-এর সাথে Preposition বা Adverb যুক্ত হয়ে নতুন অর্থ তৈরি করলে তাকে Phrasal Verb বলে। IELTS Speaking-এ Phrasal Verb এবং Writing-এ formal academic verb ব্যবহার করা উত্তম।',
      rules: [
        'carry out → conduct / execute ("conduct an experiment")',
        'bring about → cause / generate ("cause economic growth")',
        'point out → indicate / highlight ("highlight a limitation")',
        'look into → investigate / examine ("investigate the root cause")',
        'set up → establish / instantiate ("establish an institution")',
        'turn down → reject / decline ("decline the offer")',
      ],
      examples: [
        {
          text: 'Informal/Spoken: Scientists carried out a study to find out why glaciers melt.',
          breakdown: 'carried out (Phrasal) | find out (Phrasal)',
          note: 'Natural for IELTS Speaking Part 1 & 2.',
        },
        {
          text: 'Formal/Academic: Scientists conducted an investigation to determine the causes of glacial melting.',
          breakdown: 'conducted (Academic) | determine (Academic)',
          note: 'Target standard for IELTS Writing Task 2.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The researchers looked up the causes of the disease in the lab.',
          correct: 'The researchers investigated the causes of the disease in the lab.',
          reason: '"look up" means check in a dictionary; "investigate" is the correct scientific verb.',
        },
      ],
      ieltsTips: [
        'Use phrasal verbs naturally in IELTS Speaking (shows idiomatic vocabulary), but substitute with formal academic single-word verbs in Academic Writing Task 1 & 2.',
      ],
      miniCheck: {
        question: 'What is the best formal academic equivalent for the phrasal verb "carry out" in the sentence "Scientists carried out a survey"?',
        options: ['conducted', 'brought about', 'made out', 'put off'],
        correctIndex: 0,
        explanation: '"conducted" is the precise formal academic equivalent of "carried out".',
        simpleExplanation: '"conducted" is the formal word for "carried out".',
      },
    },
    {
      id: 'modal-verbs-nuance',
      title: '12. Modal Auxiliary Verbs & Academic Hedging (মোডাল ভার্ব ও একাডেমিক সতর্কতা)',
      banglaTitle: 'Modal Verb (can, could, may, might, must, should) ও Hedging',
      level: 'Medium / Advanced',
      description:
        'Modal verbs express ability, possibility, obligation, permission, necessity, and probability. In IELTS Academic Writing, modals (may, might, could, should) are vital for "hedging" (cautious, balanced claims).',
      banglaExplanation:
        'Modal Verb (can, could, may, might, must, should, would) মূল Verb-এর আগে বসে সম্ভাবনা, বাধ্যবাধকতা বা সামর্থ্য প্রকাশ করে। এর পর সর্বদা Base Verb (V1) বসে।',
      rules: [
        'Base Verb Rule: Modals are ALWAYS followed by bare infinitives / base verbs without "to": "She CAN SPEAK" (NOT "can to speak" or "can speaks").',
        'Academic Hedging (Cautious Language): Avoid overgeneralization. Use "may indicate" instead of "proves".',
        'Levels of Certainty: will (100% certain) → must (logical deduction) → should (expected probability) → may/might/could (tentative possibility).',
      ],
      examples: [
        {
          text: 'The statistical correlation may indicate a causal link between diet and cardiovascular health.',
          breakdown: 'may (Modal of Tentative Possibility) + indicate (Base Form Main Verb)',
          note: 'Exemplifies academic hedging without unscientific overclaiming.',
        },
        {
          text: 'Governments must implement strict regulations to protect marine ecosystems.',
          breakdown: 'must (Modal of Urgent Obligation / Necessity) + implement (Base Form)',
          note: 'Expresses mandatory policy action.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The findings might to prove the hypothesis.',
          correct: 'The findings might prove the hypothesis.',
          reason: 'Modal verbs (might, can, must) are followed directly by the base verb WITHOUT "to".',
        },
        {
          wrong: 'He must works harder.',
          correct: 'He must work harder.',
          reason: 'Never add -s to a main verb following a modal auxiliary.',
        },
      ],
      ieltsTips: [
        'Hedging with modal verbs ("This trend could lead to...", "These measures might reduce...") is explicitly required to reach Band 8.0+ in Task Achievement.',
      ],
      miniCheck: {
        question: 'Choose the correct sentence:',
        options: [
          'The research findings may indicates a broader economic shift.',
          'The research findings may indicate a broader economic shift.',
          'The research findings may to indicate a broader economic shift.',
          'The research findings may indicating a broader economic shift.',
        ],
        correctIndex: 1,
        explanation: 'Modal "may" must be followed by the bare base verb "indicate".',
        simpleExplanation: 'Modals like "may" are followed by the base verb without -s or "to".',
      },
    },
    {
      id: 'subject-verb-agreement-traps',
      title: '13. Subject-Verb Agreement Traps (Subject ও Verb-এর সঙ্গতি)',
      banglaTitle: 'Subject-Verb Agreement-এর কঠিন নিয়ম ও ফাঁদ',
      level: 'Advanced',
      description:
        'A singular subject demands a singular verb; a plural subject demands a plural verb. In complex sentences, intervening phrases and collective nouns create frequent agreement errors.',
      banglaExplanation:
        'Subject singular হলে Verb singular (He works), Subject plural হলে Verb plural (They work)। বাক্যে বড় ফ্রেজ থাকলে আসল Subject খুঁজে Verb নির্ধারণ করতে হয়।',
      rules: [
        'Intervening Prepositional Phrases: "The quality OF THE SAMPLES was tested" (Subject is "quality", singular).',
        'Expressions of Quantity: "A number of students ARE" (Plural) vs. "The number of students IS" (Singular).',
        'Correlatives (Neither... nor / Either... or): Verb agrees with the CLOSEST subject ("Neither the teacher nor the students WERE present").',
        'Collective Nouns as Units: "The committee HAS reached its decision" (Singular unit).',
      ],
      examples: [
        {
          text: 'The implementation of the new transport policies requires substantial municipal funding.',
          breakdown: 'implementation (Singular Head Subject) + requires (Singular Verb with -s)',
          note: 'Do not be distracted by the plural noun "policies".',
        },
        {
          text: 'A substantial number of renewable energy projects have commenced operations.',
          breakdown: 'A number of... (Plural Quantifier) + have commenced (Plural Verb)',
          note: '"A number of" always takes a plural verb.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The development of artificial intelligence technologies have accelerated.',
          correct: 'The development of artificial intelligence technologies has accelerated.',
          reason: 'The true subject is "The development" (singular), not "technologies".',
        },
      ],
      ieltsTips: [
        'Subject-verb agreement errors in complex sentences with long subject noun phrases are among the most penalized errors in IELTS Writing Task 2.',
      ],
      miniCheck: {
        question: 'Select the grammatically accurate sentence:',
        options: [
          'The diversity of academic programs attract international students.',
          'The diversity of academic programs attracts international students.',
          'The diversity of academic programs are attracting international students.',
          'The diversity of academic programs have attracted international students.',
        ],
        correctIndex: 1,
        explanation: 'The subject is the singular noun "diversity", which governs the singular verb "attracts".',
        simpleExplanation: '"diversity" is singular, so the verb is "attracts".',
      },
    },
    {
      id: 'advanced-verb-patterns',
      title: '14. Advanced Verb Patterns & Complementation (জটিল Verb প্যাটার্ন)',
      banglaTitle: 'Verb + Object + Infinitive / Gerund / Preposition প্যাটার্ন',
      level: 'Advanced / IELTS Advanced',
      description:
        'Advanced academic English relies on precise verb complementation patterns, such as verb + object + infinitive, verb + preposition + gerund, and subjunctive that-clauses.',
      banglaExplanation:
        'উচ্চতর ইংরেজি গঠনে নির্দিষ্ট Verb-এর সাথে নির্দিষ্ট গঠন বজায় রাখতে হয় (e.g., prevent someone from doing, encourage someone to do, demand that someone do)।',
      rules: [
        'Verb + Object + To-Infinitive: enable someone to do, encourage someone to do, compel someone to do, allow someone to do.',
        'Verb + Preposition + Gerund: prevent someone from doing, dissuade someone from doing, succeed in doing, contribute to doing.',
        'Subjunctive Mandative Clauses: demand that he BE, recommend that she STUDY (Base form without -s in formal that-clauses).',
      ],
      examples: [
        {
          text: 'Technological innovations enable workers to complete tasks remotely.',
          breakdown: 'enable (Verb) + workers (Object) + to complete (To-Infinitive)',
          note: 'Standard causative enablement pattern.',
        },
        {
          text: 'The environmental treaty prevented factories from discharging untreated waste.',
          breakdown: 'prevented (Verb) + factories (Object) + from discharging (Preposition + Gerund)',
          note: 'Never say "prevented factories to discharge".',
        },
      ],
      commonMistakes: [
        {
          wrong: 'The government prevented corporations to pollute the river.',
          correct: 'The government prevented corporations from polluting the river.',
          reason: '"prevent" takes the pattern "prevent + object + FROM + gerund".',
        },
      ],
      ieltsTips: [
        'Using sophisticated structures like "enable individuals to acquire skills" and "prohibit firms from emitting toxins" demonstrates Band 8.5+ syntactic control.',
      ],
      miniCheck: {
        question: 'Complete the sentence: "Strict maritime regulations prevent cargo ships ______ hazardous ballast water."',
        options: [
          'to release',
          'from releasing',
          'for releasing',
          'releasing',
        ],
        correctIndex: 1,
        explanation: '"prevent" strictly takes the pattern "prevent + object + FROM + gerund".',
        simpleExplanation: 'Use "from releasing" with "prevent".',
      },
    },
    {
      id: 'ielts-academic-verbs-mastery',
      title: '15. High-Impact IELTS Academic Verbs (আইইএলটিএস একাডেমিক ক্রিয়া)',
      banglaTitle: 'ব্যান্ড ৯ স্কোরিংয়ের জন্য প্রয়োজনীয় একাডেমিক ভার্ব',
      level: 'IELTS Advanced',
      description:
        'To achieve Band 8.0–9.0 in IELTS Writing and Speaking, replace vague everyday verbs with high-precision academic verbs that convey nuanced analytical meaning.',
      banglaExplanation:
        'আইইএলটিএস-এ ভালো ব্যান্ডের জন্য সাধারণ Verb-এর বদলে সুনির্দিষ্ট Academic Verb (e.g., analyze, evaluate, facilitate, mitigate, exacerbate) ব্যবহার করতে হয়।',
      rules: [
        'Instead of "make easier" → use "FACILITATE" ("Digital platforms facilitate international trade").',
        'Instead of "make worse" → use "EXACERBATE" ("Deforestation exacerbates soil erosion").',
        'Instead of "make better / improve" → use "ENHANCE" or "MITIGATE" ("Mitigate climate risks", "Enhance cognitive performance").',
        'Instead of "show" → use "DEMONSTRATE", "ILLUSTRATE", or "INDICATE".',
      ],
      examples: [
        {
          text: 'The statistical evidence demonstrates that urban green spaces mitigate psychological stress.',
          breakdown: 'demonstrates (Academic Verb - shows convincingly) | mitigate (Academic Verb - alleviate/lessen)',
          note: 'Exemplifies Band 9.0 Lexical Resource and Grammatical Range.',
        },
      ],
      commonMistakes: [
        {
          wrong: 'Urban pollution makes the health crisis more worse.',
          correct: 'Urban pollution exacerbates the public health crisis.',
          reason: '"exacerbates" provides precise academic register, avoiding clunky phrases like "makes more worse".',
        },
      ],
      ieltsTips: [
        'Using "exacerbate" and "mitigate" in IELTS Writing Task 2 problem-solution essays immediately signals advanced academic vocabulary to the examiner.',
      ],
      miniCheck: {
        question: 'Which academic verb best completes the sentence: "The newly constructed highway ______ the transit of goods across the industrial corridor."?',
        options: ['facilitated', 'exacerbated', 'deteriorated', 'compromised'],
        correctIndex: 0,
        explanation: '"facilitated" means made easier or assisted, perfectly fitting the positive infrastructure context.',
        simpleExplanation: '"facilitated" means made the process smoother and easier.',
      },
    },
  ],
};

export const verbLesson = verbLessonData;


