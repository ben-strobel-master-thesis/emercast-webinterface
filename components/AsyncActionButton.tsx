import { useState } from 'react';
import { Button, ButtonProps, Loader } from '@mantine/core';
import { LoaderProps } from '@mantine/core/lib/components/Loader/Loader';

type AsyncActionButtonProps = ButtonProps & {
  action: () => Promise<any>;
  children?: any;
  blocking?: boolean;
  loaderPos: 'left' | 'right';
  loaderProps?: LoaderProps;
};

export default function AsyncActionButton(props: AsyncActionButtonProps) {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <Button
      {...props}
      onClick={() => {
        setShowLoader(true);
        props
          .action()
          .then((res) => {
            setShowLoader(false);
            return res;
          })
          .catch((err) => {
            setShowLoader(false);
            throw err;
          });
      }}
      disabled={props.disabled || (props.blocking && showLoader)}
      rightSection={
        props.loaderPos === 'right' && showLoader ? (
          <Loader {...props.loaderProps} />
        ) : (
          props.rightSection
        )
      }
      leftSection={
        props.loaderPos === 'left' && showLoader ? (
          <Loader {...props.loaderProps} />
        ) : (
          props.leftSection
        )
      }
    >
      {props.children}
    </Button>
  );
}
