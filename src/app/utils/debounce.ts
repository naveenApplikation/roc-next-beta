// utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
  
    return function (...args: Parameters<T>): void {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  