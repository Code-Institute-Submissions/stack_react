import '../../customcss/answers.css';
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';


function EditAnswerForm() {
  const currentUser = useCurrentUser()
  const params = useParams();
  let customError = '';
  const question = params.question_id;
  const [errors, setErrors] = useState({});
  console.log(question);
  const [answerData, setAnswerData] = useState({
    answer: "",
  });
  const { answer } = answerData;
  const history = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
        try {
            const { data } = await axiosReq.get(`https://stack-drf-api.herokuapp.com/answers/${params.id}`);
            const { answer } = data;

            setAnswerData({ answer })

        } catch (err) {
            console.log(err);
        }
    };

    handleMount();
  }, [history, params]);

  const handleChange = (event) => {
    setAnswerData({
      ...answerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (customError) {
      event.preventDefault();
    } else {
      event.preventDefault(); 
      const formData = new FormData();
  
      formData.append("question", question);
      formData.append("answer", answer);
  
      try {
        await axiosReq.put(`https://stack-drf-api.herokuapp.com/answers/${params.id}`, formData)
        .then(history(`/answers/${params.id}`));
        
      } catch (err) {
          if (err.response?.status !== 401) {
              setErrors(err.response?.data);
              console.log(errors);
          }
      }
    }
  };

  return(
    <div className='parentdivmargin mt-5'>

    {!currentUser ? 
      customError = 
        <Alert variant='danger'>
          You aren't authorised to edit this answer.
        </Alert>
      : null }

      <h1>Edit your answer.</h1>

      <br/>
      
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          {!currentUser ?
              <>
                <Form.Control 
                  disabled
                  as="textarea"
                  rows={10}
                  required
                  type="text"
                  name="answer"
                  value={answer}
                  onChange={handleChange}
                />
              </>
              :
              <>
                <Form.Control 
                  as="textarea"
                  rows={10}
                  required
                  type="text"
                  name="answer"
                  value={answer}
                  onChange={handleChange}
                />
              </>       
            }

        </Form.Group>
        {answer.length === 0 ? customError = <Alert variant='warning'>You can't leave this field empty, please resolve or you will be unable to submit</Alert> : null}

        <br/>

        <Row>
          <Col md={6}><Button variant='success' type="submit">Submit</Button></Col>
          <Col md={6}><Link className='unstylelinkbutton m-0' to={`/answers/${params.question_id}/${params.id}/delete/${params.owner}`}><Button variant='danger'>Delete</Button></Link></Col>
        </Row>
      </Form>

    </div>
  )
};

export default EditAnswerForm;