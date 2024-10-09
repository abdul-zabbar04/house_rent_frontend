const UpdateProfile= (event)=>{
    event.preventDefault();
    const form = document.getElementById('profile-update-form');
    const formData = new FormData(form);
    const token= localStorage.getItem("authToken")
    console.log(formData);

    // Fetch the API to update the profile using PATCH
    fetch('https://smart-rent.vercel.app/api/user/update/', {
        method: 'PATCH',
        body: formData,
        headers: {
            Authorization : `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('response-message').textContent = 'Profile updated successfully!';
        } else {
            document.getElementById('response-message').textContent = 'Error updating profile: ' + JSON.stringify(data.errors);
        }
    })
    .catch(error => {
        // console.error('Error:', error);
        document.getElementById('response-message').textContent = 'An error occurred while updating your profile.';
    });
}

const editProfileLoad= ()=>{
    const token= localStorage.getItem("authToken")
    const profile= document.getElementById("profile-data")
    if(token){

        fetch("https://smart-rent.vercel.app/user/",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`,
            },
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data.profile_image);
            document.getElementById('first_name').value = data.first_name;
            document.getElementById('last_name').value = data.last_name;
            
        })
    }
    else{
        window.location.href= "./login.html"
    }   
}
editProfileLoad()