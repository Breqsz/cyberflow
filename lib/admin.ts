export const ADMIN_EMAILS = [
  'guirochabianchini@gmail.com',
];

export const isAdminEmail = (email: string | null | undefined) =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());
