import { roles } from './grid-config.js';

const salaryRanges = {
  Admin: [130000, 140000],
  Manager: [100000, 110000],
  Employee: [70000, 80000],
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickOne = (array) => array[randomInt(0, array.length - 1)];
const randomDate = (startYear = 2019, endYear = 2025) => {
  const startMs = new Date(`${startYear}-01-01`).getTime();
  const endMs = new Date(`${endYear}-12-31`).getTime();
  return new Date(randomInt(startMs, endMs));
};

const buildEmployeeId = (index, prefix = 'EMP', width = 4) => `${prefix}-${String(index).padStart(width, '0')}`;

const buildContactNumber = () => {
  const exchange = randomInt(100, 999);
  const line = randomInt(1000, 9999);
  return `(555) ${exchange}-${line}`;
};

export function generateEmployees(totalEmployees = 36) {
  const firstNames = ['Ava', 'Liam', 'Noah', 'Emma', 'Oliver', 'Sophia', 'Elijah', 'Isabella', 'James', 'Mia'];
  const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const jobTitles = ['Engineer', 'Sr Engineer', 'Account Manager', 'Analyst', 'HR Exec', 'QA', 'Support'];
  const departments = ['Engineering', 'Sales', 'Marketing', 'Finance', 'HR'];

  const employees = [];
  for (let employeeIndex = 1; employeeIndex <= totalEmployees; employeeIndex++) {
    const firstName = pickOne(firstNames);
    const lastName = pickOne(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const departmentName = pickOne(departments);
    const role = pickOne(roles);
    const [minSalary, maxSalary] = salaryRanges[role] ?? [90000, 100000];

    employees.push({
      id: buildEmployeeId(employeeIndex),
      fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${employeeIndex}@example.org`,
      department: departmentName,
      role,
      title: pickOne(jobTitles),
      salary: randomInt(minSalary, maxSalary),
      active: Math.random() > 0.2,
      joinDate: randomDate(2019, 2024),
      rating: randomInt(1, 5),
      contact: buildContactNumber(),
    });
  }
  return employees;
}