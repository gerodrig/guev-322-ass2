const fs = require('fs');

let employees = [];

let departments = [];

module.exports.initialize = () => {

    return new Promise((resolve, reject) => {
        try {
        
            fs.readFile('./data/departments.json', 'utf8', (err,data) => {
                if(err) {
                    throw err;
                }
                if(data.length !== 0){
                departments = JSON.parse(data);
                }
                //console.log(departments);
            });

            fs.readFile('./data/employees.json', 'utf8', (err,data) => {
                if(err) {
                    throw err;
                }

                if(data.length !== 0){
                employees = JSON.parse(data);
                }
                //console.log(employees);
            });

    
        } catch (err) {
            console.log(err)
            reject("Unable to read the file");
        }

        resolve("file was read successfully")
    });

};

module.exports.getAllEmployees = () => {

    return new Promise((resolve, reject) => {
        try {
            if (employees.length === 0){
                throw "No results returned"
            }
    
            //console.log(employees);
        } catch (error) {
            reject(error);
        }
        resolve(employees);
    });
}; 

module.exports.getManagers = () => {
    

    return new Promise((resolve, reject) => {

        try {
            if (employees.length === 0){
                throw "No results returned";
            }
    
            const managers = employees.filter(employee => employee.isManager );
            if(managers.length === 0){
                throw "No results returned";
            }

            
        } catch (error) {
            reject(error);
        }           

        resolve(JSON.parse(managers));
    });
}

module.exports.getDepartments = () => {
    
    return new Promise((resolve, reject) => {

        try {
            if (departments.length === 0){
                throw "No results returned";
            }

        //console.log(departments);
        } catch (error) {
            reject(error);
        }

        resolve(departments);
    })
}
