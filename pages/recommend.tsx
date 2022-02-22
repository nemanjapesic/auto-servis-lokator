import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Input from '../components/ui/Input';
import Link from '../components/ui/Link';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { baseRequiredValidationRules } from '../util/helpers/validation.helpers';

const formFields = [
  {
    name: 'name',
    label: 'Ime',
    validationRules: baseRequiredValidationRules,
  },
  {
    name: 'address',
    label: 'Adresa',
    validationRules: baseRequiredValidationRules,
  },
  {
    name: 'phone',
    label: 'Telefon',
    validationRules: baseRequiredValidationRules,
  },
  {
    name: 'comment',
    label: 'Komentar',
    validationRules: {
      maxLength: { value: 100, message: 'Unos mora biti kraći od 100 karaktera' },
    },
  },
];

const Recommend = () => {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

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

      toast.success('Vaša preporuka je dodata!');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return null;

  return (
    <div className="mx-auto p-2">
      <Heading uppercase>Preporuči auto servis</Heading>
      {!currentUser ? (
        <div className="text-center">
          <Text>Morate biti prijavljeni da biste nastavili.</Text>
          <Link href="/auth">
            <Button light uppercase>
              Prijavi se
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Text small uppercase>
              Podaci o auto servisu
            </Text>
            {formFields.map(({ name, label, validationRules }) => (
              <Input
                key={name}
                name={name}
                register={register}
                label={label}
                placeholder={label}
                multiline={name === 'comment'}
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
      )}
    </div>
  );
};

export default Recommend;
