import React, { Component } from 'react';
import { Modal, Divider, Button, Table, Menu, Icon } from 'antd';
import './App.css';




export default class App extends Component {

    state = {
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
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>Edit {record.name}</a>
                        <Divider type="vertical" />
                        <a>Delete</a>
                    </span>
                ),
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
                render: (props) => {
                    return(
                        <>
                            <span>
                                <a>Edit</a>
                                <Divider type="vertical" />
                                <a onClick={() => {console.log(props)}}>Delete</a>
                            </span>
                        </>
                    )
                },
            },
        ],
        dataSourceTodo: [            
            {
                key: '3',
                activity: 'Should wash clothes',
                status: 'pending',
            },
            {
                key: '4',
                activity: 'Run For 5km in the morning',
                status: 'completed',
            },
        ],
    };



    onItemClick = (key) => {
        console.log('click onItemClick',key);
    };


    // onRowClick = (record) => {
    //     console.log('click onRowClick',record);
    //     return {
    //         onDoubleClick: () => {
    //             // popup a promt;
    //             alert('Clicking');
    //         },
    //     };
    // };


    handleClick = e => {
        // console.log('click ', e);
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
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

    render() {
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
				
				<Button onClick={this.showModal}>Add {this.state.current}</Button>
				<Modal title={"Add New "+this.state.current} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    {   
                        this.state.current === 'Todos' ?
                        <>
                        <input type='text' placeholder="TODO ACTIVITY FIELD" />
                        <br/><br/><hr/><br/>
                        <input type='text' placeholder="TODO STATUS FIELD" />
                        </>
                        :
                        <>
                        <input type='text' placeholder="USERS NAME FIELD" />
                        <br/><hr/><br/><br/>
                        <input type='text' placeholder="USERS EMAIL FIELD" />
                        </>
                    }

				</Modal>
                {   
                    this.state.current === 'Todos' ?

                    <Table dataSource={this.state.dataSourceTodo} columns={this.state.columnsTodo} /> :

                    <Table dataSource={this.state.dataSourceUsers} columns={this.state.columnsUsers} />
                } 

            </div>
        )
    }
}

