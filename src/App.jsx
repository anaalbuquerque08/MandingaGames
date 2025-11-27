import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import './App.css';
import "./variables.css";
import { FaSteam,FaTwitter, FaInstagram, FaTiktok, FaYoutube, FaDiscord } from 'react-icons/fa';
import LogoSimbol from './assets/components/simbol.png';
import Logo from './assets/components/whitelogogame.png';
import { translations } from "./i18n/translations";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
const GAMES = [
    {
        id: 1,
        titleKey: "game_1_title",
        descriptionKey: "game_1_description",
        imageUrl: "/assets/games/blacksailors.png",
        imageMobile: "/assets/games/blacksailors_nologo.png",
        videoUrl: "/assets/videos/blacksailors_trailer.mp4",
        availability: "demo",
        storeLink: "https://mandinga.itch.io/black-sailors"
    },
    {
        id: 2,
        titleKey: "game_2_title",
        descriptionKey: "game_2_description",
        imageUrl: "/assets/games/sudokats.png",
        imageMobile: "/assets/games/sudokats_nologo.png",
        videoUrl: "/assets/videos/sudokats_trailer.mp4",
        availability: "now",
        storeLink: "https://store.steampowered.com/app/1706190/SudoKats/"
    },
    {
        id: 3,
        titleKey: "game_3_title",
        descriptionKey: "game_3_description",
        imageUrl: "/assets/games/sudokube.png",
        imageMobile: "/assets/games/sudokube_nologo.png",
        videoUrl: "/assets/videos/sudokube_trailer.mp4",
        availability: "now",
        storeLink: "https://store.steampowered.com/app/1770230/SudoKube/?curator_clanid=41518892"
    },
    {
        id: 4,
        titleKey: "game_4_title",
        descriptionKey: "game_4_description",
        extraIconPath: "/assets/runbora-logo.png",
        extraDescriptionKey: "game_4_extra_info",
        imageUrl: "/assets/games/tinkerracers.png",
        imageMobile: "/assets/games/tinkerracers_nologo.png",
        videoUrl: "/assets/videos/tinkerracers_trailer.mp4",
        availability: "now",
        storeLink: "https://store.steampowered.com/app/1234620/Tinker_Racers/"
    },
    {
        id: 5,
        titleKey: "game_5_title",
        descriptionKey: "game_5_description",
        imageUrl: "/assets/games/EmancipatorGo.png",
        imageMobile: "/assets/games/EmancipatorGo_nologo.png",
        videoUrl: "/assets/videos/emancipatorgo_trailer.mp4",
        availability: "demo",
        storeLink: "https://store.steampowered.com/app/2114640/Emancipator_GO/?curator_clanid=41518892"
    },
    {
        id: 6,
        titleKey: "game_6_title",
        descriptionKey: "game_6_description",
        imageUrl: "/assets/games/hardworksimulator.png",
        imageMobile: "/assets/games/hardworksimulator_nologo.png",
        videoUrl: "/assets/videos/hardwork_trailer.mp4",
        availability: "now",
        storeLink: "https://store.steampowered.com/app/1781880/Hardwork_Simulator/?curator_clanid=41518892"
    },
];

