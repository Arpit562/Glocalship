import React from 'react';

const features = [
  {
    title: 'Free Shipping Everywhere in India',
    desc: 'Enjoy free delivery to all destinations across India. We make sure your package reaches every corner of the country, fast and safe.',
    img: '/img/servise/delivery-2.jpg',
    alt: 'Free Shipping',
    badge: 'Shipping',
    color: '#38bdf8',
  },
  {
    title: 'Exclusive Offers and Deals',
    desc: 'Unlock discounts up to 70% on 30,000+ products. Shop smarter with our handpicked deals and limited-time offers.',
    img: '/img/online-shop.png',
    alt: 'Exclusive Offers',
    badge: 'Deals',
    color: '#fbbf24',
  },
  {
    title: 'The Best Price in the Market',
    desc: 'Get unmatched savings and transparent pricing on every order. No hidden fees, just the best value for your money.',
    img: '/img/servise/delivery-4.jpg',
    alt: 'Best Price',
    badge: 'Best Price',
    color: '#10b981',
  },
];

const responsiveStyles = `
@media (max-width: 900px) {
  .whyshop-feature-row {
    flex-direction: column !important;
    min-height: 0 !important;
    margin-bottom: 2.5rem !important;
  }
  .whyshop-feature-img {
    border-radius: 2rem 2rem 0 0 !important;
    max-height: 220px !important;
    height: 180px !important;
  }
  .whyshop-feature-text {
    align-items: flex-start !important;
    padding: 1.5rem 1rem !important;
    text-align: left !important;
  }
  .whyshop-card-title {
    font-size: 1.15rem !important;
  }
  .whyshop-bg {
    padding: 2.5rem 0.5rem 3.5rem 0.5rem !important;
  }
}
@media (max-width: 600px) {
  .whyshop-title {
    font-size: 1.5rem !important;
    margin-bottom: 0.7rem !important;
  }
  .whyshop-bg {
    padding: 1.5rem 0.2rem 2.5rem 0.2rem !important;
  }
  .whyshop-feature-text {
    padding: 1.1rem 0.5rem !important;
  }
  .whyshop-card-title {
    font-size: 1rem !important;
  }
  .whyshop-feature-img {
    display: none;
  }
}
`;

const WhyShopWithUs = () => {
  return (
    <section
      className="whyshop-bg section-title"
      style={{
        position: 'relative',
        background: 'linear-gradient(120deg, #1e293b 0%, #334155 100%)',
        padding: '0',
        overflow: 'hidden',
      }}
    >
      <style>{responsiveStyles}</style>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '5rem 1rem 6rem 1rem' }}>
        <h2 className="whyshop-title" style={{ color: '#38bdf8', fontSize: '2.6rem', marginBottom: '1rem' }}>
          Why Shop with Us?
        </h2>
        <p style={{ color: '#cbd5e1', textAlign: 'center', fontSize: '1.2rem', marginBottom: '3.5rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Discover the benefits of shopping with us—unbeatable prices, exclusive deals, and free shipping to every corner of India.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="whyshop-feature-row"
              style={{
                display: 'flex',
                flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                background: 'rgba(30,41,59,0.85)',
                borderRadius: '2rem',
                boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                overflow: 'hidden',
                minHeight: 320,
                position: 'relative',
              }}
            >
              {/* Image Side */}
              <div style={{ flex: '1 1 0', minWidth: 0, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111827' }}>
                <img
                  src={feature.img}
                  alt={feature.alt}
                  className="whyshop-feature-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    maxHeight: 320,
                    borderRadius: idx % 2 === 0 ? '2rem 0 0 2rem' : '0 2rem 2rem 0',
                    boxShadow: '0 2px 16px rgba(56,189,248,0.10)'
                  }}
                />
              </div>
              {/* Text Side */}
              <div className="whyshop-feature-text" style={{ flex: '1 1 0', minWidth: 0, padding: '2.5rem 2rem', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: idx % 2 === 0 ? 'flex-start' : 'flex-end', justifyContent: 'center' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: feature.color,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    borderRadius: '999px',
                    padding: '0.35rem 1.1rem',
                    marginBottom: '1.1rem',
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  }}
                >
                  {feature.badge}
                </span>
                <h3
                  className="whyshop-card-title"
                  style={{ fontSize: '1.55rem', fontWeight: 700, color: feature.color, marginBottom: 14, textAlign: idx % 2 === 0 ? 'left' : 'right' }}
                >
                  {feature.title}
                </h3>
                <p className="whyshop-card-desc" style={{ color: '#cbd5e1', fontSize: '1.13rem', textAlign: idx % 2 === 0 ? 'left' : 'right', lineHeight: 1.7 }}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative background pattern */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        left: '-120px',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle at 60% 40%, #38bdf8 0%, transparent 70%)',
        opacity: 0.18,
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-120px',
        right: '-120px',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle at 40% 60%, #fbbf24 0%, transparent 70%)',
        opacity: 0.13,
        zIndex: 0,
        pointerEvents: 'none',
      }} />
    </section>
  );
};

export default WhyShopWithUs;