export const groupKeys = {
  all: ["groups"] as const,
  details: (groupId: number) => [...groupKeys.all, groupId, "detail"] as const,
  balance: (groupId: number) => [...groupKeys.all, groupId, "balance"] as const,
  totalSpent: (groupId: number) =>
    [...groupKeys.all, groupId, "total-spent"] as const,
  categoryCount: (groupId: number) =>
    [...groupKeys.all, groupId, "category-count"] as const,
  membersCount: (groupId: number) =>
    [...groupKeys.all, groupId, "members-count"] as const,
  personalBalance: (groupId: number) =>
    [...groupKeys.all, groupId, "personal-balance"] as const,
  usersBalance: (groupId: number) =>
    [...groupKeys.all, groupId, "users-balance"] as const,
  expenseReport: (groupId: number) =>
    [...groupKeys.all, groupId, "expense-report"] as const,
  categoryReport: (groupId: number) =>
    [...groupKeys.all, groupId, "category-report"] as const,
  transactions: (groupId: number) =>
    [...groupKeys.all, groupId, "transactions"] as const,
};
