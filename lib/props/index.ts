export interface UserProps {
  user: {
    name: string | null;
    email: string;
    image?: string | null;
  } | null;
}