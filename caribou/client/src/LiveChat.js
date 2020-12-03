import React, { Component } from "react";
import AddPost from "./AddPost";

class LiveChat extends Component {
    render() {
        return (
            <div>
                <AddPost 
                // updatePost={this.props.updatePost} 
                />
            </div>
        );
    }
}
export default LiveChat;