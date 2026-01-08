// Supported application roles.
export const roles = ['Admin', 'Manager', 'Employee'];

export const ROLE_CONFIG = {
  Admin: {
    canEdit: true,
    canAdd: true,
    canDelete: true,
    // Columns the Admin role can view.
    visible: [
      'id',
      'fullName',
      'email',
      'department',
      'role',
      'title',
      'salary',
      'active',
      'joinDate',
      'contact',
    ],
  },
  Manager: {
    canEdit: true,
    canAdd: false,
    canDelete: false,
    // Columns the Manager role can view.
    visible: [
      'id',
      'fullName',
      'email',
      'department',
      'role',
      'title',
      'active',
      'joinDate',
      'rating',
      'contact',
    ],
  },
  Employee: {
    canEdit: false,
    canAdd: false,
    canDelete: false,
    // Columns the Employee role can view.
    visible: [
      'fullName',
      'email',
      'department',
      'title',
      'active',
      'joinDate',
      'contact',
    ],
  },
};

// Master definition for all grid columns.
export const columns = [
  { field: 'id', headerText: 'ID', isPrimaryKey: true, width: 100, textAlign: 'Right', allowEditing: false },
  { field: 'fullName', headerText: 'Name', type: 'string', width: 160, allowEditing: false },
  { field: 'email', headerText: 'Email', width: 240, allowEditing: false },
  { field: 'joinDate', headerText: 'Join Date', type: 'date', editType: 'datepickeredit', format: 'yMd', width: 130, allowEditing: false },
  { field: 'department', headerText: 'Department', width: 140 },
  { field: 'role', headerText: 'Role', width: 120, editType: 'dropdownedit' },
  { field: 'title', headerText: 'Title', width: 140 },
  { field: 'salary', headerText: 'Salary', type: 'number', editType: 'numericedit', format: 'C0', textAlign: 'Right', width: 120 },
  { field: 'active', headerText: 'Active', type: 'boolean', editType: 'booleanedit', width: 100, textAlign: 'Center' },
  { field: 'rating', headerText: 'Rating', type: 'number', width: 120, editType: 'numericedit' },
  { field: 'contact', headerText: 'Contact', width: 170 },
];

// Built-in demo login accounts.
export const DEMO_ACCOUNTS = [
  { role: "Admin", userId: "lucas", password: "sunset42" },
  { role: "Manager", userId: "mia", password: "harbor78" },
  { role: "Employee", userId: "oliver", password: "meadow25" },
];