module.exports = {
        student : {
            get : [
                { "/students" : "getStudents"},
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
            put : [{ "/branch" : "updateBranch"}],
            delete : [{ "/branch/:id" : "deleteBranch"}]
        },
    
        college : {
            get : [
                { "/colleges" : "getColleges"},
                { "/college/:id" : "getCollege"}
            ],
            post :[{ "/college" : "createCollege"}],
            put : [{ "/college" : "updateCollege"}],
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

        userType : {
            get : [
                { "/userTypes" : "getAllUserTypes"},
                { "/userType/:id" : "getUserType"}
            ],
            post :[{ "/userType" : "createUserType"}],
            put : [{ "/userType/:id" : "updateUserType"}],
            delete : [{ "/userType/:id" : "deleteUserType"}]

        }

}