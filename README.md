# Scan My Paws

Panayiotis Zavros

<a href="">pzavros@uclan.ac.uk</a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary><h2>Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#tools">Development tools</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Scan my Paws is a full stack web application that can be also built as a mobile app, and it is created to help pet owners to find their pets if lost. In such cases the founder can scan a unique qr code that will be printed in the pet's tag and direct them into a unique page design for the specific pet to show the details of the pet along with 2 functionalities, send location to the owner and start a chat with the owner. The app can also take as input, schedules of the pet (grooming etc.) and medical records (vaccination etc.). The app also provides notifcations.

### Development tools

* React JS (Frontend)
* ASP.NET Core API (Backend)
* SQL Server (Database)
* SignarR (Real-time communication)
* MUI (Material UI) for UI Components
* Docker (In case of deployment on a server)

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
3. Open the backend sln file in visual studio or jet brain's Rider or just simply open this path into the IDE: ScanMyPaws\Backend\Backend
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

<!-- USAGE EXAMPLES -->
## Usage
Make sure the API is running using the terminal and run dotnet run as it is mentioned above.

Firstly navigate to the Eshop's HomePage, and then into the Shop, You can view the product or just click on buy then proceed with the forms and once you click confirm order you can see in an Alert the QR Code ID. Save that QR Code ID because it will be useful later. If you navigate back to the Home Page and scroll at the bottom of the screen you can see a button generate new QR Code and you can generate a qr code there instead of buying a product. Now, in the text field "Enter QR Code ID" you can enter the qr code id received from the alert and fetch the qr code image. If you scan that qr code you will get a unique url that you will run in your browser after all the workflows are done. Also you can take it a picture with your mobile phone to scan it later with your laptop's or PC's camera.

# Note that this app is better to run in a mobile view (Click f12 in your browser to open dev tools and open it in dimensions of a mobile phone).
Now lets run the web application with the same steps as we runed the Eshop, and register an account. After login into the account. You will see in the home page to add your pet, click that button and again in the top right click again add new pet. Then you can simply scan the qr code as you have it in a picture on your phone, or click simulate qr code scan to enter the qr code id manually. You will be able to see the unique url there, and you should save it in a notepad. Then click submit and enter the pet's details. After click on View Details and there you can edit your pet see the location history or create / view card. Click on create card and fill the details and then create the card. Now from there you can edit details or set what it will be visible for the founder. Now if you enter the unique url in the browser that the project is running you will be able to view what the founder will see and can start a chat or send a location there. From the owner's side you will recieve a notification and you can see it from the top right corner. If the founder sends the location you can see it from the location history in the pet's details page. If the founder start a chat you can navigate form the hamburger menu > chat and see it there. Moreover, you can view your profile and edit, add medical records for each pet, add schedules and add some settings in the settings page. You can find those functionalities from the hamburger menu. Lastly in the homepage if you have more than 1 pet you can simply press the blue dot below the view profile button to navigate to the other pets and the details below will dynamicaly change. 

### Note
Please if something is not clear contact me and i will reply the soonest.

<!-- CONTACT -->
## Contact

Panayiotis Zavros - pzavros@uclan.ac.uk or panazavros8@gmail.com - [GitHub Account]([https://github.com/pzavros])

Project Link: [https://github.com/your_username/repo_name](https://github.com/pzavros/ScanMyPaws)


