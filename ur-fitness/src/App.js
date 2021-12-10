import './App.css';
import React,{useState} from "react"
import { Form,Col,Row,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [popupshow,setPopupShow] = useState(false)
  const [popupmessage,setPopupmsg] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    let member_payload = {
      "gender": document.querySelector('.gender_input input:checked').value,
      "height": event.target.elements.member_Height.value,
      "weight":event.target.elements.member_Weight.value,
      "foodPreference":document.querySelector('.food_input input:checked').value,
      "package": document.querySelector('.package_input input:checked').value,
      "user":{
              "fullName":event.target.elements.member_Name.value,
              "address":event.target.elements.member_Address.value,
              "mobileNumber":event.target.elements.member_Number.value,
              "emailAddress":event.target.elements.member_Email.value
            } 
    }

    fetch(`http://localhost:5000/api/v1/authenticate/1`,{
      method: "POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"username":"admin","password":"admin"})
    }).then(function(token_response){
      return token_response.json()
    }).then(function(token_data){
      if(token_data.jwtToken !== ""){
        fetch(`http://localhost:5000/api/v1/users/user-info`,{
          method: "POST",
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(member_payload)
        })
        .then(function(response){
          return response.json()
        })
        .then(function(data){
          if(data.userInfoId !== ""){
            setPopupShow(true)
            setPopupmsg("The user has been added.")
          }
        })
        .catch(function(error){
          setPopupShow(true)
          setPopupmsg("There is some technical error.Please try again later.")
        })
      }
    })
    .catch(function(token_error){
      setPopupShow(true)
      setPopupmsg("There is some technical error.Please try again later.")
    })

    console.log(member_payload)

    }

    const hide_popup = (event) => {
      setPopupShow(false)
      setPopupmsg("")
    }

  return (
    <div className="App">
      <header className="App-header">
          <h2>UR Membership Form</h2>
      </header>
      <div className="membership_form">
      <Form onSubmit={(e) => { handleSubmit(e) }}>
        <Form.Group as={Row} className="mb-3" controlId="member_Name">
          <Form.Label column sm="4">
            Full Name
          </Form.Label>
          <Col sm="8">
            <Form.Control required type="text" placeholder="Full name" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="member_Email">
          <Form.Label column sm="4">
            Email
          </Form.Label>
          <Col sm="8">
            <Form.Control required type="email" placeholder="Email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="member_Number">
          <Form.Label column sm="4">
            Phone Number
          </Form.Label>
          <Col sm="8">
            <Form.Control required type="text" placeholder="Phone Number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="member_Address">
          <Form.Label column sm="4">
            Address
          </Form.Label>
          <Col sm="8">
            <Form.Control required type="text" placeholder="address" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 packages" controlId="member_Gender">
          <Form.Label column sm="4">
            Gender
          </Form.Label>
          <Form.Check className="gender_input"
            required 
            inline
            name="gender"
            type="radio"
            id="Male"
            value="Male"
            label="Male"
          />
          <Form.Check className="gender_input"
            required
            inline 
            name="gender"
            type="radio"
            id="Female"
            value="Female"
            label="Female"
          />
          <Form.Check className="gender_input"
            required 
            inline
            name="gender"
            type="radio"
            id="Other"
            value="Other"
            label="Other"
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="member_Height">
          <Form.Label column sm="4">
          Height
          </Form.Label>
          <Col sm="8">
            <Form.Control required type="number" placeholder="Height" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="member_Weight">
          <Form.Label column sm="4">
          Weight
          </Form.Label>
          <Col sm="8">
            <Form.Control required type="number" placeholder="Weight" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 packages" controlId="member_Food">
          <Form.Label column sm="4">
            Food Preference
          </Form.Label>
          <Form.Check className="food_input"
            required 
            inline
            name="food_pref"
            type="radio"
            id="Veg"
            value="Veg"
            label="Veg"
          />
          <Form.Check className="food_input"
            required
            inline 
            name="food_pref"
            type="radio"
            id="Non Veg"
            value="Non Veg"
            label="Non Veg"
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3 packages" controlId="member_Packages">
          <Form.Label column sm="4">
            Package
          </Form.Label>
          <Form.Check className="package_input"
            required 
            inline
            name="group1"
            type="radio"
            id="Gold"
            value="Gold"
            label="Gold"
          />
          <Form.Check className="package_input"
            required
            inline 
            name="group1"
            type="radio"
            id="Silver"
            value="Silver"
            label="Silver"
          />
          <Form.Check className="package_input"
            required 
            inline
            name="group1"
            type="radio"
            id="Platinum"
            value="Platinum"
            label="Platinum"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
      {popupshow && popupmessage !== "" ? [
        <div className="membership_success">
          <div className='popup_content'>
            <p>{popupmessage}</p>
            <span onClick={(e) => { hide_popup(e) }}>X</span>
          </div>
        </div>
      ]:[''] }
    </div>
  );
}

export default App;
