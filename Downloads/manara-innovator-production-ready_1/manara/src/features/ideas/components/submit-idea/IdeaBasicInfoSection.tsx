import { useFormContext } from 'react-hook-form';
import type { IdeaFormValues } from '../../types';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useCategories } from '@/hooks/useCategories';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function IdeaBasicInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdeaFormValues>();

  const organizationsQuery = useOrganizations();
  const categoriesQuery = useCategories();

  const organizationOptions = (organizationsQuery.data ?? []).map((org) => ({ value: org.id, label: org.name }));
  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({ value: category, label: category }));

  return (
    <Card>
      <CardHeader>
        <h2 className="font-display font-bold text-ink-900">معلومات أساسية</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-5">
        <Input label="عنوان الفكرة" required error={errors.title?.message} {...register('title')} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Select
            label="الجهة المستقبلة"
            placeholder="اختر الجهة"
            required
            error={errors.organizationId?.message}
            options={organizationOptions}
            {...register('organizationId')}
          />
          <Select
            label="التصنيف"
            placeholder="اختر التصنيف"
            required
            error={errors.category?.message}
            options={categoryOptions}
            {...register('category')}
          />
        </div>
      </CardBody>
    </Card>
  );
}
