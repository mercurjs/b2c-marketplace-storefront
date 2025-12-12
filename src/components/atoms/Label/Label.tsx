export const Label = ({
  children,
  dataTestId,
}: {
  children: React.ReactNode;
  dataTestId?: string;
}) => {
  return (
    <span
      className='border rounded-sm py-2 px-3 label-sm'
      data-testid={dataTestId}
    >
      {children}
    </span>
  );
};
