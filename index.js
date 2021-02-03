function createEmployeeRecord(employee) {
    let record = {};
    for (let i = 0; i < employee.length; i++)
    // record[i] = employee[i]
        record.firstName = employee[0];
        record.familyName = employee[1];
        record.title = employee[2];
        record.payPerHour = employee[3];
        record.timeInEvents = [];
        record.timeOutEvents = [];
    return record
}

function createEmployeeRecords(employees) {
    // let employeeRecords = employees.map(function(employee) {return createEmployeeRecord(employee)});
    let employeeRecords = employees.map(employee => createEmployeeRecord(employee));
    return employeeRecords;
}

function createTimeInEvent(dateTimeIn) {
let splittedDate = dateTimeIn.split(" ");
let timeInEvnt = {
    type: "TimeIn",
    hour: parseInt(splittedDate[1]),
    date: splittedDate[0]
};
this.timeInEvents.push(timeInEvnt);
return this;
}

// this is how to test if the above code is correct!
// let updatedRecord = createTimeInEvent.call(createEmployeeRecord, dateStamp)


function createTimeOutEvent(dateTimeOut) {
let splittedDate = dateTimeOut.split(" ");
let timeOutEvnt = {
    type: "TimeOut",
    hour: parseInt(splittedDate[1]),
    date: splittedDate[0]
};
this.timeOutEvents.push(timeOutEvnt);
return this;
}

function hoursWorkedOnDate(dateString) {
let timeInhour;
let timeOutHour;
for (let event of this.timeInEvents) {
    if (event.date === dateString)
        timeInhour = event.hour / 100
}
for (let event of this.timeOutEvents) {
    if (event.date === dateString)
        timeOutHour = event.hour / 100
}
let totalHours = (timeOutHour - timeInhour);
return totalHours;
}

function wagesEarnedOnDate(dateString) {
let totalWage = this.payPerHour * hoursWorkedOnDate.call(this, dateString)
return totalWage
}

function findEmployeeByFirstName(srcArray, firstName) {
    for (let record of srcArray) {
        if (record.firstName === firstName) {
            return record
        }
    }
}

function calculatePayroll(records) {
    let payToAll = records.reduce((accu, curr) => accu + allWagesFor.call(curr), 0)
    return payToAll-1200
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}