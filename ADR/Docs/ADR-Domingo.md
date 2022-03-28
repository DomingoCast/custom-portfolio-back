# Architecture Design Record

## Type of API

In this project the end goal is to develop an API of which there are two types which would suit the purpose of the application the best:

-   REST: It's the most popular way of developing web api's at the moment based of fixed end points where you access and give data
-   GraphQL: It's an up-and-coming technology. It is a query language used to access data in a flexible way so it doesn't over nor under-fetch

Both ways of developing the API would do a fine job. REST would be best if our application had many microservices with their different API's .In the case of this application I think that the PRO's of Graphql plus the added comfort for the front and back-end developers, overcomes those of the REST.

## Node framework

Trying to develop a back-end for an application of a considerable size with just node is not viable, therefore a framework is neeed of which there are two prominent ones:

-   Express: It's a lightweight framework which makes life easier for developing a simple api but the lack of structure can hinder it's scalability
-   Nestjs: It's a superset of Express, has the same functionality but also comes with modularity and a stronger structure with the cost of being less flexible

Considering the scalability of the application in hands I'd prefer to use Nestjs. Also Nestjs has quick integration with Graphql using Apollo

## Database

For a project where the application has to manage a multitude of users, companies and the relations between them I think that the database paradigm most suited for it would have to be a SQL. From the multitude of sql databases I've picked the best in popularity and in functionality

-   Mysql: It's the most used database although it's declining in popularity
-   Postgresql: It's the secound most popular database, and gaining. Also it allows for JSON as a data type

Looking at the future of the application Postgresql is clearly on the rise and offering more functionality I don't think that the popularity of Mysql is enough argument to trump Postgresql for the decission of the database for the project.
