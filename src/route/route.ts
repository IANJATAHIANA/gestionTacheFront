import home from "../page/home.vue";
import register from "../page/user/register.vue";
import login from "../page/user/login.vue";
import taskView from "../page/task/taskView.vue";

const routes = [
    {
        path: "/",
        name: 'home',
        component: home
    },
    {
        path: "/register",
        name: "Register",
        component: register
    },
    {
        path: "/login",
        name: "login",
        component: login
    }, 
    {
        path: "/taskview",
        name: "taskview",
        component: taskView
    }

]

export default routes;