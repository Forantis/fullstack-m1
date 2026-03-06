import UserCard from './UserCard';

function UserList({ users, loading, error, onDelete }) {
  if (loading) {
    return <p className="feedback loading">Chargement des utilisateurs...</p>;
  }

  if (error) {
    return <p className="feedback error">{error}</p>;
  }

  if (users.length === 0) {
    return <p className="feedback empty">Aucun utilisateur</p>;
  }

  return (
    <section className="user-grid">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} />
      ))}
    </section>
  );
}

export default UserList;
