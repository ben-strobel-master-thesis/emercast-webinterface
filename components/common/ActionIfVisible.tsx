import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';

interface ActionIfVisibleProps {
  action: () => void;
  disabled: boolean;
  children: React.ReactElement;
}
export default function ActionIfVisible({ action, children, disabled }: ActionIfVisibleProps) {
  const { ref, inViewport } = useInViewport();
  const [executed, setExecuted] = useState(false);
  useEffect(() => {
    if (!executed && !disabled && inViewport) {
      action();
      setExecuted(true);
    }
  }, [inViewport]);
  return disabled ? <div>{children}</div> : <div ref={ref}>{children}</div>;
}
