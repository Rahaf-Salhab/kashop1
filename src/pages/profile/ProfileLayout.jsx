import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';

function ProfileLayout() {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.userInfo}>
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className={styles.avatar}
          />
          <h3>Ahmed Mohamed</h3>
          <p>Cairo, Egypt</p>
        </div>
        <nav className={styles.navLinks}>
          <NavLink
            to="info"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            My Orders
          </NavLink>
          <NavLink
            to="change-password"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Change Password
          </NavLink>
          <button className={styles.logout}>Log out</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default ProfileLayout;
