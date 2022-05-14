import './index.scss';

import { PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  message,
  Radio,
  Select,
  Space,
  Upload,
} from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Editor from '@/components/Editor';
import { useStore } from '@/store';
import { request } from '@/utils';

const { Option } = Select;

const Publish = () => {
  const { channelStore } = useStore();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const PAGE_ID = params.get('id');

  const [fileList, setFileList] = useState([]); // 上传图片的状态数据
  const [imgCount, setImageCount] = useState(1); // 图片上传和显示模式
  const cacheImgList = useRef([]); // 暂存仓库

  // 图片上传回调
  const onUploadChange = ({ fileList }: { fileList: any }) => {
    // 同时把图片列表存入仓库一份
    // 这里关键位置:需要做数据格式化
    const formatList = fileList.map((file: { response: { data: { url: string } } }) => {
      // 上传完毕 做数据处理
      if (file.response) {
        return {
          url: file.response.data.url,
        };
      }
      // 否则在上传中时，不做处理
      return file;
    });
    setFileList(formatList);
    cacheImgList.current = formatList;
  };

  // 切换封面显示模式
  const radioChange = (e: any) => {
    // 这里要使用e.target.value做判断
    const rawValue = e.target.value;
    setImageCount(rawValue);
    // 无图模式
    if (cacheImgList.current.length === 0) {
      return false;
    }
    // 单图模式
    if (rawValue === 1) {
      const img = cacheImgList.current[0];
      setFileList([img]);
      // 多图模式
    } else if (rawValue === 3) {
      setFileList(cacheImgList.current);
    }
  };

  // 提交表单
  const onFinish = async (values: any) => {
    // 数据的二次处理 重点是处理cover字段
    const { channel_id, content, title, type } = values;
    // 判断type fileList 是匹配的才能正常提交
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList?.map((item: any) => item.url),
      },
    };
    if (PAGE_ID) {
      await request.put(`/mp/articles/${PAGE_ID}?draft=false`, params); // 更新
    } else {
      await request.post('/mp/articles?draft=false', params); //新增
    }

    // 跳转列表 提示用户
    navigate('/article');
    message.success(`${PAGE_ID ? '更新成功' : '发布成功'}`);
  };

  // 数据回填  id调用接口  1.表单回填 2.暂存列表 3.Upload组件fileList
  const [form] = Form.useForm();
  useEffect(() => {
    // console.log('[ form ] 🚀, ', form);
    const loadDetail = async () => {
      const res = await request.get(`/mp/articles/${PAGE_ID}`);
      const data = res.data;
      // 表单数据回填
      form.setFieldsValue({ ...data, type: data.cover.type });
      // 回填upload
      const formatImgList = data.cover.images.map((url: string) => ({ url }));
      setFileList(formatImgList);
      // 暂存列表里也存一份
      cacheImgList.current = formatImgList;
      // 图片type
      setImageCount(data.cover.type);
    };
    // 必须是编辑状态 才可以发送请求
    if (PAGE_ID) {
      loadDetail();
    }
  }, [PAGE_ID, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{`${PAGE_ID ? '编辑' : '发布'}文章`}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '猜猜我是谁' }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((channel) => (
                <Option value={channel.id} key={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <Editor />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {`${PAGE_ID ? '更新' : '发布'}文章`}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
