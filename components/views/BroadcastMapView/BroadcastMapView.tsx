import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Group, Stack } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import OrientationDependentGroupStack from '@/components/layout/OrientationDependentGroupStack';
import MapSidebar, { MapSidebarMode } from '@/components/views/BroadcastMapView/MapSidebar';
import { AuthorityDTO } from '@/lib/api';
import { useBroadcastStore } from '@/lib/stores/broadcastStore';
import { roundToDecimals } from '@/lib/utils';

export type Area = { latitude: number; longitude: number; radiusMeter: number };

export default function BroadcastMapView() {
  const { width, height } = useViewportSize();
  const landscape = width > height;

  const [sidebarMode, setSidebarMode] = useState<MapSidebarMode>('broadcasts');

  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [selectable, setSelectable] = useState<boolean>(false);

  const [selectedAuthority, setSelectedAuthority] = useState<AuthorityDTO | null>(null);

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/views/BroadcastMapView/Map'), {
        loading: () => <p>Map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <OrientationDependentGroupStack
      groupProps={{
        justify: 'center',
        wrap: 'nowrap',
        style: { height: '100%', width: '100%' },
      }}
      stackProps={{
        style: { height: '100%', width: '100%' },
      }}
    >
      <Script
        src={'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'}
        integrity={'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='}
        crossOrigin={''}
      />
      <Stack style={{ width: landscape ? '71%' : '100%', height: landscape ? '95%' : '60%' }}>
        <Map
          onClick={(e) => {
            if (selectable) {
              setSelectedArea((oldValue) => ({
                latitude: roundToDecimals(e.latlng.lat, 4),
                longitude: roundToDecimals(e.latlng.lng, 4),
                radiusMeter: oldValue === null ? 500 : oldValue.radiusMeter,
              }));
            }
          }}
          selectedArea={selectedArea}
          selectedAuthority={selectedAuthority}
        />
      </Stack>
      <Stack style={{ width: landscape ? '26%' : '100%', height: landscape ? '95%' : '40%' }}>
        <MapSidebar
          mode={sidebarMode}
          setMode={setSidebarMode}
          createPanelProps={{ selectable, selectedArea, setSelectable, setSelectedArea }}
          selectedAuthority={selectedAuthority}
          setSelectedAuthority={setSelectedAuthority}
        />
      </Stack>
    </OrientationDependentGroupStack>
  );
}
