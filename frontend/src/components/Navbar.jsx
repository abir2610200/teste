import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from "../appStore";

const Nav = styled.nav`
  background: white;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 3.5rem;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 400px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #eee;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: var(--primary, #1976d2);
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  &:hover {
    background: #f5f5f5;
    color: var(--primary, #1976d2);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: var(--primary, #1976d2);
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  border: 2px solid white;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #f5f5f5;
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 2rem;
  color: #666;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileName = styled.span`
  font-weight: 500;
  color: #333;
`;

const ProfileRole = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const LoginButton = styled.button`
  background: var(--primary, #1976d2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #115293;
  }
`;

const Navbar = () => {
  const [notifications] = useState(3);
  const [messages] = useState(2);
  const navigate = useNavigate();
  const UpdateOpen = useAppStore((state) => state.UpdateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Nav>
      <IconButton onClick={() => UpdateOpen(!dopen)}>
        <FaSearch />
      </IconButton>
      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search..." />
      </SearchContainer>

      <RightSection>
        <IconButton>
          <FaBell />
          {notifications > 0 && <NotificationBadge>{notifications}</NotificationBadge>}
        </IconButton>
        <IconButton>
          <FaEnvelope />
          {messages > 0 && <NotificationBadge>{messages}</NotificationBadge>}
        </IconButton>

        <ProfileSection>
          <ProfileIcon />
          <ProfileInfo>
            <ProfileName>John Doe</ProfileName>
            <ProfileRole>Administrator</ProfileRole>
          </ProfileInfo>
        </ProfileSection>

        {/* Login button for non-authenticated users */}
        <LoginButton onClick={handleLoginClick}>Login</LoginButton>
      </RightSection>
    </Nav>
  );
};

export default Navbar;
