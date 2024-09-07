import { Circle, MapContainer, Marker, Pane, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import { Stack, Text } from '@mantine/core';
import { Area } from '@/components/views/BroadcastMapView/BroadcastMapView';
import MapEventReceiver from '@/components/views/BroadcastMapView/MapEventReceiver';
import { useBroadcastStore } from '@/lib/stores/broadcastStore';

interface MapProps {
  onClick: (e: LeafletMouseEvent) => void;
  selectedArea: Area | null;
}

export default function Map({ onClick, selectedArea }: MapProps) {
  const broadcasts = useBroadcastStore((state) => state.broadcastMessages);

  const allMessages = useMemo(() => {
    return Object.values(broadcasts).flat(1);
  }, [broadcasts]);

  return (
    <MapContainer center={[48.1351, 11.582]} zoom={11} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventReceiver onClick={onClick} />
      {selectedArea && (
        <Pane name={'SelectedArea'}>
          <Circle
            center={[selectedArea.latitude, selectedArea.longitude]}
            radius={selectedArea.radiusMeter}
          ></Circle>
        </Pane>
      )}
      {allMessages.map((x) => (
        <Marker position={[x.latitude, x.longitude]}>
          <Popup>
            <Text fw={700}>{x.title}</Text>
            <Text size={'xs'}>{`Created: ${dayjs.unix(x.created)}`}</Text>
            <Text size={'xs'}>{`Valid Until: ${dayjs.unix(x.forwardUntil)}`}</Text>
            <Text size={'sm'}>{x.message}</Text>
          </Popup>
          <Circle center={[x.latitude, x.longitude]} radius={x.radius}></Circle>
        </Marker>
      ))}
    </MapContainer>
  );
}
