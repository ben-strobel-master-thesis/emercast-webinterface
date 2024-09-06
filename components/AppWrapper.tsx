import { AppShell, Group, Text } from '@mantine/core';
import LoginButton from '@/components/LoginButton';
import Logo from '@/components/Logo';

export default function AppWrapper({ children }: { children: any }) {
  return (
    <AppShell header={{ height: 50 }}>
      <AppShell.Header>
        <Group
          justify={'space-between'}
          align={'center'}
          style={{ paddingInline: '1rem', height: '100%' }}
        >
          <Group style={{ cursor: 'pointer' }} onClick={() => location.reload()}>
            <Logo />
            <Text>Emercast</Text>
          </Group>
          <LoginButton />
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
