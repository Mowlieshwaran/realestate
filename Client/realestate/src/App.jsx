import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout,Row, Menu,Col,Card, Modal, theme, Space,Tag ,Typography} from 'antd';
const {Text}=Typography
const { Header, Content, Footer } = Layout;
import { Input } from 'antd';
const { Search } = Input;
import { PlusOutlined } from '@ant-design/icons';
// import { Select, Spin } from 'antd';
import { Flex } from 'antd';
import { Image } from 'antd';
import { Button, Cascader, DatePicker, Form, InputNumber, Upload, Select, TreeSelect, Segmented, } from 'antd';
import axios from 'axios';
import Details from './components/Sellmodal/Details';
// import debounce from 'lodash/debounce';
const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");
  const [baseImage, setBaseImage] = useState([])
  const [getAllData, setGetAllData] = useState([])
  const [DetailComponent, setDetailComponent] = useState(false)

  const variant = Form.useWatch('variant', form);
  console.log("getAlldata",getAllData);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleFileInputChange = async e => {
    const files = e.target.files[0]
    setFileName(files)
    const result = await getBase64(files)
    let temp = baseImage
    temp.push(result)
    setBaseImage(temp)

  }


  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const normFile = (e) => {

    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (args) => {
    let temp = { ...args, productImages: baseImage }

    try {
      const response = await axios.post("http://localhost:5000/api/data", temp);
      console.log(response.data);
      form.resetFields();
      setBaseImage([]);
    } catch (error) {
      console.error(error);
    }
    console.log("Failed:", args);
    console.log("temp", temp);

  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  const handleShowDetails=()=>{
    console.log("haiiiiiiiiiiiii");
    
    setDetailComponent(true)
  }
  console.log("DetailComponent",DetailComponent);
  
  const fetchAllData = async() => {
    try {
       const response=await axios.get("http://localhost:5000/api/data/sell")
       console.log("response",response);
        if(response.data.success){
          setGetAllData(response.data.files)
        }
    }
    catch (e) {
      console.log("error", e);
    }
  }
  useEffect(() => {
    fetchAllData()
  },[])
  return (
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
        // defaultSelectedKeys={['2']}
        // items={items}
        // style={{
        //   flex: 1,
        //   minWidth: 0,
        // }}
        />
        {/* <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    /> */}
        {/* < Search style={{ width: '20%', gap: "10px" }} placeholder="input search location" enterButton="Search" size="large" /> */}
        <Select showSearch size='large' style={{ width: 200 }} placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={[
            {
              value: '1',
              label: 'Not Identified',
            },
            {
              value: '2',
              label: 'Closed',
            },
            {
              value: '3',
              label: 'Communicated',
            },
            {
              value: '4',
              label: 'Identified',
            },
            {
              value: '5',
              label: 'Resolved',
            },
            {
              value: '6',
              label: 'Cancelled',
            },
          ]}
        />
        < Search style={{ width: '50%' }} placeholder="input search property" enterButton="Search" size="large" />
        <Image
          width={50}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Button type="primary" onClick={showModal}>
          SELL
        </Button>
        <Modal title="POST YOUR ADD HERE" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>


          <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >

            <Form.Item
              label="User Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Brand Model"
              name="brandmodel"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Select showSearch size='large' style={{ width: 200 }} placeholder="Search Location"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
                }
                options={[
                  {
                    value: '1',
                    label: 'Chennai',
                  },
                  {
                    value: '2',
                    label: 'Coimbatore',
                  },
                  {
                    value: '3',
                    label: 'Erode',
                  },
                  {
                    value: '4',
                    label: 'Salem',
                  },
                  {
                    value: '5',
                    label: 'Ooty',
                  },
                  {
                    value: '6',
                    label: 'Tirchy',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Upload" onChange={(e) => handleFileInputChange(e)}
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}>
              <Upload listType="picture-card">
                <button
                  style={{
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="DatePicker"
              name="DatePicker"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <DatePicker />
            </Form.Item>



            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>



        </Modal>
      </Header>
      <Content
      // style={{
      //   padding: '0 48px',
      // }}
      >
        {/* <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            padding: 24,
            height: '100%',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >

          <Row gutter={[20, 20]} >
            {getAllData.map((items, i) =>
              <Col key={i} span={6}>
                <Card className='cardcolor ' onClick={handleShowDetails}>
                  <Row justify='space-around'>
                    <Space direction='vertical'  >
                    <img src={items.productImages[0]} className='image'  style={{width:"290px"}}></img>

                    {/* <Tag>""</Tag> */}
                      {/* {items.name} */}
                      <Text className='total'>{items.price}</Text>
                    <Text className='count'>{items.brand}</Text>
                    <Text className='count'>{items.location}</Text>
                    </Space>
                  </Row>
                </Card>
              </Col>

            )}
          </Row>

        
        </div>
        <div>
          {DetailComponent ? <Details/>
           :"aaa"}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;