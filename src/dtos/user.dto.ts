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
  email: string;
  password: string;
  name: string;
}

export { UserDto, UserSignupDto };
