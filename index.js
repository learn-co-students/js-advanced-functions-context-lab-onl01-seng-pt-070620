/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

// take individual record and process it
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour:array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// take all records and pass them to map then to createEmployeeRecord to process it
function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(function(array){
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
       
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })

    return this
}

let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find(function(d){
        return d.date === date
    })
    let timeOut = this.timeOutEvents.find(function(d){
        return d.date === date
    })

    return (timeOut.hour - timeIn.hour)/100

}

let wagesEarnedOnDate = function(date){
    // this = createEmployeeRecord
    let wages = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return parseFloat(wages.toString())
}


let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}
