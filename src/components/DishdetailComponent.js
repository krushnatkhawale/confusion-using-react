import React, { Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishdetailComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            details: props.details
        };
    }

    renderDish(dish){
        return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
        );
    }

    renderComments(dish){
        const comments = dish.comments.map((comment)=>{
            return(<div key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {comment.date}</p>
            </div>)
        });
        return comments;
    }

    render(){
        if(this.state.details!=null){
            let dish = this.state.details;
            
            const comments = this.renderComments(dish);
            const dishDetails = this.renderDish(dish);
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        { dishDetails }
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        { comments }
                    </div>    
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}
export default DishdetailComponent ;