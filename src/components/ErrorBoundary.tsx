import React, { Component, ErrorInfo, ReactNode } from 'react';
import squareLogo from '../assets/logo 1-1 black.png';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
          <img 
            src={squareLogo} 
            alt="Logo" 
            className="w-32 h-32 mb-8 opacity-50 object-contain"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Oops!</h1>
          <p className="text-xl md:text-2xl text-white/70 mb-4 text-center">
            Something went wrong
          </p>
          <p className="text-sm text-white/50 mb-8 max-w-md text-center">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
