import styles from './Left.module.scss';

interface LeftProps {
  children: React.ReactNode;
}
export function Left({ children }: LeftProps) {
  return <div className={styles.Left}>{children}</div>;
}
