import React,{Component} from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody,Form,FormGroup,Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {update,loadUser} from '../../action/authActions';
import {clearErrors}  from '../../action/errorActions';


class EditModal extends Component{
    
    state={
        modal:false,   // modal for adding item is false initially
        name:'',
        email:'',
        password:'',
        msg:null,
        isUpdate:false
    };
    componentDidMount(){
        const {name,email}=this.props.user;
        this.setState({name:name,email:email});
    }
    componentDidUpdate(prevProps){
        const {error,isUpdate}=this.props;
        if(error!==prevProps.error){
            if(error.id==="UPDATE_FAIL"){
                this.setState({msg:error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }
        // if Update close Modal
        if(this.state.modal){
            
            if(isUpdate){
                this.toggle();
                this.props.loadUser();
            }
        }
        
    }
    static propTypes={
        isUpdate:PropTypes.bool,
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        register:PropTypes.func.isRequired,
        clearErrors:PropTypes.func.isRequired
    }

    toggle=()=>{  
        // clear the error
        this.props.clearErrors();
        // to toggle the modal 
        console.log("from Toggle-> Modal Open:: "+this.state.modal)
        this.setState({
            modal:!this.state.modal
        })
    }


    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    // On Submit  method 
    onSubmit=e=>{
        const {error,isUpdate}=this.props;
        console.log("From Submit-> isUpdate:: "+this.props.isUpdate)
        e.preventDefault();
        const id=this.props.user._id;
        console.log("User Id Given for Update: "+id)
        const {name,email}=this.state;
        const editUser={
            id,name,email
        }
        this.props.update(editUser);

        // this.props.addItem(newItem);
   
        
    }

render(){
    const {name,email}=this.props.user;
    return(
        <div>
            <Button onClick={this.toggle} style={{}}>
               Edit
            </Button>

            <Modal isOpen={this.state.modal}  >
                <ModalHeader toggle={this.toggle}>Update</ModalHeader>
                <ModalBody>
    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder={name}
                                onChange={this.onChange}
                            />
                            <Label for="email">Email</Label>
                            <Input 
                                type="email"
                                name="email"
                                id="email"
                                placeholder={email}
                                onChange={this.onChange}
                            />
                            
                            <Button color="dark" style={{marginTop:'2rem'}} block>

                            Update</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

            </Modal>
        </div>
    );
}
}
const mapStateToProps= state=>{
    return({
        isUpdate:state.auth.isUpdate,
        isAuthenticated:state.auth.isAuthenticated,
        user:state.auth.user,
        error:state.error
    })
}


export default connect(mapStateToProps,{update,loadUser,clearErrors})(EditModal);