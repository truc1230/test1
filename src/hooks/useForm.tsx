/* eslint-disable react/function-component-definition */
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, useFormContext, UseFormProps, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

export interface FormContainerProps<F> {
  useFormFields?: UseFormProps;
  validationSchema: Yup.AnyObjectSchema;
  children: React.ReactNode;
  defaultValues?: { [x: string]: undefined };
  onSubmit?: (data: F, reset: UseFormReturn['reset']) => void;
}
interface ConnectFormProps {
  children: React.ReactNode | any;
}

export function FormContainer<F>({ children, validationSchema, onSubmit, ...innerProps }: FormContainerProps<F>) {
  const methods = useForm({
    mode: 'all',
    ...innerProps,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    resolver: yupResolver(validationSchema),
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={
          onSubmit ? methods.handleSubmit((data: unknown) => onSubmit(data as unknown as F, methods.reset)) : undefined
        }
      >
        {children}
      </form>
    </FormProvider>
  );
}

export const ConnectForm: React.FC<ConnectFormProps> = ({ children }) => {
  const methods = useFormContext();
  return (children as unknown as React.FC<typeof methods>)({ ...methods });
};

export type UseFormConnectProps = UseFormReturn;
