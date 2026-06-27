import type { FormField } from '@/shared/components/modal/ModalFormCustom';
import type { Enrollment } from '../types/enrollment-type';
import { FormFieldType } from '@/shared/types/form-field-type';
import { getStudentOptions } from '@/features/students/api/student-api';
import { getCourseClassOptions } from '@/features/course-class/api/course-class-api';

export const enrollmentFormFields: FormField<Enrollment>[] = [
  {
    name: 'studentId',
    label: 'Học viên',
    type: FormFieldType.SelectFetch,
    fetchOptions: getStudentOptions,
    placeholder: 'Chọn học viên',
    rules: [{ required: true, message: 'Vui lòng chọn học viên' }],
  },

  {
    name: 'courseClassId',
    label: 'Lớp học',
    type: FormFieldType.SelectFetch,
    fetchOptions: getCourseClassOptions,
    placeholder: 'Chọn lớp học',
    rules: [{ required: true, message: 'Vui lòng chọn lớp học' }],
  },
  {
    name: 'note',
    label: 'Ghi chú',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập ghi chú',
  },
];
