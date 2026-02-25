import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import "./App.css";
import "./variables.css";
import {
  FaSteam,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import LogoSimbol from "./assets/components/simbol.png";
import Logo from "./assets/components/whitelogogame.svg";
import { translations } from "./i18n/translations";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

// ======================================
// DADOS
// ======================================
const GAMES = [
  {
    id: 1,
    titleKey: "game_1_title",
    descriptionKey: "game_1_description",
    imageUrl: "/assets/games/blacksailors.png",
    imageMobile: "/assets/games/blacksailors_nologo.png",
    videoUrl: "/assets/videos/blacksailors_trailer_opt.mp4",
    availability: "demo",
    storeLink: "https://mandinga.itch.io/black-sailors",
  },
  {
    id: 2,
    titleKey: "game_2_title",
    descriptionKey: "game_2_description",
    imageUrl: "/assets/games/sudokats.png",
    imageMobile: "/assets/games/sudokats_nologo.png",
    videoUrl: "/assets/videos/sudokats_trailer_opt.mp4",
    availability: "now",
    storeLink: "https://store.steampowered.com/app/1706190/SudoKats/",
  },
  {
    id: 3,
    titleKey: "game_3_title",
    descriptionKey: "game_3_description",
    imageUrl: "/assets/games/sudokube.png",
    imageMobile: "/assets/games/sudokube_nologo.png",
    videoUrl: "/assets/videos/sudokube_trailer_opt.mp4",
    availability: "now",
    storeLink:
      "https://store.steampowered.com/app/1770230/SudoKube/?curator_clanid=41518892",
  },
  {
    id: 4,
    titleKey: "game_4_title",
    descriptionKey: "game_4_description",
    extraIconPath: "/assets/runbora-logo.png",
    extraDescriptionKey: "game_4_extra_info",
    imageUrl: "/assets/games/tinkerracers.png",
    imageMobile: "/assets/games/tinkerracers_nologo.png",
    videoUrl: "/assets/videos/tinkerracers_trailer_opt.mp4",
    availability: "now",
    storeLink: "https://store.steampowered.com/app/1234620/Tinker_Racers/",
  },
  {
    id: 5,
    titleKey: "game_5_title",
    descriptionKey: "game_5_description",
    imageUrl: "/assets/games/EmancipatorGo.png",
    imageMobile: "/assets/games/EmancipatorGo_nologo.png",
    videoUrl: "/assets/videos/emancipatorgo_trailer_opt.mp4",
    availability: "demo",
    storeLink:
      "https://store.steampowered.com/app/2114640/Emancipator_GO/?curator_clanid=41518892",
  },
  {
    id: 6,
    titleKey: "game_6_title",
    descriptionKey: "game_6_description",
    imageUrl: "/assets/games/hardworksimulator.png",
    imageMobile: "/assets/games/hardworksimulator_nologo.png",
    videoUrl: "/assets/videos/hardwork_trailer_opt.mp4",
    availability: "now",
    storeLink:
      "https://store.steampowered.com/app/1781880/Hardwork_Simulator/?curator_clanid=41518892",
  },
];

const AVAILABILITY_MAP = {
  now: { textKey: "availableNow", class: "status-now" },
  demo: { textKey: "availableDemo", class: "status-demo" },
  soon: { textKey: "comingSoon", class: "status-soon" },
};

// ======================================
// HEADER (Corrigido para evitar erro de Display Name)
// ======================================
const HeaderComponent = ({ isHeaderDark, t, setLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = useCallback(
    (path, isAnchor = true) => {
      setMenuOpen(false);
      const isHomePage = location.pathname === "/";
      const targetId = path.replace("/", "");

      if (isAnchor && targetId.startsWith("#")) {
        const id = targetId.replace("#", "");

        if (!isHomePage) {
          navigate(`/${targetId}`);
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
      } else if (!isAnchor && path === "/") {
        if (!isHomePage) {
          navigate("/");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate(path);
      }
    },
    [navigate, location.pathname],
  );

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.hash, location.pathname]);

  const handleLangChange = useCallback(
    (newLang) => {
      const currentLang = localStorage.getItem("lang") || "pt";

      if (newLang === currentLang) {
        setMenuOpen(false);
        return;
      }

      localStorage.setItem("lang", newLang);
      setLang(newLang);
      setMenuOpen(false);
    },
    [setLang],
  );

  return (
    <>
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <header className={`header ${isHeaderDark ? "scrolled" : ""}`}>
        <div className="header-left">
          <Link
            to="/"
            className="logo"
            aria-label="home"
            onClick={() => handleNavigate("/", false)}
          >
            <img
              src={LogoSimbol}
              alt="Mandinga Games Logo"
              className="logo-img"
            />
          </Link>
        </div>

        <nav className="nav desktop-nav">
          <button onClick={() => handleNavigate("/", false)}>
            {t("home")}
          </button>
          <button onClick={() => handleNavigate("/#about-us-section")}>
            {t("aboutUs")}
          </button>
          <button onClick={() => handleNavigate("/#games-section")}>
            {t("games")}
          </button>
          <button onClick={() => handleNavigate("/#contact-section")}>
            {t("contact")}
          </button>
        </nav>

        <div className="header-right-container desktop-only">
          <div className="langs">
            <img
              src="/assets/flags/br.png"
              onClick={() => handleLangChange("pt")}
              className="lang-icon"
              alt="Português"
            />
            <img
              src="/assets/flags/en.png"
              onClick={() => handleLangChange("en")}
              className="lang-icon"
              alt="English"
            />
          </div>
        </div>

        <div className="header-right-container">
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <aside
          className={`side-menu ${menuOpen ? "open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-container">
            <div className="mobile-menu">
              <button onClick={() => handleNavigate("/", false)}>
                {t("home")}
              </button>
              <button onClick={() => handleNavigate("/#about-us-section")}>
                {t("aboutUs")}
              </button>
              <button onClick={() => handleNavigate("/#games-section")}>
                {t("games")}
              </button>
              <button onClick={() => handleNavigate("/#contact-section")}>
                {t("contact")}
              </button>
            </div>
            <div className="langs mobile-langs">
              <img
                src="/assets/flags/br.png"
                onClick={() => handleLangChange("pt")}
                className="lang-icon"
                alt="Português"
              />
              <img
                src="/assets/flags/en.png"
                onClick={() => handleLangChange("en")}
                className="lang-icon"
                alt="English"
              />
            </div>
          </div>

          <div className="side-socials">
            <a
              href="https://x.com/mandingagames"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/mandinga.games/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@mandingagames"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
            </a>
          </div>
        </aside>
      </header>
    </>
  );
};

// Nomeando o memo para tirar o erro vermelho do VS Code
const Header = React.memo(HeaderComponent);

// ======================================
// GameCard
// ======================================
const GameCard = ({ game, t, activeGameId, onMobileCardClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const isMobile = useMemo(() => window.innerWidth < 768, []);

  const isThisCardActive = isMobile && activeGameId === game.id;
  const shouldPlayVideo =
    game.videoUrl && (!isMobile ? isHovering : isThisCardActive);

  useEffect(() => {
    if (videoRef.current) {
      if (shouldPlayVideo) {
        videoRef.current.play().catch((e) => {
          console.warn("Reprodução de vídeo bloqueada:", e.message);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [shouldPlayVideo]);

  const handleCardClick = () => {
    if (isMobile) {
      if (isThisCardActive) {
        navigate(`/game/${game.id}`);
      } else {
        onMobileCardClick(game.id);
      }
    } else {
      navigate(`/game/${game.id}`);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsHovering(false);
  };

  const renderContent = () => {
    if (shouldPlayVideo) {
      return (
        <video
          ref={videoRef}
          title={`${t(game.titleKey)} Trailer`}
          src={game.videoUrl}
          loop
          muted
          playsInline
          preload="metadata"
          className="game-trailer"
          poster={game.imageUrl}
        />
      );
    }

    return (
      <img
        src={game.imageUrl}
        alt={t(game.titleKey)}
        onError={(e) => {
          e.target.src = "https://placehold.co/300x200/333/FFF?text=GAME";
        }}
      />
    );
  };

  return (
    <div
      className={`game-card ${isThisCardActive ? "mobile-video-active" : ""}`}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
    >
      {shouldPlayVideo && (
        <button className="general-btn card-btn">{t("learnMore")}</button>
      )}

      <div className="game-img">{renderContent()}</div>
    </div>
  );
};
// ======================================
// SEÇÕES
// ======================================
const HeroSection = React.memo(({ parallaxOffset }) => (
  <section
    className="hero-section"
    style={{
      backgroundPositionY: `${parallaxOffset}px`,
    }}
  >
    <div className="hero-overlay"></div>
    <div className="hero-content"></div>
  </section>
));

const AboutUsSection = React.memo(({ t }) => (
  <section className="about-section" id="about-us-section">
    <div className="about-box">
      <div className="about-text reveal">
        <h2>{t("aboutTitle")}</h2>
        <p>{t("aboutText1")}</p>
        <p>{t("aboutText2")}</p>

        <div className="social-box">
          <a
            href="https://mandinga.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="general-btn"
          >
            {t("followUs")}
          </a>

          <div className="social-icons">
            <a
              href="https://x.com/mandingagames"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/mandinga.games/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@mandingagames"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <img
        src="/assets/control.png"
        alt="Controle de jogo"
        className="about-image-control reveal"
      />
    </div>
  </section>
));

// ======================================
// GamesSection
// ======================================
const GamesSection = ({ t }) => {
  const [mobileClickedGameId, setMobileClickedGameId] = useState(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".game-card");
    cards.forEach((card, i) => {
      card.style.animationDelay = `${i * 0.15}s`;
    });
  }, []);

  const handleGameCardClick = useCallback((gameId) => {
    setMobileClickedGameId((prevId) => (prevId === gameId ? null : gameId));
  }, []);

  return (
    <section className="games-section" id="games-section">
      <h2>{t("gamesTitle")}</h2>
      <div className="games-grid">
        {GAMES.map((game) => (
          <div key={game.id}>
            <GameCard
              game={game}
              t={t}
              activeGameId={mobileClickedGameId}
              onMobileCardClick={handleGameCardClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// ======================================
// HOME PAGE COMPONENT
// ======================================
const HomePage = React.memo(({ parallaxOffset, t }) => (
  <>
    <HeroSection parallaxOffset={parallaxOffset} />
    <AboutUsSection t={t} />
    <GamesSection t={t} />
  </>
));

// ======================================
// GAME DETAIL PAGE
// ======================================
const GameDetailPage = ({ t }) => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const game = useMemo(
    () => GAMES.find((g) => g.id === parseInt(gameId)),
    [gameId],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameId]);

  if (!game) {
    return (
      <div className="game-not-found">
        <h1>{t("notFound")}</h1>
        <button onClick={() => navigate("/")}>{t("home")}</button>
      </div>
    );
  }

  const statusInfo =
    AVAILABILITY_MAP[game.availability] || AVAILABILITY_MAP.soon;

  const buttonProps = useMemo(() => {
    if (game.availability === "demo") {
      return { textKey: "playTheDemo", link: game.storeLink, disabled: false };
    }
    if (game.availability === "now") {
      return { textKey: "playOnSteam", link: game.storeLink, disabled: false };
    }
    return { textKey: "comingSoon", link: null, disabled: true };
  }, [game.availability, game.storeLink]);

  const handlePlayButtonClick = () => {
    if (buttonProps.link) {
      window.open(buttonProps.link, "_blank");
    }
  };

  // Botão back removido (comentado) conforme pedido
  // const handleBackClick = () => navigate(-1);

  return (
    <main className="game-detail page-transition">
      {/* BOTÃO BACK REMOVIDO DAQUI */}

      <div className="detail-img">
        <img
          src={game.imageMobile}
          alt={`Tela do Jogo ${t(game.titleKey)}`}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x450/333/FFF?text=TELA+DO+JOGO";
          }}
        />

        <div className="detail-img-overlay">
          {game.extraDescriptionKey && (
            <div className="detail-extra-info">
              <p>Titulo de:</p>
              {game.extraIconPath && (
                <img
                  src={game.extraIconPath}
                  alt={t("extraFeature")}
                  className="detail-extra-icon"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-text">
          <h1 className="game-title-container">
            {t(game.titleKey)}
            <span className={`status-tag ${statusInfo.class}`}>
              {t(statusInfo.textKey)}
            </span>
          </h1>
          <p>{t(game.descriptionKey)}</p>

          <button
            className={`general-btn ${buttonProps.disabled ? "disabled" : ""}`}
            onClick={handlePlayButtonClick}
            disabled={buttonProps.disabled}
          >
            {t(buttonProps.textKey)}
          </button>
        </div>
      </div>
    </main>
  );
};

// ======================================
// FOOTER
// ======================================
const Footer = React.memo(({ t }) => (
  <footer className="footer" id="contact-section">
    <div className="footer-content">
      <div className="footer-section footer-branding">
        <Link to="/" className="logo-footer">
          <img src={Logo} alt="Mandinga Games Logo" className="logo-img" />
        </Link>
        <p className="copyright">
          © {new Date().getFullYear()} MANDINGA GAMES. {t("allRightsReserved")}
        </p>
      </div>

      <div className="footer-section footer-nav">
        <h3>{t("siteMap")}</h3>
        <ul>
          <li>
            <Link to="/">{t("home")}</Link>
          </li>
          <li>
            <a href="/#about-us-section">{t("aboutUs")}</a>
          </li>
          <li>
            <a href="/#games-section">{t("games")}</a>
          </li>
        </ul>
      </div>

      <div className="footer-section footer-contact">
        <h3>{t("Contact")}</h3>
        <ul>
          <li>
            <a href="mailto:mandingagamestudio@gmail.com">
              contact@mandinga.games
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-section footer-socials">
        <h3>{t("followUs")}</h3>
        <div className="social-icons">
          <a
            href="https://x.com/mandingagames"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/mandinga.games/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@mandingagames"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.youtube.com/@mandingagames"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://store.steampowered.com/developer/mandingagames"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSteam />
          </a>
        </div>
      </div>
    </div>
  </footer>
));
// ======================================
// COMPONENTE PRINCIPAL
// ======================================
const AppContent = () => {
  const [scrollY, setScrollY] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const location = useLocation();

  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "pt";
  });

  const t = useCallback((key) => translations[lang][key] || key, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setParallaxOffset(y * 0.35);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  const isHeaderDark = useMemo(() => {
    const SCROLL_THRESHOLD = 700;
    if (location.pathname.startsWith("/game/")) return true;
    return scrollY > SCROLL_THRESHOLD;
  }, [location.pathname, scrollY]);

  return (
    <div className="app">
      <Header isHeaderDark={isHeaderDark} t={t} setLang={setLang} />

      <Routes>
        <Route
          path="/"
          element={<HomePage parallaxOffset={parallaxOffset} t={t} />}
        />
        <Route path="/game/:gameId" element={<GameDetailPage t={t} />} />
        <Route
          path="*"
          element={<div className="page-not-found">{t("notFound")}</div>}
        />
      </Routes>

      <Footer t={t} />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
