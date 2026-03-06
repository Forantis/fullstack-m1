import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import userService from './services/userService';

function getApiErrorMessage(error, fallback) {
  return error?.response?.data?.message || fallback;
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await userService.getAll();
        setUsers(response.data.data || []);
      } catch (err) {
        setError(getApiErrorMessage(err, 'Impossible de charger les utilisateurs.'));
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setSuccess('');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [success]);

  const handleCreate = async (data) => {
    try {
      setError(null);
      const response = await userService.create(data);
      const newUser = response.data.data;
      setUsers((prev) => [...prev, newUser]);
      setSuccess('Utilisateur cree avec succes.');
      return true;
    } catch (err) {
      setError(getApiErrorMessage(err, 'Creation impossible.'));
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await userService.remove(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setSuccess('Utilisateur supprime avec succes.');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Suppression impossible.'));
    }
  };

  return (
    <div className="app-shell">
      <Navbar count={users.length} />
      <main className="container">
        {success && <p className="feedback success">{success}</p>}
        <UserForm onSubmit={handleCreate} />
        <UserList users={users} loading={loading} error={error} onDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;
