import React, { Component } from "react";
import User from "./User";

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      secondsVisible: 0,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;
      this.setState({
        secondsVisible: secondsVisible + 1,
      });
    }, 1000);
  }
  componentDidUpdate() {
    //executado após toda invocação de render() e  útil para aplicaçao de "efeitos colaterais"
    console.log("componentDidUpdate de Users.js");
  }
  componentWillUnmount() {
    //vazamento de memória: nao pode fazer uma mudança de estado de um componente que foi desmontado (retirado do) no DOM.
    clearInterval(this.interval);
  }
  render() {
    const { users } = this.props;
    const { secondsVisible } = this.state;
    return (
      <div>
        <p>Componente Users visíveis por {secondsVisible} segundos</p>
        <ul>
          {users.map((user) => {
            const { login } = user;
            return (
              <li key={login.uuid}>
                <User user={user} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
