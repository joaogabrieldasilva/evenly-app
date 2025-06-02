import { useState } from "react";

type Params = {
  refresh: (() => void) | (() => Promise<void>);
};

export function useListRefresh({ refresh }: Params) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function handleRefresh() {
    try {
      setIsRefreshing(true);
      await refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  }

  return [isRefreshing, handleRefresh] as const;
}
