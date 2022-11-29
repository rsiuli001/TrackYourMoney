import { debounce } from 'lodash';
import { GestureResponderEvent } from 'react-native';

export function debouncePress(
  f: (e?: GestureResponderEvent) => void
): (e?: GestureResponderEvent) => void {
  if (!(f as any).debounced) {
    (f as any).debounced = debounce(f, 500, { leading: true, trailing: false });
  }

  return (f as any).debounced;
}

export function debounceEvent<E>(f: (e: E) => void, wait: number = 500): (e: E) => void {
  if (!(f as any).debounced) {
    (f as any).debounced = debounce(f, wait, { leading: true, trailing: false });
  }
  return (f as any).debounced;
}
