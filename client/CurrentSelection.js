import React from 'react';

export class CurrentSelection extends React.Component {
  render() {
    return (
      <section id="current-selection">
        <div>{this.props.title}</div>
      </section>
    );
  }
}
