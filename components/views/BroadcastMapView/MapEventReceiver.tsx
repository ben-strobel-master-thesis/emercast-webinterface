import { LeafletMouseEvent } from 'leaflet';
import { useMapEvents } from 'react-leaflet';

interface MapEventReceiverProps {
  onClick: (e: LeafletMouseEvent) => void;
}

export default function MapEventReceiver({ onClick }: MapEventReceiverProps) {
  const mapEvents = useMapEvents({
    click: (e) => {
      onClick(e);
    },
  });

  return <></>;
}
