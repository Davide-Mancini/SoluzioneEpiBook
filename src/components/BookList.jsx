import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selected: false,
    asin: "",
    comments: [],
    isLoading: true,
    isError: false,
  };

  changeState = (newAsin, newComment) => {
    console.log(newAsin);
    this.setState({
      selected: true,
      asin: newAsin,
      comments: newComment,
    });
  };

  // componentDidUpdate() {
  //   oneComment = (newComment) => {
  //     this.setState({
  //       comments: newComment,
  //     });
  //   };
  // }
  render() {
    return (
      <>
        <Row>
          <Col xs={12} md={6}>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={4} className="text-center">
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Cerca un libro"
                    value={this.state.searchQuery}
                    onChange={(e) =>
                      this.setState({ searchQuery: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              {this.props.books
                .filter((b) =>
                  b.title.toLowerCase().includes(this.state.searchQuery)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      changeState={this.changeState}
                      asin={this.state.asin}
                      selected={this.state.asin === b.asin}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <CommentArea
              asin={this.state.asin}
              selected={this.state.selected}
              // newComment={this.changeState()}
            />
          </Col>
        </Row>
        {this.state.selected && <CommentArea asin={this.state.asin} />}
      </>
    );
  }
}

export default BookList;
