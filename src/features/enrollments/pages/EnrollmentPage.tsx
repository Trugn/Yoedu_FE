import useTable from '@/shared/hooks/useTable';
import PageHeader from '@/shared/components/page/PageHeader';
import { Button } from 'antd';
import ModalFormCustom from '@/shared/components/modal/ModalFormCustom';
import { useFormModal } from '@/shared/hooks/useFormModal';
import { FormModalMode } from '@/shared/types/form-modal-mode-type';
import FilterTableCustom from '@/shared/components/table/FilterTableCustom';
import { EnrollmentStatus, type Enrollment } from '../types/enrollment-type';
import { enrollmentRoleAdminApi } from '../api/enrollment-api';
import type { EnrollmentFilterParams } from '../types/enrollment-filter-params-type';
import { enrollmentFilters } from '../constants/enrollment-filter-table';
import { enrollmentFormFields } from '../constants/enrollment-form-fields';
import TablePaginationCustom from '@/shared/components/table/TablePaginationCustom';
import ActionGroup from '@/shared/components/table/ActionGroup';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EnrollmentStatusTag from '../components/EnrollmentStatusTag';
import type { SectionForm } from '@/shared/components/modal/ModalFormCustom';

const EnrollmentPage = () => {
  const { getAll, create, update, remove } = enrollmentRoleAdminApi;

  const { open, mode, selectedRecord, openCreate, openView, openEdit, close } =
    useFormModal<Enrollment>();

  const {
    data: enrollments,

    loading,

    pagination,

    filterValues,

    handleFilterChange,

    handleFilterSubmit,

    handleFilterReset,

    handleChangePage,

    handleDelete,

    refetch,
  } = useTable<Enrollment, EnrollmentFilterParams>({
    fetchApi: getAll,
    removeApi: remove,
  });

  const sectionsEnrollmentForm: SectionForm<Enrollment>[] = [
    {
      key: 'enrollment',
      label: 'Thông tin đăng ký',
      fields: enrollmentFormFields,
    },
  ];

  const columns = [
    {
      title: 'Học viên',
      dataIndex: 'studentName',
    },
    {
      title: 'Lớp học',
      dataIndex: 'courseClassName',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'courseName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center' as const,
      render: (_: any, record: Enrollment) => {
        return <EnrollmentStatusTag status={record.status} statusText={record.statusText} />;
      },
    },
    {
      title: 'Tác vụ',
      align: 'center' as const,
      render: (_: any, record: Enrollment) => {
        return (
          <ActionGroup<Enrollment>
            record={record}
            actions={[
              {
                show: () => true,
                icon: <EyeOutlined />,
                tooltip: 'Chi tiết',
                onClick: openView,
              },
              {
                show: (r) => r.status === EnrollmentStatus.ACTIVE,
                icon: <EditOutlined />,
                tooltip: 'Sửa',
                onClick: openEdit,
              },
              {
                show: (r) => r.status === EnrollmentStatus.ACTIVE,
                icon: <DeleteOutlined />,
                tooltip: 'Hủy đăng ký',
                danger: true,
                onClick: () => handleDelete(record.id),
                isPopconfirm: true,
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Quản lý đăng ký"
        subtitle="Danh sách đăng ký"
        extra={
          <Button type="primary" onClick={openCreate}>
            + Thêm đăng ký
          </Button>
        }
      />

      <div className="mb-4">
        <FilterTableCustom
          dataFilters={enrollmentFilters}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
          onSubmit={handleFilterSubmit}
        />
      </div>

      <TablePaginationCustom<Enrollment>
        columns={columns}
        data={enrollments}
        loading={loading}
        pagination={pagination}
        onChangePage={handleChangePage}
      />

      <ModalFormCustom<Enrollment>
        open={open}
        title="Đăng ký"
        mode={mode}
        initialValues={selectedRecord}
        disabled={mode === FormModalMode.VIEW}
        onCancel={close}
        onSuccess={refetch}
        onSubmit={
          mode === FormModalMode.CREATE ? create : (values) => update(selectedRecord!.id, values)
        }
        sections={sectionsEnrollmentForm}
      />
    </div>
  );
};

export default EnrollmentPage;
