import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Group, Stack } from '@mantine/core';
import OrientationDependentGroupStack from '@/components/layout/OrientationDependentGroupStack';

export default function BroadcastMapView() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <p>Map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <OrientationDependentGroupStack
      props={{ style: { height: '90vh', width: '100%' } }}
      groupProps={{ justify: 'center', wrap: 'nowrap' }}
    >
      <Script
        src={'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'}
        integrity={'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='}
        crossOrigin={''}
      />
      <Stack style={{ width: '71%' }}>
        <Map />
      </Stack>
      <Stack style={{ width: '26%' }}>Test2</Stack>
    </OrientationDependentGroupStack>
  );
}
