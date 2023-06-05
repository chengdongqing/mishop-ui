import useSetState from '@/hooks/useSetState.ts';
import { arrayToObject } from '@/utils';
import {
  createContext,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
  useImperativeHandle
} from 'react';
import FormItem from './FormItem.tsx';

type ValuesType = Record<string, unknown>;

interface FormItemInjects {
  // 重置值
  resetValue: () => void;
  // 获取值
  getValue: () => unknown;
  // 设置值
  setValue: (value: unknown) => void;
  // 检查值
  checkValue: () => Promise<string | void>;
}

interface FormContextProps {
  // FormItem无样式
  noStyle?: boolean;
  // 禁用下属组件
  disabled?: boolean;
  // 初始值
  initialValues?: ValuesType;
  // 注册相关方法
  registerField?(name: string, injects: FormItemInjects): void;
  // 取消注册
  cancelField?(name: string): void;
  // 值变化回调入口
  onChange?(name: string, value: unknown): void;
}

export const FormContext = createContext<FormContextProps>({});

export interface FormHandle {
  // 提交表单
  submit(): Promise<ValuesType>;
  // 重置表单
  resetFields(): void;
  // 校验表单
  validateFields(): Promise<(string | void)[]>;
  // 获取表单值
  getFieldsValue(): ValuesType;
  // 设置表单值
  setFieldsValue(values: ValuesType): void;
}

interface FormProps extends PropsWithChildren {
  // FormItem无样式
  noStyle?: boolean;
  // 禁用下属组件
  disabled?: boolean;
  // 初始值
  initialValues?: ValuesType;
  // 值变化回调入口
  onChange?(changedValues: ValuesType): void;
  // 点击提交且验证通过后回调
  onOk?(values: ValuesType): void;
}

interface FormForwardRef
  extends ForwardRefExoticComponent<FormProps & RefAttributes<FormHandle>> {
  Item: typeof FormItem;
}

const Form = forwardRef<FormHandle, FormProps>(
  (
    { children, noStyle, disabled, initialValues, onChange, onOk },
    forwardRef
  ) => {
    const [fields, setFields] = useSetState<FormItemInjects>();

    // 收集数据
    function getFieldsValue() {
      return arrayToObject(
        Object.entries(fields).map(([name, field]) => ({
          name,
          value: field.getValue()
        }))
      );
    }
    // 校验数据
    function validateFields() {
      return Promise.all(
        Object.values(fields).map((item) => item.checkValue())
      );
    }
    // 提交表单
    function submit() {
      return validateFields().then(() => {
        const values = getFieldsValue();
        onOk?.(values);
        return values;
      });
    }

    // 对外提供的方法
    useImperativeHandle(forwardRef, () => ({
      submit,
      resetFields() {
        Object.values(fields).map((item) => item.resetValue());
      },
      validateFields,
      getFieldsValue,
      setFieldsValue(values1) {
        Object.entries(values1).forEach(([name, value]) => {
          fields[name].setValue(value);
        });
      }
    }));

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <FormContext.Provider
          value={{
            noStyle,
            disabled,
            initialValues,
            registerField(name, injects) {
              setFields({
                [name]: injects
              });
            },
            cancelField(name) {
              setFields((value) => {
                delete value[name];
                return value;
              });
            },
            onChange(name, value) {
              onChange?.({
                [name]: value
              });
            }
          }}
        >
          {children}
        </FormContext.Provider>
      </form>
    );
  }
) as FormForwardRef;

Form.Item = FormItem;

export default Form;
