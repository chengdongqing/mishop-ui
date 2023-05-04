import HomeHero from './Hero';
import HomeHeroSub from './HeroSub';
import HomeBanner from './Banner';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeHeroSub />

      <div style={{ backgroundColor: 'var(--color-background)' }}>
        <HomeBanner
          src={
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/864aa0927000c3d717eca08955589d62.jpg?thumb=1&w=1226&h=120&f=webp&q=90'
          }
          href={'https://www.mi.com/shop/buy?product_id=18363'}
        />
        <HomeBanner
          src={
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/88e35cffc82cd98cd53172460067af17.jpg?thumb=1&w=1226&h=120&f=webp&q=90'
          }
          href={'https://www.mi.com/shop/buy?product_id=9836'}
        />
      </div>
    </>
  );
}
