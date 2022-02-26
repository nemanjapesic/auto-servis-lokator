import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AuthCheck from '../components/AuthCheck';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { categories } from '../util/constants/categories.constants';
import { municipalities } from '../util/constants/location.constants';
import { Routes } from '../util/constants/routes.constants';
import { baseRequiredValidationRules } from '../util/helpers/validation.helpers';

const formFields = [
  {
    name: 'name',
    label: 'Ime',
    validationRules: baseRequiredValidationRules,
  },
  {
    name: 'category',
    label: 'Kategorija',
    validationRules: { required: 'Ovo polje je obavezno' },
    data: categories,
  },
  {
    name: 'location',
    label: 'Opština',
    validationRules: { required: 'Ovo polje je obavezno' },
    data: municipalities,
  },
  {
    name: 'address',
    label: 'Adresa',
    validationRules: baseRequiredValidationRules,
  },
  {
    name: 'phone',
    label: 'Telefon',
    validationRules: {
      ...baseRequiredValidationRules,
      pattern: {
        value: /^\d+(,\d+)*$/g,
        message: 'Unos može sadržati samo brojeve odvojene zapetom',
      },
    },
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
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const recommendation = {
      ...data,
      userEmail: currentUser.email,
    };

    addRecommendation(recommendation);
    reset();
  };

  const addRecommendation = async (data) => {
    try {
      await addDoc(collection(db, 'recommendations'), {
        ...data,
        createdAt: serverTimestamp(),
      });

      toast.success('Vaša preporuka je dodata!');
      router.push(Routes.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return null;

  return (
    <div className="mx-auto p-2">
      <Heading uppercase>Preporuči auto servis</Heading>
      <AuthCheck>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Text small uppercase>
              Podaci o auto servisu
            </Text>
            {formFields.map(({ name, label, validationRules, data }) => {
              if (name === 'category' || name === 'location') {
                const value = watch(name);

                return (
                  <Select
                    value={value}
                    key={name}
                    name={name}
                    placeholder={label}
                    label={label}
                    register={register}
                    fullWidth
                    validationRules={validationRules}
                    error={errors[name]}
                  >
                    {data.map((item) => (
                      <option key={item} value={item.toLowerCase()}>
                        {item}
                      </option>
                    ))}
                  </Select>
                );
              } else {
                return (
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
                );
              }
            })}
          </div>
          <Button type="submit" fullWidth disabled={isSubmitting}>
            Preporuči
          </Button>
        </form>
      </AuthCheck>
    </div>
  );
};

export default Recommend;
