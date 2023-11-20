import styles from './ListItem.module.scss';

interface ListItemProps {
  children: React.ReactNode;
}
export function ListItem({ children }: ListItemProps) {
  return <li className={styles.ListItem}>{children}</li>;
}
