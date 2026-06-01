export default function Footer() {
  return (
    <footer
      className="content-section"
      style={{
        background: '#0a0a0a',
        padding: '80px 5vw 40px',
        borderTop: '1px solid rgba(245, 245, 240, 0.06)',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto"
        style={{ maxWidth: 1280, gap: 48 }}
      >
        {/* Column 1 — Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <span
            className="font-heading block"
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#f5f5f0',
            }}
          >
            APEX MOTORS
          </span>
          <p
            className="font-body"
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: 'rgba(245, 245, 240, 0.4)',
              marginTop: 12,
            }}
          >
            Premium automotive excellence since 2019.
          </p>
          <p
            className="font-body"
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: 'rgba(245, 245, 240, 0.3)',
              marginTop: 20,
              lineHeight: 1.6,
            }}
          >
            847 Marina Boulevard, Suite 200
            <br />
            San Francisco, CA 94123
          </p>
        </div>

        {/* Column 2 — Inventory */}
        <div>
          <span
            className="font-heading block"
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(245, 245, 240, 0.5)',
              marginBottom: 20,
            }}
          >
            INVENTORY
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['All Vehicles', 'New Arrivals', 'Under $100K', 'Exotics'].map((item) => (
              <li key={item} style={{ marginBottom: 4 }}>
                <a
                  href="#"
                  className="font-body"
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'rgba(245, 245, 240, 0.4)',
                    textDecoration: 'none',
                    lineHeight: 2.2,
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f5f5f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245, 245, 240, 0.4)';
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        <div>
          <span
            className="font-heading block"
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(245, 245, 240, 0.5)',
              marginBottom: 20,
            }}
          >
            SERVICES
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Financing', 'Trade-In', 'Service Center', 'Protection Plans'].map((item) => (
              <li key={item} style={{ marginBottom: 4 }}>
                <a
                  href="#"
                  className="font-body"
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'rgba(245, 245, 240, 0.4)',
                    textDecoration: 'none',
                    lineHeight: 2.2,
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f5f5f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245, 245, 240, 0.4)';
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <span
            className="font-heading block"
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(245, 245, 240, 0.5)',
              marginBottom: 20,
            }}
          >
            CONTACT
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li
              className="font-body"
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: 'rgba(245, 245, 240, 0.4)',
                lineHeight: 2.2,
              }}
            >
              (415) 555-0187
            </li>
            <li
              className="font-body"
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: 'rgba(245, 245, 240, 0.4)',
                lineHeight: 2.2,
              }}
            >
              info@apexmotors.com
            </li>
            <li className="flex items-center gap-3" style={{ marginTop: 8 }}>
              {/* Instagram */}
              <a
                href="#"
                style={{ color: 'rgba(245, 245, 240, 0.3)', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f5f5f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(245, 245, 240, 0.3)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                style={{ color: 'rgba(245, 245, 240, 0.3)', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f5f5f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(245, 245, 240, 0.3)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between mx-auto"
        style={{
          maxWidth: 1280,
          marginTop: 60,
          paddingTop: 24,
          borderTop: '1px solid rgba(245, 245, 240, 0.06)',
        }}
      >
        <span
          className="font-body"
          style={{ fontSize: 12, fontWeight: 400, color: 'rgba(245, 245, 240, 0.25)' }}
        >
          2024 Apex Motors. All rights reserved.
        </span>
        <div className="flex items-center gap-6" style={{ marginTop: '8px sm:0' }}>
          <a
            href="#"
            className="font-body"
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: 'rgba(245, 245, 240, 0.25)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(245, 245, 240, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245, 245, 240, 0.25)';
            }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-body"
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: 'rgba(245, 245, 240, 0.25)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(245, 245, 240, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245, 245, 240, 0.25)';
            }}
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
