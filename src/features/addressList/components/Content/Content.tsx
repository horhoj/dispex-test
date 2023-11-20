import styles from './Content.module.scss';

interface ContentProps {
  children: React.ReactNode;
}
export function Content({ children }: ContentProps) {
  return <div className={styles.Content}>{children}</div>;
}
