import '../../customcss/profiles.css';
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from '../../api/axiosDefaults';


function EditProfileForm(props) {
  let customError = '';
  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
  });
  const { name, bio } = profileData;
  const history = useNavigate();
  const params = useParams();

  useEffect(() => {
    const handleMount = async () => {
        try {
            const { data } = await axiosReq.get(`https://stack-drf-api.herokuapp.com/profiles/${params.id}`);
            const { name, bio } = data;

            setProfileData({ name, bio })

        } catch (err) {
            console.log(err);
        }
    };

    handleMount();
  }, [history, params]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (customError) {
      event.preventDefault();
    } else {
      event.preventDefault();
      const formData = new FormData();
  
      formData.append("name", name);
      formData.append("bio", bio);
  
      try {
        await axiosReq.put(`https://stack-drf-api.herokuapp.com/profiles/${params.id}`, formData)
        .then(history('/myprofile'));
        } catch (err) {
          if (err.response?.status !== 401) {
              setErrors(err.response?.data);
              console.log(errors)
          }
      }
    } 
  };

  return(
    <div className='parentdivmargin mt-5 left'>

      <h1>Edit Profile</h1>

      <br/>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
        {name.length > 100 ? customError = <Alert variant='warning'>Summary must be less than 100 characters, please resolve or you will be unable to submit</Alert> : null}

        <br/>

        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control 
            as='textarea'
            rows={5}
            type="text"
            name="bio"
            value={bio}
            onChange={handleChange}
          />
        </Form.Group>        

        <br/>
        
        <Button variant="success" type="submit">Submit</Button>
      </Form>

    </div>
  )
};

export default EditProfileForm;