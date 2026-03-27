import { useState, type CSSProperties } from 'react';

type PetalStyle = CSSProperties & {
  '--left': string;
  '--top': string;
  '--delay': string;
  '--duration': string;
  '--drift': string;
  '--scale': number;
};

type SectionKey = 'blossom' | 'station';

type StationCard = {
  id: string;
  name: string;
  englishName: string;
  region: string;
  line: string;
  code: string;
  stationNumber: string;
  platform: string;
  color: string;
  description: string;
  tagline: string;
};

type StationSeed = {
  id: string;
  name: string;
  englishName: string;
  region: string;
  code: string;
  color: string;
};

const menuItems: { key: SectionKey; label: string }[] = [
  { key: 'blossom', label: '벚꽃 카드 소개' },
  { key: 'station', label: '역명판 카드 소개' },
];

const stationSeeds: StationSeed[] = [
  { id: 'seoul', name: '서울', englishName: 'Seoul', region: '수도권', code: 'S01', color: '#0b4ea2' },
  { id: 'yongsan', name: '용산', englishName: 'Yongsan', region: '수도권', code: 'S02', color: '#275dc7' },
  { id: 'yeongdeungpo', name: '영등포', englishName: 'Yeongdeungpo', region: '수도권', code: 'S03', color: '#3567d6' },
  { id: 'cheongnyangni', name: '청량리', englishName: 'Cheongnyangni', region: '수도권', code: 'S04', color: '#4174de' },
  { id: 'gwangmyeong', name: '광명', englishName: 'Gwangmyeong', region: '수도권', code: 'S05', color: '#4c81e1' },
  { id: 'suwon', name: '수원', englishName: 'Suwon', region: '수도권', code: 'S06', color: '#5a8de5' },
  { id: 'cheonan', name: '천안', englishName: 'Cheonan', region: '충청권', code: 'C01', color: '#4b9dca' },
  { id: 'cheonanasan', name: '천안아산', englishName: 'CheonanAsan', region: '충청권', code: 'C02', color: '#46a7c6' },
  { id: 'osong', name: '오송', englishName: 'Osong', region: '충청권', code: 'C03', color: '#34a6a0' },
  { id: 'cheongjuairport', name: '청주공항', englishName: 'Cheongju Airport', region: '충청권', code: 'C04', color: '#2fa58d' },
  { id: 'daejeon', name: '대전', englishName: 'Daejeon', region: '충청권', code: 'D01', color: '#1e8f5a' },
  { id: 'jecheon', name: '제천', englishName: 'Jecheon', region: '강원·중부', code: 'J01', color: '#7aa73f' },
  { id: 'wonju', name: '원주', englishName: 'Wonju', region: '강원·중부', code: 'J02', color: '#8fb13e' },
  { id: 'gangneung', name: '강릉', englishName: 'Gangneung', region: '강원·동해', code: 'G01', color: '#61a8ff' },
  { id: 'iksan', name: '익산', englishName: 'Iksan', region: '호남권', code: 'J03', color: '#97a93a' },
  { id: 'jeonju', name: '전주', englishName: 'Jeonju', region: '호남권', code: 'J04', color: '#b29b2f' },
  { id: 'gwangjusongjeong', name: '광주송정', englishName: 'GwangjuSongjeong', region: '호남권', code: 'J05', color: '#d07f29' },
  { id: 'mokpo', name: '목포', englishName: 'Mokpo', region: '호남권', code: 'J06', color: '#e07a3f' },
  { id: 'suncheon', name: '순천', englishName: 'Suncheon', region: '호남권', code: 'J07', color: '#d87558' },
  { id: 'yeosuexpo', name: '여수엑스포', englishName: 'Yeosu Expo', region: '호남권', code: 'J08', color: '#d7637a' },
  { id: 'gumi', name: '구미', englishName: 'Gumi', region: '영남권', code: 'K01', color: '#ef7d00' },
  { id: 'daegu', name: '대구', englishName: 'Daegu', region: '영남권', code: 'K02', color: '#f08e1c' },
  { id: 'dongdaegu', name: '동대구', englishName: 'Dongdaegu', region: '영남권', code: 'K03', color: '#f29d34' },
  { id: 'pohang', name: '포항', englishName: 'Pohang', region: '영남권', code: 'K04', color: '#34a7b5' },
  { id: 'gyeongju', name: '경주', englishName: 'Gyeongju', region: '영남권', code: 'K05', color: '#18a59e' },
  { id: 'ulsan', name: '울산', englishName: 'Ulsan', region: '영남권', code: 'K06', color: '#18a28d' },
  { id: 'gupo', name: '구포', englishName: 'Gupo', region: '영남권', code: 'K07', color: '#138dcb' },
  { id: 'busan', name: '부산', englishName: 'Busan', region: '영남권', code: 'K08', color: '#0090d0' },
  { id: 'masan', name: '마산', englishName: 'Masan', region: '영남권', code: 'K09', color: '#4d8bd7' },
  { id: 'jinju', name: '진주', englishName: 'Jinju', region: '영남권', code: 'K10', color: '#7d7ed4' },
];

