import { useCallback, useState } from 'react';

type SetState<T> = Record<string, T>;
export type PatchStateAction<T> = SetState<T> | ((value: SetState<T>) => SetState<T>);

export default function useSetState<T>(
  initialState: SetState<T> | (() => SetState<T>) = {}
) {
  const [value, setValue] = useState(initialState);

  const mergeValues = useCallback(
    (patch: PatchStateAction<T>, override = false) => {
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
