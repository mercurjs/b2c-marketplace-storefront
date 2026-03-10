'use client';

import { useState } from 'react';

import { PencilSquare } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { Divider, Heading } from '@medusajs/ui';

import { Avatar, Button, Card } from '@/components/atoms';

import { Modal } from '../Modal/Modal';
import { ProfileDetailsForm } from '../ProfileDetailsForm/ProfileDetailsForm';

type CustomerFile = {
  id: string;
  url: string;
};

type CustomerWithFile = HttpTypes.StoreCustomer & {
  file?: CustomerFile | null;
};

export const ProfileDetails = ({ user }: { user: CustomerWithFile }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Card
        className="flex items-center justify-between bg-secondary p-4"
        data-testid="profile-details-header"
      >
        <Heading
          level="h2"
          className="heading-sm uppercase"
          data-testid="profile-details-heading"
        >
          Profile details
        </Heading>
        <Button
          variant="tonal"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 font-semibold uppercase"
          data-testid="profile-edit-button"
          aria-label="Edit profile details"
        >
          <PencilSquare />
          Edit details
        </Button>
      </Card>
      <Card
        className="p-0"
        data-testid="profile-details-info"
      >
        <div
          className="flex items-center gap-4 p-4"
          data-testid="profile-name"
        >
          <Avatar
            src={user.file?.url}
            alt={`${user.first_name} ${user.last_name}`}
            size="large"
            data-testid="profile-avatar"
          />
          <div>
            <p
              className="label-md text-secondary"
              data-testid="profile-name-label"
            >
              Name
            </p>
            <p
              className="label-lg text-primary"
              data-testid="profile-name-value"
            >
              {`${user.first_name} ${user.last_name}`}
            </p>
          </div>
        </div>
        <Divider />
        <div
          className="p-4"
          data-testid="profile-email"
        >
          <p
            className="label-md text-secondary"
            data-testid="profile-email-label"
          >
            Email
          </p>
          <p
            className="label-lg text-primary"
            data-testid="profile-email-value"
          >
            {user.email}
          </p>
        </div>
        <Divider />
        <div
          className="p-4"
          data-testid="profile-phone"
        >
          <p
            className="label-md text-secondary"
            data-testid="profile-phone-label"
          >
            Phone number
          </p>
          <p
            className="label-lg text-primary"
            data-testid="profile-phone-value"
          >
            {user.phone}
          </p>
        </div>
      </Card>
      {showForm && (
        <Modal
          heading="Edit profile details"
          onClose={() => setShowForm(false)}
        >
          <ProfileDetailsForm
            handleClose={() => setShowForm(false)}
            defaultValues={{
              firstName: user.first_name || '',
              lastName: user.last_name || '',
              phone: user.phone || '',
              email: user.email || ''
            }}
            currentAvatarUrl={user.file?.url}
          />
        </Modal>
      )}
    </>
  );
};
