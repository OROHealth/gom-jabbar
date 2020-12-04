import React, { Component } from "react";
import AddPost from "./AddPost";

class LiveChat extends Component {
    render() {
        return (
            <div>
                <AddPost
                    addPost={this.props.addPost}
                />
            </div>
        );
    }
}
export default LiveChat;