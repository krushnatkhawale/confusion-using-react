import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


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

function RenderComments(props){

    if(props.comments){
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                { 
                    props.comments.map((comment)=>{
                    return (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))})</p>
                        </li>
                        ); 
                    })
                } 
                </ul>           
            </div>
        );
    } else {
        return (<div></div>);
    }
}

const DishDetails = ({dish}) =>{
    if(dish){
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={dish}/>
                    <RenderComments comments={dish.comments} />
                </div>
            </div>
        );
    } else {
        return (<div></div>);
    }
}
export default DishDetails ;