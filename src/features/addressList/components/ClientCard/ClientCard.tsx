import { Client } from '../../types/Client';
import { Button } from '../Button';
import styles from './ClientCard.module.scss';

interface ClientCardProps {
  client: Client;
  onDelete: () => void;
}

const EMPTY = <span className={styles.empty}>не указано</span>;

export function ClientCard({ client, onDelete }: ClientCardProps) {
  return (
    <div className={styles.ClientCard}>
      <div className={styles.field}>
        ({client.id}) ФИО: {client.name || EMPTY}
      </div>
      <div className={styles.field}>EMAIL: {client.email || EMPTY}</div>
      <div className={styles.field}>ТЕЛЕФОН: {client.phone || EMPTY}</div>
      <div className={styles.buttonWrap}>
        <Button isFitContent={true} onClick={onDelete}>
          Удалить
        </Button>
      </div>
    </div>
  );
}
