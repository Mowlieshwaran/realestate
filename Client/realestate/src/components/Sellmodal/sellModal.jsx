import React from 'react'
import { Button, Cascader, DatePicker, Form, InputNumber, Upload, Select, TreeSelect, Segmented, } from 'antd';
import { Breadcrumb, Layout, Menu, Modal, theme } from 'antd';
import { Image } from 'antd';
import { Input } from 'antd';
const { Search } = Input;

const SellModal=()=> {
    const [form] = Form.useForm();
    const [fileName, setFileName] = useState("");
    const [baseImage, setBaseImage] = useState([])
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
        })
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
    return (
        <div>
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
        </div>
    )
}

export default SellModal;