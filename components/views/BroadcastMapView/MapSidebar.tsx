import { Tabs } from '@mantine/core';
import AuthorityPanel from '@/components/views/BroadcastMapView/AuthorityPanel';
import { CreatePanelProps } from '@/components/views/BroadcastMapView/BroadcastCreatePanel';
import BroadcastPanel from '@/components/views/BroadcastMapView/BroadcastPanel';
import { AuthorityDTO } from '@/lib/api';

interface MapSidebarProps {
  mode: MapSidebarMode;
  setMode: (value: MapSidebarMode) => void;
  createPanelProps: CreatePanelProps;
  selectedAuthority: AuthorityDTO | null;
  setSelectedAuthority: (selectedAuthority: AuthorityDTO | null) => void;
}

export type MapSidebarMode = 'authorities' | 'broadcasts';

export default function MapSidebar({
  createPanelProps,
  mode,
  setMode,
  selectedAuthority,
  setSelectedAuthority,
}: MapSidebarProps) {
  return (
    <Tabs
      defaultValue={'broadcasts'}
      color={'dark'}
      style={{ width: '100%' }}
      styles={{ panel: { paddingBlock: '5px' } }}
      value={mode}
      onChange={(e) => setMode(e as MapSidebarMode)}
    >
      <Tabs.List>
        <Tabs.Tab value="broadcasts">Broadcasts</Tabs.Tab>
        <Tabs.Tab value="authorities">Authorities</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value={'broadcasts'}>
        <BroadcastPanel createPanelProps={createPanelProps} />
      </Tabs.Panel>
      <Tabs.Panel value={'authorities'}>
        <AuthorityPanel
          selectedAuthority={selectedAuthority}
          setSelectedAuthority={setSelectedAuthority}
          createPanelProps={createPanelProps}
        />
      </Tabs.Panel>
    </Tabs>
  );
}
