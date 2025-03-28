# Scan My Paws

Panayiotis Zavros

<a href="">pzavros@uclan.ac.uk</a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary><h2>Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tools">Development tools</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Scan my Paws is a full stack web application that can be also built as a mobile app, and it is created to help pet owners to find their pets if lost. In such cases the founder can scan a unique qr code that will be printed in the pet's tag and direct them into a unique page design for the specific pet to show the details of the pet along with 2 functionalities, send location to the owner and start a chat with the owner. The app can also take as input, schedules of the pet (grooming etc.) and medical records (vaccination etc.). The app also provides notifcations.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Development tools

* React JS (Frontend)
* ASP.NET Core API (Backend)
* SQL Server (Database)
* SignarR (Real-time communication)
* MUI (Material UI) for UI Components
* Docker (In case of deployment on a server)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps. 
Include instructions on how to install software needed to run your project and commands to be executed.

1. Download the zip file from this url : https://github.com/pzavros/ScanMyPaws
notes : The repository is private and require access from me.

Or use in a windows terminal the following command :
```sh
  git clone https://github.com/pzavros/ScanMyPaws.git
  ```
2. Extract the zip folder and inside it contains the 3 different project files :

- Eshop

- WebApplication

- Backend

- Other files

## Backend
3. Open the backend sln file in visual studio or jet brain's Rider
4. Go to Tools > NuGet Package Manager > Package Manager Console
```sh
  Update-Package -reinstall
  ```
5. If dotnet is not installed run the following command:
```sh
  dotnet tool install --global dotnet-ef
  ```
```sh
dotnet restore
```
6. After create the database by running the migration files. Use this command :
```sh
dotnet ef database update
```
7. Lastly run the following command to run the backend:
```sh
   dotnet run
```
8. If you run the backend with IIS the api will not work since it is developed to run only http requests for now.
9. You can access the swagger page in here :
http://localhost:5000/swagger/index.html

## Frontend Web Application

1. Make sure to have nodejs installed on your pc, otherwise download it from here : https://nodejs.org/en
2. Open this path in an IDE, preferable Visual Studio Code , or in a terminal window :
ScanMyPaws\WebApplication\ScanMyPaws
3. Run the following commands :
```sh
npm install
```
(If Errors appears run ```sh npm install --force ```)
4. Run the following command to run the web app :
```sh
npm run dev
```
## Frontend Eshop
1. It applies the same as the section Frontend Web Application but in this path: 
ScanMyPaws\Eshop\Eshop

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Your Name - email@example.com - [GitHub Account](https://github.com/your_username)

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you found helpful or people that have helped you and that you would like to give credit to.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

