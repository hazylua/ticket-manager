import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import { isInputAlphanumeric } from '../utils/input';

export function useDebounce(timeout = 1000) {
  const [isTyping, setIsTyping] = useState(false);

  const debounceCallback = useCallback(
    debounce((callback) => {
      callback();
      setIsTyping(false);
    }, timeout),
    [],
  );

  const handleDebouncedInputChange = (event, callback) => {
    if (event.key === 'Enter') {
      debounceCallback.flush();
    }

    if (!isTyping && isInputAlphanumeric(event.keyCode)) {
      setIsTyping(true);
    }
    debounceCallback(callback);
  };

  return {
    isTyping,
    setIsTyping,
    debounceAction: debounceCallback,
    handleInputChange: handleDebouncedInputChange,
  };
}
