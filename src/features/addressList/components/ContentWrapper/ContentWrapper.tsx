import styles from './ContentWrapper.module.scss';

interface ContentWrapperProps {
  children: React.ReactNode;
}
export function ContentWrapper({ children }: ContentWrapperProps) {
  return <ul className={styles.ListWrapper}>{children}</ul>;
}
