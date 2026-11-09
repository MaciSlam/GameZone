import { useState, useEffect } from "react";
import {
  Gamepad2,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Star,
  Heart,
  Users,
  Trophy,
  Monitor,
} from "lucide-react";
import "./App.css";

const games = [
  {
    id: 1,
    title: "Minecraft",
    genre: "Adventure",
    rating: "9.5",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/library_600x900.jpg",
    description:
      "Explore endless worlds, build incredible creations, and survive your own adventures.",
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    genre: "Action",
    rating: "9.0",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg",
    description:
      "Explore Night City, a futuristic metropolis filled with stories and opportunities.",
  },
  {
    id: 3,
    title: "Elden Ring",
    genre: "Adventure",
    rating: "9.7",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg",
    description:
      "Discover a mysterious world full of challenging enemies and unforgettable adventures.",
  },
  {
    id: 4,
    title: "Counter-Strike 2",
    genre: "Shooter",
    rating: "8.8",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg",
    description:
      "Compete in tactical multiplayer matches where teamwork makes the difference.",
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    genre: "Adventure",
    rating: "9.8",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg",
    description: "Experience an epic story set in the American Wild West.",
  },
  {
    id: 6,
    title: "Grand Theft Auto V",
    genre: "Action",
    rating: "9.2",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg",
    description: "Explore Los Santos in an open-world action adventure.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [deals, setDeals] = useState([]);
  const [stores, setStores] = useState([]);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [dealsError, setDealsError] = useState("");

  useEffect(() => {
    fetch(
      "https://www.cheapshark.com/api/1.0/deals?pageSize=6&sortBy=DealRating",
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch game deals");
        return response.json();
      })
      .then((data) => {
        setDeals(data);
        setLoadingDeals(false);
      })
      .catch((error) => {
        setDealsError(error.message);
        setLoadingDeals(false);
      });
  }, []);
  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/stores")
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => console.error(error));
  }, []);
  const categories = ["All", "Action", "Adventure", "Shooter"];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All" || game.genre === category;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const scrollToGames = () => {
    document.getElementById("games")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app min-h-screen">
      <header className="navbar">
        <a href="#home" className="logo">
          <span className="logo-icon">
            <Gamepad2 size={25} />
          </span>
          Game<span>Zone</span>
        </a>

        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#games" onClick={scrollToGames}>
            Games
          </a>

          <div className="dropdown">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              Explore <ChevronDown size={15} />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a
                  href="#games"
                  onClick={() => {
                    setCategory("Action");
                    setDropdownOpen(false);
                  }}
                >
                  Action Games
                </a>
                <a
                  href="#games"
                  onClick={() => {
                    setCategory("Adventure");
                    setDropdownOpen(false);
                  }}
                >
                  Adventure Games
                </a>
                <a href="#community" onClick={() => setDropdownOpen(false)}>
                  Community
                </a>
              </div>
            )}
          </div>

          <a href="#community" onClick={() => setMenuOpen(false)}>
            Community
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </nav>

        <div className="nav-actions">
          <button className="login-btn" onClick={() => setShowLogin(true)}>
            Log in
          </button>
          <button
            className="register-btn"
            onClick={() => setShowRegister(true)}
          >
            Sign up
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content flex flex-col">
            <div className="eyebrow">
              <span></span> YOUR NEXT ADVENTURE STARTS HERE
            </div>
            <h1>
              Discover your next <span>favorite game.</span>
            </h1>
            <p>
              Explore amazing games, discover new worlds, and connect with a
              community of players who share your passion.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={scrollToGames}>
                Explore games <ArrowRight size={18} />
              </button>
              <a href="#about" className="secondary-btn">
                Learn more
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <small>Games to explore</small>
              </div>
              <div>
                <strong>10K+</strong>
                <small>Community members</small>
              </div>
              <div>
                <strong>24/7</strong>
                <small>Gaming inspiration</small>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000"
                alt="Gaming setup with colorful lights"
              />
              <div className="image-overlay"></div>
              <div className="floating-card">
                <div className="floating-icon">
                  <Trophy size={21} />
                </div>
                <div>
                  <strong>Level up your experience</strong>
                  <small>Find your next adventure</small>
                </div>
              </div>
            </div>
            <div className="hero-decoration"></div>
          </div>
        </section>

        <section className="features" id="community">
          <div className="feature">
            <div className="feature-icon">
              <Monitor />
            </div>
            <div>
              <h3>Discover Games</h3>
              <p>Explore games across different genres.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <Users />
            </div>
            <div>
              <h3>Join the Community</h3>
              <p>Connect with fellow gaming enthusiasts.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <Heart />
            </div>
            <div>
              <h3>Save Favorites</h3>
              <p>Keep track of games you love.</p>
            </div>
          </div>
        </section>

        <section className="games-section" id="games">
          <div className="section-heading">
            <div>
              <div className="eyebrow">FIND YOUR NEXT ADVENTURE</div>
              <h2>
                Explore <span>popular games</span>
              </h2>
              <p>Discover some of the most exciting games out there.</p>
            </div>
            <span className="game-count">
              {filteredGames.length} games found
            </span>
          </div>

          <div className="game-controls">
            <div className="search-box">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search for a game..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="category-filters">
              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item ? "filter-btn selected" : "filter-btn"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="games-grid grid">
            {filteredGames.map((game) => (
              <article className="game-card" key={game.id}>
                <div
                  className="game-image"
                  onClick={() => setSelectedGame(game)}
                >
                  <img src={game.image} alt={game.title} loading="lazy" />
                  <span className="genre-tag">{game.genre}</span>
                  <button
                    className={
                      favorites.includes(game.id)
                        ? "favorite-btn favorited"
                        : "favorite-btn"
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(game.id);
                    }}
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      size={19}
                      fill={
                        favorites.includes(game.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>
                <div className="game-info">
                  <div className="game-title-row">
                    <h3>{game.title}</h3>
                    <span className="rating">
                      <Star size={14} fill="currentColor" /> {game.rating}
                    </span>
                  </div>
                  <p>{game.description}</p>
                  <button
                    className="details-btn"
                    onClick={() => setSelectedGame(game)}
                  >
                    View details <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="no-results">
              <Search size={35} />
              <h3>No games found</h3>
              <p>Try another search or category.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
        <section className="deals-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">LIVE GAME DATA</div>
              <h2>
                Today's <span>game deals</span>
              </h2>
              <p>Discover games currently available at discounted prices.</p>
            </div>
          </div>

          {loadingDeals && <p>Loading game deals...</p>}
          {dealsError && <p>{dealsError}</p>}

          <div className="games-grid">
            {deals.map((deal) => (
              <article className="game-card" key={deal.dealID}>
                <div className="game-image">
                  <img src={deal.thumb} alt={deal.title} />
                </div>
                <div className="game-info">
                  <h3>{deal.title}</h3>
                  <p>Normal price: ${deal.normalPrice}</p>
                  <p>
                    Store:{" "}
                    {stores.find((store) => store.storeID === deal.storeID)
                      ?.storeName || "Unknown store"}
                  </p>
                  <h3>${deal.salePrice}</h3>
                  <a
                    href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View deal →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="community-banner" id="about">
          <div>
            <div className="eyebrow">BUILT FOR GAMERS</div>
            <h2>Every great adventure starts with a game.</h2>
            <p>Discover new experiences and find something worth playing.</p>
          </div>
          <Gamepad2 size={100} className="banner-icon" />
          <button className="primary-btn" onClick={scrollToGames}>
            Explore the collection <ArrowRight size={17} />
          </button>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          <span className="logo-icon">
            <Gamepad2 size={23} />
          </span>
          Game<span>Zone</span>
        </a>
        <p>Discover. Play. Connect.</p>
        <div className="footer-bottom">
          <span>© 2026 GameZone. Student project.</span>
          <span>
            All game names and trademarks belong to their respective owners.
            GameZone is an independent, unofficial project.
          </span>
        </div>
      </footer>

      {selectedGame && (
        <div className="modal-backdrop" onClick={() => setSelectedGame(null)}>
          <div
            className="modal game-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedGame(null)}
            >
              <X />
            </button>
            <img src={selectedGame.image} alt={selectedGame.title} />
            <div className="modal-content">
              <span className="genre-tag">{selectedGame.genre}</span>
              <h2>{selectedGame.title}</h2>
              <div className="rating">
                <Star size={15} fill="currentColor" /> {selectedGame.rating}
              </div>
              <p>{selectedGame.description}</p>
              <button
                className="primary-btn"
                onClick={() => toggleFavorite(selectedGame.id)}
              >
                <Heart size={17} />{" "}
                {favorites.includes(selectedGame.id)
                  ? "Remove favorite"
                  : "Add to favorites"}
              </button>
            </div>
          </div>
        </div>
      )}

      {(showLogin || showRegister) && (
        <div
          className="modal-backdrop"
          onClick={() => {
            setShowLogin(false);
            setShowRegister(false);
          }}
        >
          <div
            className="modal auth-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => {
                setShowLogin(false);
                setShowRegister(false);
              }}
            >
              <X />
            </button>
            <div className="auth-logo">
              <Gamepad2 size={30} />
            </div>
            <h2>{showLogin ? "Welcome back!" : "Join GameZone"}</h2>
            <p>
              {showLogin
                ? "Log in to your account."
                : "Create an account to get started."}
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                alert(
                  "Demo form submitted! Authentication is not connected yet.",
                );
                setShowLogin(false);
                setShowRegister(false);
              }}
            >
              {!showLogin && (
                <input required placeholder="Username" minLength="3" />
              )}
              <input required type="email" placeholder="Email address" />
              <input
                required
                type="password"
                placeholder="Password"
                minLength="6"
              />
              <button className="primary-btn auth-submit" type="submit">
                {showLogin ? "Log in" : "Create account"}
              </button>
            </form>
            <button
              className="switch-auth"
              onClick={() => {
                setShowLogin(!showLogin);
                setShowRegister(!showRegister);
              }}
            >
              {showLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
