/* Your Code Here */

let createEmployeeRecord = function(arr){
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(nestedArr){
  return nestedArr.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(date){
  let newDate = date.split(" ")

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(newDate[1], 10),
    date: newDate[0]
  })

  return this
}

let createTimeOutEvent = function(date){
  let newDate = date.split(" ")

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(newDate[1], 10),
    date: newDate[0]
  })

  return this
}

let hoursWorkedOnDate = function(date){
  let timeIn = this.timeInEvents.find(function(onDate){
    return onDate.date === date
  })
  let timeOut = this.timeOutEvents.find(function(onDate){
    return onDate.date === date
  })
  return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function(date){
  let hours = hoursWorkedOnDate.call(this, date)

  let payOwed = this.payPerHour * hours

  return payOwed
}

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
