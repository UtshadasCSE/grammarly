import { PronounSpeakingPrompt } from '@/types';

export const pronounSpeakingPrompts: PronounSpeakingPrompt[] = [
  // 1. Beginner - Self Introduction
  {
    id: 'pronoun-spk-001',
    stage: 1,
    level: 'basic',
    type: 'beginner-naming',
    prompt: 'Introduce yourself and describe your daily study routine using personal pronouns (I, me, my, mine).',
    targetGrammar: 'First-person Personal & Possessive Pronouns (I, me, my, mine)',
    targetPronouns: ['I', 'me', 'my', 'mine'],
    targetNouns: ['student', 'routine', 'library', 'goal'],
    hintStarter: 'Hello, I am a dedicated student. My daily routine begins with...',
    duration: 60,
    sampleAnswer:
      'Hello, I am a software engineering student. My daily routine starts early in the morning when I review my lecture notes. Coding gives me immense joy because I can build helpful tools myself. All these project notes are mine, and I review them consistently to achieve my IELTS target.',
  },
  // 2. Beginner - Friends & Classmates
  {
    id: 'pronoun-spk-002',
    stage: 2,
    level: 'basic',
    type: 'describe-scene',
    prompt: 'Talk about your best friend or study partner using third-person pronouns (he/she, him/her, his/hers).',
    targetGrammar: 'Third-person Singular Pronouns (he, she, him, her, his, hers)',
    targetPronouns: ['he/she', 'him/her', 'his/hers'],
    targetNouns: ['friend', 'university', 'subject', 'hobby'],
    hintStarter: 'I would like to talk about my best friend. He/She is...',
    duration: 60,
    sampleAnswer:
      'I would like to talk about my study partner, Farhan. He is an exceptionally hardworking student who attends classes with me. I frequently study with him in the library because his explanations make complex topics simple. That tablet on the table is his, and he uses it to practice IELTS listening every day.',
  },
  // 3. Elementary - Your Family
  {
    id: 'pronoun-spk-003',
    stage: 3,
    level: 'elementary',
    type: 'describe-place',
    prompt: 'Describe your family members and what they enjoy doing together without repeating the word "family".',
    targetGrammar: 'Plural Subject and Object Pronouns (we, us, they, them, ours)',
    targetPronouns: ['we', 'us', 'they', 'them', 'our', 'ours'],
    targetNouns: ['parents', 'siblings', 'weekend', 'dinner'],
    hintStarter: 'There are four people in my household. We enjoy spending time together when...',
    duration: 75,
    sampleAnswer:
      'There are four people in my household: my parents, my younger sister, and me. We enjoy having dinner together every evening where my parents share their experiences with us. My sister and I help each other with academic assignments, and our parents always encourage us to achieve our goals.',
  },
  // 4. Elementary - Your Study Space
  {
    id: 'pronoun-spk-004',
    stage: 4,
    level: 'elementary',
    type: 'describe-scene',
    prompt: 'Describe your study room using demonstrative pronouns (this, that, these, those).',
    targetGrammar: 'Demonstrative Pronouns (this, that, these, those)',
    targetPronouns: ['this', 'that', 'these', 'those'],
    targetNouns: ['desk', 'bookshelf', 'notes', 'laptop'],
    hintStarter: 'This is my personal study space. On my desk, these are...',
    duration: 75,
    sampleAnswer:
      'This is my personal study space where I prepare for academic tests. On my desk, this is my primary laptop, and these are my IELTS grammar notebooks. Over there on the bookshelf, those are reference dictionaries that I consult whenever I encounter challenging vocabulary. All of these tools keep me organized.',
  },
  // 5. Intermediate - Learning English Independently
  {
    id: 'pronoun-spk-005',
    stage: 5,
    level: 'intermediate',
    type: 'describe-place',
    prompt: 'Discuss how you learn English and prepare for IELTS on your own using reflexive pronouns (myself, yourself, themselves).',
    targetGrammar: 'Reflexive & Emphatic Pronouns (myself, ourselves, themselves)',
    targetPronouns: ['myself', 'ourselves', 'themselves'],
    targetNouns: ['practice', 'speaking', 'mock test', 'progress'],
    hintStarter: 'When preparing for IELTS, I usually push myself to practice daily by...',
    duration: 90,
    sampleAnswer:
      'When preparing for IELTS, I teach myself advanced vocabulary and grammar structures every evening. I record myself speaking on various topics to evaluate my pronunciation and fluency. Many successful students prepare by themselves through consistent digital practice, and I believe self-discipline itself is the most critical factor.',
  },
  // 6. Intermediate - University & Campus Life
  {
    id: 'pronoun-spk-006',
    stage: 6,
    level: 'intermediate',
    type: 'ielts-part2',
    prompt: 'Describe a memorable university project and the people with whom you collaborated (IELTS Part 2 style).',
    targetGrammar: 'Relative Pronouns (who, whom, whose, which, that)',
    targetPronouns: ['who', 'whom', 'whose', 'which', 'that'],
    targetNouns: ['project', 'teammates', 'supervisor', 'presentation'],
    hintStarter: 'I would like to speak about a university project that I completed last semester...',
    duration: 120,
    sampleAnswer:
      'I would like to speak about an artificial intelligence project that my team and I completed last semester. The supervisor with whom we collaborated was Professor Haque, whose academic guidance was invaluable. We developed a mobile application that helps visually impaired individuals navigate urban spaces, which ultimately earned our team first place in the departmental competition.',
  },
  // 7. Intermediate - Comparing Two Gadgets or Technologies
  {
    id: 'pronoun-spk-007',
    stage: 7,
    level: 'intermediate',
    type: 'ielts-part2',
    prompt: 'Compare two electronic devices or learning methods using possessive pronouns (mine, yours, theirs, ours).',
    targetGrammar: 'Independent Possessive Pronouns (mine, yours, ours, theirs)',
    targetPronouns: ['mine', 'yours', 'ours', 'theirs'],
    targetNouns: ['device', 'efficiency', 'battery life', 'performance'],
    hintStarter: 'I often compare my laptop with my friend\'s tablet. While his is portable, mine is...',
    duration: 90,
    sampleAnswer:
      'I often compare my laptop with my friend\'s tablet. While his is lightweight and portable, mine offers significantly higher processing power for software development. Our classmates often debate whose approach to digital note-taking is superior; some prefer theirs on physical paper, but ours in digital format allows faster keyword searches.',
  },
  // 8. Upper-Intermediate - Teamwork and Collaboration
  {
    id: 'pronoun-spk-008',
    stage: 8,
    level: 'upper-intermediate',
    type: 'ielts-part2',
    prompt: 'Talk about an experience where team members had to cooperate closely using reciprocal pronouns (each other, one another).',
    targetGrammar: 'Reciprocal Pronouns (each other, one another)',
    targetPronouns: ['each other', 'one another'],
    targetNouns: ['team', 'challenge', 'deadline', 'collaboration'],
    hintStarter: 'During our final year thesis, all five group members supported one another by...',
    duration: 90,
    sampleAnswer:
      'During our final year thesis, all five group members supported one another through rigorous data collection. Whenever any of us encountered difficulties with statistical modeling, we consulted each other and shared our technical insights. By respecting one another\'s strengths, we completed the submission two weeks ahead of schedule.',
  },
  // 9. Upper-Intermediate - Rules and Group Behavior
  {
    id: 'pronoun-spk-009',
    stage: 9,
    level: 'upper-intermediate',
    type: 'ielts-part3',
    prompt: 'Discuss whether everyone in society should follow the same environmental regulations (IELTS Part 3 style).',
    targetGrammar: 'Indefinite Pronouns (everyone, each, nobody, all, someone)',
    targetPronouns: ['everyone', 'each', 'nobody', 'all', 'someone'],
    targetNouns: ['citizens', 'responsibility', 'pollution', 'law'],
    hintStarter: 'In my view, everyone has an ethical responsibility to protect the environment because...',
    duration: 90,
    sampleAnswer:
      'In my view, everyone in society has an ethical obligation to safeguard natural resources. Each of us generates household waste, and nobody should be exempt from recycling laws. If all citizens actively contribute by conserving energy and reducing plastic consumption, our collective efforts will create substantial ecological benefits.',
  },
  // 10. Advanced - Impact of AI on Jobs
  {
    id: 'pronoun-spk-010',
    stage: 10,
    level: 'advanced',
    type: 'ielts-part3',
    prompt: 'Discuss how artificial intelligence influences employment opportunities while maintaining precise pronoun reference.',
    targetGrammar: 'Pronoun Reference & Antecedent Precision (it, they, this development)',
    targetPronouns: ['it', 'they', 'this', 'these'],
    targetNouns: ['artificial intelligence', 'workers', 'automation', 'productivity'],
    hintStarter: 'Artificial intelligence has revolutionized several industries. It enhances worker productivity, but...',
    duration: 90,
    sampleAnswer:
      'Artificial intelligence has revolutionized contemporary employment. While it eliminates routine manual tasks, it simultaneously creates high-demand roles in machine-learning governance. Workers who continuously upskill themselves will thrive in this automated landscape, whereas those who resist technological adoption may face significant career displacement.',
  },
  // 11. Advanced - Higher Education and Free Tuition
  {
    id: 'pronoun-spk-011',
    stage: 11,
    level: 'advanced',
    type: 'ielts-part3',
    prompt: 'Should university education be funded entirely by the state? Discuss the perspectives of governments and students.',
    targetGrammar: 'Distributive Pronouns & Comparison Case (either, neither, than they)',
    targetPronouns: ['either', 'neither', 'they', 'its'],
    targetNouns: ['tuition', 'government', 'taxpayers', 'economic growth'],
    hintStarter: 'Proponents argue that state-funded tertiary education benefits the nation as a whole, while critics claim...',
    duration: 90,
    sampleAnswer:
      'Proponents argue that free higher education enables talented individuals from underprivileged backgrounds to realize their potential. However, when a government subsidizes universities entirely, its national budget may experience acute deficits. Neither approach is flawless, but implementing merit-based scholarships balances equity with fiscal responsibility.',
  },
  // 12. Advanced - Environmental Conservation vs. Industrial Growth
  {
    id: 'pronoun-spk-012',
    stage: 12,
    level: 'advanced',
    type: 'ielts-part3',
    prompt: 'Discuss how developing countries can balance economic growth and environmental preservation.',
    targetGrammar: 'Sentential Relative Pronoun (which) & Demonstrative Summary Reference',
    targetPronouns: ['which', 'this', 'these measures', 'their'],
    targetNouns: ['sustainability', 'industrialization', 'emissions', 'green energy'],
    hintStarter: 'Developing nations frequently face difficult trade-offs between rapid industrialization and ecological conservation. They must...',
    duration: 120,
    sampleAnswer:
      'Developing nations frequently face complex trade-offs between rapid industrialization and environmental preservation. Many governments subsidize fossil fuels to stimulate manufacturing, which unfortunately increases urban carbon emissions. To mitigate this trend, policymakers should transition toward solar and wind power, measures that stimulate green employment while protecting biodiversity.',
  },
  // 13. IELTS Advanced - Urbanization and Mega-cities
  {
    id: 'pronoun-spk-013',
    stage: 13,
    level: 'ielts-advanced',
    type: 'ielts-part3',
    prompt: 'Analyze why people migrate from rural areas to megacities and how cities can accommodate them sustainably.',
    targetGrammar: 'Partitive Quantification & Relative Pronouns (many of whom, those who, its infrastructure)',
    targetPronouns: ['many of whom', 'those who', 'its', 'their'],
    targetNouns: ['urbanization', 'infrastructure', 'healthcare', 'housing'],
    hintStarter: 'Rural-to-urban migration is driven by individuals seeking higher wages and superior healthcare. Many of them...',
    duration: 120,
    sampleAnswer:
      'Rural-to-urban migration is largely driven by ambitious individuals seeking superior educational institutions and career opportunities. Many of those who relocate to metropolitan centers discover that housing shortages and congestion place immense pressure on municipal infrastructure. Therefore, city councils must expand public transit networks so that they can accommodate growing populations sustainably.',
  },
  // 14. IELTS Advanced - Social Media and Public Opinion
  {
    id: 'pronoun-spk-014',
    stage: 14,
    level: 'ielts-advanced',
    type: 'ielts-part3',
    prompt: 'To what extent do social media algorithms shape political opinions and societal polarization?',
    targetGrammar: 'Summary Demonstrative Anaphora (this phenomenon, such algorithms, which)',
    targetPronouns: ['this phenomenon', 'such platforms', 'which', 'themselves'],
    targetNouns: ['algorithms', 'echo chambers', 'polarization', 'media literacy'],
    hintStarter: 'Social media networks utilize personalized algorithms to maximize engagement, which inadvertently creates...',
    duration: 120,
    sampleAnswer:
      'Social media networks utilize algorithmic curation to maximize user engagement, which inadvertently creates ideological echo chambers. Users frequently isolate themselves from opposing viewpoints, a phenomenon that intensifies societal polarization. To counter this development, educational bodies must teach digital literacy so that citizens can evaluate news objectively.',
  },
  // 15. IELTS Advanced - Global Public Health Preparedness
  {
    id: 'pronoun-spk-015',
    stage: 15,
    level: 'ielts-advanced',
    type: 'ielts-part3',
    prompt: 'How can international health organizations ensure equitable vaccine distribution during global pandemics?',
    targetGrammar: 'Formal Case after Prepositions & Indefinite Pronouns (between them, each nation, whose)',
    targetPronouns: ['between them', 'each nation', 'whose', 'their'],
    targetNouns: ['vaccines', 'pharmaceuticals', 'equity', 'collaboration'],
    hintStarter: 'During international health crises, wealthy nations and developing states must coordinate with one another...',
    duration: 120,
    sampleAnswer:
      'During global health crises, international organizations whose mandate is disease eradication must facilitate transparent vaccine sharing. Developed countries and low-income nations must cooperate with one another; between them, they can establish localized manufacturing hubs that ensure rapid clinical distribution during future viral outbreaks.',
  },
  // 16. IELTS Advanced - Space Exploration vs. Earth Problems
  {
    id: 'pronoun-spk-016',
    stage: 16,
    level: 'ielts-advanced',
    type: 'ielts-part3',
    prompt: 'Some believe billions spent on space missions should be redirected to eradicate poverty on Earth. Discuss your view.',
    targetGrammar: 'Demonstrative Comparison (that of space exploration vs that of poverty relief)',
    targetPronouns: ['that of', 'those who', 'which', 'itself'],
    targetNouns: ['space agency', 'scientific innovation', 'poverty', 'budget'],
    hintStarter: 'While some argue that funding for space exploration exceeds that of urgent humanitarian relief, I believe...',
    duration: 120,
    sampleAnswer:
      'While some argue that capital allocated to space exploration should be redirected to domestic poverty relief, I contend that space research itself drives essential terrestrial innovations. Satellite technology that monitors climate patterns and agricultural yields originates directly from aerospace programs, which ultimately benefits global food security.',
  },
  // 17. IELTS Advanced - Preserving Minority Languages
  {
    id: 'pronoun-spk-017',
    stage: 17,
    level: 'ielts-advanced',
    type: 'ielts-part3',
    prompt: 'Why is it vital to preserve indigenous and minority languages in an increasingly globalized world?',
    targetGrammar: 'Appositive Relative Clauses & Possessive Reference (whose heritage, each of which)',
    targetPronouns: ['whose heritage', 'each of which', 'it', 'themselves'],
    targetNouns: ['indigenous languages', 'cultural identity', 'globalization', 'heritage'],
    hintStarter: 'Indigenous languages encapsulate unique cultural perspectives and oral traditions, each of which represents...',
    duration: 120,
    sampleAnswer:
      'Indigenous languages encapsulate centuries of ecological wisdom and oral literature, each of which represents an irreplaceable dimension of human heritage. When a minority community loses its native tongue, its cultural identity is severely eroded. Governments must therefore fund bilingual curricula so that future generations can express themselves in their ancestral languages.',
  },
  // 18. IELTS Advanced - Fast Fashion vs. Sustainable Consumption
  {
    id: 'pronoun-spk-018',
    stage: 18,
    level: 'ielts-advanced',
    type: 'ielts-part3',
    prompt: 'Evaluate the environmental consequences of the fast-fashion industry and discuss how consumers can modify their habits.',
    targetGrammar: 'Comprehensive Pronoun Range (those who, which, its footprint, themselves)',
    targetPronouns: ['those who', 'which', 'its footprint', 'their'],
    targetNouns: ['fast fashion', 'textile waste', 'consumer behavior', 'sustainability'],
    hintStarter: 'The global fast-fashion sector produces massive textile waste, which severely contaminates freshwater sources...',
    duration: 120,
    sampleAnswer:
      'The fast-fashion sector produces vast volumes of non-biodegradable textile waste, which severely strains municipal landfills and contaminates freshwater ecosystems. Consumers who purchase disposable garments frequently discard them after minimal usage. To counteract this environmental footprint, individuals should educate themselves on garment longevity and support ethical brands.',
  },
];
