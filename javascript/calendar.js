const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const d = new Date();
let index = d.getMonth();
let year = d.getFullYear(); 

updateCalendar();

function ChangeMonth1() {
    if (index < 11) {
        index += 1;
    } else {
        index = 0;
        year += 1;
    }
    updateCalendar();
}

function ChangeMonth2() {
    if (index > 0) {
        index -= 1;
    } else {
        index = 11;
        year -= 1; 
    }
    updateCalendar();
}

function updateCalendar() {
    const daysInMonth = getDaysInMonth(index, year);
    const firstDayOfMonth = new Date(year, index, 1).getDay(); 
    
    let calendarHTML = `
        <div class="days">Monday</div>
        <div class="days">Tuesday</div>
        <div class="days">Wednesday</div>
        <div class="days">Thursday</div>
        <div class="days">Friday</div>
        <div class="days">Saturday</div>
        <div class="days">Sunday</div>
    `;

    for (let i = 1; i < firstDayOfMonth; i++) {
        calendarHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
  const note = localStorage.getItem(`note-${year}-${index}-${day}`) || '';
  calendarHTML += `
    <div onclick="openNoteModal(${year}, ${index}, ${day})">
      ${day}
      ${note ? '<span class="note-indicator">📝</span>' : ''}
    </div>
  `;
}

    document.querySelector('.main_square').innerHTML = calendarHTML;
    document.querySelector('.changemonth').innerHTML = monthArray[index];
}

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

let currentNoteDate = {};

function openNoteModal(year, month, day) {
  currentNoteDate = { year, month, day };
  const modal = document.getElementById('noteModal');
  document.getElementById('modalDate').textContent = 
    `${day}/${month + 1}/${year}`;
  
  const savedNote = localStorage.getItem(`note-${year}-${month}-${day}`) || '';
  document.getElementById('noteText').value = savedNote;
  
  modal.style.display = 'block';
}

function closeNoteModal(){
   document.getElementById('noteModal').style.display = 'none';
}

function saveNote() {
  const noteText = document.getElementById('noteText').value;
  localStorage.setItem(
    `note-${currentNoteDate.year}-${currentNoteDate.month}-${currentNoteDate.day}`,
    noteText
  );
  document.getElementById('noteModal').style.display = 'none';
  updateCalendar(); 
}

window.onclick = function(event) {
  if (event.target == document.getElementById('noteModal')) {
    document.getElementById('noteModal').style.display = 'none';
  }
}

function deleteNote() {
  localStorage.removeItem(
    `note-${currentNoteDate.year}-${currentNoteDate.month}-${currentNoteDate.day}`
  );
  document.getElementById('noteText').value = '';
  updateCalendar();
}