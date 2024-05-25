var emptyRow = "<tr><td colspan='6' class='text-center'> No Records Available</td></tr>";

$(document).ready(function () {
  loadDataFromLocal();

  $("#imageinput").change(function () {
    let src = URL.createObjectURL(this.files[0]);
    $("#imagepreview").attr("src", src);
  });

  $("#tblData").on("click", ".btn-delete", function () {
    const id = $(this).parent().parent().find(".firstName").attr("data-id");
    openConfirmDilog(id);
  });

  $(".openDialog").click(function () {
    $("#showModal").modal("show");
  });

  $("#save").click(function () {
    if ($("#txtId").val() == "") {
      const employee = createObjectData();
      addLocalData(employee);
    } else {
      updateDataFromLocal();
    }
    clearForm();
    loadDataFromLocal();
  });

  $(document).on("click",".plus-button",function(){
    $(this).closest("tr").next(".child").toggle();
  });

  $(".add-button").on("click", function () {
    var newSkill = $("#skill").val();
    $("#box").append("<li>" + newSkill + "</li>");
  });

  
  $("#tblData").on("click", ".btn-edit", function () {
    const id = $(this).parent().parent().find(".firstName").attr("data-id");
    const employee = getlocalDataById(id);
    $("#firstName").val(employee.firstName);
    $("#lastName").val(employee.lastName);
    $("#email").val(employee.email);
    $('input[name="gender"]:checked').val(employee.gender);
    $("#dob").val(employee.dob);
    $("#joiningDate").val(employee.joiningDate);
    $("#skill").val(employee.skill);
    $("#Designation").val(employee.designation);
    $("#description").val(employee.description);
    $("#txtId").val(id);
    $("#save").text("Update");
    $("#showModal").modal("show");
  });

  $("#search").on("keyup", function () {
    const localData_Value = $(this).val().toLowerCase();
    $("#tblData tr").filter(function () {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(localData_Value) > -1
      );
    });
  });

  pagination();
});

function createObjectData() {
  const employee = {
    firstName: $("#firstname").val(),
    lastName: $("#lastname").val(),
    email: $("#email").val(),
    gender: $("[type='radio']:checked").val(),
    dob: $("#DOB").val(),
    joiningDate: $("#joiningDate").val(),
    designation: $("#Designation").val(),
    skill: $("#skill").val(),
    description: $("description").val(),
  };
  return employee;
}

function clearForm() {
  $("#firstname").val("");
  $("#lastname").val("");
  $("#email").val("");
  $("#gender").val("");
  $("#DOB").val("");
  $("#joiningDate").val("");
  $("#Designation").val("");
  $("#imageinput").val("");
  $("#skill").val("");
  $("#descriptio").val("");
  $("#save").text("Update");
}

function addEmptyRow() {
  if ($("#tblData tbody").children().children().length == 0) {
    $("#tblData tbody").append(emptyRow);
  }
}

function loadDataFromLocal(data=[]) {
  let localArray =[];
  if(data.length>0){
    localArray=data
  }
  else{
    let localData = localStorage.getItem("localData");
    localArray = JSON.parse(localData);
  }
 
  if (localArray) {
    $("#tblData tbody").html("");
    
    let index = 1;
    localArray.forEach((element) => {
      let dynamicTR = "<tr>";
      dynamicTR = dynamicTR +"<td> " + '<i class="fa-solid fa-plus plus-button"></i>' +  "</td>";
      dynamicTR = dynamicTR +"<td class='firstName'  data-id=" + element.id + ">" + element.firstName +  " " +  element.lastName +  "</td>";
      dynamicTR = dynamicTR + "<td class='email'>" + element.email + "</td>";
      dynamicTR =  dynamicTR + "<td class='Designation'>" + element.designation + "</td>";
      dynamicTR = dynamicTR + "<td class='gender'>" + element.gender + "</td>";
      dynamicTR = dynamicTR + " <td class='tdAction text-center'>";
      dynamicTR = dynamicTR + "        <a id='btnEdit" + element.id + "' class='btn btn-success btn-edit'>" + '<i class="fa-solid fa-user-pen"></i>' +  "</a>";
      dynamicTR = dynamicTR + "        <a id='btnDelete" + element.id + "' class='btn btn-danger btn-delete'>" + '<i class="fa-solid fa-user-minus"></i>' +  "</a>";
      dynamicTR = dynamicTR + "    </td>";
      dynamicTR = dynamicTR + " </tr>";

      dynamicTR = dynamicTR + " <tr class ='child'>";
      dynamicTR = dynamicTR + "<td>" + "information" + "</td>";
      dynamicTR = dynamicTR +  "<td class='dob'>" +  "date of Birth:" + element.dob + "</td>";
      dynamicTR = dynamicTR +  "<td class='joiningDate'>" +  "joining Date:" +  element.joiningDate +  "</td>";
      dynamicTR = dynamicTR + "<td class='designation'>" + "skills:" + element.skill +"</td>";
      dynamicTR = dynamicTR + "<td class='skill'>" +  "description:" +  element.description + "</td>";
      dynamicTR = dynamicTR + "<td class='description'>" + "</td>";
      dynamicTR = dynamicTR + " </tr>";
      $("#tblData").append(dynamicTR);
      index++;
    });
  }
  addEmptyRow();
}

function updateDataFromLocal() {
  const localData = getAllDataFromLocal("localData");
  const oldLocalDataDetails = localData.find((x) => x.id == $("#txtId").val());
  oldLocalDataDetails.firstName = $("#firstname").val();
  oldLocalDataDetails.lastName = $("#lastname").val();
  oldLocalDataDetails.email = $("#email").val();
  (oldLocalDataDetails.gender = $("[type='radio']:checked").val()),
    (oldLocalDataDetails.dob = $("#DOB").val());
  oldLocalDataDetails.skill = $("skill").val();
  oldLocalDataDetails.joiningDate = $("#joiningDate").val();
  oldLocalDataDetails.designation = $("#Designation").val();
  oldLocalDataDetails.description = $("#description").val();
  add(localData);
  loadDataFromLocal();
  clearForm();
}

function pagination() {
  const employeeData = getAllDataFromLocal();
  $("#tblData").pagination({
    dataSource: employeeData,
    pageSize: 2,
    callback: function (data,pagination) {
      loadDataFromLocal(data);
    },
  });
}
