

const adapter = (url) => {
    // TODO: Full CRUD
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    const getAll = async () => {
        const resp = await fetch(url)
        const jsonData = await resp.json()
        return jsonData
    }

    const getOne = async (id) => {
        const resp = await fetch(url + "/:" + id)
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

    const create = async (postBody) => {
        const postConfig = {
            method: "POST",
            headers: headers,
            body: postBody
        }
        const resp = await fetch(url, postConfig)
        const jsonData = await resp.json()
        return jsonData
    }


    return {
        getAll,
        getOne,
        create
    }
}

export default adapter
