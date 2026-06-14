export const USER_ROLE = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
