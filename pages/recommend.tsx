import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Input from '../components/ui/Input';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

const formFields = [
  {
    name: 'userEmail',
    label: 'Email',
    validationRules: {
      required: 'Ovo polje je obavezno',
      maxLength: { value: 20, message: 'Unos mora biti kraći od 20 karaktera' },
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: 'Unesite ispravnu email adresu',
      },
    },
  },
  {
    name: 'userMessage',
    label: 'Poruka',
    validationRules: {
      maxLength: { value: 100, message: 'Unos mora biti kraći od 100 karaktera' },
    },
  },
  {
    name: 'businessName',
    label: 'Naziv',
    validationRules: {
      required: 'Ovo polje je obavezno',
      minLength: { value: 5, message: 'Unos mora biti duži od 5 karaktera' },
      maxLength: { value: 50, message: 'Unos mora biti kraći od 50 karaktera' },
    },
  },
  {
    name: 'businessAddress',
    label: 'Adresa',
    validationRules: {
      required: 'Ovo polje je obavezno',
      minLength: { value: 5, message: 'Unos mora biti duži od 5 karaktera' },
      maxLength: { value: 50, message: 'Unos mora biti kraći od 50 karaktera' },
    },
  },
  {
    name: 'businessPhone',
    label: 'Telefon',
    validationRules: {
      required: 'Ovo polje je obavezno',
      minLength: { value: 5, message: 'Unos mora biti duži od 5 karaktera' },
      maxLength: { value: 50, message: 'Unos mora biti kraći od 50 karaktera' },
    },
  },
];

const Recommend = () => {
  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { userEmail: currentUser?.email || '' } });

  const onSubmit = async (data) => {
    await addRecommendation(data);
    reset();
  };

  const addRecommendation = async (data) => {
    try {
      await addDoc(collection(db, 'recommendations'), {
        ...data,
        createdAt: serverTimestamp(),
      });

      toast.success('Recommendation added!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto p-2">
      <Heading uppercase>Preporuči auto servis</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!currentUser && (
          <div>
            <Text small uppercase>
              Vaši podaci
            </Text>
            {formFields.slice(0, 2).map(({ name, label, validationRules }) => (
              <Input
                key={name}
                name={name}
                register={register}
                label={label}
                placeholder={label}
                fullWidth
                validationRules={validationRules}
                error={errors[name]}
              />
            ))}
          </div>
        )}
        <div>
          <Text small uppercase>
            Podaci o auto servisu
          </Text>
          {formFields.slice(2).map(({ name, label, validationRules }) => (
            <Input
              key={name}
              name={name}
              register={register}
              label={label}
              placeholder={label}
              fullWidth
              validationRules={validationRules}
              error={errors[name]}
            />
          ))}
        </div>
        <Button type="submit" fullWidth disabled={isSubmitting}>
          Preporuči
        </Button>
      </form>
    </div>
  );
};

export default Recommend;
