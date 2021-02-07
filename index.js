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

function createEmployeeRecord(data){
    const employee = {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee
}

const createEmployeeRecords = function(employees){
    let employeeRecords =  employees.map(employeeRecord => createEmployeeRecord(employeeRecord))
    return employeeRecords
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



const hoursWorkedOnDate = function(dateTime){
   let [day, hour] = dateTime.split(' ')

   const timeIn = this.timeInEvents.find(function (e){
       return e.date === day
   })

   const timeOut = this.timeOutEvents.find(function (e){
       return e.date === day
   })
   
   return (timeOut.hour - timeIn.hour) /100
}

const wagesEarnedOnDate = function(dateTime){
 return  hoursWorkedOnDate.call(this, dateTime) * this.payPerHour
}

// const allWagesFor = function(employeeRecord){
//    let wages = employeeRecord.timeInEvents.map(e => wagesEarnedOnDate(employeeRecord, e.date))
//    let totalEarned = wages.reduce(function (sum, i){
//        return sum + i
//    })
// return totalEarned
// }


const calculatePayroll = function(employees){
   let employeeWages = employees.map(e => allWagesFor.call(e))
   let totalPaid = employeeWages.reduce(function (sum, i){
       return sum + i
   })
   return totalPaid
}


const findEmployeeByFirstName = function(emps, name) {
   let employee = emps.find(e => e.firstName === name)
   return employee;
}
