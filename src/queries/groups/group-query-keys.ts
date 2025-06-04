export const groupKeys = {
  all: ["groups"] as const,
  group: (groupId: number) => [...groupKeys.all, groupId] as const,
  balance: (groupId: number) =>
    [...groupKeys.group(groupId), "balance"] as const,
  totalSpent: (groupId: number) =>
    [...groupKeys.group(groupId), "total-spent"] as const,
  categoryCount: (groupId: number) =>
    [...groupKeys.group(groupId), "category-count"] as const,
  members: (groupId: number) =>
    [...groupKeys.group(groupId), "members"] as const,
  membersCount: (groupId: number) =>
    [...groupKeys.members(groupId), "count"] as const,
  personalBalance: (groupId: number) =>
    [...groupKeys.group(groupId), "personal-balance"] as const,
  usersBalance: (groupId: number) =>
    [...groupKeys.group(groupId), "users-balance"] as const,
  expenseReport: (groupId: number) =>
    [...groupKeys.group(groupId), "expense-report"] as const,
  categoryReport: (groupId: number) =>
    [...groupKeys.group(groupId), "category-report"] as const,
  transactions: (groupId: number) =>
    [...groupKeys.group(groupId), "transactions"] as const,
  transaction: (groupId: number, transactionId: number) =>
    [...groupKeys.group(groupId), "transaction", transactionId] as const,
};
