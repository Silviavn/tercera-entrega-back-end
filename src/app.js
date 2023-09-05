import ProductManager from '../ProductManager/'
import express from 'express' 

const app = express()
app.use(express.urlencoded({ extend: true }))

const products = new ProductManager()

const readProducts = products.readProducts()

app.get("/products", async (req, res) => {

    const limit = parseInt(req.query.limit)
    if (!limit) return res.send(await readProducts)
    const productsAll = await readProducts
    const pLimit = productsAll.slice(0, limit)
    res.send(pLimit)
})



app.get("/products/:id", async (req, res) => {

    const pid = parseInt(req.params.id)
    const productsAll = await readProducts
    console.log(typeof pid)
    const productId = productsAll.find(products => products.id === pid)
    if (!productId) {
        return res.send("Error, no hemos podido encontrar el producto")
    }

    res.send({ productId })

})

app.listen(8080, () => console.log("Nos encontramos en el localhost 8080"))