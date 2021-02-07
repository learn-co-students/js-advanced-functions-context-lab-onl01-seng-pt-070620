/* Your Code Here */

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


let createEmployeeRecord = function(column){
    return {
        firstName: column[0],
        familyName: column[1],
        title: column[2],
        payPerHour: column[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeInfo){
    return employeeInfo.map(function(column){
        return createEmployeeRecord(column)
    })

}

const createTimeInEvent = function(dateTime){
    let [date, hour] = dateTime.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}


const createTimeOutEvent = function(dateTime){
    let [date, hour] = dateTime.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}


const hoursWorkedOnDate = function(day){
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === day
    })

    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === day
    })
        return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate= function( day){
    return hoursWorkedOnDate.call(this, day) * this.payPerHour
}

const findEmployeeByFirstName = function(employees, name){
    let employeeName  = employees.find(function(e){
        return e.firstName === name
    })
    return employeeName

}

const calculatePayroll = function(employees){
    let employeeWages = employees.map( e => allWagesFor.call(e))
    let grandTotalOwed = employeeWages.reduce(function(sum, i){
        return sum + i
    })
    return grandTotalOwed
    }