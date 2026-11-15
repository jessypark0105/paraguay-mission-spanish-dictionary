import { useEffect, useMemo, useRef, useState } from 'react';
import {
  categories,
  phrases,
  quickAccess,
  searchPhrases,
  type DictionaryCategory,
  type DictionaryPhrase,
} from './data/dictionary';
import { conversations } from './data/phrases';

const FAVORITES_KEY = 'paraguay-spanish-favorites-v1';
const RECENTS_KEY = 'paraguay-spanish-recents-v1';
const ALL_CATEGORIES = 'All';
const FAVORITES = 'Favorites';
const subcategoryLabels: Record<string, string> = {
  'Greetings & Introductions': '인사 및 자기소개',
  'Getting to Know Children': '아이들과 친해지기',
  'Games & Activities': '게임 및 활동',
  'Bible Lessons & Teaching': '성경공부 및 공과',
  'Singing & Dancing': '찬양 및 율동',
  'Arts & Crafts': '만들기 및 공예',
  'Snacks & Breaks': '간식 및 휴식',
  'Classroom Management & Safety': '질서 및 안전',
  'Prayer & Gospel for Kids': '어린이 기도 및 복음',
  'Goodbye & Blessings': '작별 및 축복',
  'Starting Conversations': '대화 시작하기',
  'Sharing the Gospel': '복음 나누기',
  'Personal Testimony': '개인 간증',
  'Responding to Questions': '질문에 답하기',
  'Invitations & Follow-Up': '초대 및 후속 만남',
  'Small Talk': '가벼운 대화',
  'Making Friends': '친구 사귀기',
  'Understanding & Communication': '이해 및 의사소통',
  'Common Responses': '자주 쓰는 표현',
  'Airport & Immigration': '공항 및 입국',
  Transportation: '교통',
  'Hotels & Accommodations': '호텔 및 숙소',
  'Sightseeing & Tourism': '관광',
  'Travel Problems': '여행 중 문제',
  Bathrooms: '화장실',
  'Asking for Directions': '길 묻기',
  'Understanding Directions': '방향 이해하기',
  'Finding Places': '장소 찾기',
  'Ordering Food': '음식 주문',
  Drinks: '음료',
  'Dietary Needs': '식이 및 알레르기',
  Paying: '결제',
  'Paraguayan Food': '파라과이 음식',
  'Asking Prices': '가격 묻기',
  'Shopping Conversations': '쇼핑 대화',
  Payments: '결제',
  'Markets & Souvenirs': '시장 및 기념품',
  'Common Symptoms': '일반 증상',
  'Medical Help': '의료 도움',
  'Emergency Situations': '긴급 상황',
  Safety: '안전',
  'Church Services': '교회 예배',
  'Worship & Music': '예배 및 음악',
  'Working with Local Volunteers': '현지 봉사자와 협력',
  'Ministry Logistics': '사역 준비 및 일정',
  'Offering Prayer': '기도 제안',
  'Prayer Expressions': '기도 표현',
  'Encouragement & Comfort': '격려 및 위로',
  'Gratitude & Blessings': '감사 및 축복',
};
type View = 'dictionary' | 'conversations';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? 'null');
    return value === null ? fallback : value as T;
  } catch {
    return fallback;
  }
}

function loadFavorites(): number[] {
  const saved = readStorage<unknown>(FAVORITES_KEY, []);
  return Array.isArray(saved) ? saved.filter((id): id is number => Number.isInteger(id)) : [];
}

function loadRecentSearches(): string[] {
  const saved = readStorage<unknown>(RECENTS_KEY, []);
  return Array.isArray(saved) ? saved.filter((query): query is string => typeof query === 'string').slice(0, 8) : [];
}