const stationCards: StationCard[] = stationSeeds.map((station) => ({
  ...station,
  line: 'KORAIL STATION SIGN',
  stationNumber: station.code.replace(/[A-Z]/g, ''),
  platform: `${(station.code.charCodeAt(1) % 8) + 1}번`,
  description: `${station.region} 판매역으로 운영 중인 ${station.name} 역명판 카드 전시 정보`,
  tagline: `${station.englishName.toUpperCase()} CARD`,
}));

const skyPetals: PetalStyle[] = Array.from({ length: 24 }, (_, index) => ({
  '--left': `${2 + (index / 23) * 96}%`,
  '--top': '-12%',
  '--delay': `-${1.4 + index * 0.85}s`,
  '--duration': `${10 + (index % 5) * 2}s`,
  '--drift': `${(index % 2 === 0 ? 1 : -1) * (22 + (index % 4) * 12)}px`,
  '--scale': 0.65 + (index % 5) * 0.1,
}));

const breezePetals: PetalStyle[] = Array.from({ length: 16 }, (_, index) => ({
  '--left': `${5 + (index / 15) * 90}%`,
  '--top': `${14 + (index % 5) * 8}vh`,
  '--delay': `-${0.8 + index * 0.75}s`,
  '--duration': `${7 + (index % 4) * 1.4}s`,
  '--drift': `${(index % 3 === 0 ? -1 : 1) * (26 + (index % 5) * 11)}px`,
  '--scale': 0.72 + (index % 4) * 0.12,
}));

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const blossomCardImage = assetPath('img/벚꽃_진해.png');
const stationBackgroundVideo = assetPath('videos/transport_bg.mp4');

