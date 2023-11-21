import styles from './ModalContent.module.scss';

interface ModalContentProps {
  children: React.ReactNode;
}
export function ModalContent({ children }: ModalContentProps) {
  return (
    <div
      className={styles.ModalContent}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
