export type User = {
    id: number;
    email: string;
    password: string;
};

const users: User[] = [
    { id: 1, email: "john.doe@example.com", password: "password123" },
    { id: 2, email: "jane.doe@example.com", password: "password456" },
    { id: 3, email: "dark.proute@example.com", password: "password789" },
];

export function getUser(query: Partial<User>): User | undefined {
    return users.find(user => {
        return Object.entries(query).every(([key, value]) => user[key as keyof User] === value);
    });
}