type OnlineUsersListProps = { users: string[] };

export const OnlineUsersList = (props: OnlineUsersListProps) => {
  const { users } = props;

  return (
    <div className="flex select-none flex-col gap-y-1 p-1">
      {users.map((user) => (
        <p key={user}>{user}</p>
      ))}
    </div>
  );
};
