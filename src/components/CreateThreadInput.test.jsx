/**
 * skenario testing
 *
 * - CreateThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call createThread function when kirim button is clicked
 */
import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CreateThreadInput from './CreateThreadInput';

expect.extend(matchers);

describe('CreateThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<CreateThreadInput createThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Judul');

    // Action
    await userEvent.type(titleInput, 'titletest');

    // Assert
    expect(titleInput).toHaveValue('titletest');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<CreateThreadInput createThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Kategori');

    // Action
    await userEvent.type(categoryInput, 'categorytest');

    // Assert
    expect(categoryInput).toHaveValue('categorytest');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<CreateThreadInput createThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Isi thread kamu');

    // Action
    await userEvent.type(bodyInput, 'bodytest');

    // Assert
    expect(bodyInput).toHaveValue('bodytest');
  });

  it('should call createThread function when kirim button is clicked', async () => {
    // Arrange
    const mockCreateThread = vi.fn();
    render(<CreateThreadInput createThread={mockCreateThread} />);
    const titleInput = await screen.getByPlaceholderText('Judul');
    await userEvent.type(titleInput, 'titletest');
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    await userEvent.type(categoryInput, 'categorytest');
    const bodyInput = await screen.getByPlaceholderText('Isi thread kamu');
    await userEvent.type(bodyInput, 'bodytest');
    const submitButton = await screen.getByRole('button', { name: 'Kirim' });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockCreateThread).toBeCalledWith('titletest', 'bodytest', 'categorytest');
    expect(titleInput.value).toBe('');
    expect(categoryInput.value).toBe('');
    expect(bodyInput.value).toBe('');
  });
});
