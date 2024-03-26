/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should handle confirm password typing correctly
 *   - should call warning toast when password is less than 6 character
 *   - should call warning toast when confirm password is not similar with password
 *   - should call register function when register button is clicked
 */
import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { toast } from 'react-toastify';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

const fakeCredential = {
  name: 'nametest',
  email: 'test@mail.com',
  password: 'passwordtest',
};

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // Action
    await userEvent.type(nameInput, fakeCredential.name);

    // Assert
    expect(nameInput).toHaveValue(fakeCredential.name);
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, fakeCredential.email);

    // Assert
    expect(emailInput).toHaveValue(fakeCredential.email);
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, fakeCredential.password);

    // Assert
    expect(passwordInput).toHaveValue(fakeCredential.password);
  });

  it('should handle confirm password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');

    // Action
    await userEvent.type(confirmPasswordInput, fakeCredential.password);

    // Assert
    expect(confirmPasswordInput).toHaveValue(fakeCredential.password);
  });

  it('should call warning toast when password is less than 6 character', async () => {
    // Arrange
    const mockRegister = vi.fn();
    // mock toast
    toast.warn = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, fakeCredential.name);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, fakeCredential.email);
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'pass');
    const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');
    await userEvent.type(confirmPasswordInput, 'pass');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(toast.warn).toBeCalledWith('Password harus lebih dari 6 karakter');
  });

  it('should call warning toast when confirm password is not similar with password', async () => {
    // Arrange
    const mockRegister = vi.fn();
    // mock toast
    toast.warn = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, fakeCredential.name);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, fakeCredential.email);
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, fakeCredential.password);
    const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');
    await userEvent.type(confirmPasswordInput, 'confirm password');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(toast.warn).toBeCalledWith('Password dan confirm password harus sama');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, fakeCredential.name);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, fakeCredential.email);
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, fakeCredential.password);
    const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');
    await userEvent.type(confirmPasswordInput, fakeCredential.password);
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith(fakeCredential);
  });
});
