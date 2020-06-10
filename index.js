
const getYear = () => {
  const year = document.getElementById("year").value;
  if (!!year.length && !isNaN(year) && !(year < 1000 || year > 9999)) {
    return year
  } else {
    alert('Please Enter valid Year \nProvide Four digit year (between 1000 and 9999)');
    return false
  }
}

const getDaysList = () => {
  let bdayData = null
  try {
    bdayData = JSON.parse(document.getElementById("bdayJson").value)
  } catch {
    alert('Enter valid Json')
    return;
  }
  var days = [[], [], [], [], [], [], []] // list of Bday for all 7 days
  var year = getYear();
  if (!year) { return }
  bdayData.map(bday => {
    var date = new Date(bday.birthday).setFullYear(year)
    var day = new Date(date).getDay();
    // Converting day as for JS Date API, days start with sunday for our calendar days need to start from monday
    day += day > 0 ? -1 : 6;
    days[day][days[day].length] = getInitials(bday.name)
  })
  return days;
}

const getInitials = name => {
  var names = name.split(" ");
  var initials = names[0][0] + names[1][0]
  return initials;
}

updateDays = () => {
  const days = getDaysList();
  if (!days) { return }

  var bdayBoxes = document.querySelectorAll('.bdayBox');
  for (var i = 0; i < 7; i++) {
    bdayBoxes[i].innerHTML = "";
    boxSize = 150 / (Math.ceil(Math.sqrt(days[i].length)) || 1); // get the sizes for box [by getting next perfect square number]
    if (days[i].length) {

      for (var j = 0; j < days[i].length; j++) {
        var bdayDiv = document.createElement("div");
        bdayDiv.appendChild(document.createTextNode(days[i][j]));
        bdayDiv.className = "bday";
        bdayDiv.style.width = boxSize;
        bdayDiv.style.height = boxSize;
        var color = "#" + Math.floor(100000 + (Math.random() * 900000));
        bdayDiv.style.backgroundColor = color;
        bdayBoxes[i].appendChild(bdayDiv);
      }
    } else {
      var noBdayDiv = document.createElement("div");
      noBdayDiv.className = "noBdaySadFaceBox"
      var noBdayImg = document.createElement("img");
      noBdayImg.setAttribute("src", "./assets/sad_face.png")
      noBdayImg.className = "noBdaySadFace";
      noBdayDiv.appendChild(noBdayImg);
      bdayBoxes[i].appendChild(noBdayDiv);
    }
  }

}

const update = () => {
  updateDays()
}

const addDefaultJson = () => {
  document.getElementById("bdayJson").value = `
    [
      {
        "name": "Cierra Vega",
        "birthday": "7/20/1990"
      },
      {
        "name": "Alden Cantrell",
        "birthday": "2/23/1998"
      },
      {
        "name": "Kierra Gentry",
        "birthday": "4/4/1967"
      },
      {
        "name": "Pierre Cox",
        "birthday": "11/12/1996"
      },
      {
        "name": "Thomas Crane",
        "birthday": "10/5/1997"
      },
      {
        "name": "Miranda Shaffer",
        "birthday": "3/12/1998"
      },
      {
        "name": "Bradyn Kramer",
        "birthday": "4/5/1992"
      },
      {
        "name": "Alvaro Mcgee",
        "birthday": "12/19/1987"
      },
      {
        "name": "Pierre Cox",
        "birthday": "3/19/1946"
      },
      {
        "name": "Thomas Crane",
        "birthday": "1/5/1977"
      },
      {
        "name": "Miranda Shaffer",
        "birthday": "9/12/1988"
      },
      {
        "name": "Bradyn Kramer",
        "birthday": "10/5/1982"
      },
      {
        "name": "Alvaro Mcgee",
        "birthday": "1/19/1997"
      }
    ]`
}