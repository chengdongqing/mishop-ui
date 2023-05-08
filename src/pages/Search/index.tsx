import Breadcrumb from '@/components/Breadcrumb';
import useSetState from '@/hooks/useSetState.ts';
import { FilterBarItems } from './const';
import FilterBar from './FilterBar';
import styles from './index.module.less';
import SortBar from './SortBar';

export default function SearchPage() {
  const [params, setParams] = useSetState();

  return (
    <>
      <Breadcrumb value={'全部结果'} split={'>'} />
      <div className={styles.filters}>
        {FilterBarItems.map((item, index) => (
          <FilterBar
            key={item.value}
            label={item.label}
            options={item.children}
            value={params[item.value] as BasicValue}
            borderless={index === FilterBarItems.length - 1}
            onChange={(value) => {
              setParams({
                [item.value]: value
              });
            }}
          />
        ))}
      </div>
      <div
        style={{
          backgroundColor: 'var(--color-background)',
          padding: '2rem 10rem'
        }}
      >
        <div className={styles.container}>
          <SortBar params={params} onChange={setParams} />
        </div>
      </div>
    </>
  );
}
