import { useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import AuthorityCreatePanel from '@/components/views/BroadcastMapView/AuthorityCreatePanel';
import AuthorityList from '@/components/views/BroadcastMapView/AuthorityList';
import { CreatePanelProps } from '@/components/views/BroadcastMapView/BroadcastCreatePanel';
import { AuthorityDTO } from '@/lib/api';

interface AuthorityPanelProps {
  selectedAuthority: AuthorityDTO | null;
  setSelectedAuthority: (selectedAuthority: AuthorityDTO | null) => void;
  createPanelProps: CreatePanelProps;
}

export default function AuthorityPanel({
  selectedAuthority,
  setSelectedAuthority,
  createPanelProps,
}: AuthorityPanelProps) {
  const [mode, setMode] = useState<'list' | 'create'>('list');

  return (
    <Stack style={{}}>
      <Group style={{ width: '100%' }} justify={'end'}>
        <Button
          color={'dark'}
          variant={mode === 'list' ? undefined : 'outline'}
          onClick={() => {
            if (mode === 'list') {
              setMode('create');
            } else {
              setMode('list');
            }
          }}
        >
          {mode === 'list' ? 'Create Authority' : 'Cancel'}
        </Button>
      </Group>
      {mode === 'list' ? (
        <AuthorityList
          selectedAuthority={selectedAuthority}
          setSelectedAuthority={setSelectedAuthority}
        />
      ) : (
        <AuthorityCreatePanel
          selectable={createPanelProps.selectable}
          selectedArea={createPanelProps.selectedArea}
          setSelectedArea={createPanelProps.setSelectedArea}
          setSelectable={createPanelProps.setSelectable}
          onClose={() => setMode('list')}
        />
      )}
    </Stack>
  );
}
