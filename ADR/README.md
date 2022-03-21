# Architecture Design Record (ADR)

Templates: 
- # [Decision record  by Hector Plinio](https://github.com/DomingoCast/jnt-copy/blob/ADR/ADR/Docs/ADR-Hector.md).
- # [Decision record  by Domingo Castillo](https://github.com/DomingoCast/jnt-copy/blob/ADR/ADR/Docs/ADR-Domingo.md).

## Type of API
_For this project we need to choose one type of API that we will use to communicate companies, offer-jobs and employees._
_In we opinion, after talked for the best of API REST and the best of GraphQL we have decide the best for our project is use API REST. One of the main features of REST Web services is the explicit use of HTTP (HyperText Transfer Protocol) methods. GET, POST, PUT and DELETE. Another very important date is the most popular way to develop web API and it has easier setup than GraphQL._

## Node framework
_We need to work with some framework to streamline our work and procedures. We think the best option is to use Express because it is the most widespread and popular framework in nodeJs. It has a wide variety of resources and a great community as well, all this will make our work easier._

_Using Express configuration is the best way to create a web server, then Express has additional service tools that will make it possible for our site to have everything we need._

## Database
_For a project where the application has to manage a multitude of users, companies and the relations between them I think that the database paradigm most suited for it would have to be a SQL._

_Once we choose the type of database that we are going to use, the next step is to choose the database that we are going to use to store our data. In this way, we think that the best option for our project is PostgreSQL because it has some qualities that adapt to our project._

## Final decision

- _Type of API: REST API._
- _Framework: Express._
- _Database: PostgreSQL._
