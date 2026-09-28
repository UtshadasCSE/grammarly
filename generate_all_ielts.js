const fs = require('fs');

const rawBeg = `Q1
She ___ to work every day.
A. go
B. goes
C. is going
D. gone
Answer: B. goes
Tense: present-simple

Q2
I ___ English every evening.
A. study
B. studied
C. am studying
D. have studied
Answer: A. study
Tense: present-simple

Q3
Look! The children ___ football.
A. play
B. played
C. are playing
D. have played
Answer: C. are playing
Tense: present-continuous

Q4
I ___ this movie three times.
A. watch
B. watched
C. have watched
D. am watching
Answer: C. have watched
Tense: present-perfect

Q5
She ___ English for five years.
A. learns
B. learned
C. has been learning
D. is learning
Answer: C. has been learning
Tense: present-perfect-continuous

Q6
They ___ to Cox's Bazar last year.
A. go
B. went
C. have gone
D. are going
Answer: B. went
Tense: past-simple

Q7
I ___ TV when my friend called.
A. watched
B. was watching
C. have watched
D. watch
Answer: B. was watching
Tense: past-continuous

Q8
The train ___ before we arrived.
A. leaves
B. left
C. had left
D. was leaving
Answer: C. had left
Tense: past-perfect

Q9
He ___ for two hours before the teacher arrived.
A. studied
B. was studying
C. had been studying
D. has studied
Answer: C. had been studying
Tense: past-perfect-continuous

Q10
I ___ you tomorrow.
A. call
B. called
C. will call
D. am calling yesterday
Answer: C. will call
Tense: future-simple

Q11
This time tomorrow, I ___ to Dhaka.
A. travel
B. traveled
C. will be traveling
D. have traveled
Answer: C. will be traveling
Tense: future-continuous

Q12
By next month, I ___ my course.
A. finish
B. finished
C. will have finished
D. am finishing
Answer: C. will have finished
Tense: future-perfect

Q13
By next year, she ___ English for ten years.
A. learns
B. learned
C. will have been learning
D. is learning
Answer: C. will have been learning
Tense: future-perfect-continuous

Q14
My father usually ___ tea in the morning.
A. drink
B. drinks
C. is drinking
D. drank
Answer: B. drinks
Tense: present-simple

Q15
Why ___ you crying?
A. do
B. did
C. are
D. have
Answer: C. are
Tense: present-continuous

Q16
I ___ my homework already.
A. finish
B. finished
C. have finished
D. am finishing
Answer: C. have finished
Tense: present-perfect

Q17
She ___ in this company since 2022.
A. works
B. worked
C. has worked
D. is working
Answer: C. has worked
Tense: present-perfect-continuous

Q18
We ___ dinner when the electricity went out.
A. eat
B. ate
C. were eating
D. have eaten
Answer: C. were eating
Tense: past-continuous

Q19
He ___ the book before he watched the movie.
A. reads
B. read
C. had read
D. was reading
Answer: C. had read
Tense: past-perfect

Q20
They ___ for three hours before they finally stopped.
A. walked
B. were walking
C. had been walking
D. have walked
Answer: C. had been walking
Tense: past-perfect-continuous

Q21
I think it ___ tomorrow.
A. rains
B. rained
C. will rain
D. is raining yesterday
Answer: C. will rain
Tense: future-simple

Q22
At 8 p.m. tonight, I ___ for my IELTS exam.
A. study
B. studied
C. will be studying
D. have studied
Answer: C. will be studying
Tense: future-continuous

Q23
By Friday, she ___ the project.
A. completes
B. completed
C. will have completed
D. is completing yesterday
Answer: C. will have completed
Tense: future-perfect

Q24
By December, I ___ English for two years.
A. study
B. studied
C. will have been studying
D. am studying
Answer: C. will have been studying
Tense: future-perfect-continuous

Q25
He ___ coffee every morning.
A. drink
B. drinks
C. is drinking
D. drank
Answer: B. drinks
Tense: present-simple

Q26
Listen! Someone ___ at the door.
A. knocks
B. knocked
C. is knocking
D. has knocked
Answer: C. is knocking
Tense: present-continuous

Q27
I ___ never ___ Japan.
A. have / visited
B. did / visit
C. am / visiting
D. had / visit
Answer: A. have / visited
Tense: present-perfect

Q28
She ___ her keys yesterday.
A. loses
B. lost
C. has lost
D. is losing
Answer: B. lost
Tense: past-simple

Q29
When I entered the room, they ___.
A. sleep
B. slept
C. were sleeping
D. have slept
Answer: C. were sleeping
Tense: past-continuous

Q30
After he ___ dinner, he went outside.
A. eats
B. ate
C. had eaten
D. is eating
Answer: C. had eaten
Tense: past-perfect

Q31
I ___ this computer since morning.
A. use
B. used
C. have been using
D. was using yesterday
Answer: C. have been using
Tense: present-perfect-continuous

Q32
We ___ our grandparents next weekend.
A. visit
B. visited
C. will visit
D. have visited yesterday
Answer: C. will visit
Tense: future-simple

Q33
At this time next week, they ___ on the beach.
A. relax
B. relaxed
C. will be relaxing
D. have relaxed
Answer: C. will be relaxing
Tense: future-continuous

Q34
By 2030, scientists ___ many new technologies.
A. develop
B. developed
C. will have developed
D. are developing yesterday
Answer: C. will have developed
Tense: future-perfect

Q35
By next June, he ___ at the company for five years.
A. works
B. worked
C. will have been working
D. is working
Answer: C. will have been working
Tense: future-perfect-continuous

Q36
She usually ___ early.
A. wake up
B. wakes up
C. is waking up
D. woke up
Answer: B. wakes up
Tense: present-simple

Q37
I ___ my friend right now.
A. call
B. called
C. am calling
D. have called yesterday
Answer: C. am calling
Tense: present-continuous

Q38
They ___ already ___ lunch.
A. have / eaten
B. did / eat
C. are / eating
D. had / eat
Answer: A. have / eaten
Tense: present-perfect

Q39
We ___ in Dhaka in 2020.
A. live
B. lived
C. have lived
D. are living
Answer: B. lived
Tense: past-simple

Q40
She ___ when I saw her.
A. runs
B. ran
C. was running
D. has run
Answer: C. was running
Tense: past-continuous

Q41
The movie ___ before we arrived.
A. started
B. had started
C. starts
D. is starting
Answer: B. had started
Tense: past-perfect

Q42
He ___ for an hour before his friend arrived.
A. waited
B. was waiting
C. had been waiting
D. waits
Answer: C. had been waiting
Tense: past-perfect-continuous

Q43
I ___ my IELTS exam next month.
A. take
B. took
C. will take
D. have taken
Answer: C. will take
Tense: future-simple

Q44
At 10 tomorrow morning, she ___ her exam.
A. takes
B. took
C. will be taking
D. has taken
Answer: C. will be taking
Tense: future-continuous

Q45
By the end of this year, I ___ my preparation.
A. complete
B. completed
C. will have completed
D. am completing yesterday
Answer: C. will have completed
Tense: future-perfect

Q46
By 2028, he ___ English for six years.
A. studies
B. studied
C. will have been studying
D. is studying
Answer: C. will have been studying
Tense: future-perfect-continuous

Q47
Correct the sentence:
"He go to university every day."
Answer: He goes to university every day.
Tense: present-simple

Q48
Correct the sentence:
"I am knowing the answer."
Answer: I know the answer.
Tense: present-simple

Q49
Correct the sentence:
"She has went to London."
Answer: She has gone to London.
Tense: present-perfect

Q50
Correct the sentence:
"They was playing football."
Answer: They were playing football.
Tense: past-continuous

Q51
Correct the sentence:
"I had saw the movie before."
Answer: I had seen the movie before.
Tense: past-perfect

Q52
Correct the sentence:
"Tomorrow I will going to Dhaka."
Answer: Tomorrow I will go to Dhaka.
Tense: future-simple

Q53
Correct the sentence:
"She will has finished the work."
Answer: She will have finished the work.
Tense: future-perfect

Q54
Correct the sentence:
"I have been study English for two years."
Answer: I have been studying English for two years.
Tense: present-perfect-continuous

Q55
Correct the sentence:
"When I arrived, the train already left."
Answer: When I arrived, the train had already left.
Tense: past-perfect`;

