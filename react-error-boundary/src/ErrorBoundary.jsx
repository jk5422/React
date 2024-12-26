import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const FallbackComponent = ({ error, resetErrorBoundary }) => (
    <div>
        <h1>Something went wrong!</h1>
        <p>Error: {error.message}</p>
        <button onClick={resetErrorBoundary}>Retry</button>
    </div>
);

const MyErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary
            FallbackComponent={FallbackComponent}
            onError={(error, info) => console.error("Error:", error, info)}
        >
            {children}
        </ErrorBoundary>
    );
};

export default MyErrorBoundary;
