import useRequest from '@/hooks/useRequest.ts';
import { BannerType } from '@/pages/Home/enums.ts';
import { fetchBanners } from '@/services/banner.ts';
import { fetchProductCategories } from '@/services/product.ts';
import HomeBanner from './Banner';
import HomeBrick from './Brick';
import HomeHero from './Hero';
import HomeHeroSub from './HeroSub';
import HomeVideo from './Video';

export default function HomePage() {
  const { data: banners } = useRequest(() => fetchBanners(BannerType[BannerType.HOME_BANNER]), {
    initialData: [] as Banner[]
  });
  const { data: categories } = useRequest(
    () => fetchProductCategories(10, 8, true),
    {
      convert(res) {
        return res
          ?.filter((item) => {
            return (
              item.banners.length &&
              item.children.flatMap((item) => item.items).length
            );
          })
          .map((item) => ({
            ...item,
            children: item.children.filter((item) => item.items?.length)
          }));
      }
    }
  );

  return (
    <>
      <HomeHero />
      <HomeHeroSub />

      <div style={{ backgroundColor: 'var(--color-background)' }}>
        {banners.length > 0 && <HomeBanner {...banners[0]} />}
        {categories?.map((item) => (
          <HomeBrick key={item.id} {...item} />
        ))}
        {banners.length > 1 && <HomeBanner {...banners[banners.length - 1]} />}
        <HomeVideo />
      </div>
    </>
  );
}
