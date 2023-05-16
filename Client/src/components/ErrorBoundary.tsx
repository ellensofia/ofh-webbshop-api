import { Component, ReactNode } from "react";
import PageNotFound from "./PageNotFound";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    console.log("error was caught");
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <PageNotFound />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
