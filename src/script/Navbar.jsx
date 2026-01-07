import React, { useMemo, useState, useEffect, useRef } from "react";

export default function Navbar({ user, title, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Derive a friendly display name from the raw userId.
  const displayName = useMemo(() => {
    const raw = user?.userId ?? "";
    const base = raw.includes("@") ? raw.split("@")[0] : raw;
    const name =
      base
        .split(/[.\-_]/)
        .filter(Boolean)
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ") || raw;
    return name || "User";
  }, [user]);

  const handleOutsideClick = (event) => {
    if (!menuRef.current) return;
    if (!menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Collapse the menu when users click elsewhere on the page.
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  });

  return (
    <nav className="navbar navbar-dark bg-primary shadow-sm fixed-top">
      <div className="container-fluid">
        <span className="navbar-brand fw-semibold">{title}</span>

        <div className="profile-menu-wrapper" ref={menuRef}>
          <button
            className="btn profile-trigger text-white fw-semibold"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <span className="profile-trigger-text">{displayName}</span>
            <span className={`chevron ${menuOpen ? "open" : ""}`} />
          </button>

          {menuOpen && (
            <div className="profile-menu shadow-lg rounded-4">
              <header className="profile-menu__header">
                <div>
                  <div className="profile-menu__label">Manage account</div>
                </div>
              </header>

              <section className="profile-card">
                <div className="profile-avatar">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                  <div className="profile-info__name">{displayName}</div>
                  <div className="profile-info__email">{user?.userId}@example.org</div>
                  <div className="profile-info__status">
                    <span className="status-indicator" />
                    {user?.role} role active
                  </div>
                </div>
              </section>

              <div className="profile-menu__actions">
                <button
                  type="button"
                  className="text-start w-100 profile-action"
                  onClick={onLogout}
                >
                  <span className="logout-icon" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}