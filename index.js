/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

function hoursWorkedOnDate(dateForm) {
    let timeIn = this.timeInEvents.find(function(e) {
        return e.date === dateForm
    })
    let timeOut = this.timeOutEvents.find(function(e) {
        return e.date === dateForm
    })
    return (timeOut.hour - timeIn.hour) / 100 
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



