var express = require('express');
var bodyParser = require('body-parser');
var xlsx = require('xlsx');
var fs = require('fs');
var db = require('./Db_Connection');

var app=express();

app.use(express.static('HTML'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for serving the main admin page
app.get('/', function (request, response) {
    response.redirect('/admin.html');
});

// for viewing database emp_table
app.get("/viewDataEmp", function (request, response) {
    var selQry = 'select fullName, email,password,userType from login_table';
    db.connection.query(selQry, function (err, results) {
        if (err) {
            alert('there is an error inside viewData Employee');
            
        }  
        console.log(results); 
        response.send(results);
    });
});

// Route for saving data for employee
app.post('/saveDataEmp', function (request, response) {
    console.log(request.body);
    var query = 'INSERT INTO login_table VALUES(?,?,?,?)';
    var qryData = [
        request.body.fullName, request.body.email, request.body.password,
        request.body.userType
    ];
    db.connection.execute(query, qryData, function (err, result) {
        if (err) {
            alert("there is an error in the saveData of employee method on the server side")
        }
        response.send('Employee DATA IS INSERTED');
    });
});

//Employee to edit data from database :it will open form of selected id to edit or update values
app.post('/editDataEmp',function(request,response){
    var student="SELECT * FROM login_table WHERE email=?"
    var qryData=[request.body.email]
    db.connection.execute(student,qryData,function(err,results){
        if(err){
            console.log("error")
        }
        else{
         console.log(results); 
        response.send(results)
        }
    })
})


//to updated the selected email Employee:
app.post('/updateEmp',function(request,response){
    var updateQuery = `UPDATE login_table SET fullName=?  WHERE email=?`;
    var qryData = [
        request.body.fullName,
        request.body.email
    ];

    db.connection.execute(updateQuery, qryData, function(err, result) {
        if (err) {
            console.log("error");
            response.send("Error updating student data");
        } else {
            response.send("Student data updated successfully");
        }
    });
})

// delete for employee
app.post('/deleteDataEmp',function(request,response){
    var delQUery='Delete From login_table Where email=?'
    var qryData=[request.body.email]
    db.connection.execute(delQUery,qryData,function(err,result){
        if(err){
            response.send("error")
        }
        response.send('Data is deleted')
    })
})

// for viewing database student_table
app.get("/viewData", function (request, response) {
    var selQry = 'select rollNo, fullName, email, mobileNo, instituteName, courseName, passoutYear, stream, associationType from student_table';
    db.connection.query(selQry, function (err, results) {
        if (err) {
            alert('there is an error inside viewData');
            
        }       
        response.send(results);
    });
});



// TO DELETE DATA FROM THE DATABASE
app.post('/deleteData',function(request,response){
    var delQUery='Delete From student_table Where rollNo=?'
    var qryData=[request.body.rollNo]
    db.connection.execute(delQUery,qryData,function(err,result){
        if(err){
            response.send("error")
        }
        response.send('Data is deleted')
    })
})
 
// to edit data from database :it will open form of selected id to edit or update values
app.post('/editData',function(request,response){
    var student="SELECT * FROM student_table WHERE rollNo=?"
    var qryData=[request.body.rollNo]
    db.connection.execute(student,qryData,function(err,result){
        if(err){
            console.log("error")
        }
        else{
        //     var data=` Update the data
            
        //    <table>
        //    <tr>
        //    <td>RollNo</td>
        //    <td><input type="text" value="${result[0].rollNo}" id='rollNo' name="rollNo" required readonly></td></tr> 
        //     <tr>
        //    <td>NAME</td>
        //    <td><input type="text" value="${result[0].fullName}" id='fullName' name="fullName" required></td></tr>
        //     <tr>
        //    <td>EMAIL</td>
        //    <td><input type="email" value="${result[0].email}" id='email' name="email" required></td></tr>
        //     <tr>
        //    <td>MOBILE</td>
        //    <td><input type="text" value="${result[0].mobileNo}" id='mobileNo' name="mobileNo" required></td></tr>
        //     <tr>
        //    <td>InstituteName</td>
        //    <td><input type="text" value="${result[0].instituteName}" id='instituteName' name="instituteName" required></td></tr>
        //     <tr>
        //    <td>CourseName</td>
        //    <td><input type="text" value="${result[0].courseName}" id='courseName' name="courseName" required></td></tr>
        //     <tr>
        //    <td>passoutYear</td>
        //    <td><input type="text" value="${result[0].passoutYear}" id='passoutYear' name="passoutName" required></td></tr>
        //     <tr>
        //    <td>Stream</td>
        //    <td><input type="text" value="${result[0].stream}" id='stream' name="stream" required></td></tr>
        //     <tr>
        //    <td>AssociationType</td>
        //    <td><input type="text" value="${result[0].associationType}" id='associationType' name="associationType" required></td></tr>
        //    <tr><td><input type ="submit" value="UPDATE" onclick='update()'></td></tr>
        //    </table>
          
        //    `
        response.send(result)
        }
    })
})


//to updated the selected id :
app.post('/update',function(request,response){
    var updateQuery = `UPDATE student_table SET fullName=?, email=?, mobileNo=?, instituteName=?, 
                       courseName=?, passoutYear=?, stream=?, associationType=? WHERE rollNo=?`;
    var qryData = [
        request.body.fullName,
        request.body.email,
        request.body.mobileNo,
        request.body.instituteName,
        request.body.courseName,
        request.body.passoutYear,
        request.body.stream,
        request.body.associationType,
        request.body.rollNo
    ];

    db.connection.execute(updateQuery, qryData, function(err, result) {
        if (err) {
            console.log("error");
            response.send("Error updating student data");
        } else {
            response.send("Student data updated successfully");
        }
    });
})

// Route for saving data
app.post('/saveData', function (request, response) {
    console.log(request.body);
    var query = 'INSERT INTO student_table VALUES(?,?,?,?,?,?,?,?,?)';
    var qryData = [
        request.body.rollNo, request.body.fullName, request.body.email, request.body.mobileNo,
        request.body.instituteName, request.body.courseName, request.body.passoutName, request.body.stream,
        request.body.associationType
    ];
    db.connection.execute(query, qryData, function (err, result) {
        if (err) {
            alert("there is an error in the saveData method on the server side")
        }
        response.send('DATA IS INSERTED');
    });
});



// for searching data from the student_table
app.post('/searchData', function (request, response) {
    console.log("we are inside the searchData function");
    var searchValue = `%${request.body.value}%`;
    var query = `select * from student_table where fullName like ? or rollNo like ? or email like ?`;
    db.connection.execute(query, [searchValue, searchValue, searchValue], function (error, results) {
        if (error) {
            alert("error inside the searchData")
        }

        let tableRows = results.map(result => `
            <tr>
                <td>${result.rollNo}</td><td>${result.fullName}</td><td>${result.email}</td><td>${result.mobileNo}</td><td>${result.instituteName}</td><td>${result.courseName}</td><td>${result.passoutYear}</td><td>${result.stream}</td><td>${result.associationType}</td>
            </tr>
        `).join('');

        response.send(`
            <table>
                <thead>
                    <tr>
                        <th>Roll no</th><th>Full Name</th><th>Email</th><th>Mobile No</th><th>Institute Name</th><th>Course Name</th><th>Passout Year</th><th>Stream</th><th>Association Type</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        `);
    });
});

// Middleware for handling raw file uploads
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }));

