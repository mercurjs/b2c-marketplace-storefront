'use client';

import { FC, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { HttpTypes } from '@medusajs/types';
import Image from 'next/image';
import { FieldError, FieldValues, FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { LabeledInput } from '@/components/cells';
import { AddPhotoIcon, BinIcon, ProfileIcon } from '@/icons';
import { deleteCustomerAvatar, updateCustomer, uploadCustomerAvatar } from '@/lib/data/customer';

import { ProfileDetailsFormData, profileDetailsSchema } from './schema';

interface Props {
  defaultValues?: ProfileDetailsFormData;
  handleClose?: () => void;
  currentAvatarUrl?: string;
}

export const ProfileDetailsForm: FC<Props> = ({ defaultValues, currentAvatarUrl, ...props }) => {
  const methods = useForm<ProfileDetailsFormData>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    }
  });

  return (
    <FormProvider {...methods}>
      <Form
        {...props}
        currentAvatarUrl={currentAvatarUrl}
      />
    </FormProvider>
  );
};

const Form: React.FC<Props> = ({ handleClose, currentAvatarUrl }) => {
  const [error, setError] = useState<string>();
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentAvatarUrl);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useFormContext();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl && previewUrl !== currentAvatarUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemoveAvatar(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveClick = () => {
    if (previewUrl && previewUrl !== currentAvatarUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPendingFile(null);
    setPreviewUrl(undefined);
    setRemoveAvatar(!!currentAvatarUrl);
  };

  const submit = async (data: FieldValues) => {
    setError(undefined);

    try {
      if (pendingFile) {
        await uploadCustomerAvatar(pendingFile);
      } else if (removeAvatar) {
        await deleteCustomerAvatar();
      }

      await updateCustomer({
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone
      } as HttpTypes.StoreUpdateCustomer);
    } catch (err) {
      setError((err as Error).message);
      return;
    }

    handleClose && handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      data-testid="profile-details-form"
    >
      <div className="space-y-4 px-4">
        <div className="flex flex-col items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            data-testid="profile-avatar-file-input"
            aria-label="Upload profile avatar"
            id="avatar-file-input"
          />
          <div
            className="relative flex h-[200px] w-[200px] shrink-0 overflow-hidden rounded-full bg-secondary shadow-[0px_0px_0px_1px_var(--border-base-primary,#eee)]"
            data-testid="profile-avatar-preview"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile avatar"
                fill
                className="object-cover"
                unoptimized={!!pendingFile}
                data-testid="profile-avatar-image"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                data-testid="profile-avatar-placeholder"
              >
                <ProfileIcon size={48} />
              </div>
            )}
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            {previewUrl && (
              <Button
                type="button"
                onClick={handleRemoveClick}
                variant="text"
                className="flex w-fit items-center justify-center gap-2"
                data-testid="profile-avatar-delete-button"
                aria-label="Remove current avatar image"
              >
                <BinIcon size={20} />
                <span className="label-md">Remove photo</span>
              </Button>
            )}

            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="tonal"
              className="flex w-fit items-center justify-center gap-2"
              data-testid="profile-avatar-upload-button"
              aria-label="Upload new avatar image"
              aria-controls="avatar-file-input"
            >
              <AddPhotoIcon size={20} />
              <span className="label-md">Upload photo</span>
            </Button>
          </div>
        </div>

        <div className="items-top mb-4 grid max-w-full grid-cols-2 gap-4">
          <LabeledInput
            label="First name"
            placeholder="Type first name"
            error={errors.firstName as FieldError}
            data-testid="profile-details-form-first-name-input"
            {...register('firstName')}
          />
          <LabeledInput
            label="Last name"
            placeholder="Type last name"
            error={errors.lastName as FieldError}
            data-testid="profile-details-form-last-name-input"
            {...register('lastName')}
          />
          <LabeledInput
            label="Phone"
            placeholder="Type phone number"
            error={errors.phone as FieldError}
            data-testid="profile-details-form-phone-input"
            {...register('phone')}
          />
          <LabeledInput
            label="Email"
            disabled
            data-testid="profile-details-form-email-input"
            {...register('email')}
          />
        </div>
        {error && (
          <p
            className="label-md text-negative"
            data-testid="profile-details-form-error"
          >
            {error}
          </p>
        )}
        <Button
          className="w-full"
          data-testid="profile-details-form-submit-button"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
