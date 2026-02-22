let userEmail = document.querySelector("#useremail")
let userPass = document.querySelector("#userpass")
let logbtn = document.querySelector("#logbtn")
let errMess = document.querySelector("#errMess")
let succMess = document.querySelector("#succMess")
let form = document.querySelector("form")

let QuestionsNum = document.querySelector("#questionsNum")
let strTestBtn = document.querySelector("#strTestBtn")
let testScreen = document.querySelector("#testScreen")
let testSection = document.querySelector("#test")
let questionArea = document.querySelector("#questionArea")

let submitTest = document.querySelector("#submitTest")
let scoreBox = document.querySelector("#scoreBox")
let logoutBtn = document.querySelector("#logoutBtn")

let correctAnswers = []
let cartona = ""


if (localStorage.getItem("Islogin") == "True") {
    GoToTestPage()
}

// Login
logbtn.addEventListener("click", function (e) {
    e.preventDefault()

    if (userEmail.value != "tt@" || userPass.value != "11") {
        errMess.classList.remove("d-none")
    } else {
        errMess.classList.add("d-none")
        succMess.classList.remove("d-none")

        localStorage.setItem("Islogin", "True")

        setTimeout(GoToTestPage, 1000)
    }
})

function GoToTestPage() {
    testSection.classList.remove("d-none")
    form.classList.add("d-none")
}

// Start Test
strTestBtn.addEventListener("click", function (e) {
    e.preventDefault()

    cartona = ""
    correctAnswers = []

    let num = QuestionsNum.value

    for (let i = 1; i <= num; i++) {
        let num1 = Math.floor(Math.random() * 10)
        let num2 = Math.floor(Math.random() * 10)

        correctAnswers.push(num1 + num2)

        cartona += `
            <label class="mt-3">${i}) ${num1} + ${num2} =</label>
            <input type="number" class="form-control answer">
        `
    }

    testScreen.innerHTML = cartona
    submitTest.classList.remove("d-none")
})

// Submit Test
submitTest.addEventListener("click", function () {
    let userAnswers = document.querySelectorAll(".answer")
    let score = 0

    for (let i = 0; i < userAnswers.length; i++) {
        if (Number(userAnswers[i].value) === correctAnswers[i]) {
            score++
        }
    }

    // اخفاء كل عناصر الاختبار
    testScreen.innerHTML = ""
    submitTest.classList.add("d-none")
    questionArea.classList.add("d-none")

    // إظهار السكور
    scoreBox.innerHTML = `Your Score: ${score} / ${correctAnswers.length}`
    scoreBox.classList.remove("d-none")

    // إظهار زر اللوق اوت
    logoutBtn.classList.remove("d-none")
})

// Logout
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("Islogin")

    testSection.classList.add("d-none")
    form.classList.remove("d-none")

    scoreBox.classList.add("d-none")
    logoutBtn.classList.add("d-none")
    questionArea.classList.remove("d-none")
    QuestionsNum.value = ""
})