const rawInt = `Q1
By the time I start my master's degree, I ___ my IELTS preparation.
A. complete
B. completed
C. will have completed
D. have completed
Answer: C. will have completed
Tense: future-perfect

Q2
This time next year, I ___ at a university in the UK.
A. study
B. studied
C. will be studying
D. have studied
Answer: C. will be studying
Tense: future-continuous

Q3
By 2030, artificial intelligence ___ many aspects of software development.
A. changes
B. changed
C. will have changed
D. is changing
Answer: C. will have changed
Tense: future-perfect

Q4
By the time I graduate, I ___ computer science for several years.
A. study
B. studied
C. will have been studying
D. am studying
Answer: C. will have been studying
Tense: future-perfect-continuous

Q5
I think remote work ___ even more common in the future.
A. becomes
B. became
C. will become
D. has become
Answer: C. will become
Tense: future-simple

Q6
At this time tomorrow, I ___ my speaking practice.
A. do
B. did
C. will be doing
D. have done
Answer: C. will be doing
Tense: future-continuous

Q7
By next Friday, she ___ all five IELTS writing tasks.
A. completes
B. completed
C. will have completed
D. is completing
Answer: C. will have completed
Tense: future-perfect

Q8
By the end of this month, he ___ English for six months.
A. practices
B. practiced
C. will have been practicing
D. is practicing
Answer: C. will have been practicing
Tense: future-perfect-continuous

Q9
I usually ___ English in the morning, but today I am studying at night.
A. practice
B. practiced
C. am practicing
D. have practiced
Answer: A. practice
Tense: present-simple

Q10
I ___ English for two hours, and I still have three exercises left.
A. study
B. studied
C. have been studying
D. had studied
Answer: C. have been studying
Tense: present-perfect-continuous

Q11
When I reached the classroom, the lesson ___.
A. starts
B. started
C. had already started
D. has started
Answer: C. had already started
Tense: past-perfect

Q12
While I ___ my essay, my friend called me.
A. write
B. wrote
C. was writing
D. have written
Answer: C. was writing
Tense: past-continuous

Q13
She ___ three IELTS mock tests this week.
A. takes
B. took
C. has taken
D. had taken
Answer: C. has taken
Tense: present-perfect

Q14
I ___ English since I was a teenager.
A. learn
B. learned
C. have been learning
D. had learned
Answer: C. have been learning
Tense: present-perfect-continuous

Q15
If I have enough time tomorrow, I ___ another mock test.
A. take
B. took
C. will take
D. have taken
Answer: C. will take
Tense: future-simple

Q16
By next year, many students ___ AI tools as part of their daily studies.
A. use
B. used
C. will be using
D. have used
Answer: C. will be using
Tense: future-continuous

Q17
By the end of the decade, many companies ___ their development processes with AI.
A. transform
B. transformed
C. will have transformed
D. are transforming
Answer: C. will have transformed
Tense: future-perfect

Q18
By 2030, developers ___ AI-assisted coding tools for many years.
A. use
B. used
C. will have been using
D. are using
Answer: C. will have been using
Tense: future-perfect-continuous

Q19
I ___ to the UK next January if everything goes according to plan.
A. travel
B. traveled
C. will travel
D. have traveled
Answer: C. will travel
Tense: future-simple

Q20
At 9 a.m. tomorrow, I ___ my university application.
A. prepare
B. prepared
C. will be preparing
D. have prepared
Answer: C. will be preparing
Tense: future-continuous

Q21
By the time you arrive, I ___ dinner.
A. finish
B. finished
C. will have finished
D. am finishing yesterday
Answer: C. will have finished
Tense: future-perfect

Q22
By June, she ___ for the IELTS exam for eight months.
A. prepares
B. prepared
C. will have been preparing
D. is preparing
Answer: C. will have been preparing
Tense: future-perfect-continuous

Q23
I ___ my application yesterday.
A. submit
B. submitted
C. have submitted
D. am submitting
Answer: B. submitted
Tense: past-simple

Q24
I ___ my application already.
A. submit
B. submitted
C. have submitted
D. had submitted
Answer: C. have submitted
Tense: present-perfect

Q25
Before I applied, I ___ the university website carefully.
A. check
B. checked
C. had checked
D. have checked
Answer: C. had checked
Tense: past-perfect

Q26
I ___ the university website when I found the course.
A. browse
B. browsed
C. was browsing
D. have browsed
Answer: C. was browsing
Tense: past-continuous

Q27
She ___ at the company since 2023.
A. works
B. worked
C. has worked
D. had worked
Answer: C. has worked
Tense: present-perfect-continuous

Q28
She ___ at the company for three years before she resigned.
A. works
B. worked
C. had worked
D. has worked
Answer: C. had worked
Tense: past-perfect-continuous

Q29
They ___ the project for six months before they launched it.
A. develop
B. developed
C. had been developing
D. have developed
Answer: C. had been developing
Tense: past-perfect-continuous

Q30
I ___ a frontend developer before I started learning backend development.
A. am
B. was
C. have been
D. will be
Answer: B. was
Tense: past-simple

Q31
By next month, I ___ backend development for one year.
A. learn
B. learned
C. will have been learning
D. have learned yesterday
Answer: C. will have been learning
Tense: future-perfect-continuous

Q32
I believe software developers ___ to adapt to AI-assisted development.
A. need
B. needed
C. will need
D. had needed
Answer: C. will need
Tense: future-simple

Q33
At this time next month, I ___ in my new accommodation.
A. live
B. lived
C. will be living
D. have lived
Answer: C. will be living
Tense: future-continuous

Q34
By the end of my master's degree, I ___ several major projects.
A. complete
B. completed
C. will have completed
D. am completing
Answer: C. will have completed
Tense: future-perfect

Q35
By graduation, I ___ in the UK for one year.
A. live
B. lived
C. will have been living
D. am living
Answer: C. will have been living
Tense: future-perfect-continuous

Q36
I ___ my speaking skills every day.
A. improve
B. improved
C. am improved
D. had improved
Answer: A. improve
Tense: present-simple

Q37
I ___ my speaking skills recently.
A. improve
B. improved
C. have improved
D. had improving
Answer: C. have improved
Tense: present-perfect

Q38
I ___ my speaking skills when my teacher gave me feedback.
A. practice
B. practiced
C. was practicing
D. have practiced
Answer: C. was practicing
Tense: past-continuous

Q39
I ___ three hours before I took a break.
A. studied
B. had been studying
C. have studied
D. study
Answer: B. had been studying
Tense: past-perfect-continuous

Q40
Correct the sentence:
"By next year, I will have study English for three years."
Answer: By next year, I will have been studying English for three years.
Tense: future-perfect-continuous

Q41
Correct the sentence:
"This time tomorrow, I will study for my IELTS exam."
Answer: This time tomorrow, I will be studying for my IELTS exam.
Tense: future-continuous

Q42
Correct the sentence:
"By Friday, I will finished the assignment."
Answer: By Friday, I will have finished the assignment.
Tense: future-perfect

Q43
Correct the sentence:
"She will has completed the course by June."
Answer: She will have completed the course by June.
Tense: future-perfect

Q44
Correct the sentence:
"I will be work at 8 p.m."
Answer: I will be working at 8 p.m.
Tense: future-continuous

Q45
Correct the sentence:
"By 2030, AI will changed the industry."
Answer: By 2030, AI will have changed the industry.
Tense: future-perfect

Q46
Correct the sentence:
"I am working here since 2023."
Answer: I have been working here since 2023.
Tense: present-perfect-continuous

Q47
Correct the sentence:
"When I arrived, he already finished the work."
Answer: When I arrived, he had already finished the work.
Tense: past-perfect

Q48
Correct the sentence:
"I have visited London last year."
Answer: I visited London last year.
Tense: past-simple

Q49
Correct the sentence:
"She was studied when I called her."
Answer: She was studying when I called her.
Tense: past-continuous

Q50
Complete the sentence:
By the end of this month, I will have completed several IELTS mock tests.
Answer: By the end of this month, I will have completed several IELTS mock tests.
Tense: future-perfect`;

