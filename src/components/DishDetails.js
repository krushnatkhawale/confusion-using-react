import React from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Form, Label, Col, Row, Button} from 'reactstrap';


function RenderDish({dish}){
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <=len);
const minLength = (len) => (val) => !(val) || (val.length >=len);

class RenderComments extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            comments: props.comments,
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal(){
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmitComment(values){
        console.log("Current state is: ", values);
        alert("Current state is: " + JSON.stringify(values));
        this.toggleModal();
    }

    render() {
        if(this.state.comments){
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                    { 
                        this.state.comments.map((comment)=>{
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))})</p>
                            </li>
                            ); 
                        })
                    } 
                    </ul>  
                    <button className="btn btn-outline-secondary" 
                        onClick={this.toggleModal}> <i className="fa fa-pencil"></i> Submit comment</button>         
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={10}>
                                        <Control.select model=".rating"
                                            className="form-control"
                                            name="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".name" id="name" name="name" 
                                            placeholder="Name" className="form-control"
                                            validators={{ required, minLength: minLength(3), maxLength: maxLength(15)}}
                                            />
                                        <Errors className="text-danger"
                                            model=".name" show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={2}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea rows={6} className="form-control"
                                            model=".comment" id="comment" name="comment"
                                        />
                                    </Col>
                                </Row>
                                <Row className="formgroup">
                                    <Col md={{ size: 10, offset: 2}}>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

const DishDetails = ({dish, comments}) =>{
    if(dish){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={dish}/>
                    <RenderComments comments={comments} />
                </div>
            </div>
        );
    } else {
        return (<div></div>);
    }
}
export default DishDetails ;