// Define route for file upload and data insertion
app.post('/browseData', (req, res) => {

    // Save the file temporarily
    var tempFilePath = 'temp_upload.xlsx';
    fs.writeFileSync(tempFilePath, req.body);

    // Read the uploaded file
        //the temp file is read using xlsx.readFile module
    var file = xlsx.readFile(tempFilePath);
        //it then reads the name of the sheets
    var sheetNames = file.SheetNames;
        //it then access the first sheet
    var sheet = file.Sheets[sheetNames[0]];
        //lastly it converts the datasheet to a json file
    var data = xlsx.utils.sheet_to_json(sheet);

    var data1 = data.map(row => [row.rollNo, row.fullName, row.email, row.mobileNo, row.instituteName, row.courseName, row.passoutYear, row.stream, row.associationType])

    // Insert data into the database
        var query = 'INSERT INTO student_table values ?';
        db.connection.query(query, [data1], (err, result) => {
            if (err) {
                console.error('Error occurs while inserting data' + err);
            } else {
                console.log('Data inserted');
                    // Send response
            res.send('File uploaded and data inserted successfully');
            }
        });
    


    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
});

app.use(bodyParser.json()); 

app.get("/searchStreamList", function(req, res) {

    var query = `select distinct stream from student_table`;
    db.connection.execute(query, function(err, results) {
        if(err) {
            alert("there is an error in the server side component")
        }
        
        var options = results.map(result => {
            return `<option value=${result.stream}>${result.stream}</option>`

        }).join('')

        res.send(options)

    })
})

app.post("/searchStream", function(req, res) {
    console.log("I am on the server side at searchStream request")
    console.log(req.body)
    var value = req.body.value ? `%${req.body.value}%` : null;
    var value1 = req.body.value1 && req.body.value1 !== '-1' ? `%${req.body.value1}%` : null;
    var query = `select * from student_table where`;
    var set = []
    if (value !== null && value1 == null) {
        query += ` stream like ?`
        set.push(value)
    } else if (value == null && value1 !== null) {
        query += ` passoutYear like ?`
        set.push(value1)
    } else if (value !== null && value1 !== null){
        query += ` stream like ? && passoutYear like ?`
        set.push(value, value1)
    }
    db.connection.execute(query, set, function (error, results) {
        if (error) {
            alert("error inside the searchData")
        }
        console.log(results)
        res.send(results);  
    })

})

app.get("/searchYearList", function(req, res) {

    var query = `select distinct passoutYear from student_table`;
    db.connection.execute(query, function(err, results) {
        if(err) {
            alert("there is an error in the server side component")
        }
        var options = results.map(result => {

            return `<option value=${result.passoutYear}>${result.passoutYear}</option>`

        }).join('')
        res.send(options)

    })
})


//to see the server is working
app.listen(8080, function () {
    console.log('Server is running at 8080');
});
