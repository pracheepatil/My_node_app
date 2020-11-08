module.exports = {
        student : {
            get : [{ "/students" : "getStudents"},
                    { "/renewToken" : "getRenewToken"}],
            post :[
                { "/signUp" : "createStudent"},
                { "/signIn" : "sign_in"}
            ],
            put : [{ "/student" : "updateStudent"}],
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
                // { "/project/:studentId" : "getProject"}
            ],
            post :[{ "/project" : "createProject"}],
            put : [{ "/project" : "updateProject"}],
            delete : [{ "/project/:id" : "deleteProject"}]
        },

        userType : {
            get : [
                { "/userTypes" : "getAllUserTypes"},
                { "/userType/:id" : "getUserType"}
            ],
            post :[{ "/userType" : "createUserType"}],
            put : [{ "/userType" : "updateUserType"}],
            delete : [{ "/userType/:id" : "deleteUserType"}]
        },

        projectMapping: {
            get : [
                {"/projectMappings" : "getProjectMappings"},
                {"/projectMapping/:id" : "getProjectMapping"}
            ],
            post : [{"/projectMapping" : "createProjectMapping"}],
            put : [{"/projectMapping" : "updateProjectMapping"}],
            delete : [{"/projectMapping/:id" : "deleteProjectMapping"}]
        },

        
        collegeBranchMap: {
            get : [
                {"/collegeBranchMaps" : "getCollegeBranchMaps"},
                {"/collegeBranchMap/:id" : "getCollegeBranchMap"}
            ],
            post : [{"/collegeBranchMap" : "createCollegeBranchMap"}],
            put : [{"/collegeBranchMap" : "updateCollegeBranchMap"}],
            delete : [{"/collegeBranchMap/:id" : "destroyCollegeBranchMap"}]
        }
        
}
