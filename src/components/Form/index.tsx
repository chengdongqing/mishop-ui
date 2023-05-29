import useSetState from '@/hooks/useSetState.ts';
import {
  createContext,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
  useImperativeHandle
} from 'react';
import styles from './index.module.less';

type ValuesType = Record<string, unknown>;

interface FormContextProps {
  values?: ValuesType;
  initialValues?: ValuesType;
  registerFields?: (
    name: string,
    value: unknown,
    validate: () => Promise<boolean>
  ) => void;
  onChange?(name: string, value: unknown): void;
}

export const FormContext = createContext<FormContextProps>({});

export interface FormHandle {
  submit(): void;
  resetFields(): void;
  validateFields(): void;
  getFieldsValue(): ValuesType;
  setFieldsValue(values: ValuesType): void;
}

interface FormProps extends PropsWithChildren {
  initialValues?: ValuesType;
  onChange?(changedValues: ValuesType, allValues: ValuesType): void;
  onOk?(values: ValuesType): void;
}

interface FormForwardRef
  extends ForwardRefExoticComponent<FormProps & RefAttributes<FormHandle>> {
  Item: typeof FormItem;
}

const Form = forwardRef<FormHandle, FormProps>(
  ({ children, initialValues, onChange, onOk }, forwardRef) => {
    const [fields, setFields] = useSetState<{
      validate: () => Promise<boolean>;
    }>();
    const [values, setValues] = useSetState();

    function validateFields() {
      return Promise.all(Object.values(fields).map((item) => item.validate()));
    }

    useImperativeHandle(forwardRef, () => ({
      submit() {
        validateFields().then(() => {
          onOk?.(values);
        });
      },
      resetFields() {
        setValues(initialValues || {});
      },
      validateFields,
      getFieldsValue() {
        return values;
      },
      setFieldsValue(values1) {
        setValues(values1);
      }
    }));

    return (
      <FormContext.Provider
        value={{
          values,
          initialValues,
          registerFields(name, value, validate) {
            setValues({ [name]: value });
            setFields({
              [name]: { validate }
            });
          },
          onChange(name, value) {
            setValues({ [name]: value });
            onChange?.(
              {
                [name]: value
              },
              values
            );
          }
        }}
      >
        {children}
      </FormContext.Provider>
    );
  }
) as FormForwardRef;

interface FormItemProps extends PropsWithChildren {
  name?: string;
  rules?: {
    required?: boolean;
    len?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    validator?: (value: unknown) => Promise<boolean>;
    message: string;
  }[];
}

function FormItem({ children, rules }: FormItemProps) {
  return (
    <div className={styles.form_item}>
      {children}
      {!!rules?.length && (
        <div className={styles.error_tips}>{rules[0].message}</div>
      )}
    </div>
  );
}

Form.Item = FormItem;

export default Form;
