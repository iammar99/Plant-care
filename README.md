# Plant Care AI

# Table of Contents
- [Plant Care AI](#plant-care-ai)
- [Table of Contents](#table-of-contents)
  - [What is Plant Care AI](#what-is-plant-care-ai)
  - [Technologies Used](#technologies-used)
  - [How Does It Work?](#how-does-it-work)
  - [Why Is It Needed?](#why-is-it-needed)
  - [Folder Structuer](#folder-structuer)
  - [How to run](#how-to-run)
  - [Team](#team)
  - [Demo](#demo)
    - [Live Demo](#live-demo)


## What is Plant Care AI
Plant Care AI is an intelligent web app that helps users identify plant diseases by analyzing uploaded images. It provides detailed insights, including disease name, symptoms, causes, cures, and preventive measures, empowering gardeners and farmers to take better care of their plants. The app uses advanced AI models .


## Technologies Used
- **Frontend**: React.js for building the user interface.
- **APIs**: These APIs are integrated
    - **Disease Detection**:Plant.id for disease detection
    - **Details** : Llama-3.3-70B for detailed solution
- **Database** : Firebase FireStore for storing data and user's chat history


## How Does It Work?
1. **User Authentication**: Users sign in or register through a secure authentication system to access the app's features.
2. **Image Upload**: Users upload an image of their plant through an intuitive input form.
3. **Disease Identification**: The application analyzes the uploaded image using AI models (like Plant.id) to identify potential diseases and provide details, including symptoms, causes, cures, and precautions.
4. **Data Storage**: The app stores users' last uploaded images and their results in a secure database, allowing them to review their previous analyses.
5. **Output Display**: The results are presented in a user-friendly format, enabling users to take informed actions to care for their plants.
6. 

## Why Is It Needed?
Plant Care AI is essential for quickly and accurately identifying plant diseases, providing solutions, and preventing crop loss. It empowers users with actionable insights, simplifies plant care, and ensures better plant health through accessible and reliable guidance.


## Folder Structuer


```
├───public
└───src
    ├───Assets
    ├───Components
    │   ├───Accordian
    │   ├───ButtonLoader
    │   ├───Card
    │   ├───Footer
    │   ├───Header
    │   └───Screen Loader
    ├───Config
    ├───Context
    ├───Pages
    │   ├───Auth
    │   ├───Dashboard
    │   └───Frontend
    └───SCSS
        ├───Components
        └───Pages

```


## How to run 

Follow these steps to Run the app

1. Clone the repo by running this command in your system

    ```
    git clone https://github.com/iammar99/Plant-care.git
    ```
2. Open terminal and run this command to install dependencies 

    ```
    npm install
    ```
3. Run this command to run the app on local server
    ```
    npm start
    ```




## Team

<h1 align="center">Ai Crafters</h1>


<table align="center">
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/iammar99">
                    <img src="https://avatars.githubusercontent.com/iammar99" width="100px" style="border-radius:50%;" alt="Ammar"/>
                    <br />
                    <sub><b>Ammar</b></sub>
                </a> 
            </td>
            <td align="center">
                <a href="https://github.com/sheikhawais7">
                    <img src="https://avatars.githubusercontent.com/sheikhawais7" width="100px" style="border-radius:50%;" alt="sheikhawais7"/>
                    <br />
                    <sub><b>Muhammad Awais Mehboob</b></sub>
                </a> 
            </td>
            <td align="center">
                <a href="https://github.com/wahawahaabbabb">
                    <img src="https://avatars.githubusercontent.com/wahaabb" width="100px" style="border-radius:50%;" alt="Abdul Wahab"/>
                    <br />
                    <sub><b>Abdul Wahab</b></sub>
                </a> 
            </td>
        </tr> 
    </tbody>
</table>




## Demo 

### Live Demo

[Plant Care](https://plantcare-ai.vercel.app/)

<!-- ### Video Demo

[Video Demo](https://vimeo.com/1025252979?share=copy) -->


<!-- <video src="/src/assets/Untitled ‑ Made with FlexClip.mp4"></video> -->