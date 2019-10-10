import React, { Component } from "react";
import * as Video  from '../background.mp4';

export class landingpage extends Component {
    constructor(props){
        super(props);
        this.state={
          videoURL: 'https://www.youtube.com/watch?v=hPCotoawhk0'
        }
      }
  render() {
    return (
      <div style={{margin:'auto'}}> 
        <h1>Landing Page</h1>
        <video id="background-video" loop autoPlay>
          <source src={Video} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}

export default landingpage;
