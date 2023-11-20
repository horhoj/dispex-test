import styles from './ListWrapper.module.scss';

interface ListWrapperProps {
  children: React.ReactNode;
  level: number;
}
export function ListWrapper({ children, level }: ListWrapperProps) {
  const paddingLeft = `${30 * level}px`;

  return (
    <ul className={styles.ListWrapper} style={{ paddingLeft }}>
      {children}
    </ul>
  );
}
