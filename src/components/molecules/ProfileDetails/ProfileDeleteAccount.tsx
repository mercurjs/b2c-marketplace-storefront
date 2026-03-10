'use client';

import { useState } from 'react';

import { HttpTypes } from '@medusajs/types';
import { Heading } from '@medusajs/ui';

import { Button, Card, Divider } from '@/components/atoms';
import { LabeledInput } from '@/components/cells';
import { deleteCustomer } from '@/lib/data/customer';

import { Modal } from '../Modal/Modal';

export const ProfileDeleteAccount = ({ user }: { user: HttpTypes.StoreCustomer }) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await deleteCustomer(user.email, password);

    setLoading(false);

    if (result && !result.success) {
      setError(result.error || 'Something went wrong');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setPassword('');
    setError(null);
  };

  return (
    <>
      <Card
        className="mt-8 flex items-center justify-between bg-secondary p-4"
        data-testid="delete-account-header"
      >
        <Heading
          level="h2"
          className="heading-sm uppercase"
          data-testid="delete-account-heading"
        >
          Delete account
        </Heading>
      </Card>
      <Card
        className="p-4"
        data-testid="delete-account-info"
      >
        <p
          className="label-md mb-4 text-secondary xl:max-w-[456px]"
          data-testid="delete-account-description"
        >
          By deleting your account, you will lose your account data. Once you delete your account,
          this information cannot be recovered.
        </p>
        <Button
          variant="destructive"
          onClick={() => setShowModal(true)}
          data-testid="delete-account-button"
          aria-label="Delete account"
        >
          Delete account
        </Button>
      </Card>
      {showModal && (
        <Modal
          heading="Delete account"
          onClose={handleClose}
          data-testid="delete-account-modal"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-testid="delete-account-form"
          >
            <div className="px-4">
              <LabeledInput
                label="Password"
                type="password"
                placeholder="Enter your password to continue..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={error ? { message: error, type: 'manual' } : undefined}
                data-testid="delete-account-password-input"
                aria-label="Password"
                aria-required="true"
              />
            </div>
            <Divider />
            <div className="px-4">
              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
                data-testid="delete-account-confirm-button"
                aria-label="Confirm account deletion"
              >
                Delete account
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
