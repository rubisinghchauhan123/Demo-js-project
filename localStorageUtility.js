const LOCAL_TABLE = "localData";
function get() {
  return localStorage.getItem(LOCAL_TABLE) !== null
    ? JSON.parse(localStorage.getItem(LOCAL_TABLE))
    : [];
}

function add(employees) {
  localStorage.setItem(LOCAL_TABLE, JSON.stringify(employees));
}

function getAllDataFromLocal() {
  return get();
}

function getMaxId() {
  const localData = getAllDataFromLocal();
  if (localData.length > 0) {
    const ids = localData.map((x) => x.id);
    max = Math.max.apply(null, ids);
    return max + 1;
  } else {
    return 1;
  }
}

function addLocalData(employee) {
  employee.id = getMaxId();
  const employees = getAllDataFromLocal();
  employees.push(employee);
  add(employees);
}

function getlocalDataById(employeeId) {
  const employees = getAllDataFromLocal();
  const employee = employees.find((x) => x.id === parseInt(employeeId));
  return employee;
}

function deleteDataFromLocal(id) {
  debugger;
  let localData = localStorage.getItem("localData");
  let localArray = JSON.parse(localData);
  let i = 0;
  while (i < localArray.length) {
    if (localArray[i].id === Number(id)) {
      localArray.splice(i, 1);
    } else {
      ++i;
    }
  }
  localStorage.setItem("localData", JSON.stringify(localArray));
  loadDataFromLocal();
}
