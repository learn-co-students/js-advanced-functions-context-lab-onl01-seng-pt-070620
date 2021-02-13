/* Your Code Here */

// const { returns } = require("chai-spies")

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(employeeArray){
    let employeeRecord = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents:[]
    }
    return employeeRecord
}

function createEmployeeRecords(employeeArrays){
    let employeeRecords = []
    employeeArrays.forEach(function(employeeArray){
        employeeRecords.push(createEmployeeRecord(employeeArray))
    })
    return employeeRecords
}

function createTimeInEvent(dateStamp){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return this
}

function createTimeOutEvent(dateStamp){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return this
}

function hoursWorkedOnDate(date){
    const timeIn = this.timeInEvents.find((e) => e.date === date).hour
    const timeOut = this.timeOutEvents.find((e) => e.date === date).hour
    return (timeOut - timeIn)/100
  }

  function wagesEarnedOnDate(dateForm) {
    let payRate = this.payPerHour
    let hoursWorked = hoursWorkedOnDate.call(this, dateForm) 
    
    return hoursWorked * payRate
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

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(record) {
        return record.firstName === firstName
    })
}

function calculatePayroll(Array) {
    return Array.reduce(function(memo, d) {
        return memo + allWagesFor.call(d)}, 0)
}