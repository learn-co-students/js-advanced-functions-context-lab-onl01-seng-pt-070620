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

const createEmployeeRecord = function (arr) {
    const emp = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return emp
}

const createEmployeeRecords = function (arr) {
    const records = arr.map(function (e) {
        return createEmployeeRecord(e)
    })
    return records
}

const createTimeInEvent = function (dateTime) {
    const [date,hour] = dateTime.split(' ')
    this.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(hour)})
    return this
}

const createTimeOutEvent = function (dateTime) {
    const [date,hour] = dateTime.split(' ')
    this.timeOutEvents.push({type: "TimeOut", date: date, hour: parseInt(hour)})
    return this
}

const hoursWorkedOnDate = function (date) {
    const timeIn = this.timeInEvents.find(e => {
        return e.date == date
     })
    const timeOut = this.timeOutEvents.find(e => {
     return e.date == date
     })
     return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this,date) * this.payPerHour
}

const calculatePayroll = (record) => {
    return record.reduce((memo, emp) => {
        return memo + allWagesFor.call(emp)
    }, 0)
} 

const findEmployeeByFirstName = (record, name) => {
    return record.find(obj => {
        return obj.firstName === name
    });
};