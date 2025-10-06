import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  name: string;
  age: number;
};

type UsersResponse = {
  users: User[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsersResponse>
) {
  const users: User[] = [
    { name: 'pepito peligrosito', age: 30 },
    { name: 'Jane Smith', age: 25 },
    { name: 'Alice Johnson', age: 28 },
    { name: 'Bob Brown', age: 35 },
  ];

  console.log("console log desde api/hello.ts");

  res.status(200).json({ users });
}
