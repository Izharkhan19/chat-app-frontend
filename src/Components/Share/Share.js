import React, { useState } from "react";
import ShareModel from "./ShareModel";
import Button from "react-bootstrap/esm/Button";
import { Dropdown, Card, Container } from "react-bootstrap/esm";
import googleImage from "../../assets/googleImage.jpg";
import ShareButton from "./CommonShareButton";
import ShareComponent from "./CommonShareButton";

const Share = () => {
  const [modalShow, setModalShow] = useState(false);
  const shareUrl = "https://your-website.com";
  const shareTitle = "Check out this awesome website!";
  const demoImageUrl = "https://example.com/demo-image.jpg";

  const imageUrl = "https://example.com/image.jpg";
  const linkUrl = "https://example.com";
  const title = "Example Title";

  return (
    <>
      <Container className="mt-5">
        <Card style={{ backgroundColor: "gray" }}>
          <Card.Header>Share Tutorial</Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={googleImage} />
              <Card.Body>
                <Card.Text>
                  <div className="d-flex">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Share with...
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setModalShow(true)}>
                          Share with...
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Button className="mx-2" onClick={() => setModalShow(true)}>
                      Share with...
                    </Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
            <div className="px-5">
              <ShareComponent
                imageUrl={"https://www.google.com/"}
                linkUrl={"https://www.google.com/"}
                title={""}
              />
            </div>
          </Card.Body>
        </Card>
      </Container>
      {modalShow && (
        <ShareModel
          googleImage={"https://www.google.com/"}
          show={"https://www.google.com/"}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
};

export default Share;
