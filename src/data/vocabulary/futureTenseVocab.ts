import type { VocabularyItem } from '@/types';

export const futureVocabulary: VocabularyItem[] = [
  {
    id: 'f-vocab-01',
    word: 'Predict',
    banglaMeaning: 'ভবিষ্যদ্বাণী করা',
    definition: 'To say or estimate that a specified thing will happen in the future.',
    partOfSpeech: 'Verb',
    pronunciation: '/prɪˈdɪkt/',
    collocation: 'predict the future, predict an outcome',
    synonym: 'Forecast, Foresee',
    antonym: 'Reflect',
    beginnerExample: 'I predict it will rain tomorrow.',
    ieltsExample: 'Experts predict that renewable energy will have completely replaced fossil fuels by 2050.',
    tense: 'future-simple'
  },
  {
    id: 'f-vocab-02',
    word: 'Anticipate',
    banglaMeaning: 'পূর্বানুমান করা / প্রত্যাশা করা',
    definition: 'To regard as probable; expect or predict.',
    partOfSpeech: 'Verb',
    pronunciation: '/ænˈtɪs.ɪ.peɪt/',
    collocation: 'anticipate changes, eagerly anticipate',
    synonym: 'Expect, Foresee',
    antonym: 'Doubt',
    beginnerExample: 'We anticipate they will arrive late.',
    ieltsExample: 'It is anticipated that automation will be taking over many manual jobs over the next decade.',
    tense: 'future-continuous'
  },
  {
    id: 'f-vocab-03',
    word: 'Inevitable',
    banglaMeaning: 'অনিবার্য',
    definition: 'Certain to happen; unavoidable.',
    partOfSpeech: 'Adjective',
    pronunciation: '/ɪˈnev.ɪ.tə.bəl/',
    collocation: 'inevitable consequence, almost inevitable',
    synonym: 'Unavoidable, Inescapable',
    antonym: 'Avoidable, Uncertain',
    beginnerExample: 'The change is inevitable. It will happen soon.',
    ieltsExample: 'By the time the policy is enacted, it will have become an inevitable transition for most corporations.',
    tense: 'future-perfect'
  },
  {
    id: 'f-vocab-04',
    word: 'Foreseeable',
    banglaMeaning: 'দৃশ্যমান বা অনুমেয় ভবিষ্যৎ',
    definition: 'Able to be foreseen or predicted.',
    partOfSpeech: 'Adjective',
    pronunciation: '/fɔːrˈsiː.ə.bəl/',
    collocation: 'in the foreseeable future',
    synonym: 'Predictable, Expected',
    beginnerExample: 'I will be living here for the foreseeable future.',
    ieltsExample: 'We will be dealing with the repercussions of climate change for the foreseeable future.',
    tense: 'future-continuous'
  },
  {
    id: 'f-vocab-05',
    word: 'Imminent',
    banglaMeaning: 'আসন্ন',
    definition: 'About to happen.',
    partOfSpeech: 'Adjective',
    pronunciation: '/ˈɪm.ɪ.nənt/',
    collocation: 'imminent danger, imminent arrival',
    synonym: 'Impending, Approaching',
    antonym: 'Distant',
    beginnerExample: 'The storm is imminent. It will strike soon.',
    ieltsExample: 'Due to imminent funding cuts, researchers will have abandoned several projects by the end of the year.',
    tense: 'future-perfect'
  }
];

export const futureSimpleVocabulary = futureVocabulary.filter(v => v.tense === 'future-simple');
export const futureContinuousVocabulary = futureVocabulary.filter(v => v.tense === 'future-continuous');
export const futurePerfectVocabulary = futureVocabulary.filter(v => v.tense === 'future-perfect');
export const futurePerfectContinuousVocabulary = futureVocabulary.filter(v => v.tense === 'future-perfect-continuous');
