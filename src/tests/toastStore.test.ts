import { describe, it, expect, beforeEach } from 'vitest';
import { useToastStore } from '../store/toastStore';

describe('toastStore', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('adds a toast with default type info', () => {
    useToastStore.getState().addToast('Hello');
    const state = useToastStore.getState();
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].type).toBe('info');
    expect(state.toasts[0].message).toBe('Hello');
  });

  it('adds a success toast', () => {
    useToastStore.getState().addToast('Done', 'success');
    const state = useToastStore.getState();
    expect(state.toasts[0].type).toBe('success');
  });

  it('adds an error toast', () => {
    useToastStore.getState().addToast('Failed', 'error');
    const state = useToastStore.getState();
    expect(state.toasts[0].type).toBe('error');
  });

  it('removes a toast by id', () => {
    useToastStore.getState().addToast('Test');
    const state = useToastStore.getState();
    const id = state.toasts[0].id;
    useToastStore.getState().removeToast(id);
    const stateAfter = useToastStore.getState();
    expect(stateAfter.toasts).toHaveLength(0);
  });

  it('does not remove unrelated toasts', () => {
    useToastStore.getState().addToast('First');
    useToastStore.getState().addToast('Second');
    const state = useToastStore.getState();
    const id = state.toasts[0].id;
    useToastStore.getState().removeToast(id);
    const stateAfter = useToastStore.getState();
    expect(stateAfter.toasts).toHaveLength(1);
    expect(stateAfter.toasts[0].message).toBe('Second');
  });
});
