# Treehouse_Full-Stack_JavaScript_Techdegree_unit9: REST API


npx sequelize model:create --name Course --attributes title:string,description:text,estimatedTime:string,materialsNeeded:string


## pending


    The GET /api/users route filters out the following properties:
        password
        createdAt
        updatedAt
        Ensure that id, firstName, lastName and email are still included in the response


    The POST /api/users route checks for and handles SequelizeUniqueConstraintError errors by returning a 400 status code and error message




    The GET /api/courses and /api/courses/:id routes filter out the following properties:
        createdAt
        updatedAt

    The PUT /api/courses/:id and DELETE /api/courses/:id routes return a 403 status code if the current user doesn't own the requested course



The POST /api/users route validates that the provided email address is a valid email address and isn't already associated with an existing user