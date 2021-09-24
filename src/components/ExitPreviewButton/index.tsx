import Link from 'next/link';

import styles from './styles.module.scss';

type ExitPreviewButtonProps = {
  className?: string;
};

export function ExitPreviewButton({
  className,
}: ExitPreviewButtonProps): JSX.Element {
  return (
    <Link href="/api/exit-preview">
      <a className={`${styles.container} ${className}`}>Sair do modo Preview</a>
    </Link>
  );
}
