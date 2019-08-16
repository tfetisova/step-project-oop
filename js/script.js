/**
 * Created on 14.08.2019.
 */


const mainButton = document.querySelector('.create-visit');//главная кнопка "Создать визит"
const select = document.querySelector('.select');// Выбор врача
const visitorName = document.getElementById('fullname-input');//ФИО пациента
const target = document.getElementById('target-input');//Цель визита
const nextVisit = document.getElementById('next-visit-input');//Дата следующего визита
const illnessList = document.getElementById('illness-input');//Список перенесенных заболеваний
const lastVisit = document.getElementById('last-visit-input');//Дата последнего визита
const weighClient = document.getElementById('weight-input');//Индекс массы тела
const ageClient = document.getElementById('age-input');//Возраст пациента
const comment = document.getElementById('comment-input');//Комментарии
const modalButton = document.querySelector('.btn-modal');//Кнопка "Создать визит" на модальном окне
const modalCrossButton = document.querySelector('.cross'); //кнопка-крестик на модальном окне
const pressureValue = document.getElementById('pressure-input'); //давление
const modalWindow = document.querySelector('.modal'); //Модальное окно
const inputFields = document.querySelectorAll('form>input'); //Инпуты
const closeCard = document.querySelector('.close');

let visits=[];
function addVisit(visitObj){
    visits.push(visitObj);
    console.log(visits);
}
function removeVisit(visitObjId) {
    let removeIndex = visits.findIndex((e)=>{
        return e.visitId === visitObjId
    });
    visits.splice(removeIndex, 1);
}
closeCard.addEventListener('click', (e)=>{
    let visitingCardID = +this.parentNode.dataset.visitId;
    // let visitObjToRemove= document.querySelector(`.visiting-card[data-visit-Id=${visitingCardID}]`);
    removeVisit(visitingCardID);
});
function checkVisits(visits) {
    const noVisitsText = document.querySelector('.no-visit');
    if(visits.length===0){
        noVisitsText.classList.add('active');
    }else{
        noVisitsText.classList.remove('active');
    }
}
function checkLocalStorage() {

    let localStorageVisits = localStorage.getItem('localVisits');
    if(localStorageVisits===null){
        console.log('No saved Visits on Local Storage');
    }else{
        let parsedVisits = JSON.parse(localStorageVisits);
        console.log(parsedVisits);
    }
}
function pushVisitsToLocalStorage(visits) {
    alert(`visits = ${visits}, JSON stringify visits = ${JSON.stringify(visits)}`);
    if(visits.length>0){
        let localStorageVisits = JSON.stringify(visits);
        localStorage.setItem('localVisits',localStorageVisits);
    }
}
window.onload = checkVisits(visits);
window.onload = checkLocalStorage();




class Visit {
    constructor(doctor,visitDate,fullname,visitTarget, visitID){
        this._doctor = doctor;
        this._visitDate = visitDate;
        this._fullname = fullname;
        this._visitTarget = visitTarget;
        this._visitId = visitID
    }
    get visitId(){
        return this._visitId;
    }


}
class VisitToCardiologist extends Visit{
    constructor(doctor,visitDate,fullname,visitTarget, visitID, preassure, weightIndex,age, illnesses){
        super(doctor,visitDate,fullname,visitTarget, visitID);
        this._preassure = preassure;
        this._weightIndex = weightIndex;
        this._age = age;
        this._illnesses = illnesses;
    }
}
class VisitToDentist extends Visit{
    constructor(doctor,visitDate,fullname,visitTarget, visitID,lastVisitDate){
        super(doctor,visitDate,fullname,visitTarget, visitID);
        this._lastVisitDate = lastVisitDate;
    }
}
class VisitToTherapist extends Visit{
    constructor(doctor,visitDate,fullname,visitTarget, visitID,age){
        super(doctor,visitDate,fullname,visitTarget, visitID);
        this._age = age;
    }
}
mainButton.addEventListener('click',function () {
    modalWindow.classList.add('active');
});
select.addEventListener('change',function () {
    inputFields.forEach(function (element) {
        element.style.display = 'none';
    });
    switch (select.selectedIndex) {
        case(0):
            target.style.display = 'block';
            pressureValue.style.display = 'block';
            weighClient.style.display = 'block';
            illnessList.style.display = 'block';
            ageClient.style.display = 'block';
            visitorName.style.display = 'block';
            nextVisit.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = 'inline-block';
            break;
        case(1):
            target.style.display = 'block';
            lastVisit.style.display = 'block';
            visitorName.style.display = 'block';
            nextVisit.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = ' inline-block';
            break;
        case(2):
            visitorName.style.display = 'block';
            nextVisit.style.display = 'block';
            ageClient.style.display = 'block';
            target.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = 'inline-block';
            break;
    }
});
modalCrossButton.addEventListener ('click',function () {
    modalWindow.classList.remove('active')
});

modalButton.addEventListener('click', function (e) {
    e.preventDefault();
    let selectIndex = select.selectedIndex,
        doctor = select.options[selectIndex].value,
        visitDate = nextVisit.value,
        visitTarget = target.value,
        fullname = visitorName.value,
        illnesses = illnessList.value,
        lastVisitDate = lastVisit.value,
        age = ageClient.value,
        weightIndex = weighClient.value,
        pressure = pressureValue.value,
        commentText = comment.value,
        visitID = Date.now(),
        newVisit;
    switch (selectIndex) {
        case(0):
            newVisit = new VisitToCardiologist(doctor,visitDate,fullname,visitTarget, visitID, pressure, weightIndex,age, illnesses);
           break;
        case(1):
            newVisit = new VisitToDentist(doctor,visitDate,fullname,visitTarget, visitID,lastVisitDate);
            break;
        case(2):
            newVisit = new VisitToTherapist(doctor,visitDate,fullname,visitTarget, visitID,age);
          break;
    }

    addVisit(newVisit);
    console.log(newVisit);
    checkVisits(visits);
    modalWindow.classList.remove('active');
});
window.addEventListener('beforeunload',()=>{
    pushVisitsToLocalStorage(visits);
});


// const newVisit = new Visit('Therapist','22.08','Татьяна Фетисова','плановый осмотр');
// console.log(newVisit);
// const newVisitDentist = new VisitToDentist('Dentist','10.08','Vasya','plomba','9.07');
// const newVisitCardiologist = new VisitToCardiologist('cardiologist','12/09','serio Karelli','heart','100/60', '2', 'none');
// console.log(newVisitDentist);
// newVisitDentist.addVisit();
// newVisitCardiologist.addVisit();