const rawAdv = `Q1
By the time I sit my IELTS exam, I ___ thousands of English sentences.
A. practice
B. practiced
C. will have practiced
D. have practicing
Answer: C. will have practiced
Tense: future-perfect

Q2
By the end of next year, I ___ English consistently for several years.
A. study
B. studied
C. will have been studying
D. have studied
Answer: C. will have been studying
Tense: future-perfect-continuous

Q3
This time next year, I ___ my master's degree.
A. complete
B. completed
C. will be pursuing
D. have pursued
Answer: C. will be pursuing
Tense: future-continuous

Q4
By the time I graduate, I ___ a substantial amount of practical experience.
A. gain
B. gained
C. will have gained
D. am gaining
Answer: C. will have gained
Tense: future-perfect

Q5
I ___ English for years, but I still encounter unfamiliar expressions.
A. learn
B. learned
C. have been learning
D. had learned
Answer: C. have been learning
Tense: present-perfect-continuous

Q6
Although I ___ English for several years, I became much more confident after starting regular speaking practice.
A. study
B. studied
C. had studied
D. have studied
Answer: C. had studied
Tense: past-perfect

Q7
While I ___ my speaking answer, I realized that I was using the wrong tense.
A. explain
B. explained
C. was explaining
D. have explained
Answer: C. was explaining
Tense: past-continuous

Q8
I ___ the mistake before my examiner pointed it out.
A. notice
B. noticed
C. had noticed
D. have noticed
Answer: C. had noticed
Tense: past-perfect

Q9
By 2035, AI ___ the way many people learn languages.
A. changes
B. changed
C. will have transformed
D. has transformed
Answer: C. will have transformed
Tense: future-perfect

Q10
By the middle of the next decade, students ___ AI-assisted learning tools for many years.
A. use
B. used
C. will have been using
D. have used
Answer: C. will have been using
Tense: future-perfect-continuous

Q11
At 10 a.m. tomorrow, I ___ my speaking mock test.
A. take
B. took
C. will be taking
D. have taken
Answer: C. will be taking
Tense: future-continuous

Q12
By the time the course begins, I ___ all the introductory materials.
A. read
B. readed
C. will have read
D. am reading
Answer: C. will have read
Tense: future-perfect

Q13
I ___ several mock tests recently, which has helped me identify my weaknesses.
A. complete
B. completed
C. have completed
D. had completed
Answer: C. have completed
Tense: present-perfect

Q14
I ___ my grammar consistently since I started preparing for IELTS.
A. improve
B. improved
C. have been improving
D. had improved
Answer: C. have been improving
Tense: present-perfect-continuous

Q15
When I first started learning English, I ___ much more slowly.
A. speak
B. spoke
C. have spoken
D. had spoken
Answer: B. spoke
Tense: past-simple

Q16
By the time I took my first mock test, I ___ several grammar topics.
A. study
B. studied
C. had studied
D. have studied
Answer: C. had studied
Tense: past-perfect

Q17
I ___ for nearly two hours when I finally understood the grammar pattern.
A. practice
B. practiced
C. had been practicing
D. have practiced
Answer: C. had been practicing
Tense: past-perfect-continuous

Q18
I expect English ___ an important skill throughout my professional career.
A. remains
B. remained
C. will remain
D. has remained
Answer: C. will remain
Tense: future-simple

Q19
By the time I finish my master's degree, I ___ both academic and professional experience.
A. develop
B. developed
C. will have developed
D. am developing
Answer: C. will have developed
Tense: future-perfect

Q20
At this point next year, I ___ in a completely different academic environment.
A. study
B. studied
C. will be studying
D. have studied
Answer: C. will be studying
Tense: future-continuous

Q21
By 2030, many software developers ___ AI into their daily workflows.
A. integrate
B. integrated
C. will have integrated
D. have integrated
Answer: C. will have integrated
Tense: future-perfect

Q22
By then, developers ___ AI tools for more than a decade.
A. use
B. used
C. will have been using
D. have used
Answer: C. will have been using
Tense: future-perfect-continuous

Q23
I normally study in the evening, but this week I ___ in the morning because my schedule has changed.
A. study
B. studied
C. am studying
D. have studied
Answer: C. am studying
Tense: present-continuous

Q24
I ___ this grammar topic several times, but I still want to practise it more.
A. study
B. studied
C. have studied
D. had studied
Answer: C. have studied
Tense: present-perfect

Q25
I ___ for thirty minutes before I realized that I was answering the wrong question.
A. work
B. worked
C. had been working
D. have worked
Answer: C. had been working
Tense: past-perfect-continuous

Q26
Correct the sentence:
"By next year, I will have study English for four years."
Answer: By next year, I will have been studying English for four years.
Tense: future-perfect-continuous

Q27
Correct the sentence:
"At this time tomorrow, I will practice speaking."
Answer: At this time tomorrow, I will be practicing speaking.
Tense: future-continuous

Q28
Correct the sentence:
"By the end of the course, I will completed all the lessons."
Answer: By the end of the course, I will have completed all the lessons.
Tense: future-perfect

Q29
Correct the sentence:
"I have been learn English since 2024."
Answer: I have been learning English since 2024.
Tense: present-perfect-continuous

Q30
Correct the sentence:
"When I arrived, the lecture already started."
Answer: When I arrived, the lecture had already started.
Tense: past-perfect

Q31
Correct the sentence:
"I was study when my teacher called."
Answer: I was studying when my teacher called.
Tense: past-continuous

Q32
Correct the sentence:
"She has went to university."
Answer: She has gone to university.
Tense: present-perfect

Q33
Correct the sentence:
"I have completed my degree last year."
Answer: I completed my degree last year.
Tense: past-simple

Q34
Correct the sentence:
"He works here since 2022."
Answer: He has been working here since 2022.
Tense: present-perfect-continuous

Q35
Correct the sentence:
"By 2030, technology will completely changed education."
Answer: By 2030, technology will have completely changed education.
Tense: future-perfect

Q36
Complete the sentence:
By the time I start my career, I ___.
Answer: By the time I start my career, I will have developed strong technical and communication skills.
Tense: future-perfect

Q37
Complete the sentence:
This time next year, I ___.
Answer: This time next year, I will be studying for my master's degree.
Tense: future-continuous

Q38
Complete the sentence:
By 2030, artificial intelligence ___.
Answer: By 2030, artificial intelligence will have transformed many areas of software development.
Tense: future-perfect

Q39
Complete the sentence:
By the end of this year, I ___ English for ___.
Answer: By the end of this year, I will have been studying English for several years.
Tense: future-perfect-continuous

Q40
Answer in two sentences:
How has technology changed the way people learn?
Answer: Technology has made learning more accessible and flexible. Many students have been using online platforms and AI tools to practise skills independently.
Tense: mixed

Q41
Answer using at least two tenses:
What are your plans for the next five years?
Answer: I will pursue higher education and develop my technical skills. By the end of that period, I will have gained substantial professional experience.
Tense: mixed

Q42
Answer using Present Perfect and Future Perfect:
How has your English changed, and how will it change in the future?
Answer: My English has improved considerably through consistent practice. By the time I complete my future studies, I will have developed much stronger academic communication skills.
Tense: mixed

Q43
IELTS Speaking Part 3:
How do you think AI will affect education?
Answer: AI will probably make personalized learning more accessible. By the time today's students enter the workforce, many of them will have become accustomed to AI-assisted learning.
Tense: mixed

Q44
IELTS Speaking Part 3:
Will people still need to learn English in the future?
Answer: English will likely remain important because it is widely used internationally. However, technology will probably make communication between speakers of different languages easier.
Tense: mixed

Q45
IELTS Writing style:
Describe a trend that started in the past and continues today.
Answer: The use of digital technology has increased steadily over the past decade and has become an integral part of modern education.
Tense: mixed

Q46
IELTS Writing style:
Describe a future trend.
Answer: By the next decade, online education will have become even more widespread, while artificial intelligence will be playing a larger role in personalized learning.
Tense: mixed

Q47
Mixed tense challenge:
"I ___ English for several years. When I first started, I ___ afraid of making mistakes. Recently, I ___ much more confident, and by next year, I ___ even more fluent."
Answer: I have been learning English for several years. When I first started, I was afraid of making mistakes. Recently, I have become much more confident, and by next year, I will have become even more fluent.
Tense: mixed

Q48
Mixed tense challenge:
"Yesterday, I ___ for three hours before I ___ a break. Tomorrow, I ___ again, and by next week, I ___ several mock tests."
Answer: Yesterday, I had been studying for three hours before I took a break. Tomorrow, I will study again, and by next week, I will have completed several mock tests.
Tense: mixed

Q49
Advanced transformation:
"I have been studying English for two years." -> Future Perfect Continuous
Answer: By next year, I will have been studying English for three years.
Tense: future-perfect-continuous

Q50
Final Mastery Challenge:
Write a short paragraph about your English-learning journey using at least six different tenses.
Answer: I have been learning English for several years, and I have gradually improved my communication skills. When I started, I struggled to construct sentences accurately. I was often translating ideas from my first language before speaking. Recently, I have become more confident because I practise regularly. In the future, I will continue improving my English, and by the time I complete my higher education, I will have developed strong academic and professional communication skills.
Tense: mixed`;