// ======================================
// HEADER (VERSÃO FINAL COM FLAGS SOMENTE NO DESKTOP)
// ======================================
const Header = ({ isHeaderDark, t, setLang }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = useCallback((path, isAnchor = true) => {
        setMenuOpen(false);

        if (isAnchor) {
            const targetId = path.replace('/#', '');

            if (location.pathname !== '/') {
                navigate(path);

                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 50);

            } else {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            navigate(path);
        }
    }, [navigate, location.pathname]);


    useEffect(() => {
        const handleHashScroll = () => {
            if (location.pathname === '/' && location.hash) {
                const id = location.hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 50);
                }
            }
        };
        handleHashScroll();
    }, [location]);


    const handleLangChange = (newLang) => {
        localStorage.setItem("lang", newLang);
        setLang(newLang);
        setMenuOpen(false);
        window.location.reload();
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
                    <Link to="/" className="logo" aria-label="home" onClick={() => {
                        if (location.pathname !== "/") {
                            handleNavigate('/', false);
                        } else {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}>
                        <img src={LogoSimbol} alt="Mandinga Games Logo" className="logo-img" />
                    </Link>
                </div>

                <nav className="nav desktop-nav">
                    <button
                        onClick={() => {
                            if (location.pathname !== "/") {
                                handleNavigate('/', false);
                            } else {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                    >
                        {t("home")}
                    </button>

                    <button onClick={() => handleNavigate('/#about-us-section')}>{t("aboutUs")}</button>
                    <button onClick={() => handleNavigate('/#games-section')}>{t("games")}</button>
                    <button onClick={() => handleNavigate('/#contact-section')}>{t("contact")}</button>
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
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Abrir menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                <aside className={`side-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
                   <div className='mobile-container'> 
                    <div className="mobile-menu">
                        <button
                            onClick={() => {
                                if (location.pathname !== "/") {
                                    handleNavigate('/', false);
                                } else {
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }}
                        >
                            {t("home")}
                        </button>
                        <button onClick={() => handleNavigate('/#about-us-section')}>{t("aboutUs")}</button>
                        <button onClick={() => handleNavigate('/#games-section')}>{t("games")}</button>
                        <button onClick={() => handleNavigate('/#contact-section')}>{t("contact")}</button>
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
                        <a href="https://x.com/mandingagames" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://www.instagram.com/mandinga.games/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.tiktok.com/@mandingagames" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                    </div>
                </aside>
            </header>
        </>
    );
};

// ======================================
// GameCard  
// ======================================
const GameCard = ({ game, t, isMobileCentered }) => {
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();
    const videoRef = useRef(null);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const shouldPlayVideo = isMobile ? isMobileCentered : isHovering;

    useEffect(() => {
        if (videoRef.current) {
            if (shouldPlayVideo) {
                videoRef.current.play().catch(e => {
                    console.warn("Reprodução do vídeo bloqueada pelo navegador:", e.message);
                });
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [shouldPlayVideo]);


    const handleCardClick = () => {
        navigate(`/game/${game.id}`);
    };

    const handleMouseEnter = () => {
        if (!isMobile) setIsHovering(true);
    }

    const handleMouseLeave = () => {
        if (!isMobile) setIsHovering(false);
    }

    const renderContent = () => {
        if (shouldPlayVideo && game.videoUrl) {
            return (
                <video
                    ref={videoRef}
                    title={`${t(game.titleKey)} Trailer`}
                    src={game.videoUrl}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="game-trailer"
                    poster={game.imageUrl}
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
            onClick={handleCardClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        > 

            <div className="game-img">
                {renderContent()}
            </div>
        </div>
    );

};

// ======================================
// SEÇÕES (Inalterado)
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


const AboutUsSection = ({ t }) => (
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
                        className="general-btn"
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

// ======================================
// GamesGridObserver (NOVO - Lógica de Intersecção)
// ======================================
const GamesGridObserver = ({ t }) => {
    const [centeredGameId, setCenteredGameId] = useState(null);
    const gameCardRefs = useRef({});

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0.1,
        };

        const callback = (entries) => {
            let foundCenterId = null;

            const mostCenteredEntry = entries
                .filter(entry => entry.isIntersecting)
                .reduce((prev, current) => {
                    const viewportCenter = window.innerHeight / 2;
                    const rect = current.target.getBoundingClientRect();
                    const elementCenter = rect.top + rect.height / 2;

                    const prevDistance = Math.abs(viewportCenter - (prev?.target.getBoundingClientRect().top + prev?.target.getBoundingClientRect().height / 2));
                    const currentDistance = Math.abs(viewportCenter - elementCenter);

                    return currentDistance < prevDistance ? current : prev;
                }, entries[0]);

            if (mostCenteredEntry && mostCenteredEntry.isIntersecting) {
                foundCenterId = parseInt(mostCenteredEntry.target.dataset.gameId);
            }

            setCenteredGameId(prevId => {
                if (prevId !== foundCenterId) {
                    return foundCenterId;
                }
                return prevId;
            });
        };

        const observer = new IntersectionObserver(callback, options);

        Object.values(gameCardRefs.current).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

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
                {GAMES.map(game => {
                    const isCentered = centeredGameId === game.id;
                    return (
                        <div
                            key={game.id}
                            ref={el => gameCardRefs.current[game.id] = el}
                            data-game-id={game.id}
                        >
                            <GameCard
                                game={game}
                                t={t}
                                isMobileCentered={isCentered}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};


// ======================================
// HOME PAGE COMPONENT
// ======================================
const HomePage = ({ parallaxOffset, t }) => (
    <>
        <HeroSection parallaxOffset={parallaxOffset} />
        <AboutUsSection t={t} />
        <GamesGridObserver t={t} />
    </>
);

// ======================================
// GAME DETAIL PAGE  
// ======================================
const GameDetailPage = ({ t }) => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const game = useMemo(() => GAMES.find(g => g.id === parseInt(gameId)), [gameId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [gameId]);

    if (!game) {
        return (
            <div className="game-not-found">
                <h1>{t("notFound")}</h1>
                <button onClick={() => navigate('/')}>{t("home")}</button>
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
    } else {
        buttonTextKey = "comingSoon";
        buttonLink = null;
    }

    const handlePlayButtonClick = () => {
        if (buttonLink) {
            window.open(buttonLink, '_blank');
        }
    };

    return (
        <main className="game-detail page-transition">
            <div className="detail-img">
                <img
                    src={game.imageMobile}
                    alt={`Tela do Jogo ${t(game.titleKey)}`}
                    onError={(e) => { e.target.src = "https://placehold.co/400x450/333/FFF?text=TELA+DO+JOGO" }}
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
                        <span className={`status-tag status-${game.availability}`}>
                            {t(statusTextKey)}
                        </span>
                    </h1>
                    <p>{t(game.descriptionKey)}</p>


                    <button
                        className={`general-btn  ${game.availability === 'soon' ? 'disabled' : ''}`}
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
 
const Footer = ({ t }) => (
    <footer className="footer" id="contact-section">
        <div className="footer-content"> 
            <div className="footer-section footer-branding">
                <Link to="/" className="logo-footer">
                    <img src={Logo} alt="Mandinga Games Logo" className="logo-img" />
                </Link>
                <p className="copyright">© {new Date().getFullYear()} MANDINGA GAMES. {t("allRightsReserved")}</p>
            </div>
 
            <div className="footer-section footer-nav">
                <h3>{t("siteMap")}</h3>
                <ul>
                    <li><Link to="/">{t("home")}</Link></li>
                    <li><a href="/#about-us-section">{t("aboutUs")}</a></li>
                    <li><a href="/#games-section">{t("games")}</a></li>
                </ul>
            </div>
 
            <div className="footer-section footer-contact">
                <h3>{t("Contact")}</h3>
                <ul>
                    <li><a href="mailto:contact@mandinga.games">contact@mandinga.games</a></li>
                    
                </ul>
            </div>

            <div className="footer-section footer-socials">
                <h3>{t("followUs")}</h3>
                <div className="social-icons">
                    <a href="https://x.com/mandingagames" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://www.instagram.com/mandinga.games/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a href="https://www.tiktok.com/@mandingagames" target="_blank" rel="noopener noreferrer"><FaTiktok /></a> 
                    
                    <a href="https://www.youtube.com/@mandingagames" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                     <a href="https://store.steampowered.com/developer/mandingagames" target="_blank" rel="noopener noreferrer"><FaSteam  /></a>
                    
                     
                </div>
            </div>
        </div>
    </footer>
);
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

    const t = (key) => translations[lang][key] || key;


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


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
        if (location.pathname.startsWith('/game/')) return true;
        return scrollY > SCROLL_THRESHOLD;
    }, [location.pathname, scrollY]);


    return (
        <div className="app no-scroll">
            <Header
                isHeaderDark={isHeaderDark}
                t={t}
                setLang={setLang}
            />

            <Routes>
                <Route
                    path="/"
                    element={<HomePage parallaxOffset={parallaxOffset} t={t} />}
                />
                <Route
                    path="/game/:gameId"
                    element={<GameDetailPage t={t} />}
                />
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