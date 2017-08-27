import React from 'react';
import styles from '../styles';

const List = (props) => (
  <ol style={ styles.ol }>
    <li>list entry in list item</li>
  </ol>
);

export default List;

//button on click, use index value when mapping, and use that index
//to refer to the database entry/response from the request 