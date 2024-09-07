import { Group, GroupProps, Stack, StackProps } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

interface OrientationDependentGroupStackProps {
  children?: any;
  invert?: boolean;
  props?: GroupProps & StackProps;
  groupProps?: GroupProps;
  stackProps?: StackProps;
}

export default function OrientationDependentGroupStack({
  children,
  invert,
  props,
  groupProps,
  stackProps,
}: OrientationDependentGroupStackProps) {
  const { height, width } = useViewportSize();
  const landscape = width > height;

  return (invert ? !landscape : landscape) ? (
    <Group {...props} {...groupProps}>
      {children}
    </Group>
  ) : (
    <Stack {...props} {...stackProps}>
      {children}
    </Stack>
  );
}
