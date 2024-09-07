import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { AppShell, Group, Text } from '@mantine/core';
import Logo from '@/components/common/Logo';
import LoginButton from '@/components/LoginButton';
import { setApiToken } from '@/lib/stores/api';
import { useAuthorityStore } from '@/lib/stores/authorityStore';

export default function AppWrapper({ children }: { children: any }) {
  const setLoggedInAuthorityId = useAuthorityStore((state) => state.setLoggedInAuthorityId);

  useEffect(() => {
    const cookies = new Cookies();
    const token: string | undefined = cookies.get('token');
    const authorityId: string | undefined = cookies.get('authorityId');
    if (token && token.trim().length > 0 && authorityId && authorityId.trim().length > 0) {
      setApiToken(token);
      setLoggedInAuthorityId(authorityId);
    }
  }, []);

  return (
    <AppShell header={{ height: 50 }}>
      <AppShell.Header>
        <Group
          justify={'space-between'}
          align={'center'}
          style={{ paddingInline: '1rem', height: '100%' }}
        >
          <Group style={{ cursor: 'pointer' }} onClick={() => location.reload()}>
            <Logo style={{ width: '2.5rem', height: '2.5rem' }} />
            <Text>Emercast</Text>
          </Group>
          <LoginButton />
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
