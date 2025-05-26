# Case
## Running
The project can be run by using `docker compose up` in the command line, assuming you have docker installed. If not the frontend can be run in dev mode using `pnpm install && pnpm run dev` and the backend can be run through IntelliJ or as a standard jar through the command line. The setup is tailored towards using docker so please use that if possible.

Go to http://localhost:4173/B171388180BC457D9887AD92B6CCFC86 (or any other registered form for the slug) and you should be able to go though the form. Invalid slugs or missing slugs should not work.

## Technologies
The technologies were chosen by the requirements of the case. Spring boot backend with JPA for easy prototyping and React frontend. Built with Vite for speed and Typescript for type safety.
Kotlin chosen as the language in the backend as that is what I'm most familiar with, and it plays nicely with Spring.

## Improvements and future work
There is a lot of improvements to be done. The frontend is a bit messy with little to no structure of where things are placed and where the logic lies. This is a result of not using any third party libraries as well as the time constraint.  

The data classes and types in both the frontend and backend could probably be consolidated more and be cleaned up a lot. 

The backend is fairly straight forward, but the validations of the data could probably be put in a service to keep the controllers as clean as possible, as well as adding more response types in case of errors or invalid data. 

Environment variables and testing have been neglected completely and is something that should be used.


All in all the project has a somewhat messy frontend that could have been replaced by a simple html form element for the same functionality without all the complexity.



