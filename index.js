/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



function createEmployeeRecord(employee) {
    return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
    }
}

function createEmployeeRecords(employees){
  return  employees.map(fn => createEmployeeRecord(fn))
}

function createTimeInEvent(time){
    let newTimeEvent = {
        date: time.split(" ")[0],
        hour: parseInt(time.split(' ')[1]),
        type: "TimeIn"
    }
    this.timeInEvents.push(newTimeEvent);
    return this;
}

function createTimeOutEvent(time){
    let newTimeOutEvent = {
        date: time.split(' ')[0],
        hour: parseInt(time.split(' ')[1]),
        type: "TimeOut"
    }
    this.timeOutEvents.push(newTimeOutEvent);
    return this;
}

function hoursWorkedOnDate(day){
    let startTime = this.timeInEvents.find(function(e){
        return e.date === day;
    })
    let endTime = this.timeOutEvents.find(function(e){
        return e.date === day;
    })
    let hoursWorked = (endTime.hour - startTime.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(date){
    let hours = hoursWorkedOnDate.call(this, date);

    return hours * this.payPerHour;
};

function calculatePayroll(allEmployees) {
    let totalWages = allEmployees.reduce(function(accumulator, employee){
        return accumulator + allWagesFor.call(employee)
    }, 0)
    return totalWages
}

function findEmployeeByFirstName(allEmployees, employeeFirst) {
    return allEmployees.find(e => e.firstName === employeeFirst)
}






 let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}