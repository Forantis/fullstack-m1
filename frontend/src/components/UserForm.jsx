import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  role: 'user'
};

function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Les champs name et email sont obligatoires.');
      return;
    }

    setError('');

    const isSuccess = await onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role
    });

    if (isSuccess) {
      setFormData(initialForm);
    }
  };

  return (
    <section className="user-form-wrapper">
      <h2>Ajouter un utilisateur</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Alice Martin"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ex: alice@email.com"
        />

        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        {error && <p className="feedback error">{error}</p>}

        <button className="submit-btn" type="submit">
          Ajouter
        </button>
      </form>
    </section>
  );
}

export default UserForm;
