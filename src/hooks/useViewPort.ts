import { useEffect, useState } from 'react';

import debounce from 'helpers/debounce';

const useViewPort = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const debounceWindowResizing = debounce(() => setWidth(window.innerWidth), 400);

  useEffect(() => {
    window.addEventListener('resize', debounceWindowResizing);
    return () => window.removeEventListener('resize', debounceWindowResizing);
  }, [debounceWindowResizing]);

  return { width };
};

export default useViewPort;
