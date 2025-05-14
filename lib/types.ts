export type User = {
  userId: string;
  name: string;
  lang: string;
};

export type Session = {
  user: User;
  expires: Date;
};
