const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//code starts here

const teamMembers = [];
const emptyId = [];
const questions = [
  {
    type: "input",
    name: "managerName",
    message: "What's the Manager's Name?",
  },
  {
    type: "input",
    name: "managerId",
    message: "What's the Manager's ID?",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What's the Manager's Email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What's the Manager's Office Number?",
  },
];

// function for manager
function manager() {
  console.log("Lets Start!");
  inquirer.prompt(questions).then(function (data) {
    const manager = new Manager(
      data.managerName,
      data.managerId,
      data.managerEmail,
      data.officeNumber
    );
    teamMembers.push(manager);
    emptyId.push(data.managerId);
    team();
  });
}
// funtion for engineer
function engineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "Engineer's ID?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Engineer's email?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Engineer's GitHub username?",
      },
    ])
    .then(function (data) {
      const engineer = new Engineer(
        data.engineerName,
        data.engineerId,
        data.engineerEmail,
        data.engineerGithub
      );
      teamMembers.push(engineer);
      emptyId.push(data.engineerId);
      team();
    });
}

// Function for Intern

function intern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "Intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "Intern's ID?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "Intern's email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "Intern's school?",
      },
    ])
    .then(function (data) {
      const intern = new Intern(
        data.internName,
        data.internId,
        data.internEmail,
        data.internSchool
      );
      teamMembers.push(intern);
      emptyId.push(intern);
      team();
    });
}

function team() {
  //build team here
  inquirer
    .prompt([
      {
        type: "list",
        name: "teamChoice",
        message: "What Team Member you like to Add?",
        choices: ["Engineer", "Intern", "Done"],
      },
    ])
    .then(function (data) {
      if (data.teamChoice === "Engineer") {
        engineer();
      } else if (data.teamChoice === "Intern") {
        intern();
      } else outputTeam();
    });
}

//function to render html pages

function outputTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
 // console.log(teamMembers);
}

// function to initialize program
function init() {
  manager();
}

// function call to initialize program
init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
