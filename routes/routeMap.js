module.exports = {
        student : {
            get : [
                { "/getStudents" : "getStudents"},
                { "/student/:id" : "sign_in"}
            ],
            post :[{ "/student" : "createStudent"}],
            put : [{ "/student/:id" : "updateStudent"}],
            delete : [{ "/student/:id" : "deleteStudent"}]
        },

        branch : {
            get : [
                { "/allBranches" : "getAllBranches"},
                { "/branches/:collegeId" : "getBranches"}
            ],
            post :[{ "/branch" : "createBranch"}],
            put : [{ "/branch/:id" : "updateBranch"}],
            delete : [{ "/branch/:id" : "deleteBranch"}]
        },
    
        college : {
            get : [
                { "/colleges" : "getColleges"},
                { "/college/:id" : "getCollege"}
            ],
            post :[{ "/college" : "createCollege"}],
            put : [{ "/college/:id" : "updateCollege"}],
            delete : [{ "/college/:id" : "deleteCollege"}]
        },
    
        projects : {
            get : [
                { "/projects" : "getProjects"},
                { "/project/:studentId" : "getProject"}
            ],
            post :[{ "/project" : "createProject"}],
            put : [{ "/project/:id" : "updateProject"}],
            delete : [{ "/project/:id" : "deleteProject"}]
        },

        usertype : {
            get : [
                { "/usertypes" : "getAllUserTypes"},
                { "/usertype/:id" : "getUserType"}
            ],
            post :[{ "/usertype" : "createUserType"}],
            put : [{ "/usertype/:id" : "updateUserType"}],
            delete : [{ "/usertype/:id" : "deleteUserType"}]

        }

}