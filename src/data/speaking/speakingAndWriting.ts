import type { SpeakingPrompt, WritingTask } from '@/types';

export const speakingPrompts: SpeakingPrompt[] = [
  // Present Simple - Stage 1: Read Aloud
  {
    id: 'sp-simple-001', tense: 'simple', stage: 1, type: 'read-aloud',
    prompt: 'Read aloud: "Technology changes how people work. Many professionals now use digital tools every day. Companies expect employees to update their skills regularly."',
    targetTenseUsage: 'Focus on the -s endings: changes, uses, expects.',
    sampleAnswer: 'Technology changes how people work. Many professionals now use digital tools every day. Companies expect employees to update their skills regularly.',
  },
  // Present Simple - Stage 3: Short Answer
  {
    id: 'sp-simple-003', tense: 'simple', stage: 3, type: 'short-answer',
    prompt: 'What do you usually do to improve your English skills?',
    targetTenseUsage: 'Use Present Simple to describe your regular habits. Include verbs like: study, practise, read, watch, listen.',
    sampleAnswer: 'I usually practise English every morning. I read articles about technology and education. I also watch English videos online and listen to podcasts during my commute.',
  },
  {
    id: 'sp-simple-004', tense: 'simple', stage: 4, type: 'speak-30',
    duration: 30,
    prompt: 'Speak for 30 seconds: What do you think about the role of technology in education? Use Present Simple to share your opinion.',
    targetTenseUsage: 'Use: think, believe, know, understand, play a role, help, make, enable.',
    sampleAnswer: 'I believe technology plays an important role in modern education. It makes learning more accessible for students in remote areas. Many teachers use digital tools to create interactive lessons. I think technology helps students learn at their own pace, which is very useful.',
  },
  {
    id: 'sp-simple-005', tense: 'simple', stage: 5, type: 'speak-60',
    duration: 60,
    prompt: 'Speak for 1 minute: Describe the daily routine of a professional in a field that interests you. What do they do every day?',
    targetTenseUsage: 'Use Present Simple throughout. Include: wakes up, goes, studies, analyses, writes, communicates, presents, uses, believes.',
    sampleAnswer: 'A data scientist typically starts their day by reviewing datasets from the previous day. They analyse trends and identify patterns that might be useful for the company. They usually spend several hours writing code to process information. In the afternoon, they often collaborate with other team members and present their findings. They generally believe that data-driven decisions improve business performance.',
  },
  // Present Perfect - Stage 3: Short Answer
  {
    id: 'sp-perfect-003', tense: 'perfect', stage: 3, type: 'short-answer',
    prompt: 'What technological changes have made the biggest impact on your daily life?',
    targetTenseUsage: 'Use Present Perfect to describe changes: have changed, have improved, have made, have transformed.',
    sampleAnswer: 'Smartphones have completely transformed the way I communicate. Social media platforms have connected me with people from around the world. Online learning apps have also helped me improve my English. I think these technologies have made life significantly more convenient.',
  },
  {
    id: 'sp-perfect-004', tense: 'perfect', stage: 4, type: 'speak-30',
    duration: 30,
    prompt: 'Speak for 30 seconds: Talk about something you have achieved this year that you are proud of.',
    targetTenseUsage: 'Use: have achieved, have completed, have learned, have improved, have started.',
    sampleAnswer: 'This year, I have made significant progress in my English studies. I have completed several grammar modules and practised speaking every week. I have also read three books in English. I feel I have improved my confidence when communicating with international colleagues.',
  },
  {
    id: 'sp-perfect-006', tense: 'perfect', stage: 6, type: 'ielts-part2',
    duration: 120,
    prompt: 'IELTS Speaking Part 2 — Cue Card:\n\nDescribe a technological development that has changed your society.\n\nYou should say:\n• What the development is\n• How long it has been used\n• How it has changed people\'s daily lives\n• And explain whether you think this change has been positive or negative.',
    targetTenseUsage: 'Use Present Perfect throughout: has changed, have adopted, has transformed, has enabled, has created.',
    sampleAnswer: 'I would like to talk about smartphones and how they have fundamentally transformed daily life in my country. Smartphones have been widely available for about fifteen years, but their impact has grown exponentially over the past decade. They have changed the way people communicate, work, learn, and even entertain themselves. Many people have become heavily reliant on them for tasks that previously required visiting a bank, post office, or library. In terms of education, smartphones have given millions of students access to resources that were previously unavailable. Overall, I believe this development has been largely positive, though the issues of digital addiction and privacy concerns have also emerged as significant challenges.',
  },
  // Present Continuous - Short Answer
  {
    id: 'sp-continuous-003', tense: 'continuous', stage: 3, type: 'short-answer',
    prompt: 'What changes are currently taking place in your city or country?',
    targetTenseUsage: 'Use Present Continuous: is growing, are building, is changing, are improving, is becoming.',
    sampleAnswer: 'My city is currently undergoing significant changes. The government is investing heavily in public transport. New roads and metro lines are being constructed in several areas. The city is also becoming more environmentally conscious — authorities are introducing electric buses and planting more trees. I think these changes are making the city more liveable.',
  },
  // Present Perfect Continuous - Short Answer
  {
    id: 'sp-ppc-003', tense: 'perfect-continuous', stage: 3, type: 'short-answer',
    prompt: 'What have you been doing recently to improve your English?',
    targetTenseUsage: 'Use Present Perfect Continuous: have been studying, have been practising, have been reading, have been listening.',
    sampleAnswer: 'I have been studying English grammar intensively for the past two months. I have been practising speaking every morning using apps on my phone. I have also been reading English news articles daily and listening to podcasts during my commute. I feel that my fluency has improved significantly since I started this routine.',
  },
  {
    id: 'sp-ppc-004', tense: 'perfect-continuous', stage: 4, type: 'speak-30',
    duration: 30,
    prompt: 'Speak for 30 seconds: Talk about something you have been working on for a long time.',
    targetTenseUsage: 'Use: have been working, have been trying, have been developing, for + time period.',
    sampleAnswer: 'I have been working on my IELTS preparation for about six months now. I have been focusing particularly on writing and speaking, which are my weakest areas. I have been attending a weekly study group and practising with past papers. I feel more confident than when I first started.',
  },
];

