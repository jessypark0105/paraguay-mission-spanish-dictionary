import { categories as legacyCategories, phrases as legacyPhrases } from './phrases';
import { additionalPhrases } from './additionalPhrases';

export const categories = [
  { id: 'VBS & Kids', label: 'VBS · 어린이 사역', icon: '🧒' },
  { id: 'Evangelism & Gospel', label: '전도 · 복음', icon: '✝️' },
  { id: 'Daily Conversation', label: '일상 회화', icon: '👋' },
  { id: 'Travel & Tourism', label: '여행 · 관광', icon: '🗺️' },
  { id: 'Restrooms & Directions', label: '화장실 · 길 찾기', icon: '🚻' },
  { id: 'Food & Restaurants', label: '음식 · 식당', icon: '🍽️' },
  { id: 'Shopping & Money', label: '쇼핑 · 돈', icon: '🛍️' },
  { id: 'Health & Emergency', label: '건강 · 긴급 상황', icon: '🏥' },
  { id: 'Church & Ministry', label: '교회 · 사역', icon: '⛪' },
  { id: 'Prayer & Blessings', label: '기도 · 축복', icon: '🙏' },
] as const;

export type DictionaryCategory = (typeof categories)[number]['id'];

export type DictionaryPhrase = {
  id: number;
  category: DictionaryCategory;
  subcategory: string;
  spanish: string;
  korean: string;
  pronunciation: string;
  englishKeywords: string[];
  koreanSynonyms: string[];
};

const categoryDetails: Record<DictionaryCategory, { subcategory: string; english: string[]; korean: string[] }> = {
  'VBS & Kids': { subcategory: 'Games & Activities', english: ['children', 'kids', 'VBS'], korean: ['어린이', '아이들', 'VBS', '놀이'] },
  'Evangelism & Gospel': { subcategory: 'Sharing the Gospel', english: ['evangelism', 'gospel', 'faith', 'Jesus'], korean: ['전도', '복음', '신앙', '예수님'] },
  'Daily Conversation': { subcategory: 'Greetings & Introductions', english: ['conversation', 'greetings', 'introductions'], korean: ['일상 회화', '인사', '자기소개'] },
  'Travel & Tourism': { subcategory: 'Transportation', english: ['travel', 'tourism', 'transportation', 'directions'], korean: ['여행', '관광', '교통', '길 찾기'] },
  'Restrooms & Directions': { subcategory: 'Asking for Directions', english: ['restroom', 'bathroom', 'toilet', 'directions'], korean: ['화장실', '길 찾기', '방향'] },
  'Food & Restaurants': { subcategory: 'Ordering Food', english: ['food', 'restaurant', 'meal', 'order'], korean: ['음식', '식당', '식사', '주문'] },
  'Shopping & Money': { subcategory: 'Shopping Conversations', english: ['shopping', 'money', 'price', 'payment'], korean: ['쇼핑', '돈', '가격', '결제'] },
  'Health & Emergency': { subcategory: 'Medical Help', english: ['health', 'emergency', 'medical', 'help'], korean: ['건강', '긴급', '의료', '도움'] },
  'Church & Ministry': { subcategory: 'Church Services', english: ['church', 'ministry', 'worship', 'volunteer'], korean: ['교회', '사역', '예배', '봉사'] },
  'Prayer & Blessings': { subcategory: 'Prayer Expressions', english: ['prayer', 'blessing', 'comfort'], korean: ['기도', '축복', '기도하다', '위로'] },
};

