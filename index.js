let createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

let createEmployeeRecords = function(nestedArray) {
    return nestedArray.map( emp => createEmployeeRecord(emp))
};

let createTimeInEvent = function(d) {
    let newDate = d.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(newDate[1], 10),
        date: newDate[0]
    });
    
    return this
};

let createTimeOutEvent = function(d) {
    let newDate = d.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(newDate[1], 10),
        date: newDate[0]
    })

    return this
};

let hoursWorkedOnDate = function(d) {
    let inTime = this.timeInEvents.find(function(onDate) {
        return onDate.date === d
    });
    
    let outTime = this.timeOutEvents.find(function(onDate) {
        return onDate.date == d
    });

    return (outTime.hour - inTime.hour) / 100
};

let wagesEarnedOnDate = function(d) {
    let hours = hoursWorkedOnDate.call(this, d)

    let wage = this.payPerHour * hours

    return wage
};
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
};

let findEmployeeByFirstName = function(array, emp) {
    return array.find(person => {
        return person.firstName === emp
    });
};

let calculatePayroll = function(array) {
    return array.reduce(function(memo, emp) {
        return memo + allWagesFor.call(emp)
    }, 0)
};