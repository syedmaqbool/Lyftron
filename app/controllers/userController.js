const userModel = require('../models/userModel');
const axios = require('axios');

/*
Fetch Data from Database
If data not exist it will call the api url to get the latest data
*/
const getUsers = (request, response) => {

   userModel.getUsersData().then(user => {
				if(user.length == 0){
					readUserData().then(res => {
					response.status(200).send({status:200,msg:'Data Fetehced',data:res});
				})
				}
				else 
				response.status(200).send({status:200,msg:'Data Fetehced',data:user});
			})
			.catch(error => {
				response.status(201).send({status:400,msg:'Something went wrong',data:''});
			});
 
}

const createUser = (request, response) => {
 
}
/*
Fetch Data from api url and insert into db
*/
const readUserData = (request, response) => {
	
	let url = "https://reqres.in/api/users?page=2";
		return axios.get(url)
			.then(res => {
						return userModel.createUserData(res.data.data).then(res => {
									return res
						}).catch((err) => {return err});
				  })
				  .catch(error => {
					console.log(error);
						return error;
				  });

}

module.exports = {
  getUsers,
  createUser,
  readUserData
 }