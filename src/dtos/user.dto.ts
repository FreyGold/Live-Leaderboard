interface UserDto {
  id: number;
  email: string;
  password: string;
  name: string;
  posts: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface UserSignupDto {
  id: number;
  email: string;
  password: string;
  name: string;
}
