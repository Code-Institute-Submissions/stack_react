import React from 'react'
import '../../customcss/questions.css';
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';

function DeleteQuestion() {
    const currentUser = useCurrentUser()
    const history = useNavigate();
    const params = useParams();

    const handleDelete = async() => {
        try {
          await axiosReq.delete(`https://stack-drf-api.herokuapp.com/questions/${params.id}`)
          .then(history('/questions'));
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className='mt-5 pt-5 parentdivmargin'>
        {currentUser ?
        <>
          <h1>Are you sure you want to delete this question?</h1>
          <br/>
            <Row>
              <Col><Link className='unstylelinkbutton m-0' to={`/questions/${params.id}/edit`}><Button variant='success' type="submit">No, take me back to safety!</Button></Link></Col>
              <Col><Button variant='danger' onClick={handleDelete}>Yes, I'm certain, please continue.</Button></Col>
            </Row>
          </>
          :
          <h1>You're not authorised to use this page.</h1>        
        }
    </div>
  )
}

export default DeleteQuestion