export const writingTasks: WritingTask[] = [
  {
    id: 'wt-simple-001', tense: 'simple', type: 'sentence',
    prompt: 'Write five sentences about the role of technology in modern education using Present Simple.',
    instructions: 'Each sentence should demonstrate a different use of Present Simple: a general truth, a habit, a permanent state, a fact, and an opinion.',
    targetTenseUsage: 'Use: transforms, enables, provides, helps, believe, plays, shows.',
    wordLimit: 100,
    sampleAnswer: 'Technology plays a fundamental role in modern education. Digital tools enable students to access vast learning resources from anywhere in the world. Many learners prefer online platforms because they offer flexible scheduling. Studies consistently show that interactive learning improves academic performance. Educators generally believe that technology prepares students for the demands of the modern workforce.',
    assessmentCriteria: ['Subject-verb agreement (especially he/she/it + -s)', 'Correct use of stative vs dynamic verbs', 'Variety of sentence structures', 'Appropriate academic vocabulary', 'No use of Present Continuous for habits or general truths'],
  },
  {
    id: 'wt-perfect-001', tense: 'perfect', type: 'paragraph',
    prompt: 'Write a paragraph (80–100 words) explaining how technology has changed education in recent years.',
    instructions: 'Use Present Perfect to connect past changes to the present. Include at least 4 different Present Perfect verbs.',
    targetTenseUsage: 'Use: has transformed, have developed, has created, has made, have adopted, has enabled.',
    wordLimit: 100,
    sampleAnswer: 'Technology has fundamentally transformed the educational landscape in recent years. Digital platforms have made high-quality learning accessible to students in remote regions who previously lacked access to qualified teachers. Institutions have developed innovative online courses that reach global audiences. Artificial intelligence has created personalised learning experiences tailored to individual student needs. Furthermore, educators have adopted data-driven assessment tools that provide real-time insights into student progress, enabling more responsive and effective teaching.',
    assessmentCriteria: ['Correct form of Present Perfect (have/has + past participle)', 'No use of specific past times with Present Perfect', 'Varied vocabulary', 'Academic sentence structures', 'Logical connectors (furthermore, additionally, however)'],
  },
  {
    id: 'wt-perfect-002', tense: 'perfect', type: 'task2',
    prompt: 'IELTS Writing Task 2 — Opinion Essay\n\nSome people believe that technology has improved the quality of education, while others argue that it has created new problems for learners and teachers.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
    instructions: 'Use a mix of Present Perfect (for changes/achievements), Present Simple (for general facts/opinions), and Present Continuous (for current trends) to demonstrate grammatical range.',
    targetTenseUsage: 'Present Perfect for changes; Present Simple for facts and opinions; Present Continuous for trends.',
    wordLimit: 300,
    timeLimit: 40,
    sampleAnswer: 'Technology has undeniably transformed education in numerous positive ways, though it has also introduced a set of complex challenges that require careful consideration.\n\nOn the positive side, digital tools have dramatically expanded access to high-quality educational resources. Students in remote regions who previously lacked qualified teachers can now access world-class lectures and materials through online platforms. Furthermore, adaptive learning systems have enabled personalised instruction, catering to individual learning speeds and styles. Research consistently shows that interactive, technology-enhanced lessons improve retention and engagement.\n\nHowever, technology has also created significant problems. The rapid pace of digital change means that many educators struggle to keep their skills current. Additionally, the proliferation of information online has made critical thinking more important — yet many students find it difficult to distinguish reliable sources from misinformation. There is also growing concern about screen addiction, which is affecting students\' concentration and mental health.\n\nIn conclusion, while technology has brought remarkable improvements to education, its benefits are not universal. Ensuring equity of access remains a critical challenge, as the digital divide continues to disadvantage learners from low-income backgrounds. I believe that technology should be treated as a tool that supplements, rather than replaces, skilled human teaching.',
    assessmentCriteria: ['Task achievement (addresses all parts of the question)', 'Coherence and cohesion (clear paragraphing, logical flow)', 'Lexical resource (academic vocabulary, collocations)', 'Grammatical range and accuracy (mix of tenses, complex structures)', 'Word count (250+)'],
  },
  {
    id: 'wt-ppc-001', tense: 'perfect-continuous', type: 'paragraph',
    prompt: 'Write a short paragraph (80–100 words) about a global challenge that has been developing for a long time and what the world has been doing to address it.',
    instructions: 'Use Present Perfect Continuous for ongoing efforts and processes, and Present Perfect for results achieved.',
    targetTenseUsage: 'Use: has been rising, have been working, has been expanding, have been monitoring, has achieved, has committed.',
    wordLimit: 100,
    sampleAnswer: 'Climate change has been intensifying for decades, with global temperatures rising at an alarming rate due to unchecked industrial emissions. Scientists have been monitoring environmental data since the 1970s, documenting the growing impact on biodiversity and weather patterns. Meanwhile, governments and international organisations have been working to develop binding agreements to limit carbon emissions. Although renewable energy adoption has been accelerating, the pace of change has not been sufficient to meet the targets established under the Paris Agreement. The global community has been falling short of the transformative action required.',
    assessmentCriteria: ['Correct form: has/have + been + V-ing', 'Appropriate contrast with Present Perfect (for results vs processes)', 'Vocabulary variety', 'Academic register', 'Logical structure'],
  },
];
