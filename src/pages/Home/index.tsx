import useRequest from '@/hooks/useRequest.ts';
import { fetchBanners } from '@/services/banner.ts';
import { fetchProductCategories } from '@/services/product.ts';
import HomeBanner from './Banner';
import HomeBrick from './Brick';
import HomeHero from './Hero';
import HomeHeroSub from './HeroSub';
import HomeVideo from './Video';

export default function HomePage() {
  const { data: banners } = useRequest(fetchBanners, {
    defaultParams: ['home_banner'],
    initialData: []
  });
  const { data: categories } = useRequest(fetchProductCategories, {
    defaultParams: [undefined, 8, true],
    initialData: [],
    convert(res) {
      return (
        res.data?.filter((item) => {
          return item.children.flatMap((item) => item.products).length;
        }) || []
      );
    }
  });

  return (
    <>
      <HomeHero />
      <HomeHeroSub />

      <div style={{ backgroundColor: 'var(--color-background)' }}>
        {banners.length > 0 && <HomeBanner {...banners[0]} />}
        {categories.map((item) => (
          <HomeBrick key={item.id} {...item} />
        ))}
        {banners.length > 1 && <HomeBanner {...banners[banners.length - 1]} />}
        <HomeVideo />
      </div>
    </>
  );
}
