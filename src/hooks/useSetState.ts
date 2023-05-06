import { useCallback, useState } from 'react';

type ValueType = { [key: string]: unknown };

export default function useSetState(defaultValue: ValueType = {}) {
  const [value, setValue] = useState(defaultValue);

  const mergeValues = useCallback(
    (
      patch: ValueType | ((value: ValueType) => ValueType),
      override = false
    ) => {
      setValue((prevValue) => {
        const newValue = typeof patch === 'function' ? patch(prevValue) : patch;
        return override
          ? newValue
          : {
              ...prevValue,
              ...newValue
            };
      });
    },
    []
  );

  return [value, mergeValues] as const;
}
