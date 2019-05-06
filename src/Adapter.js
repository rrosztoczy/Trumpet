// TODO:Validations if failed sign up, login, new alert, edit alert, destroy alert, or create/remove reaction

const adapter = (url) => {
    // TODO: Full CRUD
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    const getAll = async (user, handleUser) => {
        const resp = await fetch(url)
        const jsonData = await resp.json()
        console.log("json resp", jsonData)
        // Probably trying to hit sthis on the initial gets for trumpets too
        user ? console.log("entered un", user.username, "entered pw", user.password) : console.log("hehe")
        const userForLogin = user ? jsonData.find(userFromBe => (userFromBe.username === user.username && userFromBe.password === user.password)) : null
        user ? console.log("found user", userForLogin.username) : console.log("hi")
        userForLogin && handleUser ? handleUser(userForLogin.id) : console.log("hi")
        return jsonData
    }

    const getOne = async (id) => {
        const resp = await fetch(url + "/" + id)
        const jsonData = await resp.json()
        return jsonData
    }

    //Trumpet Creation Body
    //  {
    //     "summary": null,
    //     "trumpet_type": "Missing source",
    //     "content": "Liar, liar, pants on fire.",
    //     "user_id": {populate from current user state, hard code at first},
    //      "url": "http://cnn.com/politics",
    //      "root_url": "http://cnn.com"
    //     }
    // }

    //User Creation Body
    //  {
    //     "first_name": "",
    //     "last_name": "",
    //     "username": "",
    //     "password": "",
    //  }

    const create = async (postBody, handleUser) => {
        const postConfig = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(postBody)
        }
        const resp = await fetch(url, postConfig)
        const jsonData = await resp.json()
        console.log("response:", jsonData)
        handleUser ? handleUser(jsonData.id) : console.log("hi")
        return jsonData
    }

    const update = async (id, postBody) => {
        const postConfig = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(postBody)
        }
        const resp = await fetch(url + "/" + id, postConfig)
        const jsonData = await resp.json()
        console.log("response:", jsonData)
        // return jsonData
    }


    const destroy = async (id, handleDestroy) => {
        const postConfig = {
            method: "DELETE",
            headers: headers
        }
        const resp = await fetch(url + "/" + id, postConfig)
        const jsonData = await resp.json()
        console.log("response:", jsonData)
        handleDestroy ? handleDestroy(jsonData) : console.log("hello")
        // return jsonData
    }


    return {
        getAll,
        getOne,
        create,
        update,
        destroy
    }
}

export default adapter
