import { useCallback, useState } from 'react';

type SetState = Record<string, unknown>;
type PatchState = SetState | ((value: SetState) => SetState);

export default function useSetState(defaultValue: SetState = {}) {
  const [value, setValue] = useState(defaultValue);

  const mergeValues = useCallback((patch: PatchState, override = false) => {
    setValue((prevValue) => {
      const newValue = typeof patch === 'function' ? patch(prevValue) : patch;
      return override
        ? newValue
        : {
            ...prevValue,
            ...newValue
          };
    });
  }, []);

  return [value, mergeValues] as const;
}
