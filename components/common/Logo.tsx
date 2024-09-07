import Image, { ImageProps } from 'next/image';
import LogoSvg from '../../public/emercast.svg';

export default function Logo(props: Omit<ImageProps, 'src' | 'alt'>) {
  return <Image {...props} src={LogoSvg} alt={'Emercast Logo'} />;
}