function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('blossom');
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const activeStation = stationCards[activeStationIndex];
  const previousStation = stationCards[(activeStationIndex - 1 + stationCards.length) % stationCards.length];
  const nextStation = stationCards[(activeStationIndex + 1) % stationCards.length];

  return (
    <main className={`intro-page section-${activeSection}`}>
      {activeSection === 'station' ? (
        <div className="station-video-background" aria-hidden="true">
          <video autoPlay loop muted playsInline preload="auto">
            <source src={stationBackgroundVideo} type="video/mp4" />
          </video>
          <div className="station-video-overlay" />
        </div>
      ) : null}

      <div className="sky-glow sky-glow-left" aria-hidden="true" />
      <div className="sky-glow sky-glow-right" aria-hidden="true" />

      <div className="petal-layer petal-layer-back" aria-hidden="true">
        {skyPetals.map((style, index) => (
          <span className="petal" key={`petal-${index}`} style={style} />
        ))}
      </div>

      <div className="petal-layer petal-layer-front" aria-hidden="true">
        {breezePetals.map((style, index) => (
          <span className="petal petal-breeze" key={`breeze-petal-${index}`} style={style} />
        ))}
      </div>

      <div className="page-shell">
        <header className="topbar">
          <div className="brand-block">
            <span className="brand-kicker">Korail Networks</span>
            <strong>교통시스템처 카드 아카이브</strong>
          </div>

          <nav className="menu-tabs" aria-label="카드 소개 메뉴">
            {menuItems.map((item) => (
              <button
                type="button"
                key={item.key}
                className={item.key === activeSection ? 'menu-tab is-active' : 'menu-tab'}
                onClick={() => setActiveSection(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <section className="showcase-panel">
          <div className={activeSection === 'blossom' ? 'showcase-content is-visible' : 'showcase-content'} hidden={activeSection !== 'blossom'}>
            <div className="section-copy">
              <p className="eyebrow">Blossom Card Collection</p>
              <h1>벚꽃 카드를 화면의 주인공으로 전면에 세운 인트로</h1>
              <p className="description">
                설명 박스보다 카드 자체가 먼저 보이도록 구성했습니다. 봄빛, 꽃잎,
                반짝이는 홀로그램 느낌을 더해서 첫 진입부터 기념 카드의 존재감이
                바로 느껴지게 설계했습니다.
              </p>
            </div>

            <div className="card-stage" aria-label="벚꽃 카드 미리보기">
              <div className="card-shadow card-shadow-left" aria-hidden="true" />
              <article className="feature-card blossom-card">
                <div className="card-chip" aria-hidden="true" />
                <img className="card-artwork" src={blossomCardImage} alt="벚꽃 카드 이미지" />
                <div className="card-image-overlay" aria-hidden="true" />
                <div className="card-content">
                  <span className="card-badge">Limited Spring Edition</span>
                </div>
                <div className="card-shine" aria-hidden="true" />
              </article>
              <div className="card-caption">
                <span>Design Direction</span>
                <p>실물 카드처럼 보이는 비주얼 중심 intro, 이후 상세 페이지로 자연스럽게 연결</p>
              </div>
            </div>
          </div>

          <div className={activeSection === 'station' ? 'showcase-content is-visible station-layout' : 'showcase-content station-layout'} hidden={activeSection !== 'station'}>
            <div className="section-copy">
              <p className="eyebrow">Station Sign Card Collection</p>
              <h1>코레일 역명판 구조를 반영한 카드 전시</h1>
              <p className="description">
                짙은 블루 바탕, 중앙 역명, 좌우 인접역, 하단 노란 라인 구조를 기준으로
                판매역 카드를 다시 정리했습니다. 오른쪽에서 역을 고르면 메인 역명판과
                카드 정보가 함께 바뀝니다.
              </p>
            </div>

            <div className="station-experience">
              <section className="station-sign-stage" aria-label="코레일 역명판 시안">
                <div className="platform-backdrop">
                  <span className="hanger hanger-left" />
                  <span className="hanger hanger-right" />
                  <span className="platform-grid" />
                  <article className="korail-signboard">
                    <div className="sign-topline">
                      <div className="adjacent-station adjacent-station-left">
                        <span className="station-badge">{previousStation.stationNumber}</span>
                        <strong>{previousStation.name}</strong>
                        <span>{previousStation.englishName}</span>
                      </div>

                      <div className="sign-center">
                        <span className="station-badge station-badge-main">{activeStation.stationNumber}</span>
                        <h2>{activeStation.name}</h2>
                        <p>{activeStation.englishName}</p>
                      </div>

                      <div className="adjacent-station adjacent-station-right">
                        <span className="station-badge">{nextStation.stationNumber}</span>
                        <strong>{nextStation.name}</strong>
                        <span>{nextStation.englishName}</span>
                      </div>
                    </div>

                    <div className="sign-bottomline" aria-hidden="true">
                      <span className="sign-route-line" />
                      <span className="sign-arrow">➜</span>
                    </div>

                    <div className="sign-footer">
                      <span className="sign-line-label">{activeStation.line}</span>
                      <strong>KORAIL</strong>
                      <span>{activeStation.region}</span>
                    </div>
                  </article>
                </div>

              </section>

              <aside className="station-sidebar" aria-label="판매역 목록 및 카드 상세">
                <div className="station-selector">
                  <div className="station-list-header">
                    <span>Sales List</span>
                    <strong>판매역 리스트</strong>
                  </div>
                  <div className="station-list">
                    {stationCards.map((station, index) => (
                      <button
                        type="button"
                        key={`list-${station.id}`}
                        className={index === activeStationIndex ? 'station-list-item is-active' : 'station-list-item'}
                        onClick={() => setActiveStationIndex(index)}
                      >
                        <span className="station-list-chip" style={{ backgroundColor: station.color } as CSSProperties} />
                        <span className="station-list-name">{station.name}</span>
                        <span className="station-list-code">{station.code}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="station-card-stack" aria-label="역명판 카드 상세">
                  <div className="station-ticket station-ticket-back" aria-hidden="true" />
                  <div className="station-ticket station-ticket-middle" aria-hidden="true" />
                  <article className="station-ticket station-ticket-main">
                    <span className="ticket-line" style={{ backgroundColor: activeStation.color }}>
                      {activeStation.line}
                    </span>
                    <h2>{activeStation.name} 역명판 카드</h2>
                    <p>{activeStation.description}</p>
                    <div className="ticket-meta">
                      <span>{activeStation.code}</span>
                      <span>{activeStation.tagline}</span>
                      <span>{activeStation.region}</span>
                    </div>
                    <div className="ticket-nameplate">
                      <strong>{activeStation.name}</strong>
                      <span>{activeStation.englishName}</span>
                    </div>
                    <div className="ticket-platform">
                      <span>Platform</span>
                      <strong>{activeStation.platform}</strong>
                    </div>
                    <div className="ticket-footer">
                      <span>Korail Networks Collection</span>
                      <span>{activeStation.englishName}</span>
                    </div>
                  </article>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