function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<DictionaryCategory | typeof ALL_CATEGORIES | typeof FAVORITES>(ALL_CATEGORIES);
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [favorites, setFavorites] = useState<number[]>(loadFavorites);
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecentSearches);
  const [showRecents, setShowRecents] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [view, setView] = useState<View>('dictionary');
  const [showLocalPhrase, setShowLocalPhrase] = useState<DictionaryPhrase | null>(null);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Favorites remain available for the current session when storage is disabled.
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(recentSearches));
    } catch {
      // Recent searches remain available for the current session when storage is disabled.
    }
  }, [recentSearches]);

  useEffect(() => {
    const updateNetworkStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  useEffect(() => {
    if (!showLocalPhrase) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowLocalPhrase(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [showLocalPhrase]);

  const category = categories.find((item) => item.id === activeCategory);
  const subcategories = useMemo(() => {
    if (!category) return [];
    return [...new Set(phrases.filter((phrase) => phrase.category === category.id).map((phrase) => phrase.subcategory))];
  }, [category]);

  const visiblePhrases = useMemo(() => {
    let filtered = phrases;
    if (activeCategory === FAVORITES) {
      filtered = phrases.filter((phrase) => favorites.includes(phrase.id));
    } else if (activeCategory !== ALL_CATEGORIES) {
      filtered = phrases.filter((phrase) => phrase.category === activeCategory);
    }
    if (activeSubcategory) filtered = filtered.filter((phrase) => phrase.subcategory === activeSubcategory);
    return searchPhrases(query, filtered);
  }, [activeCategory, activeSubcategory, favorites, query]);
  const setCategory = (nextCategory: typeof activeCategory, subcategory = '') => {
    setActiveCategory(nextCategory);
    setActiveSubcategory(subcategory);
    setShowFavorites(nextCategory === FAVORITES);
    setView('dictionary');
    setShowRecents(false);
    setQuery('');
  };

  const rememberSearch = (search: string) => {
    const trimmed = search.trim();
    if (!trimmed) return;
    setRecentSearches((current) => [trimmed, ...current.filter((item) => item.toLocaleLowerCase() !== trimmed.toLocaleLowerCase())].slice(0, 8));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  };

  const selectRecentSearch = (search: string) => {
    setQuery(search);
    setActiveCategory(ALL_CATEGORIES);
    setActiveSubcategory('');
    setShowFavorites(false);
    setView('dictionary');
    setShowRecents(false);
    searchRef.current?.focus();
  };

  const isDefaultHome = activeCategory === ALL_CATEGORIES && !query && !showFavorites;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true">🇵🇾</div>
        <div className="eyebrow">Misión Paraguay</div>
        <h1>선교 스페인어 사전</h1>
        <p>파라과이에서 바로 쓰는 한국어 · 스페인어 phrasebook</p>
        <div className={`offline-status ${isOnline ? '' : 'offline'}`} role="status">
          <span aria-hidden="true">{isOnline ? '●' : '○'}</span>
          {isOnline ? '오프라인에서도 사용 가능' : '오프라인 사용 중'}
        </div>
      </header>

      <main className="content-wrap">
        <section className="search-panel" aria-label="문장 검색">
          <label htmlFor="phrase-search">🔎 영어 또는 한국어로 검색</label>
          <input
            ref={searchRef}
            id="phrase-search"
            className="search-input"
            type="search"
            value={query}
            onFocus={() => setShowRecents(true)}
            onBlur={() => {
              window.setTimeout(() => setShowRecents(false), 120);
              rememberSearch(query);
            }}
            onChange={(event) => {
              setQuery(event.target.value);
              setView('dictionary');
              setShowRecents(!event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                rememberSearch(query);
                setShowRecents(false);
                searchRef.current?.blur();
              }
              if (event.key === 'Escape') setShowRecents(false);
            }}
            placeholder="예: bathroom, hungry, 화장실, 기도"
            autoComplete="off"
            enterKeyHint="search"
          />
          <div className="search-hint">기본은 전체 분류 검색 · 분류를 고르면 해당 분류 안에서 검색 · 스페인어 제외</div>
          {showRecents && !query && recentSearches.length > 0 && (
            <div className="recent-searches">
              <div className="recent-heading"><strong>최근 검색</strong>
                <button type="button" className="text-button" onMouseDown={(event) => event.preventDefault()} onClick={() => setRecentSearches([])}>지우기</button>
              </div>
              {recentSearches.map((search) => (
                <button type="button" className="recent-item" key={search} onMouseDown={(event) => event.preventDefault()} onClick={() => selectRecentSearch(search)}>
                  ↺ {search}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="quick-access" aria-label="빠른 검색">
          <h2>빠른 찾기</h2>
          <div className="quick-row">
            {quickAccess.map((item) => (
              <button type="button" className="quick-chip" key={item.label}
                onClick={() => setCategory(item.category, item.subcategory)}>
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <div className="view-tabs" aria-label="문장 모음 선택">
          <button type="button" className={view === 'dictionary' && !showFavorites ? 'active' : ''} onClick={() => setCategory(ALL_CATEGORIES)}>📖 사전</button>
          <button type="button" className={showFavorites ? 'active' : ''} onClick={() => setCategory(FAVORITES)}>★ 즐겨찾기{favorites.length ? ` ${favorites.length}` : ''}</button>
          <button type="button" className={view === 'conversations' ? 'active' : ''} onClick={() => { setView('conversations'); setShowRecents(false); }}>💬 실전 대화</button>
        </div>

        {view === 'conversations' ? (
          <section className="dialogue-panel" aria-label="실전 대화 예시">
            {conversations.map((conversation) => (
              <article className="dialogue-card" key={conversation.title}>
                <h2>{conversation.title}</h2>
                {conversation.lines.map((line, index) => (
                  <div className="dialogue-line" key={`${conversation.title}-${index}`}>
                    <span className="dialogue-speaker">{line.speaker === 'A' ? '나' : '상대방'}</span>
                    <p lang="es">{line.spanish}</p>
                    <small>{line.korean}</small>
                  </div>
                ))}
              </article>
            ))}
          </section>
        ) : isDefaultHome ? (
          <section className="category-section" aria-label="주요 분류">
            <div className="section-heading">
              <h2>상황별 문장</h2>
              <span>10개 분류 · {phrases.length}개 문장</span>
            </div>
            <div className="category-grid">
              {categories.map((item) => {
                const count = phrases.filter((phrase) => phrase.category === item.id).length;
                return (
                  <button type="button" className="category-card" key={item.id} onClick={() => setCategory(item.id)}>
                    <span className="category-icon" aria-hidden="true">{item.icon}</span>
                    <span className="category-name">{item.label}</span>
                    <span className="category-count">{count}개 문장</span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <>
            <nav className="category-nav" aria-label="분류 선택">
              <button type="button" className={`chip ${activeCategory === ALL_CATEGORIES ? 'active' : ''}`} onClick={() => setCategory(ALL_CATEGORIES)}>전체</button>
              {categories.map((item) => (
                <button type="button" className={`chip ${activeCategory === item.id ? 'active' : ''}`} key={item.id} onClick={() => setCategory(item.id)}>
                  {item.label}
                </button>
              ))}
            </nav>
            {category && (
              <nav className="subcategory-nav" aria-label={`${category.label} 세부 분류`}>
                <button type="button" className={`subcategory-chip ${!activeSubcategory ? 'active' : ''}`} onClick={() => setActiveSubcategory('')}>전체</button>
                {subcategories.map((subcategory) => (
                  <button type="button" className={`subcategory-chip ${activeSubcategory === subcategory ? 'active' : ''}`} key={subcategory} onClick={() => setActiveSubcategory(subcategory)}>
                    {subcategoryLabels[subcategory] ?? subcategory}
                  </button>
                ))}
              </nav>
            )}
            <div className="results-summary" aria-live="polite">
              {`${visiblePhrases.length}개 문장${category ? ` · ${category.label}` : activeCategory === FAVORITES ? ' · 즐겨찾기' : ''}${activeSubcategory ? ` · ${subcategoryLabels[activeSubcategory] ?? activeSubcategory}` : ''}`}
            </div>
            <section className="phrase-list" aria-label="검색 결과">
              {visiblePhrases.length ? visiblePhrases.map((phrase) => {
                const isFavorite = favorites.includes(phrase.id);
                return (
                  <article className="phrase-card" key={phrase.id}>
                    <div className="phrase-meta">
                      <span>{categories.find((item) => item.id === phrase.category)?.label} <span aria-hidden="true">·</span> {subcategoryLabels[phrase.subcategory] ?? phrase.subcategory}</span>
                      <button type="button" className={`favorite-button ${isFavorite ? 'active' : ''}`}
                        onClick={() => toggleFavorite(phrase.id)} aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                        aria-pressed={isFavorite}>{isFavorite ? '★' : '☆'}</button>
                    </div>
                    <div className="spanish-text" lang="es">{phrase.spanish}</div>
                    <div className="korean-text">{phrase.korean}</div>
                    <div className="pronunciation"><span>발음</span>{phrase.pronunciation}</div>
                    <div className="phrase-actions">
                      <button type="button" className="show-local-button" onClick={() => setShowLocalPhrase(phrase)}>현지인에게 보여주기</button>
                    </div>
                  </article>
                );
              }) : <div className="empty-state">{query ? '검색 결과가 없어요. 다른 영어 또는 한국어 단어를 입력해 보세요.' : activeCategory === FAVORITES ? '아직 저장한 즐겨찾기가 없어요.' : '이 분류에는 문장이 없어요.'}</div>}
            </section>
          </>
        )}
        <footer className="app-footer">오프라인에서 사용 가능 · 한국어 발음은 참고용 표기입니다.</footer>
      </main>

      {showLocalPhrase && (
        <div className="show-local-overlay" role="presentation" onClick={() => setShowLocalPhrase(null)}>
          <section className="show-local-view" role="dialog" aria-modal="true" aria-label="현지인에게 보여줄 문장" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-local-button" onClick={() => setShowLocalPhrase(null)} aria-label="닫기">×</button>
            <div className="show-local-label">Por favor, lea esto</div>
            <p className="show-local-spanish" lang="es">{showLocalPhrase.spanish}</p>
            <p className="show-local-korean">{showLocalPhrase.korean}</p>
            <p className="show-local-pronunciation">{showLocalPhrase.pronunciation}</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
