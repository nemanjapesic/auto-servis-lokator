import { cx } from '../../util/helpers/classNames.helpers';

type InputProps = {
  name: string;
  register: any;
  label?: string;
  placeholder?: string;
  validationRules?: any;
  error?: any;
  type?: string;
  multiline?: boolean;
  fullWidth?: boolean;
};

const Input = ({
  name,
  register,
  label,
  placeholder,
  validationRules,
  error,
  type,
  multiline,
  fullWidth,
}: InputProps) => {
  const classNames = cx(
    'peer py-2 my-1 rounded border px-4 shadow',
    fullWidth && 'w-full',
    error && 'border-red-500'
  );

  return (
    <div
      className={cx(
        'relative my-2',
        validationRules?.required &&
          "after:absolute after:top-0 after:right-0 after:mr-1 after:mt-1 after:text-red-500 after:content-['*']"
      )}
    >
      {multiline ? (
        <textarea
          className={`${classNames} resize-none`}
          type={type}
          {...register(name, validationRules)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          className={classNames}
          type={type}
          {...register(name, validationRules)}
          placeholder={placeholder}
        />
      )}
      <label
        htmlFor={name}
        className="absolute -top-1.5 left-2 bg-white px-1 text-sm opacity-100 transition-all peer-placeholder-shown:opacity-0"
      >
        {label}
      </label>
      <p className="text-xs leading-3 text-red-500">{error?.message}&nbsp;</p>
    </div>
  );
};

export default Input;
