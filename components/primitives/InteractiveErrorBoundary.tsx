'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  unitId?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class InteractiveErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (typeof window !== 'undefined') {
      const detail = `[InteractiveErrorBoundary] ${this.props.unitId ?? 'unknown'} — ${error.message}`;
      // 의도적 console.error: 인터랙티브 폭주는 단원 작성자에게 알림
      console.error(detail, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-xl border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950 p-6">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
              인터랙티브 표시 중 문제가 생겼어요
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300">
              페이지를 새로고침해 보거나, 잠시 후 다시 시도해 주세요.
            </p>
            {this.state.error?.message ? (
              <pre className="mt-3 text-xs font-mono text-red-700/80 dark:text-red-300/80 whitespace-pre-wrap">
                {this.state.error.message}
              </pre>
            ) : null}
          </div>
        )
      );
    }
    return this.props.children;
  }
}
