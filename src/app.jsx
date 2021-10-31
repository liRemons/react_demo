import { observer } from 'mobx-react';
import React from 'react';
import store from './store';

@observer
export default class App extends React.Component {
  render() {
    return <>
      {store.total}
      {store.price}
      <br />
      <button onClick={() => store.changePrice()}>+</button>
    </>
  }
}