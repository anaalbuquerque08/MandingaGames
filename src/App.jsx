import React, { useState, useCallback, useMemo, useEffect } from 'react';
import './App.css';
import "./variables.css";
import { FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import LogoSimbol from './assets/components/simbol.png';
import { translations } from "./i18n/translations";
import { IoChevronBackSharp } from "react-icons/io5";
 
const GAMES = [
  { 
    id: 1, 
    titleKey: "game_1_title", 
    descriptionKey: "game_1_description", 
    imageUrl: "/assets/games/blacksailors.png", 
    videoUrl: "/assets/videos/blacksailors_trailer.mp4", 
    availability: "demo", // <--- DEMO
    storeLink: "https://itch.io/blacksailors-demo" // Link para demo
  },
  { 
    id: 2, 
    titleKey: "game_2_title", 
    descriptionKey: "game_2_description", 
    imageUrl: "/assets/games/sudokats.png", 
    videoUrl: "/assets/videos/sudokats_trailer.mp4", 
    availability: "now", // <--- NOW
    storeLink: "https://store.steampowered.com/app/sudokats" 
  },
  { 
    id: 3, 
    titleKey: "game_3_title", 
    descriptionKey: "game_3_description", 
    imageUrl: "/assets/games/sudokube.png", 
    videoUrl: "/assets/videos/sudokube_trailer.mp4", 
    availability: "soon", // Mantido
    storeLink: null 
  },
  { 
    id: 4, 
    titleKey: "game_4_title", 
    descriptionKey: "game_4_description", 
    imageUrl: "/assets/games/tinkerracers.jpg", 
    videoUrl: "/assets/videos/tinkerracers_trailer.mp4", 
    availability: "now", // Mantido
    storeLink: "https://store.steampowered.com/app/4" 
  },
  { 
    id: 5, 
    titleKey: "game_5_title", 
    descriptionKey: "game_5_description", 
    imageUrl: "/assets/games/EmancipatorGo.png", 
    videoUrl: "/assets/videos/emancipatorgo_trailer.mp4", 
    availability: "soon", // Mantido
    storeLink: null 
  },
  { 
    id: 6, 
    titleKey: "game_6_title", 
    descriptionKey: "game_6_description", 
    imageUrl: "/assets/games/hardworksimulator.png", 
    videoUrl: "/assets/videos/hardwork_trailer.mp4", 
    availability: "now", // <--- NOW
    storeLink: "https://store.steampowered.com/app/hardwork" 
  },
];

// ======================================
// HEADER (Corrigido para Desktop e Mobile)
// ======================================
const Header = ({ navigate, isHeaderDark, t, setLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // fecha o menu ao navegar
  const handleNavigate = (page, idAlvo = null) => {
    setMenuOpen(false);
    navigate(page, idAlvo);
  };

  return (
    <>
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <header className={`header ${isHeaderDark ? 'scrolled' : ''}`}>

        <div className="header-left">
          <button onClick={() => handleNavigate('home')} className="logo" aria-label="Home">
            <img src={LogoSimbol} alt="Mandinga Games Logo" className="logo-img" />
          </button>
        </div>

        <nav className="nav desktop-nav">
          <button onClick={() => handleNavigate('home')}>{t("home")}</button>
          <button onClick={() => handleNavigate('scroll', 'about-us-section')}>{t("aboutUs")}</button>
          <button onClick={() => handleNavigate('scroll', 'games-section')}>{t("games")}</button>
          <button onClick={() => handleNavigate('home')}>{t("contact")}</button>
        </nav>

        <div className="header-right-container">
          <div className="langs">
            <img
              src="/assets/flags/br.png"
              onClick={() => {
                localStorage.setItem("lang", "pt");
                setLang("pt");
                window.location.reload();
              }}
              className="lang-icon"
              alt="Português"
            />

            <img
              src="/assets/flags/en.png"
              onClick={() => {
                localStorage.setItem("lang", "en");
                setLang("en");
                window.location.reload();
              }}
              className="lang-icon"
              alt="English"
            />
          </div>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>


        <aside className={`side-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>

          <div className="mobile-menu">
            <button onClick={() => handleNavigate('home')}>{t("home")}</button>
            <button onClick={() => handleNavigate('scroll', 'about-us-section')}>{t("aboutUs")}</button>
            <button onClick={() => handleNavigate('scroll', 'games-section')}>{t("games")}</button>
            <button onClick={() => handleNavigate('home')}>{t("contact")}</button>
          </div>

          <div className="side-socials">
            <a href="https://x.com/mandingagames" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/mandinga.games/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@mandingagames" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
        </aside>
      </header>
    </>
  );
};

const GameCard = ({ game, navigate, t }) => { 
  const [isHovering, setIsHovering] = useState(false);

  const renderContent = () => {
    if (isHovering && game.videoUrl) {
      return (
        <video
          title={`${t(game.titleKey)} Trailer`} 
          src={game.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="game-trailer"
        />
      );
    }

    return (
      <img
        src={game.imageUrl}
        alt={t(game.titleKey)} 
        onError={(e) => { e.target.src = "https://placehold.co/300x200/333/FFF?text=GAME" }}
      />
    );
  };

  return (
    <div
      className="game-card"
      onClick={() => navigate('gamepage', game.id)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="game-img">{renderContent()}</div>
    </div>
  );
};


// ======================================
// SEÇÕES
// ======================================
const HeroSection = ({ parallaxOffset }) => (
  <section
    className="hero-section"
    style={{
      backgroundPositionY: `${parallaxOffset}px`
    }}
  >
    <div className="hero-overlay"></div>
    <div className="hero-content"></div>
  </section>
);


const AboutUsSection = ({ navigate, t }) => (
  <section className="about-section" id="about-us-section">
    <div className='about-box'>

      <div className="about-text">
        <h2>{t("aboutTitle")}</h2>
        <p>{t("aboutText1")}</p>
        <p>{t("aboutText2")}</p>

        <div className="social-box">
          <a
            href="https://mandinga.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="follow-btn"
          >
            {t("followUs")}
          </a>


          <div className="social-icons">
            <a href="https://x.com/mandingagames" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/mandinga.games/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@mandingagames" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <img
        src="/assets/control.png"
        alt="Controle de jogo"
        className="about-image-control"
      />
    </div>
  </section>
);


const GamesGridSection = ({ navigate, t }) => {

  useEffect(() => {
    const cards = document.querySelectorAll(".game-card");
    cards.forEach((card, i) => {
      card.style.animationDelay = `${i * 0.15}s`;
    });
  }, []);

  return (
    <section className="games-section" id="games-section">
      <h2>{t("gamesTitle")}</h2>

      <div className="games-grid">
        {GAMES.map(game => <GameCard key={game.id} game={game} navigate={navigate} t={t} />)} 
      </div>
    </section>
  );
};


const GameDetailPage = ({ game, navigate, t }) => {
  if (!game) {
    return (
      <div className="game-not-found">
        <h1>{t("gameNotFound")}</h1>
        <button onClick={() => navigate('home')}>{t("home")}</button>
      </div>
    );
  }
 
  let statusTextKey;
  if (game.availability === "now") {
    statusTextKey = "availableNow";
  } else if (game.availability === "demo") {
    statusTextKey = "availableDemo";
  } else { 
    statusTextKey = "comingSoon";
  }
 
  let buttonTextKey;
  let buttonLink = game.storeLink;

  if (game.availability === "demo") {
    buttonTextKey = "playTheDemo";
  } else if (game.availability === "now") {
    buttonTextKey = "playOnSteam";
  } else { // "soon"
    buttonTextKey = "comingSoon";
    buttonLink = null;
  }
  
  const handlePlayButtonClick = () => {
    if (buttonLink) {
      window.open(buttonLink, '_blank');
    }
  };
  // -------------------------------------

  return (
    <main className="game-detail">
      <div className="detail-img">
        <button className="back-btn " onClick={() => navigate('home')}>
         <IoChevronBackSharp size={32} />  
        </button>
        <img
          src={game.imageUrl}
          alt={`Tela do Jogo ${t(game.titleKey)}`} 
          onError={(e) => { e.target.src = "https://placehold.co/400x450/333/FFF?text=TELA+DO+JOGO" }}
        />
        <div className="detail-img-overlay"></div>
      </div>

      <div className="detail-content">
        <div className="detail-text">
           
          <h1 className="game-title-container">
            {t(game.titleKey)} 
            <span className={`status-tag status-${game.availability}`}>
              {t(statusTextKey)}
            </span>
          </h1>
          <p>{t(game.descriptionKey)}</p> 

          
          <button 
            className={`follow-btn  ${game.availability === 'soon' ? 'disabled' : ''}`}
            onClick={handlePlayButtonClick}
            disabled={game.availability === 'soon'}
          >
            {t(buttonTextKey)}
          </button>
        </div>
      </div>
    </main>
  );
};

const App = () => {
  const [page, setPage] = useState('home');
  const [gameId, setGameId] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  const [parallaxOffset, setParallaxOffset] = useState(0);

  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "pt";
  });

  const t = (key) => translations[lang][key] || key;


  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      setParallaxOffset(y * 0.35);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHeaderDark = useMemo(() => {
    const SCROLL_THRESHOLD = 700;
    if (page !== 'home') return true;
    return scrollY > SCROLL_THRESHOLD;
  }, [page, scrollY]);

  const navigate = useCallback((newPage, idAlvo = null) => {
    if (newPage === 'scroll' && idAlvo) {
      const element = document.getElementById(idAlvo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    setPage(newPage);
    setGameId(idAlvo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentGame = useMemo(() => GAMES.find(g => g.id === gameId), [gameId]);

  let content;
  if (page === 'home') {
    content = (
      <>
        <HeroSection parallaxOffset={parallaxOffset} />
        <AboutUsSection navigate={navigate} t={t} />
        <GamesGridSection navigate={navigate} t={t} />
      </>
    );
  } else if (page === 'gamepage') {
    content = <GameDetailPage game={currentGame} navigate={navigate} t={t} />;
  } else {
    content = <div className="page-not-found">{t("notFound")}</div>;
  }

  return (
    <div className="app">
      <Header navigate={navigate} isHeaderDark={isHeaderDark} t={t} setLang={setLang} />
      {content}

      <footer className="footer">
        <p>© {new Date().getFullYear()} MANDINGA GAMES. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;