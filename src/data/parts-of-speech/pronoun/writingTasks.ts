import { PronounWritingTask } from '@/types';

export const pronounWritingTasks: PronounWritingTask[] = [
  // 1. Beginner - Sentence Construction
  {
    id: 'pronoun-wrt-001',
    stage: 1,
    level: 'basic',
    type: 'sentence-construction',
    prompt: 'Write three sentences about your study habits using subject and object pronouns (I, me, he, she, them).',
    instructions: 'Ensure every subject pronoun (I, he, she, they) and object pronoun (me, him, her, them) is used accurately in sentence syntax.',
    targetGrammar: 'Subject and Object Personal Pronouns',
    wordLimit: 40,
    sampleAnswer:
      'I prepare for my exams every evening. My professor often provides helpful academic advice to me. When my classmates need assistance with grammar, I always assist them.',
    assessmentCriteria: ['Correct subject vs object pronoun selection', 'Proper sentence capitalization & punctuation', 'Subject-verb agreement'],
    sampleAnalysis: {
      original: 'Me study every day. The teacher help I with homework.',
      problem: '"Me" is an object pronoun used as subject; "I" is a subject pronoun used after the verb.',
      correction: 'I study every day. The teacher helps me with homework.',
      explanation: 'Subject pronouns (I) perform the action, while object pronouns (me) receive the action.',
      improvedVersion: 'I dedicate two hours to study every day, and my professor assists me whenever I encounter difficult concepts.',
    },
  },
  // 2. Beginner - Sentence Transformation
  {
    id: 'pronoun-wrt-002',
    stage: 2,
    level: 'basic',
    type: 'sentence-expansion',
    prompt: 'Eliminate repetitive nouns by transforming these sentences with appropriate pronouns: "Tariq bought a new laptop. Tariq uses the laptop for coding."',
    instructions: 'Replace the repetitive proper noun "Tariq" and the direct object "the laptop" with suitable pronouns in the second sentence.',
    targetGrammar: 'Anaphoric Personal Pronoun Replacement (He / It)',
    wordLimit: 30,
    sampleAnswer:
      'Tariq bought a new laptop, and he uses it for coding.',
    assessmentCriteria: ['Accurate pronoun replacement (he, it)', 'Sentence coordination without redundancy', 'Punctuation precision'],
    sampleAnalysis: {
      original: 'Tariq bought a new laptop. Tariq uses the laptop to code.',
      problem: 'Repeating "Tariq" and "the laptop" makes the writing childish and repetitive.',
      correction: 'Tariq bought a new laptop, and he uses it to code.',
      explanation: '"Tariq" is replaced by "he", and "the laptop" is replaced by "it".',
      improvedVersion: 'Tariq recently invested in a high-performance laptop, which he utilizes primarily for software development.',
    },
  },
  // 3. Elementary - Possessive Pronouns vs Determiners
  {
    id: 'pronoun-wrt-003',
    stage: 3,
    level: 'elementary',
    type: 'sentence-construction',
    prompt: 'Write three sentences comparing your study tools with a friend\'s, using both possessive determiners (my, his, their) and possessive pronouns (mine, his, theirs).',
    instructions: 'Correctly contrast determiners (which precede nouns) and independent possessive pronouns (which stand alone without nouns).',
    targetGrammar: 'Possessive Determiners vs. Absolute Possessive Pronouns',
    wordLimit: 50,
    sampleAnswer:
      'My laptop has a fast processor, whereas his is lightweight. I frequently review my lecture notes, and my friends always review theirs before class. That grammar dictionary on the desk is mine.',
    assessmentCriteria: ['Proper use of mine, theirs, yours vs my, their, your', 'No apostrophes in possessive pronouns', 'Syntactic clarity'],
    sampleAnalysis: {
      original: 'This is my book and that is her\'s book. The tablet is your\'s.',
      problem: '"her\'s" and "your\'s" contain incorrect apostrophes; "her\'s" cannot precede a noun.',
      correction: 'This is my book and that is her book. The tablet is yours.',
      explanation: 'Possessive pronouns (yours, hers) stand alone and never contain apostrophes.',
      improvedVersion: 'While this comprehensive dictionary is mine, that reference manual belongs to her.',
    },
  },
  // 4. Elementary - Reflexive Pronouns
  {
    id: 'pronoun-wrt-004',
    stage: 4,
    level: 'elementary',
    type: 'short-paragraph',
    prompt: 'Write a 40–60 word paragraph describing an achievement you accomplished independently, using reflexive and emphatic pronouns (myself, ourselves, itself).',
    instructions: 'Use reflexive pronouns when the subject and object are identical, or emphatically to emphasize personal agency.',
    targetGrammar: 'Reflexive and Emphatic Pronouns',
    wordLimit: 60,
    sampleAnswer:
      'When I began preparing for the IELTS examination, I challenged myself to learn twenty academic words daily. I taught myself advanced essay structures through online lectures. The achievement itself gave me great confidence, and my classmates also motivated themselves to study consistently.',
    assessmentCriteria: ['Accurate reflexive agreement (myself, themselves, itself)', 'No pseudo-reflexives like "theirselves" or "hisself"', 'Coherent paragraph structure'],
    sampleAnalysis: {
      original: 'I taught my self how to code. They prepared theirselves for the test.',
      problem: '"my self" is written as two words; "theirselves" is non-standard English.',
      correction: 'I taught myself how to code. They prepared themselves for the test.',
      explanation: 'Reflexive pronouns are written as single words ("myself", "themselves").',
      improvedVersion: 'I taught myself full-stack web development during the lockdown, proving to myself that dedication drives success.',
    },
  },
  // 5. Intermediate - Demonstrative Comparison (That of / Those of)
  {
    id: 'pronoun-wrt-005',
    stage: 5,
    level: 'intermediate',
    type: 'academic-paragraph',
    prompt: 'Write a comparative paragraph suitable for IELTS Academic Writing Task 1 comparing the renewable energy outputs of two countries, using "that of" and "those of".',
    instructions: 'Use demonstrative pronouns ("that of" for singular non-count, "those of" for plural) to eliminate noun repetition in comparative clauses.',
    targetGrammar: 'Demonstrative Comparative Reference (that of, those of)',
    wordLimit: 70,
    sampleAnswer:
      'In 2022, Germany\'s solar energy production reached 60 gigawatts, a figure substantially higher than that of the United Kingdom. Furthermore, the wind energy yields of Denmark exceeded those of neighboring European nations, demonstrating widespread regional adoption of renewable power infrastructure.',
    assessmentCriteria: ['Accurate deployment of "that of" (singular) and "those of" (plural)', 'Logical comparative parallelism', 'Formal IELTS Task 1 academic tone'],
    sampleAnalysis: {
      original: 'The solar output of Germany was higher than the United Kingdom, and wind yields were higher than other countries.',
      problem: 'Comparing "output" directly to "the United Kingdom" creates a faulty, illogical comparison.',
      correction: 'The solar output of Germany was higher than that of the United Kingdom, and wind yields exceeded those of other countries.',
      explanation: 'Use "that of" to compare the output, and "those of" to compare the plural yields.',
      improvedVersion: 'In 2022, Germany\'s total solar capacity was significantly greater than that of the UK, while its wind yields surpassed those of most European states.',
    },
  },
  // 6. Intermediate - Relative Clauses (Who, Whom, Whose, Which, That)
  {
    id: 'pronoun-wrt-006',
    stage: 6,
    level: 'intermediate',
    type: 'academic-paragraph',
    prompt: 'Write a short paragraph about scientific innovation, integrating at least one defining relative clause with "that/who" and one non-defining relative clause with "which/whose".',
    instructions: 'Ensure proper comma punctuation for non-defining clauses and avoid using "that" after commas.',
    targetGrammar: 'Defining vs. Non-Defining Relative Clauses',
    wordLimit: 75,
    sampleAnswer:
      'Scientists who specialize in renewable materials have engineered biodegradable plastics that decompose within six months. This breakthrough, which was pioneered by university researchers whose work received international acclaim, offers a sustainable solution to marine pollution.',
    assessmentCriteria: ['Correct relative pronoun choice (who, which, whose, that)', 'Punctuation of non-defining clauses with commas', 'Syntactic complexity and cohesion'],
    sampleAnalysis: {
      original: 'Scientists which research clean energy created a battery, that lasts ten years.',
      problem: '"which" cannot refer to human scientists; "that" cannot be used in a non-defining clause with a comma.',
      correction: 'Scientists who research clean energy created a battery that lasts ten years. / ...a battery, which lasts ten years.',
      explanation: 'Use "who" for people, and use "which" (not "that") after a parenthetical comma.',
      improvedVersion: 'Engineers who develop lithium-free batteries have introduced a new prototype, which retains 95% of its charging efficiency after five years.',
    },
  },
  // 7. Intermediate - Indefinite Pronouns and Subject-Verb Agreement
  {
    id: 'pronoun-wrt-007',
    stage: 7,
    level: 'intermediate',
    type: 'academic-paragraph',
    prompt: 'Write a paragraph discussing university student participation using indefinite pronouns (everyone, each, neither, all). Ensure strict subject-verb agreement.',
    instructions: 'Demonstrate that singular indefinite pronouns (each, everyone, neither) take singular verbs, while plural quantifiers (both, several) take plural verbs.',
    targetGrammar: 'Indefinite Pronoun Agreement',
    wordLimit: 75,
    sampleAnswer:
      'In modern higher education, everyone is expected to engage in collaborative research. Each of the enrolled candidates is assigned a personal academic tutor. Although several study modules require group presentations, neither of the core examinations is conducted without strict invigilation.',
    assessmentCriteria: ['Singular verb agreement with each/everyone/neither', 'Plural verb agreement with several/both', 'Academic vocabulary and coherence'],
    sampleAnalysis: {
      original: 'Everyone in the seminar have submitted their papers. Neither of the proposals were accepted.',
      problem: '"Everyone" and "Neither" are singular and require singular verbs ("has", "was").',
      correction: 'Everyone in the seminar has submitted their paper. Neither of the proposals was accepted.',
      explanation: 'Indefinite pronouns like "everyone" and distributive "neither" govern singular verbs in formal academic English.',
      improvedVersion: 'Every participant in the seminar has finalized their research draft, yet neither of the competing hypotheses was fully verified by empirical data.',
    },
  },
  // 8. Upper-Intermediate - Pronouns after Prepositions
  {
    id: 'pronoun-wrt-008',
    stage: 8,
    level: 'upper-intermediate',
    type: 'sentence-expansion',
    prompt: 'Write four academic sentences using pronouns after complex prepositional phrases (between ... and me, with whom, all of which, for them).',
    instructions: 'Maintain objective case pronouns following prepositions and apply formal relative constructions.',
    targetGrammar: 'Prepositional Object Pronouns & Partitive Relatives',
    wordLimit: 80,
    sampleAnswer:
      'The research grant was divided equally between Dr. Davis and me. The senior investigator with whom I conducted the trials verified the results. The team evaluated five alternative materials, all of which demonstrated high thermal resistance. The institution published guidelines to facilitate independent inquiry for them.',
    assessmentCriteria: ['Accurate object pronouns after prepositions (me, whom, them)', 'No hypercorrections like "between you and I"', 'Sophisticated academic phrasing'],
    sampleAnalysis: {
      original: 'The task was assigned to my supervisor and I. The participants, many of who had no experience, failed.',
      problem: '"I" is a subject pronoun after "to"; "who" is a subject pronoun after "of".',
      correction: 'The task was assigned to my supervisor and me. The participants, many of whom had no experience, failed.',
      explanation: 'Prepositions govern accusative/objective case pronouns ("me", "whom").',
      improvedVersion: 'The grant was awarded jointly to the lead investigator and me, enabling us to support graduate students, many of whom lacked external funding.',
    },
  },
  // 9. Upper-Intermediate - Reciprocal and Distributive Cohesion
  {
    id: 'pronoun-wrt-009',
    stage: 9,
    level: 'upper-intermediate',
    type: 'academic-paragraph',
    prompt: 'Write a paragraph discussing how international researchers collaborate using reciprocal pronouns (each other, one another) and distributive pronouns (either, each).',
    instructions: 'Use "each other" for two parties, "one another" for larger groups, and ensure distributive pronouns govern singular verbs.',
    targetGrammar: 'Reciprocal and Distributive Pronouns',
    wordLimit: 80,
    sampleAnswer:
      'Global scientific advancement relies heavily on international academic networks where scholars support one another through peer review. When two rival institutions cooperate with each other on climate modeling, their collective efficiency increases. Either of the proposed green technologies is capable of reducing atmospheric emissions if adopted globally.',
    assessmentCriteria: ['Correct differentiation of each other vs one another', 'Singular agreement with either/each', 'Lexical cohesion and academic style'],
    sampleAnalysis: {
      original: 'The two research teams supported one another. Either of the methods are acceptable.',
      problem: '"one another" used for two teams instead of "each other"; "Either" takes singular verb "is".',
      correction: 'The two research teams supported each other. Either of the methods is acceptable.',
      explanation: 'Use "each other" for two entities, and "Either" commands a singular verb ("is").',
      improvedVersion: 'The two partnering universities consulted each other on epidemiology, concluding that either of the diagnostic protocols is clinically viable.',
    },
  },
  // 10. Advanced - Eliminating Ambiguous Pronoun References
  {
    id: 'pronoun-wrt-010',
    stage: 10,
    level: 'advanced',
    type: 'academic-paragraph',
    prompt: 'Rewrite the following ambiguous draft into a clear, Band 9 academic paragraph: "The government introduced new subsidies for renewable energy corporations, but they soon collapsed because of mismanagement."',
    instructions: 'Resolve the ambiguous pronoun "they" by replacing it with a clear, specific noun phrase and expand the idea with an appositive relative clause.',
    targetGrammar: 'Resolution of Ambiguous Anaphora & Appositive Relative Clauses',
    wordLimit: 90,
    sampleAnswer:
      'The government introduced financial subsidies for renewable energy corporations; however, these emerging green enterprises soon collapsed due to internal fiscal mismanagement. This corporate failure underscored the necessity of establishing strict oversight mechanisms, which would ensure public funds are allocated transparently.',
    assessmentCriteria: ['Complete resolution of ambiguous pronoun "they"', 'Use of demonstrative summary noun ("these emerging green enterprises")', 'Sentential relative clause (which would ensure...)'],
    sampleAnalysis: {
      original: 'The council gave funding to universities, but they closed down when they ran out of it.',
      problem: 'Multiple ambiguous pronouns ("they", "they", "it") confuse the reader.',
      correction: 'The council gave funding to universities; however, several institutions closed down when municipal capital was exhausted.',
      explanation: 'Replacing vague pronouns with concrete noun phrases clarifies the actor and the resource.',
      improvedVersion: 'The municipal council allocated grants to tertiary institutions, yet several colleges ceased operations once this fiscal support was terminated.',
    },
  },
  // 11. Advanced - Pronoun-Antecedent Agreement with Singular "They"
  {
    id: 'pronoun-wrt-011',
    stage: 11,
    level: 'advanced',
    type: 'academic-paragraph',
    prompt: 'Write a paragraph discussing modern workplace policies regarding employee upskilling, using epicene singular "they/their" naturally and correctly.',
    instructions: 'Use singular gender-neutral "they/their" to refer to non-specific singular human antecedents ("an employee", "a professional") without awkward "he/she" repetition.',
    targetGrammar: 'Epicene Singular "They" in Academic Writing',
    wordLimit: 90,
    sampleAnswer:
      'When an employee seeks career advancement in an automated economy, they must continuously upgrade their technical skills. A prospective applicant who adapts their expertise to emerging digital software substantially enhances their professional competitiveness. Modern enterprises encourage each worker to design their own individualized training curriculum.',
    assessmentCriteria: ['Natural and consistent use of singular they/their', 'Syntactic agreement across clauses', 'High-level IELTS vocabulary (upskilling, competitiveness, curriculum)'],
    sampleAnalysis: {
      original: 'If a student wants to pass, he or she must submit his or her assignment before he or she leaves.',
      problem: 'Clunky, repetitive use of "he or she" degrades stylistic fluency.',
      correction: 'If a student wants to pass, they must submit their assignment before they leave.',
      explanation: 'Singular "they/their" provides natural, modern gender-neutral cohesion.',
      improvedVersion: 'Every prospective candidate must ensure their documentation is complete prior to submitting their application to the admissions committee.',
    },
  },
  // 12. Advanced - Sentential Relative Clauses for IELTS Cohesion
  {
    id: 'pronoun-wrt-012',
    stage: 12,
    level: 'advanced',
    type: 'academic-paragraph',
    prompt: 'Write an IELTS Writing Task 2 body paragraph explaining why governments should subsidize electric public transport, integrating at least one sentential relative clause (", which ...").',
    instructions: 'Use a sentential relative clause with "which" to evaluate or elaborate on the main clause proposition.',
    targetGrammar: 'Sentential Relative Clauses (", which")',
    wordLimit: 100,
    sampleAnswer:
      'Subsidizing electric public transportation provides multifaceted socioeconomic benefits for urban populations. By offering affordable zero-emission transit, municipal governments actively incentivize commuters to abandon personal combustion-engine vehicles, which directly curtails nitrogen dioxide concentrations in city centers. Furthermore, diminished traffic congestion lowers commercial transit times, a development that accelerates regional economic productivity.',
    assessmentCriteria: ['Flawless sentential relative clause with "which"', 'Demonstrative summary apposition ("a development that...")', 'Band 8.5+ Lexical Resource and Task Achievement'],
    sampleAnalysis: {
      original: 'Governments should lower bus fares. This makes people ride buses. This cleans the air.',
      problem: 'Choppy simple sentences connected with bare "This" create poor coherence.',
      correction: 'Governments should lower bus fares, which encourages public transit ridership and consequently purifies urban air.',
      explanation: 'Using ", which" synthesizes multiple simple clauses into an elegant complex sentence.',
      improvedVersion: 'By lowering public transit fares, municipalities incentivize sustainable commuting patterns, which significantly reduces metropolitan carbon emissions.',
    },
  },
  // 13. IELTS Advanced - Task 1 Data Synthesis
  {
    id: 'pronoun-wrt-013',
    stage: 13,
    level: 'ielts-advanced',
    type: 'ielts-task1',
    prompt: 'Write an IELTS Writing Task 1 overview and data comparison analyzing renewable energy adoption between 2010 and 2025 across multiple continents.',
    instructions: 'Incorporate demonstrative reference ("this upward trajectory", "those of Asia"), relative clauses, and possessive pronouns to create seamless academic comparison.',
    targetGrammar: 'Comparative Demonstratives, Relative Clauses, and Summary Reference',
    wordLimit: 120,
    sampleAnswer:
      'Overall, global investment in renewable infrastructure experienced substantial growth throughout the fifteen-year period, with solar power emerging as the dominant energy source. In 2010, Europe\'s renewable capacity was considerably higher than that of North America; however, by 2025, the growth rates of Asian economies surpassed those of all other regions. This dramatic expansion was primarily driven by government subsidies, which drastically lowered the capital expenditure required for photovoltaic installations.',
    assessmentCriteria: ['Accurate Task 1 overview and specific data comparisons', 'Use of "that of" and "those of"', 'Summary demonstrative anaphora ("This dramatic expansion")', 'Zero grammatical errors'],
    sampleAnalysis: {
      original: 'Europe energy was higher than North America. Asia energy grew faster than other regions energy. This happened because of subsidies.',
      problem: 'Repetitive nouns ("energy"), faulty comparisons, and weak cohesion.',
      correction: 'Europe\'s capacity was higher than that of North America, while Asian growth rates surpassed those of other regions. This expansion was driven by subsidies.',
      explanation: 'Use "that of" and "those of" to eliminate noun repetition and maintain formal parallelism.',
      improvedVersion: 'In 2010, Europe\'s renewable output exceeded that of North America, though Asia\'s subsequent acceleration eclipsed that of all western nations combined.',
    },
  },
  // 14. IELTS Advanced - Task 2 Body Paragraph: AI in Healthcare
  {
    id: 'pronoun-wrt-014',
    stage: 14,
    level: 'ielts-advanced',
    type: 'ielts-task2',
    prompt: 'Write an IELTS Writing Task 2 paragraph discussing how artificial intelligence can assist medical practitioners without replacing human judgment.',
    instructions: 'Maintain impeccable pronoun cohesion by combining anaphoric reference (it, its), relative clauses (who, which), and demonstratives (these diagnostic tools).',
    targetGrammar: 'Advanced Pronoun Cohesion & Referential Precision',
    wordLimit: 120,
    sampleAnswer:
      'The integration of artificial intelligence into diagnostic medicine offers unprecedented clinical precision, yet it must function as a complementary tool rather than a replacement for physician oversight. Deep-learning algorithms can analyze radiological scans in seconds, identifying anomalies that human practitioners might inadvertently overlook. However, medical decisions themselves require empathetic patient communication and ethical accountability, qualities that automated software inherently lacks. Therefore, clinicians who leverage these AI systems alongside their own clinical expertise achieve the highest diagnostic accuracy.',
    assessmentCriteria: ['Diverse pronoun repertoire (it, its, themselves, that, who, these, their)', 'Absolute clarity of nominal antecedents', 'Band 9.0 Lexical Resource & Task Response'],
    sampleAnalysis: {
      original: 'AI helps doctors. AI looks at scans. It is fast. But doctors are needed because it cannot feel emotions.',
      problem: 'Choppy sentences, over-repetition of "AI", and simplistic pronoun reference.',
      correction: 'AI assists medical practitioners by scanning diagnostics rapidly; however, human clinicians are indispensable because automated systems lack emotional intelligence.',
      explanation: 'Combining ideas with complex relative clauses and demonstrative phrases enhances academic cohesion.',
      improvedVersion: 'While artificial intelligence accelerates radiological analysis, it cannot replicate the nuanced clinical judgment and empathy that experienced physicians provide.',
    },
  },
  // 15. IELTS Advanced - Task 2 Body Paragraph: Climate Responsibility
  {
    id: 'pronoun-wrt-015',
    stage: 15,
    level: 'ielts-advanced',
    type: 'ielts-task2',
    prompt: 'Write an IELTS Writing Task 2 body paragraph arguing whether multinational corporations or individual consumers bear greater responsibility for carbon emissions.',
    instructions: 'Use reciprocal pronouns (each other), distributive quantifiers (neither entity, each), and sentential relative clauses to build a sophisticated argument.',
    targetGrammar: 'Distributive, Reciprocal, and Sentential Relative Pronoun Architecture',
    wordLimit: 130,
    sampleAnswer:
      'Although individual consumers must adopt responsible consumption habits, multinational corporations bear primary culpability for global carbon pollution. Commercial conglomerates generate immense greenhouse gas emissions through unsustainable manufacturing practices, which severely destabilizes ecological equilibria worldwide. While consumers can educate themselves on recycling and energy conservation, neither individual austerity nor consumer activism alone is sufficient to dismantle fossil-fuel dependence. Therefore, governments must impose rigorous carbon taxation on major industrial polluters, holding them accountable for their environmental footprint.',
    assessmentCriteria: ['Use of "which", "themselves", "neither ... alone", "them", "their"', 'Sophisticated academic vocabulary (culpability, equilibria, austerity)', 'Impeccable thematic development and cohesion'],
    sampleAnalysis: {
      original: 'Companies pollute the air. Consumers also pollute. But companies are worse. They make products that hurt nature.',
      problem: 'Elementary sentence structures and vague pronoun reference.',
      correction: 'Although consumers contribute to waste, corporations generate the vast majority of industrial emissions, which demands strict regulatory intervention.',
      explanation: 'Synthesizing the ideas with sentential relative clauses elevates the argument to Band 9 standard.',
      improvedVersion: 'While consumers must modify their daily habits, multinational corporations generate the vast majority of emissions, which necessitates decisive governmental regulation.',
    },
  },
  // 16. IELTS Advanced - Sentence Transformation: Repetitive Essay Revision
  {
    id: 'pronoun-wrt-016',
    stage: 16,
    level: 'ielts-advanced',
    type: 'sentence-expansion',
    prompt: 'Transform this repetitive passage into a concise 40–50 word academic sentence: "Universities should build online libraries. Online libraries allow students to access research papers. Accessing research papers online saves students time."',
    instructions: 'Use a combination of relative clauses ("which allow...") and possessive reference to create a unified complex sentence.',
    targetGrammar: 'Relative Clause Synthesis & Anaphoric Condensation',
    wordLimit: 50,
    sampleAnswer:
      'Universities should establish digital repositories, which enable students to access peer-reviewed research papers remotely, thereby saving them valuable study time.',
    assessmentCriteria: ['Elimination of repetitive lexical items', 'Effective use of ", which enable..."', 'Concise, high-band academic synthesis'],
    sampleAnalysis: {
      original: 'Universities should build online libraries. Online libraries allow students to read. Reading online saves time.',
      problem: 'Extreme repetition of "online libraries" and "reading".',
      correction: 'Universities should build online libraries, which allow students to read remotely and save time.',
      explanation: 'Use relative pronoun "which" to combine the clauses seamlessly.',
      improvedVersion: 'Tertiary institutions ought to develop comprehensive digital repositories, which grant scholars immediate remote access to academic literature.',
    },
  },
  // 17. IELTS Advanced - Task 2 Essay Introduction: Urbanization
  {
    id: 'pronoun-wrt-017',
    stage: 17,
    level: 'ielts-advanced',
    type: 'ielts-task2',
    prompt: 'Write an IELTS Writing Task 2 introduction for the topic: "In many nations, people are migrating from countryside regions to large cities. Discuss the causes and effects."',
    instructions: 'Paraphrase the prompt and state your thesis using demonstrative summary reference ("this demographic shift") and relative clauses.',
    targetGrammar: 'Demonstrative Summary Nominalization and Relative Clauses',
    wordLimit: 75,
    sampleAnswer:
      'In recent decades, substantial proportions of rural populations have migrated to metropolitan centers in search of superior employment opportunities. This widespread demographic shift, which places immense strain on municipal transit and housing infrastructure, is primarily driven by regional economic disparities. This essay will examine the underlying factors catalyzing this phenomenon and evaluate its socioeconomic consequences.',
    assessmentCriteria: ['Accurate paraphrasing with "This demographic shift"', 'Sentential/appositive relative clause (which places...)', 'Clear thesis statement and essay mapping'],
    sampleAnalysis: {
      original: 'People move to cities. This is happening everywhere. This essay will talk about why people move.',
      problem: 'Oversimplified grammar, vague "This", and repetitive phrasing.',
      correction: 'Rural citizens are migrating to urban centers. This demographic shift creates challenges that this essay will explore.',
      explanation: 'Nominalizing the prompt as "This demographic shift" provides strong academic cohesion.',
      improvedVersion: 'The ongoing migration of rural inhabitants to metropolitan hubs represents a profound demographic transition, which demands comprehensive urban planning.',
    },
  },
  // 18. IELTS Advanced - Full Body Paragraph: Education vs. Experience
  {
    id: 'pronoun-wrt-018',
    stage: 18,
    level: 'ielts-advanced',
    type: 'ielts-task2',
    prompt: 'Write an IELTS Writing Task 2 paragraph analyzing why practical work experience is often considered more valuable than theoretical university degrees.',
    instructions: 'Incorporate a full range of pronouns (those who, which, their, itself, whose) while maintaining referential transparency and formal academic register.',
    targetGrammar: 'Comprehensive Pronoun Repertoire & Cohesion',
    wordLimit: 125,
    sampleAnswer:
      'Practical workplace experience often equips professionals with adaptable problem-solving skills that theoretical academic curricula cannot fully replicate. Graduates whose education was strictly confined to textbooks frequently find themselves unprepared for dynamic corporate environments where colleagues must collaborate under acute deadlines. In contrast, individuals who have accumulated hands-on industry experience understand operational workflows and customer dynamics, expertise that makes them immediately productive. Although academic qualifications provide foundational knowledge, practical exposure itself fosters cognitive resilience and technical proficiency, assets that employers value most highly in contemporary recruiting.',
    assessmentCriteria: ['Diverse pronoun usage: that, whose, themselves, where, who, them, itself, that', 'Seamless referential transparency without ambiguity', 'Band 9.0 Grammatical Range and Accuracy'],
    sampleAnalysis: {
      original: 'Experience is better than university. Students who only study books cannot work well. They do not know what to do. Employers like workers who worked before.',
      problem: 'Simple vocabulary, vague pronouns, and repetitive syntax.',
      correction: 'Work experience provides practical skills that university degrees lack, making candidates who possess industry exposure more attractive to employers.',
      explanation: 'Synthesize the ideas using restrictive relative clauses and emphatic pronouns.',
      improvedVersion: 'Hands-on professional experience cultivates practical competencies that abstract university coursework often fails to impart, rendering seasoned candidates exceptionally valuable to employers.',
    },
  },
];
