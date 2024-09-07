import { Tabs } from '@mantine/core';
import AuthorityPanel from '@/components/views/BroadcastMapView/AuthorityPanel';
import { CreatePanelProps } from '@/components/views/BroadcastMapView/BroadcastCreatePanel';
import BroadcastPanel from '@/components/views/BroadcastMapView/BroadcastPanel';

interface MapSidebarProps {
  mode: MapSidebarMode;
  setMode: (value: MapSidebarMode) => void;
  createPanelProps: CreatePanelProps;
}

export type MapSidebarMode = 'authorities' | 'broadcasts';

export default function MapSidebar({ createPanelProps, mode, setMode }: MapSidebarProps) {
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
        <AuthorityPanel />
      </Tabs.Panel>
    </Tabs>
  );
}
