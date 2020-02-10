var baseUrl = "http://localhost:3000"

$(window).on("load", function() {
  let access_token = localStorage.getItem("access_token")
  if(access_token) {
    $("#loginPage").hide()
    $("#mainPage").show()
    $("#logoutbutton").show()
    showData()
  } else {
    $("#logoutbutton").hide()
    $("#loginPage").show()
    $("#regispage").hide()
    $("#mainPage").hide()
    
  }
})

function login() {
  console.log("masukkkkkk")
  $.ajax(`${baseUrl}/login`, {
    method: "POST",
    data: {
      email : $("#emailLogin").val(),
      password: $("#passwordlLogin").val()
    },
    success: function(res) {
      let access_token = res.access_token
      localStorage.setItem("access_token", access_token)
      $("#loginPage").hide()
      showData()
      $("#mainPage").show()
    },
    error : function(err) {
      console.log(err)
    }
  })
}

function toRegis() {
  $("#logoutbutton").hide()
  $("#regispage").show()
  $("#loginPage").hide()
}

function toLogin() {
  $("#logoutbutton").hide()
  $("#regispage").hide()
  $("#loginPage").show()
}

function register() {
  $.ajax(`${baseUrl}/register`, {
    method: "POST",
    data: {
      name: $("#nameRegister").val(),
      email : $("#emailRegister").val(),
      password: $("#passwordlRegister").val()
    },
    success: function(res) {
      console.log("berhasilll")
    },
    error : function(err) {
      console.log(err)
    }
  })
}

function  logout() {
  localStorage.clear()
  $("#mainPage").hide()
  $("#loginPage").show()
}

function templateData (data) {
  let template = `
  <div class="card text-center">
  <img
    src="${data.imageUrl}"
    class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-text">${data.author}</p>
    <div onclick="editComic(${data})" class="btn btn-primary">Edit</div>
  </div>
</div>
  `
  return template
}

function showData() {
  $.ajax(`${baseUrl}/comics`, {
    method:"GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    success: function (comics) {
      $("#mainPage").empty()
      comics.forEach(el => {
        $("#tempatComic").append(templateData(el))
      });
    }
  })
}

function updateComic(id) {
  $.ajax(`${baseUrl}/${id}`,{
    method:"PUT",
    data: {
      title: $("#titleEdit").val(),
      author: $("#authorEdit").val(),
      imageUrl: $("#imageUrlrEdit").val()
    },
    success: function(res) {
      $("#editTemplate").hide()
      showData()
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function editComic(data) {
  let template = templateEdit(data)
  $("#editTemplate").append(template)
  $("#editTemplate").show()
}

function templateEdit(data) {
  let template = `
  <h1>Update Comic</h1>
  <form class="my-4">
    <div class="form-group">
      <label for="title">Title</label>
      <input id="titleEdit" type="text" class="form-control" name="title" value= "${data.title}"/>
    </div>
    <div class="form-group">
      <label for="author">Author</label>
      <input type="text" class="form-control" id="authorEdit"   value= "${data.author}"/>
    </div>
    <div class="form-group">
      <label for="imageUrl">Comic Image URL</label>
      <input type="text" class="form-control" id="imageUrlEdit"  value= "${data.imageUrl}"/>
    </div>
    <div id="btn-update" type="submit" class="btn btn-primary" onclick= "updateComic(${data.id})">
      Submit
    </div>
  </form>
</div>
`
return template
}

function apiRandom() {
  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });
}

