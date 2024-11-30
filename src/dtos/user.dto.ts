interface UserDto {
  id: number;
  email: string;
  password: string;
  username: string;
  posts: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface UserSignupDto {
  email: string;
  password: string;
  username: string;
}

export { UserDto, UserSignupDto };
