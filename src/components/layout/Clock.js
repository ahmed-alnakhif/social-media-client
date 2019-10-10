import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }
  componentWillMount(){
    this.setState({
        hour: '00',
        minute: '00',
        second: '00'
      });
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      d = new Date();

    let day = d.getDate().toLocaleString();
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();
    let hour = new Date().getHours().toLocaleString();
    let minute = new Date().getMinutes().toLocaleString();
    let second = new Date().getSeconds().toLocaleString();

    if (day < 10) {
      day = `0${day}`;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }

    this.setState({
      day: day,
      month: month,
      year: year,
      hour: hour,
      minute: minute,
      second: second
    });
  }
  render() {
    return (
      <div class="clock">
        <div class="date">
          {this.state.month} {this.state.day}, {this.state.year}{" "}
        </div>
        <div class="time">
          <span class="hour">{this.state.hour}</span>:
          <span class="minute">{this.state.minute}</span>:
          <span class="second">{this.state.second}</span>
        </div>
      </div>
    );
  }
}

export default Clock;
