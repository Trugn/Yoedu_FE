import { FormFieldType } from '@/shared/types/form-field-type';
import type { Room } from '../types/room-type';
import type { FormField } from '@/shared/components/modal/ModalFormCustom';

export const roomFormFields: FormField<Room>[] = [
  {
    name: 'roomCode',
    label: 'Mã phòng',
    type: FormFieldType.Input,
    placeholder: 'Mã phòng',
    disabled: true,
  },

  {
    name: 'name',
    label: 'Tên phòng học',
    type: FormFieldType.Input,
    placeholder: 'Nhập tên phòng học',
    rules: [{ required: true, message: 'Vui lòng nhập tên phòng học' }],
  },

  {
    name: 'capacity',
    label: 'Sức chứa',
    type: FormFieldType.Input,
    placeholder: 'Nhập sức chứa',
    rules: [{ required: true, message: 'Vui lòng nhập sức chứa' }],
  },

  {
    name: 'description',
    label: 'Mô tả',
    type: FormFieldType.Input,
    placeholder: 'Nhập mô tả phòng học',
  },

];
