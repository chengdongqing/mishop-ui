import HomeBanner from './Banner';
import HomeBrick from './Brick';
import { Bricks } from './const.ts';
import HomeHero from './Hero';
import HomeHeroSub from './HeroSub';
import HomeVideo from './Video';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeHeroSub />

      <div style={{ backgroundColor: 'var(--color-background)' }}>
        <HomeBanner
          src={
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/864aa0927000c3d717eca08955589d62.jpg?thumb=1&f=webp&q=90'
          }
          href={'https://www.mi.com/shop/buy?product_id=18363'}
        />
        {Bricks.map((item) => (
          <HomeBrick key={item.title} {...item} />
        ))}
        <HomeBanner
          src={
            'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/88e35cffc82cd98cd53172460067af17.jpg?thumb=1&f=webp&q=90'
          }
          href={'https://www.mi.com/shop/buy?product_id=9836'}
        />
        <HomeVideo />
      </div>
    </>
  );
}