const tagKeywords: Record<string, string[]> = {
  '인사': ['greeting', 'hello', 'hi'],
  '안녕': ['hello', 'hi', 'goodbye'],
  '감사': ['thanks', 'thank you', 'gratitude'],
  '이름': ['name', 'introduce'],
  '자기소개': ['introduce', 'introduction'],
  '교회': ['church'],
  '선교': ['mission', 'missionary'],
  '길찾기': ['directions', 'where', 'location'],
  '화장실': ['bathroom', 'restroom', 'toilet'],
  '버스': ['bus', 'transport'],
  '택시': ['taxi', 'ride'],
  '정류장': ['bus stop', 'stop'],
  '위치': ['location', 'where'],
  '방향': ['direction', 'left', 'right'],
  '직진': ['straight ahead', 'straight'],
  '가격': ['price', 'cost', 'how much'],
  '할인': ['discount', 'sale'],
  '결제': ['payment', 'pay'],
  '현금': ['cash', 'money'],
  '카드': ['card', 'credit card'],
  '계산': ['bill', 'check', 'pay'],
  '식당': ['restaurant', 'food'],
  '주문': ['order', 'please bring'],
  '음식': ['food', 'meal'],
  '물': ['water', 'drink'],
  '생수': ['bottled water', 'water'],
  '배고픔': ['hungry', 'hunger'],
  '목마름': ['thirsty', 'thirst'],
  '맵기': ['spicy', 'hot food'],
  '알레르기': ['allergy', 'allergic'],
  '의사': ['doctor', 'medical'],
  '병원': ['hospital', 'doctor'],
  '약국': ['pharmacy', 'drugstore'],
  '두통': ['headache', 'pain'],
  '아픔': ['pain', 'hurt', 'sick'],
  '응급': ['emergency', 'urgent'],
  '도움': ['help', 'assistance'],
  '긴급': ['emergency', 'urgent'],
  '길잃음': ['lost', 'directions'],
  '줄서기': ['line up', 'queue', 'line'],
  '놀이': ['game'],
  '아이들': ['children', 'kids'],
  '어린이': ['children', 'kids'],
  '노래': ['sing', 'song'],
  '그림': ['draw', 'picture'],
  '기도': ['prayer'],
  '복음': ['gospel', 'faith'],
  '예수': ['Jesus', 'faith'],
  '축복': ['blessing', 'God bless'],
  '하나님': ['God', 'faith'],
  '평안': ['peace', 'comfort'],
  '친구': ['friend', 'friends'],
  '사진': ['photo', 'picture'],
  '영어': ['English', 'language'],
  '천천히': ['slowly', 'repeat'],
  '이해': ['understand', 'meaning'],
};

const tagSynonyms: Record<string, string[]> = {
  '줄서기': ['줄서', '줄 서', '줄 서기'],
  '배고픔': ['배고파', '배고프다'],
  '목마름': ['목말라', '목마르다'],
  '기도': ['기도해', '기도하다', '기도해도 될까요'],
  '화장실': ['화장실 어디', '화장실 위치'],
};

const legacyCategoryMap: Record<(typeof legacyCategories)[number], DictionaryCategory> = {
  Greetings: 'Daily Conversation',
  Introductions: 'Daily Conversation',
  'Directions & Transportation': 'Travel & Tourism',
  Shopping: 'Shopping & Money',
  Food: 'Food & Restaurants',
  Emergencies: 'Health & Emergency',
  'Children & Activities': 'VBS & Kids',
  'Church & Ministry': 'Church & Ministry',
  Gospel: 'Evangelism & Gospel',
  'Prayer & Blessings': 'Prayer & Blessings',
};

function legacySubcategory(category: DictionaryCategory, tags: string[]): string {
  const allTags = tags.join(' ');
  if (category === 'VBS & Kids') {
    if (/성경|기독교|예수/.test(allTags)) return 'Bible Lessons & Teaching';
    if (/노래|박수/.test(allTags)) return 'Singing & Dancing';
    if (/그림/.test(allTags)) return 'Arts & Crafts';
    if (/줄서기|안전|조심/.test(allTags)) return 'Classroom Management & Safety';
    return 'Games & Activities';
  }
  if (category === 'Daily Conversation') return /이름|소개/.test(allTags) ? 'Greetings & Introductions' : 'Common Responses';
  if (category === 'Travel & Tourism') return /교회/.test(allTags) ? 'Sightseeing & Tourism' : 'Transportation';
  if (category === 'Restrooms & Directions') return 'Bathrooms';
  if (category === 'Shopping & Money') return /결제|현금|카드/.test(allTags) ? 'Payments' : 'Shopping Conversations';
  if (category === 'Food & Restaurants') return /알레르기|식이/.test(allTags) ? 'Dietary Needs' : 'Ordering Food';
  if (category === 'Health & Emergency') return /의사|병원|약국|두통|아픔|건강/.test(allTags) ? 'Common Symptoms' : 'Emergency Situations';
  if (category === 'Church & Ministry') return /기도/.test(allTags) ? 'Church Services' : 'Working with Local Volunteers';
  if (category === 'Evangelism & Gospel') return /예수|하나님|은혜/.test(allTags) ? 'Sharing the Gospel' : 'Starting Conversations';
  return 'Prayer Expressions';
}

