import Breadcrumb from '@/components/Breadcrumb';
import useSetState from '@/hooks/useSetState.ts';
import { useState } from 'react';
import { Brands, Categories } from './const.ts';
import FilterBar from './FilterBar';
import styles from './index.module.less';
import SortBar from './SortBar';

export default function SearchPage() {
  const [params, setParams] = useSetState();
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [checks, setChecks] = useState<string[]>([]);

  return (
    <>
      <Breadcrumb value={'全部结果'} split={'>'} />
      <div className={styles.filters}>
        <FilterBar
          label={'品牌'}
          options={Brands}
          value={params.brand}
          onChange={(value) => {
            setParams(() => ({
              brand: value
            }));
          }}
        />
        <FilterBar
          label={'类别'}
          options={Categories}
          borderless
          value={params.category}
          onChange={(value) => {
            setParams({
              category: value
            });
          }}
        />
      </div>
      <div
        style={{
          backgroundColor: 'var(--color-background)',
          padding: '2rem 10rem'
        }}
      >
        <div className={styles.container}>
          <SortBar
            sortBy={sortBy}
            checks={checks}
            onSortChange={setSortBy}
            onChecksChange={setChecks}
          />
        </div>
      </div>
    </>
  );
}
