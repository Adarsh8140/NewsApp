import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import "./App.css";
import { useState } from "react";
// import Home from "./components/home";
// import About from "./components/about";
// import Sports from "./components/sports";
// import Search from "./components/search";
// import Navbar_page from "./components/navbar_page";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState([]);

  const getData = async () => {
    let object = await fetch(
      `https://inshortsapi.vercel.app/news?category=${keyword}`
    );
    let convertedData = await object.json();
    console.log(convertedData.data);
    setTracks(convertedData.data);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">News App</Navbar.Brand>
          {/* <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Sports" element={<Sports />} />
            </Routes>
          </BrowserRouter> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Form.Control
                value={keyword}
                onChange={(event) => {
                  setKeyword(event.target.value);
                }}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button onClick={getData} variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Row>
          {tracks.map((item) => (
            <Col key={item.id} lg={4} md={6} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={item.imageUrl}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.content}</Card.Text>
                  <Card.Text>
                    Date: {item.date} | {item.time}
                  </Card.Text>
                  <Card.Text>Author: {item.author}</Card.Text>
                  <Button
                    variant="outline-primary"
                    href={item.readMoreUrl}
                    target="blank"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
