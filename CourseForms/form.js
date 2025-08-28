let currentPage = 1;
const totalPages = 4;

function showPage(pageNumber) {
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page) page.classList.remove('active');
    }
    const newPage = document.getElementById('page' + pageNumber);
    if (newPage) newPage.classList.add('active');
    updateProgressSteps(); // ✅ Update top progress bar
}


function validatePage1() {
    const checkbox = document.getElementById("agreeCheckbox");
    const errorMsg = document.getElementById("checkboxError");

    if (!checkbox || !checkbox.checked) {
        checkbox.classList.add("glow");
        errorMsg.textContent = "Please agree to continue.";
        return false;
    }

    checkbox.classList.remove("glow");
    errorMsg.textContent = "";
    return true;
}

function clearCheckboxError() {
    const checkbox = document.getElementById("agreeCheckbox");
    const errorMsg = document.getElementById("checkboxError");
    if (checkbox.checked) {
        checkbox.classList.remove("glow");
        errorMsg.textContent = "";
    }
}


function validatePage2() {
    const inputs = document.querySelectorAll('#page2 input');
    let allFilled = true;
    for (let input of inputs) {
        if (!input.value.trim()) {
            allFilled = false;
            break;
        }
    }

    if (!allFilled) {
        Swal.fire("Missing Info", "Please fill in all student details.", "warning");
        return false;
    }

    // Validate email
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        Swal.fire("Invalid Email", "Please enter a valid email address.", "warning");
        return false;
    }

    // Validate phone number
    const phone = document.getElementById("phone").value.trim();
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        Swal.fire("Invalid Phone", "Please enter a valid 10-digit Indian phone number.", "warning");
        return false;
    }

    return true;
}


function validatePage3() {
    const inputs = document.querySelectorAll('#page3 input');
    for (let input of inputs) {
        if (!input.value.trim()) {
            Swal.fire("Missing Info", "Please fill in all student details.", "warning");
            return false;
        }
    }
    return true;
}

// Optional: Add your own validation logic for page 4 if needed
function validatePage4() {
    const paymentInput = document.querySelector('#page4 input[name="paymentId"]');
    if (!paymentInput || !paymentInput.value.trim()) {
        Swal.fire("Required", "Please enter your payment transaction ID.", "warning");
        return false;
    }
    return true;
}

function nextPage() {
    let isValid = false;
    if (currentPage === 1) isValid = validatePage1();
    else if (currentPage === 2) isValid = validatePage2();
    else if (currentPage === 3) isValid = validatePage3();
    else isValid = validatePage4();

    if (isValid && currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

function toggleNextButton() {
    const checkbox = document.getElementById("agreeCheckbox");
    const nextButton = document.getElementById("nextBtn");
    if (checkbox && nextButton) {
        nextButton.disabled = !checkbox.checked;
    }
}


function updateProgressSteps() {
    for (let i = 1; i <= totalPages; i++) {
        const step = document.getElementById('step' + i);
        if (!step) continue;
        step.classList.remove('active', 'completed');
        if (i < currentPage) {
            step.classList.add('completed');
        } else if (i === currentPage) {
            step.classList.add('active');
        }
    }
}

// Enable Next button only if all fields are filled (Page 2)
const studentInputs = document.querySelectorAll('#page2 input');
const next2Btn = document.getElementById('next2Btn');
if (next2Btn) {
    studentInputs.forEach(input => {
        input.addEventListener('input', () => {
            const allFilled = Array.from(studentInputs).every(inp => inp.value.trim() !== "");
            next2Btn.disabled = !allFilled;
        });
    });
}

// Enable Next button only if all fields are filled (Page 3)
const yearSelect = document.getElementById("year");
const page3Inputs = document.querySelectorAll('#page3 input');
const next3Btn = document.getElementById('next3Btn');

function validatePage3Fields() {
    const isYearSelected = yearSelect.value !== "";
    const allInputsFilled = Array.from(page3Inputs).every(inp => inp.value.trim() !== "");
    next3Btn.disabled = !(isYearSelected && allInputsFilled);
}

if (next3Btn) {
    yearSelect.addEventListener("change", validatePage3Fields);
    page3Inputs.forEach(input => {
        input.addEventListener("input", validatePage3Fields);
    });
}



const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

emailInput.addEventListener("blur", validateEmail);

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        emailInput.style.borderColor = "red";
    } else {
        emailError.textContent = "";
        emailError.style.display = "none";
        emailInput.style.borderColor = "#4f46e5";
    }
}

const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

phoneInput.addEventListener("blur", validatePhone);

function validatePhone() {
    const phoneValue = phoneInput.value.trim();
    const phonePattern = /^[6-9]\d{9}$/; // Starts with 6,7,8,9 and has total 10 digits

    if (!phonePattern.test(phoneValue)) {
        phoneError.textContent = "Please enter a valid 10-digit Indian phone number.";
        phoneError.style.display = "block";
        phoneInput.style.borderColor = "red";
    } else {
        phoneError.textContent = "";
        phoneError.style.display = "none";
        phoneInput.style.borderColor = "#4f46e5";
    }
}