const legacyPhrasesWithMetadata: DictionaryPhrase[] = legacyPhrases.map((phrase) => {
  const category = phrase.id === 31 ? 'Restrooms & Directions' : legacyCategoryMap[phrase.category];
  const details = categoryDetails[category];
  const tags = phrase.tags;
  const taggedKeywords = [
    ...tags.flatMap((tag) => tagKeywords[tag] ?? []),
    ...(phrase.id === 96 ? ['play'] : []),
    ...(phrase.id === 132 ? ['pray'] : []),
  ];
  const englishKeywords = taggedKeywords.length ? taggedKeywords : details.english;
  return {
    ...phrase,
    category,
    subcategory: legacySubcategory(category, tags),
    englishKeywords: [...new Set(englishKeywords)],
    koreanSynonyms: [...new Set([
      ...details.korean,
      ...tags,
      ...tags.flatMap((tag) => tagSynonyms[tag] ?? []),
      ...(phrase.id === 96 ? ['놀자', '놀래', '같이 놀자'] : []),
    ])],
  };
});

export const phrases: DictionaryPhrase[] = [
  ...legacyPhrasesWithMetadata,
  ...additionalPhrases.map((phrase, index) => ({ ...phrase, id: 203 + index })),
];

export const quickAccess = [
  { label: 'VBS', category: 'VBS & Kids' },
  { label: '화장실', category: 'Restrooms & Directions', subcategory: 'Bathrooms' },
  { label: '도움 / 긴급', category: 'Health & Emergency', subcategory: 'Emergency Situations' },
  { label: '길 찾기', category: 'Restrooms & Directions', subcategory: 'Asking for Directions' },
  { label: '음식', category: 'Food & Restaurants' },
  { label: '기도', category: 'Prayer & Blessings' },
] satisfies { label: string; category: DictionaryCategory; subcategory?: string }[];

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function editDistanceAtMostOne(left: string, right: string): boolean {
  if (Math.abs(left.length - right.length) > 1 || left.length < 4 || right.length < 4) return false;
  let leftIndex = 0;
  let rightIndex = 0;
  let differences = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] === right[rightIndex]) {
      leftIndex += 1;
      rightIndex += 1;
      continue;
    }
    differences += 1;
    if (differences > 1) return false;
    if (left.length > right.length) leftIndex += 1;
    else if (right.length > left.length) rightIndex += 1;
    else {
      leftIndex += 1;
      rightIndex += 1;
    }
  }
  return differences + Number(leftIndex < left.length || rightIndex < right.length) <= 1;
}

export function searchPhrases(query: string, source: DictionaryPhrase[]): DictionaryPhrase[] {
  const needle = normalizeSearchText(query);
  if (!needle) return source;
  const queryTokens = needle.split(' ');

  return source
    .map((phrase) => {
      const exactFields = [phrase.korean, ...phrase.koreanSynonyms, ...phrase.englishKeywords]
        .map(normalizeSearchText);
      if (exactFields.includes(needle)) return { phrase, score: 0 };
      if (exactFields.some((field) => field.startsWith(needle))) return { phrase, score: 1 };
      if (exactFields.some((field) => field.includes(needle))) return { phrase, score: 2 };

      const words = exactFields.flatMap((field) => field.split(' '));
      const matchingTokens = queryTokens.filter((token) =>
        words.some((word) => word.includes(token) || editDistanceAtMostOne(token, word))
      );
      if (matchingTokens.length === queryTokens.length) return { phrase, score: 3 };
      return null;
    })
    .filter((match): match is { phrase: DictionaryPhrase; score: number } => match !== null)
    .sort((left, right) => left.score - right.score || left.phrase.id - right.phrase.id)
    .map(({ phrase }) => phrase);
}
