export const groupKeys = {
  all: ["groups"] as const,
  details: (groupId: number) => [...groupKeys.all, groupId, "detail"] as const,
  balance: (groupId: number) => [...groupKeys.all, groupId, "balance"] as const,
  transactions: (groupId: number) =>
    [...groupKeys.all, groupId, "transactions"] as const,
};
