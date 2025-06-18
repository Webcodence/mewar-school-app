// App logic for Mewar School Management Web App

// Load data
let students = JSON.parse(localStorage.getItem("students")) || [];
let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

function saveStudent() {
  const index = document.getElementById("studentIndex").value;
  const name = document.getElementById("studentName").value;
  const sclass = document.getElementById("studentClass").value;
  let rollBase = getClassCode(sclass);

  if (index === "") {
    let rollNo = rollBase + getNextRollSuffix(sclass);
    students.push({ name, class: sclass, rollNo });
  } else {
    students[index].name = name;
    students[index].class = sclass;
  }
  localStorage.setItem("students", JSON.stringify(students));
  document.getElementById("studentForm").reset();
  document.getElementById("studentIndex").value = "";
  showStudents();
}

function saveTeacher() {
  const index = document.getElementById("teacherIndex").value;
  const name = document.getElementById("teacherName").value;
  const phone = document.getElementById("teacherPhone").value;
  const email = document.getElementById("teacherEmail").value;
  const subject = document.getElementById("teacherSubject").value;
  const post = document.getElementById("teacherPost").value;
  const assignedClass = document.getElementById("assignedClass").value;

  if (index === "") {
    const empID = generateEmpID();
    teachers.push({ name, phone, email, subject, post, assignedClass, empID, password: "1234" });
  } else {
    teachers[index] = { ...teachers[index], name, phone, email, subject, post, assignedClass };
  }
  localStorage.setItem("teachers", JSON.stringify(teachers));
  document.getElementById("teacherForm").reset();
  document.getElementById("teacherIndex").value = "";
  showTeachers();
}

function showStudents() {
  let html = "<ul>";
  students.forEach((s, i) => {
    html += `<li>${s.name} (${s.class}) - Roll No: ${s.rollNo}
      <button onclick="editStudent(${i})">Edit</button>
      <button onclick="deleteStudent(${i})">Delete</button>
    </li>`;
  });
  html += "</ul>";
  document.getElementById("studentList").innerHTML = html;
}

function showTeachers() {
  let html = "<ul>";
  teachers.forEach((t, i) => {
    html += `<li>${t.name} (${t.post}) - ${t.subject} - ${t.empID} - Class Teacher: ${t.assignedClass || "None"}
      <button onclick="editTeacher(${i})">Edit</button>
      <button onclick="deleteTeacher(${i})">Delete</button>
    </li>`;
  });
  html += "</ul>";
  document.getElementById("teacherList").innerHTML = html;
}

function editStudent(index) {
  const s = students[index];
  document.getElementById("studentName").value = s.name;
  document.getElementById("studentClass").value = s.class;
  document.getElementById("studentIndex").value = index;
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  showStudents();
}

function editTeacher(index) {
  const t = teachers[index];
  document.getElementById("teacherName").value = t.name;
  document.getElementById("teacherPhone").value = t.phone;
  document.getElementById("teacherEmail").value = t.email;
  document.getElementById("teacherSubject").value = t.subject;
  document.getElementById("teacherPost").value = t.post;
  document.getElementById("assignedClass").value = t.assignedClass;
  document.getElementById("teacherIndex").value = index;
}

function deleteTeacher(index) {
  teachers.splice(index, 1);
  localStorage.setItem("teachers", JSON.stringify(teachers));
  showTeachers();
}

function generateEmpID() {
  const last = teachers.length;
  return "MEWAR" + (last + 1).toString().padStart(3, '0');
}

function getClassCode(className) {
  const map = {
    "1st": 1000, "2nd": 2000, "3rd": 3000, "4th": 4000, "5th": 5000,
    "6th": 6000, "7th": 7000, "8th": 8000, "9th": 9000, "10th": 10000,
    "11th PCM": 11000, "11th PCB": 11100, "11th Commerce": 11200, "11th Agriculture": 11300,
    "12th PCM": 12000, "12th PCB": 12100, "12th Commerce": 12200, "12th Agriculture": 12300
  };
  return map[className] || 0;
}

function getNextRollSuffix(sclass) {
  const filtered = students.filter(s => s.class === sclass);
  return filtered.length + 1;
}

function showAttendance() {
  const overviewDiv = document.getElementById("attendanceOverview");
  let html = "<ul>";
  attendance.forEach(a => {
    html += `<li><b>Date:</b> ${a.date} - <b>Class:</b> ${a.class} - <b>Teacher:</b> ${a.empID}<br>`;
    a.records.forEach(r => {
      html += `${r.name} (${r.rollNo}): ${r.status} | `;
    });
    html += "</li><br>";
  });
  html += "</ul>";
  overviewDiv.innerHTML = html;
}
