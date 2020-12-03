import React, { Component } from "react";

class AddPost extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       content: "",
    //     };
    //   }
      
      updateContent = (content) => {
        this.setState({
          content: {
            value: content,
          },
        });
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
    
        const { content } = e.target;
        const post = {
          content: content.value,
        };
    
        const url = "";
    
        fetch(url, {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) {
              return res.json().then((error) => {
                throw error;
              });
            }
            return res.json();
          })
          .then((data) => {
            // this.props.updateNote(data);
            alert('Post added!');
            window.location = '/forum'
          })
    
          .catch((error) => {
            // this.setState({ appError: error });
          });
      };
    

    render() {
        return (
            <section className="live-chat" id="live-chat">
                <h2>Live Chat</h2>
                <h4>Larry-carib wrote:</h4>
                <p className="lorem">"Too much trash! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                <div>
                    <label htmlFor="reply">Reply:</label>
                </div>
                <div className="post-area">
                    <textarea id="reply" value="" placeholder="type here"></textarea>
                    <br />
                    <button type="submit" id="submit-reply">Send</button>
                </div>
            </section>
        );
    }
}

export default AddPost;