

const adapter = (url) => {
    // TODO: Full CRUD
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }

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


    return {
        getAll,
        getOne
    }
}

export default adapter