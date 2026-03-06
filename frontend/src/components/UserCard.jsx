function UserCard({ user, onDelete }) {
  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleString('fr-FR')
    : 'Date inconnue';

  return (
    <article className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>
        <span className={`role-badge role-${user.role}`}>{user.role}</span>
      </p>
      <p className="created-at">Créé le : {createdAt}</p>
      <button
        className="delete-btn"
        onClick={() => onDelete(user._id)}
        type="button"
      >
        Supprimer
      </button>
    </article>
  );
}

export default UserCard;
