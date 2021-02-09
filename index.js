/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (array) {
    let arrayofObjs = []
    for (let i = 0; i < array.length; i++) {
        arrayofObjs.push(createEmployeeRecord(array[i]))
    } 
    return arrayofObjs
}

function createTimeInEvent (dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

function createTimeOutEvent (dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

function hoursWorkedOnDate (wDate) {
    let start = this.timeInEvents.find(function(e){
        return e.date === wDate
    }) 
    let end = this.timeOutEvents.find(function(e){
        return e.date === wDate
    })

    return (end.hour - start.hour) / 100
}

function wagesEarnedOnDate (wDate) {
    let wage = hoursWorkedOnDate.call(this, wDate)
    let money = wage * this.payPerHour
    return money
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


function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(function(name){
        return name.firstName === firstName
    })
}

function calculatePayroll (array) {
    return array.reduce(function(memo, d){
        return memo + allWagesFor.call(d)
    }, 0)
}