function getHint(tense) {
  const hints = {
    'present-simple': 'Look for habits, routines, and repeated actions.',
    'present-continuous': 'Look for something happening now.',
    'present-perfect': 'Think about an action connected to the present.',
    'present-perfect-continuous': 'Look for duration continuing until now.',
    'past-simple': 'Look for a finished action in the past.',
    'past-continuous': 'Look for an action in progress at a past time.',
    'past-perfect': 'Look for the earlier of two past actions.',
    'past-perfect-continuous': 'Look for duration before another past event.',
    'future-simple': 'Look for predictions, decisions, promises, or future actions.',
    'future-continuous': 'Think about an action that will be in progress at a specific future time.',
    'future-perfect': 'Look for "by + future time."',
    'future-perfect-continuous': 'Look for duration continuing up to a future point.',
    'mixed': 'Consider the time markers in the sentence.'
  };
  return hints[tense] || hints['mixed'];
}

function processBlocks(raw, levelStr) {
    const blocks = raw.split(/Q\\d+\\n/).filter(b => b.trim().length > 0);
    let questions = [];

    blocks.forEach((block, index) => {
    const lines = block.trim().split('\\n').map(l => l.trim());
    let qText = lines[0];
    let options = [];
    let answer = '';
    let tense = 'mixed';
    let type = 'multiple-choice';

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].match(/^[A-D]\\./)) {
        options.push(lines[i].substring(3).trim());
        } else if (lines[i].startsWith('Answer:')) {
        let ansRaw = lines[i].replace('Answer:', '').trim();
        if (ansRaw.match(/^[A-D]\\./)) {
            answer = ansRaw.substring(3).trim();
        } else {
            answer = ansRaw;
        }
        } else if (lines[i].startsWith('Tense:')) {
        tense = lines[i].replace('Tense:', '').trim().toLowerCase();
        }
    }

    if (qText === 'Correct the sentence:') {
        type = 'error-correction';
        qText = lines[1].replace(/"/g, '');
    } else if (qText === 'Complete the sentence:') {
        type = 'sentence-transformation';
        qText = lines[1].replace(/"/g, '');
    } else if (qText.includes('Answer in two sentences:') || qText.includes('Answer using') || qText.includes('IELTS Speaking') || qText.includes('IELTS Writing') || qText.includes('Mixed tense challenge:') || qText.includes('Advanced transformation:') || qText.includes('Final Mastery Challenge:')) {
        type = 'writing';
        qText = lines[1] ? lines[1].replace(/"/g, '') : qText;
    }

    if (answer.startsWith('Model Answer:')) {
        answer = answer.replace('Model Answer:', '').trim();
    }

    let qObj = {
        id: 'ielts-' + levelStr + '-' + (index + 1),
        level: levelStr,
        type: type,
        question: qText,
        correctAnswer: answer,
        tense: tense,
        explanation: 'The correct answer is ' + answer + '. ' + getHint(tense),
        hint1: getHint(tense)
    };
    
    if (type === 'multiple-choice') {
        qObj.options = options;
    }

    questions.push(qObj);
    });
    return questions;
}

const begQs = processBlocks(rawBeg, 'beginner');
const tsCodeBeg = "import type { IELTSQuestion } from '@/types';\\n\\nexport const beginnerQuestions: IELTSQuestion[] = " + JSON.stringify(begQs, null, 2) + ";\\n";
fs.writeFileSync('src/data/ielts/beginner.ts', tsCodeBeg);

const intQs = processBlocks(rawInt, 'intermediate');
const tsCodeInt = "import type { IELTSQuestion } from '@/types';\\n\\nexport const intermediateQuestions: IELTSQuestion[] = " + JSON.stringify(intQs, null, 2) + ";\\n";
fs.writeFileSync('src/data/ielts/intermediate.ts', tsCodeInt);

const advQs = processBlocks(rawAdv, 'advanced');
const tsCodeAdv = "import type { IELTSQuestion } from '@/types';\\n\\nexport const advancedQuestions: IELTSQuestion[] = " + JSON.stringify(advQs, null, 2) + ";\\n";
fs.writeFileSync('src/data/ielts/advanced.ts', tsCodeAdv);
