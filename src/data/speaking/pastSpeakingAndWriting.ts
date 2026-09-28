import type { SpeakingPrompt, WritingTask } from '@/types';

export const pastSpeakingPrompts: SpeakingPrompt[] = [
  // ─── Past Simple Speaking ─────────────────────────────────────────────
  {
    id: 'sp-past-simple-001', tense: 'past-simple', stage: 1, type: 'read-aloud',
    prompt: 'Read aloud: "Last year, scientists discovered a new species of deep-sea creature near the Pacific Ocean floor. The discovery surprised many marine biologists, who immediately published their findings in a leading journal."',
    targetTenseUsage: 'Focus on the past verb forms: discovered, surprised, published.',
    sampleAnswer: 'Last year, scientists discovered a new species of deep-sea creature near the Pacific Ocean floor. The discovery surprised many marine biologists, who immediately published their findings in a leading journal.',
  },
  {
    id: 'sp-past-simple-002', tense: 'past-simple', stage: 3, type: 'short-answer',
    prompt: 'Describe a memorable journey you made in the past. Where did you go? What did you do? What happened?',
    targetTenseUsage: 'Use Past Simple to describe the sequence: I went, I arrived, I visited, I saw, I met, it was.',
    sampleAnswer: 'Last summer, I travelled to Cox\'s Bazar with my family. We left Dhaka early in the morning and arrived by afternoon. We visited the beach and walked along the shore. The view was beautiful — I had never seen such a long stretch of sand before. We stayed for three days and came back feeling refreshed.',
  },
  {
    id: 'sp-past-simple-003', tense: 'past-simple', stage: 4, type: 'speak-30',
    duration: 30,
    prompt: 'Speak for 30 seconds: Talk about an important decision you made in the past. What happened? What was the result?',
    targetTenseUsage: 'Use: decided, chose, applied, studied, worked, resulted, changed, helped.',
    sampleAnswer: 'One of the most important decisions I made was to start learning English seriously. I decided to dedicate at least two hours every day to grammar and vocabulary. I joined a course, studied diligently, and practised speaking with native speakers online. That decision changed my career prospects significantly.',
  },
  {
    id: 'sp-past-simple-004', tense: 'past-simple', stage: 5, type: 'speak-60',
    duration: 60,
    prompt: 'Speak for 1 minute: Describe a challenging situation you faced in the past and how you resolved it.',
    targetTenseUsage: 'Use a narrative with Past Simple: faced, encountered, decided, took, overcame, learned, succeeded.',
    sampleAnswer: 'During my final year at university, I faced a very difficult situation. I had to complete my thesis while simultaneously preparing for several important exams. I felt overwhelmed at first, so I created a detailed daily schedule. I woke up early every morning and studied for three hours before attending classes. I stayed focused and avoided distractions. Gradually, I managed to complete each task. When I finally submitted my thesis and passed all my exams, I felt an enormous sense of achievement. That experience taught me the value of discipline and time management.',
  },
  {
    id: 'sp-past-simple-005', tense: 'past-simple', stage: 6, type: 'ielts-part2',
    duration: 120,
    prompt: 'IELTS Speaking Part 2 — Cue Card:\n\nDescribe a historical event that you find particularly interesting.\n\nYou should say:\n• What the event was\n• When and where it happened\n• What caused it\n• And explain why you find it interesting.',
    targetTenseUsage: 'Use Past Simple throughout: happened, caused, began, ended, led to, resulted in, transformed, changed, affected.',
    sampleAnswer: 'I would like to talk about the Moon Landing in 1969, which I find one of the most remarkable events in human history. On 20 July 1969, Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon as part of NASA\'s Apollo 11 mission. The space race began in the 1950s when the Soviet Union launched Sputnik, the world\'s first satellite. This shocked the United States, which then invested heavily in its space programme. Eventually, thousands of engineers and scientists worked tirelessly to make the Moon landing possible. I find this event fascinating because it demonstrated what human beings can achieve when they combine vision, determination, and collective effort. It also changed our understanding of the universe and inspired generations of scientists and explorers.',
  },
  {
    id: 'sp-past-simple-006', tense: 'past-simple', stage: 7, type: 'ielts-part3',
    prompt: 'IELTS Speaking Part 3 — Discussion:\n\n"In what ways do historical events shape the modern world? Give examples from your country\'s history."',
    targetTenseUsage: 'Combine Past Simple (historical facts: happened, established, introduced) with Present Simple (current effects: affects, shapes, influences).',
    sampleAnswer: 'Historical events leave lasting marks on societies. In Bangladesh, for example, the Liberation War of 1971 profoundly shaped the national identity and political landscape. The struggle for independence established a strong sense of cultural pride and motivated future generations to value education and national development. Similarly, the partition of 1947 influenced migration patterns, religious dynamics, and regional relationships that continue to affect South Asia today. I believe understanding historical events helps societies avoid repeating past mistakes and build stronger institutions.',
  },
  // ─── Past Continuous Speaking ──────────────────────────────────────────
  {
    id: 'sp-past-continuous-001', tense: 'past-continuous', stage: 1, type: 'read-aloud',
    prompt: 'Read aloud: "At the time of the earthquake, thousands of people were going about their daily activities. Some were shopping, others were working in offices, and students were attending their afternoon classes."',
    targetTenseUsage: 'Focus on the Past Continuous forms: were going, were shopping, were working, were attending.',
    sampleAnswer: 'At the time of the earthquake, thousands of people were going about their daily activities. Some were shopping, others were working in offices, and students were attending their afternoon classes.',
  },
  {
    id: 'sp-past-continuous-002', tense: 'past-continuous', stage: 3, type: 'short-answer',
    prompt: 'Describe what you were doing yesterday at 6 pm. Use Past Continuous.',
    targetTenseUsage: 'I was... / We were... / At that time, I was... / While I was...',
    sampleAnswer: 'Yesterday at 6 pm, I was preparing dinner at home. While I was cooking, my sister was watching the news on television. It was a quiet evening — the sun was setting, and the neighbours were probably relaxing after work. I remember I was also listening to a podcast about English grammar at the same time.',
  },
  {
    id: 'sp-past-continuous-003', tense: 'past-continuous', stage: 4, type: 'speak-30',
    duration: 30,
    prompt: 'Speak for 30 seconds: Describe a memorable or unexpected event that interrupted something you were doing.',
    targetTenseUsage: 'Use: I was + V-ing when something happened. Include: was working, was studying, was walking, when I received, when I saw.',
    sampleAnswer: 'I was studying for my IELTS exam one evening when my friend called me with exciting news. He was laughing so much that I could not understand him at first. I was sitting at my desk, completely focused on grammar exercises, when this unexpected phone call arrived. It turned out he had been accepted into his dream university, which was wonderful news.',
  },
  {
    id: 'sp-past-continuous-004', tense: 'past-continuous', stage: 5, type: 'speak-60',
    duration: 60,
    prompt: 'Speak for 1 minute: Describe what was happening in your city or town at a specific point in the past. Use Past Continuous to paint a vivid picture.',
    targetTenseUsage: 'Use multiple simultaneous actions: people were + V-ing, the city was + V-ing, vendors were, children were, traffic was.',
    sampleAnswer: 'Let me describe what was happening in my city on a typical festival evening a few years ago. People were flooding the streets in colourful traditional clothing. Vendors were selling sweets and snacks from wooden stalls. Children were running between the crowds, holding sparklers and laughing. Musicians were playing traditional folk songs in the background, creating a festive atmosphere. Meanwhile, families were gathering in the parks, and young people were taking photographs to capture the celebration. Street lights were glowing and fireworks were lighting up the sky every few minutes. It was a beautiful scene that I still remember clearly today.',
  },
  {
    id: 'sp-past-continuous-005', tense: 'past-continuous', stage: 6, type: 'ielts-part2',
    duration: 120,
    prompt: 'IELTS Speaking Part 2 — Cue Card:\n\nDescribe a time when you were working on a challenging project or task.\n\nYou should say:\n• What the project was\n• What you were doing during that time\n• What challenges you were facing\n• And explain how you felt while you were working on it.',
    targetTenseUsage: 'Use Past Continuous throughout: was working, was managing, was trying, was dealing with, was collaborating.',
    sampleAnswer: 'I would like to describe a research project I was working on during the final semester of my undergraduate degree. I was conducting a community survey as part of my dissertation, which required interviewing over 100 people. While I was designing the questionnaire, I was simultaneously reviewing academic literature on the topic. Every day, I was travelling to different parts of the city to collect responses. At the same time, I was attending lectures and completing other coursework. I was feeling the pressure of the deadline throughout the entire process, but I was also learning an enormous amount. My supervisor was guiding me regularly, and gradually I was becoming more confident in my research methodology. When I finally completed and submitted the project, I felt an overwhelming sense of relief and pride.',
  },
  // ─── Past Perfect Speaking ────────────────────────────────────────────
  {
    id: 'sp-past-perfect-001', tense: 'past-perfect', stage: 1, type: 'read-aloud',
    prompt: 'Read aloud: "By the time the relief teams arrived, the flood had already destroyed most of the crops. Many families had lost their homes, and the community had not yet received any government assistance."',
    targetTenseUsage: 'Focus on the Past Perfect forms: had destroyed, had lost, had not received.',
    sampleAnswer: 'By the time the relief teams arrived, the flood had already destroyed most of the crops. Many families had lost their homes, and the community had not yet received any government assistance.',
  },
  {
    id: 'sp-past-perfect-002', tense: 'past-perfect', stage: 3, type: 'short-answer',
    prompt: 'Tell me about a time when you arrived somewhere and found that something had already happened before you got there.',
    targetTenseUsage: 'Use: By the time I arrived... had already... / When I got there... had...',
    sampleAnswer: 'Last year, I went to visit my friend at his new workplace. But by the time I arrived, he had already left for an emergency meeting. His colleagues told me he had been there all morning but had rushed out just thirty minutes before I arrived. I had not called ahead, which was my mistake. I had planned the visit for weeks, so I was disappointed, but we rescheduled for the following week.',
  },
  {
    id: 'sp-past-perfect-003', tense: 'past-perfect', stage: 4, type: 'speak-30',
    duration: 30,
    prompt: 'Speak for 30 seconds: Talk about something you had prepared or planned for a long time before it finally happened.',
    targetTenseUsage: 'Use: I had prepared, had practised, had studied, had been working on... before the event finally happened.',
    sampleAnswer: 'My IELTS exam was a moment I had been preparing for for almost a year. By the time I sat the test, I had completed over twenty practice papers. I had studied grammar rules thoroughly, had expanded my vocabulary, and had practised speaking with my teacher regularly. All the preparation I had done gave me considerable confidence on the day of the exam itself.',
  },
  {
    id: 'sp-past-perfect-004', tense: 'past-perfect', stage: 5, type: 'speak-60',
    duration: 60,
    prompt: 'Speak for 1 minute: Describe an experience where you had to deal with a situation caused by something that had happened previously.',
    targetTenseUsage: 'Use Past Perfect to explain causes: because/since + had + V3. Use Past Simple for the effects.',
    sampleAnswer: 'A couple of years ago, I faced a frustrating situation at work. I had been assigned to deliver a presentation to senior management, but when I arrived at the office, I realised I had left my USB drive at home. It contained all the slides I had prepared for weeks. I had worked incredibly hard on that presentation — I had revised it multiple times and had even rehearsed it in front of my colleagues. Because I had not saved a backup copy online, I was in a very difficult position. Fortunately, one of my colleagues had saved an earlier version on her computer. Although it was not the final version, it was close enough. I quickly updated it and delivered the presentation. From that day on, I always save important files in multiple locations.',
  },
  {
    id: 'sp-past-perfect-005', tense: 'past-perfect', stage: 6, type: 'ielts-part2',
    duration: 120,
    prompt: 'IELTS Speaking Part 2 — Cue Card:\n\nDescribe a time when something went wrong because of a lack of preparation or planning.\n\nYou should say:\n• What the situation was\n• What had happened before things went wrong\n• What you did to deal with it\n• And explain what you learned from the experience.',
    targetTenseUsage: 'Use Past Perfect for prior events (what had happened before), Past Simple for what occurred and what you did.',
    sampleAnswer: 'I would like to describe a time when I participated in a debate competition at my university. I had been selected to represent my faculty and was genuinely excited. However, I had not prepared as thoroughly as I should have. I had spent most of my time on other activities and had underestimated the difficulty of the opponent\'s arguments. By the time I stood at the podium, I realised that I had forgotten several of my key points. My notes, which I had written hastily the night before, were unclear and disorganised. I struggled through the debate and eventually lost. It was humbling, but incredibly instructive. After that experience, I promised myself I would never enter any formal event without proper preparation. I had learned that overconfidence and poor planning are a dangerous combination.',
  },
  // ─── Past Perfect Continuous Speaking ────────────────────────────────
  {
    id: 'sp-ppc2-001', tense: 'past-perfect-continuous', stage: 1, type: 'read-aloud',
    prompt: 'Read aloud: "By the time the investigation concluded, the fraud had been occurring for over three years. The perpetrators had been systematically diverting funds, and the oversight committee had been failing to detect the irregularities."',
    targetTenseUsage: 'Focus on: had been occurring, had been diverting, had been failing.',
    sampleAnswer: 'By the time the investigation concluded, the fraud had been occurring for over three years. The perpetrators had been systematically diverting funds, and the oversight committee had been failing to detect the irregularities.',
  },
  {
    id: 'sp-ppc2-002', tense: 'past-perfect-continuous', stage: 3, type: 'short-answer',
    prompt: 'Describe something you had been doing for a long time before a significant change happened in your life.',
    targetTenseUsage: 'Use: I had been + V-ing + for [duration] + before/when... Focus on duration emphasised by PPC.',
    sampleAnswer: 'Before I enrolled in this English course, I had been struggling with grammar for almost two years. I had been trying to improve on my own by watching videos and reading books, but I was not making consistent progress. I had been making the same mistakes repeatedly. When I finally joined a structured programme with a teacher, everything changed. The years I had been spending on self-study gave me a foundation, but proper guidance helped me apply what I knew more effectively.',
  },
  {
    id: 'sp-ppc2-003', tense: 'past-perfect-continuous', stage: 4, type: 'speak-30',
    duration: 30,
    prompt: 'Speak for 30 seconds: Talk about something you had been working towards for a long time before you finally achieved it.',
    targetTenseUsage: 'I had been working/preparing/saving/trying for... before I finally...',
    sampleAnswer: 'For nearly two years, I had been saving money and preparing for my first international trip. I had been researching destinations, comparing flight prices, and studying the local culture. By the time I finally boarded the plane, I had been planning the journey in my mind for so long that it almost felt surreal. The experience was even more rewarding because of all the anticipation and effort I had been putting into making it happen.',
  },
  {
    id: 'sp-ppc2-004', tense: 'past-perfect-continuous', stage: 5, type: 'speak-60',
    duration: 60,
    prompt: 'Speak for 1 minute: Describe a health, environmental, or social problem that had been developing for a long time before it was finally addressed.',
    targetTenseUsage: 'Use Past Perfect Continuous for the ongoing problem: had been worsening/developing/growing. Use Past Simple for the response.',
    sampleAnswer: 'In many urban areas, air pollution had been deteriorating steadily for decades before governments began taking it seriously. Industrial factories had been emitting harmful gases without adequate filtration systems. Traffic volumes had been increasing every year, adding enormous quantities of carbon monoxide and particulate matter to the atmosphere. Meanwhile, authorities had been prioritising economic growth over environmental protection. By the time health statistics revealed a sharp rise in respiratory diseases, the air quality had already been declining for twenty or thirty years. Eventually, public pressure and scientific evidence forced policymakers to introduce stricter regulations on emissions, invest in cleaner public transport, and establish green zones in city centres. This example illustrates that environmental problems rarely emerge suddenly — they tend to develop gradually until the consequences become impossible to ignore.',
  },
  {
    id: 'sp-ppc2-005', tense: 'past-perfect-continuous', stage: 6, type: 'ielts-part2',
    duration: 120,
    prompt: 'IELTS Speaking Part 2 — Cue Card:\n\nDescribe a significant achievement that required long preparation.\n\nYou should say:\n• What the achievement was\n• How long you had been preparing for it\n• What you had been doing to prepare\n• And explain how you felt when you finally achieved it.',
    targetTenseUsage: 'Use Past Perfect Continuous for preparation (had been practising, training, studying, working), and Past Simple for the achievement itself.',
    sampleAnswer: 'I would like to talk about passing my university entrance examination, which was one of the proudest moments of my academic life. By the time I sat the exam, I had been preparing for it for almost two years. During those two years, I had been attending extra classes every weekend and studying for several hours each evening. I had been working through past papers, identifying my weak areas in mathematics and science, and systematically strengthening them. I had also been managing considerable stress, because the competition for places was fierce and the stakes were high. There were moments when I felt like giving up, but I reminded myself of the goal I had been working towards for so long. On the day of the results, when I saw my name on the list of accepted candidates, I felt an overwhelming mixture of relief and joy. All the hours I had been investing suddenly felt worthwhile. It was a turning point in my life, and it taught me that sustained, consistent effort — even when progress feels slow — eventually produces results.',
  },
];

