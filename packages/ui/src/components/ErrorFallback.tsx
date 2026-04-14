import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  title?: string;
  message?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  title = '加载失败',
  message = '模块加载出现问题，请稍后重试',
}) => {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{message}</p>
        {error && (
          <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-32">
            {error.message}
          </pre>
        )}
        {resetErrorBoundary && (
          <Button onClick={resetErrorBoundary} variant="outline">
            重试
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorFallback;
