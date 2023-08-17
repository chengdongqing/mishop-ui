import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Radio from '@/components/Radio';
import Row from '@/components/Row';
import patterns from '@/consts/patterns.ts';
import useToggle from '@/hooks/useToggle.ts';
import AccountLayout from '@/layouts/AccountLayout';
import { Gender } from '@/pages/User/enums.ts';
import { updateProfile, UserProfileDTO } from '@/services/user.ts';
import userSlice, { useUserInfo } from '@/store/slices/userSlice.ts';
import { RightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toCropImage from './AvatarCopper';
import styles from './index.module.css';

export default function ProfilePage() {
  const [editingMode, toggleEditing] = useToggle();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  return (
    <>
      <AccountLayout.Title title={'个人信息'} />

      <Form
        noStyle
        initialValues={{ ...userInfo }}
        onOk={async (values) => {
          if (avatarUrl) {
            values.avatarUrl = avatarUrl;
          }
          await updateProfile(values as UserProfileDTO);
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
                onClick={() => {
                  toCropImage(setAvatarUrl);
                }}
              >
                <img
                  alt={''}
                  src={avatarUrl || userInfo?.avatarUrl}
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
                  {Object.entries(Gender).map(([value, label]) => (
                    <Radio key={value} value={value}>{label}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            ) : (
              <span>{userInfo?.gender ? Gender[userInfo.gender] : '未知'}</span>
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
