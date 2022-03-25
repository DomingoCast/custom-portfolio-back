# ORM

Because we are using a sql database we are going to use an ORM. It is not necessary but it makes life easier beacuse you dont have to work with sql syntax and you can focuse insted on the entites and their relations

## Chose ORM

There are 3 prominent orm's

-   Sequalize: It's the oldest and most popular but it have bad documentation
-   Type-orm: It's the second most popular and it has great implementation with Typescript
-   Prisma: It is a different kind of orm with a great user interface but it needs another server

I think that for the same reason that we discarded graphql we should discard Prisma, it is too much overhead for this project. Between Sequalize and Typeorm, althogh segualize is more popular, from the research I've done I've seen that type-orm is easier to work with specially with the integration with typescript, so I think that Type-orm is the best fit for our project.
