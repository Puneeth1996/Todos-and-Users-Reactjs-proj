import React, { Component } from 'react';
import {  Input, Tooltip, Icon, Popconfirm, Modal, Divider, Button, Table, Menu, InputNumber, Form } from 'antd';
import './App.css';








const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
const EditableContext = React.createContext();


class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
    const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                        rules: [
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                        ],
                        initialValue: record[dataIndex],
                    })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}





class App extends Component {

    state = {
        data,
        editingKey: '' ,
        current: 'Todos',
        visible: false,
        columnsUsers: [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return (
                        <>
                            {
                            this.state.dataSourceTodo.length >= 1?   
                                <>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete2(record.key)}>
                                    <a>Delete</a>
                                </Popconfirm>
                                <Divider type="vertical" />
                                </>
                            : null 
                            }
                        
                            {editable ? 
                            <span>
                                <EditableContext.Consumer>
                                {form => (
                                    <a
                                    onClick={() => this.save(form, record.key)}
                                    style={{ marginRight: 8 }}
                                    >
                                    Save
                                    </a>
                                )}
                                </EditableContext.Consumer>
                                <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                <a>Cancel</a>
                                </Popconfirm>
                            </span>
                            : (
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                Edit
                            </a>
                            )
                            }
                        </>
                        )
                },
            },
        ],
        dataSourceUsers: [
            {
                key: '1',
                name: 'Mike',
                email: 'Mike@gmail.com',
            },
            {
                key: '2',
                name: 'John',
                email: 'John@gmail.com',
            },
        ],
        columnsTodo: [
            {
                title: 'Todo Activity',
                dataIndex: 'activity',
                key: 'activity',
            },
            {
                title: 'Todo Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return (
                    <>
                        {
                        this.state.dataSourceTodo.length >= 1?   
                            <>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete2(record.key)}>
                                <a>Delete</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            </>
                        : null 
                        }
                    
                        {editable ? 
                        <span>
                            <EditableContext.Consumer>
                            {form => (
                                <a
                                onClick={() => this.save(form, record.key)}
                                style={{ marginRight: 8 }}
                                >
                                Save
                                </a>
                            )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                            <a>Cancel</a>
                            </Popconfirm>
                        </span>
                        : (
                        <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                            Edit
                        </a>
                        )
                        }
                    </>
                    )
                },
            },
        ],
        dataSourceTodo: [            
            {
                key: '1',
                activity: 'Should wash clothes',
                status: 'pending',
            },
            {
                key: '2',
                activity: 'Run For 5km in the morning',
                status: 'completed',
            },
        ],
        fieldVal1: '',
        fieldVal2: '',
    };








    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
        if (error) {
            return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
            ...item,
            ...row,
            });
            this.setState({ data: newData, editingKey: '' });
        } else {
            newData.push(row);
            this.setState({ data: newData, editingKey: '' });
        }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }











    handleDelete1 = key => {
        const dataSourceUsers = [...this.state.dataSourceUsers];
        this.setState({ dataSourceUsers: dataSourceUsers.filter(item => item.key !== key) });
    };


    handleDelete2 = key => {
        const dataSourceTodo = [...this.state.dataSourceTodo];
        this.setState({ dataSourceTodo: dataSourceTodo.filter(item => item.key !== key) });
    };

    handleClick = e => {
        this.setState({
            current: e.key,
        });
        
    };

    showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = e => {
        if(this.state.current === 'Todos'){
            this.setState({
                dataSourceTodo: [...this.state.dataSourceTodo,
                    {   key: ''+(this.state.dataSourceTodo.length+1),
                        activity: this.state.fieldVal1,
                        status: this.state.fieldVal2,
                    }],
            });
        }
        else if(this.state.current === 'Users'){
            console.log({key: ''+(this.state.dataSourceUsers.length+1),activity: this.state.fieldVal1,status: this.state.fieldVal2,});
            this.setState({
                dataSourceUsers: [...this.state.dataSourceUsers,
                    {   key: ''+(this.state.dataSourceUsers.length+1),
                        name: this.state.fieldVal1,
                        email: this.state.fieldVal2,
                    }],
            });
        }
		this.setState({
            visible: false,
            fieldVal1: '',
            fieldVal2: '',
		});
	};

	handleCancel = e => {
		this.setState({
            visible: false,
            fieldVal1: '',
            fieldVal2: '',
		});
	};


    ChangeHandler1 = (event) => {
        this.setState({
            fieldVal1:event.target.value,
        });
    }
    ChangeHandler2 = (event) => {
        this.setState({
            fieldVal2:event.target.value,
        });
    }


    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
    
        const columns = this.state.columnsTodo.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div className="App">
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="Todos">
                        <Icon type="Todos" />
                            Todos
                    </Menu.Item>
                    <Menu.Item key="Users">
                        <Icon type="Users" />
                        Users
                    </Menu.Item>
                </Menu>
				<Button onClick={this.showModal} style={{ marginBottom: 16, marginTop: 16 }} >Add {this.state.current}</Button>
				<Modal title={"Add New "+this.state.current} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    {   
                        this.state.current === 'Todos' ?
                        <>
                        <Input
                            placeholder="Enter your Activity"
                            prefix={<Icon type="interaction" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Add Your Activity">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            style={{ marginBottom: 16 }}
                            value={this.state.fieldVal1} 
                            name="activity"
                            onChange={this.ChangeHandler1}
                        />
                        <Input
                            placeholder="Enter your Activity status"
                            prefix={<Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Add Your Activity status">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            value={this.state.fieldVal2} 
                            name="status"
                            onChange={this.ChangeHandler2}
                        />
                        </>
                        :
                        <>
                        <Input
                            placeholder="Enter your username"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Add Your Username">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            style={{ marginBottom: 16 }}
                            value={this.state.fieldVal1} 
                            name="username"
                            onChange={this.ChangeHandler1}
                        />
                        <Input
                            placeholder="Enter your Email"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Add Your Email">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            value={this.state.fieldVal2} 
                            name="email"
                            onChange={this.ChangeHandler2}
                        />
                        </>
                    }
                </Modal>
                <EditableContext.Provider value={this.props.form}>
                {   
                    this.state.current === 'Todos' ?
                    
                    <Table components={components} rowKey={this.state.id} dataSource={this.state.dataSourceTodo} columns={this.state.columnsTodo} bordered rowClassName="editable-row" pagination={{onChange: this.cancel,}}/> :
                    <Table components={components} rowKey={this.state.id} dataSource={this.state.dataSourceUsers} columns={this.state.columnsUsers} bordered rowClassName="editable-row" pagination={{onChange: this.cancel,}}/>
                }
                </EditableContext.Provider>
            </div>
        )
    }
}

const EditableFormTable = Form.create()(App);

export default EditableFormTable;