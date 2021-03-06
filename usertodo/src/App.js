import React, { Component } from 'react';
import {  Input, Tooltip, Icon, Popconfirm, Modal, Divider, Button, Table, Menu, Form } from 'antd';
import './App.css';


const EditableContext = React.createContext();


class EditableCell extends Component {
    getInput = () => <Input />;

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
        console.log(this.props.title,this.props.record,this.props.index,this.props.editing)
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
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '' ,
            editingKey1: '' ,
            current: 'Todos',
            visible: false,
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
            isLoading: false,
        };
        this.columnsTodo =  [
            {
                title: 'Todo Activity',
                dataIndex: 'activity',
                key: 'activity',
                width: '50%',
                editable: true,
            },
            {
                title: 'Todo Status',
                dataIndex: 'status',
                key: 'status',
                width: '25%',
                editable: true,
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                width: '25%',
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
        ];
        this.columnsUsers =  [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '25%',
                editable: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: '50%',
                editable: true,
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                width: '25%',
                render: (text, record) => {
                    const { editingKey1 } = this.state;
                    const editable = this.isEditing1(record);
                    return (
                        <>
                            {
                            this.state.dataSourceUsers.length >= 1?   
                                <>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete1(record.key)}>
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
                                    onClick={() => this.save1(form, record.key)}
                                    style={{ marginRight: 8 }}
                                    >
                                    Save
                                    </a>
                                )}
                                </EditableContext.Consumer>
                                <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel1(record.key)}>
                                <a>Cancel</a>
                                </Popconfirm>
                            </span>
                            : (
                            <a disabled={editingKey1 !== ''} onClick={() => this.edit1(record.key)}>
                                Edit
                            </a>
                            )
                            }
                        </>
                        )
                },
            },
        ];

    }





    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        console.log(form, key);
        form.validateFields((error, row) => {
        if (error) {
            console.log(error);
            return;
        }
        const newData = [...this.state.dataSourceTodo];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
            ...item,
            ...row,
            });
            this.setState({ dataSourceTodo: newData, editingKey: '' });
        } else {
            newData.push(row);
            this.setState({ dataSourceTodo: newData, editingKey: '' });
        }
        });
    }

    edit(key) {
        console.log(key);
        this.setState({ editingKey: key });
    }












    isEditing1 = record => record.key === this.state.editingKey1;

    cancel1 = () => {
        this.setState({ editingKey1: '' });
    };

    save1(form, key) {
        console.log(form, key);
        form.validateFields((error, row) => {
        if (error) {
            console.log(error);
            return;
        }
        const newData = [...this.state.dataSourceUsers];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
            ...item,
            ...row,
            });
            this.setState({ dataSourceUsers: newData, editingKey1: '' });
        } else {
            newData.push(row);
            this.setState({ dataSourceUsers: newData, editingKey1: '' });
        }
        });
    }

    edit1(key) {
        console.log(key);
        this.setState({ editingKey1: key });
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
        

        // isLoading is set to true and 
        // Now after this the normal program flow continues
        this.setState({ isLoading: true });
        setTimeout(() => {
        this.setState({ isLoading: false, visible: false });
        }, 5000);
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


    
    componentWillMount() {
        (localStorage.getItem('todoData') || localStorage.getItem('userData')) && this.setState({
            dataSourceTodo: JSON.parse(localStorage.getItem('todoData')),
            dataSourceUsers: JSON.parse(localStorage.getItem('userData')),
            current: JSON.parse(localStorage.getItem('curTab')),
        })
    }
    

    componentDidMount(){

        const date = localStorage.getItem('storringTime');
        const storringDate = date && new Date(parseInt(date));
        const now = new Date();

        const dataAge = Math.round((now - storringDate) / (1000 * 60 * 60)); // in hours
        const tooOld = dataAge >=4;

        if(!tooOld){
            console.log(`Using data from localStorage that are ${dataAge} hours old.`);
        }
        else{
            this.setState({
            current: 'Todos',
            dataSourceUsers: [
                {
                    key: '1',
                    name: 'Mike',
                    email: 'Mike@gmail.com',
                },
            ],
            dataSourceTodo: [            
                {
                    key: '1',
                    activity: 'Should wash clothes',
                    status: 'pending',
                },
            ],
        })
        }

    }




    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('todoData', JSON.stringify(nextState.dataSourceTodo));
        localStorage.setItem('userData', JSON.stringify(nextState.dataSourceUsers));
        localStorage.setItem('curTab', JSON.stringify(nextState.current))
        localStorage.setItem('storringTime', Date.now());
    }
    

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        

        const columnsTodo = this.columnsTodo.map(col => {
            // console.log(col);
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
            // console.log(inputType); this throws an error => Input type not defined.
        });


        const columnsUsers = this.columnsUsers.map(col => {
            // console.log(col);
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing1(record),
                }),
            };
            // console.log(inputType); this throws an error => Input type not defined.
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
                <Modal 
                    title={"Add New "+this.state.current} 
                    visible={this.state.visible}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.isLoading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
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
                        <Table
                            components={components}
                            bordered
                            rowKey={this.state.id} 
                            dataSource={this.state.dataSourceTodo}
                            columns={columnsTodo}
                            rowClassName={() => 'editable-row'}
                            pagination={{
                                onChange: this.cancel,
                            }}
                        />
                    :
                        <Table 
                            components={components} 
                            bordered
                            rowKey={this.state.id} 
                            dataSource={this.state.dataSourceUsers} 
                            columns={columnsUsers} 
                            bordered 
                            rowClassName="editable-row" 
                            pagination={{
                                onChange: this.cancel1,
                            }}
                        />
                }
                </EditableContext.Provider>
            </div>
        )
    }
}

const EditableFormTable = Form.create()(App);

export default EditableFormTable;