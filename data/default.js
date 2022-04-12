exports.TEST_CONFIG = 
{
    'sandbox': {
        url: 'https://core.sandbox.hayylo.com/',
        userCreds:[
            {
                userName: "nddung1412@gmail.com",
                // userName: "linh.hoangthimy@nashtechglobal.com",
                passWord: "Abc123!",
                role: "Global Admin",
                companyName: "Automation Company",
                companyId: 113
            },
            {
                userName: "u5@sandbox.hayylo.com",
                passWord: "Abc123!",
                role: "Hayylo Admin"
            },
            {
                userName: "taf16355@eoopy.com",
                passWord: "Abc123!",
                role: "Service",
                firstName: 'User',
                lastName: 'Service'
            },
            {
                userName: "oag44544@bcaoo.com",
                passWord: "Abc123!",
                role: "Manager",
                firstName: "User",
                lastName: 'Manager'    
            },
            {
                userName: "jzt09645@cuoly.com",
                passWord: "Abc123!",
                role: "Company Admin",
                firstName: "User",
                lastName: "Company Admin"    
            },
            {
                passWord: "444555",
                userName: "0999999979",
                userName: "0666777666",
                role: "Client",
                firstName: "Default",
                lastName: "Client" 
            },
            {
                userName: "0999331331",
                passWord: "123456",
                role: "Worker",
                firstName: "Default",
                lastName: "Worker"      
            }
        ],
        databaseCred: {
            host: "hayylocoresb.cyg0fdzcz5zq.ap-southeast-2.rds.amazonaws.com",
            user: "hayylo_admin_san",
            password: "18857642a1ef666dffca91ec7b4f8030",
            database: "hayylo_core_sandbox"
        },
        defaultPassword: "Abc123!", // Used to set password when active new user
        company: {
            companyName: "Automation Company",
        }
    },
    'uat': {
        url: "https://core.test.hayylo.com/",
        userCreds:[
            {
                userName: "yzd02580@cuoly.com",
                passWord: "Abc123!",
                role: "Global Admin",
                companyName: "Automation Company",
                companyId: 65
            },
            {
                userName: "u1@test.hayylo.com",
                passWord: "Abc123!",
                role: "Hayylo Admin"
            },
            {
                userName: "wel80721@eoopy.com",
                passWord: "Abc123!",
                role: "Service",
                firstName: 'User',
                lastName: 'Service'
            },
            {
                userName: "mri13600@eoopy.com",
                passWord: "Abc123!",
                role: "Manager",
                firstName: "User",
                lastName: 'Manager'
            },
            {
                userName: "wgq49829@eoopy.com",
                passWord: "Abc123!",
                role: "Company Admin",
                firstName: "User",
                lastName: "Company Admin"
            },
            {
                userName: "0999999976",
                passWord: "123456",
                role: "Client"        
            },
            {
                userName: "0999331331",
                passWord: "123456",
                role: "Worker"        
            }
        ],
        databaseCred: {},
        defaultPassword: "Abc123!",
        company: {
            companyName: 'Automation Company',
        },
    },
    'prod': {
        url: "https://app.hayylo.com",
        userCreds:[
            {
                userName: "ga-atc65@hayylo.com",
                passWord: "ATC@hayylo1",
                role: "Global Admin",
                companyName: "Automation Test Company",
                companyId: 65
            },
            {
                userName: "Dung.NguyenDuc1@Nashtechglobal.com",
                passWord: "Abc123!",
                role: "Hayylo Admin"
            },
            {
                userName: "dpg72817@bcaoo.com",
                passWord: "Abc123!",
                role: "Service",
                firstName: 'User',
                lastName: 'Service'
            },
            {
                userName: "ljz77406@eoopy.com",
                passWord: "Abc123!",
                role: "Manager",
                firstName: "User",
                lastName: 'Manager'    
            },
            {
                userName: "iqo35440@cuoly.com",
                passWord: "Abc123!",
                role: "Company Admin",
                firstName: "User",
                lastName: "Company Admin"    
            },
            {
                passWord: "444555",
                userName: "0666777666",
                role: "Client",
                firstName: "Default",
                lastName: "Client" 
            },
            {
                userName: "0999331331",
                passWord: "123456",
                role: "Worker",
                firstName: "Default",
                lastName: "Worker"      
            }            
        ],
        databaseCred: {},
        defaultPassword: "Abc123!",
        company: {
            companyName: "Automation Test Company"
        },
    },
    'dev': {
        url: "http://core.dev.sandbox.hayylo.com/",
        userCreds: [],
        databaseCred: {}
    }
}