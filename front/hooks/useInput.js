import { useCallback, useState } from 'react';

export default (initialValue = null) => {
  const [val, setVal] = useState(initialValue);
  const handler = useCallback((e) => {
    setVal(e.target.value);
  }, []);
  return [val, handler, setVal];
};
