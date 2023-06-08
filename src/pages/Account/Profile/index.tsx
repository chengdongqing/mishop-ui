import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Popup from '@/components/Popup';
import Radio from '@/components/Radio';
import Row from '@/components/Row';
import useToggle from '@/hooks/useToggle.ts';
import AccountLayout from '@/layouts/AccountLayout';
import userSlice, { useUserInfo } from '@/store/slices/userSlice.ts';
import patterns from '@/utils/patterns.ts';
import { RightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import AvatarCopper from './AvatarCopper';
import styles from './index.module.less';

export default function ProfilePage() {
  const [editingMode, toggleEditing] = useToggle();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  const [open, toggleOpen] = useToggle(true);

  return (
    <>
      <AccountLayout.Title title={'个人信息'} />

      <Popup open={open} width={'45rem'} footer={null} onCancel={toggleOpen}>
        <AvatarCopper />
      </Popup>
      <Form
        noStyle
        initialValues={{ ...userInfo }}
        onOk={(values) => {
          dispatch(userSlice.actions.modifyUser(values));
          toggleEditing();
        }}
      >
        <div className={styles.form_item}>
          <div className={styles.label}>头像</div>
          <div className={styles.value}>
            {editingMode ? (
              <Row
                align={'middle'}
                justify={'space-between'}
                style={{ cursor: 'pointer' }}
                onClick={toggleOpen}
              >
                <img
                  alt={''}
                  src={userInfo?.avatarUrl}
                  className={styles.avatar}
                />
                <RightOutlined className={styles.icon_arrow} />
              </Row>
            ) : (
              <img
                alt={''}
                src={userInfo?.avatarUrl}
                className={styles.avatar}
              />
            )}
          </div>
        </div>
        <div className={styles.form_item}>
          <div className={styles.label}>昵称</div>
          <div className={styles.value}>
            {!editingMode ? (
              <span>{userInfo?.name}</span>
            ) : (
              <Form.Item
                name={'name'}
                rules={[
                  {
                    required: true,
                    message: '昵称不能为空'
                  },
                  {
                    pattern: patterns.username,
                    message: '昵称为2-20个汉字、英文或数字'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            )}
          </div>
        </div>
        <div className={styles.form_item}>
          <div className={styles.label}>性别</div>
          <div className={styles.value}>
            {editingMode ? (
              <Form.Item name={'gender'}>
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              </Form.Item>
            ) : (
              <span>
                {userInfo?.gender
                  ? { 1: '男', 2: '女' }[userInfo?.gender]
                  : '未知'}
              </span>
            )}
          </div>
        </div>
        <div className={styles.form_item}>
          <div className={styles.label}>小米ID</div>
          <div className={styles.value}>{userInfo?.id}</div>
        </div>
        <div className={styles.form_item}>
          <div className={styles.label}>国家/地区</div>
          <div className={styles.value}>中国</div>
        </div>
        <div className={styles.form_item}>
          <div className={styles.label} />
          <div className={styles.value} style={{ paddingLeft: 0 }}>
            {!editingMode ? (
              <Button
                key={'edit'}
                className={styles.btn}
                onClick={toggleEditing}
              >
                编辑
              </Button>
            ) : (
              <Button key={'save'} className={styles.btn} type={'submit'}>
                保存
              </Button>
            )}
          </div>
        </div>
      </Form>
    </>
  );
}
