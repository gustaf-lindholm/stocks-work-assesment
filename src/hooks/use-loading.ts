import * as React from 'react';

export const useLoading = (defaultValue: boolean = false) => {
  const [isLoading, setIsLoading] = React.useState(defaultValue);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return [isLoading, startLoading, stopLoading] as const;
};
