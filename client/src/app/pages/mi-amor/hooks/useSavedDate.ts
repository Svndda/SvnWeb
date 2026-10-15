import { useCallback, useMemo, useState } from 'react';
import { STORAGE_KEY } from '../constants';
import { readStorage, removeStorage, writeStorage } from '../utils/storage';

export function useSavedDate() {
  const [savedValue, setSavedValue] = useState(() => readStorage(STORAGE_KEY));
  const [dateValue, setDateValue] = useState(savedValue);

  const date = useMemo(() => {
    if (!savedValue) return null;
    const parsed = new Date(savedValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }, [savedValue]);

  /** Guarda la fecha elegida. Devuelve false si está vacía o ya pasó. */
  const save = useCallback((): boolean => {
    if (!dateValue || new Date(dateValue).getTime() < Date.now()) return false;
    writeStorage(STORAGE_KEY, dateValue);
    setSavedValue(dateValue);
    return true;
  }, [dateValue]);

  const clear = useCallback(() => {
    removeStorage(STORAGE_KEY);
    setSavedValue('');
    setDateValue('');
  }, []);

  return { dateValue, setDateValue, date, save, clear };
}
