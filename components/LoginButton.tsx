import React, { useState } from 'react';
import { Button } from '@mantine/core';
import LoginModal from '@/components/LoginModal';
import { useAuthorityStore } from '@/lib/stores/authorityStore';

export default function LoginButton() {
  const loggedInAuthorityId = useAuthorityStore((state) => state.loggedInAuthorityId);
  const logout = useAuthorityStore((state) => state.logout);

  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div>
      <LoginModal show={showLoginModal} setShow={setShowLoginModal} />
      <Button
        color={'dark'}
        onClick={() => {
          if (loggedInAuthorityId === null) {
            setShowLoginModal(true);
          } else {
            logout();
          }
        }}
      >
        {loggedInAuthorityId === null ? 'Log in' : 'Log out'}
      </Button>
    </div>
  );
}
