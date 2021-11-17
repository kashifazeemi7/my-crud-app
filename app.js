//some jquery 
$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();

});

// Edit row on button click
$(document).on("click", ".edit", function(){			
    $(this).parents("tr").find(".add, .edit").toggle();
   
});

// Displaying All Users on the table
function getAllUsers() {

    axios.get('https://server-crudapp-mongodb.herokuapp.com/users')
        .then(function (response) {
            console.log(response);

            let users = response.data;

            document.getElementById("userdata").innerHTML = ""

            users.map((eachUser, index) => {
                document.getElementById("userdata").innerHTML +=
                    `<tr>   
                        <th scope="row">${eachUser._id}</th>
                        <td id="name-${eachUser._id}">${eachUser.name}</td>
                        <td id="email-${eachUser._id}">${eachUser.email}</td>
                        <td id="address-${eachUser._id}">${eachUser.address}</td>
                        <td>
          <a class="add" onclick="updateUser('${(eachUser._id)}')" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                        <a class="edit" id="('${(eachUser._id)}')" onclick="editUser('${eachUser._id}')" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                        <a class="delete" onclick="deleteUser('${(eachUser._id)}')" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                    </td>
                    </tr>`
            })
        })
}


//Create a new user 
function createNewUser() {
    let name = document.getElementById("inputName").value
    let email = document.getElementById("inputEmail").value
    let address = document.getElementById("inputAddress").value

    axios.post('https://server-crudapp-mongodb.herokuapp.com/user', {
        name: name,
        email: email,
        address: address
    }).then(function (response) {
            console.log(response);
            getAllUsers()
            document.getElementById("alert").innerHTML =
                `<div class="alert alert-success" role="alert">
                   Well done! ${name} is created!
                </div>`
            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 1500);
        })

    
        document.getElementById("inputName").value = "";
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputAddress").value = "";
}



//Deleting a specific user from DB

function deleteUser(_id) {
console.log(_id)
    axios.delete(`https://server-crudapp-mongodb.herokuapp.com/user/${_id}`).then(function (response) {
            console.log(response);

            getAllUsers();

            document.getElementById("alert").innerHTML =
                `<div class="alert alert-danger" role="alert">
                    User Deleted Success!
                </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 1500);

        })
}



// Edit row on edit button click
function editUser(_id) {
    // let editClick = document.getElementById(`"${_id}"`)
    // editClick.style.display = "none";

    let inputName = document.getElementById(`name-${_id}`).innerText;
    let inputEmail = document.getElementById(`email-${_id}`).innerText;
    let inputAddress = document.getElementById(`address-${_id}`).innerText;
    
    let current_data = []
    current_data.push(inputName,inputEmail,inputAddress)
    console.log(current_data)
    
    // let assets = ["name","email","address"]
    document.getElementById(`name-${_id}`).innerHTML = '<input id="' + `in-name-${_id}` + '"' + 'value="' + inputName +  '" >'
    document.getElementById(`email-${_id}`).innerHTML = '<input id="' + `in-email-${_id}` + '"' + 'value="' + inputEmail +  '" >'
    document.getElementById(`address-${_id}`).innerHTML = '<input id="' + `in-address-${_id}` + '"' + 'value="' + inputAddress +  '" >'
}




// Delete row on delete button click
$(document).on("click", ".delete", function(){
    $(this).parents("tr").remove();
});

function updateUser(_id) {
    
    let name = document.getElementById(`in-name-${_id}`).value
    let email = document.getElementById(`in-email-${_id}`).value
    let address = document.getElementById(`in-address-${_id}`).value
console.log(name,email,address)
    axios.put(`https://server-crudapp-mongodb.herokuapp.com/user/${_id}`, { name, email, address })
        .then(function (response) {
            console.log(response);

            getAllUsers();

            document.getElementById("alert").innerHTML =
                `<div class="alert alert-success" role="alert">
                    User Updated Success!
                </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = "" 
            }, 1500);

        })

}

getAllUsers();
