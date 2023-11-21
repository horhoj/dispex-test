import { useFormik } from 'formik';
import * as yup from 'yup';
import { AddClientData } from '../../types/Client';
import { Button } from '../Button';
import styles from './ClientForm.module.scss';

interface ClientFormProps {
  initialValues: AddClientData;
  onClose: () => void;
  onSubmit: (values: AddClientData) => void;
}

const VALIDATION_IS_EMPTY_MSG = 'Не должно быть пустым';
const VALIDATION_IS_NOT_EMAIL_MSG = 'Не почта';
const VALIDATION_IS_NOT_PHONE_MSG = 'Не телефон';

const validationSchema = yup.object({
  name: yup.string().required(VALIDATION_IS_EMPTY_MSG),

  email: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .email(VALIDATION_IS_NOT_EMAIL_MSG),
  phone: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .matches(/^\+?[\d]+$/, VALIDATION_IS_NOT_PHONE_MSG),
});

export function ClientForm({
  initialValues,
  onClose,
  onSubmit,
}: ClientFormProps) {
  const formik = useFormik<AddClientData>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className={styles.ClientForm}
    >
      <h3>Добавить нового жильца</h3>
      <div className={styles.field}>
        <label className={styles.label}>ФИО</label>
        <input
          className={styles.input}
          type="text"
          placeholder={'введите ФИО'}
          {...formik.getFieldProps('name')}
        />
        {Boolean(formik.touched.name) && Boolean(formik.errors.name) ? (
          <div className={styles.error}>{formik.errors.name}</div>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>EMAIL</label>
        <input
          className={styles.input}
          type="text"
          placeholder={'введите EMAIL'}
          {...formik.getFieldProps('email')}
        />
        {Boolean(formik.touched.email) && Boolean(formik.errors.email) ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Телефон (в формате +7777777777)</label>
        <input
          className={styles.input}
          type="text"
          placeholder={'введите телефон'}
          {...formik.getFieldProps('phone')}
        />
        {Boolean(formik.touched.phone) && Boolean(formik.errors.phone) ? (
          <div className={styles.error}>{formik.errors.phone}</div>
        ) : null}
      </div>

      <div className={styles.buttonList}>
        <Button isFitContent={true} type={'submit'}>
          Сохранить
        </Button>
        <Button
          className={styles.buttonListButton}
          type={'button'}
          isFitContent={true}
          onClick={onClose}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}
