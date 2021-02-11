import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "79f6297c-4e41-464d-8848-194716cba4e7"
    }
})

export const userAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },

    deleteFollow (id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },

    postFollow (id) {
        return instance.post(`follow/${id}`).then(response => response.data)
    },
    getProfile(id) {
        console.warn('ProfileAPI method')
        return profileAPI.getProfile(id)
    }

}

export const profileAPI = {
   getProfile  (id)  {
        return instance.get(`profile/` + id)
    },
    getStatus (id) {
       return instance.get("profile/status/" + id).then(response => response.data)
    },
    updateStatus (status) {
       return instance.put("profile/status", {status:status})
    }

}

export const AuthAPI = {
    AuthMe () {
        return  instance.get("auth/me")
    },
    login(email, password, rememberMe) {
        return instance.post("auth/login", {email, password, rememberMe})
    },
    logout () {
        return instance.delete("auth/login")
    }
}
