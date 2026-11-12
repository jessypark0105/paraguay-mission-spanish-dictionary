import { useEffect, useMemo, useState } from 'react';
import { categories, conversations, phrases, type Phrase } from './data/phrases';

const FAVORITES_KEY = 'paraguay-spanish-favorites-v1';
type View = 'dictionary' | 'conversations';

const categoryLabels: Record<string, string> = {
  'All': '전체',
  'Favorites': '즐겨찾기',
  'Greetings': '인사',
  'Introductions': '자기소개',
  'Directions & Transportation': '길 찾기 · 교통',
  'Shopping': '쇼핑',
  'Food': '음식',
  'Emergencies': '긴급 상황',
  'Children & Activities': '어린이 · 활동',
  'Church & Ministry': '교회 · 사역',
  'Gospel': '복음',
  'Prayer & Blessings': '기도 · 축복'
};

function loadFavorites(): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((id): id is number => Number.isInteger(id)) : [];
  } catch {
    return [];
  }
}

function speak(text: string) {
  if (typeof window.speechSynthesis?.speak !== 'function') {
    window.alert('이 브라우저는 음성 재생을 지원하지 않아요. 카드의 발음 표기를 참고해 주세요.');
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text.replace(/___/g, ''));
  const voices = window.speechSynthesis.getVoices();
  const spanishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('es'));
  const voice = spanishVoices.find((item) => item.lang.toLowerCase() === 'es-py')
    ?? spanishVoices.find((item) => item.lang.toLowerCase() === 'es-es')
    ?? spanishVoices[0];
  utterance.lang = voice?.lang ?? 'es-ES';
  if (voice) utterance.voice = voice;
  utterance.rate = 0.86;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>(loadFavorites);
  const [view, setView] = useState<View>('dictionary');

  useEffect(() => {
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch { /* storage may be disabled */ }
  }, [favorites]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return phrases.filter((phrase) => {
      const categoryMatches = activeCategory === 'All'
        || (activeCategory === 'Favorites' ? favorites.includes(phrase.id) : phrase.category === activeCategory);
      const text = [phrase.spanish, phrase.korean, phrase.pronunciation, phrase.category, ...phrase.tags].join(' ').toLocaleLowerCase();
      return categoryMatches && (!needle || text.includes(needle));
    });
  }, [activeCategory, favorites, query]);

  const toggleFavorite = (id: number) => setFavorites((current) =>
    current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
  );

  const playPhrase = (phrase: Phrase) => {
    if (phrase.tags.includes('과라니어')) {
      window.alert('과라니어는 스페인어 음성으로 정확하게 읽을 수 없어요. 발음 표기를 참고해 주세요.');
      return;
    }
    speak(phrase.spanish);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true">🇵🇾</div>
        <div className="eyebrow">Misión Paraguay</div>
        <h1>선교 스페인어 사전</h1>
        <p>오프라인 검색 · 한국어 / Español · 실전 대화</p>
      </header>
      <main className="content-wrap">
        <section className="search-panel" aria-label="문장 검색">
          <label htmlFor="phrase-search">🔎 문장 검색</label>
          <input id="phrase-search" className="search-input" type="search" value={query}
            onChange={(event) => setQuery(event.target.value)} placeholder="예: 화장실, 감사합니다, Dios..." autoComplete="off" />
          <div className="search-hint">한국어 · Español · 발음으로 바로 찾기</div>
        </section>
        <nav className="view-tabs" aria-label="화면 선택">
          <button type="button" className={view === 'dictionary' ? 'active' : ''} onClick={() => setView('dictionary')}>📖 문장 사전</button>
          <button type="button" className={view === 'conversations' ? 'active' : ''} onClick={() => setView('conversations')}>💬 실전 대화</button>
        </nav>
        {view === 'dictionary' ? <>
          <div className="chip-row" aria-label="분류 선택">
            {['All', 'Favorites', ...categories].map((category) => <button type="button" key={category}
              className={`chip ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>
              {categoryLabels[category] ?? category}
            </button>)}
          </div>
          <div className="results-summary" aria-live="polite">{filtered.length}개 문장</div>
          <p className="notice">🔊 음성 재생은 기기에 설치된 스페인어 음성을 사용합니다. 지원되지 않는 경우 발음 표기를 참고해 주세요. 과라니어는 음성 재생을 제공하지 않습니다.</p>
          <section className="phrase-list" aria-label="검색 결과">
            {filtered.length ? filtered.map((phrase) => <article className="phrase-card" key={phrase.id}>
              <div className="phrase-meta"><span>{categoryLabels[phrase.category]}</span>
                <button type="button" className={`favorite-button ${favorites.includes(phrase.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(phrase.id)} aria-label={favorites.includes(phrase.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                  aria-pressed={favorites.includes(phrase.id)}>{favorites.includes(phrase.id) ? '★' : '☆'}</button>
              </div>
              <div className="spanish-text" lang="es">{phrase.spanish}</div>
              <div className="korean-text">{phrase.korean}</div>
              <div className="pronunciation">발음: {phrase.pronunciation}</div>
              <div className="phrase-actions"><button type="button" className="audio-button" onClick={() => playPhrase(phrase)}>🔊 스페인어 듣기</button></div>
            </article>) : <div className="empty-state">검색 결과가 없어요. 다른 단어를 입력해 보세요.</div>}
          </section>
        </> : <section className="dialogue-panel" aria-label="실전 대화">
          {conversations.map((conversation) => <article className="dialogue-card" key={conversation.title}>
            <h2>{conversation.title}</h2>
            {conversation.lines.map((line, index) => <div className="dialogue-line" key={`${conversation.title}-${index}`}>
              <strong>{line.speaker}</strong><p lang="es">{line.spanish}</p><small>{line.korean}</small>
              <button type="button" className="audio-button small" onClick={() => speak(line.spanish)}>🔊 듣기</button>
            </div>)}
          </article>)}
        </section>}
        <footer className="app-footer">선교팀을 위한 오프라인 학습 자료 · 발음은 참고용 표기입니다.</footer>
      </main>
    </div>
  );
}

export default App;
