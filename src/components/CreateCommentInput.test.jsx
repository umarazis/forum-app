/**
 * skenario testing
 *
 * - CreateCommentInput component
 *   - should handle comment typing correctly
 *   - should call createComment function when kirim button is clicked
 */
import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CreateCommentInput from './CreateCommentInput';

expect.extend(matchers);

describe('CreateCommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle comment typing correctly', async () => {
    // Arrange
    render(<CreateCommentInput createComment={() => {}} />);
    const commentInput = await screen.getByPlaceholderText('Masukkan komentar kamu');

    // Action
    await userEvent.type(commentInput, 'commenttest');

    // Assert
    expect(commentInput).toHaveValue('commenttest');
  });

  it('should call createComment function when kirim button is clicked', async () => {
    // Arrange
    const mockCreateComment = vi.fn();
    render(<CreateCommentInput createComment={mockCreateComment} />);
    const commentInput = await screen.getByPlaceholderText('Masukkan komentar kamu');
    await userEvent.type(commentInput, 'commenttest');
    const submitButton = await screen.getByRole('button', { name: 'Kirim' });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockCreateComment).toBeCalledWith('commenttest');
    expect(commentInput.value).toBe('');
  });
});
