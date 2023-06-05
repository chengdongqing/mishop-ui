import Form, { FormHandle } from '@/components/Form';
import Grid from '@/components/Grid';
import Input from '@/components/Input';
import Popup from '@/components/Popup';
import Row from '@/components/Row';
import Textarea from '@/components/Textarea';
import toast from '@/components/Toast';
import patterns from '@/utils/patterns.ts';
import { useRef } from 'react';
import CityPicker, { City } from '../CityPicker';

export default function EditingModal({
  open,
  onCancel
}: {
  open: boolean;
  onCancel(): void;
}) {
  const formRef = useRef<FormHandle>(null);

  return (
    <Popup
      open={open}
      width={'66rem'}
      title={'新增收货地址'}
      maskClosable={false}
      onOk={() => {
        return new Promise((resolve, reject) => {
          formRef.current
            ?.submit()
            .then((values) => {
              setTimeout(() => {
                toast.success('提交成功');
                console.log(values);
                resolve();
              }, 1000);
            })
            .catch(reject);
        });
      }}
      onCancel={onCancel}
    >
      <Form noStyle ref={formRef}>
        <Grid columns={1} gap={'1.4rem'}>
          <Row>
            <Form.Item
              name={'username'}
              rules={[
                { required: true, message: '请输入姓名' },
                { max: 15, message: '姓名不能超过15个字符' }
              ]}
              style={{ flex: 1, marginRight: '1.4rem' }}
            >
              <Input placeholder={'姓名'} />
            </Form.Item>
            <Form.Item
              name={'phoneNumber'}
              rules={[
                { required: true, message: '请输入手机号' },
                {
                  pattern: patterns.phoneNumber,
                  message: '手机号格式错误'
                }
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder={'手机号'} />
            </Form.Item>
          </Row>
          <Form.Item
            name={'city'}
            rules={[
              { required: true, message: '请选择地址' },
              {
                validator(value) {
                  if ((value as City[]).length < 3) {
                    return Promise.reject('城市信息错误');
                  }
                  return Promise.resolve();
                }
              }
            ]}
            validateOnChange={false}
          >
            <CityPicker placeholder={'城市'} />
          </Form.Item>
          <Form.Item
            name={'address'}
            rules={[
              { required: true, message: '请输入详细地址' },
              {
                min: 5,
                message: '不能少于5个字符'
              }
            ]}
          >
            <Textarea placeholder={'详细地址'} gray maxLength={30} />
          </Form.Item>
          <Form.Item name={'label'}>
            <Input placeholder={'地址标签'} />
          </Form.Item>
        </Grid>
      </Form>
    </Popup>
  );
}
