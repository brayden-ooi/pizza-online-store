import React from "react";

import ErrorContainer from "../error-container/error-container.component";


class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorContainer />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;