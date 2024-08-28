import React, { useEffect, useState } from 'react';
import './styles/profile.css'; 
import { Link } from 'react-router-dom';
function UserProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <div className="profile-item">
        <p><strong>ID:</strong> {user.id}</p>
      </div>
      <div className="profile-item">
        <p><strong>Номер телефона:</strong> {user.mobile}</p>
      </div>
      <div className="profile-item">
        <p><strong>ФИО:</strong> {user.customer.person.lastName} {user.customer.person.firstName} {user.customer.person.fatherName}</p>
      </div>
      <div className="profile-item">
        <p><strong>Email:</strong> {user.email || 'Не указан'}</p>
      </div>
      <div className="profile-item">
        <p><strong>Статус аккаунта:</strong> {user.status}</p>
      </div>
      <div className="profile-item">
        <p><strong>Регион:</strong> {user.customer.person.address.country.countryName.ru}, {user.customer.person.address.city}, {user.customer.person.address.state.regionsName.ru}</p>
      </div>
      <div>
        <Link to="/product">Перейти в профиль</Link>
      </div>
    </div>
  );
}

export default UserProfilePage;