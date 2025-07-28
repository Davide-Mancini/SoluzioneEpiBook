import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };
  oneComment = () => {};

  componentDidMount = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3ODM0ZTEyODg5NzAwMTVmMjdiZDMiLCJpYXQiOjE3NTM3MTE0MzgsImV4cCI6MTc1NDkyMTAzOH0.9fA1IhCYWya9ZC24nGjU3Lb76oCIA3tJyZo7h9Cijn0",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        console.log(comments);
        this.setState({
          comments: comments[0].comment,
          isLoading: false,
          isError: false,
        });
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        {/* <CommentList commentsToShow={this.state.comments} /> */}
      </div>
    );
  }
}

export default CommentArea;