export const pastWritingTasks: WritingTask[] = [
  // Past Simple Writing
  {
    id: 'wt-past-simple-001', tense: 'past-simple', type: 'paragraph',
    prompt: 'Write a paragraph about a significant event in your country\'s history.',
    instructions: 'Use Past Simple throughout. Include: what happened, when it happened, why it was significant, and what resulted from it. Write 80–100 words.',
    targetTenseUsage: 'Use Past Simple for all historical facts and events.',
    wordLimit: 100, timeLimit: 10,
    sampleAnswer: 'In 1971, Bangladesh achieved independence after a nine-month Liberation War. The conflict began on 25 March when the Pakistani military launched a brutal crackdown on Bengali civilians. Millions of people fled to neighbouring India as refugees. The Bangladeshi freedom fighters, with support from India, resisted the Pakistani army. On 16 December 1971, Pakistan formally surrendered, and Bangladesh became an independent nation. The war cost enormous human lives, but it established a sovereign state with a distinct cultural and linguistic identity. The Liberation War continues to inspire national pride and solidarity.',
    assessmentCriteria: ['Past Simple used correctly throughout', 'Historical sequence clear', 'Irregular verbs used accurately', 'Academic vocabulary appropriate'],
  },
  {
    id: 'wt-past-simple-002', tense: 'past-simple', type: 'task1',
    prompt: 'IELTS Task 1: The graph below shows carbon dioxide emissions in five countries between 2000 and 2020. Write a 150-word summary describing the main trends.',
    instructions: 'Use Past Simple for all data from the 2000-2020 period. Describe increases, decreases, and comparisons.',
    targetTenseUsage: 'Increased, decreased, rose, fell, remained, peaked, declined, fluctuated, accounted for.',
    wordLimit: 150, timeLimit: 20,
    sampleAnswer: 'The graph illustrates carbon dioxide emissions in five countries between 2000 and 2020. Overall, emissions patterns differed significantly across the nations during this period. Country A recorded the highest emissions throughout, which peaked at approximately 8 gigatonnes in 2010 before declining slightly by 2020. Country B experienced a steady rise from 2 to 4 gigatonnes over the two decades. In contrast, Country C saw a dramatic fall of nearly 50%, from 6 gigatonnes in 2000 to just 3 gigatonnes by 2020. Countries D and E maintained relatively stable emission levels, fluctuating between 1 and 2 gigatonnes throughout the period. Overall, the data revealed that while some nations reduced their emissions substantially, others continued to increase their carbon output.',
    assessmentCriteria: ['Past Simple used consistently for 2000-2020 data', 'Key trends identified', 'Data referenced accurately', 'Academic verbs used: peaked, declined, fluctuated'],
  },
  // Past Continuous Writing
  {
    id: 'wt-past-continuous-001', tense: 'past-continuous', type: 'paragraph',
    prompt: 'Write a narrative paragraph describing a scene from the past using Past Continuous to set the background.',
    instructions: 'Set the scene using Past Continuous (what was happening), then introduce a key event using Past Simple (what happened). Write 80–100 words.',
    targetTenseUsage: 'Past Continuous for background (was/were + V-ing); Past Simple for the key event.',
    wordLimit: 100, timeLimit: 10,
    sampleAnswer: 'It was a quiet Tuesday afternoon at the university library. Students were hunched over their textbooks, laptops were glowing softly in the dimly lit room, and the librarian was carefully arranging books on the shelves. Somewhere in the back, a group of students were whispering about an upcoming exam. Then, without warning, the fire alarm started ringing. Everyone looked up in shock. People were hurrying toward the exits within seconds, clutching their bags and books. What had been a peaceful study environment transformed instantly into a scene of controlled chaos.',
    assessmentCriteria: ['Past Continuous sets the background scene', 'Past Simple introduces the interrupting event', 'Vivid narrative language', 'Variety of verbs used'],
  },
  // Past Perfect Writing
  {
    id: 'wt-past-perfect-001', tense: 'past-perfect', type: 'paragraph',
    prompt: 'Write a paragraph explaining a past situation using Past Perfect to show cause and effect.',
    instructions: 'Use Past Perfect to explain the causes or background events that led to a past result. Write 80–100 words.',
    targetTenseUsage: 'Past Perfect (had + V3) for earlier events; Past Simple for the results.',
    wordLimit: 100, timeLimit: 10,
    sampleAnswer: 'When the factory inspection team finally visited the plant, they discovered serious safety violations. The management had ignored multiple warning letters sent over the previous two years. Workers had not received proper safety training, and the equipment had deteriorated significantly due to a lack of maintenance. By the time the inspectors arrived, several minor accidents had already occurred. The authorities had no choice but to shut the facility down immediately. If the management had addressed the concerns earlier, the closure would have been entirely avoidable.',
    assessmentCriteria: ['Past Perfect used for prior events', 'Cause-effect relationship clear', 'Correct use of had + V3', 'Natural narrative flow'],
  },
  {
    id: 'wt-past-perfect-002', tense: 'past-perfect', type: 'task2',
    prompt: 'IELTS Task 2: "Some people believe that historical mistakes should be studied carefully to prevent future errors. Others feel that focusing on the past holds society back from progress. Discuss both views and give your own opinion."',
    instructions: 'Use Past Perfect and Past Simple when referring to historical examples. Write 250 words.',
    targetTenseUsage: 'Use Past Perfect for events prior to other past events; Past Simple for historical facts.',
    wordLimit: 250, timeLimit: 40,
    sampleAnswer: 'The question of whether societies should study historical errors or focus solely on the future is a nuanced one that merits careful consideration. Both perspectives offer valid insights, and the most productive approach likely lies between the two extremes. Those who advocate for studying past mistakes argue that history provides invaluable lessons. For instance, the financial crisis of 2008 occurred partly because regulators had failed to learn from earlier collapses that had warned of the dangers of excessive deregulation. Nations that had studied the social unrest preceding major conflicts were better prepared to implement early intervention policies. By understanding what had gone wrong and why, societies can build more robust institutions. On the other hand, excessive focus on past grievances can perpetuate division and resentment. Countries that had spent decades arguing over historical injustices sometimes struggled to unite behind shared economic goals. In such cases, forward-looking policies proved more effective at reducing inequality than continued retrospection. In my view, the study of history and the pursuit of progress are not mutually exclusive. Societies that had acknowledged and learned from their past without being paralysed by it tended to demonstrate the most sustainable development. The key is to extract lessons without becoming prisoners of historical narratives. Ultimately, a balanced approach — honouring the past while building toward a better future — appears most conducive to long-term societal advancement.',
    assessmentCriteria: ['Past Perfect used for prior historical events', 'Academic vocabulary', 'Both views discussed', 'Clear opinion stated', 'Logical structure'],
  },
  // Past Perfect Continuous Writing
  {
    id: 'wt-ppc2-001', tense: 'past-perfect-continuous', type: 'paragraph',
    prompt: 'Write a paragraph using Past Perfect Continuous to describe a prolonged situation that led to a significant outcome.',
    instructions: 'Show duration with "for" or "since". Connect the ongoing activity to its result using Past Simple. Write 80–100 words.',
    targetTenseUsage: 'had been + V-ing + for [duration] → result.',
    wordLimit: 100, timeLimit: 10,
    sampleAnswer: 'By the time the medical team finally identified the cause of the outbreak, the disease had been spreading through the community for over three weeks. Health workers had been responding to increasing numbers of cases but had not been able to isolate the source. Residents had been following standard hygiene protocols, yet infection rates had been rising steadily. When investigators finally traced the contamination to the local water supply, they immediately issued a public health alert. The water supply had been carrying the pathogen for nearly a month before anyone realised the connection.',
    assessmentCriteria: ['PPC used for ongoing duration', 'Past Simple used for the eventual outcome', '"For" used correctly with PPC', 'Academic and specific vocabulary'],
  },
];
