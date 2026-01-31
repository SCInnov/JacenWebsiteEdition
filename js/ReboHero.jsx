import React from 'react';

const ReboHero = () => {
  // Color scheme
  const colors = {
    background: '#fffcf7',
    primary: '#006d8f',
    primaryLight: '#0088cc',
    accent: '#afc8a0',
    accentDark: '#8fb87a',
    textOnDark: '#fffcf7',
    dark: '#1a1a1a',
  };

  return (
    <section
      style={{
        background: colors.background,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4rem',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left: Product Image */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Decorative background shape */}
          <div
            style={{
              position: 'absolute',
              width: '90%',
              height: '90%',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              opacity: 0.1,
              transform: 'rotate(-5deg)',
            }}
          />

          {/* Accent border element */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '120px',
              height: '120px',
              border: `3px solid ${colors.accent}`,
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />

          {/* Product image container */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              background: `linear-gradient(180deg, ${colors.dark} 0%, #2a2a2a 100%)`,
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: `0 25px 50px -12px rgba(0, 109, 143, 0.25),
                          0 0 0 1px ${colors.accent}40`,
              maxWidth: '450px',
            }}
          >
            {/* SVG representation of the Rebo orthosis */}
            <svg
              viewBox="0 0 320 380"
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              {/* Body/torso silhouette */}
              <defs>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3a3a3a" />
                  <stop offset="100%" stopColor="#1a1a1a" />
                </linearGradient>
                <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8e8e8" />
                  <stop offset="100%" stopColor="#b0b0b0" />
                </linearGradient>
                <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.primaryLight} />
                  <stop offset="100%" stopColor={colors.primary} />
                </linearGradient>
                <pattern id="meshPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                  <path d="M0 0L8 0L8 8L0 8Z" fill="none" stroke="#555" strokeWidth="0.5"/>
                </pattern>
              </defs>

              {/* Torso base */}
              <path
                d="M100 50 Q160 30 220 50 L240 150 Q245 200 230 280 L200 350 Q160 370 120 350 L90 280 Q75 200 80 150 Z"
                fill="url(#bodyGradient)"
              />

              {/* Chest detail */}
              <path
                d="M120 80 Q160 70 200 80 L195 180 Q160 200 125 180 Z"
                fill="#2a2a2a"
                opacity="0.7"
              />

              {/* Shoulder mesh area */}
              <ellipse cx="85" cy="70" rx="35" ry="25" fill="url(#meshPattern)" opacity="0.6"/>

              {/* Upper arm orthosis - shoulder piece */}
              <path
                d="M50 60 Q30 80 25 120 L35 130 Q55 100 70 80 Z"
                fill="url(#deviceGradient)"
                stroke="#999"
                strokeWidth="1"
              />

              {/* Shoulder connector with accent color */}
              <rect x="55" y="70" width="35" height="12" rx="3" fill="url(#accentGradient)" opacity="0.9"/>

              {/* Upper arm segment */}
              <path
                d="M25 120 Q15 160 20 200 L40 205 Q45 165 35 130 Z"
                fill="url(#deviceGradient)"
                stroke="#999"
                strokeWidth="1"
              />

              {/* Joint mechanism */}
              <circle cx="30" cy="210" r="18" fill="#ddd" stroke="#999" strokeWidth="2"/>
              <circle cx="30" cy="210" r="10" fill="url(#accentGradient)"/>
              <circle cx="30" cy="210" r="4" fill="#fff"/>

              {/* Elbow band */}
              <rect x="15" y="200" width="30" height="20" rx="5" fill="#333" opacity="0.8"/>

              {/* Forearm segment */}
              <path
                d="M20 230 Q10 270 15 310 L35 315 Q40 275 30 235 Z"
                fill="url(#deviceGradient)"
                stroke="#999"
                strokeWidth="1"
              />

              {/* Wrist mechanism */}
              <rect x="10" y="310" width="30" height="25" rx="8" fill="url(#deviceGradient)" stroke="#999" strokeWidth="1"/>
              <rect x="15" y="315" width="20" height="5" rx="2" fill="url(#accentGradient)"/>

              {/* Hand/glove */}
              <path
                d="M12 335 Q5 350 10 370 Q20 380 30 375 Q40 365 38 350 Q35 340 30 335 Z"
                fill="#888"
                stroke="#666"
                strokeWidth="1"
              />

              {/* Finger segments */}
              <path d="M15 370 Q12 385 18 390 Q22 388 20 375" fill="#999" stroke="#777" strokeWidth="0.5"/>
              <path d="M22 372 Q20 390 26 395 Q30 392 28 378" fill="#999" stroke="#777" strokeWidth="0.5"/>
              <path d="M29 370 Q28 388 34 392 Q38 388 35 375" fill="#999" stroke="#777" strokeWidth="0.5"/>

              {/* Harness straps */}
              <path
                d="M70 80 Q90 90 100 120"
                fill="none"
                stroke="#444"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M85 100 Q120 130 130 180"
                fill="none"
                stroke="#444"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Buckle details */}
              <rect x="95" y="115" width="12" height="8" rx="1" fill={colors.accent}/>
              <rect x="125" y="175" width="10" height="6" rx="1" fill={colors.accent}/>

              {/* Power indicator */}
              <circle cx="40" cy="160" r="4" fill={colors.accent}>
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          {/* Bottom accent element */}
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '10%',
              width: '80px',
              height: '80px',
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
              borderRadius: '50%',
              opacity: 0.3,
            }}
          />
        </div>

        {/* Right: Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: `linear-gradient(135deg, ${colors.accent}20 0%, ${colors.accentDark}20 100%)`,
              border: `1px solid ${colors.accent}`,
              borderRadius: '999px',
              padding: '0.5rem 1rem',
              width: 'fit-content',
              fontSize: '0.875rem',
              color: colors.primary,
              fontWeight: '500',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                background: colors.accentDark,
                borderRadius: '50%',
              }}
            />
            Powered Rehabilitation Technology
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              color: colors.dark,
              lineHeight: '1.1',
              margin: 0,
            }}
          >
            Restore Movement.{' '}
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Regain Independence.
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '1.125rem',
              color: '#555',
              lineHeight: '1.7',
              maxWidth: '500px',
              margin: 0,
            }}
          >
            The Rebo is a powered upper limb orthosis designed to support arm movement
            for individuals with muscle weakness or limited mobility. Advanced motor
            assistance combined with intuitive control helps users perform daily
            activities with greater ease and confidence.
          </p>

          {/* Feature highlights */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '0.5rem',
            }}
          >
            {[
              { label: 'Lightweight', value: 'Design' },
              { label: 'Adaptive', value: 'Control' },
              { label: 'All-Day', value: 'Comfort' },
            ].map((feature, index) => (
              <div key={index} style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: colors.primary,
                  }}
                >
                  {feature.label}
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: '#777',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {feature.value}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            <button
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                color: colors.textOnDark,
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: `0 4px 15px ${colors.primary}40`,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${colors.primary}50`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px ${colors.primary}40`;
              }}
            >
              Request a Demo
            </button>
            <button
              style={{
                background: 'transparent',
                color: colors.primary,
                border: `2px solid ${colors.accent}`,
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = `${colors.accent}20`;
                e.currentTarget.style.borderColor = colors.accentDark;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = colors.accent;
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Responsive styles would normally be in CSS - adding basic mobile handling */}
      <style>{`
        @media (max-width: 968px) {
          section > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          section > div > div:last-child {
            align-items: center;
          }
          section > div > div:last-child > div:nth-child(4) {
            justify-content: center;
          }
          section > div > div:last-child > div:last-child {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default ReboHero;
