function createEmployeeRecord(element){
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(function(e){
        return createEmployeeRecord(e)
    })
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(hour)})
    return this 
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({type: "TimeOut", date: date, hour: parseInt(hour)})
    return this 
}

function hoursWorkedOnDate(wantedDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === wantedDate
    })
    let outEvent = this.timeOutEvents.find(function(e){
       return  e.date === wantedDate 
    })
    return (outEvent.hour - inEvent.hour) / 100 
}

function wagesEarnedOnDate(daysSought){
    return hoursWorkedOnDate.call(this, daysSought) * this.payPerHour 
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((e) => {
        return e.firstName === firstName 
    })
}

function calculatePayroll(employeeArray){
    return employeeArray.reduce(function(memo, pay){
        return memo + allWagesFor.call(pay)
    }, 0)
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